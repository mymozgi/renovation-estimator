export interface Article {
  slug: string
  title: string
  description: string
  cluster: 'budget' | 'contractors' | 'rooms' | 'regional' | 'materials' | 'property'
  publishedAt: string
  img: string
  hook: string
  problem: string
  explanation: string
  checklist: string[]
  ctaText: string
}

/**
 * Today in Europe/Warsaw as YYYY-MM-DD, so an article goes live at local
 * midnight on its publishedAt date rather than at midnight UTC.
 */
function todayInWarsaw(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Warsaw' }).format(now)
}

/**
 * Articles a visitor may see, newest first.
 *
 * An article whose publishedAt lies in the future stays hidden until that date
 * arrives — that is how the editorial queue is scheduled. Drafts stay visible
 * in `next dev` so they can be reviewed before their release date.
 */
export function publishedArticles(locale: string, now: Date = new Date()): Article[] {
  const list = articles[locale] ?? articles['pl']
  const today = todayInWarsaw(now)
  const visible =
    process.env.NODE_ENV === 'development'
      ? list
      : list.filter((a) => a.publishedAt <= today)
  return [...visible].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** A single article, but only once its release date has arrived. */
export function findPublishedArticle(
  locale: string,
  slug: string,
  now: Date = new Date(),
): Article | undefined {
  return publishedArticles(locale, now).find((a) => a.slug === slug)
}

export const articles: Record<string, Article[]> = {
  pl: [
    {
      slug: 'koszt-remontu-lazienki-2026',
      img: '/images/tile.jpg',
      title: 'Koszt remontu łazienki 2026 — ile kosztuje m² i czego się spodziewać?',
      description: 'Aktualne ceny remontu łazienki w Polsce 2026. Widełki dla standardu ekonomicznego, optymalnego i premium. Robocizna, płytki, armatura — wszystko w jednym miejscu.',
      cluster: 'rooms',
      publishedAt: '2026-07-02',
      hook: 'Łazienka 6 m² może kosztować 9 000 PLN albo 55 000 PLN. Różnica tkwi nie w powierzchni, ale w wyborach, które robisz na etapie planowania — zanim zamówisz wykonawcę.',
      problem: `Remont łazienki to jeden z najbardziej mylących kosztorysowo projektów. Mała powierzchnia (4–10 m²) wytwarza fałszywe poczucie niskich kosztów — bo każdy metr kwadratowy jest tu droższy niż w pozostałych pomieszczeniach.

Dlaczego? Łazienka łączy kilka branż jednocześnie:
— Hydraulika: nowe odpływy, podejścia pod prysznic, umywalkę i WC — 2 500–7 000 PLN
— Elektryka: obwody pod ogrzewanie podłogowe, wentylatora, gniazdka IP44 — 1 200–3 500 PLN
— Płytkarstwo: robocizna 70–130 PLN/m² przy małym formacie, do 200 PLN/m² przy wielkoformatowych płytach
— Wylewka anhydrytowa lub samopoziomująca pod ogrzewanie — 38–65 PLN/m²

W 2026 roku ceny robocizny wzrosły o 12–18% r/r. Ekipy płytkarskie są najbardziej obłożone — czas oczekiwania wynosi 4–10 tygodni.`,
      explanation: `Orientacyjne koszty remontu łazienki 6 m² w Polsce 2026 (bez armatury i ceramiki):

**Standard ekonomiczny — 9 000–17 000 PLN**
Odświeżenie istniejącej instalacji, nowe płytki w strefie mokrej, malowanie pozostałych ścian, panelowa podłoga winylowa lub podstawowy gres. Rozwiązanie dla łazienki w dobrym stanie technicznym.

**Standard optymalny — 18 000–32 000 PLN**
Pełne okładziny ceramiczne na ścianach i podłodze, ogrzewanie podłogowe elektryczne, wymiana podejść hydraulicznych, nowe rozwiązania elektryczne. Typowy remont dla mieszkania przed sprzedażą lub modernizacją.

**Standard premium — 34 000–60 000+ PLN**
Płyty wielkoformatowe 60×120 lub 120×240 cm, prysznic walk-in, ogrzewanie podłogowe wodne, podtynkowy stelaż WC, oświetlenie LED wbudowane. Łazienka jako przestrzeń relaksu.

*Ceny zawierają robociznę i materiały wykończeniowe. Armatura (baterie, odpływ, miska WC, kabina/wanna) to dodatkowe 3 000–25 000 PLN w zależności od wyboru.*`,
      checklist: [
        'Zmierz łazienkę: długość, szerokość, wysokość, pozycja okna i drzwi',
        'Oceń stan instalacji — wymiana rur to +2 500–7 000 PLN do budżetu',
        'Zdecyduj o ogrzewaniu podłogowym zanim wylana będzie wylewka',
        'Wybierz format płytek PRZED wycenianiem robocizny — format wpływa na cenę',
        'Zamów ekipę płytkarską z wyprzedzeniem 6–8 tygodni (2026: duże obłożenie)',
        'Zaplanuj armaturę i ceramikę oddzielnie — to 20–40% całkowitego budżetu',
        'Dodaj 20% buforu na niespodzianki pod starymi płytkami (grzyb, zgnilizna, stare wylewki)',
        'Oblicz kosztorys remontu online zanim zaczniesz rozmowy z wykonawcami',
      ],
      ctaText: 'Oblicz kosztorys remontu łazienki →',
    },
    {
      slug: 'ceny-remontow-polska-2026',
      img: '/images/flat.jpg',
      title: 'Ceny remontów w Polsce 2026 — Warszawa, Kraków, Wrocław, Gdańsk, Poznań',
      description: 'Porównanie cen robocizny remontowej w największych polskich miastach w 2026 roku. Gdzie remont jest najtańszy, a gdzie zapłacisz najwięcej i dlaczego.',
      cluster: 'regional',
      publishedAt: '2026-07-02',
      hook: 'Ten sam remont 60 m² w standardzie optymalnym kosztuje 74 000 PLN w Warszawie i 55 000 PLN w Łodzi. Różnica to prawie 20 000 PLN — i wynika wyłącznie z lokalizacji.',
      problem: `Rynek remontowy w Polsce jest silnie zróżnicowany regionalnie. Stawki robocizny w największych aglomeracjach rosną szybciej niż w mniejszych miastach, bo ekipy mają więcej zleceń i wyższe koszty stałe (dojazdy, najem magazynów, ZUS).

W 2026 roku różnice między miastami pogłębiły się:
— Warszawa i Trójmiasto: stawki robocizny +18–22% r/r (boom deweloperski, brak ekip)
— Kraków i Wrocław: +14–16% r/r (rosnący rynek wtórny i inwestycyjny)
— Poznań: +11–13% r/r (stabilny rynek, mniejsze niedobory)
— Łódź i mniejsze miasta: +8–10% r/r (niższe koszty życia, więcej dostępnych ekip)

Dodatkowym czynnikiem są lokalne sieci wykonawców. W Warszawie konkurencja jest większa, ale najlepsze ekipy są zarezerwowane 3–5 miesięcy naprzód.`,
      explanation: `Mnożniki regionalny do podstawowej stawki remontu (baza = Poznań = 1,00):

| Miasto | Mnożnik | Przykład: remont 60 m² Standard |
|---|---|---|
| Warszawa | ×1,25 | ~74 000 PLN |
| Trójmiasto | ×1,15 | ~68 000 PLN |
| Kraków | ×1,10 | ~65 000 PLN |
| Wrocław | ×1,08 | ~64 000 PLN |
| Poznań | ×1,00 | ~59 000 PLN |
| Łódź | ×0,92 | ~54 000 PLN |

Skąd biorą się różnice? Ekipa malarska w Warszawie oczekuje 45–70 PLN/m², w Łodzi 30–48 PLN/m². Płytkarz w Trójmieście: 80–140 PLN/m², w Poznaniu: 60–100 PLN/m².

**Ważne:** Sprowadzanie ekip z tańszego regionu rzadko się opłaca. Dojazd, zakwaterowanie i ryzyko braku gwarancji na miejscu eliminują oszczędności — zostaje tylko ryzyko.`,
      checklist: [
        'Sprawdź mnożnik regionalny dla swojego miasta przed planowaniem budżetu',
        'Odbierz oferty od minimum 3 lokalnych firm — nie z zewnętrznych rynków',
        'Zweryfikuj dostępność ekip — w 2026 r. rezerwuj z 2–4 miesięcznym wyprzedzeniem',
        'Porównuj oferty w przeliczeniu na m² — nie na całość zlecenia',
        'Poproś o kosztorys szczegółowy, nie ryczałt — łatwiej wykryć zawyżenia',
        'Sprawdź referencje z realizacji w Twoim mieście — stawki są negocjowalne',
        'Użyj kalkulatora z mnożnikiem regionalnym dla swojego miasta',
        'Zaplanuj remont poza szczytem (wrzesień–październik) — łatwiej o termin i cenę',
      ],
      ctaText: 'Sprawdź ceny w Twoim mieście →',
    },
    {
      slug: 'na-czym-nie-oszczedzac-przy-remoncie-2026',
      img: '/images/premium.jpg',
      title: 'Na czym NIE oszczędzać przy remoncie w 2026 — i gdzie możesz ciąć koszty bezpiecznie',
      description: 'Które elementy remontu warto kupić w wyższym standardzie, a gdzie tańsze materiały sprawdzą się równie dobrze? Praktyczny przewodnik po materiałach budowlanych 2026.',
      cluster: 'materials',
      publishedAt: '2026-07-02',
      hook: 'Oszczędzanie na remoncie jest możliwe — ale tylko w odpowiednich miejscach. Źle dobrana hydroizolacja w łazience oznacza remont za 3 lata. Tańsze panele w salonie — żaden problem.',
      problem: `Pokusa oszczędzania jest zrozumiała — remonty kosztują więcej niż planowaliśmy. Problem pojawia się, gdy cięcia dotyczą elementów, których wymiana po kilku latach pochłonie więcej niż pierwotna oszczędność.

Najkosztowniejsze błędy oszczędzania:
— Tańsza hydroizolacja w łazience (4–8 PLN/m² zamiast 18–28 PLN/m²): przeciek po 2–4 latach = remont od nowa
— Brak wylewki samopoziomującej pod płytki: kruszenie fug i pękanie po roku
— Tanie kleje do płytek w strefach mokrych: odklejanie się płytek, pleśń pod spodem
— Elektryka bez projektu: brak obwodów = przepalone bezpieczniki i przeprojektowanie
— Jeden słój farby zamiast dwóch: nierówne krycie, prześwitujące plamy po miesiącu`,
      explanation: `**Gdzie absolutnie NIE oszczędzaj:**

*Hydroizolacja* — to 0,5–1,5% budżetu, które chroni 100% remontu. Różnica między tańszą a lepszą masą uszczelniającą wynosi 200–400 PLN w łazience 6 m². Koszt przecieku: 8 000–25 000 PLN.

*Grunty i podkłady* — gruntowanie ścian przed gładziami i malowaniem kosztuje 3–8 PLN/m². Bez gruntu farba lub gładź odpadnie w ciągu roku.

*Elektryka i hydraulika* — tutaj tanie materiały = zagrożenie życia lub zalanie sąsiadów. Używaj tylko certyfikowanych produktów, zatrudniaj licencjonowane ekipy.

*Kleje do płytek w łazience i kuchni* — C2TE lub C2TES zamiast C1. Różnica: 8–15 PLN/worek.

**Gdzie możesz bezpiecznie ciąć koszty:**

*Panele podłogowe zamiast deski drewnianej* — w sypialni i pokoju różnica w użytkowaniu jest minimalna. Oszczędność: 40–120 PLN/m².

*Farba malarska* — w mniej eksponowanych pomieszczeniach tańsza farba z dwóch warstw daje ten sam efekt.

*Osprzęt elektryczny* — gniazdka i włączniki z drugiej półki (Ospel, Simon) są równie trwałe jak premium. Oszczędność: 15–40 PLN/punkt.`,
      checklist: [
        'Nigdy nie skąp na hydroizolacji w łazience, kuchni i pralni',
        'Zawsze gruntuj ściany i podłogi przed nałożeniem gładzi, kleju lub farby',
        'Kleje do płytek: minimum klasa C2TE w strefach mokrych',
        'Farba: w salonie i sypialni 2 warstwy dobrej farby > 3 warstwy taniej',
        'Elektrykę i hydraulikę powierz licencjonowanym ekipom z certyfikatami',
        'Panele, tapety i osprzęt elektryczny — tu możesz szukać tańszych opcji',
        'Porównaj ceny materiałów w Castorama, Leroy Merlin i hurtowniach budowlanych',
        'Oblicz kosztorys z podziałem na materiały i robociznę — łatwiej szukać oszczędności',
      ],
      ctaText: 'Oblicz kosztorys z podziałem na materiały i robociznę →',
    },
    {
      slug: 'wykonczenie-mieszkania-od-dewelopera-2026',
      img: '/images/developer.jpg',
      title: 'Wykończenie mieszkania od dewelopera 2026 — ile kosztuje i jak zaplanować?',
      description: 'Kompletny poradnik o kosztach wykończenia mieszkania w stanie deweloperskim w 2026 roku. Etapy prac, realne widełki cenowe i najczęstsze błędy kupujących.',
      cluster: 'property',
      publishedAt: '2026-07-02',
      hook: 'Kupiłeś mieszkanie od dewelopera — gratuluję. Teraz zaczyna się prawdziwa rachuba: wykończenie 50 m² może kosztować od 60 000 do 180 000 PLN. Skąd taka rozpiętość i jak nie przepłacić?',
      problem: `Stan deweloperski wygląda podobnie niezależnie od dewelopera: betonowe ściany, tynki, wylewki, okna z PCV, drzwi wejściowe, przyłącza mediów. Puste, zimne, pachnie cementem. I teraz Ty musisz z tego zrobić dom.

Największy błąd kupujących: nieoszacowanie kosztów wykończenia przy podejmowaniu decyzji o zakupie. Bank pyta o zdolność kredytową na mieszkanie — ale nie pyta, czy Cię stać na jego wykończenie.

Typowe zaskoczenia finansowe po odebraniu kluczy:
— Elektryka pod lodówkę, zmywarkę i AGD to osobne obwody — nikt nie mówił, że brakuje
— Malowanie ścian bez wyrównania gładziami daje efekt skórki pomarańczowej
— Klimatyzacja montowana po wykończeniu = kucie ścian od nowa`,
      explanation: `**Etapy wykończenia mieszkania od dewelopera i ich koszty (50 m², standard optymalny):**

**Etap 1 — Przygotowanie (2–3 tygodnie) | 8 000–18 000 PLN**
Projekt wnętrz lub projekt techniczny, gładzie gipsowe: 18–35 PLN/m², wyrównanie wylewki: 22–40 PLN/m².

**Etap 2 — Instalacje (2–4 tygodnie) | 12 000–28 000 PLN**
Elektryka: obwody pod AGD i klimatyzację. Hydraulika: rozbudowa podejść w łazience i kuchni.

**Etap 3 — Prace mokre (3–5 tygodni) | 15 000–40 000 PLN**
Płytki w łazience i kuchni, wylewka samopoziomująca. Łazienka 5 m² z armaturą: 18 000–45 000 PLN.

**Etap 4 — Podłogi i wykończenie ścian (2–3 tygodnie) | 12 000–35 000 PLN**
Panele lub deska drewniana, malowanie: 18–35 PLN/m², sufity podwieszane z oświetleniem.

**Etap 5 — Drzwi, oświetlenie, sprzęt (1–2 tygodnie) | 8 000–22 000 PLN**
Drzwi wewnętrzne: 600–4 000 PLN/szt., montaż AGD i podpięcie.

**Łącznie (50 m², standard optymalny): 55 000–143 000 PLN**
— Ekonomiczny: 45 000–75 000 PLN
— Optymalny: 76 000–120 000 PLN
— Premium: 121 000–200 000+ PLN`,
      checklist: [
        'Zaplanuj budżet na wykończenie PRZED podpisaniem aktu notarialnego — wlicz go do kredytu',
        'Zrób kosztorys wykończenia zaraz po odbiorze kluczy, nie na oko',
        'Zamów projekt elektryki przed malowaniem — zmiany po = kucie',
        'Zdecyduj o klimatyzacji przed wykończeniem — rury prowadzone w ścianie są niewidoczne',
        'Łazienka i kuchnia w pierwszej kolejności — bez nich nie da się mieszkać',
        'Harmonogram: instalacje → prace mokre → podłogi → malowanie → montaż',
        'Rezerwuj ekipy z 3–4 miesięcznym wyprzedzeniem (2026: duże obłożenie)',
        'Oblicz dokładny kosztorys online — wiesz wtedy, ile prosić w kredycie na wykończenie',
      ],
      ctaText: 'Oblicz kosztorys wykończenia nowego mieszkania →',
    },
    {
      slug: 'jak-wybrac-ekipe-remontowa-2026',
      img: '/images/resale_property.jpg',
      title: 'Jak wybrać ekipę remontową w 2026? Sprawdzone pytania i czerwone flagi',
      description: 'Jak nie dać się nabrać podczas wyboru ekipy remontowej? Kompletna lista pytań do weryfikacji wykonawcy, czerwone flagi i kontrakt bez niespodzianek.',
      cluster: 'contractors',
      publishedAt: '2026-07-08',
      hook: 'Zła ekipa remontowa to nie tylko wyższy koszt — to pół roku stresu, porzucony plac budowy i spór sądowy. Sprawdź, jak odróżnić profesjonalistów od przypadkowych wykonawców, zanim podpiszesz umowę.',
      problem: `Rynek remontowy jest pełen fachowców, którzy wyglądają profesjonalnie na Instagramie, ale nie mają NIP-u, polisy OC ani referencji do sprawdzenia. Większość właścicieli mieszkań wybiera ekipę na podstawie polecenia znajomego lub najtańszej oferty — i obie metody regularnie kończą się katastrofą.

Problem polega na tym, że w momencie wyboru wykonawcy nie wiesz, czego nie wiesz. Brak doświadczenia w zadawaniu właściwych pytań sprawia, że przepłacasz, akceptujesz niekorzystne warunki płatności i nie masz żadnej ochrony, gdy coś pójdzie nie tak.`,
      explanation: `**Zanim zaczniesz szukać — przygotuj projekt i kosztorys**

Ekipa, która otrzymuje precyzyjny projekt i zakres prac, wycenia uczciwie. Ekipa, która musi sama "oszacować" — buduje margines bezpieczeństwa po swojej stronie lub zaniża wycenę, żeby wygrać zlecenie, a potem dolicza "nieprzewidziane" koszty.

Miej kosztorys niezależny od wykonawcy, zanim poprosisz o oferty. To jedyna metoda weryfikacji, czy 85 000 PLN to uczciwa cena za dany zakres prac.

**5 pytań, które musisz zadać każdej ekipie**

1. **NIP i polisa OC** — sprawdź firmę w CEIDG lub KRS, poproś o numer polisy i zadzwoń do ubezpieczyciela potwierdzić ważność. Brak polisy OC to ryzyko, które przejmujesz na siebie.

2. **Referencje do sprawdzenia (nie zdjęcia)** — poproś o dane kontaktowe poprzednich klientów. Jeśli wykonawca nie może ich podać, pytaj dlaczego. Dobra ekipa ma listę zadowolonych klientów, którzy chętnie potwierdzą jakość pracy.

3. **Kto realnie będzie pracował** — lider ekipy podpisujący umowę to często nie ten, kto będzie kłaść płytki. Zapytaj, kto fizycznie wykonuje poszczególne prace i jakie mają doświadczenie.

4. **Harmonogram płatności** — czerwona flaga: ponad 30% zaliczki przed rozpoczęciem prac lub żądanie całości przed zakończeniem. Uczciwy podział: 20-30% na start, reszta etapami za wykonane i odebrane prace.

5. **Co wchodzi w "sprzątanie po sobie"** — zakres często pomijany w ustnych ustaleniach. Kto wywozi gruz, kto sprząta kurz, kto zabezpiecza inne pomieszczenia?

**Czerwone flagi, które powinny skończyć rozmowę**

- Brak umowy pisemnej lub odmowa jej podpisania
- Płatność tylko gotówką "żeby taniej" (brak faktury = brak ochrony)
- Zmiana ceny po pierwszym tygodniu pracy bez nowego zakresu
- Brak możliwości sprawdzenia poprzednich realizacji
- Agresywny nacisk na szybką decyzję ("mam inne zlecenie za tydzień")

**Jak sformułować umowę**

Dobra umowa zawiera: dokładny zakres prac (z projektem jako załącznikiem), harmonogram etapów i płatności, kary umowne za opóźnienie, warunki gwarancji (min. 2 lata na prace budowlane) i procedurę zgłaszania usterek. Umowa słowna nie istnieje prawnie przy sporach powyżej 1 000 PLN.`,
      checklist: [
        'Sprawdź NIP wykonawcy w CEIDG/KRS przed pierwszym spotkaniem',
        'Poproś o numer polisy OC i potwierdź jej ważność u ubezpieczyciela',
        'Zadzwoń do min. 2 poprzednich klientów — pytaj konkretnie o terminy i poprawki',
        'Nie akceptuj zaliczki powyżej 30% przed rozpoczęciem prac',
        'Podpisz umowę z zakresem prac, harmonogramem i karami za opóźnienie',
        'Unikaj płatności wyłącznie gotówkowych — brak faktury = brak ochrony',
        'Miej niezależny kosztorys przed porównaniem ofert wykonawców',
        'Sprawdź, kto fizycznie wykona prace (nie tylko kto podpisuje umowę)',
      ],
      ctaText: 'Oblicz kosztorys i porównaj oferty wykonawców →',
    },
    {
      slug: 'dlaczego-kosztorys-remontu-trzeba-zaplanowac-wczesniej',
      img: '/images/planning.jpg',
      title: 'Dlaczego kosztorys remontu trzeba przygotować, zanim zadzwonisz do wykonawcy',
      description: 'Kosztorys policzony przed rozmowami z ekipami chroni budżet, skraca remont i daje przewagę w negocjacjach. Sprawdź, ile kosztuje planowanie budżetu dopiero w trakcie prac.',
      cluster: 'budget',
      publishedAt: '2026-09-03',
      hook: 'Większość osób liczy koszty remontu dopiero wtedy, gdy ekipa już stoi na budowie. To najdroższy moment na jakąkolwiek decyzję — bo każda zmiana kosztuje wtedy 2-3 razy więcej niż na papierze.',
      problem: `Typowy scenariusz wygląda tak: podpisujesz umowę na mieszkanie, dzwonisz do dwóch ekip, dostajesz dwie liczby różniące się o 40 000 PLN i wybierasz tę niższą. Budżet powstaje dopiero wtedy — z oferty wykonawcy, a nie z Twojej analizy.

Problem polega na tym, że oferta wykonawcy nie jest kosztorysem. To dokument sprzedażowy. Jego zadaniem jest wygrać zlecenie, a nie pokazać Ci pełny koszt doprowadzenia mieszkania do stanu, w którym chcesz w nim mieszkać.

Co się dzieje, gdy planujesz budżet dopiero w trakcie remontu:

— **Tracisz punkt odniesienia.** Nie wiesz, czy 92 000 PLN za 58 m² to cena uczciwa, czy zawyżona o 25%. Bez własnej liczby przyjmujesz cudzą.
— **Decyzje podejmujesz pod presją czasu.** Ekipa czeka na wybór płytek, bo od tego zależy termin zamówienia kleju i fugi. Wybierasz w dwa dni to, co powinno zająć dwa tygodnie.
— **Zmiany kosztują wielokrotnie więcej.** Przesunięcie gniazdka na papierze to zero złotych. Po wylaniu wylewki i położeniu płytek — 800-2 500 PLN i tydzień opóźnienia.
— **Nie masz jak sfinansować nadwyżki.** Realna kwota ujawnia się w 6-8 tygodniu prac, gdy kredyt jest już uruchomiony, a oszczędności rozdysponowane.

W 2026 roku ten mechanizm boli bardziej niż wcześniej. Stawki robocizny wzrosły o 12-18% rok do roku, a czas oczekiwania na dobrą ekipę wynosi 4-10 tygodni. Nie da się już dokupić terminu ani ekipy w środku sezonu.`,
      explanation: `**Co realnie daje kosztorys przygotowany z wyprzedzeniem**

**1. Benchmark do negocjacji.** Gdy wiesz, że rynkowa wycena Twojego zakresu to 78 000-92 000 PLN, oferta na 115 000 PLN przestaje być ceną rynkową, a staje się punktem do rozmowy. Bez własnej liczby nie masz argumentu poza tym, że to dla Ciebie za drogo.

**2. Poprawna kolejność prac.** Największe koszty remontu wynikają nie z cen materiałów, tylko z robienia rzeczy w złej kolejności. Instalacje elektryczne i hydraulika muszą być gotowe przed wylewką. Ogrzewanie podłogowe — przed posadzką. Wentylacja — przed sufitem podwieszanym. Kosztorys wymusza przemyślenie tej sekwencji, zanim ktokolwiek zacznie kuć ściany.

**3. Świadome przycięcie zakresu.** Gdy widzisz koszt każdego elementu przed startem, możesz zdecydować, że w tym roku robisz łazienkę i kuchnię, a salon zostaje na przyszły rok. Gdy ten sam wybór podejmujesz w trakcie prac, płacisz za dwa wejścia ekipy zamiast jednego.

**4. Realne finansowanie.** Bank ocenia zdolność kredytową na podstawie kwoty, którą podasz. Kosztorys przygotowany 2-3 miesiące przed startem pozwala wnioskować o właściwą kwotę raz, a nie prosić o podwyższenie w połowie remontu.

**Ile kosztuje spóźniona decyzja — przykłady z rynku 2026**

| Zmiana | Koszt na etapie planowania | Koszt w trakcie prac |
|---|---|---|
| Przesunięcie punktu elektrycznego | 0 PLN | 400-900 PLN + opóźnienie |
| Rezygnacja z ogrzewania podłogowego | 0 PLN | 3 000-8 000 PLN (skucie wylewki) |
| Zmiana formatu płytek | 0 PLN | 60-140 PLN/m² dopłaty do robocizny |
| Dodanie ścianki działowej | 0 PLN | 1 800-4 000 PLN + poprawki instalacji |
| Zmiana układu kuchni | 0 PLN | 2 500-9 000 PLN (hydraulika, elektryka) |

**Kiedy zacząć planować**

Optymalny moment to 2-4 miesiące przed planowanym startem prac. Wtedy zdążysz: policzyć budżet, zweryfikować go u 2-3 wykonawców, zarezerwować ekipę na konkretny termin i zamówić materiały o długim czasie dostawy (płyty wielkoformatowe, stolarka, armatura z importu).

**Trzy poziomy dokładności kosztorysu**

*Poziom 1 — orientacyjny (15 minut).* Stawka za m² pomnożona przez powierzchnię i mnożnik miasta. Wystarczy, by ocenić, czy remont w ogóle mieści się w Twoich możliwościach.

*Poziom 2 — pomieszczeniowy (1 godzina).* Każde pomieszczenie liczone osobno, z uwzględnieniem standardu wykończenia i stanu instalacji. To poziom, na którym rozmowa z wykonawcą staje się merytoryczna.

*Poziom 3 — pozycyjny (praca kosztorysanta).* Rozbicie na konkretne pozycje z obmiarem. Potrzebny przy remontach powyżej 150 000 PLN, kredycie remontowym lub sporze z wykonawcą.

Dla zdecydowanej większości mieszkań poziom 2 w pełni wystarcza — pod warunkiem, że powstaje **przed** pierwszą rozmową z ekipą, a nie po niej.`,
      checklist: [
        'Policz kosztorys 2-4 miesiące przed planowanym startem prac',
        'Zmierz każde pomieszczenie osobno — powierzchnia z aktu notarialnego nie wystarczy',
        'Ustal standard wykończenia dla każdego pomieszczenia przed wyceną',
        'Sprawdź stan instalacji elektrycznej i hydraulicznej — to 15-25% budżetu',
        'Zaplanuj kolejność prac: instalacje, wylewki, tynki, wykończenie',
        'Dodaj 15-20% rezerwy na koszty ujawnione po skuciu starych warstw',
        'Miej własną liczbę PRZED pierwszą rozmową z wykonawcą',
        'Zarezerwuj ekipę z wyprzedzeniem 6-10 tygodni (sezon 2026)',
      ],
      ctaText: 'Policz kosztorys swojego remontu →',
    },
    {
      slug: 'pulapki-w-kosztorysach-firm-remontowych',
      img: '/images/estimate-contract.jpg',
      title: 'Pułapki w kosztorysach firm remontowych — 9 zapisów, które podnoszą rachunek',
      description: 'Jak czytać wycenę od wykonawcy: ryczałt bez zakresu, pozycje wg potrzeb, brak wywozu gruzu, zaniżony obmiar i inne zapisy, które podnoszą koszt remontu o 20-40%.',
      cluster: 'contractors',
      publishedAt: '2026-09-03',
      hook: 'Kosztorys od firmy remontowej to dokument handlowy, nie inżynierski. Jego celem jest wygrać zlecenie — dlatego najniższa oferta na starcie bardzo często kończy się najwyższym rachunkiem na końcu.',
      problem: `Rynek remontowy działa na prostym mechanizmie: klient porównuje oferty po jednej liczbie na dole strony. Firma, która chce wygrać, musi mieć tę liczbę niską. Sposobów na jej obniżenie bez obniżania faktycznego kosztu jest kilkanaście — i wszystkie są całkowicie legalne.

Nie chodzi o oszustwo. Chodzi o to, że oferta i faktyczny koszt to dwa różne dokumenty, a różnica między nimi ujawnia się dopiero w 4-6 tygodniu prac, gdy zmiana wykonawcy jest praktycznie niemożliwa.

Typowa skala rozjazdu na polskim rynku w 2026 roku wynosi 20-40% wartości pierwotnej oferty. Przy remoncie za 90 000 PLN to 18 000-36 000 PLN, których nie było w budżecie.`,
      explanation: `**9 zapisów, które trzeba sprawdzić przed podpisem**

**1. Ryczałt bez załącznika z zakresem.** Zapis w stylu remont mieszkania 58 m² za 84 000 PLN ryczałt nie znaczy nic. Ryczałt jest bezpieczny tylko wtedy, gdy do umowy dołączony jest szczegółowy opis zakresu prac. Bez niego każda praca, której nie ma w opisie, jest pracą dodatkową — płatną osobno.

**2. Pozycje wg potrzeb i do ustalenia na miejscu.** To otwarty czek. Każda taka pozycja powinna mieć albo cenę jednostkową, albo limit kwotowy. Jeżeli wykonawca nie chce podać stawki za roboczogodzinę prac dodatkowych — to jest odpowiedź sama w sobie.

**3. Brak prac przygotowawczych i rozbiórkowych.** Skucie płytek, demontaż starej armatury, zabezpieczenie pozostałych pomieszczeń folią, wywóz gruzu i kontener. Przy mieszkaniu 60 m² to realnie 4 000-11 000 PLN. Jeśli nie widzisz tych pozycji w wycenie — nie ma ich w cenie.

**4. Materiały po stronie klienta ukryte przed sumą.** Oferta na 84 000 PLN wygląda lepiej niż na 132 000 PLN, jeśli płytki, armatura, drzwi, podłogi i oświetlenie są poza kosztorysem. Zawsze proś o wycenę w dwóch wariantach: robocizna osobno, materiały osobno, i sumę łączną.

**5. Obmiar liczony inaczej niż myślisz.** Powierzchnia podłogi, powierzchnia ścian i powierzchnia rozwinięta to trzy różne liczby. Malowanie mieszkania 60 m² to ok. 170-200 m² powierzchni ścian i sufitów. Sprawdź, w jakiej jednostce liczona jest każda pozycja.

**6. Brak jasności co do VAT.** Remont lokalu mieszkalnego objętego społecznym programem mieszkaniowym to stawka 8%, ale nie na wszystko i nie zawsze. Różnica między 8% a 23% na kwocie 90 000 PLN to 13 500 PLN. Wycena musi jasno mówić: netto czy brutto i przy jakiej stawce.

**7. Materiał liczony bez zapasu technologicznego.** Płytki wymagają 10-15% zapasu na docinki (przy układzie diagonalnym lub jodełce nawet 20%), panele 7-10%, farba 10%. Kosztorys, który liczy dokładnie tyle metrów, ile ma pomieszczenie, jest zaniżony z definicji.

**8. Harmonogram płatności oparty na czasie, nie na etapach.** Zapis 40% po dwóch tygodniach chroni wykonawcę. Zapis 40% po odbiorze instalacji elektrycznej i hydraulicznej chroni Ciebie. Płatność zawsze powinna być powiązana z odebranym, sprawdzalnym etapem prac.

**9. Brak kar umownych i warunków gwarancji.** Umowa bez kary za opóźnienie oznacza, że opóźnienie nic nie kosztuje wykonawcy. Standard rynkowy to 0,1-0,3% wartości umowy za każdy dzień zwłoki i minimum 24 miesiące gwarancji na prace budowlane.

**Jak porównywać oferty, żeby porównanie miało sens**

Trzy oferty można porównać tylko wtedy, gdy dotyczą tego samego zakresu. Przygotuj jeden opis prac i wyślij go do wszystkich wykonawców — zamiast prosić każdego o wycenę remontu. Wtedy różnica w cenie mówi coś o wykonawcy, a nie o tym, co każdy z nich sobie dopowiedział.

Drugi warunek: miej własny, niezależny kosztorys przed otwarciem ofert. Bez niego najniższa oferta zawsze wygląda na najlepszą — a to właśnie ona najczęściej rośnie najbardziej.

**Czerwone flagi, przy których warto się wycofać**

- Odmowa rozbicia ryczałtu na pozycje
- Zaliczka powyżej 30% przed rozpoczęciem prac
- Brak NIP-u, polisy OC lub gotowości do podpisania umowy
- Cena znacząco niższa od dwóch pozostałych ofert przy tym samym zakresie
- Nacisk na natychmiastową decyzję ze względu na wolny termin`,
      checklist: [
        'Zażądaj rozbicia ryczałtu na pozycje z obmiarem i ceną jednostkową',
        'Sprawdź, czy w wycenie są prace rozbiórkowe, wywóz gruzu i kontener',
        'Ustal cenę jednostkową dla każdej pozycji wycenianej wg potrzeb',
        'Poproś o sumę łączną: robocizna plus materiały, nie tylko jedną część',
        'Zweryfikuj jednostki obmiaru — podłoga, ściany i powierzchnia rozwinięta to różne liczby',
        'Potwierdź stawkę VAT (8% czy 23%) i czy kwota jest netto czy brutto',
        'Powiąż każdą płatność z odebranym etapem, nie z upływem czasu',
        'Wpisz do umowy karę za zwłokę i minimum 24 miesiące gwarancji',
      ],
      ctaText: 'Zweryfikuj ofertę wykonawcy niezależnym kosztorysem →',
    },
  ],

  en: [
    {
      slug: 'bathroom-renovation-cost-2026',
      img: '/images/tile.jpg',
      title: 'Bathroom renovation cost 2026 — how much per m² and what to expect?',
      description: 'Current bathroom renovation prices in Poland 2026. Cost ranges for budget, standard, and premium finishes. Labour, tiles, fittings — everything in one place.',
      cluster: 'rooms',
      publishedAt: '2026-07-02',
      hook: 'A 6 m² bathroom can cost 9,000 PLN or 55,000 PLN. The difference lies not in the size, but in the decisions you make at the planning stage — before you hire a contractor.',
      problem: `Bathroom renovation is one of the most misleading projects when it comes to estimating costs. The small area (4–10 m²) creates a false sense of low cost — because every square metre here is more expensive than in other rooms.

Why? A bathroom combines several trades at once:
— Plumbing: new drains, connections for shower, sink and toilet — 2,500–7,000 PLN
— Electrics: circuits for underfloor heating, fan, IP44 sockets — 1,200–3,500 PLN
— Tiling: labour 70–130 PLN/m² for small format, up to 200 PLN/m² for large-format slabs
— Anhydrite or self-levelling screed for underfloor heating — 38–65 PLN/m²

In 2026, labour costs have risen by 12–18% year-on-year. Tiling crews are the most in demand — waiting time is 4–10 weeks.`,
      explanation: `Approximate costs for a 6 m² bathroom renovation in Poland 2026 (excluding fittings and sanitary ware):

**Budget standard — 9,000–17,000 PLN**
Refreshing existing installations, new tiles in the wet zone, painting remaining walls, vinyl panel flooring or basic porcelain. Ideal for a bathroom in good technical condition.

**Optimal standard — 18,000–32,000 PLN**
Full ceramic cladding on walls and floor, electric underfloor heating, replacement of plumbing connections, new electrical solutions. A typical renovation for an apartment before sale or modernisation.

**Premium standard — 34,000–60,000+ PLN**
Large-format slabs 60×120 or 120×240 cm, walk-in shower, water underfloor heating, concealed toilet cistern, built-in LED lighting. A bathroom as a relaxation space.

*Prices include labour and finishing materials. Fittings (taps, drain, toilet bowl, shower enclosure/bath) are an additional 3,000–25,000 PLN depending on choice.*`,
      checklist: [
        'Measure the bathroom: length, width, height, window and door positions',
        'Assess the condition of installations — replacing pipes adds 2,500–7,000 PLN to the budget',
        'Decide on underfloor heating before the screed is poured',
        'Choose tile format BEFORE pricing labour — format affects the cost',
        'Book a tiling crew 6–8 weeks in advance (2026: high demand)',
        'Plan fittings and sanitary ware separately — they account for 20–40% of the total budget',
        'Add a 20% buffer for surprises under old tiles (mould, rot, old screeds)',
        'Calculate your renovation estimate online before starting talks with contractors',
      ],
      ctaText: 'Calculate bathroom renovation cost →',
    },
    {
      slug: 'renovation-prices-poland-2026',
      img: '/images/flat.jpg',
      title: 'Renovation prices in Poland 2026 — Warsaw, Kraków, Wrocław, Gdańsk, Poznań',
      description: 'Comparison of renovation labour costs in major Polish cities in 2026. Where is renovation cheapest, where will you pay the most and why.',
      cluster: 'regional',
      publishedAt: '2026-07-02',
      hook: 'The same 60 m² renovation in optimal standard costs 74,000 PLN in Warsaw and 55,000 PLN in Łódź. The difference is nearly 20,000 PLN — and it comes purely from location.',
      problem: `The renovation market in Poland is strongly differentiated by region. Labour rates in the largest cities are growing faster than in smaller towns, because crews have more orders and higher fixed costs (transport, warehouse rental, social contributions).

In 2026, the differences between cities have deepened:
— Warsaw and Tri-City: labour rates +18–22% year-on-year (construction boom, shortage of crews)
— Kraków and Wrocław: +14–16% year-on-year (growing secondary and investment market)
— Poznań: +11–13% year-on-year (stable market, fewer shortages)
— Łódź and smaller cities: +8–10% year-on-year (lower cost of living, more available crews)

An additional factor is local contractor networks. In Warsaw, competition is greater, but the best crews are booked 3–5 months in advance.`,
      explanation: `Regional multipliers to the base renovation rate (base = Poznań = 1.00):

| City | Multiplier | Example: 60 m² Standard renovation |
|---|---|---|
| Warsaw | ×1.25 | ~74,000 PLN |
| Tri-City | ×1.15 | ~68,000 PLN |
| Kraków | ×1.10 | ~65,000 PLN |
| Wrocław | ×1.08 | ~64,000 PLN |
| Poznań | ×1.00 | ~59,000 PLN |
| Łódź | ×0.92 | ~54,000 PLN |

Where do the differences come from? A painting crew in Warsaw expects 45–70 PLN/m², in Łódź 30–48 PLN/m². A tiler in Tri-City: 80–140 PLN/m², in Poznań: 60–100 PLN/m².

**Important:** Bringing crews from a cheaper region rarely pays off. Transport, accommodation and the risk of no local guarantee eliminate the savings — only the risk remains.`,
      checklist: [
        'Check the regional multiplier for your city before planning the budget',
        'Get quotes from at least 3 local firms — not from external markets',
        'Verify crew availability — in 2026 book 2–4 months in advance',
        'Compare quotes per m² — not for the whole job',
        'Ask for an itemised estimate, not a lump sum — easier to spot overcharging',
        'Check references from jobs in your city — rates are negotiable',
        'Use the calculator with the regional multiplier for your city',
        'Plan the renovation outside peak season (September–October) — easier to get a slot and price',
      ],
      ctaText: 'Check prices in your city →',
    },
    {
      slug: 'what-not-to-save-on-renovation',
      img: '/images/premium.jpg',
      title: 'What NOT to save on during renovation in 2026 — and where you can safely cut costs',
      description: 'Which renovation elements are worth buying at a higher standard, and where cheaper materials work just as well? A practical guide to construction materials 2026.',
      cluster: 'materials',
      publishedAt: '2026-07-02',
      hook: 'Saving on renovation is possible — but only in the right places. The wrong waterproofing in the bathroom means another renovation in 3 years. Cheaper panels in the living room — no problem.',
      problem: `The temptation to save is understandable — renovations cost more than planned. The problem arises when cuts affect elements whose replacement in a few years will cost more than the original saving.

The most costly savings mistakes:
— Cheaper waterproofing in the bathroom (4–8 PLN/m² instead of 18–28 PLN/m²): leak after 2–4 years = renovation from scratch
— No self-levelling screed under tiles: crumbling grout and cracking after a year
— Cheap tile adhesives in wet areas: tiles lifting, mould underneath
— Electrics without a design: missing circuits = blown fuses and redesign
— One coat of paint instead of two: uneven coverage, bleeding patches after a month`,
      explanation: `**Where you absolutely should NOT save:**

*Waterproofing* — this is 0.5–1.5% of the budget that protects 100% of the renovation. The difference between cheaper and better sealant is 200–400 PLN in a 6 m² bathroom. Cost of a leak: 8,000–25,000 PLN.

*Primers and underlays* — priming walls before plaster and painting costs 3–8 PLN/m². Without primer, paint or plaster will fall off within a year.

*Electrics and plumbing* — cheap materials here = risk to life or flooding neighbours. Use only certified products, hire licensed crews.

*Tile adhesives in bathroom and kitchen* — C2TE or C2TES instead of C1. Difference: 8–15 PLN per bag.

**Where you can safely cut costs:**

*Laminate flooring instead of solid wood* — in the bedroom and living room the difference in use is minimal. Saving: 40–120 PLN/m².

*Paint* — in less exposed rooms, cheaper paint in two coats gives the same result.

*Electrical accessories* — sockets and switches from the mid-range (Ospel, Simon) are just as durable as premium. Saving: 15–40 PLN per point.`,
      checklist: [
        'Never skimp on waterproofing in the bathroom, kitchen and laundry',
        'Always prime walls and floors before applying plaster, adhesive or paint',
        'Tile adhesives: minimum C2TE class in wet areas',
        'Paint: in living room and bedroom 2 coats of good paint > 3 coats of cheap',
        'Entrust electrics and plumbing to licensed crews with certificates',
        'Flooring, wallpaper and electrical accessories — here you can look for cheaper options',
        'Compare material prices at Castorama, Leroy Merlin and builders\' merchants',
        'Calculate the estimate with a materials/labour split — easier to find savings',
      ],
      ctaText: 'Calculate estimate with materials and labour breakdown →',
    },
    {
      slug: 'finishing-new-apartment-2026',
      img: '/images/developer.jpg',
      title: 'Finishing a new-build apartment 2026 — how much does it cost and how to plan?',
      description: 'A complete guide to the costs of finishing a developer-state apartment in 2026. Stages of work, realistic cost ranges and the most common buyer mistakes.',
      cluster: 'property',
      publishedAt: '2026-07-02',
      hook: 'You bought a new-build apartment — congratulations. Now the real calculation begins: finishing 50 m² can cost from 60,000 to 180,000 PLN. Where does that range come from and how do you avoid overpaying?',
      problem: `A developer-state apartment looks similar regardless of the developer: bare concrete walls, plaster, screeds, PVC windows, front door, utility connections. Empty, cold, smells of cement. And now you have to turn it into a home.

The biggest buyer mistake: underestimating finishing costs when making the purchase decision. The bank asks about your creditworthiness for the apartment — but doesn't ask whether you can afford to finish it.

Typical financial surprises after receiving the keys:
— Separate electrical circuits for the fridge, dishwasher and appliances — nobody mentioned they were missing
— Painting walls without levelling with plaster gives an orange-peel effect
— Air conditioning installed after finishing = chiselling walls all over again`,
      explanation: `**Stages of finishing a developer-state apartment and their costs (50 m², optimal standard):**

**Stage 1 — Preparation (2–3 weeks) | 8,000–18,000 PLN**
Interior design or technical design, gypsum plaster: 18–35 PLN/m², screed levelling: 22–40 PLN/m².

**Stage 2 — Installations (2–4 weeks) | 12,000–28,000 PLN**
Electrics: circuits for appliances and air conditioning. Plumbing: extending connections in bathroom and kitchen.

**Stage 3 — Wet works (3–5 weeks) | 15,000–40,000 PLN**
Tiles in bathroom and kitchen, self-levelling screed. 5 m² bathroom with fittings: 18,000–45,000 PLN.

**Stage 4 — Floors and wall finishing (2–3 weeks) | 12,000–35,000 PLN**
Laminate or solid wood, painting: 18–35 PLN/m², suspended ceilings with lighting.

**Stage 5 — Doors, lighting, appliances (1–2 weeks) | 8,000–22,000 PLN**
Interior doors: 600–4,000 PLN each, appliance installation and connection.

**Total (50 m², optimal standard): 55,000–143,000 PLN**
— Budget: 45,000–75,000 PLN
— Optimal: 76,000–120,000 PLN
— Premium: 121,000–200,000+ PLN`,
      checklist: [
        'Plan the finishing budget BEFORE signing the notarial deed — include it in the mortgage',
        'Get a finishing estimate right after receiving the keys, not a rough guess',
        'Commission the electrical design before painting — changes after = chiselling',
        'Decide on air conditioning before finishing — pipes run inside the wall are invisible',
        'Bathroom and kitchen first — you cannot live without them',
        'Schedule: installations → wet works → floors → painting → fitting',
        'Book crews 3–4 months in advance (2026: high demand)',
        'Calculate a precise estimate online — you\'ll know how much to request in the finishing loan',
      ],
      ctaText: 'Calculate new apartment finishing cost →',
    },
    {
      slug: 'how-to-choose-renovation-contractor-2026',
      img: '/images/resale_property.jpg',
      title: 'How to choose a renovation contractor in 2026? Key questions and red flags',
      description: 'A complete guide to vetting renovation contractors in Poland: questions to ask, red flags to watch for, and contract terms that protect your budget.',
      cluster: 'contractors',
      publishedAt: '2026-07-08',
      hook: 'A bad contractor doesn\'t just cost more — it means months of stress, an abandoned worksite, and potential legal disputes. Learn how to separate professionals from opportunists before you sign anything.',
      problem: `The renovation market is full of tradespeople who look professional on Instagram but have no tax ID, no liability insurance, and no verifiable references. Most homeowners choose a contractor based on a friend\'s recommendation or the cheapest quote — and both methods regularly end in disaster.

The problem is that at the moment of hiring, you don\'t know what questions to ask. Without the right framework, you overpay, accept poor payment terms, and have no protection when things go wrong.`,
      explanation: `**Before you search — prepare a scope and an independent estimate**

A contractor who receives a precise project brief and scope of work prices honestly. A contractor who has to "guess" the scope builds in a safety margin — or lowballs the quote to win the job, then adds "unexpected" costs later.

Have an independent estimate before asking for quotes. It\'s the only way to know whether 85,000 PLN is a fair price for the work you\'re describing.

**5 questions to ask every contractor**

1. **Tax ID and liability insurance** — verify the company in the official business register (CEIDG or KRS), ask for the policy number, and call the insurer to confirm it\'s active. No insurance means you absorb all risk.

2. **References you can actually call (not just photos)** — ask for contact details of previous clients. If the contractor can\'t provide them, ask why. A good crew has a list of satisfied clients who are happy to confirm quality.

3. **Who will physically do the work** — the person who signs the contract is often not the one laying tiles. Ask who performs each task and what their experience is.

4. **Payment schedule** — red flag: more than 30% deposit before work starts, or demanding full payment before completion. Fair split: 20–30% upfront, the rest paid in stages after each completed and inspected phase.

5. **What "cleaning up" means** — scope often missed in verbal agreements. Who removes rubble, who cleans construction dust, who protects other rooms during work?

**Red flags that should end the conversation**

- Refusal to sign a written contract
- Cash-only payment "to save on VAT" (no invoice = no legal protection)
- Price changes after the first week without a revised scope
- No way to verify previous projects
- Aggressive pressure to decide quickly ("I have another job next week")

**What a good contract contains**

A solid contract includes: exact scope of work (with the project attached), payment milestone schedule, penalties for delays, warranty terms (minimum 2 years on construction work), and a process for reporting defects. A verbal agreement has no legal standing for disputes above 1,000 PLN.`,
      checklist: [
        'Check the contractor\'s tax ID in CEIDG/KRS before the first meeting',
        'Ask for the liability insurance policy number and confirm it\'s valid',
        'Call at least 2 previous clients — ask specifically about deadlines and corrections',
        'Don\'t accept a deposit above 30% before work begins',
        'Sign a written contract with scope, schedule, and delay penalties',
        'Avoid cash-only payments — no invoice means no legal protection',
        'Have an independent estimate before comparing contractor quotes',
        'Verify who will physically perform the work, not just who signs the contract',
      ],
      ctaText: 'Get your estimate and compare contractor quotes →',
    },
    {
      slug: 'why-plan-renovation-estimate-in-advance',
      img: '/images/planning.jpg',
      title: 'Why you should build your renovation estimate before you call a single contractor',
      description: 'An estimate prepared before you talk to contractors protects your budget, shortens the build and gives you leverage. Here is what it costs to plan the budget mid-renovation instead.',
      cluster: 'budget',
      publishedAt: '2026-09-03',
      hook: 'Most people work out what a renovation costs only once the crew is already on site. That is the most expensive possible moment to decide anything — every change then costs 2-3 times what it would have cost on paper.',
      problem: `The typical sequence looks like this: you sign for the flat, call two crews, get two numbers 40,000 PLN apart and pick the lower one. Your budget is created at that moment — out of a contractor quote rather than out of your own analysis.

The problem is that a contractor quote is not an estimate. It is a sales document. Its job is to win the contract, not to show you the full cost of getting the flat to the state you actually want to live in.

Here is what happens when the budget is planned mid-renovation:

— **You lose your reference point.** You cannot tell whether 92,000 PLN for 58 m² is fair or inflated by 25%. Without a number of your own, you adopt somebody else's.
— **Decisions get made under time pressure.** The crew is waiting on your tile choice because adhesive and grout orders depend on it. You decide in two days what deserved two weeks.
— **Changes cost many times more.** Moving a socket on paper is zero. Moving it after the screed is poured and the tiles are laid is 800-2,500 PLN and a week of delay.
— **There is no way to finance the overrun.** The real number surfaces in week 6-8, once the loan is drawn and the savings are committed.

In 2026 this hurts more than it used to. Labour rates are up 12-18% year on year and the wait for a good crew runs 4-10 weeks. You can no longer simply buy a slot or a crew mid-season.`,
      explanation: `**What an estimate prepared in advance actually gives you**

**1. A negotiating benchmark.** Once you know the market range for your scope is 78,000-92,000 PLN, a 115,000 PLN quote stops being the market price and becomes a conversation. Without your own number, your only argument is that it feels too expensive.

**2. The right sequence of work.** The biggest renovation costs come not from material prices but from doing things in the wrong order. Electrics and plumbing must be finished before the screed. Underfloor heating before the floor finish. Ventilation before the suspended ceiling. Building an estimate forces you to think that sequence through before anybody starts opening walls.

**3. Deliberate scope trimming.** When you can see the cost of each element before you start, you can decide to do the bathroom and kitchen this year and leave the living room for next year. Make that same call mid-works and you pay for two crew mobilisations instead of one.

**4. Realistic financing.** A bank assesses your borrowing against the number you give it. An estimate built 2-3 months before the start lets you apply for the right amount once, instead of asking for an increase halfway through.

**What a late decision costs — 2026 market examples**

| Change | Cost at planning stage | Cost mid-works |
|---|---|---|
| Moving an electrical point | 0 PLN | 400-900 PLN + delay |
| Dropping underfloor heating | 0 PLN | 3,000-8,000 PLN (breaking up screed) |
| Changing tile format | 0 PLN | 60-140 PLN/m² labour surcharge |
| Adding a partition wall | 0 PLN | 1,800-4,000 PLN + services rework |
| Changing the kitchen layout | 0 PLN | 2,500-9,000 PLN (plumbing, electrics) |

**When to start planning**

The optimal window is 2-4 months before the planned start. That leaves enough time to build the budget, sanity-check it against 2-3 contractors, book a crew for a specific date and order long-lead materials (large-format slabs, joinery, imported fittings).

**Three levels of estimate accuracy**

*Level 1 — indicative (15 minutes).* A rate per m² multiplied by area and a city coefficient. Enough to judge whether the renovation fits your means at all.

*Level 2 — room by room (1 hour).* Every room costed separately, accounting for finish standard and the condition of the services. This is the level at which a conversation with a contractor becomes substantive.

*Level 3 — itemised (a quantity surveyor's job).* A breakdown into specific line items with measured quantities. Needed above roughly 150,000 PLN, for a renovation loan, or in a dispute with a contractor.

For the large majority of flats, level 2 is entirely sufficient — provided it exists **before** the first conversation with a crew, not after it.`,
      checklist: [
        'Build the estimate 2-4 months before the planned start date',
        'Measure every room separately — the area on the deed is not enough',
        'Fix the finish standard for each room before costing it',
        'Check the condition of the electrics and plumbing — that is 15-25% of the budget',
        'Plan the sequence: services, screeds, plaster, finishes',
        'Add a 15-20% reserve for what appears once old layers come off',
        'Have your own number BEFORE the first contractor conversation',
        'Book the crew 6-10 weeks ahead (2026 season)',
      ],
      ctaText: 'Calculate your renovation estimate →',
    },
    {
      slug: 'hidden-traps-in-contractor-estimates',
      img: '/images/estimate-contract.jpg',
      title: 'Hidden traps in contractor estimates — 9 clauses that inflate the final bill',
      description: 'How to read a contractor quote: lump sums with no scope, as-required line items, missing debris removal, understated quantities and other clauses that push renovation costs up 20-40%.',
      cluster: 'contractors',
      publishedAt: '2026-09-03',
      hook: 'A renovation company estimate is a commercial document, not an engineering one. Its purpose is to win the job — which is exactly why the lowest quote at the start so often becomes the highest bill at the end.',
      problem: `The renovation market runs on a simple mechanism: clients compare quotes by the single number at the bottom of the page. A company that wants to win needs that number to be low. There are a dozen ways to lower it without lowering the actual cost — and all of them are entirely legal.

This is not about fraud. It is about the fact that a quote and a final cost are two different documents, and the gap between them only becomes visible in week 4-6, when changing contractor is practically impossible.

The typical spread on the Polish market in 2026 runs 20-40% above the original quote. On a 90,000 PLN renovation that is 18,000-36,000 PLN that was never in the budget.`,
      explanation: `**9 clauses to check before you sign**

**1. A lump sum with no scope annex.** A line reading renovation of a 58 m² flat, 84,000 PLN lump sum means nothing. A lump sum is only safe when a detailed scope of works is attached to the contract. Without it, any work not described is additional work — billed separately.

**2. Line items marked as required or to be agreed on site.** That is a blank cheque. Every such item needs either a unit price or a capped amount. If a contractor will not quote an hourly rate for additional work, that refusal is itself the answer.

**3. No preparation or strip-out works.** Removing tiles, stripping old fittings, sheeting off the rest of the flat, debris removal and a skip. On a 60 m² flat that is realistically 4,000-11,000 PLN. If you cannot see those lines in the quote, they are not in the price.

**4. Client-supplied materials kept out of the total.** An 84,000 PLN quote looks better than a 132,000 PLN one when tiles, fittings, doors, flooring and lighting sit outside it. Always ask for the quote in two parts — labour and materials — plus a combined total.

**5. Quantities measured differently than you assume.** Floor area, wall area and developed area are three different numbers. Painting a 60 m² flat means roughly 170-200 m² of wall and ceiling surface. Check the unit behind every line.

**6. No clarity on VAT.** Renovation of residential premises under the social housing programme carries 8%, but not on everything and not always. The difference between 8% and 23% on 90,000 PLN is 13,500 PLN. The quote has to state plainly whether the figure is net or gross, and at which rate.

**7. Materials costed with no technical waste allowance.** Tiles need a 10-15% cutting allowance (20% on diagonal or herringbone layouts), laminate 7-10%, paint 10%. An estimate that counts exactly as many square metres as the room has is understated by definition.

**8. A payment schedule tied to time rather than stages.** The clause 40% after two weeks protects the contractor. The clause 40% on sign-off of the electrical and plumbing first fix protects you. Payment should always be tied to an accepted, verifiable stage of work.

**9. No penalties and no warranty terms.** A contract with no late-delivery penalty means delay costs the contractor nothing. The market standard is 0.1-0.3% of contract value per day of delay and a minimum 24-month warranty on building works.

**How to compare quotes so the comparison means something**

Three quotes are only comparable when they cover the same scope. Write one scope description and send it to every contractor, instead of asking each of them for a renovation quote. Then the price difference tells you something about the contractor rather than about what each of them silently assumed.

The second condition: have your own independent estimate before you open the quotes. Without it the lowest offer always looks like the best one — and it is usually the one that grows the most.

**Red flags worth walking away from**

- Refusal to break a lump sum into line items
- A deposit above 30% before work starts
- No tax registration, no liability insurance, or no willingness to sign a contract
- A price far below the other two quotes for identical scope
- Pressure to decide immediately because of an available slot`,
      checklist: [
        'Demand the lump sum broken into line items with quantities and unit prices',
        'Check that strip-out, debris removal and the skip are in the quote',
        'Fix a unit price for every item priced as required',
        'Ask for the combined total: labour plus materials, not just one part',
        'Verify the measurement units — floor, walls and developed area are different numbers',
        'Confirm the VAT rate (8% or 23%) and whether the figure is net or gross',
        'Tie every payment to an accepted stage, not to elapsed time',
        'Put a late-delivery penalty and a minimum 24-month warranty in the contract',
      ],
      ctaText: 'Check a contractor quote against an independent estimate →',
    },
  ],

  ru: [
    {
      slug: 'stoimost-remonta-vannoj-2026',
      img: '/images/tile.jpg',
      title: 'Стоимость ремонта ванной 2026 — сколько стоит м² и чего ожидать?',
      description: 'Актуальные цены на ремонт ванной комнаты в Польше в 2026 году. Диапазоны для эконом, стандарт и премиум отделки. Работа, плитка, сантехника — всё в одном месте.',
      cluster: 'rooms',
      publishedAt: '2026-07-02',
      hook: 'Ванная 6 м² может стоить 9 000 PLN или 55 000 PLN. Разница кроется не в площади, а в решениях, которые вы принимаете на этапе планирования — до того, как нанять подрядчика.',
      problem: `Ремонт ванной — один из самых трудно поддающихся оценке проектов. Небольшая площадь (4–10 м²) создаёт ложное ощущение низких затрат — ведь каждый квадратный метр здесь дороже, чем в других комнатах.

Почему? Ванная объединяет сразу несколько специальностей:
— Сантехника: новые сливы, подводки под душ, умывальник и унитаз — 2 500–7 000 PLN
— Электрика: цепи для тёплого пола, вентилятора, розеток IP44 — 1 200–3 500 PLN
— Плиточные работы: работа 70–130 PLN/м² при малом формате, до 200 PLN/м² при крупноформатных плитах
— Ангидритовая или самовыравнивающаяся стяжка — 38–65 PLN/м²

В 2026 году стоимость работ выросла на 12–18% год к году. Бригады плиточников загружены больше всего — время ожидания 4–10 недель.`,
      explanation: `Ориентировочные затраты на ремонт ванной 6 м² в Польше в 2026 году (без сантехники и кафеля):

**Эконом-стандарт — 9 000–17 000 PLN**
Обновление существующих коммуникаций, новая плитка в мокрой зоне, покраска стен, виниловый пол или базовый керамогранит. Решение для ванной в хорошем техническом состоянии.

**Оптимальный стандарт — 18 000–32 000 PLN**
Полная керамическая облицовка стен и пола, электрический тёплый пол, замена сантехнических подводок, новая электрика. Типичный ремонт квартиры перед продажей или модернизацией.

**Премиум стандарт — 34 000–60 000+ PLN**
Крупноформатные плиты 60×120 или 120×240 см, душ walk-in, водяной тёплый пол, скрытый бачок унитаза, встроенная LED-подсветка. Ванная как пространство для отдыха.

*Цены включают работу и отделочные материалы. Сантехника (смесители, слив, унитаз, душевая кабина/ванна) — дополнительно 3 000–25 000 PLN в зависимости от выбора.*`,
      checklist: [
        'Измерьте ванную: длина, ширина, высота, положение окна и дверей',
        'Оцените состояние коммуникаций — замена труб добавляет 2 500–7 000 PLN к бюджету',
        'Примите решение о тёплом поле до заливки стяжки',
        'Выберите формат плитки ДО расчёта стоимости работ — формат влияет на цену',
        'Закажите бригаду плиточников за 6–8 недель (2026: высокая загруженность)',
        'Запланируйте сантехнику и кафель отдельно — это 20–40% общего бюджета',
        'Добавьте 20% резерва на сюрпризы под старой плиткой (плесень, гниль, старые стяжки)',
        'Рассчитайте смету ремонта онлайн до переговоров с подрядчиком',
      ],
      ctaText: 'Рассчитать смету ремонта ванной →',
    },
    {
      slug: 'tseny-remonta-polsha-2026',
      img: '/images/flat.jpg',
      title: 'Цены на ремонт в Польше 2026 — Варшава, Краков, Вроцлав, Гданьск, Познань',
      description: 'Сравнение стоимости ремонтных работ в крупнейших городах Польши в 2026 году. Где ремонт дешевле, где дороже и почему.',
      cluster: 'regional',
      publishedAt: '2026-07-02',
      hook: 'Один и тот же ремонт 60 м² в оптимальном стандарте стоит 74 000 PLN в Варшаве и 55 000 PLN в Лодзи. Разница почти 20 000 PLN — и она обусловлена исключительно местоположением.',
      problem: `Рынок ремонтных услуг в Польше сильно дифференцирован по регионам. Ставки оплаты труда в крупнейших агломерациях растут быстрее, чем в небольших городах, так как у бригад больше заказов и выше постоянные расходы.

В 2026 году разрыв между городами увеличился:
— Варшава и Труймясто: ставки работ +18–22% год к году (строительный бум, нехватка бригад)
— Краков и Вроцлав: +14–16% год к году (растущий вторичный и инвестиционный рынок)
— Познань: +11–13% год к году (стабильный рынок, меньший дефицит)
— Лодзь и небольшие города: +8–10% год к году (более низкая стоимость жизни, больше доступных бригад)`,
      explanation: `Региональные коэффициенты к базовой ставке ремонта (база = Познань = 1,00):

| Город | Коэффициент | Пример: ремонт 60 м² стандарт |
|---|---|---|
| Варшава | ×1,25 | ~74 000 PLN |
| Труймясто | ×1,15 | ~68 000 PLN |
| Краков | ×1,10 | ~65 000 PLN |
| Вроцлав | ×1,08 | ~64 000 PLN |
| Познань | ×1,00 | ~59 000 PLN |
| Лодзь | ×0,92 | ~54 000 PLN |

Откуда разница? Бригада маляров в Варшаве ожидает 45–70 PLN/м², в Лодзи 30–48 PLN/м². Плиточник в Труймясто: 80–140 PLN/м², в Познани: 60–100 PLN/м².

**Важно:** Привлечение бригад из более дешёвого региона редко окупается. Транспорт, проживание и риск отсутствия местной гарантии устраняют экономию — остаётся только риск.`,
      checklist: [
        'Проверьте региональный коэффициент для вашего города до составления бюджета',
        'Получите предложения от минимум 3 местных фирм',
        'Уточните доступность бригад — в 2026 г. бронируйте за 2–4 месяца',
        'Сравнивайте предложения из расчёта на м², а не за весь объём',
        'Попросите детальную смету, не паушальную — легче обнаружить завышение',
        'Проверьте рекомендации по проектам в вашем городе — ставки обсуждаемы',
        'Используйте калькулятор с региональным коэффициентом для вашего города',
        'Планируйте ремонт вне пика (сентябрь–октябрь) — легче получить дату и цену',
      ],
      ctaText: 'Проверить цены в вашем городе →',
    },
    {
      slug: 'na-chem-ne-ekonomit-pri-remonte',
      img: '/images/premium.jpg',
      title: 'На чём НЕ экономить при ремонте в 2026 — и где можно безопасно сократить расходы',
      description: 'Какие элементы ремонта стоит покупать в более высоком стандарте, а где более дешёвые материалы подойдут так же хорошо? Практическое руководство по строительным материалам 2026.',
      cluster: 'materials',
      publishedAt: '2026-07-02',
      hook: 'Экономить на ремонте можно — но только в правильных местах. Неправильная гидроизоляция в ванной означает ремонт через 3 года. Более дешёвый ламинат в гостиной — никаких проблем.',
      problem: `Соблазн сэкономить понятен — ремонт стоит больше, чем планировалось. Проблема возникает, когда сокращения касаются элементов, замена которых через несколько лет обойдётся дороже первоначальной экономии.

Наиболее дорогостоящие ошибки экономии:
— Более дешёвая гидроизоляция в ванной (4–8 PLN/м² вместо 18–28 PLN/м²): протечка через 2–4 года = ремонт заново
— Отсутствие самовыравнивающейся стяжки под плитку: крошение затирки и растрескивание через год
— Дешёвые клеи для плитки во влажных зонах: отставание плитки, плесень под ней
— Электрика без проекта: отсутствие цепей = перегоревшие предохранители и перепроектирование`,
      explanation: `**Где абсолютно НЕ стоит экономить:**

*Гидроизоляция* — это 0,5–1,5% бюджета, защищающих 100% ремонта. Разница между дешёвой и качественной мастикой — 200–400 PLN в ванной 6 м². Стоимость протечки: 8 000–25 000 PLN.

*Грунтовки и подложки* — грунтование стен перед шпаклёвкой и окраской стоит 3–8 PLN/м². Без грунтовки краска или шпаклёвка отслоятся в течение года.

*Электрика и сантехника* — здесь дешёвые материалы = угроза жизни или затопление соседей. Используйте только сертифицированные изделия, нанимайте лицензированные бригады.

**Где можно безопасно сокращать расходы:**

*Ламинатный пол вместо массива* — в спальне и гостиной разница в эксплуатации минимальна. Экономия: 40–120 PLN/м².

*Краска* — в менее заметных помещениях более дешёвая краска в два слоя даёт тот же результат.

*Электрофурнитура* — розетки и выключатели среднего ценового сегмента (Ospel, Simon) столь же долговечны, как и премиум. Экономия: 15–40 PLN за точку.`,
      checklist: [
        'Никогда не экономьте на гидроизоляции в ванной, кухне и прачечной',
        'Всегда грунтуйте стены и полы перед нанесением шпаклёвки, клея или краски',
        'Клеи для плитки: минимум класс C2TE во влажных зонах',
        'Краска: в гостиной и спальне 2 слоя хорошей краски > 3 слоёв дешёвой',
        'Доверяйте электрику и сантехнику лицензированным бригадам с сертификатами',
        'Напольное покрытие, обои и электрофурнитура — здесь можно искать варианты дешевле',
        'Сравнивайте цены на материалы в Castorama, Leroy Merlin и строительных оптовых базах',
        'Рассчитайте смету с разбивкой на материалы и работу — легче находить экономию',
      ],
      ctaText: 'Рассчитать смету с разбивкой на материалы и работу →',
    },
    {
      slug: 'otdelka-kvartiry-ot-zastrojschika-2026',
      img: '/images/developer.jpg',
      title: 'Отделка квартиры от застройщика 2026 — сколько стоит и как планировать?',
      description: 'Полное руководство по стоимости отделки квартиры в состоянии от застройщика в 2026 году. Этапы работ, реальные ценовые диапазоны и частые ошибки покупателей.',
      cluster: 'property',
      publishedAt: '2026-07-02',
      hook: 'Вы купили квартиру от застройщика — поздравляем. Теперь начинается настоящий расчёт: отделка 50 м² может стоить от 60 000 до 180 000 PLN. Откуда такой разброс и как не переплатить?',
      problem: `Квартира от застройщика выглядит одинаково вне зависимости от застройщика: голые бетонные стены, штукатурка, стяжки, ПВХ-окна, входная дверь, подводки коммуникаций. Пустая, холодная, пахнет цементом. И теперь вам нужно превратить это в дом.

Главная ошибка покупателей: недооценка затрат на отделку при принятии решения о покупке. Банк спрашивает о кредитоспособности — но не спрашивает, хватит ли денег на отделку.

Типичные финансовые сюрпризы после получения ключей:
— Отдельные электрические цепи для холодильника, посудомойки и бытовой техники — никто не предупреждал, что их нет
— Покраска стен без выравнивания шпаклёвкой даёт эффект апельсиновой корки
— Кондиционер, монтируемый после отделки = штробление стен заново`,
      explanation: `**Этапы отделки квартиры от застройщика и их стоимость (50 м², оптимальный стандарт):**

**Этап 1 — Подготовка (2–3 недели) | 8 000–18 000 PLN**
Дизайн-проект или технический проект, гипсовая шпаклёвка: 18–35 PLN/м², выравнивание стяжки: 22–40 PLN/м².

**Этап 2 — Коммуникации (2–4 недели) | 12 000–28 000 PLN**
Электрика: цепи под бытовую технику и кондиционеры. Сантехника: разводка в ванной и кухне.

**Этап 3 — Мокрые работы (3–5 недель) | 15 000–40 000 PLN**
Плитка в ванной и кухне, самовыравнивающаяся стяжка. Ванная 5 м² с сантехникой: 18 000–45 000 PLN.

**Этап 4 — Полы и отделка стен (2–3 недели) | 12 000–35 000 PLN**
Ламинат или паркетная доска, покраска: 18–35 PLN/м², подвесные потолки с освещением.

**Этап 5 — Двери, освещение, техника (1–2 недели) | 8 000–22 000 PLN**
Межкомнатные двери: 600–4 000 PLN/шт., установка и подключение техники.

**Итого (50 м², оптимальный стандарт): 55 000–143 000 PLN**
— Эконом: 45 000–75 000 PLN
— Оптимальный: 76 000–120 000 PLN
— Премиум: 121 000–200 000+ PLN`,
      checklist: [
        'Запланируйте бюджет на отделку ДО подписания нотариального акта — включите в кредит',
        'Сделайте смету отделки сразу после получения ключей, не на глаз',
        'Закажите проект электрики до покраски — изменения после = штробление',
        'Примите решение о кондиционировании до отделки — трубы в стене не видны',
        'Ванная и кухня в первую очередь — без них нельзя жить',
        'График: коммуникации → мокрые работы → полы → покраска → монтаж',
        'Бронируйте бригады за 3–4 месяца (2026: высокая загруженность)',
        'Рассчитайте точную смету онлайн — будете знать, сколько просить в кредите на отделку',
      ],
      ctaText: 'Рассчитать смету отделки новой квартиры →',
    },
    {
      slug: 'kak-vybrat-ekipu-dlya-remonta-2026',
      img: '/images/resale_property.jpg',
      title: 'Как выбрать бригаду для ремонта в 2026? Вопросы и красные флаги',
      description: 'Полное руководство по проверке подрядчиков в Польше: какие вопросы задавать, на что обратить внимание и как составить договор, который защитит ваш бюджет.',
      cluster: 'contractors',
      publishedAt: '2026-07-08',
      hook: 'Плохая бригада — это не просто лишние расходы. Это месяцы стресса, брошенный объект и судебные разбирательства. Узнайте, как отличить профессионалов от случайных людей ещё до подписания договора.',
      problem: `Рынок ремонтных услуг полон мастеров, которые выглядят профессионально в Instagram, но не имеют ни ИНН, ни полиса OC, ни проверяемых рекомендаций. Большинство владельцев квартир выбирают бригаду по совету знакомых или по самой низкой цене — оба подхода регулярно заканчиваются провалом.

Проблема в том, что в момент найма вы не знаете, какие вопросы задавать. Без нужных инструментов вы переплачиваете, соглашаетесь на невыгодные условия оплаты и остаётесь без защиты, когда что-то идёт не так.`,
      explanation: `**Сначала — проект и независимая смета**

Бригада, которая получает чёткий проект и объём работ, оценивает честно. Та, которая должна "прикинуть на глаз", закладывает себе запас — или намеренно занижает цену, чтобы получить заказ, а потом добавляет "непредвиденные" расходы.

Имейте независимую смету до того, как просить предложения. Только так вы поймёте, является ли 85 000 PLN справедливой ценой за нужный объём работ.

**5 вопросов, которые нужно задать каждой бригаде**

1. **ИНН и полис OC** — проверьте компанию в реестре CEIDG или KRS, попросите номер полиса и позвоните страховщику, чтобы подтвердить её актуальность. Отсутствие полиса OC — это риск, который вы берёте на себя.

2. **Рекомендации, которым можно позвонить (не фотографии)** — попросите контакты предыдущих клиентов. Хорошая бригада имеет список довольных заказчиков, готовых подтвердить качество работы.

3. **Кто реально будет работать** — человек, подписывающий договор, часто не тот, кто будет класть плитку. Спросите, кто физически выполняет каждый вид работ и какой у них опыт.

4. **График платежей** — красный флаг: аванс более 30% до начала работ или требование полной оплаты до завершения. Честный вариант: 20–30% на старте, остальное поэтапно за принятые работы.

5. **Что входит в "уборку после себя"** — часто забываемая деталь. Кто вывозит строительный мусор, кто убирает пыль, кто защищает другие помещения?

**Красные флаги, которые должны прекратить разговор**

- Отказ подписать письменный договор
- Оплата только наличными "чтобы сэкономить" (нет счёта = нет защиты)
- Изменение цены после первой недели работы без нового объёма
- Невозможность проверить предыдущие объекты
- Агрессивное давление на быстрое решение

**Что должен содержать договор**

Хороший договор включает: точный объём работ (с проектом в приложении), график этапов и платежей, штрафы за просрочку, условия гарантии (минимум 2 года на строительные работы) и порядок предъявления претензий. Устный договор при спорах свыше 1 000 PLN не имеет юридической силы.`,
      checklist: [
        'Проверьте ИНН подрядчика в CEIDG/KRS перед первой встречей',
        'Попросите номер полиса OC и подтвердите его актуальность у страховщика',
        'Позвоните минимум 2 предыдущим клиентам — спросите о сроках и исправлениях',
        'Не принимайте аванс более 30% до начала работ',
        'Подпишите договор с объёмом работ, графиком и штрафами за задержку',
        'Избегайте оплаты только наличными — нет счёта, нет защиты',
        'Имейте независимую смету до сравнения предложений',
        'Уточните, кто физически будет выполнять работы, не только кто подписывает договор',
      ],
      ctaText: 'Рассчитать смету и сравнить предложения →',
    },
    {
      slug: 'pochemu-vazhno-planirovat-smetu-remonta-zaranee',
      img: '/images/planning.jpg',
      title: 'Почему смету на ремонт нужно составить до того, как вы позвоните подрядчику',
      description: 'Смета, посчитанная до разговоров с бригадами, защищает бюджет, сокращает сроки и даёт преимущество в переговорах. Разбираем, сколько стоит планировать бюджет уже в процессе работ.',
      cluster: 'budget',
      publishedAt: '2026-09-03',
      hook: 'Большинство людей считают стоимость ремонта только тогда, когда бригада уже стоит на объекте. Это самый дорогой момент для любого решения — каждое изменение стоит здесь в 2-3 раза больше, чем на бумаге.',
      problem: `Типичный сценарий выглядит так: вы подписываете договор на квартиру, звоните двум бригадам, получаете две цифры с разницей в 40 000 PLN и выбираете меньшую. Бюджет появляется именно в этот момент — из предложения подрядчика, а не из вашего расчёта.

Проблема в том, что предложение подрядчика — это не смета. Это коммерческий документ. Его задача — выиграть заказ, а не показать вам полную стоимость доведения квартиры до состояния, в котором вы хотите в ней жить.

Что происходит, когда бюджет планируется уже в ходе ремонта:

— **Вы теряете точку отсчёта.** Вы не знаете, 92 000 PLN за 58 м² — это честная цена или завышенная на 25%. Без собственной цифры вы принимаете чужую.
— **Решения принимаются под давлением сроков.** Бригада ждёт выбора плитки, потому что от этого зависит заказ клея и затирки. Вы выбираете за два дня то, что заслуживало двух недель.
— **Изменения стоят в разы дороже.** Перенести розетку на бумаге — ноль злотых. После стяжки и укладки плитки — 800-2 500 PLN и неделя простоя.
— **Нечем закрыть перерасход.** Реальная сумма вскрывается на 6-8 неделе работ, когда кредит уже выбран, а накопления распределены.

В 2026 году этот механизм бьёт сильнее, чем раньше. Ставки за работу выросли на 12-18% год к году, а срок ожидания хорошей бригады составляет 4-10 недель. Докупить срок или бригаду в середине сезона уже нельзя.`,
      explanation: `**Что реально даёт смета, составленная заранее**

**1. Ориентир для переговоров.** Когда вы знаете, что рыночная оценка вашего объёма работ — 78 000-92 000 PLN, предложение на 115 000 PLN перестаёт быть рыночной ценой и становится поводом для разговора. Без собственной цифры у вас нет аргумента, кроме того, что для вас это дорого.

**2. Правильная последовательность работ.** Самые крупные потери в ремонте возникают не из-за цен на материалы, а из-за неверного порядка действий. Электрика и сантехника должны быть готовы до стяжки. Тёплый пол — до финишного покрытия. Вентиляция — до подвесного потолка. Смета заставляет продумать эту последовательность до того, как кто-то начнёт штробить стены.

**3. Осознанное сокращение объёма.** Когда вы видите стоимость каждого элемента до старта, вы можете решить, что в этом году делаете ванную и кухню, а гостиная остаётся на следующий год. Если тот же выбор делается в процессе, вы платите за два выхода бригады вместо одного.

**4. Реальное финансирование.** Банк оценивает кредит по той сумме, которую вы заявили. Смета, готовая за 2-3 месяца до старта, позволяет один раз запросить правильную сумму, а не просить увеличение в середине ремонта.

**Сколько стоит запоздалое решение — примеры рынка 2026**

| Изменение | Стоимость на этапе планирования | Стоимость в ходе работ |
|---|---|---|
| Перенос точки электрики | 0 PLN | 400-900 PLN + простой |
| Отказ от тёплого пола | 0 PLN | 3 000-8 000 PLN (демонтаж стяжки) |
| Смена формата плитки | 0 PLN | 60-140 PLN/м² доплаты за работу |
| Добавление перегородки | 0 PLN | 1 800-4 000 PLN + переделка коммуникаций |
| Смена планировки кухни | 0 PLN | 2 500-9 000 PLN (сантехника, электрика) |

**Когда начинать планировать**

Оптимальный момент — за 2-4 месяца до планируемого старта работ. Этого времени хватит, чтобы посчитать бюджет, проверить его у 2-3 подрядчиков, забронировать бригаду на конкретную дату и заказать материалы с долгим сроком поставки (крупноформатные плиты, столярка, импортная сантехника).

**Три уровня точности сметы**

*Уровень 1 — ориентировочный (15 минут).* Ставка за м², умноженная на площадь и коэффициент города. Достаточно, чтобы понять, вписывается ли ремонт в ваши возможности в принципе.

*Уровень 2 — по помещениям (1 час).* Каждое помещение считается отдельно, с учётом стандарта отделки и состояния коммуникаций. Это уровень, на котором разговор с подрядчиком становится предметным.

*Уровень 3 — позиционный (работа сметчика).* Разбивка на конкретные позиции с обмером. Нужен при ремонтах дороже 150 000 PLN, при кредите на ремонт или в споре с подрядчиком.

Для подавляющего большинства квартир уровня 2 полностью достаточно — при условии, что он появляется **до** первого разговора с бригадой, а не после.`,
      checklist: [
        'Посчитайте смету за 2-4 месяца до планируемого старта работ',
        'Замерьте каждое помещение отдельно — площади из документов недостаточно',
        'Определите стандарт отделки для каждого помещения до расчёта',
        'Проверьте состояние электрики и сантехники — это 15-25% бюджета',
        'Спланируйте порядок работ: коммуникации, стяжки, штукатурка, отделка',
        'Заложите резерв 15-20% на то, что вскроется после демонтажа старых слоёв',
        'Имейте собственную цифру ДО первого разговора с подрядчиком',
        'Забронируйте бригаду за 6-10 недель (сезон 2026)',
      ],
      ctaText: 'Рассчитать смету своего ремонта →',
    },
    {
      slug: 'podvodnye-kamni-smet-ot-remontnyh-firm',
      img: '/images/estimate-contract.jpg',
      title: 'Подводные камни смет от ремонтных компаний — 9 пунктов, которые поднимают счёт',
      description: 'Как читать смету подрядчика: паушальная сумма без объёма работ, позиции по необходимости, отсутствие вывоза мусора, заниженный обмер и другие пункты, поднимающие стоимость на 20-40%.',
      cluster: 'contractors',
      publishedAt: '2026-09-03',
      hook: 'Смета ремонтной компании — коммерческий документ, а не инженерный. Её задача — выиграть заказ, поэтому самое дешёвое предложение на старте очень часто заканчивается самым дорогим счётом в финале.',
      problem: `Рынок ремонта работает по простому механизму: клиент сравнивает предложения по одной цифре внизу страницы. Компания, которая хочет выиграть, должна сделать эту цифру низкой. Способов снизить её, не снижая реальную стоимость, около десятка — и все они полностью законны.

Речь не о мошенничестве. Речь о том, что предложение и фактическая стоимость — два разных документа, а разрыв между ними становится виден только на 4-6 неделе работ, когда сменить подрядчика практически невозможно.

Типичный разрыв на польском рынке в 2026 году составляет 20-40% от первоначального предложения. При ремонте за 90 000 PLN это 18 000-36 000 PLN, которых не было в бюджете.`,
      explanation: `**9 пунктов, которые нужно проверить до подписания**

**1. Паушальная сумма без приложения с объёмом работ.** Строка вида ремонт квартиры 58 м² за 84 000 PLN под ключ не значит ничего. Фиксированная сумма безопасна только тогда, когда к договору приложено подробное описание работ. Без него любая работа, которой нет в описании, становится дополнительной — и оплачивается отдельно.

**2. Позиции по необходимости и уточняется на месте.** Это открытый чек. У каждой такой позиции должна быть либо цена за единицу, либо предельная сумма. Если подрядчик не хочет называть ставку за час дополнительных работ — это уже ответ.

**3. Отсутствие подготовительных и демонтажных работ.** Снятие плитки, демонтаж старой сантехники, защита остальных помещений плёнкой, вывоз мусора и контейнер. Для квартиры 60 м² это реально 4 000-11 000 PLN. Если этих позиций нет в смете — их нет и в цене.

**4. Материалы со стороны клиента, спрятанные из итога.** Предложение на 84 000 PLN выглядит лучше, чем на 132 000 PLN, если плитка, сантехника, двери, полы и свет вынесены за смету. Всегда просите расчёт в двух частях — работа и материалы — плюс общую сумму.

**5. Обмер считается не так, как вы думаете.** Площадь пола, площадь стен и развёрнутая площадь — три разные цифры. Покраска квартиры 60 м² — это около 170-200 м² поверхности стен и потолков. Проверьте единицу измерения по каждой позиции.

**6. Неясность со ставкой НДС.** Ремонт жилого помещения в рамках социальной жилищной программы облагается по ставке 8%, но не на всё и не всегда. Разница между 8% и 23% на сумме 90 000 PLN — это 13 500 PLN. Смета обязана прямо указывать: нетто или брутто и по какой ставке.

**7. Материал посчитан без технологического запаса.** Плитке нужен запас 10-15% на подрезку (при диагонали или ёлочке — до 20%), ламинату 7-10%, краске 10%. Смета, в которой ровно столько метров, сколько в помещении, занижена по определению.

**8. График платежей привязан ко времени, а не к этапам.** Формулировка 40% через две недели защищает подрядчика. Формулировка 40% после приёмки электрики и сантехники защищает вас. Платёж всегда должен быть привязан к принятому, проверяемому этапу работ.

**9. Нет штрафов и условий гарантии.** Договор без штрафа за просрочку означает, что просрочка ничего не стоит подрядчику. Рыночный стандарт — 0,1-0,3% от суммы договора за каждый день задержки и минимум 24 месяца гарантии на строительные работы.

**Как сравнивать предложения, чтобы сравнение имело смысл**

Три предложения сопоставимы только тогда, когда они об одном и том же объёме работ. Составьте одно описание работ и разошлите его всем подрядчикам — вместо того чтобы просить каждого посчитать ремонт. Тогда разница в цене говорит о подрядчике, а не о том, что каждый из них додумал за вас.

Второе условие: имейте собственную независимую смету до того, как откроете предложения. Без неё самое дешёвое предложение всегда выглядит лучшим — а именно оно чаще всего вырастает сильнее всех.

**Красные флаги, при которых стоит отказаться**

- Отказ разбить фиксированную сумму на позиции
- Аванс выше 30% до начала работ
- Отсутствие регистрации, страховки ответственности или готовности подписать договор
- Цена заметно ниже двух других предложений при одинаковом объёме
- Давление принять решение немедленно из-за свободного окна в графике`,
      checklist: [
        'Потребуйте разбивку фиксированной суммы на позиции с обмером и ценой за единицу',
        'Проверьте наличие в смете демонтажа, вывоза мусора и контейнера',
        'Зафиксируйте цену за единицу для каждой позиции по необходимости',
        'Запросите общий итог: работа плюс материалы, а не только одну часть',
        'Сверьте единицы обмера — пол, стены и развёрнутая площадь это разные цифры',
        'Уточните ставку НДС (8% или 23%) и нетто это или брутто',
        'Привяжите каждый платёж к принятому этапу, а не к прошедшему времени',
        'Впишите в договор штраф за просрочку и минимум 24 месяца гарантии',
      ],
      ctaText: 'Проверить предложение подрядчика независимой сметой →',
    },
  ],

  uk: [
    {
      slug: 'vartist-remontu-vannoyi-2026',
      img: '/images/tile.jpg',
      title: 'Вартість ремонту ванної 2026 — скільки коштує м² і чого очікувати?',
      description: 'Актуальні ціни на ремонт ванної кімнати в Польщі у 2026 році. Діапазони для економ, стандарт і преміум оздоблення. Робота, плитка, сантехніка — все в одному місці.',
      cluster: 'rooms',
      publishedAt: '2026-07-02',
      hook: 'Ванна кімната 6 м² може коштувати 9 000 PLN або 55 000 PLN. Різниця — не в площі, а в рішеннях, які ви приймаєте на етапі планування — до того, як найняти підрядника.',
      problem: `Ремонт ванної — один із найскладніших для оцінки проектів. Невелика площа (4–10 м²) створює хибне відчуття низьких витрат — адже кожен квадратний метр тут дорожчий, ніж в інших кімнатах.

Чому? Ванна поєднує кілька спеціальностей одночасно:
— Сантехніка: нові зливи, підводки для душу, умивальника і унітазу — 2 500–7 000 PLN
— Електрика: контури для теплої підлоги, вентилятора, розеток IP44 — 1 200–3 500 PLN
— Плиткові роботи: робота 70–130 PLN/м² при малому форматі, до 200 PLN/м² при великоформатних плитах
— Ангідритова або нівелювальна стяжка — 38–65 PLN/м²

У 2026 році вартість робіт зросла на 12–18% рік до року. Бригади плиточників найбільш завантажені — час очікування 4–10 тижнів.`,
      explanation: `Орієнтовні витрати на ремонт ванної 6 м² в Польщі у 2026 році (без сантехніки і кераміки):

**Економ стандарт — 9 000–17 000 PLN**
Оновлення існуючих комунікацій, нова плитка у вологій зоні, фарбування стін, вінілова підлога або базовий керамограніт. Рішення для ванної у доброму технічному стані.

**Оптимальний стандарт — 18 000–32 000 PLN**
Повне керамічне облицювання стін і підлоги, електрична тепла підлога, заміна сантехнічних підводок, нова електрика. Типовий ремонт квартири перед продажем або модернізацією.

**Преміум стандарт — 34 000–60 000+ PLN**
Великоформатні плити 60×120 або 120×240 см, душ walk-in, водяна тепла підлога, прихований бачок унітазу, вбудоване LED-освітлення.

*Ціни включають роботу й оздоблювальні матеріали. Сантехніка (змішувачі, злив, унітаз, душова кабіна/ванна) — додатково 3 000–25 000 PLN залежно від вибору.*`,
      checklist: [
        'Виміряйте ванну: довжина, ширина, висота, положення вікна і дверей',
        'Оцініть стан комунікацій — заміна труб додає 2 500–7 000 PLN до бюджету',
        'Вирішіть питання теплої підлоги до заливки стяжки',
        'Оберіть формат плитки ДО розрахунку вартості робіт — формат впливає на ціну',
        'Замовте бригаду плиточників за 6–8 тижнів (2026: висока завантаженість)',
        'Запланóвуйте сантехніку і кераміку окремо — це 20–40% загального бюджету',
        'Додайте 20% резерву на несподіванки під старою плиткою (плісень, гниль, старі стяжки)',
        'Розрахуйте кошторис ремонту онлайн до переговорів з підрядником',
      ],
      ctaText: 'Розрахувати кошторис ремонту ванної →',
    },
    {
      slug: 'tsiny-remontu-polshcha-2026',
      img: '/images/flat.jpg',
      title: 'Ціни на ремонт у Польщі 2026 — Варшава, Краків, Вроцлав, Гданськ, Познань',
      description: 'Порівняння вартості ремонтних робіт у найбільших містах Польщі у 2026 році. Де ремонт дешевший, де дорожчий і чому.',
      cluster: 'regional',
      publishedAt: '2026-07-02',
      hook: 'Той самий ремонт 60 м² в оптимальному стандарті коштує 74 000 PLN у Варшаві і 55 000 PLN у Лодзі. Різниця — майже 20 000 PLN, і вона зумовлена виключно місцезнаходженням.',
      problem: `Ринок ремонтних послуг у Польщі сильно диференційований за регіонами. Ставки оплати праці у найбільших агломераціях зростають швидше, ніж у менших містах.

У 2026 році розрив між містами збільшився:
— Варшава і Труймясто: ставки +18–22% рік до року (будівельний бум, брак бригад)
— Краків і Вроцлав: +14–16% рік до року (зростаючий вторинний і інвестиційний ринок)
— Познань: +11–13% рік до року (стабільний ринок, менший дефіцит)
— Лодзь і менші міста: +8–10% рік до року (нижча вартість життя, більше доступних бригад)`,
      explanation: `Регіональні коефіцієнти до базової ставки ремонту (база = Познань = 1,00):

| Місто | Коефіцієнт | Приклад: ремонт 60 м² стандарт |
|---|---|---|
| Варшава | ×1,25 | ~74 000 PLN |
| Труймясто | ×1,15 | ~68 000 PLN |
| Краків | ×1,10 | ~65 000 PLN |
| Вроцлав | ×1,08 | ~64 000 PLN |
| Познань | ×1,00 | ~59 000 PLN |
| Лодзь | ×0,92 | ~54 000 PLN |

Звідки різниця? Бригада маляра у Варшаві очікує 45–70 PLN/м², у Лодзі 30–48 PLN/м². Плиточник у Труймясто: 80–140 PLN/м², у Познані: 60–100 PLN/м².

**Важливо:** Залучення бригад з дешевшого регіону рідко окупається. Транспорт, проживання і ризик відсутності місцевої гарантії усувають економію — залишається лише ризик.`,
      checklist: [
        'Перевірте регіональний коефіцієнт для вашого міста до складання бюджету',
        'Отримайте пропозиції від мінімум 3 місцевих фірм',
        'Уточніть доступність бригад — у 2026 р. бронюйте за 2–4 місяці',
        'Порівнюйте пропозиції з розрахунку на м², а не за весь обсяг',
        'Попросіть детальний кошторис, не паушальний — легше виявити завищення',
        'Перевірте рекомендації щодо проектів у вашому місті — ставки обговорювані',
        'Використовуйте калькулятор з регіональним коефіцієнтом для вашого міста',
        'Плануйте ремонт поза піком (вересень–жовтень) — легше отримати дату і ціну',
      ],
      ctaText: 'Перевірити ціни у вашому місті →',
    },
    {
      slug: 'na-chomu-ne-ekonomyty-pry-remonti',
      img: '/images/premium.jpg',
      title: 'На чому НЕ варто економити при ремонті 2026 — і де можна безпечно скорочувати витрати',
      description: 'Які елементи ремонту варто купувати у вищому стандарті, а де дешевші матеріали підійдуть так само добре? Практичний посібник з будівельних матеріалів 2026.',
      cluster: 'materials',
      publishedAt: '2026-07-02',
      hook: 'Економити на ремонті можна — але тільки у правильних місцях. Неправильна гідроізоляція у ванній означає ремонт через 3 роки. Дешевший ламінат у вітальні — жодних проблем.',
      problem: `Спокуса заощадити зрозуміла — ремонти коштують більше, ніж планувалося. Проблема виникає, коли скорочення стосуються елементів, заміна яких через кілька років обійдеться дорожче від первісної економії.

Найдорожчі помилки економії:
— Дешевша гідроізоляція у ванній (4–8 PLN/м² замість 18–28 PLN/м²): витік через 2–4 роки = ремонт заново
— Відсутність нівелювальної стяжки під плитку: кришення затирки і тріщини через рік
— Дешеві клеї для плитки у вологих зонах: відставання плитки, пліснява під нею
— Електрика без проекту: відсутність контурів = перегорілі запобіжники і перепроектування`,
      explanation: `**Де абсолютно НЕ варто економити:**

*Гідроізоляція* — це 0,5–1,5% бюджету, що захищає 100% ремонту. Різниця між дешевшою і якіснішою мастикою — 200–400 PLN у ванній 6 м². Вартість витоку: 8 000–25 000 PLN.

*Ґрунтовки і підкладки* — ґрунтування стін перед шпаклівкою і фарбуванням коштує 3–8 PLN/м². Без ґрунтовки фарба або шпаклівка відійде впродовж року.

*Електрика і сантехніка* — тут дешеві матеріали = загроза життю або затоплення сусідів.

**Де можна безпечно скорочувати витрати:**

*Ламінат замість паркетної дошки* — у спальні і вітальні різниця в експлуатації мінімальна. Економія: 40–120 PLN/м².

*Фарба* — у менш помітних приміщеннях дешевша фарба у два шари дає той самий результат.

*Електрофурнітура* — розетки і вимикачі середнього цінового сегмента (Ospel, Simon) так само довговічні, як і преміум. Економія: 15–40 PLN за точку.`,
      checklist: [
        'Ніколи не економте на гідроізоляції у ванній, кухні і пральні',
        'Завжди ґрунтуйте стіни і підлоги перед нанесенням шпаклівки, клею або фарби',
        'Клеї для плитки: мінімум клас C2TE у вологих зонах',
        'Фарба: у вітальні і спальні 2 шари хорошої фарби > 3 шарів дешевої',
        'Довіряйте електрику і сантехніку ліцензованим бригадам з сертифікатами',
        'Підлогове покриття, шпалери і електрофурнітура — тут можна шукати дешевші варіанти',
        'Порівнюйте ціни на матеріали у Castorama, Leroy Merlin і будівельних оптовиків',
        'Розрахуйте кошторис з розбивкою на матеріали і роботу — легше знаходити економію',
      ],
      ctaText: 'Розрахувати кошторис з розбивкою на матеріали і роботу →',
    },
    {
      slug: 'ozdoblenyya-kvartyry-vid-zabudovnyka-2026',
      img: '/images/developer.jpg',
      title: 'Оздоблення квартири від забудовника 2026 — скільки коштує і як планувати?',
      description: 'Повний посібник із вартості оздоблення квартири у стані від забудовника у 2026 році. Етапи робіт, реальні цінові діапазони та часті помилки покупців.',
      cluster: 'property',
      publishedAt: '2026-07-02',
      hook: 'Ви купили квартиру від забудовника — вітаємо. Тепер починається справжній розрахунок: оздоблення 50 м² може коштувати від 60 000 до 180 000 PLN. Звідки такий розкид і як не переплатити?',
      problem: `Квартира від забудовника виглядає однаково незалежно від забудовника: голі бетонні стіни, штукатурка, стяжки, ПВХ-вікна, вхідні двері, підводки комунікацій. Порожня, холодна, пахне цементом. І тепер вам потрібно перетворити це на дім.

Головна помилка покупців: недооцінка витрат на оздоблення при ухваленні рішення про покупку.

Типові фінансові сюрпризи після отримання ключів:
— Окремі електричні контури для холодильника, посудомийки і техніки — ніхто не попереджав
— Фарбування стін без вирівнювання шпаклівкою дає ефект апельсинової кірки
— Кондиціонер, що монтується після оздоблення = штроблення стін заново`,
      explanation: `**Етапи оздоблення квартири від забудовника та їх вартість (50 м², оптимальний стандарт):**

**Етап 1 — Підготовка (2–3 тижні) | 8 000–18 000 PLN**
Дизайн-проект або технічний проект, гіпсова шпаклівка: 18–35 PLN/м², вирівнювання стяжки: 22–40 PLN/м².

**Етап 2 — Комунікації (2–4 тижні) | 12 000–28 000 PLN**
Електрика: контури під техніку і кондиціонери. Сантехніка: розводка у ванній і кухні.

**Етап 3 — Мокрі роботи (3–5 тижнів) | 15 000–40 000 PLN**
Плитка у ванній і кухні, нівелювальна стяжка. Ванна 5 м² з сантехнікою: 18 000–45 000 PLN.

**Етап 4 — Підлоги і оздоблення стін (2–3 тижні) | 12 000–35 000 PLN**
Ламінат або паркетна дошка, фарбування: 18–35 PLN/м², підвісні стелі з освітленням.

**Етап 5 — Двері, освітлення, техніка (1–2 тижні) | 8 000–22 000 PLN**
Міжкімнатні двері: 600–4 000 PLN/шт., встановлення і підключення техніки.

**Разом (50 м², оптимальний стандарт): 55 000–143 000 PLN**
— Економ: 45 000–75 000 PLN
— Оптимальний: 76 000–120 000 PLN
— Преміум: 121 000–200 000+ PLN`,
      checklist: [
        'Заплануйте бюджет на оздоблення ДО підписання нотаріального акта — включіть у кредит',
        'Зробіть кошторис оздоблення відразу після отримання ключів, не на око',
        'Замовте проект електрики до фарбування — зміни після = штроблення',
        'Вирішіть питання кондиціонування до оздоблення — труби у стіні не видно',
        'Ванна і кухня в першу чергу — без них не можна жити',
        'Графік: комунікації → мокрі роботи → підлоги → фарбування → монтаж',
        'Бронюйте бригади за 3–4 місяці (2026: висока завантаженість)',
        'Розрахуйте точний кошторис онлайн — знатимете, скільки просити у кредиті на оздоблення',
      ],
      ctaText: 'Розрахувати кошторис оздоблення нової квартири →',
    },
    {
      slug: 'yak-vybrati-ekipu-dlya-remontu-2026',
      img: '/images/resale_property.jpg',
      title: 'Як вибрати бригаду для ремонту в 2026? Запитання і червоні прапори',
      description: 'Повний посібник із перевірки підрядників у Польщі: які питання ставити, на що звертати увагу і як скласти договір, що захистить ваш бюджет.',
      cluster: 'contractors',
      publishedAt: '2026-07-08',
      hook: 'Погана бригада — це не просто зайві витрати. Це місяці стресу, покинутий об\'єкт і судові суперечки. Дізнайтеся, як відрізнити професіоналів від випадкових людей ще до підписання договору.',
      problem: `Ринок ремонтних послуг сповнений майстрів, які виглядають професійно в Instagram, але не мають ні ідентифікаційного коду, ні поліса OC, ні перевірених рекомендацій. Більшість власників квартир обирають бригаду за порадою знайомих або за найнижчою ціною — обидва підходи регулярно закінчуються провалом.

Проблема в тому, що в момент найму ви не знаєте, які запитання ставити. Без правильних інструментів ви переплачуєте, погоджуєтесь на невигідні умови оплати і залишаєтеся без захисту, коли щось іде не так.`,
      explanation: `**Спочатку — проект і незалежний кошторис**

Бригада, яка отримує чіткий проект і обсяг робіт, оцінює чесно. Та, яка має "прикинути на око", закладає собі запас — або навмисно занижує ціну, щоб отримати замовлення, а потім додає "непередбачені" витрати.

Майте незалежний кошторис до того, як запитувати пропозиції. Тільки так ви зрозумієте, чи є 85 000 PLN справедливою ціною за потрібний обсяг робіт.

**5 запитань, які потрібно поставити кожній бригаді**

1. **ІПН і поліс OC** — перевірте компанію в реєстрі CEIDG або KRS, попросіть номер поліса і зателефонуйте страховику, щоб підтвердити його актуальність. Відсутність поліса OC — це ризик, який ви берете на себе.

2. **Рекомендації, яким можна зателефонувати (не фотографії)** — попросіть контакти попередніх клієнтів. Хороша бригада має список задоволених замовників, готових підтвердити якість роботи.

3. **Хто реально буде працювати** — людина, яка підписує договір, часто не та, що укладатиме плитку. Запитайте, хто фізично виконує кожен вид робіт і який у них досвід.

4. **Графік платежів** — червоний прапор: аванс більше 30% до початку робіт або вимога повної оплати до завершення. Чесний варіант: 20–30% на старті, решта поетапно за прийняті роботи.

5. **Що входить у "прибирання після себе"** — деталь, яку часто забувають. Хто вивозить будівельне сміття, хто прибирає пил, хто захищає інші приміщення?

**Червоні прапори, які повинні завершити розмову**

- Відмова підписати письмовий договір
- Оплата тільки готівкою "щоб заощадити" (немає рахунку = немає захисту)
- Зміна ціни після першого тижня роботи без нового обсягу
- Неможливість перевірити попередні об'єкти
- Агресивний тиск на швидке рішення

**Що повинен містити договір**

Хороший договір включає: точний обсяг робіт (з проектом у додатку), графік етапів і платежів, штрафи за затримку, умови гарантії (мінімум 2 роки на будівельні роботи) і порядок пред'явлення претензій. Усний договір при суперечках понад 1 000 PLN не має юридичної сили.`,
      checklist: [
        'Перевірте ІПН підрядника в CEIDG/KRS перед першою зустріччю',
        'Попросіть номер поліса OC і підтвердьте його актуальність у страховика',
        'Зателефонуйте мінімум 2 попереднім клієнтам — запитайте про терміни і виправлення',
        'Не приймайте аванс більше 30% до початку робіт',
        'Підпишіть договір з обсягом робіт, графіком і штрафами за затримку',
        'Уникайте оплати тільки готівкою — немає рахунку, немає захисту',
        'Майте незалежний кошторис до порівняння пропозицій',
        'Уточніть, хто фізично виконуватиме роботи, не лише хто підписує договір',
      ],
      ctaText: 'Розрахувати кошторис і порівняти пропозиції →',
    },
    {
      slug: 'chomu-vazhlyvo-planuvaty-koshtorys-remontu-zazdalehid',
      img: '/images/planning.jpg',
      title: 'Чому кошторис на ремонт треба скласти до того, як ви зателефонуєте підряднику',
      description: 'Кошторис, порахований до розмов з бригадами, захищає бюджет, скорочує терміни й дає перевагу в переговорах. Розбираємо, скільки коштує планувати бюджет уже під час робіт.',
      cluster: 'budget',
      publishedAt: '2026-09-03',
      hook: 'Більшість людей рахують вартість ремонту лише тоді, коли бригада вже стоїть на об’єкті. Це найдорожчий момент для будь-якого рішення — кожна зміна тут коштує у 2-3 рази більше, ніж на папері.',
      problem: `Типовий сценарій виглядає так: ви підписуєте договір на квартиру, телефонуєте двом бригадам, отримуєте дві цифри з різницею у 40 000 PLN і обираєте меншу. Бюджет виникає саме в цей момент — із пропозиції підрядника, а не з вашого розрахунку.

Проблема в тому, що пропозиція підрядника — це не кошторис. Це комерційний документ. Його завдання — виграти замовлення, а не показати вам повну вартість доведення квартири до стану, у якому ви хочете в ній жити.

Що відбувається, коли бюджет планується вже під час ремонту:

— **Ви втрачаєте точку відліку.** Ви не знаєте, 92 000 PLN за 58 м² — це чесна ціна чи завищена на 25%. Без власної цифри ви приймаєте чужу.
— **Рішення ухвалюються під тиском строків.** Бригада чекає на вибір плитки, бо від цього залежить замовлення клею та затирки. Ви обираєте за два дні те, що заслуговувало на два тижні.
— **Зміни коштують у рази дорожче.** Перенести розетку на папері — нуль злотих. Після стяжки та вкладання плитки — 800-2 500 PLN і тиждень простою.
— **Немає чим закрити перевитрату.** Реальна сума розкривається на 6-8 тижні робіт, коли кредит уже вибрано, а заощадження розподілено.

У 2026 році цей механізм б’є сильніше, ніж раніше. Ставки за роботу зросли на 12-18% рік до року, а термін очікування хорошої бригади становить 4-10 тижнів. Докупити термін або бригаду в середині сезону вже неможливо.`,
      explanation: `**Що реально дає кошторис, складений заздалегідь**

**1. Орієнтир для переговорів.** Коли ви знаєте, що ринкова оцінка вашого обсягу робіт — 78 000-92 000 PLN, пропозиція на 115 000 PLN перестає бути ринковою ціною і стає приводом для розмови. Без власної цифри у вас немає аргументу, окрім того, що для вас це дорого.

**2. Правильна послідовність робіт.** Найбільші втрати в ремонті виникають не через ціни на матеріали, а через хибний порядок дій. Електрика й сантехніка мають бути готові до стяжки. Тепла підлога — до фінішного покриття. Вентиляція — до підвісної стелі. Кошторис змушує продумати цю послідовність до того, як хтось почне штробити стіни.

**3. Свідоме скорочення обсягу.** Коли ви бачите вартість кожного елемента до старту, ви можете вирішити, що цього року робите ванну й кухню, а вітальня залишається на наступний рік. Якщо той самий вибір робиться під час робіт, ви платите за два виходи бригади замість одного.

**4. Реальне фінансування.** Банк оцінює кредит за тією сумою, яку ви заявили. Кошторис, готовий за 2-3 місяці до старту, дозволяє один раз запросити правильну суму, а не просити збільшення посеред ремонту.

**Скільки коштує запізніле рішення — приклади ринку 2026**

| Зміна | Вартість на етапі планування | Вартість під час робіт |
|---|---|---|
| Перенесення точки електрики | 0 PLN | 400-900 PLN + простій |
| Відмова від теплої підлоги | 0 PLN | 3 000-8 000 PLN (демонтаж стяжки) |
| Зміна формату плитки | 0 PLN | 60-140 PLN/м² доплати за роботу |
| Додавання перегородки | 0 PLN | 1 800-4 000 PLN + переробка комунікацій |
| Зміна планування кухні | 0 PLN | 2 500-9 000 PLN (сантехніка, електрика) |

**Коли починати планувати**

Оптимальний момент — за 2-4 місяці до запланованого старту робіт. Цього часу вистачить, щоб порахувати бюджет, перевірити його у 2-3 підрядників, забронювати бригаду на конкретну дату та замовити матеріали з довгим терміном постачання (великоформатні плити, столярка, імпортна сантехніка).

**Три рівні точності кошторису**

*Рівень 1 — орієнтовний (15 хвилин).* Ставка за м², помножена на площу та коефіцієнт міста. Достатньо, щоб зрозуміти, чи вписується ремонт у ваші можливості загалом.

*Рівень 2 — за приміщеннями (1 година).* Кожне приміщення рахується окремо, з урахуванням стандарту оздоблення та стану комунікацій. Це рівень, на якому розмова з підрядником стає предметною.

*Рівень 3 — позиційний (робота кошторисника).* Розбивка на конкретні позиції з обміром. Потрібен при ремонтах дорожче 150 000 PLN, при кредиті на ремонт або в спорі з підрядником.

Для переважної більшості квартир рівня 2 цілком достатньо — за умови, що він з’являється **до** першої розмови з бригадою, а не після.`,
      checklist: [
        'Порахуйте кошторис за 2-4 місяці до запланованого старту робіт',
        'Виміряйте кожне приміщення окремо — площі з документів недостатньо',
        'Визначте стандарт оздоблення для кожного приміщення до розрахунку',
        'Перевірте стан електрики й сантехніки — це 15-25% бюджету',
        'Сплануйте порядок робіт: комунікації, стяжки, штукатурка, оздоблення',
        'Закладіть резерв 15-20% на те, що розкриється після демонтажу старих шарів',
        'Майте власну цифру ДО першої розмови з підрядником',
        'Забронюйте бригаду за 6-10 тижнів (сезон 2026)',
      ],
      ctaText: 'Розрахувати кошторис свого ремонту →',
    },
    {
      slug: 'pidvodni-kameni-koshtorysiv-vid-remontnyh-firm',
      img: '/images/estimate-contract.jpg',
      title: 'Підводні камені кошторисів від ремонтних компаній — 9 пунктів, що піднімають рахунок',
      description: 'Як читати кошторис підрядника: фіксована сума без обсягу робіт, позиції за потреби, відсутність вивезення сміття, занижений обмір та інші пункти, що піднімають вартість на 20-40%.',
      cluster: 'contractors',
      publishedAt: '2026-09-03',
      hook: 'Кошторис ремонтної компанії — комерційний документ, а не інженерний. Його мета — виграти замовлення, тому найдешевша пропозиція на старті дуже часто завершується найдорожчим рахунком у фіналі.',
      problem: `Ринок ремонту працює за простим механізмом: клієнт порівнює пропозиції за однією цифрою внизу сторінки. Компанія, яка хоче виграти, має зробити цю цифру низькою. Способів знизити її, не знижуючи реальну вартість, близько десятка — і всі вони цілком законні.

Ідеться не про шахрайство. Ідеться про те, що пропозиція та фактична вартість — два різні документи, а розрив між ними стає видимим лише на 4-6 тижні робіт, коли змінити підрядника практично неможливо.

Типовий розрив на польському ринку у 2026 році становить 20-40% від початкової пропозиції. При ремонті за 90 000 PLN це 18 000-36 000 PLN, яких не було в бюджеті.`,
      explanation: `**9 пунктів, які треба перевірити до підписання**

**1. Фіксована сума без додатка з обсягом робіт.** Рядок на кшталт ремонт квартири 58 м² за 84 000 PLN під ключ не означає нічого. Фіксована сума безпечна лише тоді, коли до договору додано детальний опис робіт. Без нього будь-яка робота, якої немає в описі, стає додатковою — і оплачується окремо.

**2. Позиції за потреби та уточнюється на місці.** Це відкритий чек. Кожна така позиція повинна мати або ціну за одиницю, або граничну суму. Якщо підрядник не хоче назвати ставку за годину додаткових робіт — це вже відповідь.

**3. Відсутність підготовчих і демонтажних робіт.** Зняття плитки, демонтаж старої сантехніки, захист решти приміщень плівкою, вивезення сміття та контейнер. Для квартири 60 м² це реально 4 000-11 000 PLN. Якщо цих позицій немає в кошторисі — їх немає і в ціні.

**4. Матеріали з боку клієнта, приховані з підсумку.** Пропозиція на 84 000 PLN виглядає краще, ніж на 132 000 PLN, якщо плитка, сантехніка, двері, підлоги та світло винесені за кошторис. Завжди просіть розрахунок у двох частинах — робота й матеріали — плюс загальну суму.

**5. Обмір рахується не так, як ви думаєте.** Площа підлоги, площа стін і розгорнута площа — три різні цифри. Фарбування квартири 60 м² — це близько 170-200 м² поверхні стін і стель. Перевірте одиницю вимірювання за кожною позицією.

**6. Неясність зі ставкою ПДВ.** Ремонт житлового приміщення в межах соціальної житлової програми оподатковується за ставкою 8%, але не на все і не завжди. Різниця між 8% і 23% на сумі 90 000 PLN — це 13 500 PLN. Кошторис має прямо вказувати: нетто чи брутто і за якою ставкою.

**7. Матеріал порахований без технологічного запасу.** Плитці потрібен запас 10-15% на підрізку (при діагоналі чи ялинці — до 20%), ламінату 7-10%, фарбі 10%. Кошторис, у якому рівно стільки метрів, скільки в приміщенні, занижений за визначенням.

**8. Графік платежів прив’язаний до часу, а не до етапів.** Формулювання 40% через два тижні захищає підрядника. Формулювання 40% після приймання електрики й сантехніки захищає вас. Платіж завжди має бути прив’язаний до прийнятого, перевірюваного етапу робіт.

**9. Немає штрафів та умов гарантії.** Договір без штрафу за прострочення означає, що прострочення нічого не коштує підряднику. Ринковий стандарт — 0,1-0,3% від суми договору за кожен день затримки та щонайменше 24 місяці гарантії на будівельні роботи.

**Як порівнювати пропозиції, щоб порівняння мало сенс**

Три пропозиції можна порівняти лише тоді, коли вони про той самий обсяг робіт. Складіть один опис робіт і розішліть його всім підрядникам — замість того щоб просити кожного порахувати ремонт. Тоді різниця в ціні говорить про підрядника, а не про те, що кожен із них додумав за вас.

Друга умова: майте власний незалежний кошторис до того, як відкриєте пропозиції. Без нього найдешевша пропозиція завжди виглядає найкращою — а саме вона найчастіше зростає найсильніше.

**Червоні прапорці, за яких варто відмовитися**

- Відмова розбити фіксовану суму на позиції
- Аванс вище 30% до початку робіт
- Відсутність реєстрації, страхування відповідальності чи готовності підписати договір
- Ціна помітно нижча за дві інші пропозиції за однакового обсягу
- Тиск ухвалити рішення негайно через вільне вікно у графіку`,
      checklist: [
        'Вимагайте розбивку фіксованої суми на позиції з обміром і ціною за одиницю',
        'Перевірте наявність у кошторисі демонтажу, вивезення сміття та контейнера',
        'Зафіксуйте ціну за одиницю для кожної позиції за потреби',
        'Запросіть загальний підсумок: робота плюс матеріали, а не лише одну частину',
        'Звірте одиниці обміру — підлога, стіни й розгорнута площа це різні цифри',
        'Уточніть ставку ПДВ (8% чи 23%) і нетто це чи брутто',
        'Прив’яжіть кожен платіж до прийнятого етапу, а не до часу, що минув',
        'Впишіть у договір штраф за прострочення і щонайменше 24 місяці гарантії',
      ],
      ctaText: 'Перевірити пропозицію підрядника незалежним кошторисом →',
    },
  ],
}

export const CONTENT_CLUSTER_MAP = {
  budget: [
    'why-estimate-before-renovation',
    'hidden-renovation-costs',
    'renovation-estimate-psychology',
  ],
  contractors: [
    'how-to-choose-renovation-company',
    'questions-before-signing-contract',
    'how-to-accept-completed-work',
  ],
  rooms: [
    'kitchen-renovation-cost',
    'bathroom-renovation-cost',
    'bedroom-renovation-cost',
    'hallway-renovation',
    'garage-renovation',
    'balcony-renovation',
    'home-office-renovation',
    'kids-room-renovation',
  ],
  property: [
    'apartment-renovation-estimate',
    'house-renovation-estimate',
    'townhouse-renovation',
  ],
  materials: [
    'where-to-save-on-materials',
    'where-not-to-save',
  ],
  regional: [
    'warsaw-renovation-costs',
    'krakow-renovation-costs',
    'wroclaw-renovation-costs',
    'gdansk-renovation-costs',
    'poznan-renovation-costs',
  ],
}


