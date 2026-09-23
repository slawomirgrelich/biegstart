/* =========================================================
   BiegStart - aplikacja do regularnego biegania (PL / EN)
   Plan: 10 tygodni, treningi co 2-3 dni, start od spacerow.
   Funkcje: dwujezycznosc, progresja, stoper interwalowy.
   ========================================================= */

/* ---------- SLOWNIK INTERFEJSU (UI) ---------- */
const I18N = {
  pl: {
    docTitle: "BiegStart - Twoja droga do regularnego biegania",
    htmlLang: "pl",
    heroBadge: "BiegStart",
    heroTitle1: "Zacznij biegać",
    heroTitle2: "bez presji",
    heroLead:
      "Treningi co 2-3 dni (nie codziennie!), start od bardzo latwych spacerow i truchtu. Kazde zadanie przybliza Cie do pierwszego ciaglego biegu.",
    btnNext: "Zobacz nastepny trening",
    btnPlan: "Caly plan",
    btnTimer: "Stoper",
    statCompleted: "Ukonczone treningi",
    statProgress: "Postep planu",
    statStreak: "Seria treningow",
    statMinutes: "Minut w ruchu",
    nextTitle: "Nastepny trening",
    restTitle: "Dni odpoczynku sa czescia planu.",
    restText:
      "Miedzy treningami masz 1-2 dni przerwy. Odpoczynek to nie lenistwo - to sposob, w jaki miesnie sie wzmacniaja. Nie nadrabiaj zaleglosci na sile.",
    planTitle: "Plan treningowy",
    planHint:
      "Kliknij kafelek, aby odblokować szczegóły treningu. Ukończone dni zmieniają kolor na zielony z haczykiem.",
    filterAll: "Wszystkie",
    filterTodo: "Do zrobienia",
    filterDone: "Ukonczone",
    motivationTitle: "Motywacja na dzis",
    motivationTip: "Najtrudniejszy jest pierwszy krok za drzwi. Reszte juz nosisz ze soba.",
    resetBtn: "Resetuj postep",
    footerNote: "Twoje postepy zapisuja sie w tej przegladarce (localStorage).",
    day: "Dzień",
    weekShort: "Tydz.",
    week: "Tydzień",
    dayShort: "Dzień",
    diffEasy: "Bardzo łatwy",
    diffMedium: "Umiarkowany",
    diffBuild: "Budujący",
    time: "Czas",
    restAfter: "Odpoczynek po",
    status: "Status",
    statusDone: "Ukończony ✓",
    statusTodo: "Do zrobienia",
    markDone: "Oznacz jako zrobione ✓",
    unmark: "Cofnij oznaczenie",
    days: "dni",
    today: "Dziś",
    planDone: "Plan ukończony",
    mastery: "Mistrzostwo",
    congratsTitle: "Ukończyłeś cały plan! 🏆",
    congratsDesc:
      "Przeszedłeś od spacerów do 30 minut ciągłego biegu. Jesteś teraz osobą, która regularnie biega. Kontynuuj w swoim rytmie - odpoczywaj między treningami i słuchaj ciała.",
    total: "Łącznie",
    workouts: "Treningi",
    tileTitleTodo: "Kliknij, aby oznaczyć jako zrobione i zobaczyć szczegóły",
    tileTitleDone: "Kliknij, aby zobaczyć szczegóły",
    detailsPlaceholder:
      "Kliknij kafelek powyżej, aby zobaczyć szczegóły treningu i oznaczyć go jako zrobiony.",
    emptyDone: "Brak ukończonych treningów. Zacznij od pierwszego!",
    emptyTodo: "Wszystko odhaczone w tym widoku. Świetna robota!",
    resetConfirm: "Na pewno chcesz usunąć cały postęp? Tej operacji nie można cofnąć.",
    timerTitle: "Stoper interwałowy",
    timerHint:
      "Ustaw czasy marszu i truchtu albo pobierz je automatycznie z wybranego treningu. Stoper odlicza fazy i sygnalizuje zmiany dźwiękiem.",
    timerWalk: "Marsz (sekundy)",
    timerRun: "Trucht / bieg (sekundy)",
    timerRounds: "Liczba rund",
    timerStart: "Start",
    timerPause: "Pauza",
    timerReset: "Reset",
    timerLoadPlan: "Pobierz z wybranego treningu",
    phaseWalk: "MARSZ",
    phaseRun: "TRUCHT",
    phaseDone: "KONIEC",
    timerReady: "Gotowy do startu",
    timerRunning: "Trening w toku",
    timerPaused: "Pauza",
    timerFinished: "Trening ukończony! Świetna robota! 🎉",
    roundOf: "Runda",
    of: "z",
    timerTotal: "Pozostało łącznie",
    timerLoaded: "Pobrano czasy z treningu:",
    timerNoSelection: "Najpierw wybierz trening z planu (kliknij kafelek).",
    timerNoIntervals:
      "Ten trening nie ma wyraźnych interwałów marsz/trucht. Ustaw czasy ręcznie.",
    btnTools: "Kalkulator i mapa",
    toolsTitle: "Kalkulator tempa i kalorii",
    toolsHint:
      "Podaj wagę, dystans i czas - aplikacja policzy tempo, prędkość i spalone kalorie. Możesz też narysować trasę na mapie, a dystans zostanie wpisany automatycznie.",
    activityLabel: "Aktywność",
    actWalk: "Marsz",
    actRun: "Bieg",
    fieldWeight: "Waga (kg)",
    fieldDistance: "Dystans (km)",
    fieldTime: "Czas (minuty)",
    resPace: "Średnie tempo (min/km)",
    resSpeed: "Średnia prędkość (km/h)",
    resCalories: "Spalone kalorie (kcal)",
    calcNote: "Kalorie to szacunek na podstawie MET i wagi - wynik orientacyjny.",
    calcSave: "Zapisz wynik",
    mapLabel: "Mapa trasy (klikaj, aby dodać punkty)",
    mapLocate: "Znajdź moją lokalizację",
    mapRecord: "Rozpocznij trening GPS",
    mapRecordStop: "Zakończ i zapisz trasę",
    mapTiles: "Zmień podkład mapy",
    mapClear: "Wyczyść trasę",
    mapDistance: "Dystans trasy:",
    mapLive: "Nagrywanie na żywo",
    mapRecordDone: "Trasę zapisano w profilu.",
    mapGeoUnsupported: "Geolokalizacja nie jest wspierana przez tę przeglądarkę.",
    savedTitle: "Zapisane trasy i wyniki",
    savedClear: "Usuń wszystkie zapisane",
    savedEmpty: "Brak zapisanych wyników. Policz i zapisz pierwszy!",
    savedDelete: "Usuń",
    savedStats: "Waga",
    noRoute: "Kliknij na mapie, aby narysować trasę.",
    btnGuide: "Poradnik",
    guideTitle: "Baza wiedzy i rozgrzewka dla początkujących",
    guideHint:
      "Krótkie porady, rozwiane mity i gotowy zestaw ćwiczeń rozgrzewkowych - wszystko, czego potrzebujesz na start.",
    tabTips: "Poradnik",
    tabMyths: "Mity o bieganiu",
    tabWarmup: "Rozgrzewka przed biegiem",
    mythLabel: "Mit",
    factLabel: "Fakt",
    repsLabel: "Powtórzenia",
    warmupNote:
      "Rozgrzewka powinna być dynamiczna i trwać 5-8 minut. Nie rozciągaj się na zimno - statyczne rozciąganie zostaw na koniec treningu.",
    warmupNoteTitle: "Wskazówka:",
    /* --- Logowanie / profile --- */
    authTitleLogin: "Zaloguj się",
    authTitleRegister: "Załóż konto",
    authLeadLogin: "Twoje treningi, statystyki i trasy zapisują się na Twoim profilu.",
    authLeadRegister: "Utwórz konto, aby Twoje postępy i odznaki były zapisane w chmurze.",
    authTabLogin: "Logowanie",
    authTabRegister: "Rejestracja",
    authName: "Nazwa użytkownika (opcjonalnie)",
    authEmail: "E-mail",
    authPassword: "Hasło",
    authLoginBtn: "Zaloguj się",
    authRegisterBtn: "Załóż konto",
    authGuestBtn: "Kontynuuj jako gość",
    authOr: "lub",
    authGoogleLogin: "Zaloguj przez Google",
    authGoogleRegister: "Zarejestruj przez Google",
    authNoAccount: "Nie masz konta?",
    authSwitchToRegister: "Zarejestruj się",
    authHaveAccount: "Masz już konto?",
    authSwitchToLogin: "Zaloguj się",
    authNote: "Konto gościa zapisuje dane tylko w tej przeglądarce (localStorage).",
    authNoteCloud: "Postępy treningów i odznaki zapisują się w chmurze (Firestore) i są dostępne na każdym urządzeniu.",
    headerLogin: "Zaloguj się",
    headerRegister: "Zarejestruj",
    profileLogout: "Wyloguj",
    profileGuestName: "Gość",
    profileUserRole: "Twój profil",
    profileGuestRole: "Tryb gościa",
    profileGoogleRole: "Konto Google",
    authErrRequired: "Podaj e-mail i hasło.",
    authErrInvalidEmail: "Podaj poprawny adres e-mail.",
    authErrEmailExists: "Konto z tym e-mailem już istnieje. Zaloguj się.",
    authErrUserNotFound: "Nie znaleziono konta z tym e-mailem.",
    authErrWrongPassword: "Nieprawidłowe hasło.",
    authErrWeakPassword: "Hasło musi mieć co najmniej 6 znaków.",
    authErrTooManyRequests: "Zbyt wiele prób. Odczekaj chwilę i spróbuj ponownie.",
    authErrNetwork: "Brak połączenia z internetem. Sprawdź sieć i spróbuj ponownie.",
    authErrPopupClosed: "Logowanie przez Google zostało anulowane.",
    authErrPopupBlocked: "Przeglądarka zablokowała okno logowania Google. Zezwól na wyskakujące okna.",
    authErrProviderDisabled: "Logowanie przez Google jest niedostępne. Użyj e-maila i hasła.",
    authErrLoginRequired: "Najpierw się zaloguj lub kontynuuj jako gość.",
    authErrGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
    /* --- Osiągnięcia / odznaki --- */
    badgesTitle: "Osiągnięcia",
    badgesHint: "Zdobywaj odznaki, wykonując treningi i korzystając z narzędzi. Zablokowane są szare — zdobyte świecą pełnym kolorem.",
    badgesProgress: "Zdobyte odznaki",
    badgeLocked: "Zablokowana",
    badgeNew: "Nowa odznaka!",
    badgeFirstStep: "Pierwszy Krok",
    badgeFirstStepDesc: "Za odznaczenie pierwszego treningu.",
    badgeWeekOne: "Tydzień w biegu",
    badgeWeekOneDesc: "Za ukończenie wszystkich treningów z pierwszego tygodnia.",
    badgeTimeMaster: "Mistrz Czasu",
    badgeTimeMasterDesc: "Za pierwsze użycie wbudowanego stopera.",
    badgeRouteExplorer: "Odkrywca Trasy",
    badgeRouteExplorerDesc: "Za skorzystanie z mapy w kalkulatorze.",
    /* --- Zakładki --- */
    navDashboard: "Pulpit",
    navPlan: "Plan Treningowy",
    navTraining: "Trening & Mapa",
    navGuide: "Poradnik",
  },
  en: {
    docTitle: "BiegStart - Your path to regular running",
    htmlLang: "en",
    heroBadge: "BiegStart",
    heroTitle1: "Start running",
    heroTitle2: "without pressure",
    heroLead:
      "Workouts every 2-3 days (not every day!), starting with very easy walks and light jogging. Every task brings you closer to your first continuous run.",
    btnNext: "See the next workout",
    btnPlan: "Full plan",
    btnTimer: "Timer",
    statCompleted: "Completed workouts",
    statProgress: "Plan progress",
    statStreak: "Workout streak",
    statMinutes: "Minutes moving",
    nextTitle: "Next workout",
    restTitle: "Rest days are part of the plan.",
    restText:
      "You get 1-2 days of rest between workouts. Rest is not laziness - it's how your muscles get stronger. Don't try to make up for missed days.",
    planTitle: "Training plan",
    planHint:
      "Click a tile to reveal the workout details. Completed days turn green with a check mark.",
    filterAll: "All",
    filterTodo: "To do",
    filterDone: "Completed",
    motivationTitle: "Today's motivation",
    motivationTip: "The hardest step is the first one out the door. The rest is already within you.",
    resetBtn: "Reset progress",
    footerNote: "Your progress is saved in this browser (localStorage).",
    day: "Day",
    weekShort: "Wk.",
    week: "Week",
    dayShort: "Day",
    diffEasy: "Very easy",
    diffMedium: "Moderate",
    diffBuild: "Building",
    time: "Time",
    restAfter: "Rest after",
    status: "Status",
    statusDone: "Completed ✓",
    statusTodo: "To do",
    markDone: "Mark as done ✓",
    unmark: "Undo mark",
    days: "days",
    today: "Today",
    planDone: "Plan complete",
    mastery: "Mastery",
    congratsTitle: "You finished the whole plan! 🏆",
    congratsDesc:
      "You went from walks to a 30-minute continuous run. You are now someone who runs regularly. Keep going at your own pace - rest between workouts and listen to your body.",
    total: "Total",
    workouts: "Workouts",
    tileTitleTodo: "Click to mark as done and see details",
    tileTitleDone: "Click to see details",
    detailsPlaceholder: "Click a tile above to see the workout details and mark it as done.",
    emptyDone: "No completed workouts yet. Start with the first one!",
    emptyTodo: "Everything is checked in this view. Great job!",
    resetConfirm: "Are you sure you want to delete all progress? This cannot be undone.",
    timerTitle: "Interval timer",
    timerHint:
      "Set the walk and jog times, or load them automatically from the selected workout. The timer counts down each phase and beeps on every change.",
    timerWalk: "Walk (seconds)",
    timerRun: "Jog / run (seconds)",
    timerRounds: "Number of rounds",
    timerStart: "Start",
    timerPause: "Pause",
    timerReset: "Reset",
    timerLoadPlan: "Load from selected workout",
    phaseWalk: "WALK",
    phaseRun: "JOG",
    phaseDone: "DONE",
    timerReady: "Ready to start",
    timerRunning: "Workout in progress",
    timerPaused: "Paused",
    timerFinished: "Workout complete! Great job! 🎉",
    roundOf: "Round",
    of: "of",
    timerTotal: "Remaining total",
    timerLoaded: "Loaded times from workout:",
    timerNoSelection: "First select a workout from the plan (click a tile).",
    timerNoIntervals:
      "This workout has no clear walk/jog intervals. Please set the times manually.",
    btnTools: "Calculator & map",
    toolsTitle: "Pace and calorie calculator",
    toolsHint:
      "Enter your weight, distance and time - the app will calculate your pace, speed and calories burned. You can also draw a route on the map and the distance will be filled in automatically.",
    activityLabel: "Activity",
    actWalk: "Walk",
    actRun: "Run",
    fieldWeight: "Weight (kg)",
    fieldDistance: "Distance (km)",
    fieldTime: "Time (minutes)",
    resPace: "Average pace (min/km)",
    resSpeed: "Average speed (km/h)",
    resCalories: "Calories burned (kcal)",
    calcNote: "Calories are an estimate based on MET and weight - an approximate result.",
    calcSave: "Save result",
    mapLabel: "Route map (click to add points)",
    mapLocate: "Find my location",
    mapRecord: "Start GPS workout",
    mapRecordStop: "Stop & save route",
    mapTiles: "Change map layer",
    mapClear: "Clear route",
    mapDistance: "Route distance:",
    mapLive: "Recording live",
    mapRecordDone: "Route saved to your profile.",
    mapGeoUnsupported: "Geolocation is not supported by this browser.",
    savedTitle: "Saved routes and results",
    savedClear: "Delete all saved",
    savedEmpty: "No saved results yet. Calculate and save your first one!",
    savedDelete: "Delete",
    savedStats: "Weight",
    noRoute: "Click on the map to draw a route.",
    btnGuide: "Guide",
    guideTitle: "Knowledge base and warm-up for beginners",
    guideHint:
      "Short tips, debunked myths and a ready set of warm-up exercises - everything you need to start.",
    tabTips: "Guide",
    tabMyths: "Running myths",
    tabWarmup: "Pre-run warm-up",
    mythLabel: "Myth",
    factLabel: "Fact",
    repsLabel: "Reps",
    warmupNote:
      "The warm-up should be dynamic and last 5-8 minutes. Don't stretch when cold - leave static stretching for the end of the workout.",
    warmupNoteTitle: "Tip:",
    /* --- Auth / profiles --- */
    authTitleLogin: "Sign in",
    authTitleRegister: "Create account",
    authLeadLogin: "Your workouts, stats and routes are saved to your profile.",
    authLeadRegister: "Create an account to keep your progress and badges safely in the cloud.",
    authTabLogin: "Sign in",
    authTabRegister: "Sign up",
    authName: "Display name (optional)",
    authEmail: "E-mail",
    authPassword: "Password",
    authLoginBtn: "Sign in",
    authRegisterBtn: "Create account",
    authGuestBtn: "Continue as guest",
    authOr: "or",
    authGoogleLogin: "Sign in with Google",
    authGoogleRegister: "Sign up with Google",
    authNoAccount: "Don't have an account?",
    authSwitchToRegister: "Sign up",
    authHaveAccount: "Already have an account?",
    authSwitchToLogin: "Sign in",
    authNote: "A guest account saves data only in this browser (localStorage).",
    authNoteCloud: "Workout progress and badges are stored in the cloud (Firestore) and available on every device.",
    headerLogin: "Sign in",
    headerRegister: "Sign up",
    profileLogout: "Log out",
    profileGuestName: "Guest",
    profileUserRole: "Your profile",
    profileGuestRole: "Guest mode",
    profileGoogleRole: "Google account",
    authErrRequired: "Please enter your e-mail and password.",
    authErrInvalidEmail: "Please enter a valid e-mail address.",
    authErrEmailExists: "An account with this e-mail already exists. Please sign in.",
    authErrUserNotFound: "No account found with this e-mail.",
    authErrWrongPassword: "Incorrect password.",
    authErrWeakPassword: "The password must be at least 6 characters long.",
    authErrTooManyRequests: "Too many attempts. Please wait a moment and try again.",
    authErrNetwork: "No internet connection. Check your network and try again.",
    authErrPopupClosed: "Google sign-in was cancelled.",
    authErrPopupBlocked: "Your browser blocked the Google sign-in window. Allow pop-ups.",
    authErrProviderDisabled: "Google sign-in is unavailable. Please use your e-mail and password.",
    authErrLoginRequired: "Please sign in or continue as a guest first.",
    authErrGeneric: "Something went wrong. Please try again.",
    /* --- Achievements / badges --- */
    badgesTitle: "Achievements",
    badgesHint: "Earn badges by completing workouts and using the tools. Locked ones are grey — earned ones glow in full colour.",
    badgesProgress: "Badges earned",
    badgeLocked: "Locked",
    badgeNew: "New badge!",
    badgeFirstStep: "First Step",
    badgeFirstStepDesc: "For completing your first workout.",
    badgeWeekOne: "Week on the Run",
    badgeWeekOneDesc: "For completing all workouts from the first week.",
    badgeTimeMaster: "Time Master",
    badgeTimeMasterDesc: "For using the built-in timer for the first time.",
    badgeRouteExplorer: "Route Explorer",
    badgeRouteExplorerDesc: "For using the map in the calculator.",
    /* --- Tabs --- */
    navDashboard: "Dashboard",
    navPlan: "Training Plan",
    navTraining: "Workout & Map",
    navGuide: "Guide",
  },
};

