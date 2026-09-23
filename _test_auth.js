/* =========================================================
   Test integracyjny modułu logowania (uruchamiany w Node).
   Sprawdza rejestrację, logowanie, walidację, tryb gościa,
   izolację danych, błędy Firebase i odtwarzanie sesji.
   ========================================================= */
"use strict";

/* Plik testowy działa w dwóch środowiskach:
   • Node (node _test_auth.js) — wymaga wcześniej zdefiniowanych shimów,
   • przeglądarka (_test_auth.html) — używa prawdziwego DOM.
   Wariant przeglądarkowy jest tu jedynym dostępnym (brak Node w systemie),
   więc poniżej wykrywamy środowisko. */
var IS_BROWSER = typeof window !== "undefined" && !!window.document &&
  typeof window.__TEST_ENV !== "undefined";

var path, fs, authSrc;
if (!IS_BROWSER) {
  path = require("path");
  fs = require("fs");
  authSrc = fs.readFileSync(path.join(__dirname, "auth.js"), "utf8");
}

var results = [];
function ok(name, cond, extra) {
  results.push({ name: name, pass: !!cond, extra: extra || "" });
}

/* ---------- Środowisko: prawdziwy DOM albo atrapa ---------- */
var ELEMENTS = {};
var realDocument = IS_BROWSER ? window.document : null;

/* W przeglądarce budujemy minimalny DOM odpowiadający strukturze
   fragmentu index.html (żeby przetestować prawdziwy kod, a nie atrapę). */
if (IS_BROWSER) {
  var html =
    '<div class="auth-gate" id="authGate" aria-hidden="true"><div class="auth-card">' +
      '<button id="authClose"></button>' +
      '<h2 id="authTitle"></h2><p id="authLead"></p>' +
      '<div class="auth-tabs">' +
        '<button class="auth-tab is-active" data-auth-tab="login" role="tab"></button>' +
        '<button class="auth-tab" data-auth-tab="register" role="tab"></button>' +
      '</div>' +
      '<form id="authForm" novalidate>' +
        '<label data-auth-field="name" hidden><input id="authName" /></label>' +
        '<input id="authEmail" type="email" />' +
        '<input id="authPassword" type="password" />' +
        '<p id="authError"></p>' +
        '<button type="submit" id="authSubmit"></button>' +
      '</form>' +
      '<div id="authGoogleWrap" hidden><button id="authGoogle">' +
        '<span data-auth-google-label></span></button></div>' +
      '<p><span id="authSwitchHint"></span><button id="authSwitchMode"></button></p>' +
      '<button id="authGuest"></button>' +
      '<p id="authNote"></p>' +
    '</div></div>' +
    '<div id="headerAuthLinks" hidden>' +
      '<button id="headerLogin"></button><button id="headerRegister"></button>' +
    '</div>' +
    '<div id="profileBar" hidden>' +
      '<span id="profileAvatar"></span><span id="profileName"></span>' +
      '<span id="profileRole"></span><button id="profileLogout"></button>' +
    '</div>';
  var holder = realDocument.createElement("div");
  holder.id = "testHarness";
  holder.innerHTML = html;
  realDocument.body.appendChild(holder);
}

[
  "authGate", "authForm", "authEmail", "authPassword", "authName",
  "authSubmit", "authGuest", "authGoogle", "authGoogleWrap", "authError",
  "authTitle", "authLead", "authSwitchHint", "authSwitchMode", "authNote",
  "authClose", "headerLogin", "headerRegister", "profileLogout",
].forEach(function (id) {
  ELEMENTS[id] = IS_BROWSER
    ? realDocument.getElementById(id)
    : makeEl(id);
});

/* ---------- Minimalna atrapa DOM (tryb Node) ---------- */
function makeEl(id, tag) {
  var set = {};
  return {
    id: id,
    tagName: (tag || "div").toUpperCase(),
    dataset: {},
    classList: {
      add: function (c) { set[c] = true; },
      remove: function (c) { delete set[c]; },
      toggle: function (c, on) { if (on) set[c] = true; else delete set[c]; },
      contains: function (c) { return !!set[c]; },
    },
    style: {},
    hidden: false,
    disabled: false,
    value: "",
    textContent: "",
    innerHTML: "",
    listeners: {},
    attributes: {},
    addEventListener: function (type, fn) {
      (this.listeners[type] = this.listeners[type] || []).push(fn);
    },
    dispatch: function (type, ev) {
      var self = this;
      (this.listeners[type] || []).forEach(function (fn) {
        fn(ev || { type: type, preventDefault: function () {}, target: self });
      });
    },
    setAttribute: function (k, v) { this.attributes[k] = v; },
    getAttribute: function (k) { return this.attributes[k]; },
    focus: function () {},
    reset: function () {},
  };
}

