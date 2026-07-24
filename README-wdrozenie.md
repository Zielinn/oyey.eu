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
