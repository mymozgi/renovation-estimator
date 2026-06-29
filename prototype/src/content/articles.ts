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

export const articles: Record<string, Article[]> = {
  pl: [
    {
      slug: 'koszt-remontu-lazienki-2026',
      img: '/images/tile.jpg',
      title: 'Koszt remontu łazienki 2026 — ile kosztuje m² i czego się spodziewać?',
      description: 'Aktualne ceny remontu łazienki w Polsce 2026. Widełki dla standardu ekonomicznego, optymalnego i premium. Robocizna, płytki, armatura — wszystko w jednym miejscu.',
      cluster: 'rooms',
      publishedAt: '2026-01-15',
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
      img: '/images/house.jpg',
      title: 'Ceny remontów w Polsce 2026 — Warszawa, Kraków, Wrocław, Gdańsk, Poznań',
      description: 'Porównanie cen robocizny remontowej w największych polskich miastach w 2026 roku. Gdzie remont jest najtańszy, a gdzie zapłacisz najwięcej i dlaczego.',
      cluster: 'regional',
      publishedAt: '2026-02-01',
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

Skąd biorą się różnice? Ekipa malarska w Warszawie oczekuje 45–70 PLN/m², w Łodzi 30–48 PLN/m². Płytkarz w Trójmieście: 80–140 PLN/m², w Poznaniu: 60–100 PLN/m². To samo dotyczy elektryki, hydrauliki i wszystkich innych branż.

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
      img: '/images/paint.jpg',
      title: 'Na czym NIE oszczędzać przy remoncie w 2026 — i gdzie możesz ciąć koszty bezpiecznie',
      description: 'Które elementy remontu warto kupić w wyższym standardzie, a gdzie tańsze materiały sprawdzą się równie dobrze? Praktyczny przewodnik po materiałach budowlanych 2026.',
      cluster: 'materials',
      publishedAt: '2026-03-01',
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

*Grunty i podkłady* — gruntowanie ścian przed gładziami i malowaniem kosztuje 3–8 PLN/m². Bez gruntu farba lub gładź odpadnie w ciągu roku. Remont = cały koszt od nowa.

*Elektryka i hydraulika* — tutaj tanie materiały = zagrożenie życia lub zalanie sąsiadów. Używaj tylko certyfikowanych produktów, zatrudniaj licencjonowane ekipy.

*Kleje do płytek w łazience i kuchni* — C2TE lub C2TES zamiast C1. Różnica: 8–15 PLN/worek. Brak: odpadające płytki po sezonie grzewczym.

**Gdzie możesz bezpiecznie ciąć koszty:**

*Panele podłogowe zamiast deski drewnianej* — w sypialni i pokoju różnica w użytkowaniu jest minimalna. Oszczędność: 40–120 PLN/m².

*Farba malarska* — w mniej eksponowanych pomieszczeniach tańsza farba z dwóch warstw daje ten sam efekt. Oszczędność: 8–20 PLN/m².

*Płytki w mniej widocznych strefach* — schowek, techniczne WC: tu format i kolekcja mają mniejsze znaczenie. Oszczędność: 30–80 PLN/m².

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
      publishedAt: '2026-04-01',
      hook: 'Kupiłeś mieszkanie od dewelopera — gratuluję. Teraz zaczyna się prawdziwa rachuba: wykończenie 50 m² może kosztować od 60 000 do 180 000 PLN. Skąd taka rozpiętość i jak nie przepłacić?',
      problem: `Stan deweloperski wygląda podobnie niezależnie od dewelopera: betonowe ściany, tynki, wylewki, okna z PCV, drzwi wejściowe, przyłącza mediów. Puste, zimne, pachnie cementem. I teraz Ty musisz z tego zrobić dom.

Największy błąd kupujących: nieoszacowanie kosztów wykończenia przy podejmowaniu decyzji o zakupie. Bank pyta o zdolność kredytową na mieszkanie — ale nie pyta, czy Cię stać na jego wykończenie.

Typowe zaskoczenia finansowe po odebraniu kluczy:
— „Tymczasowa" podłoga z paneli za rok okazuje się stała, bo zabrakło pieniędzy na płytki
— Elektryka pod lodówkę, zmywarkę i AGD to osobne obwody — nikt nie mówił, że brakuje
— Malowanie ścian bez wyrównania gładziami daje efekt skórki pomarańczowej
— Łazienka z tylko jedną ścianą w płytkach przez rok nie jest łazienką
— Klimatyzacja montowana po wykończeniu = kucie ścian od nowa`,
      explanation: `**Etapy wykończenia mieszkania od dewelopera i ich koszty (50 m², standard optymalny):**

**Etap 1 — Przygotowanie (2–3 tygodnie) | 8 000–18 000 PLN**
Projekt wnętrz lub projekt techniczny (elektryka, hydraulika), pomiary, zamówienia. Gładzie gipsowe lub szpachlowanie ścian: 18–35 PLN/m². Wyrównanie wylewki: 22–40 PLN/m².

**Etap 2 — Instalacje (2–4 tygodnie) | 12 000–28 000 PLN**
Elektryka: przeprowadzenie obwodów pod AGD, klimatyzację, oświetlenie. Hydraulika: rozbudowa podejść w łazience i kuchni. To inwestycja, którą odkopiesz po 30 latach — nie oszczędzaj.

**Etap 3 — Prace mokre (3–5 tygodni) | 15 000–40 000 PLN**
Płytki w łazience (w/g metrażu), płytki w kuchni za blatem, wylewka samopoziomująca pod ogrzewanie. Łazienka 5 m² z armaturą: 18 000–45 000 PLN.

**Etap 4 — Podłogi i wykończenie ścian (2–3 tygodnie) | 12 000–35 000 PLN**
Panele, deska drewniana lub płytki w salonie i sypialni. Malowanie (2 warstwy farby po gruntowaniu): 18–35 PLN/m². Sufity: malowanie lub sufity podwieszane z oświetleniem.

**Etap 5 — Drzwi, oświetlenie, sprzęt (1–2 tygodnie) | 8 000–22 000 PLN**
Drzwi wewnętrzne: 600–4 000 PLN/szt. Oświetlenie: projekt + montaż. Montaż AGD i podpięcie.

**Łącznie (50 m², standard optymalny): 55 000–143 000 PLN**
— Ekonomiczny: 45 000–75 000 PLN
— Optymalny: 76 000–120 000 PLN
— Premium: 121 000–200 000+ PLN`,
      checklist: [
        'Zaplanuj budżet na wykończenie PRZED podpisaniem aktu notarialnego — wlicz go do kredytu',
        'Zrób kosztorys wykończenia zaraz po odbiorze kluczy, nie "na oko"',
        'Zamów projekt elektryki przed malowaniem — zmiany po = kucie',
        'Zdecyduj o klimatyzacji przed wykończeniem — rury prowadzone w ścianie są niewidoczne',
        'Łazienka i kuchnia w pierwszej kolejności — bez nich nie da się mieszkać',
        'Harmonogram: instalacje → prace mokre → podłogi → malowanie → montaż',
        'Rezerwuj ekipy z 3–4 miesięcznym wyprzedzeniem (2026: duże obłożenie)',
        'Oblicz dokładny kosztorys online — wiesz wtedy, ile prosić w kredycie na wykończenie',
      ],
      ctaText: 'Oblicz kosztorys wykończenia nowego mieszkania →',
    },
  ]
,
  ru: [
    {
      slug: 'pochemu-nuzhna-smeta-pered-remontom',
      title: 'Почему нужна смета перед ремонтом',
      description: 'Главные причины, по которым смета является первым шагом любого успешного ремонта.',
      cluster: 'budget',
      publishedAt: '2024-03-01',
      hook: 'Большинство владельцев квартир начинают ремонт без сметы. Результат? Перерасход бюджета на 30–40%, незавершённые работы и стресс на месяцы.',
      problem: 'Отсутствие сметы — самая частая причина финансовых катастроф при ремонте. Владельцы покупают материалы "на глаз", договариваются с подрядчиками без знания рыночных ставок.',
      explanation: 'Смета превращает неопределённость в план. Зная, что ремонт кухни в Варшаве в стандарте Standard стоит 28 000–42 000 PLN, вы можете вести переговоры с подрядчиком, зная рыночные рамки. Наш калькулятор считает смету за 10 минут.',
      checklist: [
        'Измерьте каждое помещение: ширина, длина, высота, окна, двери',
        'Определите объём ремонта: косметический, стандарт, капитальный',
        'Сделайте смету до переговоров с подрядчиком',
        'Добавьте 15–20% резерв на непредвиденные расходы',
        'Сравните предложения минимум 3 подрядчиков',
      ],
      ctaText: 'Рассчитать смету ремонта →',
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
