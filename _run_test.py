"""Generuje _test_auth.html z wklejonym źródłem auth.js i uruchamia test
w headless Chrome, wypisując wynik.

Użycie:
    python _run_test.py
"""
import io
import os
import re
import subprocess
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE)

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
TEMPLATE = "_test_auth_template.html"
OUT = "_test_auth.html"

# 1. Zbuduj stronę testową z wklejonym auth.js
template = io.open(TEMPLATE, encoding="utf-8").read()
auth_src = io.open("auth.js", encoding="utf-8").read()
# Znacznik zamknięcia skryptu nie może wystąpić w danych
auth_src = auth_src.replace("</script", "<\\/script")
html = template.replace("/*__AUTH_SOURCE__*/", auth_src)
io.open(OUT, "w", encoding="utf-8").write(html)
print("Zbudowano %s (%d znaków źródła auth.js)" % (OUT, len(auth_src)))

# 2. Uruchom test w headless Chrome
cmd = [
    CHROME,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--virtual-time-budget=20000",
    "--enable-logging=stderr",
    "--log-level=0",
    "--dump-dom",
    "file:///" + OUT.replace("\\", "/"),
]
proc = subprocess.run(cmd, capture_output=True, text=True, errors="replace")
dom = proc.stdout or ""
err = proc.stderr or ""

# 3. Wyciągnij raport z <pre id="out">
m = re.search(r'<pre id="out"[^>]*>(.*?)</pre>', dom, re.S)
if not m:
    print("Nie znaleziono raportu w DOM.", file=sys.stderr)
    print("--- STDERR ---")
    print("\n".join(l for l in err.splitlines() if "CONSOLE" in l or "ERROR" in l)[:4000])
    sys.exit(1)

report = m.group(1)
# Odkoduj encje HTML
for a, b in (("&lt;", "<"), ("&gt;", ">"), ("&amp;", "&"), ("&quot;", '"')):
    report = report.replace(a, b)

print(report)

# Dodatkowo pokaż błędy konsoli (jeśli są)
errors = [l for l in err.splitlines() if "Uncaught" in l or "SEVERE" in l]
if errors:
    print("\n--- BŁĘDY KONSOLI ---")
    for e in errors:
        print(e)

sys.exit(1 if "STATUS: FAIL" in report else 0)