/* Ujednolicony „dispatch”: w przeglądarce zdarzenie DOM, w Node atrapa. */
function fire(el, type) {
  if (!el) return;
  if (IS_BROWSER) {
    el.dispatchEvent(new window.Event(type, { bubbles: true, cancelable: true }));
  } else {
    el.dispatch(type);
  }
}

function closeTestHarness() {
  var h = realDocument && realDocument.getElementById("testHarness");
  if (h && h.parentNode) h.parentNode.removeChild(h);
}

if (IS_BROWSER) {
  window.__fireEvent = fire;
  ELEMENTS.authGate.setAttribute("aria-hidden", "true");
}

var TABS = IS_BROWSER
  ? [].slice.call(realDocument.querySelectorAll(".auth-tab"))
  : [makeEl("tab-login"), makeEl("tab-reg")];
if (!IS_BROWSER) {
  TABS[0].dataset.authTab = "login";
  TABS[1].dataset.authTab = "register";
}
var NAME_FIELD = IS_BROWSER
  ? realDocument.querySelector("[data-auth-field='name']")
  : (function () { var e = makeEl("nameField"); e.hidden = true; return e; })();
var GOOGLE_LABEL = IS_BROWSER
  ? realDocument.querySelector("[data-auth-google-label]")
  : makeEl("googleLabel");

var docListeners = {};
var bodyClassList = IS_BROWSER ? realDocument.body.classList : makeEl("body").classList;

var fakeDocument = IS_BROWSER ? realDocument : {
  getElementById: function (id) { return ELEMENTS[id] || null; },
  querySelector: function (sel) {
    if (sel === "[data-auth-field='name']") return NAME_FIELD;
    if (sel === "[data-auth-google-label]") return GOOGLE_LABEL;
    return null;
  },
  querySelectorAll: function (sel) {
    if (sel === ".auth-tab") return [TABS[0], TABS[1]];
    return [];
  },
  addEventListener: function (type, fn) {
    (docListeners[type] = docListeners[type] || []).push(fn);
  },
  createElement: function (tag) { return makeEl("created-" + tag, tag); },
  head: { appendChild: function () {} },
  body: { classList: bodyClassList },
};

/* ---------- Weryfikowany magazyn danych ----------
   W przeglądarce auth.js korzysta z prawdziwego window.localStorage,
   więc dane kontrolne czytamy właśnie z niego (a nie z atrapy). */
var store = {};
var USE_REAL_LS = IS_BROWSER;

function lsRead(key) {
  if (USE_REAL_LS) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
}

function lsWrite(key, value) {
  if (USE_REAL_LS) {
    try { window.localStorage.setItem(key, String(value)); } catch (e) {}
    return;
  }
  store[key] = String(value);
}

function lsClearAll() {
  if (USE_REAL_LS) {
    try { window.localStorage.clear(); } catch (e) {}
    return;
  }
  store = {};
}

function makeLocalStorage() {
  return {
    getItem: function (k) { return lsRead(k); },
    setItem: function (k, v) { lsWrite(k, v); },
    removeItem: function (k) {
      if (USE_REAL_LS) { try { window.localStorage.removeItem(k); } catch (e) {} }
      else { delete store[k]; }
    },
    clear: function () { lsClearAll(); },
  };
}

/* Tworzy świeżą instancję auth.js (symulacja odświeżenia strony).
   W przeglądarce auth.js jest już załadowany przez <script src>,
   więc pierwsze wywołanie zwraca istniejącą instancję, a kolejne
   wykonują źródło ponownie w izolowanym obiekcie (nowa sesja). */
var firstInstances = [];
function createAuth() {
  if (IS_BROWSER && firstInstances.length === 0) {
    firstInstances.push(window.BiegStartAuth);
    return window.BiegStartAuth;
  }
  var g = {
    document: fakeDocument,
    localStorage: makeLocalStorage(),
    crypto: undefined,
    console: console,
  };
  g.window = g;
  if (!authSrc && IS_BROWSER) {
    // W przeglądarce źródło auth.js pobieramy synchronicznie z serwera
    // plików (test uruchamiamy lokalnie, więc jest dostępne).
    authSrc = readAuthSourceSync();
  }
  var load = new Function("window", "document", "localStorage", "crypto", "console", authSrc);
  load(g, g.document, g.localStorage, g.crypto, g.console);
  firstInstances.push(g.BiegStartAuth);
  return g.BiegStartAuth;
}

