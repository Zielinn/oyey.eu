# Oyey — strona produktowa + dokumenty compliance (App Store)

Statyczna strona (HTML/CSS/JS, bez zależności zewnętrznych). Fonty i grafiki są wbudowane lokalnie — działa też offline.

## Struktura
```
strona/
├── index.html            # Home (marketing) — bez komunikacji cen/subskrypcji
├── privacy.html          # Polityka prywatności  ← PRIVACY POLICY URL do App Store Connect
├── terms.html            # Regulamin / Warunki (EULA) — zawiera wymagane warunki subskrypcji (§ 6)
├── support.html          # Pomoc / Kontakt  ← SUPPORT URL do App Store Connect
├── data-deletion.html    # Usuwanie konta i danych
└── assets/
    ├── css/style.css
    ├── fonts/            # Baloo 2, Nunito, Fredoka (licencja OFL)
    └── img/              # logo + maskotki (PNG)
```

## Języki: angielska pod `/`, polska pod `/pl/` (od 08.11.2026, decyzja właściciela)
- `index.html` (`https://oyey.eu/`) to strona główna PO ANGIELSKU i domyślna (`x-default`).
- `pl/index.html` (`https://oyey.eu/pl/`) to strona główna po polsku; ścieżki w niej idą przez `../`.
- `index-en.html` to już tylko przekierowanie na `/` z całym zapytaniem i `#kotwicą`
  (linki `index-en.html?ct=instagram_en` itd. z bio dalej działają), `noindex`, canonical na `/`,
  z tymi samymi `og:`/`twitter:` co `/`, żeby podgląd udostępnionego linku miał obrazek i opis.
- Skrypt w `<head>` strony `/` przenosi na `/pl/` (z `?ct=…` i `#…`), gdy: adres ma `?lang=pl`
  (`?lang=en` zostawia angielską, tak linkuje „EN” z `/pl/`); w tej wizycie czytano już polską
  stronę (`sessionStorage` `oyey_lang`, zapisuje go `assets/js/nav.js` na każdej stronie według
  `<html lang>`, także po powrocie „Wstecz” z pamięci przeglądarki); albo przeglądarka ma polski
  na liście języków lub strefę `Europe/Warsaw`. Kolejność: `?lang` przed wszystkim, potem
  powrót „Wstecz”/„Dalej” (nigdy nie przekierowuje, bo `/` trafia do historii tylko wtedy, gdy
  ktoś widział angielską), potem `oyey_lang`, na końcu przeglądarka. `oyey_lang = en` (ktoś
  w tej wizycie czytał angielską stronę) zostawia angielską nawet przy polskiej przeglądarce.
  Gdy `sessionStorage` nie działa, `?lang=en` zostaje w adresie.
  Bez cookies i `localStorage`, bo polityka prywatności mówi, że strona cookies nie ustawia.
  GitHub Pages nie ma logiki po stronie serwera, więc wykrywanie jest tylko w JS.
- Dokumenty (`privacy`, `terms`, `support`, `data-deletion` i ich `-en`) zostają pod tymi samymi
  adresami: są wpisane w App Store Connect, Google Play i w wydanych apkach (`OyeyLinks.swift`
  składa `https://oyey.eu/<nazwa>.html` dla polskiego UI i `<nazwa>-en.html` dla reszty).
  Zmieniły się tylko linki do strony głównej (polskie na `/pl/`, angielskie na `/`)
  i `x-default` na wersję `-en`.

## Licznik odwiedzin (polityka prywatności 1.5)
- `index.html` i `pl/index.html` (ten sam blok „LICZNIK ODWIEDZIN” na dole strony) wysyłają
  `navigator.sendBeacon` (zapasowo `fetch` z `keepalive`) na
  `https://oyey-licznik.oyey-notifications.workers.dev/licznik` (osobny Worker `oyey-licznik`), treść `text/plain`:
  `{"z": "wejscie"|"appstore"|"play"|"kopiuj", "ct": "<ct albo pusty>", "s": "en"|"pl"}`.
  Worker (`~/Oyey/server/licznik`) sumuje to w D1 per dzień, link, zdarzenie, język, urządzenie
  i przeglądarkę wbudowaną; IP i User-Agenta nie zapisuje. Podsumowanie: dzienny skrót na Telegramie.
- „wejscie” raz na otwarcie: nie na `/`, gdy skrypt w `<head>` przenosi na `/pl/`
  (`window.oyeyNaPl`), nie przy odświeżeniu ani „Wstecz”/„Dalej”, nie przy przejściu z innej
  podstrony (np. „Start” z polityki, „EN” z `/pl/`); przejście z `/` i `index-en.html` liczy się,
  bo tak wygląda automatyczne przeniesienie, ale nie z tej samej ścieżki (logo `/` na `/`).
  Ręczne „PL” na `/` liczy więc wizytę drugi raz: „wejscie” z `s=pl` obejmuje też takie
  ręczne przełączenia z `/`.
