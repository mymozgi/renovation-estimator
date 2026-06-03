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
  ],
  uk: [
    {
      slug: 'chomu-varto-zrobyty-koshторys-pered-remontom',
      title: 'Чому варто зробити кошторис перед ремонтом',
      description: 'Дізнайтеся, чому кошторис — це перший і найважливіший крок успішного ремонту.',
      cluster: 'budget',
      publishedAt: '2024-03-01',
      hook: 'Більшість власників квартир починають ремонт без кошторису. Результат? Перевищення бюджету на 30–40%, незакінчені роботи і стрес на місяці.',
      problem: 'Відсутність кошторису — найпоширеніша причина фінансових катастроф під час ремонту. Власники купують матеріали "на глаз", домовляються з виконавцями без знання ринкових цін і дізнаються про додаткові витрати лише в середині робіт.',
      explanation: 'Кошторис перетворює невизначеність на план. Коли ви знаєте, що ремонт кухні у Варшаві в стандарті Standard коштує 28 000–42 000 PLN, ви можете вести переговори з підрядником, знаючи ринкові межі. Наш калькулятор розраховує кошторис за 10 хвилин.',
      checklist: [
        'Виміряйте кожне приміщення: ширина, довжина, висота, вікна, двері',
        'Визначте обсяг ремонту: косметичний, стандарт, капітальний',
        'Зробіть кошторис перед переговорами з підрядником',
        'Додайте 15–20% резерву на непередбачені витрати',
        'Порівняйте пропозиції мінімум 3 підрядників',
      ],
      ctaText: 'Розрахувати кошторис ремонту →',
    },
    {
      slug: 'yak-vybraty-remontnu-kompaniyu-v-polshchi',
      title: 'Як вибрати ремонтну компанію в Польщі',
      description: 'Практичний посібник з вибору надійного підрядника. Які питання задавати і як не потрапити на шахраїв.',
      cluster: 'contractors',
      publishedAt: '2024-03-15',
      hook: 'На ринку багато підрядників — і немало тих, хто бере аванс і зникає. Цей посібник допоможе вам відрізнити надійну компанію від ризикованого вибору.',
      problem: 'Вибір підрядника з ремонту — один із найскладніших кроків. Пропозиції відрізняються за ціною навіть на 100%, терміни не дотримуються, а якість робіт часто розчаровує.',
      explanation: 'Правильний вибір підрядника починається з кошторису. Коли ви знаєте ринкові орієнтири для свого проекту, ви можете оцінити пропозиції: занадто низька ціна — це попереджувальний сигнал.',
      checklist: [
        'Зробіть кошторис перед тим, як дзвонити підрядникам',
        'Зберіть пропозиції мінімум від 3 компаній',
        'Перевірте NIP / KRS компанії',
        'Попросіть рекомендації від останніх клієнтів і перевірте їх',
        'Підпишіть договір з графіком робіт і платежів',
      ],
      ctaText: 'Перевірити кошторис перед дзвінком підряднику →',
    },
    {
      slug: 'vartist-remontu-kukhni-v-polshchi',
      title: 'Вартість ремонту кухні в Польщі — чого очікувати',
      description: 'Скільки коштує ремонт кухні у 2024 році? Матеріали, робота, стандарт. Реальні цінові рамки з розбивкою по містах Польщі.',
      cluster: 'rooms',
      publishedAt: '2024-04-01',
      hook: 'Ремонт кухні — один з найдорожчих кімнатних проектів. Дізнайтеся, скільки він насправді коштує.',
      problem: 'Кухня — технічне серце квартири: сантехніка, електрика, вентиляція, плитка на стінах і підлозі. Саме тому ремонт кухні площею 10–12 м² може коштувати більше, ніж капітальний ремонт спальні вдвічі більшої площі.',
      explanation: 'Вартість ремонту кухні (10 м², без меблів і побутової техніки): Економ — 8 000–14 000 PLN; Стандарт — 16 000–28 000 PLN; Преміум — 30 000–55 000 PLN. Ціни залежать від міста та стану приміщення.',
      checklist: [
        'Виміряйте кухню: ширина, довжина, висота, кількість вікон і дверей',
        'Вирішіть тип ремонту: косметичний, стандарт чи капітальний',
        'Врахуйте у бюджеті: матеріали + робота + підготовка + 15% резерв',
        'Перевірте стан підлоги — стяжка додає 22–38 PLN/м²',
        'Розрахуйте кошторис перед відвідуванням підрядника',
      ],
      ctaText: 'Розрахувати кошторис кухні →',
    },
  ],
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
    {
      slug: 'kak-vybrat-remont-kompaniyu-v-polshe',
      title: 'Как выбрать ремонтную компанию в Польше',
      description: 'Практическое руководство по выбору надёжного подрядчика. Какие вопросы задавать и как не попасть на мошенников.',
      cluster: 'contractors',
      publishedAt: '2024-03-15',
      hook: 'На рынке много подрядчиков — и немало тех, кто берёт аванс и исчезает. Это руководство поможет вам отличить надёжную компанию от рискованного выбора.',
      problem: 'Выбор подрядчика по ремонту — один из самых сложных шагов. Предложения различаются по цене даже на 100%, сроки не соблюдаются, а качество работ часто разочаровывает.',
      explanation: 'Правильный выбор подрядчика начинается со сметы. Когда у вас есть рыночные ориентиры, вы можете оценить предложения: слишком низкая цена — предупредительный сигнал.',
      checklist: [
        'Составьте смету до звонка подрядчикам',
        'Соберите предложения минимум от 3 компаний',
        'Проверьте NIP / KRS компании',
        'Попросите рекомендации от последних клиентов',
        'Подпишите договор с графиком работ и оплат',
      ],
      ctaText: 'Проверить смету перед звонком подрядчику →',
    },
    {
      slug: 'stoimost-remonta-kukhni-v-polshe',
      title: 'Стоимость ремонта кухни в Польше — чего ожидать',
      description: 'Сколько стоит ремонт кухни в 2024 году? Материалы, работа, стандарт. Реальные ценовые рамки по городам Польши.',
      cluster: 'rooms',
      publishedAt: '2024-04-01',
      hook: 'Ремонт кухни — один из самых дорогих комнатных проектов. Узнайте, сколько он на самом деле стоит.',
      problem: 'Кухня — техническое сердце квартиры: сантехника, электрика, вентиляция, плитка на стенах и полу. Именно поэтому ремонт кухни площадью 10–12 м² может стоить дороже капитального ремонта спальни вдвое большей площади.',
      explanation: 'Стоимость ремонта кухни (10 м², без мебели и техники): Эконом — 8 000–14 000 PLN; Стандарт — 16 000–28 000 PLN; Премиум — 30 000–55 000 PLN. Цены зависят от города и состояния помещения.',
      checklist: [
        'Измерьте кухню: ширина, длина, высота, количество окон и дверей',
        'Определите тип ремонта: косметический, стандарт или капитальный',
        'Учтите в бюджете: материалы + работа + подготовка + 15% резерв',
        'Проверьте состояние пола — стяжка добавляет 22–38 PLN/м²',
        'Рассчитайте смету до посещения подрядчика',
      ],
      ctaText: 'Рассчитать смету кухни →',
    },
  ],
  be: [
    {
      slug: 'chamu-patabravany-kashtarys-pered-ramontam',
      title: 'Чаму патрэбны каштарыс перад рамонтам',
      description: 'Галоўныя прычыны, па якіх каштарыс з\'яўляецца першым крокам любога паспяховага рамонту.',
      cluster: 'budget',
      publishedAt: '2024-03-01',
      hook: 'Большасць уласнікаў кватэр пачынаюць рамонт без каштарысу. Вынік? Перавышэнне бюджэту на 30–40% і стрэс на месяцы.',
      problem: 'Адсутнасць каштарысу — найчасцейшая прычына фінансавых катастроф пры рамонце. Уласнікі купляюць матэрыялы "на вока", без ведання рынкавых ставак.',
      explanation: 'Каштарыс ператварае невызначанасць у план. Наш калькулятар лічыць каштарыс за 10 хвілін на аснове памераў пакояў і выбраных матэрыялаў.',
      checklist: [
        'Вымерайце кожны пакой: шырыня, даўжыня, вышыня, вокны, дзверы',
        'Вызначце аб\'ём рамонту: касметычны, стандарт, капітальны',
        'Зрабіце каштарыс да перамоваў з падрадчыкам',
        'Дадайце 15–20% рэзерв на непрадбачаныя выдаткі',
      ],
      ctaText: 'Разлічыць каштарыс рамонту →',
    },
    {
      slug: 'yak-vybrac-remontnuyu-kompaniyu-u-polshchy',
      title: 'Як выбраць рамонтную кампанію ў Польшчы',
      description: 'Практычны дапаможнік па выбары надзейнага падрадчыка.',
      cluster: 'contractors',
      publishedAt: '2024-03-15',
      hook: 'На рынку шмат падрадчыкаў — і нямала тых, хто бярэ аванс і знікае.',
      problem: 'Выбар падрадчыка па рамонту — адзін з самых складаных крокаў. Прапановы адрозніваюцца па цане нават на 100%.',
      explanation: 'Правільны выбар падрадчыка пачынаецца з каштарысу. Калі ў вас ёсць рынкавыя арыенціры, вы можаце ацаніць прапановы.',
      checklist: [
        'Складзіце каштарыс да тэлефаніравання падрадчыкам',
        'Збярыце прапановы мінімум ад 3 кампаній',
        'Падпішыце дагавор з графікам прац і аплат',
      ],
      ctaText: 'Праверыць каштарыс перад тэлефанаваннем падрадчыку →',
    },
    {
      slug: 'koshtarys-remontu-kukhni-u-polshchy',
      title: 'Кошт рамонту кухні ў Польшчы',
      description: 'Колькі каштуе рамонт кухні ў 2024 годзе? Матэрыялы, праца, стандарт.',
      cluster: 'rooms',
      publishedAt: '2024-04-01',
      hook: 'Рамонт кухні — адзін з самых дарагіх пакаёвых праектаў.',
      problem: 'Кухня — тэхнічнае сэрца кватэры: сантэхніка, электрыка, вентыляцыя, плітка на сценах і падлозе.',
      explanation: 'Кошт рамонту кухні (10 м², без мэблі): Эканом — 8 000–14 000 PLN; Стандарт — 16 000–28 000 PLN; Прэміум — 30 000–55 000 PLN.',
      checklist: [
        'Вымерайце кухню: шырыня, даўжыня, вышыня',
        'Вызначце тып рамонту: касметычны, стандарт ці капітальны',
        'Разлічыце каштарыс да наведвання падрадчыка',
      ],
      ctaText: 'Разлічыць каштарыс кухні →',
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