/* ---------- PLAN TRENINGOWY (dwujezyczny) ----------
   spacing = ile dni odpoczynku po treningu (przed kolejnym)
   difficulty: easy | medium | build
   duration: przyblizony czas w minutach
------------------------------------------------------- */
const PLAN = [
  {
    week: 1,
    difficulty: "easy",
    duration: 20,
    spacing: 2,
    title: { pl: "Spokojny spacer", en: "Calm walk" },
    desc: {
      pl: "Wyjdź na 20 minut spaceru. Tempo takie, żebyś mógł swobodnie rozmawiać. Zero biegania - dziś tylko oswojenie ciała i głowy z ruchem.",
      en: "Go for a 20-minute walk. A pace at which you can talk comfortably. No running - today is just about getting your body and mind used to movement.",
    },
  },
  {
    week: 1,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Spacer + 3x1 min truchtu", en: "Walk + 3x1 min light jog" },
    desc: {
      pl: "15 minut spaceru, a w środku 3 krótkie przebieżki po 1 minucie. Bardzo wolne, luźne. Między przebieżkami 2-3 minuty marszu.",
      en: "15 minutes of walking, with 3 short 1-minute jogs in the middle. Very slow and relaxed. Walk for 2-3 minutes between the jogs.",
    },
  },
  {
    week: 1,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Dluzszy spacer", en: "Longer walk" },
    desc: {
      pl: "25 minut spaceru w spokojnym tempie. Ciesz się trasą - to nie trening na wynik, a budowanie nawyku.",
      en: "A 25-minute walk at a calm pace. Enjoy the route - this isn't about performance, it's about building a habit.",
    },
  },
  {
    week: 2,
    difficulty: "easy",
    duration: 30,
    spacing: 2,
    title: { pl: "Spacer + 4x2 min truchtu", en: "Walk + 4x2 min light jog" },
    desc: {
      pl: "10 minut spaceru na rozgrzewkę, potem 4 przebieżki po 2 minuty w bardzo spokojnym tempie, a między nimi 2 minuty marszu.",
      en: "10 minutes of walking to warm up, then 4 jogs of 2 minutes at a very calm pace, with 2 minutes of walking in between.",
    },
  },
  {
    week: 2,
    difficulty: "easy",
    duration: 30,
    spacing: 2,
    title: { pl: "Spacer aktywny", en: "Brisk walk" },
    desc: {
      pl: "30 minut energicznego spaceru. Szybsze kroki, ale bez zadyszki. Wpleć 5 minut truchtu, jeśli poczujesz się dobrze.",
      en: "A 30-minute brisk walk. Faster steps, but no breathlessness. Add 5 minutes of light jogging if you feel good.",
    },
  },
  {
    week: 2,
    difficulty: "medium",
    duration: 32,
    spacing: 2,
    title: { pl: "Interwaly 5x2 min", en: "Intervals 5x2 min" },
    desc: {
      pl: "8 minut spaceru, następnie 5 odcinków po 2 minuty truchtu przeplatanych 90 sekundami marszu. To już prawdziwy trening.",
      en: "8 minutes of walking, then 5 intervals of 2 minutes of light jogging alternating with 90 seconds of walking. This is a real workout now.",
    },
  },
  {
    week: 3,
    difficulty: "easy",
    duration: 20,
    spacing: 2,
    title: { pl: "Spokojny spacer regeneracyjny", en: "Calm recovery walk" },
    desc: {
      pl: "20 minut lekkiego spaceru. Nogi odpoczywają po poprzednim treningu. Bez pośpiechu.",
      en: "20 minutes of an easy walk. Your legs recover from the last workout. No rush.",
    },
  },
  {
    week: 3,
    difficulty: "medium",
    duration: 35,
    spacing: 2,
    title: { pl: "Interwaly 5x3 min truchtu", en: "Intervals 5x3 min light jog" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, potem 5 odcinków po 3 minuty bardzo spokojnego truchtu z 2 minutami marszu między nimi.",
      en: "5 minutes of walking to warm up, then 5 intervals of 3 minutes of very calm jogging with 2 minutes of walking between them.",
    },
  },
  {
    week: 3,
    difficulty: "medium",
    duration: 30,
    spacing: 2,
    title: { pl: "Bieg ciagly 8 minut", en: "Continuous run 8 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, potem 8 minut ciągłego, wolnego biegu w tempie konwersacyjnym. Na koniec 3 minuty marszu na uspokojenie.",
      en: "5 minutes of walking to warm up, then 8 minutes of a continuous, slow run at a conversational pace. Finish with 3 minutes of walking to cool down.",
    },
  },
  {
    week: 4,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "25 minut spaceru. Utrzymujemy regularność - dziś regeneracja, jutro siła.",
      en: "A 25-minute walk. We keep the regularity - today recovery, tomorrow strength.",
    },
  },
  {
    week: 4,
    difficulty: "medium",
    duration: 38,
    spacing: 2,
    title: { pl: "Interwaly 4x4 min truchtu", en: "Intervals 4x4 min light jog" },
    desc: {
      pl: "6 minut spaceru, potem 4 odcinki po 4 minuty spokojnego truchtu, między nimi 2 minuty marszu.",
      en: "6 minutes of walking, then 4 intervals of 4 minutes of calm jogging, with 2 minutes of walking between them.",
    },
  },
  {
    week: 4,
    difficulty: "medium",
    duration: 32,
    spacing: 2,
    title: { pl: "Bieg ciagly 10 minut", en: "Continuous run 10 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, następnie 10 minut ciągłego biegu w komfortowym tempie, na koniec 3 minuty marszu.",
      en: "5 minutes of walking to warm up, then 10 minutes of a continuous run at a comfortable pace, finishing with 3 minutes of walking.",
    },
  },
  {
    week: 5,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "25 minut spaceru. Dbaj o oddech i luźne ramiona. Dziś spokojnie.",
      en: "A 25-minute walk. Focus on your breathing and relaxed shoulders. Take it easy today.",
    },
  },
  {
    week: 5,
    difficulty: "medium",
    duration: 38,
    spacing: 2,
    title: { pl: "Interwaly 3x6 min truchtu", en: "Intervals 3x6 min light jog" },
    desc: {
      pl: "5 minut spaceru, potem 3 odcinki po 6 minut truchtu w stałym, spokojnym tempie, między nimi 2 minuty marszu.",
      en: "5 minutes of walking, then 3 intervals of 6 minutes of jogging at a steady, calm pace, with 2 minutes of walking between them.",
    },
  },
  {
    week: 5,
    difficulty: "build",
    duration: 34,
    spacing: 2,
    title: { pl: "Bieg ciagly 12 minut", en: "Continuous run 12 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, 12 minut ciągłego biegu w tempie, w którym możesz mówić krótkie zdania. Na koniec 3 minuty marszu.",
      en: "5 minutes of walking to warm up, 12 minutes of a continuous run at a pace where you can speak short sentences. Finish with 3 minutes of walking.",
    },
  },
  {
    week: 6,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "20-25 minut łatwego spaceru. Regeneracja jest częścią planu, nie przerwą od niego.",
      en: "20-25 minutes of an easy walk. Recovery is part of the plan, not a break from it.",
    },
  },
  {
    week: 6,
    difficulty: "build",
    duration: 40,
    spacing: 2,
    title: { pl: "Interwaly 3x8 min truchtu", en: "Intervals 3x8 min jog" },
    desc: {
      pl: "5 minut spaceru, 3 odcinki po 8 minut spokojnego biegu, między nimi 2 minuty marszu. Oddech pod kontrolą.",
      en: "5 minutes of walking, 3 intervals of 8 minutes of calm running, with 2 minutes of walking between them. Keep your breathing under control.",
    },
  },
  {
    week: 6,
    difficulty: "build",
    duration: 38,
    spacing: 2,
    title: { pl: "Bieg ciagly 15 minut", en: "Continuous run 15 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, potem 15 minut ciągłego, równego biegu. Bez pośpiechu - liczy się czas w ruchu, nie tempo.",
      en: "5 minutes of walking to warm up, then 15 minutes of a continuous, steady run. No rush - it's the time moving that counts, not the pace.",
    },
  },
  {
    week: 7,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "25 minut spaceru. Świetna okazja, żeby rozplanować kolejny tydzień treningów.",
      en: "A 25-minute walk. A great chance to plan the next week of workouts.",
    },
  },
  {
    week: 7,
    difficulty: "build",
    duration: 40,
    spacing: 2,
    title: { pl: "Bieg ciagly 18 minut", en: "Continuous run 18 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, 18 minut ciągłego biegu w tempie konwersacyjnym. Na koniec 3 minuty marszu.",
      en: "5 minutes of walking to warm up, 18 minutes of a continuous run at a conversational pace. Finish with 3 minutes of walking.",
    },
  },
  {
    week: 7,
    difficulty: "build",
    duration: 42,
    spacing: 2,
    title: { pl: "Interwaly 2x10 min", en: "Intervals 2x10 min" },
    desc: {
      pl: "5 minut spaceru, 2 odcinki po 10 minut biegu, między nimi 3 minuty marszu. Budujemy wytrzymałość.",
      en: "5 minutes of walking, 2 intervals of 10 minutes of running, with 3 minutes of walking between them. We're building endurance.",
    },
  },
  {
    week: 8,
    difficulty: "easy",
    duration: 25,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "25 minut spaceru. Nogi pracują na luzie, głowa odpoczywa.",
      en: "A 25-minute walk. Your legs work lightly and your head rests.",
    },
  },
  {
    week: 8,
    difficulty: "build",
    duration: 42,
    spacing: 2,
    title: { pl: "Bieg ciagly 20 minut", en: "Continuous run 20 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, 20 minut ciągłego biegu w spokojnym tempie. To już solidny dystans!",
      en: "5 minutes of walking to warm up, 20 minutes of a continuous run at a calm pace. That's a solid distance already!",
    },
  },
  {
    week: 8,
    difficulty: "build",
    duration: 45,
    spacing: 2,
    title: { pl: "Interwaly 2x12 min", en: "Intervals 2x12 min" },
    desc: {
      pl: "5 minut spaceru, 2 odcinki po 12 minut biegu, między nimi 2-3 minuty marszu. Kontroluj oddech i rytm.",
      en: "5 minutes of walking, 2 intervals of 12 minutes of running, with 2-3 minutes of walking between them. Control your breathing and rhythm.",
    },
  },
  {
    week: 9,
    difficulty: "easy",
    duration: 20,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "20 minut spaceru. Zbliżasz się do finału - daj nogom lekki dzień.",
      en: "A 20-minute walk. You're getting close to the finish - give your legs an easy day.",
    },
  },
  {
    week: 9,
    difficulty: "build",
    duration: 44,
    spacing: 2,
    title: { pl: "Bieg ciagly 22 minuty", en: "Continuous run 22 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, 22 minuty ciągłego biegu. Pamiętaj o równym, spokojnym oddechu.",
      en: "5 minutes of walking to warm up, 22 minutes of a continuous run. Remember to breathe evenly and calmly.",
    },
  },
  {
    week: 9,
    difficulty: "build",
    duration: 48,
    spacing: 2,
    title: { pl: "Interwaly 2x14 min", en: "Intervals 2x14 min" },
    desc: {
      pl: "5 minut spaceru, 2 odcinki po 14 minut biegu z 3 minutami marszu. Wytrzymałość rośnie z każdym treningiem.",
      en: "5 minutes of walking, 2 intervals of 14 minutes of running with 3 minutes of walking. Endurance grows with every workout.",
    },
  },
  {
    week: 10,
    difficulty: "easy",
    duration: 20,
    spacing: 2,
    title: { pl: "Spacer regeneracyjny", en: "Recovery walk" },
    desc: {
      pl: "20 minut spaceru przed wielkim finałem. Odpoczynek to paliwo na ostatni trening.",
      en: "A 20-minute walk before the big finale. Rest is fuel for the last workout.",
    },
  },
  {
    week: 10,
    difficulty: "build",
    duration: 48,
    spacing: 2,
    title: { pl: "Bieg ciagly 25 minut", en: "Continuous run 25 minutes" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, 25 minut ciągłego biegu. Jesteś bliżej celu niż kiedykolwiek.",
      en: "5 minutes of walking to warm up, 25 minutes of a continuous run. You're closer to the goal than ever.",
    },
  },
  {
    week: 10,
    difficulty: "build",
    duration: 52,
    spacing: 0,
    title: { pl: "Wielki final: 30 minut biegu!", en: "The big finale: 30 minutes of running!" },
    desc: {
      pl: "Rozgrzewka 5 minut spaceru, a potem 30 minut ciągłego biegu - Twój pierwszy prawdziwy bieg! Tempo ma być spokojne i komfortowe. Gratulacje, wygrałeś z własną wymówką!",
      en: "5 minutes of walking to warm up, then 30 minutes of a continuous run - your first real run! The pace should be calm and comfortable. Congratulations, you beat your own excuse!",
    },
  },
];

