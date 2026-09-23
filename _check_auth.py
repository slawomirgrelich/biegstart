"""Kontrola spójności modułu logowania BiegStart (weryfikacja lokalna)."""
import io
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE)

html = io.open("index.html", encoding="utf-8").read()
js_all = ""
for f in ("auth.js", "app.js", "firebase-init.js", "firebase-adapter.js"):
    js_all += io.open(f, encoding="utf-8").read()

problems = []

# 1) Czy każdy element pobierany przez getElementById istnieje w HTML?
ids = set(re.findall(r'id="([^"]+)"', html))
refs = set(re.findall(r'getElementById\("([^"]+)"\)', js_all))
missing_ids = sorted(r for r in refs if r not in ids)
if missing_ids:
    problems.append("Brak w HTML dla getElementById: %s" % missing_ids)

# 2) Czy każdy klucz data-i18n z HTML ma tłumaczenie PL i EN?
keys = sorted(set(re.findall(r'data-i18n="([^"]+)"', html)))
pl_part, en_part = js_all.split("en: {", 1)
for k in keys:
    if not re.search(r"^\s{4}" + re.escape(k) + r":", pl_part, re.M):
        problems.append("Brak tłumaczenia PL dla klucza: " + k)
    if not re.search(r"^\s{4}" + re.escape(k) + r":", en_part, re.M):
        problems.append("Brak tłumaczenia EN dla klucza: " + k)

# 3) Czy wszystkie klucze używane przez auth.js (ERROR_KEYS itd.) istnieją?
auth_src = io.open("auth.js", encoding="utf-8").read()
used_keys = set(re.findall(r'_tr\("([a-zA-Z0-9]+)"\)', auth_src))
used_keys |= set(re.findall(r'"key":\s*"([a-zA-Z0-9]+)"', auth_src))
used_keys |= set(re.findall(r'_tr\([^)]*\?\s*"([a-zA-Z0-9]+)"', auth_src))
used_keys |= set(re.findall(r'\?\s*"([a-zA-Z0-9]+)"\s*:\s*"([a-zA-Z0-9]+)"', auth_src)[0]
                 if False else [])
for k in sorted(used_keys):
    if not re.search(r"^\s{4}" + re.escape(k) + r":", pl_part, re.M):
        problems.append("auth.js używa klucza bez tłumaczenia PL: " + k)

# 4) Wymagane elementy interfejsu logowania
required = [
    "authGate", "authCard" if False else "authClose", "authForm", "authEmail",
    "authPassword", "authName", "authSubmit", "authGuest", "authGoogle",
    "authGoogleWrap", "authError", "authSwitchMode", "authSwitchHint",
    "authNote", "headerLogin", "headerRegister", "headerAuthLinks",
    "profileBar", "profileAvatar", "profileName", "profileRole", "profileLogout",
]
for r in required:
    if r not in ids:
        problems.append("Brak wymaganego elementu HTML: " + r)

# 5) Czy skrypty są dołączone w poprawnej kolejności?
order = ["firebase-config.js", "auth.js", "firebase-adapter.js",
         "firebase-init.js", "app.js"]
positions = []
for name in order:
    m = re.search(r'<script src="' + re.escape(name) + r'"', html)
    positions.append((name, m.start() if m else -1))
for name, pos in positions:
    if pos < 0:
        problems.append("Brak znacznika <script> dla: " + name)
sorted_pos = [p for _, p in positions if p >= 0]
if sorted_pos != sorted(sorted_pos):
    problems.append("Zła kolejność skryptów w index.html: %s" % positions)

# 6) Czy moduły Firebase są importowane przez firebase-init.js?
init_src = io.open("firebase-init.js", encoding="utf-8").read()
for pkg in ("firebase-app.js", "firebase-auth.js", "firebase-firestore.js"):
    if pkg not in init_src:
        problems.append("firebase-init.js nie ładuje: " + pkg)

print("Klucze data-i18n w HTML:", len(keys))
print("Elementy id w HTML:", len(ids))
print("Kolejność skryptów OK" if not any("kolejność" in p for p in problems) else "Kolejność skryptów: BŁĄD")
print("-" * 60)
if problems:
    for p in problems:
        print("PROBLEM:", p)
    sys.exit(1)
print("WSZYSTKO OK — brak problemów.")
