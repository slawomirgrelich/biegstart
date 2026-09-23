/* =========================================================
   BiegStart — konfiguracja Firebase
   ---------------------------------------------------------
   ⚠️  UZUPEŁNIJ PONIŻSZE WARTOŚCI WŁASNĄ KONFIGURACJĄ.

   Skąd wziąć dane (krok po kroku):
     1. Wejdź na https://console.firebase.google.com i utwórz
        nowy projekt (np. "biegstart").
     2. W konsoli projektu kliknij ikonę „</>” (Web) i zarejestruj
        aplikację — konsola pokaże gotowy obiekt `firebaseConfig`.
     3. Wklej te wartości poniżej (zamiast placeholderów).
     4. Włącz logowanie: Authentication → Sign-in method →
          • E-mail/Password          (wymagane)
          • Google                   (dla „Zaloguj przez Google”)
          • Anonymous                (opcjonalnie — konto gościa w chmurze)
     5. Utwórz bazę: Firestore Database → Create database.
     6. Ustaw reguły bezpieczeństwa (Firestore → Rules), aby każdy
        użytkownik widział wyłącznie swoje dane:

          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /users/{uid} {
                allow read, write: if request.auth != null
                                   && request.auth.uid == uid;
              }
            }
          }

     7. Dodaj swoją domenę do Authentication → Settings →
        Authorized domains (np. localhost jest domyślnie dodany,
        ale własna domena hostingowa już nie).

   Uwaga: klucz `apiKey` w aplikacji webowej NIE jest sekretem —
   bezpieczeństwo zapewniają reguły Firestore oraz domena
   autoryzowana w konsoli Firebase.

   Aby WŁĄCZYĆ Firebase w aplikacji, zmień flagę poniżej na `true`.
   Gdy flaga ma wartość `false` (lub konfiguracja jest nieuzupełniona),
   aplikacja działa w trybie lokalnym (localStorage) i pozostaje
   w pełni funkcjonalna.
   ========================================================= */

window.BIEGSTART_FIREBASE_ENABLED = true;

window.BIEGSTART_FIREBASE_CONFIG = {
  apiKey : "AIzaSyCSJ14DKLpAy9F0IZtAVW2L1nSCdNk4d7k" , 
  authDomain : "bieganie-app.firebaseapp.com" , 
  projectId : "bieganie-app" , 
  storageBucket : "bieganie-app.firebasestorage.app" , 
  messagingSenderId : "1085031240046" , 
  appId: "1:1085031240046:web:24ad98bb724896b5a2317f",
  measurementId: "G-XXXXXXXXXX", // opcjonalne (Analytics)
};

/* Wersja SDK Firebase modular — spójna z adresami w firebase-init.js.
   Trzymana w jednym miejscu, aby łatwo ją było zaktualizować. */
window.BIEGSTART_FIREBASE_SDK = "10.12.0";