/* ---------- MOTYWACYJNE CYTATY (dwujezyczne) ---------- */
const QUOTES = {
  pl: [
    "Nie musisz być szybki. Musisz być regularny.",
    "Dzień, w którym wstaniesz i wyjdziesz, jest ważniejszy niż tempo.",
    "Postęp to nie sprint. To seria małych kroków, które się sumują.",
    "Najtrudniejszy kilometr to ten przed wyjściem z domu.",
    "Twoje ciało potrafi więcej, niż podpowiada Ci lenistwo.",
    "Biegasz przeciwko sobie z wczoraj, nie z innymi.",
    "Odpoczynek też jest treningiem. Daj sobie czas.",
    "Każdy trening to cegiełka. Nie widzisz muru od razu, ale rośnie.",
    "Małe kroki wciąż prowadzą do mety.",
    "Zacznij tam, gdzie jesteś. Użyj tego, co masz.",
    "Ból mijają, dumy nikt Ci nie zabierze.",
    "Regularność bije intensywność za każdym razem.",
  ],
  en: [
    "You don't have to be fast. You have to be consistent.",
    "The day you get up and go matters more than your pace.",
    "Progress isn't a sprint. It's a series of small steps that add up.",
    "The hardest mile is the one before you leave the house.",
    "Your body can do more than your laziness tells you.",
    "You race against yesterday's you, not against others.",
    "Rest is training too. Give yourself time.",
    "Every workout is a brick. You don't see the wall at once, but it grows.",
    "Small steps still lead to the finish line.",
    "Start where you are. Use what you have.",
    "Pain passes, but no one can take away your pride.",
    "Consistency beats intensity every single time.",
  ],
};

