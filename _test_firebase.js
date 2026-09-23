/* =========================================================
   Test integracji Firebase (headless Chrome).
   Podstawia atrapę SDK Firebase (compat) i sprawdza:
     • doczytanie pakietów SDK przez firebase-init.js,
     • podmianę adapterów w BiegStartAuth na Firebase/Firestore,
     • onAuthStateChanged → applyExternalUser → wczytanie profilu,
     • zapis profilu (postęp + odznaki) do Firestore,
     • logowanie przez Google,
     • płynne odtworzenie sesji po „odświeżeniu strony”.
   ========================================================= */
"use strict";

var F = [];
function ok(name, cond, extra) {
  F.push({ name: name, pass: !!cond, extra: extra || "" });
}

/* ---------- Stan atrapy SDK Firebase (compat) ---------- */
var fbState = {
  signedIn: null,
  authListeners: [],
  users: {},
  docs: {},
  loadedScripts: [],
  popupCalls: 0,
  anonCalls: 0,
  persistenceSet: null,
  lastProvider: null,
};

function makeFbUser(uid, email, displayName, isAnonymous) {
  return {
    uid: uid,
    email: email,
    displayName: displayName || null,
    photoURL: null,
    isAnonymous: !!isAnonymous,
    providerData: [{ providerId: isAnonymous ? "anonymous" : "password" }],
    metadata: { creationTime: "2024-03-01T10:00:00Z" },
  };
}

function fbError(code) {
  var e = new Error(code);
  e.code = code;
  return e;
}

function notify(user) {
  fbState.authListeners.forEach(function (cb) {
    try { cb(user); } catch (e) { console.error("listener error", e); }
  });
}


