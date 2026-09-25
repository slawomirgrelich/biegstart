/* =========================================================
   BiegStartAuth — adapter Firebase (szkielet integracji)
   ---------------------------------------------------------
   Ten plik NIE jest wymagany do działania aplikacji w trybie
   lokalnym. Pokazuje, w jaki sposób podmienić warstwę kont
   i danych na Firebase Authentication + Cloud Firestore bez
   zmian w logice aplikacji.

   Aby włączyć Firebase:
     1. Uzupełnij firebase-config.js swoją konfiguracją i ustaw
        window.BIEGSTART_FIREBASE_ENABLED = true.
     2. Moduł firebase-init.js (na końcu tego pliku) sam załaduje
        SDK i podłączy adaptery do usługi BiegStartAuth.

   Struktura dokumentu w Firestore:
     kolekcja: users
       dokument: <uid>
         pole: data (map) — dokładnie ten sam kształt co
               profil lokalny:
               {
                 version: 1,
                 updatedAt: ISO,
                 state: { completed: [], lastDoneDate, notes },
                 routes: []
               }

   Dzięki temu aplikacja (app.js) jest całkowicie niezależna od
   backendu i nie wymaga żadnych zmian przy migracji.
   ========================================================= */

(function (global) {
  "use strict";

  /**
   * Sprowadza obiekt użytkownika Firebase do wspólnego kształtu
   * profilu używanego przez całą aplikację (auth.js → app.js).
   * @param {any} fbUser — firebase.User (lub jego odpowiednik).
   * @param {boolean} isGuest — czy traktować konto jako gościa.
   * @returns {{id:string,email:string|null,displayName:string|null,
   *            isGuest:boolean,createdAt:string|null,photoURL:string|null}}
   */
  function mapFirebaseUser(fbUser, isGuest) {
    if (!fbUser) return null;
    const email = fbUser.email || null;
    return {
      id: fbUser.uid,
      email: email,
      displayName: fbUser.displayName || email || null,
      isGuest: !!isGuest || !!fbUser.isAnonymous,
      createdAt:
        (fbUser.metadata && fbUser.metadata.creationTime) ||
        new Date().toISOString(),
      photoURL: fbUser.photoURL || null,
    };
  }

  /**
   * Przyjmuje wyłącznie tekst pobrany z pól formularza. Nie odczytujemy
   * właściwości obiektu zdarzenia, aby przypadkowy Event nie trafił do SDK.
   * @param {any} raw
   * @param {string} _propHint — zachowany dla zgodności wywołań.
   * @param {boolean} trim — czy przyciąć białe znaki.
   * @returns {string}
   */
  function sanitizeArg(raw, _propHint, trim) {
    if (typeof raw !== "string") return "";
    return trim ? raw.trim() : raw;
  }

  /**
   * Buduje operacje Authentication zgodne z SDK załadowanym przez
  * firebase-init.js. Funkcje modułowe otrzymują instancję `auth` jako
  * pierwszy argument, zgodnie z API Firebase v10.
   */
  function buildAuthFns(auth, fbAuthCompat, globalRef) {
    const names = [
      "createUserWithEmailAndPassword",
      "signInWithEmailAndPassword",
      "signInWithPopup",
      "signInAnonymously",
      "signOut",
    ];
    const operations = {};
    names.forEach((name) => {
      if (auth && typeof auth[name] === "function") {
        operations[name] = (...args) => auth[name](...args);
        return;
      }
      const moduleFn =
        (fbAuthCompat && typeof fbAuthCompat[name] === "function"
          ? fbAuthCompat[name]
          : null) || (globalRef && globalRef[name]);
      if (typeof moduleFn === "function") {
        operations[name] = (...args) => moduleFn(auth, ...args);
      } else {
        operations[name] = null;
      }
    });

    let GoogleAuthProviderCtor = null;
    if (fbAuthCompat && fbAuthCompat.GoogleAuthProvider) {
      GoogleAuthProviderCtor = fbAuthCompat.GoogleAuthProvider;
    } else if (globalRef && typeof globalRef.GoogleAuthProvider === "function") {
      GoogleAuthProviderCtor = globalRef.GoogleAuthProvider;
    } else if (
      globalRef &&
      globalRef.firebase &&
      globalRef.firebase.auth &&
      globalRef.firebase.auth.GoogleAuthProvider
    ) {
      GoogleAuthProviderCtor = globalRef.firebase.auth.GoogleAuthProvider;
    }

    operations.GoogleAuthProvider = GoogleAuthProviderCtor;
    return operations;
  }

  /**
   * Aktualizuje displayName profilu użytkownika Firebase.
   * Poprawna ścieżka to metoda instancji `user.updateProfile(...)`.
   * Fallback do `fbAuth.updateProfile` zachowuje kompatybilność
   * z atrapami/testami, które nadal udostępniają sygnaturę obiektową.
   * @param {any} user — obiekt użytkownika Firebase (cred.user).
   * @param {string} displayName — nowa nazwa wyświetlana.
   * @param {any} fbAuthCompat — namespace compat lub null.
   */
  async function applyDisplayName(user, displayName, fbAuthCompat) {
    if (!displayName) return;
    try {
      if (user && typeof user.updateProfile === "function") {
        await user.updateProfile({ displayName });
        return;
      }
    } catch (e) {
      /* niekrytyczne */
    }
    try {
      if (fbAuthCompat && typeof fbAuthCompat.updateProfile === "function") {
        await fbAuthCompat.updateProfile(user, { displayName });
      }
    } catch (e) {
      /* niekrytyczne */
    }
  }

  /**
   * Tworzy adapter kont oparty na Firebase Authentication.
   * @param {{auth:any, fbAuth:any}} fb — instancja Firebase.
   * @returns {object} adapter zgodny z interfejsem AuthAdapter.
   */
  function createFirebaseAuthAdapter(fb) {
    const { auth, fbAuth } = fb || {};
    const m = buildAuthFns(auth, fbAuth, global);

    return {
      id: "firebase",

      async signUp(email, password, displayName) {
        const cleanEmail = sanitizeArg(email, "email", true);
        const cleanPassword = sanitizeArg(password, "password", false);
        const cleanName = sanitizeArg(displayName, "displayName", true);
        try {
          if (typeof m.createUserWithEmailAndPassword !== "function") {
            throw new Error(
              "Firebase createUserWithEmailAndPassword jest niedostępne."
            );
          }
          const cred = await m.createUserWithEmailAndPassword(
            cleanEmail,
            cleanPassword
          );

          await applyDisplayName(cred.user, cleanName, fbAuth);

          const user = mapFirebaseUser(cred.user, false);
          if (cleanName) user.displayName = cleanName;
          return user;
        } catch (error) {
          if (!error.code) error.code = "auth/internal-error";
          console.error(
            "BŁĄD REJESTRACJI FIREBASE:",
            error && error.code,
            error && error.message
          );
          throw error;
        }
      },

      async signIn(email, password) {
        const cleanEmail = sanitizeArg(email, "email", true);
        const cleanPassword = sanitizeArg(password, "password", false);
        if (typeof m.signInWithEmailAndPassword !== "function") {
          const error = new Error(
            "Firebase signInWithEmailAndPassword jest niedostępne."
          );
          error.code = "auth/internal-error";
          throw error;
        }
        const cred = await m.signInWithEmailAndPassword(cleanEmail, cleanPassword);
        return mapFirebaseUser(cred.user, false);
      },

      /* Logowanie przez Google (popup). Wymaga włączenia providera
         Google w konsoli Firebase oraz autoryzowanej domeny. */
      async signInWithGoogle() {
        if (
          typeof m.GoogleAuthProvider !== "function" ||
          typeof m.signInWithPopup !== "function"
        ) {
          throw new Error("Firebase GoogleAuthProvider/signInWithPopup niedostępne.");
        }
        const provider = new m.GoogleAuthProvider();
        if (typeof provider.setCustomParameters === "function") {
          provider.setCustomParameters({ prompt: "select_account" });
        }
        const cred = await m.signInWithPopup(provider);
        return mapFirebaseUser(cred.user, false);
      },

      async signInAsGuest() {
        // Konto anonimowe Firebase (opcjonalnie wymaga włączenia
        // w konsoli: Authentication → Sign-in method → Anonymous).
        // Jeśli provider nie jest włączony, aplikacja przechodzi na
        // lokalne konto gościa (localStorage) — patrz app.js.
        if (typeof m.signInAnonymously !== "function") {
          throw new Error("Firebase signInAnonymously jest niedostępne.");
        }
        const cred = await m.signInAnonymously();
        return mapFirebaseUser(cred.user, true);
      },

      async signOut() {
        if (typeof m.signOut === "function") {
          await m.signOut();
        }
      },

      readSession() {
        // Stan odtwarza onAuthStateChanged (applyExternalUser),
        // więc nie czytamy sesji synchronicznie.
        const current = auth.currentUser;
        if (!current) return null;
        return mapFirebaseUser(current, !!current.isAnonymous);
      },

      /* Nazwa providera dla UI — używane do rozróżnienia Google/e-mail. */
      providerLabel() {
        const current = auth.currentUser;
        if (current && current.providerData && current.providerData.length) {
          return current.providerData[0].providerId || "firebase";
        }
        return "password";
      },
    };
  }

  /**
   * Tworzy adapter danych oparty na Cloud Firestore.
   * Dokument: users/<uid> → pole `data`.
   * @param {{db:any, fbStore:any}} fb — instancja Firebase.
    * @param {{db:any, fbStore:any}} fb — instancja Firebase i eksporty modułu Firestore.
   * @returns {object} adapter zgodny z interfejsem DataAdapter.
   */
  function createFirestoreDataAdapter(fb) {
    const { db, fbStore } = fb;
    const { doc, getDoc, setDoc } = fbStore;
    const FIRESTORE_TIMEOUT_MS = 2500;

    function withTimeout(promise, operation) {
      let timer;
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => {
          const error = new Error(`Firestore ${operation} przekroczył limit czasu.`);
          error.code = "firestore/timeout";
          reject(error);
        }, FIRESTORE_TIMEOUT_MS);
      });
      return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
    }

    return {
      id: "firestore",

      keyFor(uid) {
        return `users/${uid}`;
      },

      async load(uid) {
        try {
          const ref = doc(db, "users", uid);
          const snap = await withTimeout(getDoc(ref), "odczyt");
          const raw = snap.exists() ? snap.data().data : null;
          return global.BiegStartAuth.normalizeProfileData(raw);
        } catch (error) {
          console.warn("Profil Firestore niedostępny, używam profilu lokalnego:", error);
          return global.BiegStartAuth.defaultProfileData();
        }
      },

      async save(uid, data) {
        try {
          const ref = doc(db, "users", uid);
          const payload = global.BiegStartAuth.normalizeProfileData(data);
          payload.updatedAt = new Date().toISOString();
          await withTimeout(
            setDoc(ref, { data: payload }, { merge: true }),
            "zapis"
          );
        } catch (error) {
          console.warn("Nie udało się zapisać profilu w Firestore:", error);
        }
      },
    };
  }

  function createFirestoreRunsAdapter(fb) {
    const { db, fbStore } = fb || {};
    const { addDoc, collection, onSnapshot, orderBy, query, where } = fbStore || {};
    if (!db || typeof addDoc !== "function" || typeof collection !== "function") return null;

    return {
      async add(uid, run) {
        const ref = collection(db, "biegnie");
        await addDoc(ref, { ...run, uid, createdAt: new Date().toISOString() });
      },
      listen(uid, onRuns, onError) {
        const ref = collection(db, "biegnie");
        const constraints = [where("uid", "==", uid)];
        if (typeof orderBy === "function") constraints.push(orderBy("date", "desc"));
        const source = typeof query === "function" ? query(ref, ...constraints) : ref;
        return onSnapshot(source, (snapshot) => {
          const runs = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
          onRuns(runs);
        }, onError);
      },
    };
  }

  global.createFirebaseAuthAdapter = createFirebaseAuthAdapter;
  global.createFirestoreDataAdapter = createFirestoreDataAdapter;
  global.createFirestoreRunsAdapter = createFirestoreRunsAdapter;
  global.mapFirebaseUser = mapFirebaseUser;
})(window);