/* ---------- BAZA WIEDZY (artykuly, mity, rozgrzewka) ---------- */
const GUIDE = {
  tips: [
    {
      icon: "👟",
      title: { pl: "Jak dobrać pierwsze buty do biegania?", en: "How to choose your first running shoes?" },
      text: {
        pl: "Nie potrzebujesz najdroższych butów - potrzebujesz dobrze dopasowanych. Kluczowa jest amortyzacja, która chroni stawy początkującego.",
        en: "You don't need the most expensive shoes - you need well-fitted ones. Cushioning is key, as it protects a beginner's joints.",
      },
      list: {
        pl: [
          "Zostaw zapas 0.5–1 cm między palcami a czubkiem - stopa puchnie w trakcie biegu.",
          "Mierz buty po południu, gdy stopa jest już lekko spuchnięta.",
          "Wybierz o pół rozmiaru większe niż buty do chodzenia.",
          "Zwróć uwagę na amortyzację pod piętą i śródstopiem.",
        ],
        en: [
          "Leave 0.5–1 cm of space between your toes and the tip - the foot swells while running.",
          "Measure shoes in the afternoon when your foot is slightly swollen.",
          "Choose half a size larger than your walking shoes.",
          "Pay attention to cushioning under the heel and midfoot.",
        ],
      },
    },
    {
      icon: "🌬️",
      title: { pl: "Prawidłowe oddychanie podczas truchtu", en: "Proper breathing while jogging" },
      text: {
        pl: "Oddech ma być spokojny i rytmiczny. Jeśli się zadyszałeś, to znak, że tempo jest za szybkie - zwolnij do marszu.",
        en: "Breathing should be calm and rhythmic. If you're out of breath, the pace is too fast - slow down to a walk.",
      },
      list: {
        pl: [
          "Oddychaj brzuchem, nie tylko klatką piersiową - ręka na brzuchu powinna się unosić.",
          "Utrzymuj rytm, np. wdech na 3 kroki, wydech na 3 kroki.",
          "Wdech nosem, wydech ustami - pomaga kontrolować tempo.",
          "Nie walcz o oddech. Biegnij tak, byś mógł swobodnie rozmawiać.",
        ],
        en: [
          "Breathe with your belly, not just your chest - a hand on your belly should rise.",
          "Keep a rhythm, e.g. inhale for 3 steps, exhale for 3 steps.",
          "Inhale through your nose, exhale through your mouth - it helps control the pace.",
          "Don't fight for breath. Run so you can talk comfortably.",
        ],
      },
    },
    {
      icon: "😴",
      title: { pl: "Dlaczego regeneracja jest kluczowa?", en: "Why is recovery crucial?" },
      text: {
        pl: "Mięśnie nie rosną w trakcie treningu, ale podczas odpoczynku. Dlatego trenujemy co 2–3 dni, a nie codziennie.",
        en: "Muscles don't grow during a workout, but during rest. That's why we train every 2–3 days, not every day.",
      },
      list: {
        pl: [
          "Daj mięśniom 24–48 godzin na odbudowę między treningami.",
          "Sen 7–9 godzin to najlepszy „suplement” dla biegacza.",
          "Lekki spacer w dniu wolnym wspomaga krążenie i regenerację.",
          "Ból mięśni to nie wymówka do treningu na siłę - to sygnał, by zwolnić.",
        ],
        en: [
          "Give your muscles 24–48 hours to rebuild between workouts.",
          "7–9 hours of sleep is the best 'supplement' for a runner.",
          "A light walk on a rest day boosts circulation and recovery.",
          "Sore muscles aren't an excuse to push harder - they're a signal to slow down.",
        ],
      },
    },
  ],
  myths: [
    {
      claim: { pl: "„Musisz biegać codziennie, żeby mieć efekty.”", en: "'You have to run every day to see results.'" },
      fact: {
        pl: "Mit. Regularność to nie codzienność. Trening 3–4 razy w tygodniu z dniami przerwy daje lepsze efekty niż codzienne zmęczenie, bo organizm zdąży się zregenerować i wzmocnić.",
        en: "Myth. Consistency doesn't mean daily. Training 3–4 times a week with rest days brings better results than daily fatigue, because your body gets time to recover and get stronger.",
      },
    },
    {
      claim: { pl: "„Trzeba biegać szybko, żeby poprawić formę.”", en: "'You have to run fast to improve your fitness.'" },
      fact: {
        pl: "Mit. Wolny trucht buduje bazę tlenową - fundament wytrzymałości. Większość treningu początkującego powinna być spokojna, w tempie, w którym możesz rozmawiać.",
        en: "Myth. Slow jogging builds your aerobic base - the foundation of endurance. Most of a beginner's training should be calm, at a conversational pace.",
      },
    },
    {
      claim: { pl: "„Bieganie niszczy kolana.”", en: "'Running destroys your knees.'" },
      fact: {
        pl: "Mit. Odpowiednio dozowane bieganie wzmacnia stawy i mięśnie wokół nich. Problem pojawia się przy zbyt szybkim zwiększaniu objętości i braku regeneracji - dlatego zwiększamy dystans stopniowo.",
        en: "Myth. Properly dosed running strengthens joints and the muscles around them. Problems appear when you increase volume too quickly and skip recovery - that's why we increase distance gradually.",
      },
    },
    {
      claim: { pl: "„Jeśli się zmęczysz, to znaczy, że trening się nie udał.”", en: "'If you get tired, the workout failed.'" },
      fact: {
        pl: "Mit. Zmęczenie to naturalna część wysiłku. Sukcesem jest wyjście z domu i wykonanie zaplanowanego treningu - tempo i tak przyjdzie z czasem.",
        en: "Myth. Tiredness is a natural part of exertion. Success is getting out the door and completing the planned workout - speed will come with time.",
      },
    },
  ],
  warmup: [
    {
      icon: "🤸",
      title: { pl: "Krążenia ramion", en: "Arm circles" },
      desc: {
        pl: "Stań prosto, wyciągnij ramiona na boki i wykonuj duże krążenia - najpierw w przód, potem w tył. Rozgrzewa barki i obręcz barkową.",
        en: "Stand tall, extend your arms to the sides and make big circles - first forward, then backward. Warms up the shoulders and shoulder girdle.",
      },
      reps: { pl: "10–12 na stronę", en: "10–12 per side" },
    },
    {
      icon: "🦵",
      title: { pl: "Wymachy nóg", en: "Leg swings" },
      desc: {
        pl: "Przytrzymaj się ściany lub drzewa. Wymachuj nogą w przód i w tył oraz na boki, w kontrolowanym tempie. Rozluźnia biodra i uda.",
        en: "Hold onto a wall or tree. Swing your leg forward and back and to the sides at a controlled pace. Loosens the hips and thighs.",
      },
      reps: { pl: "10–12 na stronę", en: "10–12 per side" },
    },
    {
      icon: "🔄",
      title: { pl: "Krążenia bioder", en: "Hip circles" },
      desc: {
        pl: "Ręce na biodrach, stopy na szerokość barków. Zataczaj biodrami duże koła - najpierw w jedną, potem w drugą stronę. Aktywuje stawy biodrowe.",
        en: "Hands on your hips, feet shoulder-width apart. Make large circles with your hips - first one way, then the other. Activates the hip joints.",
      },
      reps: { pl: "10–12 na stronę", en: "10–12 per side" },
    },
    {
      icon: "🚶",
      title: { pl: "Wykroki w marszu", en: "Walking lunges" },
      desc: {
        pl: "Zrób krok naprzód i zegnij oba kolana do kąta prostego, potem wstań i zrób kolejny wykrok. Dynamicznie rozgrzewa uda i pośladki.",
        en: "Take a step forward and bend both knees to a right angle, then stand up and take the next lunge. Dynamically warms up the thighs and glutes.",
      },
      reps: { pl: "10–12 na stronę", en: "10–12 per side" },
    },
    {
      icon: "🦶",
      title: { pl: "Wspięcia na palce", en: "Calf raises" },
      desc: {
        pl: "Stań prosto, unieś się na palce i powoli opuść pięty. Możesz przytrzymać się ściany dla równowagi. Wzmacnia łydki i rozgrzewa stopy.",
        en: "Stand tall, rise onto your toes and slowly lower your heels. You can hold a wall for balance. Strengthens the calves and warms up the feet.",
      },
      reps: { pl: "15–20 powtórzeń", en: "15–20 reps" },
    },
  ],
};

/* ---------- ODZNAKI / OSIĄGNIĘCIA ----------
   Każda odznaka ma warunek odblokowania sprawdzany w `updateAchievements`.
   Zdobyte odznaki zapisywane są w profilu zalogowanego użytkownika. */
const BADGES = [
  {
    id: "first_step",
    icon: "🥉",
    titleKey: "badgeFirstStep",
    descKey: "badgeFirstStepDesc",
    isEarned: () => state.completed.length >= 1,
  },
  {
    id: "week_one",
    icon: "⚡",
    titleKey: "badgeWeekOne",
    descKey: "badgeWeekOneDesc",
    isEarned: () => {
      const week1 = PLAN.map((w, i) => ({ w, i })).filter((x) => x.w.week === 1);
      return week1.length > 0 && week1.every((x) => isDone(x.i));
    },
  },
  {
    id: "time_master",
    icon: "⏱️",
    titleKey: "badgeTimeMaster",
    descKey: "badgeTimeMasterDesc",
    isEarned: () => !!state.timerUsed,
  },
  {
    id: "route_explorer",
    icon: "🗺️",
    titleKey: "badgeRouteExplorer",
    descKey: "badgeRouteExplorerDesc",
    isEarned: () => !!state.mapUsed,
  },
];

/* ---------- STAN ---------- */
const STORAGE_KEY = "biegstart-state-v1";
const LANG_KEY = "biegstart-lang-v1";
const THEME_KEY = "biegstart-theme-v1";

let state = {
  completed: [],
  lastDoneDate: null,
  badges: [],
  timerUsed: false,
  mapUsed: false,
};

let currentFilter = "all";
let selectedIndex = null;
let lang = "pl";
let guideTab = "tips"; // tips | myths | warmup
let theme = "dark"; // dark | light
let activeTab = "dashboard"; // dashboard | plan | training | guide

/* ---------- POMOCNICZE ---------- */
function t(key) {
  return (I18N[lang] && I18N[lang][key]) || (I18N.pl[key] || key);
}

function difficultyLabel(diff) {
  if (diff === "easy") return t("diffEasy");
  if (diff === "medium") return t("diffMedium");
  return t("diffBuild");
}

function weekLabel(week) {
  return `${t("week")} ${week}`;
}

function localeTag() {
  return lang === "en" ? "en-GB" : "pl-PL";
}

function todayFormatted() {
  return new Date().toLocaleDateString(localeTag(), {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatMinutes(mins) {
  if (lang === "en") {
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m === 0 ? `${h} h` : `${h} h ${m} min`;
  }
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} godz` : `${h} godz ${m} min`;
}

function isDone(index) {
  return state.completed.includes(index);
}

function totalMinutes() {
  return state.completed.reduce((sum, i) => sum + (PLAN[i]?.duration || 0), 0);
}

function nextIndex() {
  for (let i = 0; i < PLAN.length; i++) {
    if (!isDone(i)) return i;
  }
  return -1;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatClock(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${pad2(m)}:${pad2(r)}`;
}

/* ---------- STORAGE (izolowany per użytkownik) ----------
   Dane każdego profilu zapisywane są pod osobnym kluczem:
     biegstart_data_<USER_ID>
   (obsługa w auth.js → BiegStartAuth). Dzięki temu przełączenie
   konta automatycznie wczytuje właściwe kafelki, statystyki,
   notatki i zapisane trasy. */
function authService() {
  return window.BiegStartAuth || null;
}

function loadState() {
  const auth = authService();
  const profile =
    auth && typeof auth.getProfileSync === "function" ? auth.getProfileSync() : null;

  if (profile && profile.state) {
    const s = profile.state;
    const done = Array.isArray(s.completed) ? s.completed : [];
    state = {
      completed: done.filter((i) => Number.isInteger(i) && i >= 0 && i < PLAN.length),
      lastDoneDate: s.lastDoneDate || null,
      badges: Array.isArray(s.badges) ? s.badges.slice() : [],
      timerUsed: !!s.timerUsed,
      mapUsed: !!s.mapUsed,
    };
    return;
  }

  // Brak aktywnego profilu → pusty stan (bramka logowania jest widoczna)
  state = emptyState();
}

function emptyState() {
  return {
    completed: [],
    lastDoneDate: null,
    badges: [],
    timerUsed: false,
    mapUsed: false,
  };
}

function saveState() {
  const auth = authService();
  if (auth && typeof auth.updateProfileSync === "function") {
    auth.updateProfileSync((p) => {
      p.state.completed = state.completed.slice();
      p.state.lastDoneDate = state.lastDoneDate;
      p.state.badges = (state.badges || []).slice();
      p.state.timerUsed = !!state.timerUsed;
      p.state.mapUsed = !!state.mapUsed;
    });
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Nie udało się zapisać postępu:", e);
  }
}

function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "pl" || saved === "en") lang = saved;
  } catch (e) {
    /* ignore */
  }
}