/* ---------- Atrapa Firebase (globalny obiekt `firebase`) ---------- */
function buildFakeFirebase() {
  var firebase = { apps: [] };

  firebase.initializeApp = function (config) {
    firebase.__config = config;
    firebase.apps.push({ name: "[DEFAULT]", options: config });
    return firebase.apps[0];
  };
  firebase.app = function () { return firebase.apps[0]; };

  firebase.auth = function () {
    var api = {
      currentUser: fbState.signedIn,
      setPersistence: function (p) {
        fbState.persistenceSet = p;
        return Promise.resolve();
      },
      createUserWithEmailAndPassword: function (_a, email, password) {
        if (fbState.users[email]) return Promise.reject(fbError("auth/email-already-in-use"));
        if (String(password).length < 6) return Promise.reject(fbError("auth/weak-password"));
        fbState.users[email] = password;
        var u = makeFbUser("uid_" + email.split("@")[0], email, null, false);
        fbState.signedIn = u; api.currentUser = u; notify(u);
        return Promise.resolve({ user: u });
      },
      signInWithEmailAndPassword: function (_a, email, password) {
        if (!fbState.users[email]) return Promise.reject(fbError("auth/user-not-found"));
        if (fbState.users[email] !== password) return Promise.reject(fbError("auth/wrong-password"));
        var u = makeFbUser("uid_" + email.split("@")[0], email, null, false);
        fbState.signedIn = u; api.currentUser = u; notify(u);
        return Promise.resolve({ user: u });
      },
      signInAnonymously: function () {
        fbState.anonCalls++;
        var u = makeFbUser("anon_uid_1", null, null, true);
        fbState.signedIn = u; api.currentUser = u; notify(u);
        return Promise.resolve({ user: u });
      },
      signInWithPopup: function (_a, provider) {
        fbState.popupCalls++;
        fbState.lastProvider = provider;
        var u = makeFbUser("google_uid_1", "jan@gmail.com", "Jan Kowalski", false);
        u.providerData = [{ providerId: "google.com" }];
        fbState.signedIn = u; api.currentUser = u; notify(u);
        return Promise.resolve({ user: u });
      },
      signOut: function () {
        fbState.signedIn = null; api.currentUser = null; notify(null);
        return Promise.resolve();
      },
      updateProfile: function (user, data) {
        if (data && data.displayName) user.displayName = data.displayName;
        return Promise.resolve();
      },
      onAuthStateChanged: function (cb) {
        fbState.authListeners.push(cb);
        return function () {};
      },
    };
    api.Auth = { Persistence: { LOCAL: "local", SESSION: "session", NONE: "none" } };
    firebase.auth.Auth = api.Auth;
    firebase.auth.GoogleAuthProvider = function () {
      this.setCustomParameters = function (p) { this.params = p; };
    };
    firebase.__authApi = api;
    return api;
  };

  firebase.firestore = function () {

/* ---------- Atrapa doczytywania skryptów SDK ---------- */
var createdScripts = [];
var origCreateElement = document.createElement.bind(document);
document.createElement = function (tag) {
  var el = origCreateElement(tag);
  if (String(tag).toLowerCase() === "script") {
    createdScripts.push(el);
    // Symulacja natychmiastowego załadowania pakietu z CDN.
    setTimeout(function () {
      var src = el.getAttribute("src") || "";
      fbState.loadedScripts.push(src);
      if (src.indexOf("firebase-app-compat") !== -1) window.firebase = fakeFirebase;
      if (src.indexOf("firebase-analytics-compat") !== -1) {
        fakeFirebase.analytics = function () { return { logEvent: function () {} }; };
      }
      if (el.dataset) el.dataset.loaded = "1";
      el.dispatchEvent(new Event("load"));
    }, 0);
  }
  return el;
};

/* ---------- Atrapa zapytań do Firestore ---------- */
/* firebase-adapter.js importuje doc/getDoc/setDoc z fbStore, dlatego
   podmieniamy fabrykę adaptera danych na wersję korzystającą z fbState. */
window.createFirestoreDataAdapter = function (fb) {
  return {
    id: "firestore",
    keyFor: function (uid) { return "users/" + uid; },
    load: function (uid) {
      var raw = Object.prototype.hasOwnProperty.call(fbState.docs, uid)
        ? fbState.docs[uid]
        : null;
      return Promise.resolve(window.BiegStartAuth.normalizeProfileData(raw));
    },
    save: function (uid, data) {
      var payload = window.BiegStartAuth.normalizeProfileData(data);
      payload.updatedAt = new Date().toISOString();
      fbState.docs[uid] = JSON.parse(JSON.stringify(payload));
      return Promise.resolve();
    },
  };
};

/* ---------- Konfiguracja: Firebase WŁĄCZONY ---------- */
window.BIEGSTART_FIREBASE_ENABLED = true;
window.BIEGSTART_FIREBASE_CONFIG = {
  apiKey: "AIzaSyTESTKEY",
  authDomain: "biegstart-test.firebaseapp.com",
  projectId: "biegstart-test",
  storageBucket: "biegstart-test.appspot.com",
  messagingSenderId: "1234567890",

/* ---------- TESTY ---------- */
async function runFirebaseTests() {
  /* 1. Inicjalizacja Firebase */
  var init = await window.BiegStartFirebase.init();
  ok("Firebase startuje (enabled=true)", init.enabled === true, String(init.reason || ""));
  ok("SDK app-compat doczytany",
    fbState.loadedScripts.some(function (s) { return s.indexOf("firebase-app-compat") !== -1; }));
  ok("SDK auth-compat doczytany",
    fbState.loadedScripts.some(function (s) { return s.indexOf("firebase-auth-compat") !== -1; }));
  ok("SDK firestore-compat doczytany",
    fbState.loadedScripts.some(function (s) { return s.indexOf("firebase-firestore-compat") !== -1; }));
  ok("wersja SDK z firebase-config.js w adresach URL",
    fbState.loadedScripts.every(function (s) { return s.indexOf("/10.12.0/") !== -1; }));
  ok("initializeApp otrzymał konfigurację z firebase-config.js",
    !!fakeFirebase.__config && fakeFirebase.__config.projectId === "biegstart-test");
  ok("sesja ustawiona na LOCAL (pamięć po odświeżeniu)",
    fbState.persistenceSet === "local", String(fbState.persistenceSet));

  var auth = window.BiegStartAuth;

  /* 2. Adaptery podmienione na Firebase + Firestore */
  ok("adapter kont = firebase", auth._auth.id === "firebase", auth._auth.id);
  ok("adapter danych = firestore", auth._data.id === "firestore", auth._data.id);
  ok("isCloudStorage() = true", auth.isCloudStorage() === true);
  ok("supportsGoogle() = true", auth.supportsGoogle() === true);

  /* 3. onAuthStateChanged podpięte */
  ok("onAuthStateChanged zarejestrowany", fbState.authListeners.length >= 1,
    String(fbState.authListeners.length));

  /* 4. UI: przycisk Google i notka o chmurze */
  auth._renderMode();
  ok("przycisk Google widoczny", document.getElementById("authGoogleWrap").hidden === false);
  ok("notka o chmurze (Firestore)",
    document.getElementById("authNote").textContent === "authNoteCloud",
    document.getElementById("authNote").textContent);

  /* 5. Rejestracja przez Firebase */
  var created = await auth.register("anna@example.com", "tajne1", "Anna");
  ok("rejestracja przez Firebase działa", !!created && created.id === "uid_anna");
  ok("wyświetlana nazwa ustawiona", created.displayName === "Anna", created.displayName);

  /* 6. Zapis postępu treningów i odznak do Firestore */
  auth.updateProfileSync(function (p) {
    p.state.completed = [0, 1, 2, 3];
    p.state.badges = ["firstStep", "weekOne"];
    p.routes = [{ id: 7, distance: 5.1 }];
  });

  /* 7. Kody błędów Firebase -> komunikaty i18n */
  await auth.logout();
  await new Promise(function (r) { setTimeout(r, 40); });
  var errText = "";
  try { await auth.login("anna@example.com", "zle-haslo"); }
  catch (e) { errText = auth._translateError(e); }
  ok("auth/wrong-password -> 'authErrWrongPassword'",
    errText === "authErrWrongPassword", errText);

  var dupText = "";
  try { await auth.register("anna@example.com", "tajne1", "Anna"); }
  catch (e) { dupText = auth._translateError(e); }
  ok("auth/email-already-in-use -> 'authErrEmailExists'",
    dupText === "authErrEmailExists", dupText);

  var notFoundText = "";
  try { await auth.login("nikt@example.com", "tajne1"); }
  catch (e) { notFoundText = auth._translateError(e); }
  ok("auth/user-not-found -> 'authErrUserNotFound'",
    notFoundText === "authErrUserNotFound", notFoundText);

  /* 8. Logowanie e-mailem: profil wraca z Firestore */
  var logged = await auth.login("anna@example.com", "tajne1");
  ok("logowanie przez Firebase działa",
    auth.isLoggedIn() === true && logged.email === "anna@example.com");
  var loadedProfile = auth.getProfileSync();
  ok("postęp wczytany z Firestore", JSON.stringify(loadedProfile.state.completed) === "[0,1,2,3]");
  ok("odznaki wczytane z Firestore",
    JSON.stringify(loadedProfile.state.badges) === '["firstStep","weekOne"]');

  /* 9. Logowanie przez Google */
  await auth.logout();
  await new Promise(function (r) { setTimeout(r, 40); });
  var g = await auth.loginWithGoogle();
  ok("logowanie przez Google działa", auth.isLoggedIn() === true && g.email === "jan@gmail.com");
  ok("GoogleAuthProvider użyty w popupie", fbState.popupCalls === 1);
  ok("provider ustawia prompt=select_account",
    !!fbState.lastProvider && !!fbState.lastProvider.params &&
    fbState.lastProvider.params.prompt === "select_account");
  auth.updateProfileSync(function (p) { p.state.completed = [9]; });
  await new Promise(function (r) { setTimeout(r, 60); });
  ok("profil konta Google zapisany w Firestore pod własnym uid",
    !!fbState.docs["google_uid_1"]);

  /* 10. Konto anonimowe Firebase jako gość */
  await auth.logout();
  await new Promise(function (r) { setTimeout(r, 40); });
  var anon = await auth.loginAsGuest();
  ok("gość przez Firebase to konto anonimowe",
    anon.isGuest === true && anon.id === "anon_uid_1");
  ok("signInAnonymously wywołane", fbState.anonCalls === 1);

  /* 11. Wylogowanie czyści stan usługi i SDK */
  await auth.logout();
  await new Promise(function (r) { setTimeout(r, 40); });
  ok("wylogowanie: brak użytkownika", auth.isLoggedIn() === false);
  ok("wylogowanie: SDK bez currentUser", fbState.signedIn === null);

  /* 12. Odtworzenie sesji po „odświeżeniu strony” (onAuthStateChanged) */
  var seen = [];
  auth.onChange(function (u) { seen.push(u ? u.id : null); });
  var persisted = makeFbUser("uid_anna", "anna@example.com", "Anna", false);
  fbState.signedIn = persisted;
  fbState.authListeners.forEach(function (cb) { cb(persisted); });
  await new Promise(function (r) { setTimeout(r, 120); });
  ok("onAuthStateChanged przywraca użytkownika po odświeżeniu", auth.isLoggedIn() === true);
  ok("onChange powiadomił UI", seen.indexOf("uid_anna") !== -1, JSON.stringify(seen));
  var restored = auth.getProfileSync();
  ok("postęp z Firestore wczytany po odświeżeniu",
    JSON.stringify(restored.state.completed) === "[0,1,2,3]",
    JSON.stringify(restored.state.completed));
  ok("odznaki z Firestore wczytane po odświeżeniu",
    JSON.stringify(restored.state.badges) === '["firstStep","weekOne"]');

  /* 13. onAuthStateChanged(null) = wylogowanie w innej karcie */
  fbState.signedIn = null;
  fbState.authListeners.forEach(function (cb) { cb(null); });
  await new Promise(function (r) { setTimeout(r, 80); });
  ok("onAuthStateChanged(null) wylogowuje", auth.isLoggedIn() === false);
}

  await new Promise(function (r) { setTimeout(r, 60); });
  var doc = fbState.docs["uid_anna"];
  ok("dokument users/<uid> utworzony w Firestore", !!doc, JSON.stringify(Object.keys(fbState.docs)));
  ok("postęp treningów w Firestore", JSON.stringify(doc.state.completed) === "[0,1,2,3]");
  ok("odznaki w Firestore", JSON.stringify(doc.state.badges) === '["firstStep","weekOne"]');
  ok("trasy w Firestore", doc.routes.length === 1);
  ok("updatedAt zapisany", typeof doc.updatedAt === "string" && doc.updatedAt.length > 10);

  appId: "1:1234567890:web:abcdef",
};
window.BIEGSTART_FIREBASE_SDK = "10.12.0";

    var api = {
      doc: function () { return {}; },
      enablePersistence: function () { return Promise.resolve(); },
    };
    firebase.firestore.enablePersistence = api.enablePersistence;
    firebase.__dbApi = api;
    return api;
  };

  return firebase;
}

var fakeFirebase = buildFakeFirebase();
