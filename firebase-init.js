/* =========================================================
   BiegStart — inicjalizacja Firebase (Authentication + Firestore)
   ---------------------------------------------------------
   Moduł:
     1. sprawdza, czy Firebase jest włączony (firebase-config.js),
      2. importuje moduły Firebase v10 z CDN,
     3. tworzy instancje `auth` i `db`,
     4. podmienia adaptery w usłudze BiegStartAuth
        (konta → Firebase Auth, dane profilu → Cloud Firestore),
     5. podpina onAuthStateChanged, dzięki czemu aplikacja płynnie
        pamięta zalogowanego użytkownika po odświeżeniu strony.

   Gdy Firebase jest wyłączony lub SDK nie da się załadować,
   moduł NIE przerywa działania aplikacji — pozostaje ona na
   adapterze lokalnym (localStorage) w trybie gościa/kont lokalnych.

   Kolejność ładowania w index.html:
     firebase-config.js → auth.js → firebase-adapter.js →
     firebase-init.js → app.js
   ========================================================= */
(function (global) {
  "use strict";

  const SDK_BASE = "https://www.gstatic.com/firebasejs/";

  function sdkVersion() {
    return global.BIEGSTART_FIREBASE_SDK || "10.12.0";
  }

  function scriptUrl(file) {
    return SDK_BASE + sdkVersion() + "/" + file;
  }

  /* Czy konfiguracja została realnie uzupełniona (nie placeholdery)? */
  function isConfigured(cfg) {
    if (!cfg || typeof cfg !== "object") return false;
    const keys = ["apiKey", "authDomain", "projectId", "appId"];
    return keys.every((k) => {
      const v = cfg[k];
      return typeof v === "string" && v.length > 0 && v.indexOf("TWOJ") === -1;
    });
  }

  async function loadSdk() {
    const [app, auth, firestore] = await Promise.all([
      import(scriptUrl("firebase-app.js")),
      import(scriptUrl("firebase-auth.js")),
      import(scriptUrl("firebase-firestore.js")),
    ]);
    return { app, auth, firestore };
  }


  /**
   * Uruchamia Firebase. Bezpieczne do wywołania zawsze — przy braku
   * konfiguracji zwraca { enabled:false } i nic nie zmienia.
   * @returns {Promise<{enabled:boolean, reason?:string, auth?:any, db?:any}>}
   */
  async function init() {
    if (!global.BIEGSTART_FIREBASE_ENABLED) {
      return { enabled: false, reason: "disabled" };
    }
    if (!global.BiegStartAuth || !global.createFirebaseAuthAdapter) {
      return { enabled: false, reason: "missing-deps" };
    }

    const config = global.BIEGSTART_FIREBASE_CONFIG;
    if (!isConfigured(config)) {
      console.warn(
        "[BiegStart] Firebase nie został uruchomiony — uzupełnij " +
          "window.BIEGSTART_FIREBASE_CONFIG w pliku firebase-config.js."
      );
      return { enabled: false, reason: "not-configured" };
    }

    let sdk;
    try {
      sdk = await loadSdk();
    } catch (e) {
      console.warn("[BiegStart] Nie udało się załadować SDK Firebase:", e);
      return { enabled: false, reason: "sdk-error" };
    }

    const app = sdk.app.initializeApp(config);
    const auth = sdk.auth.getAuth(app);
    const db = sdk.firestore.getFirestore(app);

    // Sesja utrzymywana lokalnie (domyślne dla web) — użytkownik
    // pozostaje zalogowany po odświeżeniu strony.
    try {
      await sdk.auth.setPersistence(auth, sdk.auth.browserLocalPersistence);
    } catch (e) {
      /* ignore — persistence bywa niedostępne w trybie prywatnym */
    }

    const fb = {
      auth,
      db,
      fbAuth: sdk.auth,
      fbStore: sdk.firestore,
      app,
    };
    global.__firebase = fb;

    // 1) Podmiana adapterów: konta → Firebase Auth, dane → Firestore
    global.BiegStartAuth.configure({
      authAdapter: global.createFirebaseAuthAdapter(fb),
      dataAdapter: global.createFirestoreDataAdapter(fb),
    });

    // 2) Stan logowania: odtworzenie sesji po odświeżeniu + reakcja
    //    na logowanie/wylogowanie w innych kartach przeglądarki.
    sdk.auth.onAuthStateChanged(auth, (fbUser) => {
      global.BiegStartAuth.applyExternalUser(
        fbUser ? global.mapFirebaseUser(fbUser, !!fbUser.isAnonymous) : null
      );
    });

    return { enabled: true, auth, db };
  }

  global.BiegStartFirebase = { init, isConfigured, sdkVersion };
})(window);