function saveLang() {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    /* ignore */
  }
}

/* ---------- MOTYW (DARK / LIGHT) ---------- */
function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") theme = saved;
  } catch (e) {
    /* ignore */
  }
}

function saveTheme() {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* ignore */
  }
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = document.getElementById("themeIcon");
  // Ksiezyc w trybie ciemnym, slonce w trybie jasnym
  if (icon) icon.textContent = theme === "light" ? "☀️" : "🌙";
}

function setTheme(newTheme) {
  if (newTheme !== "dark" && newTheme !== "light") return;
  theme = newTheme;
  saveTheme();
  applyTheme();
}

function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

/* ---------- tlumaczenie statycznych elementow (data-i18n) ---------- */
function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.documentElement.lang = t("htmlLang");
  document.title = t("docTitle");
}

/* ---------- RENDER: STATYSTYKI ---------- */
function renderStats() {
  const done = state.completed.length;
  const total = PLAN.length;
  const percent = Math.round((done / total) * 100);

  document.getElementById("statCompleted").textContent = done;
  document.getElementById("statProgress").textContent = `${percent}%`;
  document.getElementById("statMinutes").textContent = totalMinutes();

  let streak = 0;
  for (let i = 0; i < PLAN.length; i++) {
    if (isDone(i)) streak++;
    else break;
  }
  document.getElementById("statStreak").textContent = streak;
}

/* ---------- RENDER: NASTEPNY TRENING ---------- */
function renderNext() {
  const card = document.getElementById("nextCard");
  const idx = nextIndex();

  if (idx === -1) {
    card.className = "next-card next-card--done";
    card.innerHTML = `
      <div class="next-card__top">
        <span class="next-card__day">${t("planDone")}</span>
        <span class="pill pill--easy">${t("mastery")}</span>
      </div>
      <h3 class="next-card__title">${t("congratsTitle")}</h3>
      <p class="next-card__desc">${t("congratsDesc")}</p>
      <div class="next-card__meta">
        <span>${t("total")}: <strong>${totalMinutes()} min</strong></span>
        <span>${t("workouts")}: <strong>${state.completed.length}</strong></span>
      </div>
    `;
    return;
  }

  const w = PLAN[idx];
  card.className = "next-card";
  card.innerHTML = `
    <div class="next-card__top">
      <span class="next-card__day">${t("dayShort")} ${idx + 1} • ${weekLabel(w.week)}</span>
      <span class="pill pill--${w.difficulty}">${difficultyLabel(w.difficulty)}</span>
    </div>
    <h3 class="next-card__title">${w.title[lang]}</h3>
    <p class="next-card__desc">${w.desc[lang]}</p>
    <div class="next-card__meta">
      <span>${t("time")}: <strong>${formatMinutes(w.duration)}</strong></span>
      <span>${t("restAfter")}: <strong>${w.spacing === 0 ? "—" : w.spacing + " " + t("days")}</strong></span>
      <span>${t("today")}: <strong>${todayFormatted()}</strong></span>
    </div>
    <button class="btn btn--primary" data-mark="${idx}">${t("markDone")}</button>
  `;
}

/* ---------- RENDER: SIATKA KAFELKOW ---------- */
function renderPlan() {
  const list = document.getElementById("planList");
  const next = nextIndex();
  list.innerHTML = "";

  PLAN.forEach((w, i) => {
    const done = isDone(i);

    if (currentFilter === "todo" && done) return;
    if (currentFilter === "done" && !done) return;

    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    if (done) tile.classList.add("is-done");
    if (i === next) tile.classList.add("is-next");
    if (i === selectedIndex) tile.classList.add("is-active");
    tile.dataset.tile = i;
    tile.setAttribute("aria-pressed", done ? "true" : "false");
    tile.title = done ? t("tileTitleDone") : t("tileTitleTodo");

    tile.innerHTML = `
      <span class="tile__check" aria-hidden="true">✓</span>
      <span class="tile__day">${t("day")} ${i + 1}</span>
      <span class="tile__week">${t("weekShort")} ${w.week}</span>
    `;

    list.appendChild(tile);
  });

  if (!list.children.length) {
    const empty = document.createElement("p");
    empty.className = "plan__hint";
    empty.textContent = currentFilter === "done" ? t("emptyDone") : t("emptyTodo");
    list.appendChild(empty);
  }
}

/* ---------- RENDER: PANEL SZCZEGOLOW ---------- */
function renderDetails() {
  const box = document.getElementById("planDetails");

  if (selectedIndex === null || !PLAN[selectedIndex]) {
    box.innerHTML = `<div class="plan-details__placeholder">${t("detailsPlaceholder")}</div>`;
    return;
  }

  const w = PLAN[selectedIndex];
  const done = isDone(selectedIndex);
  const restText = w.spacing === 0 ? "—" : `${w.spacing} ${t("days")}`;

  box.innerHTML = `
    <div class="details-card${done ? " is-done" : ""}">
      <div class="details-card__top">
        <span class="details-card__day">${t("day")} ${selectedIndex + 1} • ${weekLabel(w.week)}</span>
        <span class="pill pill--${w.difficulty}">${difficultyLabel(w.difficulty)}</span>
      </div>
      <h3 class="details-card__title">${w.title[lang]}</h3>
      <p class="details-card__desc">${w.desc[lang]}</p>
      <div class="details-card__meta">
        <span>${t("time")}: <strong>${formatMinutes(w.duration)}</strong></span>
        <span>${t("restAfter")}: <strong>${restText}</strong></span>
        <span>${t("status")}: <strong>${done ? t("statusDone") : t("statusTodo")}</strong></span>
      </div>
      <div class="details-card__actions">
        <button class="btn ${done ? "btn--ghost" : "btn--primary"}" data-details-toggle="${selectedIndex}">
          ${done ? t("unmark") : t("markDone")}
        </button>
      </div>
    </div>
  `;
}

/* ---------- RENDER: CYTAT ---------- */
function renderQuote() {
  const list = QUOTES[lang] || QUOTES.pl;
  const idx = new Date().getDate() % list.length;
  document.getElementById("quote").textContent = `„${list[idx]}"`;
}

/* ---------- RENDER: PRZELACZNIK JEZYKA ---------- */
function renderLangSwitch() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
}

/* =========================================================
   ZAKŁADKI (SPA / TAB VIEWS)
   ========================================================= */
const TAB_IDS = ["dashboard", "plan", "training", "guide"];

/* Pokazuje wybraną zakładkę, ukrywa pozostałe.
   animate = false pomija animację fade-in (np. przy re-renderze z powodu
   zmiany języka), żeby uniknąć migotania. */
function switchTab(tab, animate) {
  if (TAB_IDS.indexOf(tab) === -1) tab = "dashboard";
  const changed = tab !== activeTab;
  activeTab = tab;

  document.querySelectorAll(".tabnav__btn").forEach((btn) => {
    const on = btn.dataset.tab === tab;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });

  document.querySelectorAll(".tabview").forEach((view) => {
    const on = view.dataset.view === tab;
    view.classList.toggle("is-active", on);
    if (on && animate !== false && changed) {
      // ponowne uruchomienie animacji fade-in
      view.classList.remove("is-entering");
      // wymuszenie reflow, aby animacja zadziałała ponownie
      void view.offsetWidth;
      view.classList.add("is-entering");
    }
  });

  // Mapa zainicjalizowana w ukrytej zakładce wymaga przeliczenia rozmiaru
  if (tab === "training" && map) {
    setTimeout(() => map.invalidateSize(), 80);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   ODZNAKI / OSIĄGNIĘCIA — logika i render
   ========================================================= */
function isBadgeEarned(id) {
  return (state.badges || []).includes(id);
}

/* Sprawdza warunki wszystkich odznak; nowo zdobyte dopisuje do stanu,
   zapisuje w profilu użytkownika i pokazuje powiadomienie (toast). */
function updateAchievements() {
  if (!state.badges) state.badges = [];
  const newlyEarned = [];

  BADGES.forEach((badge) => {
    let earned = false;
    try {
      earned = !!badge.isEarned();
    } catch (e) {
      earned = false;
    }
    if (earned && !state.badges.includes(badge.id)) {
      state.badges.push(badge.id);
      newlyEarned.push(badge);
    }
  });

  if (newlyEarned.length) {
    saveState();
    renderBadges();
    newlyEarned.forEach((badge, idx) => {
      setTimeout(() => showBadgeToast(badge), idx * 400);
    });
  }
}

function renderBadges() {
  const grid = document.getElementById("badgesGrid");
  if (!grid) return;

  const earnedCount = BADGES.filter((b) => isBadgeEarned(b.id)).length;

  const progress = document.getElementById("badgesProgress");
  if (progress) {
    progress.textContent = `${t("badgesProgress")}: ${earnedCount}/${BADGES.length}`;
  }
  const meter = document.getElementById("badgesMeter");
  if (meter) {
    meter.style.width = `${Math.round((earnedCount / BADGES.length) * 100)}%`;
  }

  grid.innerHTML = BADGES.map((badge) => {
    const earned = isBadgeEarned(badge.id);
    return `
      <article class="badge${earned ? " is-earned" : " is-locked"}">
        <span class="badge__icon" aria-hidden="true">${badge.icon}</span>
        <h3 class="badge__title">${t(badge.titleKey)}</h3>
        <p class="badge__desc">${t(badge.descKey)}</p>
        <span class="badge__status">${earned ? "✓" : "🔒 " + t("badgeLocked")}</span>
      </article>
    `;
  }).join("");
}

/* Powiadomienie o nowej odznace */
function showBadgeToast(badge) {
  const host = document.getElementById("badgeToast");
  if (!host) return;

  const toast = document.createElement("div");
  toast.className = "badge-toast";
  toast.innerHTML = `
    <span class="badge-toast__icon" aria-hidden="true">${badge.icon}</span>
    <span class="badge-toast__body">
      <span class="badge-toast__label">${t("badgeNew")}</span>
      <span class="badge-toast__title">${t(badge.titleKey)}</span>
    </span>
  `;
  host.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 400);
  }, 3600);
}

/* Oznaczenie użycia narzędzi (stoper / mapa) jako flag w stanie profilu */
function markTimerUsed() {
  if (state.timerUsed) return;
  state.timerUsed = true;
  saveState();
  updateAchievements();
}

function markMapUsed() {
  if (state.mapUsed) return;
  state.mapUsed = true;
  saveState();
  updateAchievements();
}

/* =========================================================
   STOPER INTERWALOWY
   ========================================================= */
const timer = {
  walk: 120, // sekundy fazy marszu
  run: 120, // sekundy fazy truchtu/biegu
  rounds: 5, // liczba rund (marsz + trucht)
  phase: "walk", // walk | run | done
  round: 1, // aktualna runda (1-based)
  remaining: 120, // sekundy pozsotale w biezacej fazie
  running: false,
  intervalId: null,
  lastTick: 0,
};

let audioCtx = null;