- „appstore”/„play”: każdy klik (także środkowy) w link do `apps.apple.com`/`play.google.com`
  i obrazek maskotki; w przeglądarce wbudowanej na iPhonie klik w App Store otwiera panel,
  a i tak liczy się jako „appstore”. „kopiuj”: przycisk w tym panelu.
- `ct` do licznika tylko z adresu strony, nie z `sessionStorage` (`oyey_ct` służy linkom sklepów).
  Klik w sklep po powrocie z podstrony bez `?ct` idzie więc z pustym `ct`.
- Oznaczenia `ct` nadajemy kanałom (profil, film, kampania), NIGDY pojedynczym osobom
  (np. `?ct=anna_dm`): wtedy liczniki stałyby się danymi osobowymi i polityka byłaby fałszywa.
- Żadnych nowych kluczy w `sessionStorage`/`localStorage` ani cookies. Zmiana tu = zmiana
  polityki prywatności (sekcja 8, `#strona`).
- ⚠️ Kolejność publikacji: najpierw Worker (`cd ~/Oyey/server/licznik && npx wrangler deploy`
  i sekret `STRONA_TOKEN`, opis w `~/Oyey/server/licznik/README.md`), potem
  `curl -X POST .../licznik -H 'Origin: https://oyey.eu'` musi dać 204, dopiero wtedy scalenie
  na `main`. W dniu publikacji wpisz datę wejścia w życie w `privacy.html` i `privacy-en.html`
  („Wersja 1.5 · Data wejścia w życie: DD.MM.RRRR”, „Effective date: D Month YYYY”).

## Publikacja (żeby URL był publiczny)
Wgraj cały folder `strona/` na hosting pod domeną `oyey.eu`. Docelowe URL-e:
- Privacy Policy URL: `https://oyey.eu/privacy.html`  (lub `/privacy` po konfiguracji serwera)
- Support URL:        `https://oyey.eu/support.html`
- Terms/EULA URL:     `https://oyey.eu/terms.html`

Najprostsze opcje hostingu: Netlify / Cloudflare Pages / GitHub Pages / dowolny hosting statyczny.

## STAN PÓL — zaktualizowane wg ustaleń
Rozwiązane: data wejścia w życie = 24.07.2026 · minimalny iOS = 18 · REGON 542257682 ·
dostawca poczty = Google/Gmail · „Data Not Collected" potwierdzone · brak automatycznego crash-reportingu ·
standardowe Apple EULA · brak opcji „wyczyść dane" (usuwanie = odinstalowanie) · art. 38 skonstruowany
jako brak zwrotu (terms.html § 7) · transfery danych Apple/Google = SCC + Data Privacy Framework.

POZOSTAŁO JEDNO POLE:
1. Link do App Store (przyciski „Pobierz") — index.html (`href="#"`) — wstaw po publikacji apki.

## Wiek: 16+ zamiast 18+
Strona i dokumenty mówią „gra od 16 lat”, z opcjonalnym trybem 18+ włączanym w ustawieniach po
potwierdzeniu pełnoletności. UWAGA: ostateczna kategoria wiekowa w App Store wynika z kwestionariusza
treści Apple (wypełnianego w App Store Connect) — zadeklaruj odniesienia do alkoholu i tryb 18+ zgodnie
z prawdą; deklaracja na stronie musi być spójna z ratingiem przyznanym przez Apple.

## Warunek skuteczności braku zwrotu (art. 38)
Zapis w Regulaminie § 7 działa tylko, jeśli aplikacja przy zakupie faktycznie odbierze od użytkownika
zgodę „żądam natychmiastowego dostępu i przyjmuję utratę prawa odstąpienia". Zadbaj, by ekran zakupu /
konfiguracja IAP to odzwierciedlał.

## Uwaga o subskrypcji
Cennik i marketing subskrypcji zostały USUNIĘTE ze strony na życzenie. Wymagane przez Apple
warunki subskrypcji (okres, auto-odnawianie, anulowanie) pozostają w Regulaminie (terms.html § 6),
bo Apple wymaga ich w EULA linkowanej w App Store Connect oraz na ekranie zakupu w aplikacji.

## ⚠️ Zastrzeżenie
Dokumenty prawne to profesjonalny wzór dopasowany do modelu Oyey (App Store + Apple IAP,
brak konta, brak zbierania danych). **Wymagają końcowej weryfikacji prawnej / RODO przed publikacją.**
Dla rynków CZ/DE/SK potrzebne będą tłumaczenia i lokalne wymogi (m.in. Impressum w Niemczech).