/* Źródło auth.js w trybie przeglądarkowym.
   Test jest uruchamiany z pliku (file://), gdzie XHR jest blokowany
   przez przeglądarkę, dlatego treść wkleja generator _build_test.py
   do znacznika <script id="authSource">. */
function readAuthSourceSync() {
  if (IS_BROWSER && typeof window.__AUTH_SOURCE === "string" && window.__AUTH_SOURCE.length) {
    return window.__AUTH_SOURCE;
  }
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "auth.js", false);
    xhr.send(null);
    return xhr.responseText;
  } catch (e) {
    return "";
  }
}

var auth = createAuth();
ok("auth.js eksportuje BiegStartAuth", !!auth);
auth.setTranslator(function (key) { return key; });
lsClearAll();
auth.initUI();

/* ---------- TESTY ASYNCHRONICZNE ---------- */
async function run() {
  /* 3. Walidacja formularza */
  var badCases = [
    ["", "abc123", "REQUIRED"],
    ["niepoprawny", "abc123", "INVALID_EMAIL"],
    ["a@b.pl", "123", "WEAK_PASSWORD"],
  ];
  for (var i = 0; i < badCases.length; i++) {
    var c = badCases[i];
    var code = null;
    try {
      await auth.register(c[0], c[1], "");
    } catch (err) {
      code = err.code;
    }
    ok("walidacja -> " + c[2], code === c[2], "otrzymano: " + code);
  }

  /* 4. Rejestracja */
  var created = await auth.register("anna@example.com", "tajne1", "Anna");
  ok("rejestracja zwraca użytkownika", !!created && created.email === "anna@example.com");
  ok("rejestracja ustawia displayName", created.displayName === "Anna");
  ok("zalogowano po rejestracji", auth.isLoggedIn() === true);

  var dup = null;
  try { await auth.register("anna@example.com", "tajne1", "Anna"); }
  catch (err) { dup = err.code; }
  ok("duplikat e-maila -> EMAIL_EXISTS", dup === "EMAIL_EXISTS", "otrzymano: " + dup);

  /* 5. Wylogowanie i błędne logowanie */
  await auth.logout();
  ok("po wylogowaniu brak sesji", auth.isLoggedIn() === false);
  ok("logout zamyka bramkę", auth.isGateOpen() === false);

  var wrong = null;
  try { await auth.login("anna@example.com", "zle-haslo"); }
  catch (err) { wrong = err.code; }
  ok("złe hasło -> WRONG_PASSWORD", wrong === "WRONG_PASSWORD", "otrzymano: " + wrong);

  var notFound = null;
  try { await auth.login("nikt@example.com", "tajne1"); }
  catch (err) { notFound = err.code; }
  ok("brak konta -> USER_NOT_FOUND", notFound === "USER_NOT_FOUND", "otrzymano: " + notFound);

  var logged = await auth.login("anna@example.com", "tajne1");
  ok("logowanie poprawnym hasłem działa", auth.isLoggedIn() === true && logged.email === "anna@example.com");

  /* 6. Zapis postępu treningów i odznak do profilu użytkownika */
  auth.updateProfileSync(function (p) {
    p.state.completed = [0, 1, 2];
    p.state.badges = ["firstStep"];
    p.routes = [{ id: 1, distance: 3.2 }];
  });
  var uid = auth.getCurrentUser().id;
  var key = auth.dataKeyFor(uid);
  var raw = lsRead(key);
  ok("profil zapisany pod kluczem per użytkownik", !!raw && key.indexOf("biegstart_data_") === 0, key);
  var parsed = JSON.parse(raw || "{}");
  ok("postęp treningów zapisany", JSON.stringify(parsed.state.completed) === "[0,1,2]");
  ok("odznaki zapisane", JSON.stringify(parsed.state.badges) === '["firstStep"]');
  ok("trasy zapisane", (parsed.routes || []).length === 1);

  /* 7. Konto gościa — izolacja danych w localStorage */
  await auth.logout();
  var guest = await auth.loginAsGuest();
  ok("konto gościa ma isGuest=true", guest.isGuest === true);
  ok("id gościa = 'guest'", guest.id === "guest");
  var guestProfile = auth.getProfileSync();
  ok("gość ma pusty własny postęp (izolacja)", guestProfile.state.completed.length === 0);
  ok("gość ma puste własne odznaki (izolacja)", guestProfile.state.badges.length === 0);
  auth.updateProfileSync(function (p) { p.state.completed = [5]; });
  ok("gość zapisuje pod osobnym kluczem",
    JSON.stringify(JSON.parse(lsRead("biegstart_data_guest")).state.completed) === "[5]");
  ok("dane konta nie zostały nadpisane",
    JSON.stringify(JSON.parse(lsRead(key)).state.completed) === "[0,1,2]");

  /* 8. Odtworzenie sesji gościa „po odświeżeniu strony” */
  var auth2 = createAuth();
  var restored = await auth2.init();
  ok("sesja gościa odtworzona po odświeżeniu", !!restored && restored.id === "guest");
  ok("profil gościa wczytany", JSON.stringify(auth2.getProfileSync().state.completed) === "[5]");

  /* 9. Odtworzenie sesji konta „po odświeżeniu strony” */
  await auth.logout();
  await auth.login("anna@example.com", "tajne1");
  var auth3 = createAuth();
  var restoredUser = await auth3.init();
  ok("konto odtworzone po odświeżeniu", !!restoredUser && restoredUser.email === "anna@example.com");
  var p3 = auth3.getProfileSync();
  ok("postęp konta wczytany po odświeżeniu", JSON.stringify(p3.state.completed) === "[0,1,2]");
  ok("odznaki konta wczytane po odświeżeniu", JSON.stringify(p3.state.badges) === '["firstStep"]');

  /* 10. ensureProfileLoaded (ścieżka wymagana przy Firestore) */
  var p4 = await auth3.ensureProfileLoaded();
  ok("ensureProfileLoaded zwraca profil", !!p4 && p4.version === 1);

  /* 11. Most Firebase: applyExternalUser + onChange */
  var seen = [];
  auth.onChange(function (u) { seen.push(u ? (u.id || u.email) : null); });
  await auth.applyExternalUser({
    id: "fb_uid_123", email: "fb@example.com", displayName: "FB User",
    isGuest: false, createdAt: "2024-01-01T00:00:00Z",
  });
  ok("applyExternalUser loguje użytkownika", auth.isLoggedIn() === true);
  ok("onChange powiadomił o logowaniu", seen.length === 1 && seen[0] === "fb_uid_123", JSON.stringify(seen));
  await auth.applyExternalUser(null);
  ok("applyExternalUser(null) wylogowuje", auth.isLoggedIn() === false);
  ok("onChange powiadomił o wylogowaniu", seen.length === 2 && seen[1] === null, JSON.stringify(seen));

  /* 12. Mapowanie kodów błędów Firebase na klucze i18n */
  var map = [
    ["auth/email-already-in-use", "authErrEmailExists"],
    ["auth/wrong-password", "authErrWrongPassword"],
    ["auth/invalid-credential", "authErrWrongPassword"],
    ["auth/user-not-found", "authErrUserNotFound"],
    ["auth/weak-password", "authErrWeakPassword"],
    ["auth/invalid-email", "authErrInvalidEmail"],
    ["auth/too-many-requests", "authErrTooManyRequests"],
    ["auth/network-request-failed", "authErrNetwork"],
    ["auth/popup-closed-by-user", "authErrPopupClosed"],
    ["auth/popup-blocked", "authErrPopupBlocked"],
    ["auth/operation-not-allowed", "authErrProviderDisabled"],
  ];
  map.forEach(function (m) {
    var text = auth._translateError({ code: m[0] });
    ok("kod " + m[0] + " -> " + m[1], text === m[1], "otrzymano: " + text);
  });
  ok("nieznany kod -> authErrGeneric", auth._translateError({ code: "auth/nowy-kod" }) === "authErrGeneric");
  ok("brak obiektu błędu -> authErrGeneric", auth._translateError(null) === "authErrGeneric");

  /* 13. Przełączanie trybu logowanie / rejestracja */
  auth.open("register");
  ok("rejestracja pokazuje pole nazwy", NAME_FIELD.hidden === false);
  ok("tytuł w trybie rejestracji", ELEMENTS.authTitle.textContent === "authTitleRegister");
  ok("submit w trybie rejestracji", ELEMENTS.authSubmit.textContent === "authRegisterBtn");
  auth.open("login");
  ok("logowanie ukrywa pole nazwy", NAME_FIELD.hidden === true);
  ok("tytuł w trybie logowania", ELEMENTS.authTitle.textContent === "authTitleLogin");
  ok("submit w trybie logowania", ELEMENTS.authSubmit.textContent === "authLoginBtn");
  ok("notka o localStorage (adapter lokalny)", ELEMENTS.authNote.textContent === "authNote");

  /* 14. Gość może zamknąć modal (X / Escape / tło) */
  await auth.logout();
  await auth.loginAsGuest();
  auth.open("login");
  ok("przycisk X widoczny dla zalogowanego", ELEMENTS.authClose.hidden === false);
  ok("gość może zamknąć bramkę", auth.close() === true);
  ok("bramka zamknięta dla gościa", auth.isGateOpen() === false);

  /* 15. Klik w zakładkę „Rejestracja” przełącza tryb */
  await auth.logout();
  auth.open("login");
  TABS[1].classList.add("auth-tab");
  fire(TABS[1], "click");
  ok("klik zakładki Rejestracja -> tryb register", ELEMENTS.authTitle.textContent === "authTitleRegister");
  fire(TABS[0], "click");
  ok("klik zakładki Logowanie -> tryb login", ELEMENTS.authTitle.textContent === "authTitleLogin");

  /* 16. Formularz: submit loguje użytkownika */
  ELEMENTS.authEmail.value = "anna@example.com";
  ELEMENTS.authPassword.value = "tajne1";
  fire(ELEMENTS.authForm, "submit");
  await new Promise(function (r) { setTimeout(r, 300); });
  ok("submit formularza loguje użytkownika", auth.isLoggedIn() === true,
    "email: " + ((auth.getCurrentUser() || {}).email));
  ok("brak komunikatu błędu po udanym logowaniu", ELEMENTS.authError.textContent === "",
    ELEMENTS.authError.textContent);

  /* 17. Formularz: błędne dane pokazują komunikat */
  await auth.logout();
  auth.open("login");
  ELEMENTS.authEmail.value = "anna@example.com";
  ELEMENTS.authPassword.value = "zle-haslo";
  fire(ELEMENTS.authForm, "submit");
  await new Promise(function (r) { setTimeout(r, 300); });
  ok("błędne hasło pokazuje komunikat", ELEMENTS.authError.textContent === "authErrWrongPassword",
    ELEMENTS.authError.textContent);
  ok("brak sesji po nieudanym logowaniu", auth.isLoggedIn() === false);

  /* 18. Przycisk gościa w formularzu */
  fire(ELEMENTS.authGuest, "click");
  await new Promise(function (r) { setTimeout(r, 300); });
  ok("przycisk 'Kontynuuj jako gość' loguje jako gościa",
    auth.isLoggedIn() === true && auth.getCurrentUser().isGuest === true);

  /* 19. Google w adapterze lokalnym -> czytelny błąd */
  var googleErr = null;
  try { await auth.loginWithGoogle(); } catch (err) { googleErr = err.code; }
  ok("loginWithGoogle (adapter lokalny) -> GOOGLE_UNAVAILABLE",
    googleErr === "GOOGLE_UNAVAILABLE", "otrzymano: " + googleErr);

  /* 20. Wylogowanie z paska profilu */
  fire(ELEMENTS.profileLogout, "click");
  await new Promise(function (r) { setTimeout(r, 150); });
  ok("przycisk Wyloguj kończy sesję", auth.isLoggedIn() === false);

  /* 21. Sprzątanie DOM testowego */
  if (IS_BROWSER) closeTestHarness();
}