/* Krotki sygnal dzwiekowy przez Web Audio API (bez plikow zewnetrznych) */
function beep(times, freq) {
  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = new Ctx();
    }
    const ctx = audioCtx;
    if (ctx.state === "suspended") ctx.resume();

    const count = times || 1;
    const baseFreq = freq || 880;
    for (let i = 0; i < count; i++) {
      const start = ctx.currentTime + i * 0.22;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = baseFreq;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.35, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);
    }
  } catch (e) {
    /* audio moze byc zablokowane - ignorujemy */
  }
}

function phaseDuration(phase) {
  return phase === "run" ? timer.run : timer.walk;
}

function timerTotalRemaining() {
  if (timer.phase === "done") return 0;
  const cur = timer.remaining;
  const perRound = timer.run + timer.walk;
  // biezaca faza + pozostale pelne rundy (poza biezaca) + konczaca faza rundy
  // Uproszczenie: biezaca faza + reszta faz w pozostalych rundach + druga faza biezacej rundy
  let rest = 0;
  const otherPhaseCur = timer.phase === "walk" ? "run" : "walk";
  rest += phaseDuration(otherPhaseCur); // druga faza biezacej rundy
  rest += (timer.rounds - timer.round - 1) * perRound;
  return Math.max(0, rest + cur);
}

function renderTimer() {
  const card = document.getElementById("timerCard");
  const display = document.getElementById("timerDisplay");
  const phaseLabel = document.getElementById("timerPhaseLabel");
  const roundEl = document.getElementById("timerRound");
  const totalEl = document.getElementById("timerTotal");
  const bar = document.getElementById("timerBar");
  const status = document.getElementById("timerStatus");

  card.classList.remove("is-walk", "is-run", "is-finished");

  if (timer.phase === "done") {
    card.classList.add("is-finished");
    phaseLabel.textContent = t("phaseDone");
    display.textContent = "00:00";
    bar.style.width = "100%";
    roundEl.textContent = "";
    totalEl.textContent = "";
    status.textContent = t("timerFinished");
    return;
  }

  const isWalk = timer.phase === "walk";
  card.classList.add(isWalk ? "is-walk" : "is-run");
  phaseLabel.textContent = isWalk ? t("phaseWalk") : t("phaseRun");

  display.textContent = formatClock(timer.remaining);

  const dur = Math.max(1, phaseDuration(timer.phase));
  const pct = Math.max(0, Math.min(100, (timer.remaining / dur) * 100));
  bar.style.width = `${pct}%`;

  roundEl.textContent = `${t("roundOf")} ${timer.round} ${t("of")} ${timer.rounds}`;
  totalEl.textContent = `${t("timerTotal")}: ${formatClock(timerTotalRemaining())}`;

  if (timer.running) status.textContent = t("timerRunning");
  else if (timer.remaining < phaseDuration(timer.phase)) status.textContent = t("timerPaused");
  else status.textContent = t("timerReady");
}

/* Jedno przejscie fazy: zwraca true jesli trening sie zakonczyl */
function advancePhase() {
  if (timer.phase === "walk") {
    timer.phase = "run";
    timer.remaining = timer.run;
    beep(2, 1046); // wyzszy dzwiek - zmiana na trucht
    return false;
  }
  // koniec fazy run -> koniec rundy
  if (timer.round >= timer.rounds) {
    timer.phase = "done";
    timer.remaining = 0;
    timer.running = false;
    stopTicker();
    beep(3, 1320); // koniec treningu
    return true;
  }
  timer.round += 1;
  timer.phase = "walk";
  timer.remaining = timer.walk;
  beep(1, 660); // nizszy dzwiek - powrot do marszu
  return false;
}

function tick() {
  if (!timer.running) return;
  timer.remaining -= 0.1;
  if (timer.remaining <= 0.001) {
    timer.remaining = 0;
    const finished = advancePhase();
    if (finished) {
      renderTimer();
      return;
    }
  }
  renderTimer();
}

function startTicker() {
  stopTicker();
  timer.running = true;
  timer.intervalId = setInterval(tick, 100);
}

function stopTicker() {
  if (timer.intervalId) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
}

function timerStart() {
  if (timer.phase === "done") timerReset();
  timer.running = true;
  startTicker();
  renderTimer();
  markTimerUsed();
}

function timerPause() {
  timer.running = false;
  stopTicker();
  renderTimer();
}

function timerReset() {
  stopTicker();
  timer.running = false;
  timer.phase = "walk";
  timer.round = 1;
  timer.remaining = timer.walk;
  renderTimer();
}

function applyTimerConfig() {
  const walkIn = document.getElementById("cfgWalk");
  const runIn = document.getElementById("cfgRun");
  const roundsIn = document.getElementById("cfgRounds");

  const walk = Math.max(0, parseInt(walkIn.value, 10) || 0);
  const run = Math.max(0, parseInt(runIn.value, 10) || 0);
  const rounds = Math.max(1, parseInt(roundsIn.value, 10) || 1);

  timer.walk = walk;
  timer.run = run;
  timer.rounds = rounds;

  walkIn.value = walk;
  runIn.value = run;
  roundsIn.value = rounds;

  // Reset do poczatku z nowymi czasami
  timerReset();
}

/* Wyciagnij sekundy z tekstu opisu treningu (np. "3x2 min", "90 sekund", "5 minut") */
function parseSecondsFromText(text) {
  const results = [];
  const pattern = /(\d+)\s*x\s*(\d+)\s*(min|sek|s\b|minut)/gi;
  let m;
  while ((m = pattern.exec(text)) !== null) {
    const count = parseInt(m[1], 10);
    let per = parseInt(m[2], 10);
    const unit = m[3].toLowerCase();
    if (unit.startsWith("min")) per *= 60;
    results.push({ count, per });
  }
  return results;
}

function parseMinutesPhrase(text) {
  const m = text.match(/(\d+)\s*(min|minut)/i);
  if (m) return parseInt(m[1], 10) * 60;
  const s = text.match(/(\d+)\s*(sek|s\b)/i);
  if (s) return parseInt(s[1], 10);
  return null;
}

function loadFromSelectedWorkout() {
  const status = document.getElementById("timerStatus");

  if (selectedIndex === null || !PLAN[selectedIndex]) {
    status.textContent = t("timerNoSelection");
    return;
  }

  const w = PLAN[selectedIndex];
  const desc = w.desc[lang] || w.desc.pl;

  const intervals = parseSecondsFromText(desc);
  if (intervals.length) {
    // Ostatni/interwał opisuje rundy: count x per
    const iv = intervals[intervals.length - 1];
    // Heurystyka: naprzemiennie trucht (per) i marsz (osobny fragment)
    const walkSec = parseWalkRest(desc) || 90;
    timer.run = iv.per;
    timer.walk = walkSec;
    timer.rounds = iv.count;
  } else {
    // Trening ciagly: jeden bieg + rozgrzewka/ochlodzenie
    const runSec = parseMinutesPhrase(desc);
    if (!runSec) {
      status.textContent = t("timerNoIntervals");
      return;
    }
    timer.run = runSec;
    timer.walk = 60;
    timer.rounds = 1;
  }

  document.getElementById("cfgWalk").value = timer.walk;
  document.getElementById("cfgRun").value = timer.run;
  document.getElementById("cfgRounds").value = timer.rounds;

  timerReset();
  status.textContent = `${t("timerLoaded")} ${w.title[lang]}`;
}

/* Probuje odczytac czas marszu/przerwy z opisu */
function parseWalkRest(text) {
  // wzorce: "2 minuty marszu", "90 sekundami marszu", "3 minuty marszu"
  const min = text.match(/(\d+)\s*(?:-|do\s*\d+\s*)?minut\w*\s+marszu/i);
  if (min) return parseInt(min[1], 10) * 60;
  const sek = text.match(/(\d+)\s*sekund\w*\s+marszu/i);
  if (sek) return parseInt(sek[1], 10);
  return null;
}

/* =========================================================
   KALKULATOR TEMPA / KALORII + MAPA TRASY
   ========================================================= */
const ROUTES_KEY = "biegstart-routes-v1";

let activity = "walk"; // walk | run
let savedRoutes = []; // zapisane wyniki/trasy
let map = null;
let routeLine = null;
let routeMarkers = [];
let routePoints = []; // [lat, lng]

/* Stan nagrywania trasy GPS na żywo */
let gpsTracking = false; // czy trwa nagrywanie
let gpsWatchId = null; // identyfikator watchPosition
let gpsUserMarker = null; // znacznik aktualnej pozycji użytkownika
let gpsStartedAt = 0; // znacznik czasu startu nagrania
let gpsTickerId = null; // interwał aktualizujący czas w kalkulatorze
let gpsLastPoint = null; // ostatni zaakceptowany punkt [lat, lng]

/* MET (metabolic equivalent) dla aktywnosci */
function metFor(activityType) {
  return activityType === "run" ? 9.8 : 3.5;
}

/* Oblicz tempo, predkosc i kalorie */
function computeStats() {
  const weight = parseFloat(document.getElementById("calcWeight").value) || 0;
  const distance = parseFloat(document.getElementById("calcDistance").value) || 0;
  const timeMin = parseFloat(document.getElementById("calcTime").value) || 0;
  const hours = timeMin / 60;

  let paceText = "--:--";
  if (distance > 0 && timeMin > 0) {
    const paceMinPerKm = timeMin / distance;
    const pm = Math.floor(paceMinPerKm);
    const ps = Math.round((paceMinPerKm - pm) * 60);
    const psAdj = ps === 60 ? 0 : ps;
    const pmAdj = ps === 60 ? pm + 1 : pm;
    paceText = `${pmAdj}:${pad2(psAdj)}`;
  }

  const speed = hours > 0 ? distance / hours : 0;

  // kcal = MET * waga(kg) * czas(h)
  const calories = Math.round(metFor(activity) * weight * hours);

  return {
    weight,
    distance,
    timeMin,
    pace: paceText,
    speed: speed,
    calories,
    activity,
  };
}

function renderCalc() {
  const s = computeStats();
  document.getElementById("resPace").textContent = s.pace;
  document.getElementById("resSpeed").textContent = s.speed.toFixed(1);
  document.getElementById("resCalories").textContent = s.calories;
}

function setActivity(a) {
  activity = a === "run" ? "run" : "walk";
  document.querySelectorAll(".switch-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.activity === activity);
  });
  renderCalc();
}

/* ---------- MAPA ---------- */
function haversine(a, b) {
  const R = 6371; // km
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function routeDistance() {
  let d = 0;
  for (let i = 1; i < routePoints.length; i++) {
    d += haversine(routePoints[i - 1], routePoints[i]);
  }
  return d;
}

function updateMapDistance() {
  const km = routeDistance();
  document.getElementById("mapDistance").textContent = `${km.toFixed(2)} km`;
  // Przekaz dystans do kalkulatora
  if (routePoints.length >= 2) {
    document.getElementById("calcDistance").value = km.toFixed(2);
    renderCalc();
  }
}

function addRoutePoint(latlng) {
  const point = [latlng.lat, latlng.lng];
  routePoints.push(point);
  markMapUsed();

  const marker = L.circleMarker(point, {
    radius: 5,
    color: "#34d399",
    fillColor: "#34d399",
    fillOpacity: 1,
  }).addTo(map);
  routeMarkers.push(marker);

  if (routePoints.length >= 2) {
    if (routeLine) {
      routeLine.setLatLngs(routePoints);
    } else {
      routeLine = L.polyline(routePoints, { color: "#22d3ee", weight: 4 }).addTo(map);
    }
  }
  updateMapDistance();
}

function clearRoute() {
  routePoints = [];
  routeMarkers.forEach((m) => map && map.removeLayer(m));
  routeMarkers = [];
  if (routeLine && map) {
    map.removeLayer(routeLine);
    routeLine = null;
  }
  document.getElementById("mapDistance").textContent = "0.00 km";
}

/* Domyślny widok mapy — cała Polska (używany też jako fallback) */
const DEFAULT_MAP_VIEW = { center: [51.9194, 19.1451], zoom: 6 };

function initMap() {
  const el = document.getElementById("map");
  if (!el || typeof L === "undefined") return;

  map = L.map("map").setView(DEFAULT_MAP_VIEW.center, DEFAULT_MAP_VIEW.zoom);
  // CartoDB Voyager — otwarty serwer kafelków działający także z pliku lokalnego
  L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  }).addTo(map);

  map.on("click", (e) => addRoutePoint(e.latlng));
}

