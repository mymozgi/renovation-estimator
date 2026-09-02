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
    {
      slug: 'jak-policzyc-kosztorys-remontu-krok-po-kroku',
      img: '/images/estimate-method.jpg',
      title: 'Jak policzyć kosztorys remontu krok po kroku — metoda w 7 krokach',
      description: 'Praktyczna instrukcja liczenia kosztorysu remontu: obmiar, zakres, standard, instalacje, materiały, robocizna i rezerwa. Z konkretnymi stawkami rynku 2026.',
      cluster: 'budget',
      publishedAt: '2026-09-17',
      hook: 'Kosztorys to nie jedna liczba pomnożona przez metry. To siedem osobnych decyzji, z których każda przesuwa budżet o kilkanaście tysięcy złotych — i wszystkie da się podjąć przy stole, zanim ktokolwiek wejdzie na budowę.',
      problem: `Najczęstszy błąd przy liczeniu remontu to zacząć od ceny za metr. Stawka 2 200 PLN/m² wygląda konkretnie, ale nie mówi, czy zawiera wymianę instalacji, jakie płytki, czy w ogóle robociznę.

Efekt: liczba wychodzi ładna, a rzeczywistość rozjeżdża się z nią o 30-50%. Nie dlatego, że stawka była zła — tylko dlatego, że nie było wiadomo, co dokładnie obejmuje.

Poprawny kosztorys powstaje odwrotnie: od zakresu do ceny, a nie od ceny do zakresu.`,
      explanation: `**Krok 1 — obmiar każdego pomieszczenia osobno**

Zapisz długość, szerokość i wysokość każdego pomieszczenia. Z tego wyliczysz trzy różne powierzchnie, których będziesz potrzebować: podłogę (długość × szerokość), ściany (obwód × wysokość minus okna i drzwi) i sufit. Powierzchnia z aktu notarialnego nie wystarczy — malowanie mieszkania 60 m² to 170-200 m² ścian i sufitów.

**Krok 2 — zdecyduj o zakresie dla każdego pomieszczenia**

Dla każdego pomieszczenia odpowiedz: odświeżenie, remont częściowy czy pełny? Różnica jest ogromna. Odświeżenie salonu 20 m² to 6 000-11 000 PLN. Pełny remont tego samego salonu z wymianą podłóg i instalacji — 24 000-42 000 PLN.

**Krok 3 — ustal standard wykończenia**

Ekonomiczny, optymalny czy premium. To mnożnik od 0,75 do 1,8 na całą wycenę. Standard nie musi być jednakowy wszędzie: łazienka premium plus sypialnie w standardzie ekonomicznym to najczęstszy rozsądny kompromis.

**Krok 4 — oceń instalacje**

To pozycja, którą się najczęściej pomija. Wymiana instalacji elektrycznej w mieszkaniu 60 m² to 9 000-18 000 PLN, hydraulicznej 6 000-15 000 PLN. W budynkach sprzed 1995 roku zakładaj wymianę domyślnie, nie opcjonalnie.

**Krok 5 — policz materiały z zapasem**

Do obmiaru dolicz zapas technologiczny: płytki 10-15% (układ diagonalny lub jodełka do 20%), panele i deska 7-10%, farba 10%, klej i fugi według wydajności producenta. Materiały to zwykle 45-60% budżetu.

**Krok 6 — dolicz robociznę według stawek Twojego miasta**

Baza to Poznań. Warszawa ×1,25, Trójmiasto ×1,15, Kraków i Wrocław ×1,10, Łódź ×0,92. Robocizna to 35-45% budżetu i to ona najbardziej różni się między miastami.

**Krok 7 — dodaj rezerwę**

15% przy mieszkaniu po remoncie w dobrym stanie, 20-25% przy budynku sprzed 1990 roku lub gdy nie wiesz, co jest pod starymi warstwami. Rezerwa nie jest zapasem na luksusy — to pozycja, która realnie się wydaje.

**Przykład złożony w całość**

Mieszkanie 58 m², Kraków, standard optymalny, budynek z 1998 roku, wymiana elektryki:
prace przygotowawcze i demontaż 7 200 PLN, instalacje 16 500 PLN, tynki i wylewki 12 800 PLN, wykończenie 31 400 PLN, materiały wykończeniowe 24 900 PLN. Razem 92 800 PLN, plus 18% rezerwy = **109 500 PLN**.

Ta sama powierzchnia w Łodzi w standardzie ekonomicznym: około 61 000 PLN. Różnica nie bierze się z metrów, tylko z decyzji w krokach 2, 3 i 4.`,
      checklist: [
        'Zmierz każde pomieszczenie: długość, szerokość, wysokość, okna, drzwi',
        'Wypisz trzy powierzchnie: podłoga, ściany, sufit — będą potrzebne osobno',
        'Zdecyduj o zakresie dla każdego pomieszczenia oddzielnie',
        'Ustal standard wykończenia — to mnożnik 0,75-1,8 na całość',
        'Sprawdź rok budowy i stan instalacji przed liczeniem czegokolwiek',
        'Dolicz zapas technologiczny do każdego materiału (10-20%)',
        'Zastosuj mnożnik swojego miasta do robocizny',
        'Dodaj 15-25% rezerwy zależnie od wieku budynku',
      ],
      ctaText: 'Policz swój kosztorys w 5 minut →',
    },
    {
      slug: 'od-czego-zalezy-koszt-remontu',
      img: '/images/cost-factors.jpg',
      title: 'Od czego zależy koszt remontu — 9 czynników, które ustalają cenę',
      description: 'Dlaczego ten sam metraż kosztuje 55 000 albo 140 000 PLN. Dziewięć czynników, które realnie decydują o cenie remontu, uszeregowanych według siły wpływu.',
      cluster: 'budget',
      publishedAt: '2026-10-01',
      hook: 'Dwa mieszkania po 60 m², oba w Warszawie, oba remontowane w tym samym miesiącu. Jedno kosztowało 58 000 PLN, drugie 141 000 PLN. Metraż wyjaśnia zero procent tej różnicy.',
      problem: `Pytanie ile kosztuje remont 60 m² nie ma odpowiedzi, bo powierzchnia jest jednym z najsłabszych czynników cenotwórczych. Metry mówią, ile jest do zrobienia — nie mówią, co i jak dokładnie.

Dlatego wyceny od dwóch wykonawców potrafią różnić się dwukrotnie, a obie są uczciwe: po prostu każdy z nich założył inny zakres, inny standard i inny stan wyjściowy.

Poniżej dziewięć czynników uszeregowanych według tego, jak mocno przesuwają rachunek końcowy.`,
      explanation: `**1. Zakres prac — wpływ do ×4**

Najsilniejszy czynnik. Odświeżenie (malowanie, drobne poprawki) to 350-700 PLN/m². Remont pełny z wymianą instalacji, wylewek i wszystkich warstw — 2 000-4 500 PLN/m². To nie jest różnica standardu, to różnica tego, co w ogóle robisz.

**2. Standard wykończenia — wpływ do ×2,4**

Ekonomiczny, optymalny, premium. Płytka gresowa 45 PLN/m² i płyta wielkoformatowa 340 PLN/m² leżą na tej samej podłodze i wymagają innej robocizny. Standard działa na materiały i na robociznę jednocześnie, dlatego mnoży się szybciej, niż się wydaje.

**3. Stan instalacji i wiek budynku — wpływ do +35%**

Budynek z lat 60-80: aluminiowe przewody, rury stalowe, brak uziemienia, stropy o nieznanej nośności. Wymiana instalacji w takim mieszkaniu to 15 000-33 000 PLN, których nie ma w mieszkaniu z 2015 roku.

**4. Miasto — wpływ do +36%**

Mnożniki robocizny 2026: Warszawa ×1,25, Trójmiasto ×1,15, Kraków ×1,12, Wrocław ×1,10, Poznań ×1,00, Łódź ×0,92. Materiały są w całym kraju podobne — różnicę robi wyłącznie robocizna.

**5. Liczba pomieszczeń przy tej samej powierzchni — wpływ do +25%**

60 m² podzielone na 4 pokoje kosztuje więcej niż 60 m² w układzie otwartym: więcej ścian do wykończenia, więcej drzwi, więcej narożników, więcej punktów elektrycznych. Metraż ten sam, pracy więcej.

**6. Udział łazienek i kuchni — wpływ do +30%**

To najdroższe metry w mieszkaniu: hydraulika, wentylacja, wodoodporność, ceramika. Mieszkanie z dwiema łazienkami jest istotnie droższe od mieszkania z jedną, przy identycznej powierzchni.

**7. Zmiany układu — wpływ do +20%**

Wyburzenie ściany to nie tylko rozbiórka: to ekspertyza (przy ścianach nośnych), nadproże, przeniesienie instalacji, nowe wylewki w miejscu ściany i poprawki sufitu.

**8. Termin — wpływ do +15%**

Remont w sezonie (marzec-październik) jest droższy i trudniej o ekipę. Ten sam zakres w styczniu bywa tańszy o 8-15%, bo ekipy mają luki w grafiku.

**9. Sposób zakupu materiałów — wpływ do +12%**

Materiał kupowany przez wykonawcę zwykle zawiera marżę 10-20%, ale wykonawca odpowiada za braki i docinki. Materiał własny jest tańszy, ale ryzyko błędnego obmiaru przechodzi na Ciebie.

**Jak to złożyć**

Zacznij od czynników 1-3 — one odpowiadają za około 70% rozrzutu cen. Dopiero potem dopasowuj resztę. Optymalizacja standardu przy niezdefiniowanym zakresie to liczenie ozdób przed postawieniem ścian.`,
      checklist: [
        'Zdefiniuj zakres przed pytaniem o cenę — to czynnik nr 1',
        'Ustal standard osobno dla każdego pomieszczenia',
        'Sprawdź rok budowy i stan instalacji — to do +35% budżetu',
        'Zastosuj mnożnik miasta do robocizny, nie do materiałów',
        'Policz liczbę pomieszczeń i narożników, nie tylko metry',
        'Wyceń łazienki i kuchnię osobno — to najdroższe metry',
        'Rozważ start poza sezonem: 8-15% oszczędności',
        'Zdecyduj, kto kupuje materiały, i wpisz to do umowy',
      ],
      ctaText: 'Sprawdź, ile kosztuje Twój zakres →',
    },
    {
      slug: 'ukryte-koszty-remontu',
      img: '/images/hidden-costs.jpg',
      title: 'Ukryte koszty remontu — 14 pozycji, których nie ma w wycenie',
      description: 'Wywóz gruzu, kontener, prąd, przechowanie mebli, mieszkanie zastępcze, poprawki i wykończenie po ekipie. Pełna lista kosztów, które pojawiają się poza kosztorysem.',
      cluster: 'budget',
      publishedAt: '2026-10-15',
      hook: 'Kosztorys mówił 84 000 PLN. Z konta zeszło 112 000 PLN. Różnica to nie ukryta marża wykonawcy — to czternaście pozycji, których po prostu nikt nie policzył, bo żadna z nich nie jest robocizną ani materiałem wykończeniowym.',
      problem: `Kosztorys wykonawcy opisuje prace budowlane. Remont to znacznie więcej niż prace budowlane — a reszta i tak wychodzi z tego samego portfela.

Te pozycje mają wspólną cechę: każda z osobna wygląda na drobiazg. 900 PLN za kontener, 400 PLN za przechowanie mebli, 1 200 PLN za drzwi wewnętrzne, o których zapomniałeś. Zsumowane dają zwykle 18-30% wartości kosztorysu.

Poniżej pełna lista, w kolejności od najczęściej pomijanych.`,
      explanation: `**Wokół budowy**

**1. Wywóz gruzu i kontener** — 800-2 600 PLN. Kontener 5 m³ w Warszawie to około 900 PLN, przy pełnym remoncie mieszkania potrzebne bywają dwa. Dochodzi wniesienie gruzu z piętra, jeśli nie ma windy towarowej.

**2. Zabezpieczenie części nieremontowanej** — 300-900 PLN. Folia, taśmy, płyty ochronne na podłogę w korytarzu i klatce.

**3. Zgoda wspólnoty i kaucja** — 0-2 000 PLN. Wiele wspólnot pobiera kaucję za korzystanie z windy i klatki schodowej.

**4. Prąd i woda podczas prac** — 200-700 PLN. Przy pełnym remoncie z osuszaniem i ogrzewaniem nadmuchowym potrafi być więcej.

**Wokół Ciebie**

**5. Mieszkanie zastępcze** — 0-14 000 PLN. Przy pełnym remoncie 2-3 miesiące poza domem. Najczęściej niedoszacowana pozycja w całym zestawieniu.

**6. Przechowanie mebli** — 300-1 800 PLN. Magazyn typu self-storage, 8-14 m³ przez 2-3 miesiące.

**7. Transport i przeprowadzka** — 600-2 500 PLN, licząc w obie strony.

**Rzeczy, które są remontem, ale nie są w kosztorysie**

**8. Drzwi wewnętrzne z montażem** — 900-2 600 PLN za sztukę. Przy czterech pomieszczeniach to 4 000-10 000 PLN.

**9. Oświetlenie i osprzęt** — 2 000-9 000 PLN. Lampy, gniazdka, włączniki, taśmy LED z zasilaczami.

**10. Armatura i ceramika** — 3 000-25 000 PLN. Baterie, miska WC, umywalka, kabina lub wanna. Prawie zawsze poza kosztorysem robocizny.

**11. Karnisze, rolety, moskitiery** — 800-4 500 PLN.

**12. Sprzątanie poremontowe** — 400-1 400 PLN. Pył budowlany wymaga trzech przejść, nie jednego.

**Po zakończeniu**

**13. Poprawki i usterki** — 500-3 000 PLN. Nawet przy dobrej ekipie część usterek ujawnia się po miesiącu użytkowania.

**14. Wykończenie po ekipie** — 1 000-5 000 PLN. Silikony, listwy, progi, regulacja drzwi, drobne malowanie.

**Ile to razem**

Dla mieszkania 58 m² w standardzie optymalnym, przy kosztorysie 84 000 PLN, realny zakres tych pozycji to **16 000-31 000 PLN**. Nawet w wariancie oszczędnym, bez mieszkania zastępczego, wychodzi około 12 000 PLN.

Dlatego rezerwa 15-20% nie jest ostrożnością — jest po prostu prawidłowo policzoną resztą remontu.`,
      checklist: [
        'Wpisz do budżetu kontener i wywóz gruzu — 800-2 600 PLN',
        'Policz koszt mieszkania zastępczego na 2-3 miesiące',
        'Dolicz przechowanie mebli i transport w obie strony',
        'Wyceń drzwi wewnętrzne osobno — 900-2 600 PLN za sztukę',
        'Zaplanuj budżet na armaturę, ceramikę i oświetlenie',
        'Sprawdź, czy wspólnota pobiera kaucję za klatkę i windę',
        'Zarezerwuj 400-1 400 PLN na sprzątanie poremontowe',
        'Zostaw 1 000-5 000 PLN na poprawki i wykończenie po ekipie',
      ],
      ctaText: 'Policz kosztorys z pełnym budżetem →',
    },
    {
      slug: 'bledy-ekip-w-wycenie-remontu',
      img: '/images/contractor-estimate-errors.jpg',
      title: 'Błędy ekip w wycenie remontu — dlaczego wykonawca myli się o 30%',
      description: 'Dlaczego wyceny od ekip remontowych regularnie rozjeżdżają się z rzeczywistością. Dziesięć mechanizmów, przez które wykonawca zaniża koszt, i pytania, które to wykrywają.',
      cluster: 'contractors',
      publishedAt: '2026-10-29',
      hook: 'Wykonawca nie kłamie, gdy podaje 84 000 PLN, a kończy na 112 000 PLN. On naprawdę tak policzył. Problem w tym, jak policzył — i to jest coś, co da się sprawdzić w piętnaście minut.',
      problem: `Ekipa remontowa to zespół budowlany, nie biuro kosztorysowe. Ludzie, którzy świetnie kładą płytki, rzadko mają narzędzia i czas na rzetelny obmiar. Wycena powstaje między jednym zleceniem a drugim, najczęściej wieczorem, na podstawie dwudziestominutowej wizyty.

To nie jest zła wola. To strukturalna cecha tego rynku: wycena jest kosztem po stronie wykonawcy, a nie usługą, za którą ktoś płaci. Im szybciej powstanie, tym lepiej dla niego.

Poniżej dziesięć mechanizmów, przez które taka wycena systematycznie wychodzi za nisko.`,
      explanation: `**1. Wycena na oko, bez obmiaru**

Wizyta trwa 20 minut, wykonawca chodzi po mieszkaniu i szacuje. Nie mierzy wysokości, nie liczy obwodu ścian, nie sprawdza ilości narożników. Błąd samego obmiaru to zwykle 10-18%.

**2. Kotwica z poprzedniego zlecenia**

Ostatnie mieszkanie 55 m² kosztowało 78 000 PLN, więc to 58 m² wyceniam na 82 000 PLN. Metraż jest podobny, ale rok budowy, stan instalacji i układ mogą być zupełnie inne.

**3. Nikt nie zagląda pod stare warstwy**

Pod płytkami bywa zawilgocona wylewka, pod panelami spękany jastrych, w ścianie aluminiowe przewody. Dopóki nie zacznie się rozbiórka, to jest zgadywanie — i zgaduje się optymistycznie.

**4. Liczenie po powierzchni podłogi, gdy praca jest na ścianach**

Klasyk. Mieszkanie 60 m² ma 170-200 m² ścian i sufitów. Wycena po 60 m² zaniża malowanie, tynkowanie i gruntowanie o rząd wielkości.

**5. Świadome zaniżenie, żeby wygrać zlecenie**

Wykonawca wie, że klient porówna trzy liczby i wybierze najniższą. Prace dodatkowe dojdą później, gdy zmiana ekipy będzie już praktycznie niemożliwa.

**6. Brak logistyki w wycenie**

Czwarte piętro bez windy, wąska klatka, zakaz parkowania przed budynkiem, brak miejsca na kontener. Każde z tych ograniczeń dokłada realnie 4-9% do robocizny — i prawie nigdy nie ma go w wycenie.

**7. Prace przygotowawcze i porządkowe poza wyceną**

Demontaż, zabezpieczenie folią, wynoszenie gruzu, sprzątanie międzyetapowe. Przy mieszkaniu 60 m² to 4 000-11 000 PLN, które ktoś i tak wykona i za które ktoś i tak zapłaci.

**8. Materiał bez zapasu technologicznego**

Płytki liczone dokładnie na metry pomieszczenia, bez 10-15% na docinki. Brakujące płytki dokupuje się z innej partii, w innym odcieniu — i wtedy dochodzi jeszcze koszt poprawki.

**9. Wycena z marca użyta we wrześniu**

Wycena ma zwykle ważność 14-30 dni, ale remonty zaczynają się 2-4 miesiące po rozmowie. Przy wzroście stawek 12-18% rocznie to samo w sobie daje 3-6% różnicy.

**10. Brak pozycji na nieprzewidziane**

Rzetelny kosztorys ma linię rezerwy. Wycena handlowa jej nie ma, bo obniżałaby liczbę na dole strony — a to właśnie ta liczba wygrywa zlecenie.

**Pięć pytań, które wykrywają wszystkie dziesięć**

1. Jaką powierzchnię ścian Pan policzył? (jeśli odpowiedź brzmi 60 m², wróć do punktu 4)
2. Co się stanie, jeśli pod płytkami będzie mokra wylewka?
3. Czy w cenie jest wywóz gruzu i kontener?
4. Ile procent zapasu na docinki założono na płytki?
5. Do kiedy ta wycena obowiązuje?

Wykonawca, który odpowiada konkretnie na wszystkie pięć, liczył rzetelnie. Wykonawca, który zbywa trzy z nich, dopiero zacznie liczyć — na Twój koszt.`,
      checklist: [
        'Zapytaj o policzoną powierzchnię ścian, nie podłogi',
        'Sprawdź, czy wykonawca w ogóle mierzył, czy szacował na oko',
        'Ustal na piśmie, co się dzieje przy odkryciach pod starymi warstwami',
        'Potwierdź, że wywóz gruzu i kontener są w cenie',
        'Zapytaj o procent zapasu technologicznego na materiały',
        'Sprawdź termin ważności wyceny i datę planowanego startu',
        'Opisz ograniczenia logistyczne: piętro, winda, parking',
        'Poproś o linię rezerwy w kosztorysie — jej brak to sygnał ostrzegawczy',
      ],
      ctaText: 'Porównaj wycenę ekipy z niezależnym kosztorysem →',
    },
    {
      slug: 'obmiar-i-zapas-materialow',
      img: '/images/measuring-materials.jpg',
      title: 'Obmiar i zapas materiałów — jak liczyć, żeby nie zabrakło i nie zostało',
      description: 'Jak poprawnie obmierzyć pomieszczenie i ile zapasu technologicznego doliczyć do płytek, paneli, farby i klejów. Z przykładowym wyliczeniem dla łazienki 6 m².',
      cluster: 'materials',
      publishedAt: '2026-11-12',
      hook: 'Zabrakło ośmiu płytek. Dokupione z innej partii mają inny odcień, więc trzeba przełożyć całą ścianę. Koszt tego jednego błędu w obmiarze: 2 400 PLN i cztery dni opóźnienia.',
      problem: `Obmiar wygląda na najprostszą część kosztorysu — mierzysz i mnożysz. W praktyce to miejsce, gdzie powstaje najwięcej kosztownych pomyłek, bo każdy materiał liczy się w innej jednostce i z innym zapasem.

Trzy najczęstsze błędy: liczenie wszystkiego po powierzchni podłogi, pomijanie zapasu technologicznego i odejmowanie okien oraz drzwi tam, gdzie nie należy.`,
      explanation: `**Trzy powierzchnie, których potrzebujesz**

**Podłoga** = długość × szerokość. Do niej liczysz: wylewkę, panele, gres, izolację, ogrzewanie podłogowe.

**Ściany** = obwód × wysokość. Do niej liczysz: tynki, gładzie, farbę, tapetę, płytki ścienne. Obwód to 2 × (długość + szerokość).

**Powierzchnia rozwinięta** = ściany + sufit. Do niej liczysz malowanie i gruntowanie. Dla mieszkania 60 m² to zwykle 170-200 m².

**Kiedy odejmować okna i drzwi**

Przy farbie i tynkach odejmuj otwory powyżej 2 m². Przy płytkach nie odejmuj nic poniżej 1 m² — docinki wokół małego otworu i tak zjadają materiał. Przy panelach nie odejmuj progów ani wnęk.

**Zapas technologiczny — tabela**

| Materiał | Układ prosty | Układ trudny |
|---|---|---|
| Płytki, gres | 10% | 15-20% (diagonal, jodełka) |
| Płyty wielkoformatowe | 12% | 20-25% |
| Panele, deska | 7% | 10-12% (ukos, jodełka) |
| Tapeta z wzorem | 15% | 20% (duży raport wzoru) |
| Farba | 10% | 15% (mocna zmiana koloru) |
| Listwy, cokoły | 8% | 10% |

**Materiały liczone przez wydajność, nie przez powierzchnię**

Klej do płytek: 3-6 kg/m² zależnie od formatu i grzebienia. Grunt: 0,1-0,2 l/m². Fuga: 0,3-1,2 kg/m² zależnie od szerokości spoiny i formatu płytki. Zawsze sprawdzaj wydajność na opakowaniu — różnice między producentami sięgają 40%.

**Przykład: łazienka 6 m²**

Wymiary 2,0 × 3,0 m, wysokość 2,6 m. Płytki na podłodze i na ścianach do sufitu.

Podłoga: 2,0 × 3,0 = 6,0 m². Plus 10% = **6,6 m²**.
Ściany: obwód 2 × (2,0 + 3,0) = 10 m; 10 × 2,6 = 26,0 m². Drzwi 1,7 m² odejmujemy, okna brak. 24,3 m², plus 12% = **27,2 m²**.
Razem płytek: 33,8 m². Zamawiasz pełne opakowania, więc realnie 34-35 m².
Klej: 34 × 4,5 kg = **153 kg** (7 worków po 25 kg).
Fuga: 34 × 0,6 = **20,4 kg**.

**Zasada, która oszczędza najwięcej**

Kupuj cały materiał z jednej partii produkcyjnej naraz. Numer partii jest na opakowaniu. Dokupienie dwóch metrów miesiąc później niemal zawsze oznacza inny odcień — i przekładanie całej powierzchni zamiast dołożenia dwóch metrów.`,
      checklist: [
        'Policz trzy powierzchnie osobno: podłoga, ściany, rozwinięta',
        'Odejmuj otwory tylko powyżej 2 m² i tylko przy farbie oraz tynkach',
        'Dolicz zapas według układu: prosty 10%, jodełka lub diagonal 15-20%',
        'Sprawdź wydajność kleju, gruntu i fugi na opakowaniu producenta',
        'Zamawiaj pełne opakowania, zaokrąglając w górę',
        'Kupuj cały materiał z jednej partii produkcyjnej',
        'Zapisz numer partii na wypadek reklamacji lub dokupienia',
        'Zostaw 2-3 m² płytek w piwnicy na przyszłe naprawy',
      ],
      ctaText: 'Policz materiały dla swojego mieszkania →',
    },
    {
      slug: 'rezerwa-w-kosztorysie-remontu',
      img: '/images/budget-reserve.jpg',
      title: 'Rezerwa w kosztorysie remontu — ile założyć i na co realnie idzie',
      description: 'Ile procent rezerwy zaplanować zależnie od wieku budynku, na co ta rezerwa faktycznie się wydaje i jak nią zarządzać, żeby nie skończyła się w połowie remontu.',
      cluster: 'budget',
      publishedAt: '2026-11-26',
      hook: 'Rezerwa nie jest funduszem na luksusy, których jeszcze nie wybrałeś. To pozycja, która w 4 na 5 remontów zostaje wydana w całości — i prawie zawsze na rzeczy, których nie dało się zobaczyć przed rozbiórką.',
      problem: `Najczęstsze podejście do rezerwy brzmi: dodam 10%, na wszelki wypadek. To za mało i w złym miejscu.

Za mało, bo mediana przekroczenia budżetu na polskim rynku wynosi 18-24%. W złym miejscu, bo rezerwa dopisana na końcu jest traktowana jak bufor na upgrade — lepsze płytki, droższa bateria — i znika, zanim pojawi się prawdziwy problem.

Rezerwa jest pozycją kosztorysu, a nie zaokrągleniem w górę.`,
      explanation: `**Ile założyć — według wieku budynku i zakresu**

| Sytuacja | Rezerwa |
|---|---|
| Mieszkanie od dewelopera, stan surowy | 10-12% |
| Budynek po 2010, remont częściowy | 12-15% |
| Budynek 1995-2010, remont pełny | 15-18% |
| Budynek 1970-1995 | 20-25% |
| Budynek sprzed 1970 lub kamienica | 25-35% |
| Zmiana układu ze ścianami nośnymi | +5% do powyższych |

**Na co realnie idzie — dane z rynku**

**Odkrycia pod starymi warstwami (35-45% wykorzystanej rezerwy).** Zawilgocona wylewka, spękany jastrych, grzyb za zabudową, stara izolacja bez paroizolacji.

**Instalacje w gorszym stanie niż zakładano (20-30%).** Aluminium zamiast miedzi, brak uziemienia, rury stalowe z osadem, nieszczelne podejścia.

**Nierówności konstrukcji (10-15%).** Ściany odchylone o 3-5 cm na wysokość, podłogi ze spadkiem, sufity o różnej wysokości. Każdy centymetr wyrównania to materiał i robocizna.

**Zmiany decyzji w trakcie (10-15%).** To jedyna część, na którą masz pełny wpływ.

**Opóźnienia i przestoje (5-10%).** Dłuższy najem mieszkania zastępczego, ponowny transport, powtórna mobilizacja ekipy.

**Jak zarządzać rezerwą, żeby wystarczyła**

**Zasada pierwsza: nie ruszaj rezerwy do 60% zaawansowania prac.** Większość kosztownych odkryć ujawnia się w pierwszej połowie remontu — przy rozbiórce i instalacjach. Jeśli w tym momencie rezerwa jest nienaruszona, dalej ryzyko szybko spada.

**Zasada druga: upgrade to nie rezerwa.** Chcesz droższe płytki? To zmiana standardu, finansowana z osobnej decyzji, nie z linii na nieprzewidziane.

**Zasada trzecia: każde uruchomienie rezerwy zapisuj.** Data, kwota, powód, zdjęcie. To jednocześnie dokumentacja przy sporze z wykonawcą i realna kontrola nad tym, ile zostało.

**Zasada czwarta: rezerwa niewykorzystana to nie oszczędność do wydania na końcu.** W około 20% remontów rezerwa faktycznie zostaje. To wtedy budżet na wyposażenie — ale dopiero po odbiorze końcowym, nie w połowie prac.

**Ile to w liczbach**

Mieszkanie 58 m², budynek z 1978 roku, remont pełny, kosztorys prac 92 000 PLN. Rezerwa 22% = 20 240 PLN. Realny budżet: **112 240 PLN**. To jest liczba, którą podajesz w banku i którą masz zabezpieczoną — nie 92 000 PLN.`,
      checklist: [
        'Dobierz procent rezerwy do wieku budynku, nie do własnego optymizmu',
        'Wpisz rezerwę jako osobną pozycję kosztorysu, nie jako zaokrąglenie',
        'Nie ruszaj rezerwy przed 60% zaawansowania prac',
        'Finansuj zmiany standardu osobno — to nie jest nieprzewidziane',
        'Zapisuj każde uruchomienie rezerwy: data, kwota, powód, zdjęcie',
        'Przy zmianie układu ze ścianami nośnymi dolicz dodatkowe 5%',
        'Podawaj bankowi kwotę z rezerwą, nie samą wycenę prac',
        'Rezerwę, która została, wydawaj dopiero po odbiorze końcowym',
      ],
      ctaText: 'Policz kosztorys razem z rezerwą →',
    },
    {
      slug: 'prace-przygotowawcze-i-rozbiorkowe',
      img: '/images/prep-works.jpg',
      title: 'Prace przygotowawcze i rozbiórkowe — 8-14% budżetu, których nikt nie liczy',
      description: 'Demontaż, wywóz gruzu, zabezpieczenie mieszkania i sprzątanie międzyetapowe. Ile to realnie kosztuje, jak policzyć objętość gruzu i dlaczego ta pozycja znika z wycen.',
      cluster: 'budget',
      publishedAt: '2026-12-10',
      hook: 'Zanim ktokolwiek położy pierwszą płytkę, mieszkanie trzeba rozebrać, wynieść, wywieźć i zabezpieczyć. To 8-14% budżetu i średnio dwa tygodnie harmonogramu — pozycja, której nie widać na żadnym zdjęciu z remontu.',
      problem: `Prace przygotowawcze mają pecha: nie zostawiają po sobie nic, co można pokazać. Nikt nie robi zdjęcia pustego mieszkania po rozbiórce. Dlatego w rozmowach o remoncie ten etap znika, a w wycenach pojawia się jako jedna linijka o nieokreślonej treści albo nie pojawia się wcale.

Tymczasem to etap, który generuje realne koszty, wymaga sprzętu i ludzi, i którego nie da się pominąć. Przy mieszkaniu 60 m² mówimy o 4 000-11 000 PLN.`,
      explanation: `**Z czego składa się ten etap**

**Demontaż okładzin** — skucie płytek 28-55 PLN/m², zerwanie paneli 12-22 PLN/m², usunięcie tapety 10-18 PLN/m², skucie tynku 30-60 PLN/m².

**Demontaż wyposażenia** — armatura łazienkowa 250-700 PLN za komplet, kuchnia w zabudowie 400-1 200 PLN, drzwi wewnętrzne 80-160 PLN za sztukę, okna 200-450 PLN za sztukę.

**Rozbiórka ścian** — ścianka działowa z cegły 90-170 PLN/m², z płyty g-k 35-60 PLN/m². Ściana nośna to osobna kategoria: wymaga ekspertyzy konstrukcyjnej (1 500-4 000 PLN) i nadproża.

**Skucie wylewki** — 45-90 PLN/m². Pozycja, która pojawia się dopiero wtedy, gdy pod starą podłogą znajdzie się spękany jastrych.

**Wynoszenie i wywóz** — 40-90 PLN za m³ przy wynoszeniu z piętra bez windy, kontener 5 m³ 700-1 100 PLN, 7 m³ 900-1 500 PLN.

**Zabezpieczenie** — folia, taśmy, płyty na podłogę w części nieremontowanej, zabezpieczenie klatki schodowej i windy: 300-900 PLN.

**Sprzątanie międzyetapowe** — 150-400 PLN za każde. Przy pełnym remoncie potrzebne 3-4 razy, nie tylko na końcu.

**Jak policzyć objętość gruzu**

Gruz liczy się w m³, a nie w workach. Orientacyjne przeliczniki:

| Materiał | Waga | Objętość gruzu |
|---|---|---|
| Płytki ze ściany, 1 m² | 18-25 kg | 0,015 m³ |
| Wylewka 5 cm, 1 m² | 100-120 kg | 0,05 m³ |
| Ścianka z cegły, 1 m² | 180-260 kg | 0,12 m³ |
| Tynk skuwany, 1 m² | 25-40 kg | 0,02 m³ |

Mieszkanie 60 m² z pełną rozbiórką łazienki, kuchni i podłóg daje zwykle 6-11 m³ gruzu, czyli dwa kontenery.

**Trzy rzeczy, które podnoszą tę pozycję najbardziej**

**Brak windy towarowej.** Wynoszenie gruzu po schodach z 4. piętra podnosi koszt wywozu o 60-120%.

**Zakaz postoju kontenera przed budynkiem.** Wtedy gruz jedzie w workach typu big bag, co jest droższe o 30-50%.

**Odpady wymagające osobnej utylizacji.** Płyty gipsowe, wełna mineralna, materiały z azbestem (budynki 1960-1990). Azbest to osobna, licencjonowana procedura — 60-150 PLN/m².

**Dlaczego to znika z wycen**

Bo obniża liczbę na dole strony i nie brzmi jak remont. Klient porównuje trzy oferty i wybiera tę, w której nie ma pozycji rozbiórka i wywóz — nie zauważając, że praca i tak zostanie wykonana, tylko rozliczona później jako prace dodatkowe.`,
      checklist: [
        'Policz objętość gruzu w m³, nie w workach',
        'Sprawdź, czy jest winda towarowa i gdzie stanie kontener',
        'Wyceń demontaż osobno dla każdego rodzaju okładziny',
        'Przy budynku 1960-1990 sprawdź materiały pod kątem azbestu',
        'Zaplanuj 3-4 sprzątania międzyetapowe, nie jedno na końcu',
        'Zabezpiecz część nieremontowaną, klatkę i windę',
        'Przy ścianie nośnej zamów ekspertyzę przed wyceną rozbiórki',
        'Wpisz rozbiórkę i wywóz do umowy jako osobne pozycje',
      ],
      ctaText: 'Policz kosztorys z pracami przygotowawczymi →',
    },
    {
      slug: 'instalacje-elektryczne-i-hydrauliczne-koszt',
      img: '/images/electrics-plumbing.jpg',
      title: 'Instalacje elektryczne i hydrauliczne — 15-25% budżetu remontu',
      description: 'Kiedy wymiana instalacji jest konieczna, ile kosztuje punkt elektryczny i podejście hydrauliczne, i dlaczego to jedyna część remontu, na której nie wolno oszczędzać.',
      cluster: 'budget',
      publishedAt: '2026-12-24',
      hook: 'Instalacje to jedyna część remontu, która jest niewidoczna po zakończeniu i jednocześnie jedyna, której poprawienie wymaga zniszczenia wszystkiego, co jest na wierzchu. Dlatego kolejność ma tu większe znaczenie niż cena.',
      problem: `Elektryka i hydraulika pochłaniają 15-25% budżetu i nie zostawiają po sobie nic, co widać. Kusi, żeby tu przyciąć — zostawić stare przewody, wymienić tylko widoczne rury, dołożyć obwód później.

Problem polega na tym, że instalacje są pod tynkiem, pod wylewką i pod płytkami. Każda ich poprawka po zakończeniu remontu oznacza skucie warstw wykończeniowych, czyli koszt 3-6 razy wyższy niż zrobienie tego od razu.`,
      explanation: `**Kiedy wymiana jest konieczna, a nie opcjonalna**

**Instalacja elektryczna — wymień, gdy:**
- budynek powstał przed 1995 rokiem (aluminium zamiast miedzi),
- brakuje instalacji uziemiającej i wyłącznika różnicowoprądowego,
- przekrój przewodów wynosi 1,5 mm² na obwodach gniazd,
- tablica rozdzielcza ma korki, nie wyłączniki nadprądowe,
- planujesz płytę indukcyjną, klimatyzację lub ogrzewanie podłogowe.

**Instalacja hydrauliczna — wymień, gdy:**
- rury są stalowe ocynkowane (typowe do lat 90.),
- ciśnienie spada przy jednoczesnym poborze w dwóch punktach,
- widoczna jest korozja na złączkach lub ślady wilgoci przy pionach,
- zmieniasz układ łazienki lub kuchni.

**Ile to kosztuje — stawki 2026**

| Pozycja | Cena |
|---|---|
| Punkt elektryczny (gniazdo, włącznik) | 120-260 PLN |
| Punkt oświetleniowy | 140-300 PLN |
| Obwód dedykowany (płyta, piekarnik) | 350-700 PLN |
| Tablica rozdzielcza z osprzętem | 1 800-4 500 PLN |
| Podejście wodne (ciepła i zimna) | 380-750 PLN |
| Podejście kanalizacyjne | 300-650 PLN |
| Przeniesienie pionu | 1 500-4 000 PLN |
| Pomiary i protokół odbioru | 400-900 PLN |

**Ile punktów potrzeba realnie**

Mieszkanie 58 m² w standardzie z 2026 roku: 38-52 punkty elektryczne. Salon 12-16, kuchnia 14-20 (z obwodami dedykowanymi), sypialnia 6-9, łazienka 5-8, przedpokój 4-6.

Dla porównania: mieszkanie z lat 80. ma zwykle 12-18 punktów w całości. Stąd bierze się różnica w wycenie, a nie z ceny przewodu.

**Przykładowy koszt dla 58 m²**

Wymiana pełnej instalacji elektrycznej: 45 punktów × 180 PLN = 8 100 PLN, tablica 2 800 PLN, obwody dedykowane 3 × 500 PLN = 1 500 PLN, pomiary 600 PLN. Razem **13 000 PLN**.

Hydraulika: 6 podejść wodnych × 550 PLN = 3 300 PLN, 4 podejścia kanalizacyjne × 450 PLN = 1 800 PLN, rozprowadzenie i materiał 3 500 PLN. Razem **8 600 PLN**.

Instalacje łącznie: **21 600 PLN** przy kosztorysie całości 92 000 PLN, czyli 23%.

**Kolejność, której nie da się odwrócić**

Elektryka i hydraulika muszą być gotowe i odebrane **przed** tynkami i wylewką. Ogrzewanie podłogowe kładzie się przed wylewką. Wentylacja przed sufitem podwieszanym. Odwrócenie tej kolejności oznacza skuwanie tego, co już zrobione.

Zawsze żądaj protokołu pomiarów elektrycznych i próby ciśnieniowej instalacji wodnej przed zakryciem. To dwie kartki papieru, które przy sporze są warte kilkanaście tysięcy złotych.`,
      checklist: [
        'Sprawdź rok budowy — przed 1995 zakładaj wymianę elektryki domyślnie',
        'Policz potrzebną liczbę punktów, zanim poprosisz o wycenę',
        'Zaplanuj obwody dedykowane dla płyty, piekarnika i klimatyzacji',
        'Zrób instalacje przed tynkami i wylewką, nie po',
        'Zażądaj protokołu pomiarów elektrycznych przed zakryciem',
        'Zażądaj próby ciśnieniowej instalacji wodnej przed zakryciem',
        'Zrób zdjęcia wszystkich przebiegów przed tynkowaniem',
        'Nie dziel wymiany instalacji na etapy — to najdroższy możliwy kompromis',
      ],
      ctaText: 'Policz koszt instalacji w swoim mieszkaniu →',
    },
    {
      slug: 'kosztorys-nowe-mieszkanie-czy-rynek-wtorny',
      img: '/images/new-vs-resale.jpg',
      title: 'Kosztorys: mieszkanie od dewelopera czy z rynku wtórnego — czym się różnią',
      description: 'Dlaczego te same metry kosztują inaczej w stanie deweloperskim i w mieszkaniu z drugiej ręki. Porównanie pozycja po pozycji i różnica w wymaganej rezerwie.',
      cluster: 'property',
      publishedAt: '2027-01-07',
      hook: 'Mieszkanie od dewelopera i mieszkanie z 1985 roku, oba 58 m², oba do pełnego wykończenia. Pierwsze: 78 000 PLN z rezerwą 11%. Drugie: 112 000 PLN z rezerwą 22%. Różnica nie leży tam, gdzie się jej spodziewasz.',
      problem: `Powszechne przekonanie brzmi: mieszkanie od dewelopera jest droższe w wykończeniu, bo trzeba zrobić wszystko od zera. To prawda tylko w połowie.

Owszem, w stanie deweloperskim nie ma niczego — ale też nie ma niczego do usunięcia, nie ma niespodzianek pod warstwami, instalacje są nowe i zgodne z normą, a ściany są w pionie. To trzy całe kategorie kosztów, które w mieszkaniu z rynku wtórnego pojawiają się zawsze.

Poniżej porównanie pozycja po pozycji.`,
      explanation: `**Porównanie kosztorysu, 58 m², standard optymalny**

| Pozycja | Stan deweloperski | Rynek wtórny 1985 |
|---|---|---|
| Prace rozbiórkowe i wywóz | 0-900 PLN | 6 500-11 000 PLN |
| Instalacja elektryczna | 9 000-13 000 PLN | 12 000-18 000 PLN |
| Instalacja hydrauliczna | 5 500-8 500 PLN | 8 000-15 000 PLN |
| Tynki i gładzie | 8 000-12 000 PLN | 11 000-17 000 PLN |
| Wylewki | 5 000-8 000 PLN | 6 000-13 000 PLN |
| Wykończenie i materiały | 42 000-56 000 PLN | 42 000-56 000 PLN |
| **Suma prac** | **70 000-98 000 PLN** | **86 000-130 000 PLN** |
| Rekomendowana rezerwa | 10-12% | 20-25% |

**Co jest droższe w stanie deweloperskim**

**Ilość pracy od zera.** Wszystkie tynki, wszystkie wylewki, cała elektryka i hydraulika w pełnym zakresie — nic nie da się zostawić.

**Rzeczy, których nie ma w ogóle.** Drzwi wewnętrzne, parapety wewnętrzne, czasem grzejniki, oświetlenie, wszystkie okładziny.

**Skala zamówienia materiałów.** Kupujesz wszystko naraz, więc jednorazowy wydatek jest większy, nawet jeśli suma podobna.

**Co jest droższe na rynku wtórnym**

**Rozbiórka i wywóz.** 6 500-11 000 PLN, których w nowym mieszkaniu po prostu nie ma.

**Niespodzianki.** Zawilgocenie, grzyb, spękany jastrych, aluminium w ścianach, nieszczelne piony. To jest powód, dla którego rezerwa rośnie z 11% do 22%.

**Wyrównywanie geometrii.** Ściany w budynkach z wielkiej płyty potrafią odchylać się o 3-5 cm na wysokość kondygnacji. Każdy centymetr wyrównania to materiał i robocizna na całej powierzchni.

**Ograniczenia techniczne.** Piony w ustalonych miejscach, wentylacja grawitacyjna, ograniczona moc przyłącza, zgoda wspólnoty na ingerencje.

**Dwie rzeczy specyficzne dla nowego budownictwa**

**Osiadanie i skurcz.** W pierwszych 12-24 miesiącach po oddaniu budynku pojawiają się mikropęknięcia na łączeniach. Nie jest to wada wykonania, tylko normalna praca konstrukcji — ale warto to uwzględnić przy wyborze wykończenia (elastyczne masy na łączeniach, ostrożnie z wielkoformatowymi płytami na ścianach działowych).

**Wilgotność technologiczna.** Świeże tynki i wylewki oddają wilgoć przez 4-8 tygodni. Położenie parkietu na niewysezonowanej wylewce to najczęstsza kosztowna pomyłka w nowym budownictwie.

**Wniosek praktyczny**

Stan deweloperski jest droższy w pozycji wykończenie i tańszy w pozycji ryzyko. Rynek wtórny odwrotnie. Jeśli porównujesz dwa mieszkania przed zakupem, licz osobno: koszt prac i wymaganą rezerwę. Suma tych dwóch liczb, a nie sama wycena prac, jest tym, co realnie wydasz.`,
      checklist: [
        'Licz osobno koszt prac i wymaganą rezerwę — one różnią się dwukrotnie',
        'W stanie deweloperskim dolicz drzwi, parapety i oświetlenie',
        'Na rynku wtórnym zawsze zakładaj rozbiórkę i wywóz: 6 500-11 000 PLN',
        'Sprawdź rok budowy i typ konstrukcji przed liczeniem tynków',
        'W nowym budynku odczekaj 4-8 tygodni na wyschnięcie wylewek',
        'W wielkiej płycie sprawdź odchylenie ścian od pionu',
        'Zapytaj wspólnotę o zakres dozwolonych ingerencji w instalacje',
        'Przy zakupie porównuj mieszkania po sumie: cena plus remont plus rezerwa',
      ],
      ctaText: 'Porównaj kosztorys dla obu wariantów →',
    },
    {
      slug: 'remont-etapami-jak-podzielic',
      img: '/images/phased-renovation.jpg',
      title: 'Remont etapami — jak podzielić prace i ile to realnie kosztuje',
      description: 'Kiedy dzielenie remontu na etapy ma sens, czego nie wolno dzielić nigdy i ile kosztuje ponowne wejście ekipy. Z przykładowym podziałem mieszkania 58 m² na trzy etapy.',
      cluster: 'budget',
      publishedAt: '2027-01-21',
      hook: 'Podział remontu na etapy nie jest oszczędnością — jest przesunięciem wydatku w czasie za dopłatą 12-20%. Ale w niektórych sytuacjach to i tak najlepsza z dostępnych decyzji.',
      problem: `Najczęstszy powód dzielenia remontu na etapy jest prosty: budżetu starcza na połowę zakresu. Drugi powód: nie ma gdzie mieszkać przez trzy miesiące.

Oba są całkowicie sensowne. Problem zaczyna się wtedy, gdy granica między etapami przebiega w złym miejscu — i wtedy drugi etap zaczyna się od zniszczenia części pierwszego.

Podział jest bezpieczny tylko wzdłuż linii, których nie przecinają instalacje i warstwy podłogowe.`,
      explanation: `**Ile kosztuje sam podział**

Każde ponowne wejście ekipy to koszt mobilizacji: transport sprzętu, ponowne zabezpieczenie części mieszkania, ponowne przygotowanie stanowiska, ponowne uruchomienie zamówień materiałowych.

| Pozycja | Koszt drugiego wejścia |
|---|---|
| Mobilizacja ekipy | 800-2 500 PLN |
| Ponowne zabezpieczenie | 300-800 PLN |
| Nowe zamówienie materiałów | +5-10% ceny materiału |
| Wzrost stawek rok do roku | +12-18% na etapie po roku |
| Ponowne sprzątanie | 300-700 PLN |

W praktyce podział na dwa etapy w odstępie roku podnosi całkowity koszt o **12-20%**.

**Czego nie wolno dzielić — nigdy**

**Instalacji elektrycznej i hydraulicznej.** Robi się je w całym mieszkaniu naraz albo wcale. Dokładanie obwodu za rok oznacza skucie tynku i płytek w pomieszczeniach już wykończonych.

**Wylewek na jednym poziomie.** Wylewka wylana w dwóch terminach ma szew, różnicę wysokości i różny czas sezonowania. Podłoga przechodząca przez próg będzie się różnić.

**Pomieszczeń mokrych połączonych instalacyjnie.** Łazienka i kuchnia dzielące pion muszą być zrobione razem — inaczej płacisz dwa razy za dostęp do tego samego pionu.

**Tynków na ścianach wspólnych.** Ściana między salonem a sypialnią otynkowana w dwóch etapach będzie miała widoczne przejście.

**Gdzie przebiega bezpieczna granica**

Wzdłuż drzwi zamykanego pomieszczenia, które nie dzieli z resztą ani pionu, ani wylewki na tym samym poziomie. Praktycznie oznacza to: sypialnie, gabinet, pokój dziecięcy — tak. Łazienka, kuchnia, korytarz — nie.

**Przykładowy podział mieszkania 58 m²**

**Etap 1 (obowiązkowy, 2-3 miesiące) — 62 000 PLN.** Cała elektryka i hydraulika w mieszkaniu, wszystkie wylewki, tynki w całości, pełne wykończenie łazienki, kuchni i korytarza. To jest część, której nie da się rozbić.

**Etap 2 (po 8-14 miesiącach) — 21 000 PLN.** Salon: podłoga, malowanie, oświetlenie, drzwi.

**Etap 3 (po kolejnych 6-12 miesiącach) — 17 000 PLN.** Dwie sypialnie: podłogi, malowanie, drzwi, szafy.

Suma etapów: 100 000 PLN wobec 87 000 PLN przy remoncie jednorazowym. Dopłata za rozłożenie w czasie: **13 000 PLN**.

**Jak mieszkać w trakcie**

Jeśli mieszkasz w mieszkaniu podczas etapu 2 lub 3, dolicz: zabezpieczenie pyłowe z folii z zamkiem (150-400 PLN), przenośną kuchnię, sprzątanie codzienne. I przyjmij, że etap trwa 1,5 raza dłużej niż w pustym mieszkaniu — ekipa pracuje wolniej, gdy musi codziennie zamykać stanowisko.

**Kiedy podział naprawdę się opłaca**

Gdy alternatywą jest kredyt na brakującą kwotę. Przy oprocentowaniu powyżej 8% koszt kredytu na 25 000 PLN przez trzy lata przekracza dopłatę za etapowanie. Wtedy rozłożenie w czasie jest po prostu tańszym finansowaniem.`,
      checklist: [
        'Zrób całą elektrykę i hydraulikę w etapie pierwszym, bez wyjątku',
        'Nie dziel wylewki na jednym poziomie między etapy',
        'Łazienkę i kuchnię dzielące pion rób w tym samym etapie',
        'Granicę etapu prowadź wzdłuż drzwi zamykanego pomieszczenia',
        'Dolicz 12-20% do całości za rozłożenie remontu w czasie',
        'Zarezerwuj 800-2 500 PLN na każdą ponowną mobilizację ekipy',
        'Przy mieszkaniu w trakcie prac dodaj 50% do czasu trwania etapu',
        'Porównaj dopłatę za etapowanie z kosztem kredytu na całość',
      ],
      ctaText: 'Policz kosztorys dla każdego etapu →',
    },
    {
      slug: 'koszt-remontu-kuchni-2027',
      img: '/images/kitchen-renovation.jpg',
      title: 'Koszt remontu kuchni 2027 — ile kosztuje m² i co składa się na cenę',
      description: 'Aktualne ceny remontu kuchni w Polsce. Widełki dla trzech standardów, rozbicie na instalacje, wentylację, fartuch i wykończenie — bez mebli i sprzętu.',
      cluster: 'rooms',
      publishedAt: '2027-02-04',
      hook: 'Kuchnia 10 m² potrafi kosztować tyle, co salon 25 m². Nie dlatego, że jest ładniejsza — tylko dlatego, że na tych dziesięciu metrach spotykają się cztery branże jednocześnie.',
      problem: `Kuchnia jest po łazience drugim najdroższym pomieszczeniem w przeliczeniu na metr kwadratowy. Powód jest techniczny, nie estetyczny.

Na małej powierzchni musisz zmieścić: obwody dedykowane dla płyty i piekarnika, podejścia wodne i kanalizacyjne dla zlewu i zmywarki, wentylację mechaniczną dla okapu, wodoodporne wykończenie strefy roboczej i podłogę odporną na obciążenie zabudowy.

Każda z tych rzeczy to osobna ekipa i osobny etap, a wszystkie muszą być gotowe zanim przyjedzie zabudowa meblowa — której już nie da się przesunąć.`,
      explanation: `**Ceny remontu kuchni 2027 — bez mebli i sprzętu**

**Standard ekonomiczny — 700-1 300 PLN/m²**
Zachowanie istniejącego układu instalacji, malowanie ścian, fartuch z płytek podstawowych, panele winylowe lub gres w niższej półce, wymiana punktów elektrycznych bez nowych obwodów. Kuchnia 10 m²: **7 000-13 000 PLN**.

**Standard optymalny — 1 400-2 400 PLN/m²**
Nowe obwody dedykowane, przeniesienie podejść wodnych w obrębie pomieszczenia, wentylacja mechaniczna z odprowadzeniem, fartuch z gresu lub szkła, gres na podłodze, gładzie na ścianach. Kuchnia 10 m²: **14 000-24 000 PLN**.

**Standard premium — 2 600-4 500 PLN/m²**
Pełna wymiana instalacji, przeniesienie pionu lub zmiana układu, płyty wielkoformatowe na fartuchu i podłodze, oświetlenie wielostrefowe z LED, ogrzewanie podłogowe, wentylacja z rekuperacją. Kuchnia 10 m²: **26 000-45 000 PLN**.

**Co kryje się w tych kwotach — rozbicie dla 10 m², standard optymalny**

| Pozycja | Koszt |
|---|---|
| Demontaż starej kuchni i okładzin | 1 200-2 400 PLN |
| Elektryka: 16 punktów + 3 obwody dedykowane | 4 400-6 800 PLN |
| Hydraulika: zlew, zmywarka, ewentualnie pralka | 1 800-3 200 PLN |
| Wentylacja mechaniczna z kanałem | 900-2 200 PLN |
| Tynki, gładzie, malowanie | 2 200-3 600 PLN |
| Fartuch (materiał + robocizna) | 1 400-3 400 PLN |
| Podłoga gres z wylewką wyrównawczą | 2 400-4 200 PLN |
| **Razem** | **14 300-25 800 PLN** |

**Czego nie ma w tych liczbach**

Zabudowa meblowa 12 000-60 000 PLN, sprzęt AGD 6 000-35 000 PLN, blat 1 500-14 000 PLN zależnie od materiału (laminat, kompozyt, spiek kwarcowy), zlew i bateria 800-4 500 PLN. Realny budżet kuchni pod klucz to zwykle **2,5-3 razy** koszt samych prac remontowych.

**Cztery błędy, które kosztują najwięcej**

**1. Zamówienie mebli przed wykończeniem ścian.** Zabudowa mierzona na nieotynkowanej ścianie nie pasuje po tynkowaniu. Kolejność: instalacje, tynki, podłoga, dopiero pomiar do zabudowy.

**2. Brak obwodów dedykowanych.** Płyta indukcyjna, piekarnik i zmywarka na jednym obwodzie to wyzwalanie zabezpieczenia przy pierwszym obiedzie. Dołożenie obwodu po wykończeniu: 1 200-2 800 PLN zamiast 500 PLN.

**3. Okap bez odprowadzenia.** Okap z filtrem węglowym nie usuwa wilgoci, tylko zapach. W kuchni bez okna to prosta droga do zawilgocenia zabudowy.

**4. Fartuch położony po montażu zabudowy.** Wtedy nie da się doprowadzić płytki do końca i pojawia się widoczna szczelina za szafkami.

**Kolejność, która działa**

Demontaż → instalacje elektryczne i wodne → wentylacja → tynki → wylewka i podłoga → fartuch → pomiar zabudowy → montaż mebli → podłączenie sprzętu → silikony i listwy.`,
      checklist: [
        'Zaplanuj obwody dedykowane dla płyty, piekarnika i zmywarki',
        'Zapewnij okapowi odprowadzenie na zewnątrz, nie filtr węglowy',
        'Zrób fartuch przed montażem zabudowy, nie po',
        'Zmierz do zabudowy dopiero po tynkach i podłodze',
        'Policz budżet mebli i AGD osobno — to 2,5-3 razy koszt prac',
        'Sprawdź nośność podłogi pod ciężką zabudowę i blat kamienny',
        'Zaplanuj oświetlenie strefy roboczej przed zamknięciem sufitu',
        'Zostaw dostęp serwisowy do zaworów i podejść za zabudową',
      ],
      ctaText: 'Policz kosztorys remontu kuchni →',
    },
    {
      slug: 'odbior-prac-remontowych',
      img: '/images/work-acceptance.jpg',
      title: 'Odbiór prac remontowych — co sprawdzić na każdym etapie',
      description: 'Trzy odbiory, które musisz przeprowadzić: instalacji przed zakryciem, stanu surowego i końcowy. Dopuszczalne odchyłki, narzędzia i powiązanie płatności z etapami.',
      cluster: 'contractors',
      publishedAt: '2027-02-18',
      hook: 'Odbiór końcowy to najgorszy moment na wykrycie błędu w instalacji. Wtedy jest już pod tynkiem, pod wylewką i pod płytkami — a Ty masz do zapłaty ostatnią transzę i żadnej dźwigni.',
      problem: `Większość umów remontowych przewiduje jeden odbiór: na końcu. To wygodne dla wykonawcy i kosztowne dla inwestora, bo do tego momentu wszystko, co można było zrobić źle, zdążyło zostać zakryte.

Rzetelny remont ma trzy odbiory, a każdy z nich odblokowuje kolejną transzę płatności. To jedyny mechanizm, który daje Ci realny wpływ na jakość, gdy prace jeszcze trwają.`,
      explanation: `**Odbiór 1 — instalacje przed zakryciem (odblokowuje 25-30% płatności)**

Moment: elektryka i hydraulika ułożone, jeszcze nie otynkowane.

Co sprawdzasz:
- protokół pomiarów elektrycznych: ciągłość przewodów ochronnych, rezystancja izolacji, działanie wyłącznika różnicowoprądowego,
- protokół próby ciśnieniowej instalacji wodnej (min. 24 h bez spadku),
- zgodność liczby i rozmieszczenia punktów z ustaleniami,
- przekroje przewodów: 1,5 mm² oświetlenie, 2,5 mm² gniazda, 4-6 mm² obwody dedykowane,
- zdjęcia wszystkich przebiegów z miarką w kadrze.

Te zdjęcia będą Ci potrzebne za pięć lat, gdy ktoś będzie wiercił w ścianie.

**Odbiór 2 — stan surowy (odblokowuje kolejne 30-35%)**

Moment: tynki i wylewki gotowe, przed układaniem okładzin.

Dopuszczalne odchyłki według norm budowlanych:

| Element | Dopuszczalna odchyłka |
|---|---|
| Ściana od pionu | 3 mm na 1 m, max 10 mm na kondygnację |
| Powierzchnia tynku | 3 mm pod łatą 2 m |
| Wylewka od poziomu | 5 mm na 2 m |
| Naroże od kąta prostego | 3 mm na 1 m |

Narzędzia: poziomica 2 m, łata 2 m z klinem pomiarowym, kątownik, wilgotnościomierz do wylewki. Komplet kosztuje 250-450 PLN i zwraca się przy pierwszej wykrytej usterce.

**Odbiór 3 — końcowy (odblokowuje ostatnie 10-15%)**

Moment: wszystko gotowe, przed podpisaniem protokołu końcowego.

Co sprawdzasz: równość okładzin i szerokość fug, działanie każdego punktu elektrycznego pod obciążeniem, szczelność wszystkich podejść po 24 h użytkowania, otwieranie i domykanie każdych drzwi i okna, spadki w brodziku i przy wpustach, kompletność silikonów i listew.

**Jak powiązać płatności z odbiorami**

| Etap | Transza |
|---|---|
| Zaliczka na start | 20-25% |
| Odbiór instalacji przed zakryciem | 25-30% |
| Odbiór stanu surowego | 30-35% |
| Odbiór końcowy | 10-15% |
| Po okresie usterkowym (30 dni) | 5% |

Ostatnie 5% zatrzymane przez 30 dni po odbiorze to najskuteczniejszy zapis w całej umowie. Większość usterek montażowych ujawnia się w pierwszym miesiącu użytkowania, a zatrzymana kwota sprawia, że wykonawca wraca je poprawić.

**Protokół odbioru — co musi zawierać**

Datę, listę odebranych prac, listę usterek z terminem usunięcia, podpisy obu stron i zdjęcia. Protokół bez listy usterek oznacza odbiór bezusterkowy — i utratę podstawy do reklamacji rzeczy, które widziałeś, ale nie zapisałeś.`,
      checklist: [
        'Zaplanuj trzy odbiory w umowie, nie jeden na końcu',
        'Nie pozwól zakryć instalacji bez protokołu pomiarów i próby ciśnieniowej',
        'Zrób zdjęcia wszystkich przebiegów instalacji z miarką w kadrze',
        'Kup poziomicę i łatę 2 m — komplet za 250-450 PLN',
        'Sprawdź odchyłki: 3 mm pod łatą 2 m dla tynku, 5 mm na 2 m dla wylewki',
        'Powiąż każdą transzę z konkretnym odbiorem, nie z upływem czasu',
        'Zatrzymaj 5% płatności na 30 dni po odbiorze końcowym',
        'W protokole zapisz wszystkie usterki z terminem ich usunięcia',
      ],
      ctaText: 'Przygotuj się do remontu z pełnym kosztorysem →',
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
    {
      slug: 'how-to-calculate-renovation-estimate',
      img: '/images/estimate-method.jpg',
      title: 'How to calculate a renovation estimate step by step — a 7-step method',
      description: 'A practical method for costing a renovation: measurements, scope, standard, services, materials, labour and contingency — with real 2026 market rates.',
      cluster: 'budget',
      publishedAt: '2026-09-17',
      hook: 'An estimate is not one number multiplied by square metres. It is seven separate decisions, each of which moves the budget by tens of thousands — and all of them can be made at a table, before anybody sets foot on site.',
      problem: `The most common mistake in costing a renovation is starting from a price per square metre. A rate of 2,200 PLN/m² looks concrete, but it does not say whether it covers rewiring, which tiles, or even whether labour is included.

The result: the number looks tidy and reality lands 30-50% away from it. Not because the rate was wrong, but because nobody knew what it covered.

A correct estimate is built the other way round: from scope to price, never from price to scope.`,
      explanation: `**Step 1 — measure every room separately**

Write down length, width and height for each room. From that you get the three different areas you will need: floor (length × width), walls (perimeter × height minus openings) and ceiling. The area on the deed is not enough — painting a 60 m² flat means 170-200 m² of wall and ceiling.

**Step 2 — decide the scope room by room**

For each room answer: refresh, partial or full renovation? The gap is enormous. Refreshing a 20 m² living room is 6,000-11,000 PLN. A full renovation of the same room with new floors and services is 24,000-42,000 PLN.

**Step 3 — fix the finish standard**

Budget, standard or premium. That is a multiplier of 0.75 to 1.8 across the whole estimate. It does not have to be uniform: a premium bathroom with budget-standard bedrooms is the most common sensible compromise.

**Step 4 — assess the services**

The line most often skipped. Rewiring a 60 m² flat is 9,000-18,000 PLN; replumbing 6,000-15,000 PLN. In buildings from before 1995, assume replacement by default rather than as an option.

**Step 5 — cost materials with a waste allowance**

Add technical waste to every measured quantity: tiles 10-15% (diagonal or herringbone up to 20%), laminate and board 7-10%, paint 10%, adhesive and grout per the manufacturer coverage. Materials are usually 45-60% of the budget.

**Step 6 — apply your city labour rate**

The base is Poznań. Warsaw ×1.25, Tricity ×1.15, Kraków and Wrocław ×1.10, Łódź ×0.92. Labour is 35-45% of the budget and it is the part that varies most between cities.

**Step 7 — add contingency**

15% for a flat in good condition, 20-25% for a building from before 1990 or when you do not know what is under the old layers. Contingency is not a luxury fund — it is a line that actually gets spent.

**The method assembled**

58 m², Kraków, standard finish, 1998 building, full rewire:
prep and strip-out 7,200 PLN, services 16,500 PLN, plaster and screeds 12,800 PLN, finishes 31,400 PLN, finishing materials 24,900 PLN. Total 92,800 PLN, plus 18% contingency = **109,500 PLN**.

The same area in Łódź at budget standard: roughly 61,000 PLN. The difference does not come from the square metres — it comes from the decisions in steps 2, 3 and 4.`,
      checklist: [
        'Measure every room: length, width, height, windows, doors',
        'Write out three areas: floor, walls, ceiling — you need them separately',
        'Decide the scope for each room on its own',
        'Fix the finish standard — a 0.75-1.8 multiplier on the whole job',
        'Check the build year and the state of the services before costing anything',
        'Add technical waste to every material (10-20%)',
        'Apply your city multiplier to labour',
        'Add 15-25% contingency depending on the age of the building',
      ],
      ctaText: 'Build your estimate in 5 minutes →',
    },
    {
      slug: 'what-drives-renovation-cost',
      img: '/images/cost-factors.jpg',
      title: 'What drives renovation cost — the 9 factors that actually set the price',
      description: 'Why the same floor area costs 55,000 or 140,000 PLN. Nine factors that really decide a renovation price, ranked by how hard they push the final bill.',
      cluster: 'budget',
      publishedAt: '2026-10-01',
      hook: 'Two 60 m² flats, both in Warsaw, both renovated the same month. One came to 58,000 PLN, the other to 141,000 PLN. Floor area explains none of that gap.',
      problem: `The question how much does a 60 m² renovation cost has no answer, because area is one of the weakest price drivers there is. Square metres say how much there is to do — not what, and not how.

That is why two contractor quotes can differ twofold and both be honest: each assumed a different scope, a different standard and a different starting condition.

Below are nine factors ranked by how hard they move the final bill.`,
      explanation: `**1. Scope of work — up to ×4**

The strongest factor by far. A refresh (paint, minor repairs) is 350-700 PLN/m². A full renovation with new services, screeds and every layer replaced is 2,000-4,500 PLN/m². That is not a difference of standard — it is a difference in what you are doing at all.

**2. Finish standard — up to ×2.4**

Budget, standard, premium. A 45 PLN/m² porcelain tile and a 340 PLN/m² large-format slab sit on the same floor and need different labour. Standard multiplies materials and labour at the same time, which is why it compounds faster than expected.

**3. Condition of services and age of the building — up to +35%**

A 1960s-80s block: aluminium wiring, steel pipes, no earthing, slabs of unknown capacity. Replacing services in such a flat is 15,000-33,000 PLN that simply does not exist in a 2015 building.

**4. City — up to +36%**

2026 labour multipliers: Warsaw ×1.25, Tricity ×1.15, Kraków ×1.12, Wrocław ×1.10, Poznań ×1.00, Łódź ×0.92. Material prices are similar nationwide — labour makes the whole difference.

**5. Number of rooms at the same area — up to +25%**

60 m² split into 4 rooms costs more than 60 m² open-plan: more wall surface, more doors, more corners, more electrical points. Same metres, more work.

**6. Share of bathrooms and kitchen — up to +30%**

These are the most expensive square metres in any flat: plumbing, ventilation, waterproofing, ceramics. A two-bathroom flat is materially more expensive than a one-bathroom flat of identical area.

**7. Layout changes — up to +20%**

Knocking out a wall is not just demolition: it is a structural opinion (for load-bearing walls), a lintel, relocated services, new screed where the wall stood and ceiling making-good.

**8. Timing — up to +15%**

Renovating in season (March-October) costs more and crews are harder to book. The same scope in January is often 8-15% cheaper, because crews have gaps in the schedule.

**9. Who buys the materials — up to +12%**

Materials bought through the contractor usually carry a 10-20% margin, but the contractor owns shortfalls and cutting waste. Buying yourself is cheaper, but the risk of a wrong quantity moves to you.

**How to use this**

Start with factors 1-3 — they account for roughly 70% of the spread in prices. Only then tune the rest. Optimising the standard while the scope is undefined is choosing trim before the walls exist.`,
      checklist: [
        'Define the scope before asking about price — that is factor one',
        'Set the standard separately for each room',
        'Check build year and service condition — up to +35% of budget',
        'Apply the city multiplier to labour, not to materials',
        'Count rooms and corners, not only square metres',
        'Cost bathrooms and the kitchen separately — the priciest metres',
        'Consider an off-season start: 8-15% saving',
        'Decide who buys materials and put it in the contract',
      ],
      ctaText: 'See what your scope costs →',
    },
    {
      slug: 'hidden-renovation-costs',
      img: '/images/hidden-costs.jpg',
      title: 'Hidden renovation costs — 14 lines that never appear in the quote',
      description: 'Debris removal, skips, power, furniture storage, temporary accommodation, snagging and finishing after the crew. The full list of costs that land outside the estimate.',
      cluster: 'budget',
      publishedAt: '2026-10-15',
      hook: 'The quote said 84,000 PLN. The account showed 112,000 PLN. The gap was not a hidden contractor margin — it was fourteen lines nobody costed, because none of them is labour or a finishing material.',
      problem: `A contractor quote describes building work. A renovation is a great deal more than building work — and the rest comes out of the same wallet.

These lines share one trait: each looks trivial on its own. 900 PLN for a skip, 400 PLN for furniture storage, 1,200 PLN for an internal door you forgot about. Added up they usually come to 18-30% of the quoted value.

Here is the full list, ordered by how often each is missed.`,
      explanation: `**Around the site**

**1. Debris removal and skip** — 800-2,600 PLN. A 5 m³ skip in Warsaw is around 900 PLN, and a full flat renovation often needs two. Add carrying rubble down if there is no service lift.

**2. Protecting the untouched part of the flat** — 300-900 PLN. Sheeting, tape, floor protection boards in the hallway and stairwell.

**3. Building management consent and deposit** — 0-2,000 PLN. Many buildings charge a deposit for use of the lift and common stairs.

**4. Power and water during the works** — 200-700 PLN. More on a full renovation with drying and forced-air heating.

**Around you**

**5. Temporary accommodation** — 0-14,000 PLN. A full renovation means 2-3 months out of the flat. The single most under-counted line on this list.

**6. Furniture storage** — 300-1,800 PLN. Self-storage, 8-14 m³ for 2-3 months.

**7. Transport and moving** — 600-2,500 PLN, counting both directions.

**Part of the renovation, absent from the quote**

**8. Internal doors with fitting** — 900-2,600 PLN each. Across four rooms that is 4,000-10,000 PLN.

**9. Lighting and electrical fittings** — 2,000-9,000 PLN. Fixtures, sockets, switches, LED strips with drivers.

**10. Sanitaryware and fittings** — 3,000-25,000 PLN. Taps, WC, basin, shower or bath. Almost always outside a labour quote.

**11. Curtain rails, blinds, insect screens** — 800-4,500 PLN.

**12. Post-renovation cleaning** — 400-1,400 PLN. Construction dust needs three passes, not one.

**After completion**

**13. Snagging and defects** — 500-3,000 PLN. Even with a good crew, some defects only surface after a month of use.

**14. Finishing after the crew** — 1,000-5,000 PLN. Silicone, skirting, thresholds, door adjustment, touch-up paint.

**What it comes to**

For a 58 m² flat at standard finish against an 84,000 PLN quote, these lines realistically run **16,000-31,000 PLN**. Even the lean version, with no temporary accommodation, comes to about 12,000 PLN.

Which is why a 15-20% contingency is not caution — it is simply the rest of the renovation, costed properly.`,
      checklist: [
        'Put the skip and debris removal in the budget — 800-2,600 PLN',
        'Cost temporary accommodation for 2-3 months',
        'Add furniture storage and transport both ways',
        'Cost internal doors separately — 900-2,600 PLN each',
        'Budget for sanitaryware, fittings and lighting',
        'Check whether the building charges a deposit for lift and stairs',
        'Set aside 400-1,400 PLN for post-renovation cleaning',
        'Leave 1,000-5,000 PLN for snagging and finishing after the crew',
      ],
      ctaText: 'Build an estimate with the full budget →',
    },
    {
      slug: 'contractor-estimating-mistakes',
      img: '/images/contractor-estimate-errors.jpg',
      title: 'Contractor estimating mistakes — why the quote misses by 30%',
      description: 'Why renovation crew quotes drift away from reality so consistently. Ten mechanisms that push a contractor estimate too low, and the questions that expose them.',
      cluster: 'contractors',
      publishedAt: '2026-10-29',
      hook: 'A contractor is not lying when they quote 84,000 PLN and finish at 112,000 PLN. They really did calculate it that way. The problem is how they calculated it — and that is something you can check in fifteen minutes.',
      problem: `A renovation crew is a building team, not a quantity surveying practice. People who lay tiles brilliantly rarely have the tools or the time for a rigorous take-off. The quote gets written between two jobs, usually in the evening, off the back of a twenty-minute visit.

This is not bad faith. It is a structural feature of the market: quoting is a cost the contractor absorbs, not a service anyone pays for. The faster it is done, the better for them.

Below are ten mechanisms that make such a quote systematically come out low.`,
      explanation: `**1. Estimating by eye, with no take-off**

The visit lasts 20 minutes, the contractor walks through and gauges. No height measured, no wall perimeter counted, no corners tallied. The measurement error alone is typically 10-18%.

**2. Anchoring on the last job**

The last 55 m² flat came to 78,000 PLN, so this 58 m² one gets 82,000 PLN. The area is similar, but the build year, the state of the services and the layout may be nothing alike.

**3. Nobody looks under the old layers**

Under the tiles there may be a damp screed, under the laminate a cracked subfloor, in the wall aluminium cable. Until the strip-out starts this is guesswork — and the guess runs optimistic.

**4. Costing by floor area when the work is on the walls**

The classic. A 60 m² flat has 170-200 m² of wall and ceiling. Quoting against 60 m² understates painting, plastering and priming by an order of magnitude.

**5. Deliberate under-quoting to win the job**

The contractor knows the client will compare three numbers and take the lowest. Extras arrive later, once switching crews has become practically impossible.

**6. No logistics in the quote**

Fourth floor without a lift, narrow stairwell, no parking at the entrance, nowhere to put a skip. Each of these adds a real 4-9% to labour — and almost never appears in the quote.

**7. Prep and clean-up left outside the quote**

Strip-out, sheeting, carrying rubble down, cleaning between stages. On a 60 m² flat that is 4,000-11,000 PLN of work that somebody will do anyway and somebody will pay for anyway.

**8. Materials with no waste allowance**

Tiles costed to the exact square metres of the room, with no 10-15% for cuts. The missing tiles get bought from a different batch, in a different shade — and then the rework cost arrives too.

**9. A March quote used in September**

Quotes are usually valid 14-30 days, but renovations start 2-4 months after the conversation. With rates rising 12-18% a year, that alone is a 3-6% difference.

**10. No contingency line**

A proper estimate has a contingency line. A sales quote does not, because it would raise the number at the bottom of the page — and that number is what wins the job.

**Five questions that expose all ten**

1. What wall area did you calculate? (if the answer is 60 m², go back to point 4)
2. What happens if the screed under the tiles turns out to be damp?
3. Are debris removal and the skip in the price?
4. What waste percentage did you allow on the tiles?
5. How long is this quote valid?

A contractor who answers all five concretely has costed properly. A contractor who brushes off three of them has yet to start costing — at your expense.`,
      checklist: [
        'Ask what wall area was calculated, not floor area',
        'Check whether the contractor measured at all or gauged by eye',
        'Agree in writing what happens when something is found under old layers',
        'Confirm debris removal and the skip are in the price',
        'Ask what waste percentage was allowed on materials',
        'Check the quote validity date against your planned start',
        'Describe the logistics: floor, lift, parking',
        'Ask for a contingency line — its absence is a warning sign',
      ],
      ctaText: 'Compare a crew quote with an independent estimate →',
    },
    {
      slug: 'measuring-and-material-waste-allowance',
      img: '/images/measuring-materials.jpg',
      title: 'Measuring and waste allowance — costing materials so nothing runs short',
      description: 'How to measure a room correctly and how much technical waste to allow on tiles, laminate, paint and adhesives. With a worked example for a 6 m² bathroom.',
      cluster: 'materials',
      publishedAt: '2026-11-12',
      hook: 'Eight tiles short. The replacements come from a different batch in a different shade, so the whole wall has to come off. The cost of that one measurement error: 2,400 PLN and four days of delay.',
      problem: `Measuring looks like the simplest part of an estimate — you measure and you multiply. In practice it is where most of the expensive mistakes are made, because every material is counted in a different unit with a different allowance.

The three most common errors: costing everything against floor area, skipping the waste allowance, and deducting windows and doors where they should not be deducted.`,
      explanation: `**The three areas you need**

**Floor** = length × width. Against it you cost: screed, laminate, porcelain, insulation, underfloor heating.

**Walls** = perimeter × height. Against it you cost: plaster, skim, paint, wallpaper, wall tiles. Perimeter is 2 × (length + width).

**Developed area** = walls + ceiling. Against it you cost painting and priming. For a 60 m² flat that is usually 170-200 m².

**When to deduct windows and doors**

For paint and plaster, deduct openings above 2 m². For tiles, deduct nothing below 1 m² — the cuts around a small opening consume the material anyway. For laminate, deduct neither thresholds nor recesses.

**Technical waste allowance — the table**

| Material | Simple layout | Difficult layout |
|---|---|---|
| Tiles, porcelain | 10% | 15-20% (diagonal, herringbone) |
| Large-format slabs | 12% | 20-25% |
| Laminate, board | 7% | 10-12% (angled, herringbone) |
| Patterned wallpaper | 15% | 20% (large pattern repeat) |
| Paint | 10% | 15% (strong colour change) |
| Trims, skirting | 8% | 10% |

**Materials costed by coverage, not by area**

Tile adhesive: 3-6 kg/m² depending on format and trowel. Primer: 0.1-0.2 l/m². Grout: 0.3-1.2 kg/m² depending on joint width and tile format. Always check the coverage on the packaging — differences between manufacturers reach 40%.

**Worked example: a 6 m² bathroom**

2.0 × 3.0 m, height 2.6 m. Tiles on the floor and on the walls up to the ceiling.

Floor: 2.0 × 3.0 = 6.0 m². Plus 10% = **6.6 m²**.
Walls: perimeter 2 × (2.0 + 3.0) = 10 m; 10 × 2.6 = 26.0 m². Deduct the 1.7 m² door, no window. 24.3 m², plus 12% = **27.2 m²**.
Total tiles: 33.8 m². You buy whole packs, so realistically 34-35 m².
Adhesive: 34 × 4.5 kg = **153 kg** (seven 25 kg bags).
Grout: 34 × 0.6 = **20.4 kg**.

**The rule that saves the most**

Buy the whole quantity from a single production batch at once. The batch number is on the packaging. Buying two more square metres a month later almost always means a different shade — and relaying a whole surface instead of adding two metres.`,
      checklist: [
        'Calculate three areas separately: floor, walls, developed',
        'Deduct openings only above 2 m², and only for paint and plaster',
        'Add waste by layout: simple 10%, herringbone or diagonal 15-20%',
        'Check adhesive, primer and grout coverage on the manufacturer packaging',
        'Order whole packs, rounding up',
        'Buy the entire quantity from one production batch',
        'Record the batch number for claims or top-ups',
        'Keep 2-3 m² of tiles in storage for future repairs',
      ],
      ctaText: 'Cost the materials for your flat →',
    },
    {
      slug: 'renovation-budget-contingency',
      img: '/images/budget-reserve.jpg',
      title: 'Renovation contingency — how much to set aside and where it actually goes',
      description: 'What percentage of contingency to plan by age of building, what that money is really spent on, and how to manage it so it does not run out halfway through.',
      cluster: 'budget',
      publishedAt: '2026-11-26',
      hook: 'Contingency is not a fund for luxuries you have not chosen yet. It is a line that gets spent in full in four renovations out of five — and almost always on things nobody could see before the strip-out.',
      problem: `The most common approach to contingency is: I will add 10%, just in case. That is too little and in the wrong place.

Too little, because the median budget overrun on the Polish market is 18-24%. In the wrong place, because a contingency tacked on at the end gets treated as an upgrade buffer — better tiles, a nicer tap — and disappears before the real problem shows up.

Contingency is a line of the estimate, not a rounding-up.`,
      explanation: `**How much to allow — by age of building and scope**

| Situation | Contingency |
|---|---|
| Developer-state flat, shell finish | 10-12% |
| Post-2010 building, partial renovation | 12-15% |
| 1995-2010 building, full renovation | 15-18% |
| 1970-1995 building | 20-25% |
| Pre-1970 building or tenement | 25-35% |
| Layout change involving load-bearing walls | +5% on the above |

**Where it really goes — market data**

**Discoveries under old layers (35-45% of contingency used).** Damp screed, cracked subfloor, mould behind boxing-in, old insulation with no vapour barrier.

**Services worse than assumed (20-30%).** Aluminium instead of copper, no earthing, scaled steel pipes, leaking connections.

**Structural irregularity (10-15%).** Walls out of plumb by 3-5 cm over their height, sloping floors, ceilings at varying heights. Every centimetre of levelling is material and labour.

**Decisions changed mid-works (10-15%).** The only part you fully control.

**Delays and downtime (5-10%).** A longer stay in temporary accommodation, repeat transport, re-mobilising the crew.

**How to manage contingency so it lasts**

**Rule one: do not touch it before 60% completion.** Most expensive discoveries surface in the first half of a renovation — during strip-out and services. If the contingency is untouched at that point, the risk drops sharply from there.

**Rule two: an upgrade is not contingency.** Want more expensive tiles? That is a change of standard, funded by a separate decision, not from the unforeseen line.

**Rule three: log every draw.** Date, amount, reason, photo. That is documentation in a dispute with the contractor and real control over what is left.

**Rule four: unused contingency is not savings to spend at the end.** In about 20% of renovations it genuinely remains. That is then a furnishing budget — but after final handover, not halfway through.

**What it looks like in numbers**

58 m² flat, 1978 building, full renovation, works estimate 92,000 PLN. Contingency at 22% = 20,240 PLN. Real budget: **112,240 PLN**. That is the number you give the bank and the number you secure — not 92,000 PLN.`,
      checklist: [
        'Match the contingency percentage to the age of the building, not to your optimism',
        'Enter contingency as its own estimate line, not as rounding',
        'Do not draw on it before 60% completion',
        'Fund standard upgrades separately — those are not unforeseen',
        'Log every draw: date, amount, reason, photo',
        'Add 5% on top for a layout change involving load-bearing walls',
        'Give the bank the figure including contingency, not the works quote alone',
        'Spend leftover contingency only after final handover',
      ],
      ctaText: 'Build an estimate with contingency included →',
    },
    {
      slug: 'renovation-prep-and-strip-out-costs',
      img: '/images/prep-works.jpg',
      title: 'Prep and strip-out works — the 8-14% of the budget nobody costs',
      description: 'Demolition, debris removal, protecting the flat and cleaning between stages. What it really costs, how to calculate rubble volume, and why this line vanishes from quotes.',
      cluster: 'budget',
      publishedAt: '2026-12-10',
      hook: 'Before anyone lays the first tile, the flat has to be stripped, carried out, hauled away and sheeted off. That is 8-14% of the budget and about two weeks of programme — a line that appears in no renovation photograph.',
      problem: `Preparation works have bad luck: they leave nothing behind worth showing. Nobody photographs an empty flat after strip-out. So the stage disappears from renovation conversations and appears in quotes either as one vague line or not at all.

Meanwhile it generates real costs, needs equipment and people, and cannot be skipped. On a 60 m² flat we are talking about 4,000-11,000 PLN.`,
      explanation: `**What the stage consists of**

**Stripping finishes** — removing tiles 28-55 PLN/m², lifting laminate 12-22 PLN/m², stripping wallpaper 10-18 PLN/m², hacking off plaster 30-60 PLN/m².

**Removing fittings** — bathroom sanitaryware 250-700 PLN a set, fitted kitchen 400-1,200 PLN, internal doors 80-160 PLN each, windows 200-450 PLN each.

**Demolishing walls** — brick partition 90-170 PLN/m², plasterboard 35-60 PLN/m². A load-bearing wall is a separate category: it needs a structural opinion (1,500-4,000 PLN) and a lintel.

**Breaking up screed** — 45-90 PLN/m². A line that only appears once a cracked subfloor is found under the old flooring.

**Carrying out and hauling away** — 40-90 PLN per m³ when carrying down without a lift, a 5 m³ skip 700-1,100 PLN, 7 m³ 900-1,500 PLN.

**Protection** — sheeting, tape, floor boards in the untouched part, protecting the stairwell and lift: 300-900 PLN.

**Cleaning between stages** — 150-400 PLN each time. A full renovation needs it 3-4 times, not only at the end.

**How to calculate rubble volume**

Rubble is counted in m³, not in bags. Rough conversions:

| Material | Weight | Rubble volume |
|---|---|---|
| Wall tiles, 1 m² | 18-25 kg | 0.015 m³ |
| 5 cm screed, 1 m² | 100-120 kg | 0.05 m³ |
| Brick partition, 1 m² | 180-260 kg | 0.12 m³ |
| Hacked-off plaster, 1 m² | 25-40 kg | 0.02 m³ |

A 60 m² flat with full strip-out of bathroom, kitchen and floors usually yields 6-11 m³ of rubble — two skips.

**The three things that inflate this line most**

**No service lift.** Carrying rubble down from the fourth floor raises removal cost by 60-120%.

**No permission to park a skip at the entrance.** The rubble then goes in big bags, which is 30-50% more expensive.

**Waste needing separate disposal.** Plasterboard, mineral wool, asbestos-containing materials (1960-1990 buildings). Asbestos is a separate licensed procedure — 60-150 PLN/m².

**Why it vanishes from quotes**

Because it lowers the number at the bottom of the page and does not sound like renovation. The client compares three offers and picks the one without a strip-out and removal line — not noticing the work will happen anyway, just billed later as an extra.`,
      checklist: [
        'Calculate rubble volume in m³, not in bags',
        'Check whether there is a service lift and where the skip will stand',
        'Cost strip-out separately for each type of finish',
        'In a 1960-1990 building, check materials for asbestos',
        'Plan 3-4 cleans between stages, not one at the end',
        'Protect the untouched part, the stairwell and the lift',
        'For a load-bearing wall, get a structural opinion before costing demolition',
        'Put strip-out and removal in the contract as separate line items',
      ],
      ctaText: 'Build an estimate including prep works →',
    },
    {
      slug: 'electrics-and-plumbing-share-of-budget',
      img: '/images/electrics-plumbing.jpg',
      title: 'Electrics and plumbing — 15-25% of a renovation budget',
      description: 'When replacing services is unavoidable, what an electrical point and a plumbing connection cost, and why this is the one part of a renovation you must not economise on.',
      cluster: 'budget',
      publishedAt: '2026-12-24',
      hook: 'Services are the one part of a renovation that is invisible when finished and the one part whose correction requires destroying everything on top of it. Which is why sequence matters here more than price.',
      problem: `Electrics and plumbing absorb 15-25% of the budget and leave nothing you can see. It is tempting to trim here — keep the old cable, replace only the visible pipes, add a circuit later.

The problem is that services sit under plaster, under screed and under tiles. Any correction after the renovation means hacking off the finishes, which costs 3-6 times more than doing it right the first time.`,
      explanation: `**When replacement is required, not optional**

**Replace the electrical installation when:**
- the building predates 1995 (aluminium instead of copper),
- there is no earthing and no residual current device,
- socket circuits run on 1.5 mm² conductors,
- the consumer unit has fuses rather than MCBs,
- you are planning an induction hob, air conditioning or underfloor heating.

**Replace the plumbing when:**
- the pipes are galvanised steel (typical up to the 1990s),
- pressure drops when two outlets run at once,
- there is corrosion at joints or damp marks by the risers,
- you are changing the bathroom or kitchen layout.

**What it costs — 2026 rates**

| Item | Price |
|---|---|
| Electrical point (socket, switch) | 120-260 PLN |
| Lighting point | 140-300 PLN |
| Dedicated circuit (hob, oven) | 350-700 PLN |
| Consumer unit with devices | 1,800-4,500 PLN |
| Water connection (hot and cold) | 380-750 PLN |
| Waste connection | 300-650 PLN |
| Relocating a riser | 1,500-4,000 PLN |
| Testing and certificate | 400-900 PLN |

**How many points you actually need**

A 58 m² flat at 2026 standards: 38-52 electrical points. Living room 12-16, kitchen 14-20 (with dedicated circuits), bedroom 6-9, bathroom 5-8, hallway 4-6.

For comparison: a 1980s flat typically has 12-18 points in total. That is where the difference in quotes comes from — not from the price of cable.

**A worked cost for 58 m²**

Full rewire: 45 points × 180 PLN = 8,100 PLN, consumer unit 2,800 PLN, dedicated circuits 3 × 500 PLN = 1,500 PLN, testing 600 PLN. Total **13,000 PLN**.

Plumbing: 6 water connections × 550 PLN = 3,300 PLN, 4 waste connections × 450 PLN = 1,800 PLN, distribution and materials 3,500 PLN. Total **8,600 PLN**.

Services together: **21,600 PLN** against a 92,000 PLN overall estimate — 23%.

**The sequence you cannot reverse**

Electrics and plumbing must be finished and signed off **before** plaster and screed. Underfloor heating goes in before the screed. Ventilation before the suspended ceiling. Reversing that order means breaking up what is already done.

Always demand an electrical test certificate and a pressure test on the water installation before anything is covered. Two sheets of paper that are worth tens of thousands in a dispute.`,
      checklist: [
        'Check the build year — before 1995, assume a full rewire by default',
        'Count the points you need before asking for a quote',
        'Plan dedicated circuits for hob, oven and air conditioning',
        'Do the services before plaster and screed, never after',
        'Demand an electrical test certificate before anything is covered',
        'Demand a pressure test on the water installation before covering',
        'Photograph every run before plastering',
        'Do not phase a service replacement — it is the most expensive compromise available',
      ],
      ctaText: 'Cost the services in your flat →',
    },
    {
      slug: 'new-build-vs-resale-estimate',
      img: '/images/new-vs-resale.jpg',
      title: 'New-build or resale — how the two estimates really differ',
      description: 'Why the same floor area costs differently in developer-state and in a second-hand flat. A line-by-line comparison and the difference in contingency required.',
      cluster: 'property',
      publishedAt: '2027-01-07',
      hook: 'A developer-state flat and a 1985 flat, both 58 m², both for a full fit-out. The first: 78,000 PLN with 11% contingency. The second: 112,000 PLN with 22%. The difference is not where you expect it.',
      problem: `The common belief is that a developer-state flat is more expensive to finish, because everything has to be done from scratch. That is only half true.

Yes, in developer state there is nothing — but there is also nothing to remove, no surprises under the layers, the services are new and to current standard, and the walls are plumb. Those are three entire cost categories that a second-hand flat always brings.

Here is the line-by-line comparison.`,
      explanation: `**Estimate comparison, 58 m², standard finish**

| Item | Developer state | 1985 resale |
|---|---|---|
| Strip-out and removal | 0-900 PLN | 6,500-11,000 PLN |
| Electrical installation | 9,000-13,000 PLN | 12,000-18,000 PLN |
| Plumbing installation | 5,500-8,500 PLN | 8,000-15,000 PLN |
| Plaster and skim | 8,000-12,000 PLN | 11,000-17,000 PLN |
| Screeds | 5,000-8,000 PLN | 6,000-13,000 PLN |
| Finishes and materials | 42,000-56,000 PLN | 42,000-56,000 PLN |
| **Works total** | **70,000-98,000 PLN** | **86,000-130,000 PLN** |
| Recommended contingency | 10-12% | 20-25% |

**What costs more in developer state**

**Volume of work from zero.** All the plaster, all the screeds, the full electrical and plumbing scope — nothing can be left in place.

**Things that are simply absent.** Internal doors, window boards, sometimes radiators, all the lighting, every finish.

**The scale of the material order.** You buy everything at once, so the single outlay is larger even where the total is similar.

**What costs more in a resale flat**

**Strip-out and removal.** 6,500-11,000 PLN that a new flat simply does not have.

**Surprises.** Damp, mould, cracked subfloor, aluminium in the walls, leaking risers. That is why contingency rises from 11% to 22%.

**Correcting geometry.** Walls in prefabricated blocks can be 3-5 cm out of plumb over a storey. Every centimetre of levelling is material and labour across the whole surface.

**Technical constraints.** Risers in fixed positions, passive ventilation, limited supply capacity, building consent for any intervention.

**Two things specific to new construction**

**Settlement and shrinkage.** In the first 12-24 months after handover, hairline cracks appear at junctions. This is not poor workmanship but normal structural movement — worth allowing for when choosing finishes (flexible sealants at junctions, caution with large-format slabs on partition walls).

**Construction moisture.** Fresh plaster and screed release moisture for 4-8 weeks. Laying parquet on an unseasoned screed is the most common expensive mistake in new-build.

**The practical conclusion**

Developer state is more expensive in the finishes line and cheaper in the risk line. Resale is the reverse. If you are comparing two flats before buying, cost them separately: works, then required contingency. The sum of those two numbers — not the works quote alone — is what you will actually spend.`,
      checklist: [
        'Cost works and required contingency separately — they differ twofold',
        'In developer state, add doors, window boards and lighting',
        'In a resale flat, always assume strip-out and removal: 6,500-11,000 PLN',
        'Check build year and construction type before costing plaster',
        'In a new building, allow 4-8 weeks for screeds to dry',
        'In a prefabricated block, check how far the walls are out of plumb',
        'Ask the building manager what interventions to services are permitted',
        'When buying, compare flats on the total: price plus renovation plus contingency',
      ],
      ctaText: 'Compare the estimate for both options →',
    },
    {
      slug: 'phased-renovation-planning',
      img: '/images/phased-renovation.jpg',
      title: 'Phased renovation — how to split the work and what it really costs',
      description: 'When splitting a renovation into phases makes sense, what must never be split, and what a second crew mobilisation costs. With a worked three-phase split of a 58 m² flat.',
      cluster: 'budget',
      publishedAt: '2027-01-21',
      hook: 'Splitting a renovation into phases is not a saving — it is deferring the spend at a 12-20% surcharge. In some situations it is still the best decision available.',
      problem: `The most common reason for phasing is simple: the budget covers half the scope. The second reason: there is nowhere to live for three months.

Both are entirely sensible. The trouble starts when the boundary between phases falls in the wrong place — and phase two begins by destroying part of phase one.

A split is only safe along lines that no services and no floor build-up cross.`,
      explanation: `**What the split itself costs**

Every return of the crew carries a mobilisation cost: transporting equipment, re-protecting part of the flat, setting up again, re-placing material orders.

| Item | Cost of a second visit |
|---|---|
| Crew mobilisation | 800-2,500 PLN |
| Re-protecting the flat | 300-800 PLN |
| New material order | +5-10% of material price |
| Year-on-year rate rise | +12-18% on a phase a year later |
| Repeat cleaning | 300-700 PLN |

In practice, splitting into two phases a year apart raises the total cost by **12-20%**.

**What must never be split**

**Electrical and plumbing installations.** They are done across the whole flat at once or not at all. Adding a circuit a year later means hacking through plaster and tiles in rooms already finished.

**Screeds on one level.** A screed poured on two dates has a joint, a height difference and different curing times. A floor running through a doorway will not match.

**Wet rooms sharing services.** A bathroom and kitchen on the same riser must be done together — otherwise you pay twice for access to the same riser.

**Plaster on shared walls.** A wall between living room and bedroom plastered in two phases will show the transition.

**Where the safe boundary runs**

Along the door of a closable room that shares neither a riser nor a screed level with the rest. In practice: bedrooms, a study, a child's room — yes. Bathroom, kitchen, hallway — no.

**A worked split of a 58 m² flat**

**Phase 1 (mandatory, 2-3 months) — 62,000 PLN.** All electrics and plumbing throughout, all screeds, all plaster, full fit-out of bathroom, kitchen and hallway. This is the part that cannot be broken up.

**Phase 2 (after 8-14 months) — 21,000 PLN.** Living room: flooring, painting, lighting, doors.

**Phase 3 (after another 6-12 months) — 17,000 PLN.** Two bedrooms: flooring, painting, doors, wardrobes.

Phases total: 100,000 PLN against 87,000 PLN done in one go. The surcharge for spreading it out: **13,000 PLN**.

**Living there during the works**

If you stay in the flat during phase 2 or 3, add: zipped dust barriers (150-400 PLN), a temporary kitchen, daily cleaning. And assume the phase takes 1.5 times longer than in an empty flat — a crew works slower when it has to close down the site every evening.

**When phasing genuinely pays**

When the alternative is borrowing the shortfall. Above 8% interest, the cost of a 25,000 PLN loan over three years exceeds the phasing surcharge. At that point spreading the work out is simply cheaper financing.`,
      checklist: [
        'Do all electrics and plumbing in phase one, without exception',
        'Never split a screed on one level between phases',
        'Do a bathroom and kitchen sharing a riser in the same phase',
        'Run the phase boundary along the door of a closable room',
        'Add 12-20% to the total for spreading the work over time',
        'Set aside 800-2,500 PLN for each re-mobilisation of the crew',
        'If living in the flat, add 50% to the phase duration',
        'Compare the phasing surcharge with the cost of borrowing the difference',
      ],
      ctaText: 'Build an estimate for each phase →',
    },
    {
      slug: 'kitchen-renovation-cost-2027',
      img: '/images/kitchen-renovation.jpg',
      title: 'Kitchen renovation cost 2027 — price per m² and what makes it up',
      description: 'Current kitchen renovation prices in Poland. Ranges for three standards, broken down into services, ventilation, splashback and finishes — furniture and appliances excluded.',
      cluster: 'rooms',
      publishedAt: '2027-02-04',
      hook: 'A 10 m² kitchen can cost as much as a 25 m² living room. Not because it is prettier — because four trades meet on those ten square metres at the same time.',
      problem: `After the bathroom, the kitchen is the second most expensive room per square metre. The reason is technical, not aesthetic.

Into a small area you have to fit: dedicated circuits for the hob and oven, water and waste connections for the sink and dishwasher, mechanical ventilation for the extractor, waterproof finishing of the work zone and a floor that carries the weight of the units.

Each of those is a separate trade and a separate stage, and all of them must be finished before the joinery arrives — and joinery cannot be rescheduled.`,
      explanation: `**Kitchen renovation prices 2027 — excluding furniture and appliances**

**Budget standard — 700-1,300 PLN/m²**
Keeping the existing service layout, painted walls, a basic tiled splashback, vinyl or lower-range porcelain, replacing electrical points without new circuits. A 10 m² kitchen: **7,000-13,000 PLN**.

**Standard — 1,400-2,400 PLN/m²**
New dedicated circuits, water connections moved within the room, mechanical extraction with a duct, porcelain or glass splashback, porcelain floor, skimmed walls. A 10 m² kitchen: **14,000-24,000 PLN**.

**Premium — 2,600-4,500 PLN/m²**
Full service replacement, riser relocation or layout change, large-format slabs on splashback and floor, multi-zone LED lighting, underfloor heating, ventilation with heat recovery. A 10 m² kitchen: **26,000-45,000 PLN**.

**What sits inside those numbers — 10 m², standard finish**

| Item | Cost |
|---|---|
| Stripping out the old kitchen and finishes | 1,200-2,400 PLN |
| Electrics: 16 points + 3 dedicated circuits | 4,400-6,800 PLN |
| Plumbing: sink, dishwasher, possibly washer | 1,800-3,200 PLN |
| Mechanical extraction with duct | 900-2,200 PLN |
| Plaster, skim, paint | 2,200-3,600 PLN |
| Splashback (material + labour) | 1,400-3,400 PLN |
| Porcelain floor with levelling screed | 2,400-4,200 PLN |
| **Total** | **14,300-25,800 PLN** |

**What those figures do not include**

Fitted joinery 12,000-60,000 PLN, appliances 6,000-35,000 PLN, worktop 1,500-14,000 PLN depending on material (laminate, composite, sintered stone), sink and tap 800-4,500 PLN. A realistic turnkey kitchen budget is usually **2.5-3 times** the cost of the building work alone.

**Four mistakes that cost the most**

**1. Ordering the units before the walls are finished.** Joinery measured against unplastered walls will not fit once plastered. The order is: services, plaster, floor, then measure for joinery.

**2. No dedicated circuits.** An induction hob, oven and dishwasher on one circuit means a tripped breaker at the first dinner. Adding a circuit after finishing: 1,200-2,800 PLN instead of 500 PLN.

**3. An extractor with no duct.** A charcoal-filter hood removes odour, not moisture. In a kitchen without a window that leads straight to damp in the units.

**4. A splashback fitted after the units.** The tile then cannot run to the end, and a visible gap appears behind the cabinets.

**The sequence that works**

Strip-out → electrical and water services → ventilation → plaster → screed and floor → splashback → measure for joinery → fit units → connect appliances → sealant and trims.`,
      checklist: [
        'Plan dedicated circuits for hob, oven and dishwasher',
        'Give the extractor a duct to outside, not a charcoal filter',
        'Fit the splashback before the units, not after',
        'Measure for joinery only after plaster and flooring',
        'Budget furniture and appliances separately — 2.5-3× the works cost',
        'Check the floor capacity under heavy units and a stone worktop',
        'Plan task lighting before the ceiling is closed',
        'Leave service access to valves and connections behind the units',
      ],
      ctaText: 'Build a kitchen renovation estimate →',
    },
    {
      slug: 'accepting-completed-renovation-work',
      img: '/images/work-acceptance.jpg',
      title: 'Accepting completed renovation work — what to check at every stage',
      description: 'The three sign-offs you must run: services before covering, shell stage and final. Permitted tolerances, the tools you need, and how to tie payments to stages.',
      cluster: 'contractors',
      publishedAt: '2027-02-18',
      hook: 'Final handover is the worst possible moment to find a fault in the services. By then they are under plaster, under screed and under tiles — and you owe the last instalment with no leverage left.',
      problem: `Most renovation contracts provide for one sign-off: at the end. That is convenient for the contractor and expensive for the client, because by then everything that could have been done badly has been covered up.

A properly run renovation has three sign-offs, and each one releases the next payment instalment. It is the only mechanism that gives you real influence over quality while the work is still going on.`,
      explanation: `**Sign-off 1 — services before covering (releases 25-30% of payment)**

Moment: electrics and plumbing installed, not yet plastered.

What you check:
- the electrical test certificate: protective conductor continuity, insulation resistance, RCD operation,
- the pressure test certificate on the water installation (min. 24 h with no drop),
- that the number and position of points match what was agreed,
- conductor sizes: 1.5 mm² lighting, 2.5 mm² sockets, 4-6 mm² dedicated circuits,
- photographs of every run with a tape measure in frame.

You will need those photographs in five years, when somebody drills into a wall.

**Sign-off 2 — shell stage (releases a further 30-35%)**

Moment: plaster and screeds finished, before any finishes go down.

Permitted tolerances under building standards:

| Element | Permitted deviation |
|---|---|
| Wall out of plumb | 3 mm per 1 m, max 10 mm per storey |
| Plaster surface | 3 mm under a 2 m straightedge |
| Screed out of level | 5 mm over 2 m |
| Corner out of square | 3 mm per 1 m |

Tools: a 2 m level, a 2 m straightedge with a measuring wedge, a square, a screed moisture meter. The set costs 250-450 PLN and pays for itself on the first defect found.

**Sign-off 3 — final (releases the last 10-15%)**

Moment: everything finished, before signing the completion certificate.

What you check: flatness of finishes and joint widths, every electrical point under load, tightness of every connection after 24 h of use, opening and closing of every door and window, falls in the shower tray and at gullies, completeness of sealant and trims.

**How to tie payments to sign-offs**

| Stage | Instalment |
|---|---|
| Deposit at start | 20-25% |
| Services signed off before covering | 25-30% |
| Shell stage signed off | 30-35% |
| Final sign-off | 10-15% |
| After the defects period (30 days) | 5% |

The final 5% held for 30 days after handover is the single most effective clause in the whole contract. Most installation defects surface in the first month of use, and a retained sum is what brings the contractor back to fix them.

**The completion certificate — what it must contain**

The date, the list of works accepted, the list of defects with deadlines for putting them right, both signatures and photographs. A certificate with no defect list means acceptance without reservation — and the loss of any basis to claim for things you saw but did not write down.`,
      checklist: [
        'Put three sign-offs in the contract, not one at the end',
        'Never let services be covered without test and pressure certificates',
        'Photograph every service run with a tape measure in frame',
        'Buy a 2 m level and straightedge — a 250-450 PLN set',
        'Check tolerances: 3 mm under a 2 m straightedge for plaster, 5 mm over 2 m for screed',
        'Tie every instalment to a specific sign-off, not to elapsed time',
        'Hold back 5% for 30 days after final handover',
        'Record every defect in the certificate with a deadline for the fix',
      ],
      ctaText: 'Prepare for your renovation with a full estimate →',
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
    {
      slug: 'kak-poschitat-smetu-na-remont',
      img: '/images/estimate-method.jpg',
      title: 'Как посчитать смету на ремонт — метод из 7 шагов',
      description: 'Практическая инструкция расчёта сметы: обмер, объём работ, стандарт отделки, коммуникации, материалы, работа и резерв. С конкретными ставками рынка 2026.',
      cluster: 'budget',
      publishedAt: '2026-09-17',
      hook: 'Смета — это не одна цифра, умноженная на метры. Это семь отдельных решений, каждое из которых сдвигает бюджет на десятки тысяч злотых, — и все их можно принять за столом, до того как кто-то выйдет на объект.',
      problem: `Самая частая ошибка при расчёте ремонта — начинать с цены за метр. Ставка 2 200 PLN/м² выглядит конкретно, но она не говорит, входит ли туда замена проводки, какая плитка и включена ли вообще работа.

Результат: цифра получается красивой, а реальность расходится с ней на 30-50%. Не потому что ставка была неверной, а потому что было неизвестно, что именно она покрывает.

Правильная смета собирается наоборот: от объёма работ к цене, а не от цены к объёму.`,
      explanation: `**Шаг 1 — обмер каждого помещения отдельно**

Запишите длину, ширину и высоту каждого помещения. Отсюда вы получите три разные площади, которые понадобятся по отдельности: пол (длина × ширина), стены (периметр × высота минус окна и двери) и потолок. Площади из документов недостаточно: покраска квартиры 60 м² — это 170-200 м² стен и потолков.

**Шаг 2 — определите объём работ по каждому помещению**

Для каждого помещения ответьте: освежение, частичный ремонт или полный? Разница огромна. Освежение гостиной 20 м² — 6 000-11 000 PLN. Полный ремонт той же гостиной с заменой полов и коммуникаций — 24 000-42 000 PLN.

**Шаг 3 — зафиксируйте стандарт отделки**

Экономичный, оптимальный или премиум. Это множитель от 0,75 до 1,8 на всю смету. Он не обязан быть одинаковым везде: премиальная ванная плюс спальни в экономичном стандарте — самый частый разумный компромисс.

**Шаг 4 — оцените коммуникации**

Позиция, которую пропускают чаще всего. Замена электрики в квартире 60 м² — 9 000-18 000 PLN, сантехники — 6 000-15 000 PLN. В домах старше 1995 года закладывайте замену по умолчанию, а не как опцию.

**Шаг 5 — считайте материалы с запасом**

К обмеру добавьте технологический запас: плитка 10-15% (диагональ или ёлочка — до 20%), ламинат и доска 7-10%, краска 10%, клей и затирка по расходу производителя. Материалы обычно составляют 45-60% бюджета.

**Шаг 6 — примените ставку своего города**

База — Познань. Варшава ×1,25, Труймясто ×1,15, Краков и Вроцлав ×1,10, Лодзь ×0,92. Работа — это 35-45% бюджета, и именно она сильнее всего отличается между городами.

**Шаг 7 — добавьте резерв**

15% для квартиры в хорошем состоянии, 20-25% для дома старше 1990 года или когда неизвестно, что под старыми слоями. Резерв — не запас на роскошь, а статья, которая реально расходуется.

**Метод, собранный целиком**

58 м², Краков, оптимальный стандарт, дом 1998 года, замена электрики:
подготовка и демонтаж 7 200 PLN, коммуникации 16 500 PLN, штукатурка и стяжки 12 800 PLN, отделка 31 400 PLN, отделочные материалы 24 900 PLN. Итого 92 800 PLN, плюс 18% резерва = **109 500 PLN**.

Та же площадь в Лодзи в экономичном стандарте — около 61 000 PLN. Разница берётся не из метров, а из решений на шагах 2, 3 и 4.`,
      checklist: [
        'Замерьте каждое помещение: длина, ширина, высота, окна, двери',
        'Выпишите три площади: пол, стены, потолок — они нужны по отдельности',
        'Определите объём работ по каждому помещению отдельно',
        'Зафиксируйте стандарт отделки — это множитель 0,75-1,8 на всё',
        'Проверьте год постройки и состояние коммуникаций до любых расчётов',
        'Добавьте технологический запас к каждому материалу (10-20%)',
        'Примените множитель своего города к работе',
        'Заложите 15-25% резерва в зависимости от возраста дома',
      ],
      ctaText: 'Посчитать свою смету за 5 минут →',
    },
    {
      slug: 'ot-chego-zavisit-stoimost-remonta',
      img: '/images/cost-factors.jpg',
      title: 'От чего зависит стоимость ремонта — 9 факторов, которые задают цену',
      description: 'Почему одна и та же площадь стоит 55 000 или 140 000 PLN. Девять факторов, реально определяющих цену ремонта, по силе влияния на итоговый счёт.',
      cluster: 'budget',
      publishedAt: '2026-10-01',
      hook: 'Две квартиры по 60 м², обе в Варшаве, обе ремонтировались в один месяц. Одна обошлась в 58 000 PLN, вторая — в 141 000 PLN. Площадь не объясняет в этой разнице ничего.',
      problem: `Вопрос сколько стоит ремонт 60 м² не имеет ответа, потому что площадь — один из самых слабых ценообразующих факторов. Метры говорят, сколько нужно сделать, но не говорят, что именно и как.

Поэтому оценки двух подрядчиков могут отличаться вдвое, и обе будут честными: просто каждый заложил свой объём, свой стандарт и своё исходное состояние.

Ниже девять факторов по силе влияния на итоговый счёт.`,
      explanation: `**1. Объём работ — влияние до ×4**

Самый сильный фактор. Освежение (покраска, мелкие поправки) — 350-700 PLN/м². Полный ремонт с заменой коммуникаций, стяжек и всех слоёв — 2 000-4 500 PLN/м². Это не разница стандарта, а разница в том, что вы вообще делаете.

**2. Стандарт отделки — влияние до ×2,4**

Экономичный, оптимальный, премиум. Керамогранит за 45 PLN/м² и крупноформатная плита за 340 PLN/м² лежат на одном и том же полу и требуют разной работы. Стандарт действует на материалы и на работу одновременно, поэтому множится быстрее, чем кажется.

**3. Состояние коммуникаций и возраст дома — влияние до +35%**

Дом 1960-80-х: алюминиевая проводка, стальные трубы, отсутствие заземления, перекрытия с неизвестной несущей способностью. Замена коммуникаций в такой квартире — 15 000-33 000 PLN, которых просто нет в доме 2015 года.

**4. Город — влияние до +36%**

Множители работы 2026: Варшава ×1,25, Труймясто ×1,15, Краков ×1,12, Вроцлав ×1,10, Познань ×1,00, Лодзь ×0,92. Материалы по стране стоят примерно одинаково — разницу делает исключительно работа.

**5. Количество помещений при той же площади — влияние до +25%**

60 м², разделённые на 4 комнаты, стоят дороже, чем 60 м² в открытой планировке: больше поверхности стен, больше дверей, больше углов, больше точек электрики. Метры те же, работы больше.

**6. Доля ванных и кухни — влияние до +30%**

Это самые дорогие метры в квартире: сантехника, вентиляция, гидроизоляция, керамика. Квартира с двумя санузлами существенно дороже квартиры с одним при одинаковой площади.

**7. Изменение планировки — влияние до +20%**

Снос стены — это не только демонтаж: это экспертиза (для несущих), перемычка, перенос коммуникаций, новая стяжка на месте стены и восстановление потолка.

**8. Срок начала работ — влияние до +15%**

Ремонт в сезон (март-октябрь) дороже, и бригаду найти труднее. Тот же объём в январе часто дешевле на 8-15%, потому что у бригад есть окна в графике.

**9. Кто покупает материалы — влияние до +12%**

Материал через подрядчика обычно с наценкой 10-20%, но подрядчик отвечает за недостачу и подрезку. Свой материал дешевле, но риск ошибки в обмере переходит на вас.

**Как этим пользоваться**

Начинайте с факторов 1-3 — на них приходится около 70% разброса цен. Только потом настраивайте остальное. Оптимизировать стандарт при неопределённом объёме работ — это выбирать отделку до того, как есть стены.`,
      checklist: [
        'Определите объём работ до вопроса о цене — это фактор №1',
        'Задайте стандарт отдельно для каждого помещения',
        'Проверьте год постройки и состояние коммуникаций — до +35% бюджета',
        'Применяйте множитель города к работе, а не к материалам',
        'Считайте количество помещений и углов, а не только метры',
        'Оцените ванные и кухню отдельно — это самые дорогие метры',
        'Рассмотрите старт вне сезона: экономия 8-15%',
        'Решите, кто покупает материалы, и впишите это в договор',
      ],
      ctaText: 'Узнать, сколько стоит ваш объём работ →',
    },
    {
      slug: 'skrytye-rashody-na-remont',
      img: '/images/hidden-costs.jpg',
      title: 'Скрытые расходы на ремонт — 14 статей, которых нет в смете',
      description: 'Вывоз мусора, контейнер, электричество, хранение мебели, съёмное жильё, устранение недочётов и доводка после бригады. Полный список трат за пределами сметы.',
      cluster: 'budget',
      publishedAt: '2026-10-15',
      hook: 'В смете было 84 000 PLN. Со счёта ушло 112 000 PLN. Разница — не скрытая наценка подрядчика, а четырнадцать статей, которые никто не посчитал, потому что ни одна из них не является ни работой, ни отделочным материалом.',
      problem: `Смета подрядчика описывает строительные работы. Ремонт — это существенно больше, чем строительные работы, а остальное всё равно выходит из того же кошелька.

У этих статей общая черта: каждая по отдельности выглядит мелочью. 900 PLN за контейнер, 400 PLN за хранение мебели, 1 200 PLN за межкомнатную дверь, о которой забыли. В сумме они обычно дают 18-30% от стоимости сметы.

Ниже полный список в порядке того, как часто про них забывают.`,
      explanation: `**Вокруг объекта**

**1. Вывоз мусора и контейнер** — 800-2 600 PLN. Контейнер 5 м³ в Варшаве стоит около 900 PLN, при полном ремонте квартиры их нужно два. Плюс вынос мусора с этажа, если нет грузового лифта.

**2. Защита неремонтируемой части** — 300-900 PLN. Плёнка, скотч, защитные плиты на пол в коридоре и на лестничной клетке.

**3. Согласование с управляющей компанией и залог** — 0-2 000 PLN. Многие дома берут залог за пользование лифтом и лестницей.

**4. Электричество и вода во время работ** — 200-700 PLN. При полном ремонте с просушкой и тепловыми пушками бывает больше.

**Вокруг вас**

**5. Съёмное жильё на время ремонта** — 0-14 000 PLN. При полном ремонте это 2-3 месяца вне дома. Самая недооценённая статья во всём списке.

**6. Хранение мебели** — 300-1 800 PLN. Склад формата self-storage, 8-14 м³ на 2-3 месяца.

**7. Транспорт и переезд** — 600-2 500 PLN, считая в обе стороны.

**Это ремонт, но этого нет в смете**

**8. Межкомнатные двери с установкой** — 900-2 600 PLN за штуку. На четыре помещения это 4 000-10 000 PLN.

**9. Освещение и электроустановочные изделия** — 2 000-9 000 PLN. Светильники, розетки, выключатели, LED-ленты с блоками питания.

**10. Сантехника и керамика** — 3 000-25 000 PLN. Смесители, унитаз, раковина, душевая или ванна. Почти всегда вне сметы на работы.

**11. Карнизы, рулонные шторы, москитные сетки** — 800-4 500 PLN.

**12. Уборка после ремонта** — 400-1 400 PLN. Строительная пыль требует трёх проходов, а не одного.

**После завершения**

**13. Устранение недочётов** — 500-3 000 PLN. Даже у хорошей бригады часть дефектов проявляется через месяц эксплуатации.

**14. Доводка после бригады** — 1 000-5 000 PLN. Герметики, плинтусы, пороги, регулировка дверей, мелкая подкраска.

**Сколько это в сумме**

Для квартиры 58 м² в оптимальном стандарте при смете 84 000 PLN реальный диапазон этих статей — **16 000-31 000 PLN**. Даже в экономном варианте, без съёмного жилья, выходит около 12 000 PLN.

Поэтому резерв 15-20% — это не осторожность, а просто корректно посчитанная остальная часть ремонта.`,
      checklist: [
        'Заложите в бюджет контейнер и вывоз мусора — 800-2 600 PLN',
        'Посчитайте стоимость съёмного жилья на 2-3 месяца',
        'Добавьте хранение мебели и транспорт в обе стороны',
        'Оцените межкомнатные двери отдельно — 900-2 600 PLN за штуку',
        'Заложите бюджет на сантехнику, керамику и освещение',
        'Уточните, берёт ли дом залог за лифт и лестницу',
        'Отложите 400-1 400 PLN на уборку после ремонта',
        'Оставьте 1 000-5 000 PLN на недочёты и доводку после бригады',
      ],
      ctaText: 'Посчитать смету с полным бюджетом →',
    },
    {
      slug: 'oshibki-brigad-pri-otsenke-remonta',
      img: '/images/contractor-estimate-errors.jpg',
      title: 'Ошибки бригад при оценке ремонта — почему подрядчик промахивается на 30%',
      description: 'Почему оценки ремонтных бригад регулярно расходятся с реальностью. Десять механизмов, из-за которых подрядчик занижает стоимость, и вопросы, которые это выявляют.',
      cluster: 'contractors',
      publishedAt: '2026-10-29',
      hook: 'Подрядчик не лжёт, когда называет 84 000 PLN, а заканчивает на 112 000 PLN. Он действительно так посчитал. Проблема в том, как посчитал, — и это можно проверить за пятнадцать минут.',
      problem: `Ремонтная бригада — это строительная команда, а не сметный отдел. Люди, которые отлично кладут плитку, редко имеют инструменты и время для полноценного обмера. Оценка составляется между двумя объектами, чаще всего вечером, по итогам двадцатиминутного визита.

Это не злой умысел. Это структурная особенность рынка: составление сметы — расход подрядчика, а не услуга, за которую кто-то платит. Чем быстрее она сделана, тем лучше для него.

Ниже десять механизмов, из-за которых такая оценка систематически выходит заниженной.`,
      explanation: `**1. Оценка на глаз, без обмера**

Визит длится 20 минут, подрядчик ходит по квартире и прикидывает. Не меряет высоту, не считает периметр стен, не считает количество углов. Ошибка одного только обмера обычно 10-18%.

**2. Якорь с предыдущего объекта**

Прошлая квартира 55 м² стоила 78 000 PLN, значит эти 58 м² оцениваю в 82 000 PLN. Площадь похожа, но год постройки, состояние коммуникаций и планировка могут быть совершенно другими.

**3. Никто не заглядывает под старые слои**

Под плиткой бывает влажная стяжка, под ламинатом растрескавшееся основание, в стене алюминиевый провод. Пока не начался демонтаж, это гадание — и гадают оптимистично.

**4. Расчёт по площади пола, когда работа на стенах**

Классика. В квартире 60 м² 170-200 м² стен и потолков. Оценка по 60 м² занижает покраску, штукатурку и грунтовку на порядок.

**5. Осознанное занижение, чтобы выиграть заказ**

Подрядчик знает, что клиент сравнит три цифры и выберет меньшую. Дополнительные работы придут позже, когда сменить бригаду будет практически невозможно.

**6. В оценке нет логистики**

Четвёртый этаж без лифта, узкая лестница, запрет парковки у подъезда, негде поставить контейнер. Каждое из этих ограничений реально добавляет 4-9% к работе — и почти никогда не попадает в оценку.

**7. Подготовка и уборка вне оценки**

Демонтаж, защита плёнкой, вынос мусора, уборка между этапами. Для квартиры 60 м² это 4 000-11 000 PLN работ, которые кто-то всё равно выполнит и за которые кто-то всё равно заплатит.

**8. Материалы без технологического запаса**

Плитка посчитана ровно по метрам помещения, без 10-15% на подрезку. Недостающую плитку докупают из другой партии, другого оттенка, — и тогда добавляется ещё и стоимость переделки.

**9. Оценка от марта, применённая в сентябре**

Срок действия оценки обычно 14-30 дней, но ремонты начинаются через 2-4 месяца после разговора. При росте ставок на 12-18% в год это само по себе даёт разницу 3-6%.

**10. Нет строки на непредвиденное**

В нормальной смете есть строка резерва. В коммерческой оценке её нет, потому что она подняла бы цифру внизу страницы, — а именно эта цифра выигрывает заказ.

**Пять вопросов, которые выявляют все десять**

1. Какую площадь стен вы посчитали? (если ответ 60 м² — вернитесь к пункту 4)
2. Что будет, если под плиткой окажется влажная стяжка?
3. Входит ли в цену вывоз мусора и контейнер?
4. Какой процент запаса на подрезку заложен по плитке?
5. До какой даты действует эта оценка?

Подрядчик, который конкретно отвечает на все пять, считал добросовестно. Подрядчик, который отмахивается от трёх, только начнёт считать — за ваш счёт.`,
      checklist: [
        'Спросите про посчитанную площадь стен, а не пола',
        'Проверьте, мерил ли подрядчик вообще или прикидывал на глаз',
        'Пропишите, что происходит при находках под старыми слоями',
        'Подтвердите, что вывоз мусора и контейнер входят в цену',
        'Спросите процент технологического запаса по материалам',
        'Сверьте срок действия оценки с планируемой датой старта',
        'Опишите ограничения логистики: этаж, лифт, парковка',
        'Попросите строку резерва в смете — её отсутствие тревожный знак',
      ],
      ctaText: 'Сравнить оценку бригады с независимой сметой →',
    },
    {
      slug: 'obmer-i-zapas-materialov',
      img: '/images/measuring-materials.jpg',
      title: 'Обмер и запас материалов — как считать, чтобы не не хватило и не осталось',
      description: 'Как правильно обмерить помещение и сколько технологического запаса добавить к плитке, ламинату, краске и клеям. С разбором расчёта для ванной 6 м².',
      cluster: 'materials',
      publishedAt: '2026-11-12',
      hook: 'Не хватило восьми плиток. Докупленные из другой партии другого оттенка, значит перекладывать всю стену. Стоимость одной этой ошибки в обмере: 2 400 PLN и четыре дня простоя.',
      problem: `Обмер выглядит самой простой частью сметы — измерил и умножил. На практике это место, где возникает больше всего дорогих ошибок, потому что каждый материал считается в своей единице и со своим запасом.

Три самые частые ошибки: считать всё по площади пола, пропускать технологический запас и вычитать окна и двери там, где этого делать не нужно.`,
      explanation: `**Три площади, которые вам нужны**

**Пол** = длина × ширина. По ней считают: стяжку, ламинат, керамогранит, изоляцию, тёплый пол.

**Стены** = периметр × высота. По ним считают: штукатурку, шпаклёвку, краску, обои, настенную плитку. Периметр — это 2 × (длина + ширина).

**Развёрнутая площадь** = стены + потолок. По ней считают покраску и грунтовку. Для квартиры 60 м² это обычно 170-200 м².

**Когда вычитать окна и двери**

Для краски и штукатурки вычитайте проёмы больше 2 м². Для плитки не вычитайте ничего меньше 1 м² — подрезка вокруг небольшого проёма всё равно съедает материал. Для ламината не вычитайте ни пороги, ни ниши.

**Технологический запас — таблица**

| Материал | Простая раскладка | Сложная раскладка |
|---|---|---|
| Плитка, керамогранит | 10% | 15-20% (диагональ, ёлочка) |
| Крупноформатные плиты | 12% | 20-25% |
| Ламинат, доска | 7% | 10-12% (под углом, ёлочка) |
| Обои с рисунком | 15% | 20% (большой раппорт) |
| Краска | 10% | 15% (сильная смена цвета) |
| Плинтусы, молдинги | 8% | 10% |

**Материалы, считающиеся по расходу, а не по площади**

Плиточный клей: 3-6 кг/м² в зависимости от формата и гребёнки. Грунтовка: 0,1-0,2 л/м². Затирка: 0,3-1,2 кг/м² в зависимости от ширины шва и формата плитки. Всегда сверяйте расход на упаковке — разница между производителями достигает 40%.

**Разбор: ванная 6 м²**

Размеры 2,0 × 3,0 м, высота 2,6 м. Плитка на полу и на стенах до потолка.

Пол: 2,0 × 3,0 = 6,0 м². Плюс 10% = **6,6 м²**.
Стены: периметр 2 × (2,0 + 3,0) = 10 м; 10 × 2,6 = 26,0 м². Дверь 1,7 м² вычитаем, окна нет. 24,3 м², плюс 12% = **27,2 м²**.
Итого плитки: 33,8 м². Покупаются целые упаковки, значит реально 34-35 м².
Клей: 34 × 4,5 кг = **153 кг** (7 мешков по 25 кг).
Затирка: 34 × 0,6 = **20,4 кг**.

**Правило, которое экономит больше всего**

Покупайте весь материал из одной производственной партии сразу. Номер партии указан на упаковке. Докупить два метра через месяц почти всегда означает другой оттенок — и перекладку всей поверхности вместо добавления двух метров.`,
      checklist: [
        'Считайте три площади отдельно: пол, стены, развёрнутая',
        'Вычитайте проёмы только больше 2 м² и только для краски и штукатурки',
        'Добавляйте запас по раскладке: простая 10%, ёлочка или диагональ 15-20%',
        'Сверяйте расход клея, грунтовки и затирки на упаковке производителя',
        'Заказывайте целые упаковки с округлением вверх',
        'Покупайте весь материал из одной производственной партии',
        'Запишите номер партии на случай рекламации или докупки',
        'Оставьте 2-3 м² плитки на будущий ремонт',
      ],
      ctaText: 'Посчитать материалы для своей квартиры →',
    },
    {
      slug: 'rezerv-v-smete-na-remont',
      img: '/images/budget-reserve.jpg',
      title: 'Резерв в смете на ремонт — сколько закладывать и куда он реально уходит',
      description: 'Какой процент резерва планировать в зависимости от возраста дома, на что эти деньги фактически тратятся и как управлять резервом, чтобы он не закончился на середине.',
      cluster: 'budget',
      publishedAt: '2026-11-26',
      hook: 'Резерв — это не фонд на роскошь, которую вы ещё не выбрали. Это статья, которая в 4 ремонтах из 5 расходуется полностью, и почти всегда на то, что невозможно было увидеть до демонтажа.',
      problem: `Самый частый подход к резерву звучит так: добавлю 10% на всякий случай. Это и мало, и не в том месте.

Мало, потому что медиана превышения бюджета на польском рынке — 18-24%. Не в том месте, потому что резерв, дописанный в конце, воспринимается как буфер на апгрейд — плитка получше, смеситель подороже — и исчезает до того, как появится настоящая проблема.

Резерв — это статья сметы, а не округление вверх.`,
      explanation: `**Сколько закладывать — по возрасту дома и объёму работ**

| Ситуация | Резерв |
|---|---|
| Квартира от застройщика, черновая отделка | 10-12% |
| Дом после 2010, частичный ремонт | 12-15% |
| Дом 1995-2010, полный ремонт | 15-18% |
| Дом 1970-1995 | 20-25% |
| Дом до 1970 или старый фонд | 25-35% |
| Перепланировка с несущими стенами | +5% к указанному |

**Куда реально уходит — данные рынка**

**Находки под старыми слоями (35-45% израсходованного резерва).** Влажная стяжка, растрескавшееся основание, грибок за коробом, старая изоляция без пароизоляции.

**Коммуникации хуже, чем предполагалось (20-30%).** Алюминий вместо меди, отсутствие заземления, стальные трубы с отложениями, негерметичные подводки.

**Геометрия конструкции (10-15%).** Стены с отклонением 3-5 см по высоте, полы с уклоном, потолки разной высоты. Каждый сантиметр выравнивания — это материал и работа.

**Изменение решений в процессе (10-15%).** Единственная часть, на которую вы влияете полностью.

**Задержки и простои (5-10%).** Более долгая аренда жилья, повторный транспорт, повторный выход бригады.

**Как управлять резервом, чтобы его хватило**

**Правило первое: не трогайте резерв до 60% готовности работ.** Большинство дорогих находок вскрывается в первой половине ремонта — на демонтаже и коммуникациях. Если к этому моменту резерв не тронут, дальше риск быстро падает.

**Правило второе: апгрейд — это не резерв.** Хотите плитку дороже? Это изменение стандарта, финансируемое отдельным решением, а не из строки на непредвиденное.

**Правило третье: фиксируйте каждое обращение к резерву.** Дата, сумма, причина, фото. Это одновременно документация при споре с подрядчиком и реальный контроль над остатком.

**Правило четвёртое: неизрасходованный резерв — не экономия, которую надо потратить в конце.** Примерно в 20% ремонтов резерв действительно остаётся. Тогда это бюджет на обстановку — но после финальной приёмки, а не в середине работ.

**Сколько это в цифрах**

Квартира 58 м², дом 1978 года, полный ремонт, смета работ 92 000 PLN. Резерв 22% = 20 240 PLN. Реальный бюджет: **112 240 PLN**. Именно эту цифру вы называете банку и именно её обеспечиваете — а не 92 000 PLN.`,
      checklist: [
        'Подбирайте процент резерва под возраст дома, а не под свой оптимизм',
        'Впишите резерв отдельной строкой сметы, а не округлением',
        'Не трогайте резерв до 60% готовности работ',
        'Финансируйте изменения стандарта отдельно — это не непредвиденное',
        'Фиксируйте каждое обращение к резерву: дата, сумма, причина, фото',
        'При перепланировке с несущими стенами добавьте ещё 5%',
        'Банку называйте сумму с резервом, а не одну смету работ',
        'Оставшийся резерв тратьте только после финальной приёмки',
      ],
      ctaText: 'Посчитать смету вместе с резервом →',
    },
    {
      slug: 'podgotovitelnye-raboty-i-demontazh',
      img: '/images/prep-works.jpg',
      title: 'Подготовительные работы и демонтаж — 8-14% бюджета, которые никто не считает',
      description: 'Демонтаж, вывоз мусора, защита квартиры и уборка между этапами. Сколько это реально стоит, как посчитать объём мусора и почему эта статья исчезает из оценок.',
      cluster: 'budget',
      publishedAt: '2026-12-10',
      hook: 'До того как кто-то положит первую плитку, квартиру нужно разобрать, вынести, вывезти и защитить. Это 8-14% бюджета и в среднем две недели графика — статья, которой нет ни на одной фотографии с ремонта.',
      problem: `Подготовительным работам не повезло: после них не остаётся ничего, что можно показать. Никто не фотографирует пустую квартиру после демонтажа. Поэтому в разговорах о ремонте этот этап пропадает, а в оценках появляется одной строкой неопределённого содержания или не появляется вовсе.

При этом он создаёт реальные расходы, требует техники и людей, и его нельзя пропустить. Для квартиры 60 м² речь идёт о 4 000-11 000 PLN.`,
      explanation: `**Из чего состоит этот этап**

**Демонтаж покрытий** — сбивка плитки 28-55 PLN/м², снятие ламината 12-22 PLN/м², удаление обоев 10-18 PLN/м², сбивка штукатурки 30-60 PLN/м².

**Демонтаж оборудования** — сантехника 250-700 PLN за комплект, встроенная кухня 400-1 200 PLN, межкомнатные двери 80-160 PLN за штуку, окна 200-450 PLN за штуку.

**Разборка стен** — перегородка из кирпича 90-170 PLN/м², из гипсокартона 35-60 PLN/м². Несущая стена — отдельная категория: нужна экспертиза (1 500-4 000 PLN) и перемычка.

**Демонтаж стяжки** — 45-90 PLN/м². Статья, которая появляется только тогда, когда под старым полом обнаруживается растрескавшееся основание.

**Вынос и вывоз** — 40-90 PLN за м³ при выносе с этажа без лифта, контейнер 5 м³ 700-1 100 PLN, 7 м³ 900-1 500 PLN.

**Защита** — плёнка, скотч, плиты на пол в неремонтируемой части, защита лестничной клетки и лифта: 300-900 PLN.

**Уборка между этапами** — 150-400 PLN за раз. При полном ремонте нужна 3-4 раза, а не только в конце.

**Как посчитать объём мусора**

Мусор считается в м³, а не в мешках. Ориентировочные пересчёты:

| Материал | Вес | Объём мусора |
|---|---|---|
| Плитка со стены, 1 м² | 18-25 кг | 0,015 м³ |
| Стяжка 5 см, 1 м² | 100-120 кг | 0,05 м³ |
| Перегородка из кирпича, 1 м² | 180-260 кг | 0,12 м³ |
| Сбитая штукатурка, 1 м² | 25-40 кг | 0,02 м³ |

Квартира 60 м² с полным демонтажом ванной, кухни и полов обычно даёт 6-11 м³ мусора, то есть два контейнера.

**Три вещи, которые поднимают эту статью сильнее всего**

**Отсутствие грузового лифта.** Вынос мусора по лестнице с 4-го этажа поднимает стоимость вывоза на 60-120%.

**Запрет ставить контейнер у подъезда.** Тогда мусор вывозят в биг-бэгах, что дороже на 30-50%.

**Отходы, требующие отдельной утилизации.** Гипсокартон, минеральная вата, материалы с асбестом (дома 1960-1990). Асбест — отдельная лицензируемая процедура, 60-150 PLN/м².

**Почему это исчезает из оценок**

Потому что снижает цифру внизу страницы и не звучит как ремонт. Клиент сравнивает три предложения и выбирает то, где нет строки демонтаж и вывоз, не замечая, что работа всё равно будет выполнена, только оплачена позже как дополнительная.`,
      checklist: [
        'Посчитайте объём мусора в м³, а не в мешках',
        'Уточните, есть ли грузовой лифт и где встанет контейнер',
        'Оцените демонтаж отдельно по каждому виду покрытия',
        'Для дома 1960-1990 проверьте материалы на наличие асбеста',
        'Запланируйте 3-4 уборки между этапами, а не одну в конце',
        'Защитите неремонтируемую часть, лестницу и лифт',
        'Для несущей стены закажите экспертизу до оценки демонтажа',
        'Впишите демонтаж и вывоз в договор отдельными позициями',
      ],
      ctaText: 'Посчитать смету с подготовительными работами →',
    },
    {
      slug: 'elektrika-i-santehnika-v-smete',
      img: '/images/electrics-plumbing.jpg',
      title: 'Электрика и сантехника — 15-25% бюджета ремонта',
      description: 'Когда замена коммуникаций обязательна, сколько стоит точка электрики и подводка, и почему это единственная часть ремонта, на которой нельзя экономить.',
      cluster: 'budget',
      publishedAt: '2026-12-24',
      hook: 'Коммуникации — единственная часть ремонта, которая не видна после завершения, и единственная, исправление которой требует разрушить всё, что сверху. Поэтому здесь порядок работ важнее цены.',
      problem: `Электрика и сантехника забирают 15-25% бюджета и не оставляют после себя ничего видимого. Есть соблазн подрезать именно тут — оставить старый провод, заменить только видимые трубы, добавить линию позже.

Проблема в том, что коммуникации находятся под штукатуркой, под стяжкой и под плиткой. Любая их правка после ремонта означает демонтаж отделочных слоёв, то есть стоимость в 3-6 раз выше, чем сделать сразу.`,
      explanation: `**Когда замена обязательна, а не опциональна**

**Электрику меняем, если:**
- дом построен до 1995 года (алюминий вместо меди),
- нет заземления и устройства защитного отключения,
- сечение провода на розеточных линиях 1,5 мм²,
- в щитке пробки, а не автоматы,
- планируется индукционная плита, кондиционер или тёплый пол.

**Сантехнику меняем, если:**
- трубы стальные оцинкованные (типично до 90-х),
- давление падает при одновременном разборе в двух точках,
- видна коррозия на соединениях или следы влаги у стояков,
- меняется планировка ванной или кухни.

**Сколько это стоит — ставки 2026**

| Позиция | Цена |
|---|---|
| Точка электрики (розетка, выключатель) | 120-260 PLN |
| Точка освещения | 140-300 PLN |
| Выделенная линия (плита, духовка) | 350-700 PLN |
| Щиток с автоматикой | 1 800-4 500 PLN |
| Водная подводка (горячая и холодная) | 380-750 PLN |
| Канализационная подводка | 300-650 PLN |
| Перенос стояка | 1 500-4 000 PLN |
| Замеры и протокол | 400-900 PLN |

**Сколько точек нужно реально**

Квартира 58 м² по стандартам 2026 года: 38-52 точки электрики. Гостиная 12-16, кухня 14-20 (с выделенными линиями), спальня 6-9, ванная 5-8, прихожая 4-6.

Для сравнения: в квартире 80-х обычно 12-18 точек на всю площадь. Отсюда и берётся разница в оценке, а не из цены провода.

**Пример расчёта для 58 м²**

Полная замена электрики: 45 точек × 180 PLN = 8 100 PLN, щиток 2 800 PLN, выделенные линии 3 × 500 PLN = 1 500 PLN, замеры 600 PLN. Итого **13 000 PLN**.

Сантехника: 6 водных подводок × 550 PLN = 3 300 PLN, 4 канализационные × 450 PLN = 1 800 PLN, разводка и материал 3 500 PLN. Итого **8 600 PLN**.

Коммуникации вместе: **21 600 PLN** при общей смете 92 000 PLN, то есть 23%.

**Порядок, который нельзя развернуть**

Электрика и сантехника должны быть готовы и приняты **до** штукатурки и стяжки. Тёплый пол укладывается до стяжки. Вентиляция — до подвесного потолка. Разворот этого порядка означает демонтаж уже сделанного.

Всегда требуйте протокол электрических замеров и опрессовку водной системы до закрытия. Это два листа бумаги, которые при споре стоят десятки тысяч злотых.`,
      checklist: [
        'Проверьте год постройки — до 1995 закладывайте замену электрики по умолчанию',
        'Посчитайте нужное количество точек до запроса оценки',
        'Запланируйте выделенные линии для плиты, духовки и кондиционера',
        'Делайте коммуникации до штукатурки и стяжки, а не после',
        'Требуйте протокол электрических замеров до закрытия',
        'Требуйте опрессовку водной системы до закрытия',
        'Сфотографируйте все трассы до штукатурки',
        'Не делите замену коммуникаций на этапы — это самый дорогой компромисс',
      ],
      ctaText: 'Посчитать стоимость коммуникаций в своей квартире →',
    },
    {
      slug: 'smeta-novostrojka-ili-vtorichka',
      img: '/images/new-vs-resale.jpg',
      title: 'Смета: новостройка или вторичка — чем они реально отличаются',
      description: 'Почему одна и та же площадь стоит по-разному в черновой отделке и во вторичном жилье. Сравнение постатейно и разница в необходимом резерве.',
      cluster: 'property',
      publishedAt: '2027-01-07',
      hook: 'Квартира от застройщика и квартира 1985 года, обе 58 м², обе под полную отделку. Первая: 78 000 PLN с резервом 11%. Вторая: 112 000 PLN с резервом 22%. Разница лежит не там, где вы её ожидаете.',
      problem: `Распространённое убеждение звучит так: квартира от застройщика дороже в отделке, потому что всё надо делать с нуля. Это верно только наполовину.

Да, в черновой отделке нет ничего — но там и нечего убирать, нет сюрпризов под слоями, коммуникации новые и соответствуют нормам, а стены в вертикали. Это три целые категории расходов, которые во вторичном жилье появляются всегда.

Ниже сравнение постатейно.`,
      explanation: `**Сравнение сметы, 58 м², оптимальный стандарт**

| Позиция | Черновая отделка | Вторичка 1985 |
|---|---|---|
| Демонтаж и вывоз | 0-900 PLN | 6 500-11 000 PLN |
| Электрика | 9 000-13 000 PLN | 12 000-18 000 PLN |
| Сантехника | 5 500-8 500 PLN | 8 000-15 000 PLN |
| Штукатурка и шпаклёвка | 8 000-12 000 PLN | 11 000-17 000 PLN |
| Стяжки | 5 000-8 000 PLN | 6 000-13 000 PLN |
| Отделка и материалы | 42 000-56 000 PLN | 42 000-56 000 PLN |
| **Итого работы** | **70 000-98 000 PLN** | **86 000-130 000 PLN** |
| Рекомендуемый резерв | 10-12% | 20-25% |

**Что дороже в черновой отделке**

**Объём работ с нуля.** Вся штукатурка, все стяжки, электрика и сантехника в полном объёме — ничего нельзя оставить.

**Того, чего нет вообще.** Межкомнатные двери, подоконники, иногда радиаторы, всё освещение, все покрытия.

**Масштаб закупки материалов.** Покупается всё сразу, поэтому единовременный расход больше, даже если итог сопоставим.

**Что дороже во вторичке**

**Демонтаж и вывоз.** 6 500-11 000 PLN, которых в новой квартире просто нет.

**Сюрпризы.** Влага, грибок, растрескавшееся основание, алюминий в стенах, текущие стояки. Именно поэтому резерв растёт с 11% до 22%.

**Выравнивание геометрии.** Стены в панельных домах отклоняются на 3-5 см по высоте этажа. Каждый сантиметр выравнивания — это материал и работа по всей площади.

**Технические ограничения.** Стояки в фиксированных местах, естественная вентиляция, ограниченная мощность ввода, согласование с управляющей компанией.

**Две вещи, специфичные для новостроек**

**Усадка и температурно-влажностные деформации.** В первые 12-24 месяца после сдачи дома появляются микротрещины на стыках. Это не брак, а нормальная работа конструкции, — но это стоит учесть при выборе отделки (эластичные составы на стыках, осторожность с крупноформатными плитами на перегородках).

**Технологическая влажность.** Свежая штукатурка и стяжка отдают влагу 4-8 недель. Укладка паркета на невыдержанную стяжку — самая частая дорогая ошибка в новостройках.

**Практический вывод**

Черновая отделка дороже в статье отделка и дешевле в статье риск. Вторичка — наоборот. Если вы сравниваете две квартиры перед покупкой, считайте отдельно: стоимость работ и необходимый резерв. Сумма этих двух цифр, а не одна оценка работ, и есть то, что вы реально потратите.`,
      checklist: [
        'Считайте стоимость работ и резерв отдельно — они отличаются вдвое',
        'В черновой отделке добавьте двери, подоконники и освещение',
        'Во вторичке всегда закладывайте демонтаж и вывоз: 6 500-11 000 PLN',
        'Проверьте год постройки и тип конструкции до расчёта штукатурки',
        'В новом доме дайте стяжкам 4-8 недель на высыхание',
        'В панельном доме проверьте отклонение стен от вертикали',
        'Уточните у управляющей компании допустимые вмешательства в коммуникации',
        'При покупке сравнивайте квартиры по сумме: цена плюс ремонт плюс резерв',
      ],
      ctaText: 'Сравнить смету для обоих вариантов →',
    },
    {
      slug: 'remont-etapami-kak-razbit',
      img: '/images/phased-renovation.jpg',
      title: 'Ремонт этапами — как разбить работы и сколько это реально стоит',
      description: 'Когда деление ремонта на этапы имеет смысл, что нельзя делить никогда и сколько стоит повторный выход бригады. С разбором деления квартиры 58 м² на три этапа.',
      cluster: 'budget',
      publishedAt: '2027-01-21',
      hook: 'Деление ремонта на этапы — не экономия, а перенос расхода во времени с доплатой 12-20%. Но в некоторых ситуациях это всё равно лучшее из доступных решений.',
      problem: `Самая частая причина делить ремонт на этапы проста: бюджета хватает на половину объёма. Вторая причина: негде жить три месяца.

Обе абсолютно разумны. Проблема начинается тогда, когда граница между этапами проходит не в том месте, — и второй этап начинается с разрушения части первого.

Деление безопасно только вдоль линий, которые не пересекают коммуникации и слои пола.`,
      explanation: `**Сколько стоит само деление**

Каждый повторный выход бригады — это расход на мобилизацию: транспорт инструмента, повторная защита части квартиры, повторная подготовка рабочего места, повторный запуск заказов материала.

| Позиция | Стоимость второго выхода |
|---|---|
| Мобилизация бригады | 800-2 500 PLN |
| Повторная защита | 300-800 PLN |
| Новый заказ материалов | +5-10% к цене материала |
| Рост ставок год к году | +12-18% на этапе через год |
| Повторная уборка | 300-700 PLN |

На практике деление на два этапа с интервалом в год поднимает общую стоимость на **12-20%**.

**Что нельзя делить никогда**

**Электрику и сантехнику.** Их делают по всей квартире сразу или не делают вовсе. Добавить линию через год — значит сбивать штукатурку и плитку в уже отделанных помещениях.

**Стяжку на одном уровне.** Стяжка, залитая в два срока, имеет шов, перепад высоты и разное время выдержки. Пол, проходящий через порог, будет отличаться.

**Мокрые зоны, связанные одним стояком.** Ванная и кухня на общем стояке должны делаться вместе — иначе вы платите дважды за доступ к одному и тому же стояку.

**Штукатурку на общих стенах.** Стена между гостиной и спальней, оштукатуренная в два этапа, будет иметь видимый переход.

**Где проходит безопасная граница**

Вдоль двери закрываемого помещения, которое не делит с остальной квартирой ни стояк, ни стяжку на одном уровне. Практически это значит: спальни, кабинет, детская — да. Ванная, кухня, коридор — нет.

**Пример деления квартиры 58 м²**

**Этап 1 (обязательный, 2-3 месяца) — 62 000 PLN.** Вся электрика и сантехника по квартире, все стяжки, вся штукатурка, полная отделка ванной, кухни и коридора. Это часть, которую нельзя разбить.

**Этап 2 (через 8-14 месяцев) — 21 000 PLN.** Гостиная: пол, покраска, освещение, двери.

**Этап 3 (ещё через 6-12 месяцев) — 17 000 PLN.** Две спальни: полы, покраска, двери, шкафы.

Сумма этапов: 100 000 PLN против 87 000 PLN при единовременном ремонте. Доплата за растягивание во времени: **13 000 PLN**.

**Как жить во время работ**

Если вы живёте в квартире во время этапа 2 или 3, добавьте: пылезащитную завесу с молнией (150-400 PLN), временную кухню, ежедневную уборку. И считайте, что этап продлится в 1,5 раза дольше, чем в пустой квартире, — бригада работает медленнее, когда каждый вечер закрывает участок.

**Когда деление действительно выгодно**

Когда альтернатива — кредит на недостающую сумму. При ставке выше 8% стоимость кредита на 25 000 PLN за три года превышает доплату за этапность. Тогда растягивание во времени — просто более дешёвое финансирование.`,
      checklist: [
        'Сделайте всю электрику и сантехнику на первом этапе, без исключений',
        'Не делите стяжку на одном уровне между этапами',
        'Ванную и кухню на общем стояке делайте в один этап',
        'Границу этапа проводите вдоль двери закрываемого помещения',
        'Добавьте 12-20% к общей сумме за растягивание во времени',
        'Заложите 800-2 500 PLN на каждый повторный выход бригады',
        'Если живёте в квартире, добавьте 50% к длительности этапа',
        'Сравните доплату за этапность со стоимостью кредита на всю сумму',
      ],
      ctaText: 'Посчитать смету для каждого этапа →',
    },
    {
      slug: 'stoimost-remonta-kuhni-2027',
      img: '/images/kitchen-renovation.jpg',
      title: 'Стоимость ремонта кухни 2027 — цена за м² и из чего она складывается',
      description: 'Актуальные цены ремонта кухни в Польше. Диапазоны для трёх стандартов, разбивка на коммуникации, вентиляцию, фартук и отделку — без мебели и техники.',
      cluster: 'rooms',
      publishedAt: '2027-02-04',
      hook: 'Кухня 10 м² может стоить столько же, сколько гостиная 25 м². Не потому что она красивее, а потому что на этих десяти метрах одновременно встречаются четыре направления работ.',
      problem: `После ванной кухня — второе по стоимости помещение в пересчёте на квадратный метр. Причина техническая, а не эстетическая.

На небольшой площади нужно разместить: выделенные линии для плиты и духовки, водные и канализационные подводки для мойки и посудомоечной машины, механическую вентиляцию для вытяжки, влагостойкую отделку рабочей зоны и пол, выдерживающий нагрузку от мебели.

Каждая из этих вещей — отдельная бригада и отдельный этап, и все они должны быть готовы до приезда мебельной сборки, которую уже нельзя перенести.`,
      explanation: `**Цены ремонта кухни 2027 — без мебели и техники**

**Экономичный стандарт — 700-1 300 PLN/м²**
Сохранение существующей схемы коммуникаций, покраска стен, фартук из базовой плитки, виниловое покрытие или керамогранит нижнего сегмента, замена точек электрики без новых линий. Кухня 10 м²: **7 000-13 000 PLN**.

**Оптимальный стандарт — 1 400-2 400 PLN/м²**
Новые выделенные линии, перенос водных подводок в пределах помещения, механическая вентиляция с отводом, фартук из керамогранита или стекла, керамогранит на полу, шпаклёвка стен. Кухня 10 м²: **14 000-24 000 PLN**.

**Премиум-стандарт — 2 600-4 500 PLN/м²**
Полная замена коммуникаций, перенос стояка или смена планировки, крупноформатные плиты на фартуке и полу, многозонное LED-освещение, тёплый пол, вентиляция с рекуперацией. Кухня 10 м²: **26 000-45 000 PLN**.

**Что скрывается за этими суммами — разбивка для 10 м², оптимальный стандарт**

| Позиция | Стоимость |
|---|---|
| Демонтаж старой кухни и покрытий | 1 200-2 400 PLN |
| Электрика: 16 точек + 3 выделенные линии | 4 400-6 800 PLN |
| Сантехника: мойка, посудомойка, возможно стиральная | 1 800-3 200 PLN |
| Механическая вентиляция с каналом | 900-2 200 PLN |
| Штукатурка, шпаклёвка, покраска | 2 200-3 600 PLN |
| Фартук (материал + работа) | 1 400-3 400 PLN |
| Пол из керамогранита с выравнивающей стяжкой | 2 400-4 200 PLN |
| **Итого** | **14 300-25 800 PLN** |

**Чего нет в этих цифрах**

Мебельная сборка 12 000-60 000 PLN, бытовая техника 6 000-35 000 PLN, столешница 1 500-14 000 PLN в зависимости от материала (ламинат, композит, керамогранит), мойка и смеситель 800-4 500 PLN. Реальный бюджет кухни под ключ обычно в **2,5-3 раза** больше стоимости самих ремонтных работ.

**Четыре ошибки, которые стоят дороже всего**

**1. Заказ мебели до отделки стен.** Мебель, измеренная по неоштукатуренной стене, не встанет после штукатурки. Порядок: коммуникации, штукатурка, пол, и только потом замер под мебель.

**2. Отсутствие выделенных линий.** Индукционная плита, духовка и посудомойка на одной линии — это выбитый автомат на первом же ужине. Добавить линию после отделки: 1 200-2 800 PLN вместо 500 PLN.

**3. Вытяжка без отвода.** Вытяжка с угольным фильтром удаляет запах, но не влагу. На кухне без окна это прямой путь к отсыреванию мебели.

**4. Фартук, уложенный после установки мебели.** Тогда плитку невозможно довести до конца и появляется видимая щель за шкафами.

**Порядок, который работает**

Демонтаж → электрика и вода → вентиляция → штукатурка → стяжка и пол → фартук → замер под мебель → монтаж мебели → подключение техники → герметики и плинтусы.`,
      checklist: [
        'Запланируйте выделенные линии для плиты, духовки и посудомойки',
        'Обеспечьте вытяжке отвод наружу, а не угольный фильтр',
        'Сделайте фартук до установки мебели, а не после',
        'Замеряйте под мебель только после штукатурки и пола',
        'Считайте бюджет мебели и техники отдельно — это 2,5-3× стоимости работ',
        'Проверьте несущую способность пола под тяжёлую мебель и каменную столешницу',
        'Запланируйте освещение рабочей зоны до закрытия потолка',
        'Оставьте сервисный доступ к кранам и подводкам за мебелью',
      ],
      ctaText: 'Посчитать смету ремонта кухни →',
    },
    {
      slug: 'priemka-remontnyh-rabot',
      img: '/images/work-acceptance.jpg',
      title: 'Приёмка ремонтных работ — что проверять на каждом этапе',
      description: 'Три приёмки, которые нужно провести: коммуникаций до закрытия, чернового этапа и финальная. Допустимые отклонения, инструменты и привязка оплаты к этапам.',
      cluster: 'contractors',
      publishedAt: '2027-02-18',
      hook: 'Финальная приёмка — худший момент для обнаружения ошибки в коммуникациях. К этому времени они под штукатуркой, под стяжкой и под плиткой, а у вас последний платёж и никаких рычагов.',
      problem: `Большинство договоров на ремонт предусматривают одну приёмку — в конце. Это удобно подрядчику и дорого заказчику, потому что к этому моменту всё, что можно было сделать плохо, успело оказаться закрытым.

В нормально организованном ремонте три приёмки, и каждая разблокирует следующий платёж. Это единственный механизм, который даёт вам реальное влияние на качество, пока работы ещё идут.`,
      explanation: `**Приёмка 1 — коммуникации до закрытия (разблокирует 25-30% оплаты)**

Момент: электрика и сантехника проложены, но ещё не оштукатурены.

Что проверяете:
- протокол электрических замеров: непрерывность защитных проводников, сопротивление изоляции, работа УЗО,
- протокол опрессовки водной системы (минимум 24 часа без падения),
- соответствие количества и расположения точек договорённостям,
- сечения проводов: 1,5 мм² освещение, 2,5 мм² розетки, 4-6 мм² выделенные линии,
- фотографии всех трасс с рулеткой в кадре.

Эти фотографии понадобятся вам через пять лет, когда кто-то будет сверлить стену.

**Приёмка 2 — черновой этап (разблокирует ещё 30-35%)**

Момент: штукатурка и стяжки готовы, до укладки покрытий.

Допустимые отклонения по строительным нормам:

| Элемент | Допустимое отклонение |
|---|---|
| Стена от вертикали | 3 мм на 1 м, максимум 10 мм на этаж |
| Поверхность штукатурки | 3 мм под правилом 2 м |
| Стяжка от горизонтали | 5 мм на 2 м |
| Угол от прямого | 3 мм на 1 м |

Инструменты: уровень 2 м, правило 2 м с измерительным клином, угольник, влагомер для стяжки. Комплект стоит 250-450 PLN и окупается на первом же найденном дефекте.

**Приёмка 3 — финальная (разблокирует последние 10-15%)**

Момент: всё готово, до подписания итогового акта.

Что проверяете: ровность покрытий и ширину швов, работу каждой точки электрики под нагрузкой, герметичность всех подводок после 24 часов эксплуатации, открывание и закрывание каждой двери и окна, уклоны в поддоне и у трапов, полноту герметиков и плинтусов.

**Как привязать платежи к приёмкам**

| Этап | Платёж |
|---|---|
| Аванс на старт | 20-25% |
| Приёмка коммуникаций до закрытия | 25-30% |
| Приёмка чернового этапа | 30-35% |
| Финальная приёмка | 10-15% |
| После гарантийного периода (30 дней) | 5% |

Последние 5%, удержанные на 30 дней после приёмки, — самый действенный пункт во всём договоре. Большинство монтажных дефектов проявляется в первый месяц эксплуатации, а удержанная сумма заставляет подрядчика вернуться и их исправить.

**Акт приёмки — что в нём должно быть**

Дата, перечень принятых работ, перечень дефектов со сроком устранения, подписи обеих сторон и фотографии. Акт без перечня дефектов означает приёмку без замечаний — и потерю основания для претензий по тому, что вы видели, но не записали.`,
      checklist: [
        'Пропишите в договоре три приёмки, а не одну в конце',
        'Не позволяйте закрывать коммуникации без протоколов замеров и опрессовки',
        'Сфотографируйте все трассы коммуникаций с рулеткой в кадре',
        'Купите уровень и правило 2 м — комплект за 250-450 PLN',
        'Проверьте отклонения: 3 мм под правилом 2 м для штукатурки, 5 мм на 2 м для стяжки',
        'Привяжите каждый платёж к конкретной приёмке, а не к прошедшему времени',
        'Удержите 5% оплаты на 30 дней после финальной приёмки',
        'Запишите в акт все дефекты со сроком их устранения',
      ],
      ctaText: 'Подготовиться к ремонту с полной сметой →',
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
    {
      slug: 'yak-porahuvaty-koshtorys-remontu',
      img: '/images/estimate-method.jpg',
      title: 'Як порахувати кошторис ремонту — метод із 7 кроків',
      description: 'Практична інструкція розрахунку кошторису: обмір, обсяг робіт, стандарт оздоблення, комунікації, матеріали, робота та резерв. З конкретними ставками ринку 2026.',
      cluster: 'budget',
      publishedAt: '2026-09-17',
      hook: 'Кошторис — це не одна цифра, помножена на метри. Це сім окремих рішень, кожне з яких зсуває бюджет на десятки тисяч злотих, — і всі їх можна ухвалити за столом, до того як хтось вийде на об’єкт.',
      problem: `Найчастіша помилка при розрахунку ремонту — починати з ціни за метр. Ставка 2 200 PLN/м² виглядає конкретно, але вона не каже, чи входить туди заміна проводки, яка плитка і чи врахована взагалі робота.

Результат: цифра виходить гарною, а реальність розходиться з нею на 30-50%. Не тому що ставка була хибною, а тому що було невідомо, що саме вона покриває.

Правильний кошторис збирається навпаки: від обсягу робіт до ціни, а не від ціни до обсягу.`,
      explanation: `**Крок 1 — обмір кожного приміщення окремо**

Запишіть довжину, ширину й висоту кожного приміщення. Звідси ви отримаєте три різні площі, потрібні окремо: підлога (довжина × ширина), стіни (периметр × висота мінус вікна й двері) і стеля. Площі з документів недостатньо: фарбування квартири 60 м² — це 170-200 м² стін і стель.

**Крок 2 — визначте обсяг робіт по кожному приміщенню**

Для кожного приміщення дайте відповідь: освіження, частковий чи повний ремонт? Різниця величезна. Освіження вітальні 20 м² — 6 000-11 000 PLN. Повний ремонт тієї ж вітальні із заміною підлог і комунікацій — 24 000-42 000 PLN.

**Крок 3 — зафіксуйте стандарт оздоблення**

Економічний, оптимальний чи преміум. Це множник від 0,75 до 1,8 на весь кошторис. Він не мусить бути однаковим усюди: преміальна ванна плюс спальні в економічному стандарті — найчастіший розумний компроміс.

**Крок 4 — оцініть комунікації**

Позиція, яку пропускають найчастіше. Заміна електрики у квартирі 60 м² — 9 000-18 000 PLN, сантехніки — 6 000-15 000 PLN. У будинках старших за 1995 рік закладайте заміну за замовчуванням, а не як опцію.

**Крок 5 — рахуйте матеріали із запасом**

До обміру додайте технологічний запас: плитка 10-15% (діагональ чи ялинка — до 20%), ламінат і дошка 7-10%, фарба 10%, клей і затирка за витратою виробника. Матеріали зазвичай становлять 45-60% бюджету.

**Крок 6 — застосуйте ставку свого міста**

База — Познань. Варшава ×1,25, Труймісто ×1,15, Краків і Вроцлав ×1,10, Лодзь ×0,92. Робота — це 35-45% бюджету, і саме вона найсильніше відрізняється між містами.

**Крок 7 — додайте резерв**

15% для квартири в доброму стані, 20-25% для будинку старшого за 1990 рік або коли невідомо, що під старими шарами. Резерв — не запас на розкіш, а стаття, яка реально витрачається.

**Метод, зібраний повністю**

58 м², Краків, оптимальний стандарт, будинок 1998 року, заміна електрики:
підготовка й демонтаж 7 200 PLN, комунікації 16 500 PLN, штукатурка й стяжки 12 800 PLN, оздоблення 31 400 PLN, оздоблювальні матеріали 24 900 PLN. Разом 92 800 PLN, плюс 18% резерву = **109 500 PLN**.

Та сама площа в Лодзі в економічному стандарті — близько 61 000 PLN. Різниця береться не з метрів, а з рішень на кроках 2, 3 і 4.`,
      checklist: [
        'Виміряйте кожне приміщення: довжина, ширина, висота, вікна, двері',
        'Випишіть три площі: підлога, стіни, стеля — вони потрібні окремо',
        'Визначте обсяг робіт по кожному приміщенню окремо',
        'Зафіксуйте стандарт оздоблення — це множник 0,75-1,8 на все',
        'Перевірте рік побудови і стан комунікацій до будь-яких розрахунків',
        'Додайте технологічний запас до кожного матеріалу (10-20%)',
        'Застосуйте множник свого міста до роботи',
        'Закладіть 15-25% резерву залежно від віку будинку',
      ],
      ctaText: 'Порахувати свій кошторис за 5 хвилин →',
    },
    {
      slug: 'vid-chogo-zalezhyt-vartist-remontu',
      img: '/images/cost-factors.jpg',
      title: 'Від чого залежить вартість ремонту — 9 факторів, що задають ціну',
      description: 'Чому та сама площа коштує 55 000 або 140 000 PLN. Дев’ять факторів, які реально визначають ціну ремонту, за силою впливу на підсумковий рахунок.',
      cluster: 'budget',
      publishedAt: '2026-10-01',
      hook: 'Дві квартири по 60 м², обидві у Варшаві, обидві ремонтувалися в один місяць. Одна обійшлася у 58 000 PLN, друга — у 141 000 PLN. Площа не пояснює в цій різниці нічого.',
      problem: `Питання скільки коштує ремонт 60 м² не має відповіді, бо площа — один із найслабших ціноутворювальних факторів. Метри кажуть, скільки треба зробити, але не кажуть, що саме і як.

Тому оцінки двох підрядників можуть відрізнятися вдвічі, і обидві будуть чесними: просто кожен заклав свій обсяг, свій стандарт і свій вихідний стан.

Нижче дев’ять факторів за силою впливу на підсумковий рахунок.`,
      explanation: `**1. Обсяг робіт — вплив до ×4**

Найсильніший фактор. Освіження (фарбування, дрібні поправки) — 350-700 PLN/м². Повний ремонт із заміною комунікацій, стяжок і всіх шарів — 2 000-4 500 PLN/м². Це не різниця стандарту, а різниця в тому, що ви взагалі робите.

**2. Стандарт оздоблення — вплив до ×2,4**

Економічний, оптимальний, преміум. Керамограніт за 45 PLN/м² і великоформатна плита за 340 PLN/м² лежать на одній підлозі й потребують різної роботи. Стандарт діє на матеріали й на роботу одночасно, тому множиться швидше, ніж здається.

**3. Стан комунікацій і вік будинку — вплив до +35%**

Будинок 1960-80-х: алюмінієва проводка, сталеві труби, відсутнє заземлення, перекриття з невідомою несучою здатністю. Заміна комунікацій у такій квартирі — 15 000-33 000 PLN, яких просто немає в будинку 2015 року.

**4. Місто — вплив до +36%**

Множники роботи 2026: Варшава ×1,25, Труймісто ×1,15, Краків ×1,12, Вроцлав ×1,10, Познань ×1,00, Лодзь ×0,92. Матеріали по країні коштують приблизно однаково — різницю робить виключно робота.

**5. Кількість приміщень за тієї самої площі — вплив до +25%**

60 м², поділені на 4 кімнати, коштують дорожче, ніж 60 м² у відкритому плануванні: більше поверхні стін, більше дверей, більше кутів, більше точок електрики. Метри ті самі, роботи більше.

**6. Частка ванних і кухні — вплив до +30%**

Це найдорожчі метри у квартирі: сантехніка, вентиляція, гідроізоляція, кераміка. Квартира з двома санвузлами суттєво дорожча за квартиру з одним за однакової площі.

**7. Зміна планування — вплив до +20%**

Знесення стіни — це не лише демонтаж: це експертиза (для несучих), перемичка, перенесення комунікацій, нова стяжка на місці стіни й відновлення стелі.

**8. Термін початку робіт — вплив до +15%**

Ремонт у сезон (березень-жовтень) дорожчий, і бригаду знайти важче. Той самий обсяг у січні часто дешевший на 8-15%, бо в бригад є вікна у графіку.

**9. Хто купує матеріали — вплив до +12%**

Матеріал через підрядника зазвичай із націнкою 10-20%, але підрядник відповідає за нестачу й підрізку. Свій матеріал дешевший, але ризик помилки в обмірі переходить на вас.

**Як цим користуватися**

Починайте з факторів 1-3 — на них припадає близько 70% розкиду цін. Тільки потім налаштовуйте решту. Оптимізувати стандарт за невизначеного обсягу робіт — це обирати оздоблення до того, як є стіни.`,
      checklist: [
        'Визначте обсяг робіт до питання про ціну — це фактор №1',
        'Задайте стандарт окремо для кожного приміщення',
        'Перевірте рік побудови і стан комунікацій — до +35% бюджету',
        'Застосовуйте множник міста до роботи, а не до матеріалів',
        'Рахуйте кількість приміщень і кутів, а не лише метри',
        'Оцініть ванні та кухню окремо — це найдорожчі метри',
        'Розгляньте старт поза сезоном: економія 8-15%',
        'Вирішіть, хто купує матеріали, і впишіть це в договір',
      ],
      ctaText: 'Дізнатися, скільки коштує ваш обсяг робіт →',
    },
    {
      slug: 'prykhovani-vytraty-na-remont',
      img: '/images/hidden-costs.jpg',
      title: 'Приховані витрати на ремонт — 14 статей, яких немає в кошторисі',
      description: 'Вивезення сміття, контейнер, електрика, зберігання меблів, орендоване житло, усунення недоліків і доведення після бригади. Повний список витрат поза кошторисом.',
      cluster: 'budget',
      publishedAt: '2026-10-15',
      hook: 'У кошторисі було 84 000 PLN. З рахунку пішло 112 000 PLN. Різниця — не прихована націнка підрядника, а чотирнадцять статей, яких ніхто не порахував, бо жодна з них не є ні роботою, ні оздоблювальним матеріалом.',
      problem: `Кошторис підрядника описує будівельні роботи. Ремонт — це суттєво більше, ніж будівельні роботи, а решта все одно виходить із того самого гаманця.

У цих статей спільна риса: кожна окремо виглядає дрібницею. 900 PLN за контейнер, 400 PLN за зберігання меблів, 1 200 PLN за міжкімнатні двері, про які забули. У сумі вони зазвичай дають 18-30% від вартості кошторису.

Нижче повний список у порядку того, як часто про них забувають.`,
      explanation: `**Навколо об’єкта**

**1. Вивезення сміття і контейнер** — 800-2 600 PLN. Контейнер 5 м³ у Варшаві коштує близько 900 PLN, при повному ремонті квартири їх потрібно два. Плюс винесення сміття з поверху, якщо немає вантажного ліфта.

**2. Захист неремонтованої частини** — 300-900 PLN. Плівка, скотч, захисні плити на підлогу в коридорі та на сходовій клітці.

**3. Погодження з управителем і застава** — 0-2 000 PLN. Багато будинків беруть заставу за користування ліфтом і сходами.

**4. Електрика й вода під час робіт** — 200-700 PLN. При повному ремонті з просушуванням і тепловими гарматами буває більше.

**Навколо вас**

**5. Орендоване житло на час ремонту** — 0-14 000 PLN. При повному ремонті це 2-3 місяці поза домом. Найбільш недооцінена стаття в усьому списку.

**6. Зберігання меблів** — 300-1 800 PLN. Склад формату self-storage, 8-14 м³ на 2-3 місяці.

**7. Транспорт і переїзд** — 600-2 500 PLN, рахуючи в обидва боки.

**Це ремонт, але цього немає в кошторисі**

**8. Міжкімнатні двері з установкою** — 900-2 600 PLN за штуку. На чотири приміщення це 4 000-10 000 PLN.

**9. Освітлення та електроустановчі вироби** — 2 000-9 000 PLN. Світильники, розетки, вимикачі, LED-стрічки з блоками живлення.

**10. Сантехніка й кераміка** — 3 000-25 000 PLN. Змішувачі, унітаз, раковина, душова чи ванна. Майже завжди поза кошторисом на роботи.

**11. Карнизи, рулонні штори, москітні сітки** — 800-4 500 PLN.

**12. Прибирання після ремонту** — 400-1 400 PLN. Будівельний пил потребує трьох проходів, а не одного.

**Після завершення**

**13. Усунення недоліків** — 500-3 000 PLN. Навіть у доброї бригади частина дефектів проявляється через місяць експлуатації.

**14. Доведення після бригади** — 1 000-5 000 PLN. Герметики, плінтуси, пороги, регулювання дверей, дрібне підфарбовування.

**Скільки це в сумі**

Для квартири 58 м² в оптимальному стандарті за кошторису 84 000 PLN реальний діапазон цих статей — **16 000-31 000 PLN**. Навіть в економному варіанті, без орендованого житла, виходить близько 12 000 PLN.

Тому резерв 15-20% — це не обережність, а просто коректно порахована решта ремонту.`,
      checklist: [
        'Закладіть у бюджет контейнер і вивезення сміття — 800-2 600 PLN',
        'Порахуйте вартість орендованого житла на 2-3 місяці',
        'Додайте зберігання меблів і транспорт в обидва боки',
        'Оцініть міжкімнатні двері окремо — 900-2 600 PLN за штуку',
        'Закладіть бюджет на сантехніку, кераміку й освітлення',
        'Уточніть, чи бере будинок заставу за ліфт і сходи',
        'Відкладіть 400-1 400 PLN на прибирання після ремонту',
        'Залиште 1 000-5 000 PLN на недоліки й доведення після бригади',
      ],
      ctaText: 'Порахувати кошторис із повним бюджетом →',
    },
    {
      slug: 'pomylky-brygad-pry-otsintsi-remontu',
      img: '/images/contractor-estimate-errors.jpg',
      title: 'Помилки бригад при оцінці ремонту — чому підрядник промахується на 30%',
      description: 'Чому оцінки ремонтних бригад регулярно розходяться з реальністю. Десять механізмів, через які підрядник занижує вартість, і питання, що це виявляють.',
      cluster: 'contractors',
      publishedAt: '2026-10-29',
      hook: 'Підрядник не бреше, коли називає 84 000 PLN, а завершує на 112 000 PLN. Він справді так порахував. Проблема в тому, як порахував, — і це можна перевірити за п’ятнадцять хвилин.',
      problem: `Ремонтна бригада — це будівельна команда, а не кошторисний відділ. Люди, які чудово кладуть плитку, рідко мають інструменти й час для повноцінного обміру. Оцінка складається між двома об’єктами, найчастіше ввечері, за підсумками двадцятихвилинного візиту.

Це не злий намір. Це структурна особливість ринку: складання кошторису — витрата підрядника, а не послуга, за яку хтось платить. Чим швидше вона зроблена, тим краще для нього.

Нижче десять механізмів, через які така оцінка систематично виходить заниженою.`,
      explanation: `**1. Оцінка на око, без обміру**

Візит триває 20 хвилин, підрядник ходить квартирою і прикидає. Не міряє висоту, не рахує периметр стін, не рахує кількість кутів. Похибка самого лише обміру зазвичай 10-18%.

**2. Якір із попереднього об’єкта**

Минула квартира 55 м² коштувала 78 000 PLN, отже ці 58 м² оцінюю у 82 000 PLN. Площа схожа, але рік побудови, стан комунікацій і планування можуть бути зовсім іншими.

**3. Ніхто не заглядає під старі шари**

Під плиткою буває волога стяжка, під ламінатом розтріскана основа, у стіні алюмінієвий провід. Доки не почався демонтаж, це вгадування — і вгадують оптимістично.

**4. Розрахунок за площею підлоги, коли робота на стінах**

Класика. У квартирі 60 м² є 170-200 м² стін і стель. Оцінка за 60 м² занижує фарбування, штукатурку й ґрунтування на порядок.

**5. Свідоме заниження, щоб виграти замовлення**

Підрядник знає, що клієнт порівняє три цифри й обере меншу. Додаткові роботи прийдуть пізніше, коли змінити бригаду буде практично неможливо.

**6. В оцінці немає логістики**

Четвертий поверх без ліфта, вузькі сходи, заборона паркування біля під’їзду, ніде поставити контейнер. Кожне з цих обмежень реально додає 4-9% до роботи — і майже ніколи не потрапляє в оцінку.

**7. Підготовка й прибирання поза оцінкою**

Демонтаж, захист плівкою, винесення сміття, прибирання між етапами. Для квартири 60 м² це 4 000-11 000 PLN робіт, які хтось усе одно виконає і за які хтось усе одно заплатить.

**8. Матеріали без технологічного запасу**

Плитка порахована рівно за метрами приміщення, без 10-15% на підрізку. Плитку, якої бракує, докуповують з іншої партії, іншого відтінку, — і тоді додається ще й вартість переробки.

**9. Оцінка від березня, застосована у вересні**

Термін дії оцінки зазвичай 14-30 днів, але ремонти починаються через 2-4 місяці після розмови. За зростання ставок на 12-18% на рік це саме собою дає різницю 3-6%.

**10. Немає рядка на непередбачене**

У нормальному кошторисі є рядок резерву. У комерційній оцінці його немає, бо він підняв би цифру внизу сторінки, — а саме ця цифра виграє замовлення.

**П’ять питань, які виявляють усі десять**

1. Яку площу стін ви порахували? (якщо відповідь 60 м² — поверніться до пункту 4)
2. Що буде, якщо під плиткою виявиться волога стяжка?
3. Чи входить у ціну вивезення сміття й контейнер?
4. Який відсоток запасу на підрізку закладено по плитці?
5. До якої дати діє ця оцінка?

Підрядник, який конкретно відповідає на всі п’ять, рахував сумлінно. Підрядник, який відмахується від трьох, тільки почне рахувати — за ваш рахунок.`,
      checklist: [
        'Запитайте про пораховану площу стін, а не підлоги',
        'Перевірте, чи підрядник узагалі міряв, чи прикидав на око',
        'Пропишіть, що відбувається при знахідках під старими шарами',
        'Підтвердьте, що вивезення сміття й контейнер входять у ціну',
        'Запитайте відсоток технологічного запасу по матеріалах',
        'Звірте термін дії оцінки з планованою датою старту',
        'Опишіть обмеження логістики: поверх, ліфт, паркування',
        'Попросіть рядок резерву в кошторисі — його відсутність тривожний знак',
      ],
      ctaText: 'Порівняти оцінку бригади з незалежним кошторисом →',
    },
    {
      slug: 'obmir-i-zapas-materialiv',
      img: '/images/measuring-materials.jpg',
      title: 'Обмір і запас матеріалів — як рахувати, щоб не забракло і не залишилось',
      description: 'Як правильно обміряти приміщення і скільки технологічного запасу додати до плитки, ламінату, фарби та клеїв. З розбором розрахунку для ванної 6 м².',
      cluster: 'materials',
      publishedAt: '2026-11-12',
      hook: 'Забракло восьми плиток. Докуплені з іншої партії мають інший відтінок, отже перекладати всю стіну. Вартість однієї цієї помилки в обмірі: 2 400 PLN і чотири дні простою.',
      problem: `Обмір виглядає найпростішою частиною кошторису — виміряв і помножив. На практиці це місце, де виникає найбільше дорогих помилок, бо кожен матеріал рахується у своїй одиниці й зі своїм запасом.

Три найчастіші помилки: рахувати все за площею підлоги, пропускати технологічний запас і віднімати вікна й двері там, де цього робити не треба.`,
      explanation: `**Три площі, які вам потрібні**

**Підлога** = довжина × ширина. За нею рахують: стяжку, ламінат, керамограніт, ізоляцію, теплу підлогу.

**Стіни** = периметр × висота. За ними рахують: штукатурку, шпаклівку, фарбу, шпалери, настінну плитку. Периметр — це 2 × (довжина + ширина).

**Розгорнута площа** = стіни + стеля. За нею рахують фарбування й ґрунтування. Для квартири 60 м² це зазвичай 170-200 м².

**Коли віднімати вікна й двері**

Для фарби і штукатурки віднімайте отвори більші за 2 м². Для плитки не віднімайте нічого меншого за 1 м² — підрізка навколо невеликого отвору все одно з’їдає матеріал. Для ламінату не віднімайте ні пороги, ні ніші.

**Технологічний запас — таблиця**

| Матеріал | Просте розкладання | Складне розкладання |
|---|---|---|
| Плитка, керамограніт | 10% | 15-20% (діагональ, ялинка) |
| Великоформатні плити | 12% | 20-25% |
| Ламінат, дошка | 7% | 10-12% (під кутом, ялинка) |
| Шпалери з малюнком | 15% | 20% (великий раппорт) |
| Фарба | 10% | 15% (сильна зміна кольору) |
| Плінтуси, молдинги | 8% | 10% |

**Матеріали, що рахуються за витратою, а не за площею**

Плитковий клей: 3-6 кг/м² залежно від формату й гребінки. Ґрунтовка: 0,1-0,2 л/м². Затирка: 0,3-1,2 кг/м² залежно від ширини шва й формату плитки. Завжди звіряйте витрату на упаковці — різниця між виробниками сягає 40%.

**Розбір: ванна 6 м²**

Розміри 2,0 × 3,0 м, висота 2,6 м. Плитка на підлозі й на стінах до стелі.

Підлога: 2,0 × 3,0 = 6,0 м². Плюс 10% = **6,6 м²**.
Стіни: периметр 2 × (2,0 + 3,0) = 10 м; 10 × 2,6 = 26,0 м². Двері 1,7 м² віднімаємо, вікна немає. 24,3 м², плюс 12% = **27,2 м²**.
Разом плитки: 33,8 м². Купуються цілі упаковки, отже реально 34-35 м².
Клей: 34 × 4,5 кг = **153 кг** (7 мішків по 25 кг).
Затирка: 34 × 0,6 = **20,4 кг**.

**Правило, яке економить найбільше**

Купуйте весь матеріал з однієї виробничої партії одразу. Номер партії вказано на упаковці. Докупити два метри через місяць майже завжди означає інший відтінок — і перекладання всієї поверхні замість додавання двох метрів.`,
      checklist: [
        'Рахуйте три площі окремо: підлога, стіни, розгорнута',
        'Віднімайте отвори лише більші за 2 м² і лише для фарби та штукатурки',
        'Додавайте запас за розкладанням: просте 10%, ялинка чи діагональ 15-20%',
        'Звіряйте витрату клею, ґрунтовки й затирки на упаковці виробника',
        'Замовляйте цілі упаковки із заокругленням угору',
        'Купуйте весь матеріал з однієї виробничої партії',
        'Запишіть номер партії на випадок рекламації чи докупівлі',
        'Залиште 2-3 м² плитки на майбутній ремонт',
      ],
      ctaText: 'Порахувати матеріали для своєї квартири →',
    },
    {
      slug: 'rezerv-u-koshtorysi-remontu',
      img: '/images/budget-reserve.jpg',
      title: 'Резерв у кошторисі ремонту — скільки закладати і куди він реально йде',
      description: 'Який відсоток резерву планувати залежно від віку будинку, на що ці гроші фактично витрачаються і як керувати резервом, щоб він не закінчився на середині.',
      cluster: 'budget',
      publishedAt: '2026-11-26',
      hook: 'Резерв — це не фонд на розкіш, яку ви ще не обрали. Це стаття, що в 4 ремонтах із 5 витрачається повністю, і майже завжди на те, що неможливо було побачити до демонтажу.',
      problem: `Найчастіший підхід до резерву звучить так: додам 10% про всяк випадок. Це і мало, і не в тому місці.

Мало, бо медіана перевищення бюджету на польському ринку — 18-24%. Не в тому місці, бо резерв, дописаний наприкінці, сприймається як буфер на апгрейд — плитка краща, змішувач дорожчий — і зникає до того, як з’явиться справжня проблема.

Резерв — це стаття кошторису, а не заокруглення вгору.`,
      explanation: `**Скільки закладати — за віком будинку й обсягом робіт**

| Ситуація | Резерв |
|---|---|
| Квартира від забудовника, чорнове оздоблення | 10-12% |
| Будинок після 2010, частковий ремонт | 12-15% |
| Будинок 1995-2010, повний ремонт | 15-18% |
| Будинок 1970-1995 | 20-25% |
| Будинок до 1970 або старий фонд | 25-35% |
| Перепланування з несучими стінами | +5% до вказаного |

**Куди реально йде — дані ринку**

**Знахідки під старими шарами (35-45% витраченого резерву).** Волога стяжка, розтріскана основа, грибок за коробом, стара ізоляція без пароізоляції.

**Комунікації гірші, ніж передбачалося (20-30%).** Алюміній замість міді, відсутнє заземлення, сталеві труби з відкладеннями, негерметичні підводки.

**Геометрія конструкції (10-15%).** Стіни з відхиленням 3-5 см по висоті, підлоги з ухилом, стелі різної висоти. Кожен сантиметр вирівнювання — це матеріал і робота.

**Зміна рішень у процесі (10-15%).** Єдина частина, на яку ви впливаєте повністю.

**Затримки й простої (5-10%).** Довша оренда житла, повторний транспорт, повторний вихід бригади.

**Як керувати резервом, щоб його вистачило**

**Правило перше: не чіпайте резерв до 60% готовності робіт.** Більшість дорогих знахідок розкривається в першій половині ремонту — на демонтажі й комунікаціях. Якщо на цей момент резерв не зачеплено, далі ризик швидко падає.

**Правило друге: апгрейд — це не резерв.** Хочете плитку дорожче? Це зміна стандарту, що фінансується окремим рішенням, а не з рядка на непередбачене.

**Правило третє: фіксуйте кожне звернення до резерву.** Дата, сума, причина, фото. Це водночас документація при спорі з підрядником і реальний контроль над залишком.

**Правило четверте: невитрачений резерв — не економія, яку треба витратити наприкінці.** Приблизно у 20% ремонтів резерв справді залишається. Тоді це бюджет на облаштування — але після фінального приймання, а не в середині робіт.

**Скільки це в цифрах**

Квартира 58 м², будинок 1978 року, повний ремонт, кошторис робіт 92 000 PLN. Резерв 22% = 20 240 PLN. Реальний бюджет: **112 240 PLN**. Саме цю цифру ви називаєте банку і саме її забезпечуєте — а не 92 000 PLN.`,
      checklist: [
        'Підбирайте відсоток резерву під вік будинку, а не під свій оптимізм',
        'Впишіть резерв окремим рядком кошторису, а не заокругленням',
        'Не чіпайте резерв до 60% готовності робіт',
        'Фінансуйте зміни стандарту окремо — це не непередбачене',
        'Фіксуйте кожне звернення до резерву: дата, сума, причина, фото',
        'При переплануванні з несучими стінами додайте ще 5%',
        'Банку називайте суму з резервом, а не один кошторис робіт',
        'Залишковий резерв витрачайте лише після фінального приймання',
      ],
      ctaText: 'Порахувати кошторис разом із резервом →',
    },
    {
      slug: 'pidgotovchi-roboty-i-demontazh',
      img: '/images/prep-works.jpg',
      title: 'Підготовчі роботи й демонтаж — 8-14% бюджету, які ніхто не рахує',
      description: 'Демонтаж, вивезення сміття, захист квартири та прибирання між етапами. Скільки це реально коштує, як порахувати обсяг сміття і чому ця стаття зникає з оцінок.',
      cluster: 'budget',
      publishedAt: '2026-12-10',
      hook: 'До того як хтось покладе першу плитку, квартиру треба розібрати, винести, вивезти й захистити. Це 8-14% бюджету і в середньому два тижні графіка — стаття, якої немає на жодній фотографії з ремонту.',
      problem: `Підготовчим роботам не пощастило: після них не залишається нічого, що можна показати. Ніхто не фотографує порожню квартиру після демонтажу. Тому в розмовах про ремонт цей етап зникає, а в оцінках з’являється одним рядком невизначеного змісту або не з’являється взагалі.

При цьому він створює реальні витрати, потребує техніки й людей, і його неможливо пропустити. Для квартири 60 м² ідеться про 4 000-11 000 PLN.`,
      explanation: `**З чого складається цей етап**

**Демонтаж покриттів** — збивання плитки 28-55 PLN/м², зняття ламінату 12-22 PLN/м², видалення шпалер 10-18 PLN/м², збивання штукатурки 30-60 PLN/м².

**Демонтаж обладнання** — сантехніка 250-700 PLN за комплект, вбудована кухня 400-1 200 PLN, міжкімнатні двері 80-160 PLN за штуку, вікна 200-450 PLN за штуку.

**Розбирання стін** — перегородка з цегли 90-170 PLN/м², з гіпсокартону 35-60 PLN/м². Несуча стіна — окрема категорія: потрібна експертиза (1 500-4 000 PLN) і перемичка.

**Демонтаж стяжки** — 45-90 PLN/м². Стаття, що з’являється лише тоді, коли під старою підлогою виявляється розтріскана основа.

**Винесення й вивезення** — 40-90 PLN за м³ при винесенні з поверху без ліфта, контейнер 5 м³ 700-1 100 PLN, 7 м³ 900-1 500 PLN.

**Захист** — плівка, скотч, плити на підлогу в неремонтованій частині, захист сходової клітки й ліфта: 300-900 PLN.

**Прибирання між етапами** — 150-400 PLN за раз. При повному ремонті потрібне 3-4 рази, а не лише наприкінці.

**Як порахувати обсяг сміття**

Сміття рахується в м³, а не в мішках. Орієнтовні перерахунки:

| Матеріал | Вага | Обсяг сміття |
|---|---|---|
| Плитка зі стіни, 1 м² | 18-25 кг | 0,015 м³ |
| Стяжка 5 см, 1 м² | 100-120 кг | 0,05 м³ |
| Перегородка з цегли, 1 м² | 180-260 кг | 0,12 м³ |
| Збита штукатурка, 1 м² | 25-40 кг | 0,02 м³ |

Квартира 60 м² з повним демонтажем ванної, кухні й підлог зазвичай дає 6-11 м³ сміття, тобто два контейнери.

**Три речі, що піднімають цю статтю найсильніше**

**Відсутність вантажного ліфта.** Винесення сміття сходами з 4-го поверху піднімає вартість вивезення на 60-120%.

**Заборона ставити контейнер біля під’їзду.** Тоді сміття вивозять у біг-бегах, що дорожче на 30-50%.

**Відходи, що потребують окремої утилізації.** Гіпсокартон, мінеральна вата, матеріали з азбестом (будинки 1960-1990). Азбест — окрема ліцензована процедура, 60-150 PLN/м².

**Чому це зникає з оцінок**

Бо знижує цифру внизу сторінки і не звучить як ремонт. Клієнт порівнює три пропозиції й обирає ту, де немає рядка демонтаж і вивезення, не помічаючи, що робота все одно буде виконана, лише оплачена пізніше як додаткова.`,
      checklist: [
        'Порахуйте обсяг сміття в м³, а не в мішках',
        'Уточніть, чи є вантажний ліфт і де стане контейнер',
        'Оцініть демонтаж окремо за кожним видом покриття',
        'Для будинку 1960-1990 перевірте матеріали на наявність азбесту',
        'Заплануйте 3-4 прибирання між етапами, а не одне наприкінці',
        'Захистіть неремонтовану частину, сходи й ліфт',
        'Для несучої стіни замовте експертизу до оцінки демонтажу',
        'Впишіть демонтаж і вивезення в договір окремими позиціями',
      ],
      ctaText: 'Порахувати кошторис із підготовчими роботами →',
    },
    {
      slug: 'elektryka-i-santehnika-v-koshtorysi',
      img: '/images/electrics-plumbing.jpg',
      title: 'Електрика й сантехніка — 15-25% бюджету ремонту',
      description: 'Коли заміна комунікацій обов’язкова, скільки коштує точка електрики й підводка, і чому це єдина частина ремонту, на якій не можна економити.',
      cluster: 'budget',
      publishedAt: '2026-12-24',
      hook: 'Комунікації — єдина частина ремонту, яку не видно після завершення, і єдина, виправлення якої вимагає зруйнувати все, що зверху. Тому тут порядок робіт важливіший за ціну.',
      problem: `Електрика й сантехніка забирають 15-25% бюджету і не залишають після себе нічого видимого. Є спокуса підрізати саме тут — залишити старий провід, замінити лише видимі труби, додати лінію пізніше.

Проблема в тому, що комунікації розташовані під штукатуркою, під стяжкою і під плиткою. Будь-яке їх виправлення після ремонту означає демонтаж оздоблювальних шарів, тобто вартість у 3-6 разів вищу, ніж зробити одразу.`,
      explanation: `**Коли заміна обов’язкова, а не опційна**

**Електрику міняємо, якщо:**
- будинок збудовано до 1995 року (алюміній замість міді),
- немає заземлення і пристрою захисного вимкнення,
- переріз проводу на розеткових лініях 1,5 мм²,
- у щитку пробки, а не автомати,
- планується індукційна плита, кондиціонер або тепла підлога.

**Сантехніку міняємо, якщо:**
- труби сталеві оцинковані (типово до 90-х),
- тиск падає при одночасному розборі у двох точках,
- видно корозію на з’єднаннях або сліди вологи біля стояків,
- змінюється планування ванної чи кухні.

**Скільки це коштує — ставки 2026**

| Позиція | Ціна |
|---|---|
| Точка електрики (розетка, вимикач) | 120-260 PLN |
| Точка освітлення | 140-300 PLN |
| Виділена лінія (плита, духовка) | 350-700 PLN |
| Щиток з автоматикою | 1 800-4 500 PLN |
| Водна підводка (гаряча й холодна) | 380-750 PLN |
| Каналізаційна підводка | 300-650 PLN |
| Перенесення стояка | 1 500-4 000 PLN |
| Заміри й протокол | 400-900 PLN |

**Скільки точок потрібно реально**

Квартира 58 м² за стандартами 2026 року: 38-52 точки електрики. Вітальня 12-16, кухня 14-20 (з виділеними лініями), спальня 6-9, ванна 5-8, передпокій 4-6.

Для порівняння: у квартирі 80-х зазвичай 12-18 точок на всю площу. Звідси й береться різниця в оцінці, а не з ціни проводу.

**Приклад розрахунку для 58 м²**

Повна заміна електрики: 45 точок × 180 PLN = 8 100 PLN, щиток 2 800 PLN, виділені лінії 3 × 500 PLN = 1 500 PLN, заміри 600 PLN. Разом **13 000 PLN**.

Сантехніка: 6 водних підводок × 550 PLN = 3 300 PLN, 4 каналізаційні × 450 PLN = 1 800 PLN, розведення й матеріал 3 500 PLN. Разом **8 600 PLN**.

Комунікації разом: **21 600 PLN** за загального кошторису 92 000 PLN, тобто 23%.

**Порядок, який неможливо розвернути**

Електрика й сантехніка мають бути готові та прийняті **до** штукатурки й стяжки. Тепла підлога вкладається до стяжки. Вентиляція — до підвісної стелі. Розворот цього порядку означає демонтаж уже зробленого.

Завжди вимагайте протокол електричних замірів і опресування водної системи до закриття. Це два аркуші паперу, які при спорі коштують десятки тисяч злотих.`,
      checklist: [
        'Перевірте рік побудови — до 1995 закладайте заміну електрики за замовчуванням',
        'Порахуйте потрібну кількість точок до запиту оцінки',
        'Заплануйте виділені лінії для плити, духовки й кондиціонера',
        'Робіть комунікації до штукатурки й стяжки, а не після',
        'Вимагайте протокол електричних замірів до закриття',
        'Вимагайте опресування водної системи до закриття',
        'Сфотографуйте всі траси до штукатурки',
        'Не діліть заміну комунікацій на етапи — це найдорожчий компроміс',
      ],
      ctaText: 'Порахувати вартість комунікацій у своїй квартирі →',
    },
    {
      slug: 'koshtorys-novobudova-chy-vtorynne-zhytlo',
      img: '/images/new-vs-resale.jpg',
      title: 'Кошторис: новобудова чи вторинне житло — чим вони реально відрізняються',
      description: 'Чому та сама площа коштує по-різному в чорновому оздобленні та у вторинному житлі. Порівняння постатейно і різниця в потрібному резерві.',
      cluster: 'property',
      publishedAt: '2027-01-07',
      hook: 'Квартира від забудовника і квартира 1985 року, обидві 58 м², обидві під повне оздоблення. Перша: 78 000 PLN з резервом 11%. Друга: 112 000 PLN з резервом 22%. Різниця лежить не там, де ви на неї чекаєте.',
      problem: `Поширене переконання звучить так: квартира від забудовника дорожча в оздобленні, бо все треба робити з нуля. Це правда лише наполовину.

Так, у чорновому оздобленні немає нічого — але там і нема чого прибирати, немає сюрпризів під шарами, комунікації нові й відповідають нормам, а стіни у вертикалі. Це три цілі категорії витрат, які у вторинному житлі з’являються завжди.

Нижче порівняння постатейно.`,
      explanation: `**Порівняння кошторису, 58 м², оптимальний стандарт**

| Позиція | Чорнове оздоблення | Вторинне житло 1985 |
|---|---|---|
| Демонтаж і вивезення | 0-900 PLN | 6 500-11 000 PLN |
| Електрика | 9 000-13 000 PLN | 12 000-18 000 PLN |
| Сантехніка | 5 500-8 500 PLN | 8 000-15 000 PLN |
| Штукатурка й шпаклівка | 8 000-12 000 PLN | 11 000-17 000 PLN |
| Стяжки | 5 000-8 000 PLN | 6 000-13 000 PLN |
| Оздоблення й матеріали | 42 000-56 000 PLN | 42 000-56 000 PLN |
| **Разом роботи** | **70 000-98 000 PLN** | **86 000-130 000 PLN** |
| Рекомендований резерв | 10-12% | 20-25% |

**Що дорожче в чорновому оздобленні**

**Обсяг робіт з нуля.** Уся штукатурка, усі стяжки, електрика й сантехніка в повному обсязі — нічого не можна залишити.

**Того, чого немає взагалі.** Міжкімнатні двері, підвіконня, іноді радіатори, усе освітлення, усі покриття.

**Масштаб закупівлі матеріалів.** Купується все одразу, тому одноразова витрата більша, навіть якщо підсумок зіставний.

**Що дорожче у вторинному житлі**

**Демонтаж і вивезення.** 6 500-11 000 PLN, яких у новій квартирі просто немає.

**Сюрпризи.** Волога, грибок, розтріскана основа, алюміній у стінах, протікання стояків. Саме тому резерв зростає з 11% до 22%.

**Вирівнювання геометрії.** Стіни в панельних будинках відхиляються на 3-5 см по висоті поверху. Кожен сантиметр вирівнювання — це матеріал і робота по всій площі.

**Технічні обмеження.** Стояки у фіксованих місцях, природна вентиляція, обмежена потужність вводу, погодження з управителем.

**Дві речі, специфічні для новобудов**

**Усадка та деформації.** У перші 12-24 місяці після здачі будинку з’являються мікротріщини на стиках. Це не брак, а нормальна робота конструкції, — але це варто врахувати при виборі оздоблення (еластичні склади на стиках, обережність із великоформатними плитами на перегородках).

**Технологічна вологість.** Свіжа штукатурка й стяжка віддають вологу 4-8 тижнів. Укладання паркету на невитриману стяжку — найчастіша дорога помилка в новобудовах.

**Практичний висновок**

Чорнове оздоблення дорожче в статті оздоблення й дешевше в статті ризик. Вторинне житло — навпаки. Якщо ви порівнюєте дві квартири перед купівлею, рахуйте окремо: вартість робіт і потрібний резерв. Сума цих двох цифр, а не одна оцінка робіт, і є тим, що ви реально витратите.`,
      checklist: [
        'Рахуйте вартість робіт і резерв окремо — вони відрізняються вдвічі',
        'У чорновому оздобленні додайте двері, підвіконня й освітлення',
        'У вторинному житлі завжди закладайте демонтаж і вивезення: 6 500-11 000 PLN',
        'Перевірте рік побудови і тип конструкції до розрахунку штукатурки',
        'У новому будинку дайте стяжкам 4-8 тижнів на висихання',
        'У панельному будинку перевірте відхилення стін від вертикалі',
        'Уточніть в управителя допустимі втручання в комунікації',
        'При купівлі порівнюйте квартири за сумою: ціна плюс ремонт плюс резерв',
      ],
      ctaText: 'Порівняти кошторис для обох варіантів →',
    },
    {
      slug: 'remont-etapamy-yak-rozbyty',
      img: '/images/phased-renovation.jpg',
      title: 'Ремонт етапами — як розбити роботи і скільки це реально коштує',
      description: 'Коли поділ ремонту на етапи має сенс, що не можна ділити ніколи і скільки коштує повторний вихід бригади. З розбором поділу квартири 58 м² на три етапи.',
      cluster: 'budget',
      publishedAt: '2027-01-21',
      hook: 'Поділ ремонту на етапи — не економія, а перенесення витрати в часі з доплатою 12-20%. Але в деяких ситуаціях це все одно найкраще з доступних рішень.',
      problem: `Найчастіша причина ділити ремонт на етапи проста: бюджету вистачає на половину обсягу. Друга причина: немає де жити три місяці.

Обидві цілком розумні. Проблема починається тоді, коли межа між етапами проходить не в тому місці, — і другий етап починається зі зруйнування частини першого.

Поділ безпечний лише вздовж ліній, які не перетинають комунікації й шари підлоги.`,
      explanation: `**Скільки коштує сам поділ**

Кожен повторний вихід бригади — це витрата на мобілізацію: транспорт інструменту, повторний захист частини квартири, повторна підготовка робочого місця, повторний запуск замовлень матеріалу.

| Позиція | Вартість другого виходу |
|---|---|
| Мобілізація бригади | 800-2 500 PLN |
| Повторний захист | 300-800 PLN |
| Нове замовлення матеріалів | +5-10% до ціни матеріалу |
| Зростання ставок рік до року | +12-18% на етапі через рік |
| Повторне прибирання | 300-700 PLN |

На практиці поділ на два етапи з інтервалом у рік піднімає загальну вартість на **12-20%**.

**Що не можна ділити ніколи**

**Електрику й сантехніку.** Їх роблять по всій квартирі одразу або не роблять узагалі. Додати лінію через рік — означає збивати штукатурку й плитку у вже оздоблених приміщеннях.

**Стяжку на одному рівні.** Стяжка, залита у два терміни, має шов, перепад висоти й різний час витримки. Підлога, що проходить через поріг, відрізнятиметься.

**Мокрі зони, пов’язані одним стояком.** Ванна й кухня на спільному стояку мають робитися разом — інакше ви платите двічі за доступ до того самого стояка.

**Штукатурку на спільних стінах.** Стіна між вітальнею і спальнею, оштукатурена у два етапи, матиме видимий перехід.

**Де проходить безпечна межа**

Уздовж дверей приміщення, яке зачиняється і не ділить з рештою квартири ні стояк, ні стяжку на одному рівні. Практично це означає: спальні, кабінет, дитяча — так. Ванна, кухня, коридор — ні.

**Приклад поділу квартири 58 м²**

**Етап 1 (обов’язковий, 2-3 місяці) — 62 000 PLN.** Уся електрика й сантехніка по квартирі, усі стяжки, уся штукатурка, повне оздоблення ванної, кухні й коридору. Це частина, яку не можна розбити.

**Етап 2 (через 8-14 місяців) — 21 000 PLN.** Вітальня: підлога, фарбування, освітлення, двері.

**Етап 3 (ще через 6-12 місяців) — 17 000 PLN.** Дві спальні: підлоги, фарбування, двері, шафи.

Сума етапів: 100 000 PLN проти 87 000 PLN при одноразовому ремонті. Доплата за розтягування в часі: **13 000 PLN**.

**Як жити під час робіт**

Якщо ви живете у квартирі під час етапу 2 чи 3, додайте: пилозахисну завісу з блискавкою (150-400 PLN), тимчасову кухню, щоденне прибирання. І вважайте, що етап триватиме в 1,5 раза довше, ніж у порожній квартирі, — бригада працює повільніше, коли щовечора закриває ділянку.

**Коли поділ справді вигідний**

Коли альтернатива — кредит на суму, якої бракує. За ставки вище 8% вартість кредиту на 25 000 PLN за три роки перевищує доплату за етапність. Тоді розтягування в часі — просто дешевше фінансування.`,
      checklist: [
        'Зробіть усю електрику й сантехніку на першому етапі, без винятків',
        'Не діліть стяжку на одному рівні між етапами',
        'Ванну й кухню на спільному стояку робіть в один етап',
        'Межу етапу проводьте вздовж дверей приміщення, що зачиняється',
        'Додайте 12-20% до загальної суми за розтягування в часі',
        'Закладіть 800-2 500 PLN на кожен повторний вихід бригади',
        'Якщо живете у квартирі, додайте 50% до тривалості етапу',
        'Порівняйте доплату за етапність із вартістю кредиту на всю суму',
      ],
      ctaText: 'Порахувати кошторис для кожного етапу →',
    },
    {
      slug: 'vartist-remontu-kuhni-2027',
      img: '/images/kitchen-renovation.jpg',
      title: 'Вартість ремонту кухні 2027 — ціна за м² і з чого вона складається',
      description: 'Актуальні ціни ремонту кухні в Польщі. Діапазони для трьох стандартів, розбивка на комунікації, вентиляцію, фартух і оздоблення — без меблів і техніки.',
      cluster: 'rooms',
      publishedAt: '2027-02-04',
      hook: 'Кухня 10 м² може коштувати стільки ж, скільки вітальня 25 м². Не тому що вона гарніша, а тому що на цих десяти метрах одночасно зустрічаються чотири напрями робіт.',
      problem: `Після ванної кухня — друге за вартістю приміщення в перерахунку на квадратний метр. Причина технічна, а не естетична.

На невеликій площі треба розмістити: виділені лінії для плити й духовки, водні та каналізаційні підводки для мийки й посудомийної машини, механічну вентиляцію для витяжки, вологостійке оздоблення робочої зони й підлогу, що витримує навантаження від меблів.

Кожна з цих речей — окрема бригада й окремий етап, і всі вони мають бути готові до приїзду меблевого монтажу, який уже не можна перенести.`,
      explanation: `**Ціни ремонту кухні 2027 — без меблів і техніки**

**Економічний стандарт — 700-1 300 PLN/м²**
Збереження наявної схеми комунікацій, фарбування стін, фартух із базової плитки, вінілове покриття чи керамограніт нижнього сегмента, заміна точок електрики без нових ліній. Кухня 10 м²: **7 000-13 000 PLN**.

**Оптимальний стандарт — 1 400-2 400 PLN/м²**
Нові виділені лінії, перенесення водних підводок у межах приміщення, механічна вентиляція з відводом, фартух із керамограніту чи скла, керамограніт на підлозі, шпаклівка стін. Кухня 10 м²: **14 000-24 000 PLN**.

**Преміум-стандарт — 2 600-4 500 PLN/м²**
Повна заміна комунікацій, перенесення стояка чи зміна планування, великоформатні плити на фартуху й підлозі, багатозонне LED-освітлення, тепла підлога, вентиляція з рекуперацією. Кухня 10 м²: **26 000-45 000 PLN**.

**Що ховається за цими сумами — розбивка для 10 м², оптимальний стандарт**

| Позиція | Вартість |
|---|---|
| Демонтаж старої кухні й покриттів | 1 200-2 400 PLN |
| Електрика: 16 точок + 3 виділені лінії | 4 400-6 800 PLN |
| Сантехніка: мийка, посудомийка, можливо пральна | 1 800-3 200 PLN |
| Механічна вентиляція з каналом | 900-2 200 PLN |
| Штукатурка, шпаклівка, фарбування | 2 200-3 600 PLN |
| Фартух (матеріал + робота) | 1 400-3 400 PLN |
| Підлога з керамограніту з вирівнювальною стяжкою | 2 400-4 200 PLN |
| **Разом** | **14 300-25 800 PLN** |

**Чого немає в цих цифрах**

Меблевий монтаж 12 000-60 000 PLN, побутова техніка 6 000-35 000 PLN, стільниця 1 500-14 000 PLN залежно від матеріалу (ламінат, композит, керамограніт), мийка й змішувач 800-4 500 PLN. Реальний бюджет кухні під ключ зазвичай у **2,5-3 рази** більший за вартість самих ремонтних робіт.

**Чотири помилки, що коштують найдорожче**

**1. Замовлення меблів до оздоблення стін.** Меблі, виміряні по неоштукатуреній стіні, не стануть після штукатурки. Порядок: комунікації, штукатурка, підлога, і тільки потім замір під меблі.

**2. Відсутність виділених ліній.** Індукційна плита, духовка й посудомийка на одній лінії — це вибитий автомат на першій же вечері. Додати лінію після оздоблення: 1 200-2 800 PLN замість 500 PLN.

**3. Витяжка без відводу.** Витяжка з вугільним фільтром видаляє запах, але не вологу. На кухні без вікна це прямий шлях до відсирівання меблів.

**4. Фартух, укладений після встановлення меблів.** Тоді плитку неможливо довести до кінця і з’являється видима щілина за шафами.

**Порядок, який працює**

Демонтаж → електрика й вода → вентиляція → штукатурка → стяжка й підлога → фартух → замір під меблі → монтаж меблів → підключення техніки → герметики й плінтуси.`,
      checklist: [
        'Заплануйте виділені лінії для плити, духовки й посудомийки',
        'Забезпечте витяжці відвід назовні, а не вугільний фільтр',
        'Зробіть фартух до встановлення меблів, а не після',
        'Замірюйте під меблі лише після штукатурки й підлоги',
        'Рахуйте бюджет меблів і техніки окремо — це 2,5-3× вартості робіт',
        'Перевірте несучу здатність підлоги під важкі меблі й кам’яну стільницю',
        'Заплануйте освітлення робочої зони до закриття стелі',
        'Залиште сервісний доступ до кранів і підводок за меблями',
      ],
      ctaText: 'Порахувати кошторис ремонту кухні →',
    },
    {
      slug: 'pryymannya-remontnyh-robit',
      img: '/images/work-acceptance.jpg',
      title: 'Приймання ремонтних робіт — що перевіряти на кожному етапі',
      description: 'Три приймання, які треба провести: комунікацій до закриття, чорнового етапу і фінальне. Допустимі відхилення, інструменти й прив’язка оплати до етапів.',
      cluster: 'contractors',
      publishedAt: '2027-02-18',
      hook: 'Фінальне приймання — найгірший момент для виявлення помилки в комунікаціях. На цей час вони під штукатуркою, під стяжкою і під плиткою, а у вас останній платіж і жодних важелів.',
      problem: `Більшість договорів на ремонт передбачають одне приймання — наприкінці. Це зручно підряднику й дорого замовнику, бо на цей момент усе, що можна було зробити погано, встигло опинитися закритим.

У нормально організованому ремонті три приймання, і кожне розблоковує наступний платіж. Це єдиний механізм, який дає вам реальний вплив на якість, поки роботи ще тривають.`,
      explanation: `**Приймання 1 — комунікації до закриття (розблоковує 25-30% оплати)**

Момент: електрика й сантехніка прокладені, але ще не оштукатурені.

Що перевіряєте:
- протокол електричних замірів: неперервність захисних провідників, опір ізоляції, робота ПЗВ,
- протокол опресування водної системи (мінімум 24 години без падіння),
- відповідність кількості й розташування точок домовленостям,
- перерізи проводів: 1,5 мм² освітлення, 2,5 мм² розетки, 4-6 мм² виділені лінії,
- фотографії всіх трас із рулеткою в кадрі.

Ці фотографії знадобляться вам через п’ять років, коли хтось свердлитиме стіну.

**Приймання 2 — чорновий етап (розблоковує ще 30-35%)**

Момент: штукатурка й стяжки готові, до вкладання покриттів.

Допустимі відхилення за будівельними нормами:

| Елемент | Допустиме відхилення |
|---|---|
| Стіна від вертикалі | 3 мм на 1 м, максимум 10 мм на поверх |
| Поверхня штукатурки | 3 мм під правилом 2 м |
| Стяжка від горизонталі | 5 мм на 2 м |
| Кут від прямого | 3 мм на 1 м |

Інструменти: рівень 2 м, правило 2 м з вимірювальним клином, кутник, вологомір для стяжки. Комплект коштує 250-450 PLN і окупається на першому ж знайденому дефекті.

**Приймання 3 — фінальне (розблоковує останні 10-15%)**

Момент: усе готово, до підписання підсумкового акта.

Що перевіряєте: рівність покриттів і ширину швів, роботу кожної точки електрики під навантаженням, герметичність усіх підводок після 24 годин експлуатації, відчинення й зачинення кожних дверей і вікна, ухили в піддоні й біля трапів, повноту герметиків і плінтусів.

**Як прив’язати платежі до приймань**

| Етап | Платіж |
|---|---|
| Аванс на старт | 20-25% |
| Приймання комунікацій до закриття | 25-30% |
| Приймання чорнового етапу | 30-35% |
| Фінальне приймання | 10-15% |
| Після гарантійного періоду (30 днів) | 5% |

Останні 5%, утримані на 30 днів після приймання, — найдієвіший пункт у всьому договорі. Більшість монтажних дефектів проявляється в перший місяць експлуатації, а утримана сума змушує підрядника повернутися і їх виправити.

**Акт приймання — що в ньому має бути**

Дата, перелік прийнятих робіт, перелік дефектів із терміном усунення, підписи обох сторін і фотографії. Акт без переліку дефектів означає приймання без зауважень — і втрату підстави для претензій щодо того, що ви бачили, але не записали.`,
      checklist: [
        'Пропишіть у договорі три приймання, а не одне наприкінці',
        'Не дозволяйте закривати комунікації без протоколів замірів і опресування',
        'Сфотографуйте всі траси комунікацій із рулеткою в кадрі',
        'Купіть рівень і правило 2 м — комплект за 250-450 PLN',
        'Перевірте відхилення: 3 мм під правилом 2 м для штукатурки, 5 мм на 2 м для стяжки',
        'Прив’яжіть кожен платіж до конкретного приймання, а не до часу, що минув',
        'Утримайте 5% оплати на 30 днів після фінального приймання',
        'Запишіть в акт усі дефекти з терміном їх усунення',
      ],
      ctaText: 'Підготуватися до ремонту з повним кошторисом →',
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


