export interface Article {
  slug: string
  title: string
  description: string
  cluster: 'budget' | 'contractors' | 'rooms' | 'regional' | 'materials' | 'property'
  publishedAt: string
  hook: string
  problem: string
  explanation: string
  checklist: string[]
  ctaText: string
}

export const articles: Record<string, Article[]> = {
  pl: [
    {
      slug: 'dlaczego-warto-zrobic-kosztorys-przed-remontem',
      title: 'Dlaczego warto zrobić kosztorys przed remontem',
      description: 'Poznaj główne powody, dla których kosztorys jest pierwszym i najważniejszym krokiem każdego udanego remontu.',
      cluster: 'budget',
      publishedAt: '2024-03-01',
      hook: 'Większość Polaków zaczyna remont bez kosztorysu. Efekt? Średnio 30–40% przekroczenie budżetu, niezrealizowane prace i stres, który trwa miesiącami.',
      problem: `Brak kosztorysu to najczęstszy powód finansowych katastrof remontowych. Właściciele mieszkań kupują materiały „na oko", negocjują z wykonawcami bez wiedzy o rynkowych stawkach i odkrywają dodatkowe koszty dopiero w połowie prac. Wyburzenie jednej ściany może okazać się konstrukcyjne — dodatkowe 5 000 PLN. Podłoga okazuje się nierówna — kolejne 2 000 PLN na wylewkę. Każda niespodzianka powiększa budżet, a wykonawca czeka na decyzję.

Psychologicznie wchodzimy w remont z optymizmem: „to tylko malowanie i nowa podłoga". Ignorujemy przygotowanie powierzchni, robociznę za detale, koszty pomocnicze. Rzeczywistość okazuje się 2–3 razy droższa.`,
      explanation: `Kosztorys zamienia niepewność w plan. Kiedy wiesz, że remont kuchni w Warszawie w standardzie Standard kosztuje 28 000–42 000 PLN, możesz negocjować z wykonawcą znając widełki rynkowe. Możesz zdecydować, na czym zaoszczędzić (panele zamiast płytek w sypialni) i gdzie nie schodzić poniżej standardu (hydraulika, elektryka).

Nasz kalkulator remontowy oblicza kosztorys w 10 minut. Podajesz wymiary pomieszczeń, wybierasz standard wykończenia i miasto — system przelicza koszty materiałów, robocizny, przygotowania powierzchni i narzut regionalny.`,
      checklist: [
        'Zmierz każde pomieszczenie: szerokość, długość, wysokość, okna, drzwi',
        'Określ zakres remontu: kosmetyczny, standard, generalny',
        'Wykonaj kosztorys przed rozmową z wykonawcą',
        'Dodaj 15–20% buforu na nieprzewidziane koszty',
        'Porównaj oferty minimum 3 wykonawców',
        'Sprawdź referencje i opinie przed podpisaniem umowy',
        'Ustal harmonogram płatności etapami, nie z góry',
      ],
      ctaText: 'Oblicz kosztorys swojego remontu →',
    },
    {
      slug: 'jak-wybrac-firme-remontowa-w-polsce',
      title: 'Jak wybrać firmę remontową w Polsce',
      description: 'Praktyczny przewodnik po wyborze rzetelnego wykonawcy. Jakie pytania zadać, na co uważać i jak nie dać się oszukać.',
      cluster: 'contractors',
      publishedAt: '2024-03-15',
      hook: 'Na rynku jest wielu wykonawców — i wielu, którzy biorą zaliczkę i znikają. Ten przewodnik pomoże Ci odróżnić rzetelną firmę od ryzykownego wyboru.',
      problem: `Wybór wykonawcy remontowego to jeden z trudniejszych kroków. Oferty różnią się ceną nawet o 100%, terminy są niedotrzymywane, a jakość prac często rozczarowuje. Najczęstsze problemy:

— Wykonawca bierze 50% zaliczki i znika lub przeciąga remont w nieskończoność
— Cena z oferty rośnie po każdym etapie prac ("doszły dodatkowe roboty")
— Prace są wykonane niestarannie — nierówne fugi, krzywe ściany, cieknące baterie
— Brak umowy lub umowa z lukami, które chronią tylko wykonawcę

W Polsce rynek jest rozdrobniony — dominują małe firmy i freelancerzy. To nie zawsze złe, ale wymaga weryfikacji.`,
      explanation: `Dobry wybór wykonawcy zaczyna się od kosztorysu. Kiedy masz wyliczone widełki rynkowe dla swojego projektu, możesz ocenić oferty: zbyt niska cena to sygnał ostrzegawczy (cięcia na materiałach lub pracy), zbyt wysoka bez uzasadnienia też powinna wzbudzić podejrzenia.

Po wstępnym kosztorysie zaproś 3 wykonawców do oglądnięcia mieszkania. Obserwuj, jak zadają pytania — dobry fachman pyta o szczegóły, nie spieszy się z ceną. Poproś o referencje z ostatnich 3 realizacji i zadzwoń do poprzednich klientów.`,
      checklist: [
        'Wykonaj wstępny kosztorys zanim zadzwonisz do wykonawców',
        'Zbierz oferty od minimum 3 firm — nie wybieraj pierwszej',
        'Sprawdź NIP / KRS firmy — czy działa legalnie',
        'Poproś o referencje z ostatnich 12 miesięcy i sprawdź je telefonicznie',
        'Obejrzyj zdjęcia poprzednich realizacji',
        'Podpisz umowę z harmonogramem prac i kamieniami milowymi',
        'Płać etapami: 20% na start, 40% w połowie, 30% przy odbiorze, 10% po miesiącu',
        'Odbiór techniczny — sprawdź każde pomieszczenie przed ostatnią płatnością',
      ],
      ctaText: 'Sprawdź kosztorys zanim zadzwonisz do wykonawcy →',
    },
    {
      slug: 'koszt-remontu-kuchni-w-polsce',
      title: 'Koszt remontu kuchni w Polsce — czego się spodziewać',
      description: 'Ile kosztuje remont kuchni w 2024 roku? Materiały, robocizna, standard. Prawdziwe widełki cenowe z podziałem na polskie miasta.',
      cluster: 'rooms',
      publishedAt: '2024-04-01',
      hook: 'Remont kuchni to jeden z najdroższych pokojowych projektów — i jeden z tych, które najbardziej podnoszą wartość mieszkania. Sprawdź, ile naprawdę możesz się spodziewać.',
      problem: `Kuchnia to techniczne serce mieszkania: hydraulika, elektryka, wentylacja, płytki na ścianach i podłodze, glazura na wymiar. Właśnie dlatego remont kuchni o powierzchni 10–12 m² może kosztować więcej niż generalny remont sypialni dwukrotnie większej.

Typowe pułapki kosztowe:
— Flizy kuchenne na ściany (za zlew, za kuchenką) — robocizna płytkarska 55–95 PLN/m²
— Wymiana instalacji elektrycznej pod nowe AGD — 800–2 500 PLN za gniazda i obwody
— Wylewka pod nowe płytki podłogowe — +22–38 PLN/m²
— Przygotowanie ścian po demontażu starych płytek — pełne przygotowanie +32–52 PLN/m²`,
      explanation: `Koszt remontu kuchni (10 m², bez mebli i AGD) według standardu:

**Ekonomiczny** — 8 000–14 000 PLN
Malowanie ścian, panele podłogowe, podstawowe przygotowanie. Dla kuchni w dobrym stanie lub jako tymczasowe rozwiązanie.

**Standard** — 16 000–28 000 PLN
Płytki na podłodze, malowanie ścian z gruntowaniem, nowe flizowanie obszarów roboczych. Typowy wybór dla mieszkań do wynajmu lub sprzedaży.

**Premium** — 30 000–55 000 PLN
Płytki na całej podłodze i ścianach, tynk dekoracyjny jako akcent, sufit napinany lub gipsowy. Dla kuchni, która jest centrum życia rodzinnego.

*Ceny dotyczą samego wykończenia — bez mebli kuchennych, AGD, hydrauliki i elektryki.*`,
      checklist: [
        'Zmierz dokładnie kuchnię: szerokość, długość, wysokość, ilość okien i drzwi',
        'Zdecyduj, czy robisz remont kosmetyczny, standard czy generalny',
        'Uwzględnij w budżecie: materiały + robocizna + przygotowanie + 15% bufor',
        'Sprawdź stan podłogi — wylewka dodaje 22–38 PLN/m²',
        'Oceń stan ścian po demontażu starych płytek — to główny koszt przygotowania',
        'Płytki zaplanuj z 10% nadwyżką na odpady przy cięciu',
        'Wycen robociznę ZANIM kupisz materiały — cena płytkarska zależy od formatu płytki',
        'Oblicz kosztorys przed wizytą u wykonawcy',
      ],
      ctaText: 'Oblicz kosztorys swojej kuchni →',
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