/* Przywraca domyślny widok mapy (cała Polska) — np. gdy brak zgody na lokalizację */
function setDefaultMapView() {
  if (!map) return;
  map.setView(DEFAULT_MAP_VIEW.center, DEFAULT_MAP_VIEW.zoom);
}

/* Geolokalizacja: centruje mapę na pozycji użytkownika i ustawia punkt startowy trasy.
   W razie braku zgody lub błędu wraca do widoku domyślnego (Polska). */
function locateUser() {
  if (!map) return;

  if (!navigator.geolocation) {
    setDefaultMapView();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Wycentruj mapę na aktualnej pozycji z przybliżeniem ulicy
      map.setView([lat, lng], 16);

      // Wyznacz punkt startowy trasy w miejscu użytkownika
      clearRoute();
      const start = [lat, lng];
      routePoints = [start];
      const marker = L.circleMarker(start, {
        radius: 7,
        color: "#22d3ee",
        fillColor: "#22d3ee",
        fillOpacity: 1,
      }).addTo(map);
      routeMarkers.push(marker);
      updateMapDistance();
    },
    () => {
      // Brak zgody lub błąd geolokalizacji — widok domyślny (Polska)
      setDefaultMapView();
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

/* =========================================================
   NAGRYWANIE TRASY GPS NA ŻYWO
   ========================================================= */

/* Aktualizuje wygląd przycisku nagrywania (tekst + stan pulsowania) */
function updateGpsButton() {
  const btn = document.getElementById("mapRecord");
  if (!btn) return;
  const label = btn.querySelector("[data-gps-label]");
  const icon = btn.querySelector("[data-gps-icon]");

  btn.classList.toggle("is-recording", gpsTracking);
  btn.setAttribute("aria-pressed", gpsTracking ? "true" : "false");

  if (gpsTracking) {
    if (icon) icon.textContent = "⏹️";
    if (label) label.textContent = t("mapRecordStop");
  } else {
    if (icon) icon.textContent = "🔴";
    if (label) label.textContent = t("mapRecord");
  }
}

/* Znacznik bieżącej pozycji użytkownika aktualizowany w trakcie nagrywania */
function updateGpsUserMarker(latlng) {
  if (!map) return;
  if (!gpsUserMarker) {
    gpsUserMarker = L.circleMarker(latlng, {
      radius: 8,
      color: "#ef4444",
      fillColor: "#ef4444",
      fillOpacity: 0.9,
      weight: 3,
    }).addTo(map);
  } else {
    gpsUserMarker.setLatLng(latlng);
  }
}

/* Aktualizuje czas trwania treningu (w minutach) w kalkulatorze */
function updateGpsElapsed() {
  if (!gpsStartedAt) return;
  const elapsedMin = (Date.now() - gpsStartedAt) / 60000;
  const timeEl = document.getElementById("calcTime");
  if (timeEl) {
    timeEl.value = elapsedMin.toFixed(2);
  }
  renderCalc();
}

function startGpsTicker() {
  stopGpsTicker();
  gpsTickerId = setInterval(updateGpsElapsed, 1000);
}

function stopGpsTicker() {
  if (gpsTickerId) {
    clearInterval(gpsTickerId);
    gpsTickerId = null;
  }
}

/* Reakcja na nową pozycję GPS w trakcie nagrywania */
function onGpsPosition(pos) {
  if (!map || !gpsTracking) return;

  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const latlng = [lat, lng];

  // Pomijamy punkty o bardzo małej dokładności (np. >100 m)
  if (pos.coords.accuracy && pos.coords.accuracy > 100) return;

  // Odfiltruj drgania lokalizacji: ignoruj ruch < 3 metrów
  if (gpsLastPoint) {
    const moved = haversine(gpsLastPoint, latlng) * 1000; // m
    if (moved < 3) {
      updateGpsUserMarker(latlng);
      return;
    }
  }

  gpsLastPoint = latlng;
  routePoints.push(latlng);
  markMapUsed();

  if (routePoints.length >= 2) {
    if (routeLine) {
      routeLine.setLatLngs(routePoints);
    } else {
      routeLine = L.polyline(routePoints, { color: "#ef4444", weight: 5 }).addTo(map);
    }
  }

  updateGpsUserMarker(latlng);
  map.panTo(latlng);

  // Przelicz dystans w czasie rzeczywistym i przekaż do kalkulatora
  updateMapDistance();
}

function onGpsError() {
  // Błąd w trakcie nagrywania — zatrzymaj nagrywanie
  stopGpsTracking(true);
}

/* Start nagrywania trasy na żywo */
function startGpsTracking() {
  if (!map) return;
  if (!navigator.geolocation) {
    alert(t("mapGeoUnsupported"));
    return;
  }

  gpsTracking = true;
  gpsStartedAt = Date.now();
  gpsLastPoint = null;

  // Zacznij od czystej trasy
  clearRoute();
  if (gpsUserMarker && map) {
    map.removeLayer(gpsUserMarker);
    gpsUserMarker = null;
  }

  // Wyzeruj czas w kalkulatorze na czas nagrywania
  const timeEl = document.getElementById("calcTime");
  if (timeEl) timeEl.value = "0";

  updateGpsButton();
  startGpsTicker();

  gpsWatchId = navigator.geolocation.watchPosition(
    onGpsPosition,
    onGpsError,
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}

/* Zatrzymanie nagrywania i zapis trasy do profilu */
function stopGpsTracking(silent) {
  if (!gpsTracking) return;

  gpsTracking = false;

  if (gpsWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(gpsWatchId);
    gpsWatchId = null;
  }
  stopGpsTicker();

  // Finalny czas i dystans do kalkulatora
  updateGpsElapsed();

  // Linia trasy: zmień kolor na "zakończoną"
  if (routeLine) {
    routeLine.setStyle({ color: "#22d3ee", weight: 4 });
  }

  updateGpsButton();

  const km = routeDistance();
  const timeMin = gpsStartedAt ? (Date.now() - gpsStartedAt) / 60000 : 0;

  // Zapisz ślad tylko jeśli mamy realną trasę
  if (routePoints.length >= 2 && km >= 0.01) {
    const s = computeStats();
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      activity: s.activity,
      weight: s.weight,
      distance: Number(km.toFixed(2)),
      timeMin: Number(timeMin.toFixed(1)),
      pace: s.pace,
      speed: Number(s.speed.toFixed(1)),
      calories: s.calories,
      gps: true,
      track: routePoints.slice(),
    };
    savedRoutes.unshift(entry);
    saveRoutes();
    renderSaved();
    if (!silent) alert(t("mapRecordDone"));
  }

  gpsStartedAt = 0;
}

/* Przełącznik przycisku nagrywania */
function toggleGpsRecording() {
  if (gpsTracking) stopGpsTracking(false);
  else startGpsTracking();
}

/* ---------- ZAPISANE WYNIKI (per użytkownik) ---------- */
function loadRoutes() {
  const auth = authService();
  const profile =
    auth && typeof auth.getProfileSync === "function" ? auth.getProfileSync() : null;
  if (profile && Array.isArray(profile.routes)) {
    savedRoutes = profile.routes.slice();
    return;
  }
  savedRoutes = [];
}

function saveRoutes() {
  const auth = authService();
  if (auth && typeof auth.updateProfileSync === "function") {
    auth.updateProfileSync((p) => {
      p.routes = savedRoutes.slice();
    });
    return;
  }
  try {
    localStorage.setItem(ROUTES_KEY, JSON.stringify(savedRoutes));
  } catch (e) {
    /* ignore */
  }
}

function saveCurrentResult() {
  const s = computeStats();
  const km = routeDistance();
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    activity: s.activity,
    weight: s.weight,
    distance: km >= 0.01 ? Number(km.toFixed(2)) : s.distance,
    timeMin: s.timeMin,
    pace: s.pace,
    speed: Number(s.speed.toFixed(1)),
    calories: s.calories,
  };
  savedRoutes.unshift(entry);
  saveRoutes();
  renderSaved();
}

function deleteSaved(id) {
  savedRoutes = savedRoutes.filter((r) => r.id !== id);
  saveRoutes();
  renderSaved();
}

function clearSaved() {
  if (!savedRoutes.length) return;
  if (!confirm(t("resetConfirm"))) return;
  savedRoutes = [];
  saveRoutes();
  renderSaved();
}

function renderSaved() {
  const box = document.getElementById("savedList");
  if (!box) return;

  if (!savedRoutes.length) {
    box.innerHTML = `<div class="saved-empty">${t("savedEmpty")}</div>`;
    return;
  }

  box.innerHTML = savedRoutes
    .map((r) => {
      const actLabel = r.activity === "run" ? t("actRun") : t("actWalk");
      const dateStr = new Date(r.date).toLocaleDateString(localeTag(), {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      return `
        <div class="saved-item">
          <div class="saved-item__main">
            <strong>${actLabel}</strong> • ${r.distance} km • ${r.timeMin} min •
            ${r.pace} min/km • ${r.calories} kcal
            <br /><span class="saved-item__date">${dateStr}</span>
          </div>
          <button class="saved-item__del" data-del-saved="${r.id}">${t("savedDelete")}</button>
        </div>
      `;
    })
    .join("");
}

/* =========================================================
   BAZA WIEDZY / ROZGRZEWKA - RENDER
   ========================================================= */
function renderGuideTabs() {
  document.querySelectorAll(".guide-tab").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tab === guideTab);
  });
}

function renderGuideTips() {
  return `<div class="guide-cards">${GUIDE.tips
    .map((item) => {
      const list = (item.list[lang] || item.list.pl)
        .map((li) => `<li>${li}</li>`)
        .join("");
      return `
        <article class="guide-card">
          <span class="guide-card__icon">${item.icon}</span>
          <h3 class="guide-card__title">${item.title[lang]}</h3>
          <p class="guide-card__text">${item.text[lang]}</p>
          <ul class="guide-card__list">${list}</ul>
        </article>
      `;
    })
    .join("")}</div>`;
}

function renderGuideMyths() {
  return GUIDE.myths
    .map(
      (m) => `
        <article class="myth-card">
          <span class="myth-card__tag myth-card__tag--myth">${t("mythLabel")}</span>
          <p class="myth-card__claim">${m.claim[lang]}</p>
          <span class="myth-card__fact-label">${t("factLabel")}</span>
          <p class="myth-card__fact">${m.fact[lang]}</p>
        </article>
      `
    )
    .join("");
}

function renderGuideWarmup() {
  const items = GUIDE.warmup
    .map(
      (w) => `
        <div class="warmup-item">
          <span class="warmup-item__icon" aria-hidden="true">${w.icon}</span>
          <div class="warmup-item__body">
            <h3 class="warmup-item__title">${w.title[lang]}</h3>
            <p class="warmup-item__desc">${w.desc[lang]}</p>
            <span class="warmup-item__reps">${t("repsLabel")}: ${w.reps[lang]}</span>
          </div>
        </div>
      `
    )
    .join("");
  return `<div class="warmup-list">${items}</div>
    <p class="warmup-note"><strong>${t("warmupNoteTitle")}</strong> ${t("warmupNote")}</p>`;
}