/* ---------- RAPORT ---------- */
function report() {
  var failed = results.filter(function (r) { return !r.pass; });
  var lines = results.map(function (r) {
    return (r.pass ? "  OK   " : "  FAIL ") + r.name + (r.extra ? "   [" + r.extra + "]" : "");
  });
  var text = lines.join("\n") + "\n\n" + "=".repeat(64) + "\n";
  if (failed.length) {
    text += "NIEPOWODZENIA: " + failed.length + "\n";
    failed.forEach(function (f) { text += "  FAIL " + f.name + "   " + f.extra + "\n"; });
  }
  text += "WYNIK: " + (results.length - failed.length) + "/" + results.length + " testów zaliczonych\n";
  text += "STATUS: " + (failed.length ? "FAIL" : "SUCCESS");
  text += "\n" + "=".repeat(64);

  console.log(text);
  if (IS_BROWSER) {
    var pre = realDocument.getElementById("out");
    if (pre) pre.textContent = text;
    realDocument.title = "WYNIK " + (results.length - failed.length) + "/" + results.length +
      " " + (failed.length ? "FAIL" : "SUCCESS");
    window.__TEST_RESULTS = { total: results.length, failed: failed.length, results: results };
  } else {
    process.exit(failed.length ? 1 : 0);
  }
}

run().then(report, function (e) {
  console.error("WYJĄTEK W TESTACH:", (e && e.stack) || e);
  results.push({ name: "wyjątek w testach", pass: false, extra: String((e && e.message) || e) });
  report();
});