function renderGuide() {
  const box = document.getElementById("guideContent");
  if (!box) return;
  renderGuideTabs();

  if (guideTab === "myths") box.innerHTML = renderGuideMyths();
  else if (guideTab === "warmup") box.innerHTML = renderGuideWarmup();
  else box.innerHTML = renderGuideTips();
}

/* ---------- RENDER ALL ---------- */
function renderAll() {
  applyStaticTranslations();
  renderLangSwitch();
  renderStats();
  renderNext();
  renderPlan();
  renderDetails();
  renderQuote();
  renderTimer();
  renderCalc();
  renderSaved();
  renderGuide();
  renderBadges();
  updateGpsButton();
  // Utrzymaj aktywną zakładkę po re-renderze (np. zmiana języka/motywu)
  switchTab(activeTab, false);
  // Odśwież etykiety bramki logowania (tryb login/rejestracja + tłumaczenia)
  const auth = authService();
  if (auth && typeof auth._renderMode === "function") {
    auth._renderMode();
  }
  // Odśwież etykiety paska profilu i skrótów w nagłówku (zmiana języka)
  if (auth && typeof auth.getCurrentUser === "function") {
    renderProfileBar(auth.getCurrentUser());
  }
}

/* ---------- AKCJE ---------- */
function toggleWorkout(index) {
  if (isDone(index)) {
    state.completed = state.completed.filter((i) => i !== index);
  } else {
    state.completed.push(index);
    state.completed.sort((a, b) => a - b);
    state.lastDoneDate = new Date().toISOString();
  }
  saveState();
  renderAll();
  updateAchievements();
}

function selectTile(index) {
  selectedIndex = index;
  if (!isDone(index)) {
    state.completed.push(index);
    state.completed.sort((a, b) => a - b);
    state.lastDoneDate = new Date().toISOString();
    saveState();
  }
  renderAll();
  updateAchievements();
}

function resetProgress() {
  if (!confirm(t("resetConfirm"))) return;
  state = emptyState();
  saveState();
  renderAll();
  updateAchievements();
}

function setLanguage(newLang) {
  if (newLang !== "pl" && newLang !== "en") return;
  if (newLang === lang) return;
  lang = newLang;
  saveLang();
  renderAll();
}

/* ---------- ZDARZENIA ---------- */
function bindEvents() {
  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) {
      setLanguage(langBtn.dataset.lang);
      return;
    }
    const tile = e.target.closest("[data-tile]");
    if (tile) {
      selectTile(Number(tile.dataset.tile));
      return;
    }
    const mark = e.target.closest("[data-mark]");
    if (mark) {
      selectTile(Number(mark.dataset.mark));
      return;
    }
    const detailsToggle = e.target.closest("[data-details-toggle]");
    if (detailsToggle) {
      toggleWorkout(Number(detailsToggle.dataset.detailsToggle));
      return;
    }
    const swBtn = e.target.closest("[data-activity]");
    if (swBtn) {
      setActivity(swBtn.dataset.activity);
      return;
    }
    const delBtn = e.target.closest("[data-del-saved]");
    if (delBtn) {
      deleteSaved(Number(delBtn.dataset.delSaved));
    }
  });

  // Filtry
  document.getElementById("filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.toggle("is-active", b === btn));
    renderPlan();
  });

  // Reset postepu
  document.getElementById("resetBtn").addEventListener("click", resetProgress);

  // Zakladki poradnika
  document.getElementById("guideTabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".guide-tab");
    if (!tab) return;
    guideTab = tab.dataset.tab;
    renderGuide();
  });

  // Gorna nawigacja zakladek (SPA)
  document.getElementById("tabNav").addEventListener("click", (e) => {
    const btn = e.target.closest(".tabnav__btn");
    if (!btn) return;
    switchTab(btn.dataset.tab);
  });

  // Stoper
  document.getElementById("timerStart").addEventListener("click", timerStart);
  document.getElementById("timerPause").addEventListener("click", timerPause);
  document.getElementById("timerReset").addEventListener("click", timerReset);
  document.getElementById("timerLoadPlan").addEventListener("click", loadFromSelectedWorkout);

  // Reczna zmiana czasow (po zatwierdzeniu pola)
  ["cfgWalk", "cfgRun", "cfgRounds"].forEach((id) => {
    document.getElementById(id).addEventListener("change", applyTimerConfig);
  });

  // Kalkulator - aktualizacja na zywo
  ["calcWeight", "calcDistance", "calcTime"].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("input", renderCalc);
    el.addEventListener("change", renderCalc);
  });

  document.getElementById("calcSave").addEventListener("click", saveCurrentResult);
  document.getElementById("savedClear").addEventListener("click", clearSaved);
  document.getElementById("mapClear").addEventListener("click", clearRoute);
  document.getElementById("mapLocate").addEventListener("click", locateUser);
  document.getElementById("mapRecord").addEventListener("click", toggleGpsRecording);

  // Przelacznik motywu
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
}

/* =========================================================
   AUTORYZACJA I PROFILE — integracja z interfejsem
   ========================================================= */

/* Pokazuje/ukrywa bramkę logowania (modal) */
function showAuthGate(show) {
  const gate = document.getElementById("authGate");
  if (gate) {
    gate.classList.toggle("is-open", !!show);
    gate.setAttribute("aria-hidden", show ? "false" : "true");
  }
  document.body.classList.toggle("auth-locked", !!show);
}

/* Pokazuje/ukrywa przyciski „Zaloguj się” / „Zarejestruj” w nagłówku.
   Widoczne wyłącznie wtedy, gdy trwa sesja gościa — zalogowany
   użytkownik ma zamiast nich pasek profilu. */
function renderHeaderAuthLinks(user) {
  const host = document.getElementById("headerAuthLinks");
  if (!host) return;
  const show = !!(user && user.isGuest);
  host.hidden = !show;
  if (!show) return;
  const loginBtn = document.getElementById("headerLogin");
  const registerBtn = document.getElementById("headerRegister");
  if (loginBtn) loginBtn.textContent = t("headerLogin");
  if (registerBtn) registerBtn.textContent = t("headerRegister");
}

/* Pasek profilu w prawym górnym rogu nagłówka */
function renderProfileBar(user) {
  const bar = document.getElementById("profileBar");
  if (!bar) return;

  if (!user) {
    bar.hidden = true;
    renderHeaderAuthLinks(null);
    return;
  }
  bar.hidden = false;

  const isGuest = !!user.isGuest;
  // Zalogowany użytkownik nie potrzebuje przycisków „Zaloguj/Zarejestruj”
  renderHeaderAuthLinks(isGuest ? user : null);
  const displayName = isGuest
    ? t("profileGuestName")
    : user.displayName || user.email || "";

  const nameEl = document.getElementById("profileName");
  const roleEl = document.getElementById("profileRole");
  const avatar = document.getElementById("profileAvatar");
  const logoutBtn = document.getElementById("profileLogout");

  if (nameEl) nameEl.textContent = displayName;
  if (roleEl) {
    roleEl.textContent = isGuest
      ? t("profileGuestRole")
      : user.email || t("profileUserRole");
  }
  if (avatar) {
    avatar.textContent = isGuest
      ? "👤"
      : (String(displayName).trim().charAt(0) || "?").toUpperCase();
  }
  if (logoutBtn) logoutBtn.textContent = t("profileLogout");
}

/* Reakcja na zmianę profilu: wczytuje dane wybranego konta i przerenderowuje UI.
   To tutaj odbywa się izolacja danych — przełączenie konta ładuje jego własny
   zestaw kafelków, statystyk, notatek i tras.

   Metoda jest ASYNCHRONICZNA, bo przy Firebase postęp treningów i odznaki
   są wczytywane z Firestore (operacja sieciowa), a przy koncie gościa
   natychmiast z localStorage. */
async function applyProfileForUser(user) {
  if (!user) {
    state = emptyState();
    savedRoutes = [];
    selectedIndex = null;
    renderProfileBar(null);
    renderHeaderAuthLinks(null);
    showAuthGate(true);
    renderAll();
    return;
  }

  // Upewnij się, że profil (postęp, odznaki, trasy) jest wczytany
  // — z Firestore lub z localStorage, zależnie od aktywnego adaptera.
  const auth = authService();
  if (auth && typeof auth.ensureProfileLoaded === "function") {
    await auth.ensureProfileLoaded();
  }

  showAuthGate(false);
  renderProfileBar(user);
  renderHeaderAuthLinks(user);
  loadState();
  loadRoutes();
  selectedIndex = nextIndex();
  if (selectedIndex === -1) selectedIndex = null;
  renderAll();
  // Po wczytaniu profilu sprawdź, czy należą się jakieś odznaki
  updateAchievements();
}

/* ---------- START ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  loadLang();
  loadTheme();
  applyTheme();
  bindEvents();
  timerReset();
  initMap();

  const auth = authService();

  if (auth) {
    if (typeof auth.setTranslator === "function") auth.setTranslator(t);
    if (typeof auth.initUI === "function") auth.initUI();
    // Reakcja na zmianę użytkownika (logowanie, wylogowanie,
    // odtworzenie sesji po odświeżeniu strony). applyProfileForUser
    // wczytuje wtedy postęp i odznaki — z Firestore albo z localStorage.
    if (typeof auth.onChange === "function") auth.onChange(applyProfileForUser);
  }

  // 1) Firebase (jeśli włączony w firebase-config.js). Przy braku
  //    konfiguracji funkcja nic nie zmienia i zostajemy na localStorage.
  let fbEnabled = false;
  if (window.BiegStartFirebase && typeof window.BiegStartFirebase.init === "function") {
    try {
      const result = await window.BiegStartFirebase.init();
      fbEnabled = !!(result && result.enabled);
    } catch (e) {
      console.warn("Nie udało się uruchomić Firebase:", e);
    }
  }

  // 2) Przy Firebase stan logowania przychodzi z onAuthStateChanged
  //    (obsłużone przez auth.onChange powyżej). Przy adapterze
  //    lokalnym odtwarzamy sesję synchronicznie z localStorage.
  let user = null;
  if (!fbEnabled) {
    if (typeof auth?.init === "function") await auth.init();
    if (auth && typeof auth.isLoggedIn === "function" && auth.isLoggedIn()) {
      user = auth.getCurrentUser();
    }
  }

  if (user) {
    // Sesja istnieje → wczytaj dane profilu i pokaż aplikację
    await applyProfileForUser(user);
  } else if (fbEnabled) {
    // Czekamy na pierwsze zdarzenie onAuthStateChanged. Gdyby SDK
    // nie odpowiedziało (np. brak sieci), pokazujemy bramkę po 3 s.
    loadState();
    loadRoutes();
    renderAll();
    showAuthGate(true);
    renderHeaderAuthLinks(null);
    setTimeout(() => {
      if (!auth || !auth.isLoggedIn()) {
        showAuthGate(true);
        renderHeaderAuthLinks(null);
      }
    }, 3000);
  } else {
    // Brak sesji → pokaż bramkę logowania/rejestracji
    loadState();
    loadRoutes();
    renderAll();
    showAuthGate(true);
    renderHeaderAuthLinks(null);
  }

  // Zamknij bramkę, jeśli użytkownik zdążył się zalogować (np. gość),
  // a modal pozostał otwarty po przełączeniu trybu.
  if (auth) {
    const currentUser = auth.getCurrentUser();
    if (currentUser) showAuthGate(false);
  }
});

/* Aplikacja gotowa — znacznik dla stylów (np. płynne pojawienie
   się interfejsu po wykonaniu skryptów). */
window.addEventListener("load", () => {
  document.body.classList.add("app-ready");
});
