const R = (min: number, max: number) => ({ min, max })

export interface CityFaq { q: string; a: string }
export interface CityLocale {
  title: string
  description: string
  h1: string
  subtitle: string
  intro: string
  marketNote: string
  faq: CityFaq[]
}
export interface CityData {
  slug: string
  displayName: string
  calcCity: string
  multiplier: number
  nameLocative: Record<string, string>
  ranges: { economy: { min: number; max: number }; standard: { min: number; max: number }; premium: { min: number; max: number } }
  perM2:  { economy: { min: number; max: number }; standard: { min: number; max: number }; premium: { min: number; max: number } }
  content: Record<string, CityLocale>
}

export const CITIES: CityData[] = [
  /* ─── WARSZAWA ──────────────────────────────────────────────────────────── */
  {
    slug: 'warszawa', displayName: 'Warszawa', calcCity: 'warsaw', multiplier: 1.20,
    nameLocative: { pl: 'w Warszawie', en: 'in Warsaw', ru: 'в Варшаве', uk: 'у Варшаві' },
    ranges: { economy: R(36000,48000), standard: R(54000,72000), premium: R(90000,150000) },
    perM2:  { economy: R(720,960),    standard: R(1080,1440),   premium: R(1800,3000)  },
    content: {
      pl: {
        title: 'Kalkulator kosztów remontu Warszawa 2026 — aktualne ceny robocizny',
        description: 'Ile kosztuje remont mieszkania w Warszawie? Ekonomiczny 720–960 PLN/m², standard 1 080–1 440 PLN/m². Sprawdź aktualne ceny i oblicz kosztorys online.',
        h1: 'Koszt remontu w Warszawie 2026',
        subtitle: 'Aktualne ceny robocizny i materiałów dla stolicy — dane z 2026 roku',
        intro: 'Warszawa to najdroższy rynek remontowy w Polsce. Robocizna wykwalifikowanych ekip jest tu średnio o 20% wyższa niż w Łodzi czy Lublinie, a na sprawdzone ekipy czeka się 2–3 miesiące. Poniższe widełki oparte są na danych z realizacji w stolicy z 2026 roku.',
        marketNote: 'Rynek remontowy w Warszawie jest szczególnie napięty na Mokotowie, Żoliborzu, Ursynowie i Pradze-Południe — dzielnicach z dużą liczbą nowych inwestycji i rewitalizacji. Brak niezależnego kosztorysu to prosta droga do przepłacenia o 15–30%.',
        faq: [
          { q: 'Ile kosztuje remont mieszkania 50 m² w Warszawie w 2026?', a: 'Remont mieszkania 50 m² w Warszawie kosztuje: ekonomiczny 36 000–48 000 PLN, optymalny 54 000–72 000 PLN, premium 90 000–150 000 PLN. Ceny obejmują materiały wykończeniowe i robociznę — bez elektryki, hydrauliki i mebli.' },
          { q: 'Dlaczego remont w Warszawie jest droższy niż w innych miastach?', a: 'Wyższe koszty życia wykonawców, większy popyt ze strony deweloperów i inwestorów, a także koszty logistyki w gęstej zabudowie podnoszą stawki o 15–25% względem mniejszych miast. To rynek sprzedawcy — dobrzy wykonawcy dyktują ceny.' },
          { q: 'Ile kosztuje robocizna za malowanie ścian w Warszawie?', a: 'Malowanie ścian w Warszawie (gruntowanie + gładź + 2× farba) kosztuje 35–55 PLN/m². Samo malowanie bez szpachlowania: 18–28 PLN/m². Sufit: 25–40 PLN/m².' },
          { q: 'Jak długo trwa remont mieszkania w Warszawie?', a: 'Remont 50 m² w Warszawie trwa 6–12 tygodni — zależnie od zakresu, dostępności ekipy i prac mokrych. Łazienka i kuchnia to najdłuższe etapy: po 2–4 tygodnie każda.' },
          { q: 'Czy warto zamówić niezależny kosztorys przed remontem w Warszawie?', a: 'Tak — przy cenach robocizny w Warszawie różnica między uczciwą ofertą a zawyżoną to 10 000–30 000 PLN. Niezależny kosztorys za 49 PLN daje punkt odniesienia do negocjacji z każdym wykonawcą.' },
        ],
      },
      en: {
        title: 'Warsaw Apartment Renovation Cost 2026 — Current Prices',
        description: 'How much does apartment renovation cost in Warsaw 2026? Economy: 720–960 PLN/m², standard: 1,080–1,440 PLN/m². Free renovation cost calculator.',
        h1: 'Renovation Cost in Warsaw 2026',
        subtitle: 'Current labor and material prices for Warsaw — 2026 data',
        intro: 'Warsaw is Poland\'s most expensive renovation market, with skilled crew rates averaging 20% above other major cities. High demand and scarce availability mean planning months ahead is essential.',
        marketNote: 'Warsaw\'s renovation market is tightest in Mokotów, Żoliborz, Ursynów, and Praga districts. Without an independent estimate, overpaying by 15–30% is common.',
        faq: [
          { q: 'How much does a 50 m² apartment renovation cost in Warsaw in 2026?', a: 'Economy 36,000–48,000 PLN, standard 54,000–72,000 PLN, premium 90,000–150,000 PLN. Prices cover finishing materials and labor — excluding electrical, plumbing, and furniture.' },
          { q: 'Why is renovation in Warsaw more expensive than other Polish cities?', a: 'Higher cost of living for contractors, strong developer demand, and logistics costs in dense urban areas push rates 15–25% above smaller cities.' },
          { q: 'How long does apartment renovation take in Warsaw?', a: 'A standard 50 m² apartment renovation takes 6–12 weeks depending on scope, crew availability, and wet works (bathroom, kitchen).' },
          { q: 'Is it worth getting an independent renovation estimate in Warsaw?', a: 'Yes — at Warsaw rates, the gap between a fair quote and an inflated one is typically 10,000–30,000 PLN. A 49 PLN independent estimate gives you a benchmark for every negotiation.' },
        ],
      },
      ru: {
        title: 'Стоимость ремонта квартиры в Варшаве 2026 — актуальные цены',
        description: 'Сколько стоит ремонт квартиры в Варшаве в 2026? Эконом 720–960 PLN/м², стандарт 1 080–1 440 PLN/м². Бесплатный калькулятор сметы ремонта.',
        h1: 'Стоимость ремонта в Варшаве 2026',
        subtitle: 'Актуальные цены на материалы и работу в Варшаве — данные 2026 года',
        intro: 'Варшава — самый дорогой рынок ремонтных услуг в Польше: ставки квалифицированных бригад в среднем на 20% выше, чем в других крупных городах. Хорошие бригады забронированы на 2–3 месяца вперёд.',
        marketNote: 'Рынок ремонта в Варшаве наиболее напряжён в районах Мокотув, Жолибож, Урсынув и Прага-Пд. Без независимой сметы переплата на 15–30% — типичная ситуация.',
        faq: [
          { q: 'Сколько стоит ремонт квартиры 50 м² в Варшаве в 2026 году?', a: 'Эконом 36 000–48 000 PLN, оптимальный 54 000–72 000 PLN, премиум 90 000–150 000 PLN. Цены включают отделочные материалы и работу — без электрики, сантехники и мебели.' },
          { q: 'Почему ремонт в Варшаве дороже, чем в других городах?', a: 'Более высокие расходы на жизнь подрядчиков, высокий спрос со стороны девелоперов и логистические затраты поднимают ставки на 15–25% выше небольших городов.' },
          { q: 'Стоит ли заказывать независимую смету перед ремонтом в Варшаве?', a: 'Да — при варшавских ценах разница между честной и завышенной офертой составляет 10 000–30 000 PLN. Независимая смета за 49 PLN даёт ориентир для переговоров.' },
        ],
      },
      uk: {
        title: 'Вартість ремонту квартири у Варшаві 2026 — актуальні ціни',
        description: 'Скільки коштує ремонт квартири у Варшаві в 2026? Економ 720–960 PLN/м², стандарт 1 080–1 440 PLN/м². Безкоштовний калькулятор кошторису ремонту.',
        h1: 'Вартість ремонту у Варшаві 2026',
        subtitle: 'Актуальні ціни на матеріали та роботу у Варшаві — дані 2026 року',
        intro: 'Варшава — найдорожчий ринок ремонтних послуг у Польщі: ставки кваліфікованих бригад у середньому на 20% вищі, ніж в інших великих містах.',
        marketNote: 'Ринок ремонту у Варшаві найбільш напружений у районах Мокотув, Жолібож, Урсинів та Прага-Пд. Без незалежного кошторису переплата на 15–30% — типова ситуація.',
        faq: [
          { q: 'Скільки коштує ремонт квартири 50 м² у Варшаві в 2026 році?', a: 'Економ 36 000–48 000 PLN, оптимальний 54 000–72 000 PLN, преміум 90 000–150 000 PLN.' },
          { q: 'Чи варто замовляти незалежний кошторис перед ремонтом у Варшаві?', a: 'Так — різниця між чесною та завищеною пропозицією становить 10 000–30 000 PLN. Незалежний кошторис за 49 PLN дає орієнтир для переговорів.' },
        ],
      },
    },
  },

  /* ─── KRAKÓW ────────────────────────────────────────────────────────────── */
  {
    slug: 'krakow', displayName: 'Kraków', calcCity: 'krakow', multiplier: 1.10,
    nameLocative: { pl: 'w Krakowie', en: 'in Kraków', ru: 'в Кракове', uk: 'у Кракові' },
    ranges: { economy: R(33000,44000), standard: R(49500,66000), premium: R(82500,137500) },
    perM2:  { economy: R(660,880),    standard: R(990,1320),    premium: R(1650,2750)  },
    content: {
      pl: {
        title: 'Kalkulator kosztów remontu Kraków 2026 — aktualne ceny',
        description: 'Ile kosztuje remont mieszkania w Krakowie? Ekonomiczny 660–880 PLN/m², standard 990–1 320 PLN/m². Sprawdź aktualne ceny i oblicz kosztorys online.',
        h1: 'Koszt remontu w Krakowie 2026',
        subtitle: 'Aktualne ceny robocizny i materiałów dla Krakowa — dane z 2026 roku',
        intro: 'Kraków to drugi najdroższy rynek remontowy w Polsce. Rosnące zainteresowanie inwestorów, rynek krótkoterminowego najmu i napływ pracowników IT utrzymują ceny robocizny o ok. 10% powyżej średniej krajowej.',
        marketNote: 'Najwyższa aktywność remontowa w Krakowie: Kazimierz, Podgórze i Nowa Huta — popularne wśród inwestorów pod wynajem turystyczny. Ekipy wyspecjalizowane w mieszkaniach "pod Airbnb" narzucają wyższe stawki. Niezależny kosztorys chroni przed przepłaceniem.',
        faq: [
          { q: 'Ile kosztuje remont mieszkania 50 m² w Krakowie w 2026?', a: 'Remont mieszkania 50 m² w Krakowie kosztuje: ekonomiczny 33 000–44 000 PLN, optymalny 49 500–66 000 PLN, premium 82 500–137 500 PLN.' },
          { q: 'Czy remont w Krakowie jest tańszy niż w Warszawie?', a: 'Kraków jest tańszy od Warszawy o ok. 8–10%, ale droższy od Łodzi i mniejszych miast o 10–15%. Ceny zbliżone do Wrocławia.' },
          { q: 'Ile kosztuje remont łazienki w Krakowie?', a: 'Remont łazienki 6 m² w Krakowie: ekonomicznie 8 000–12 000 PLN, standardowo 13 000–20 000 PLN, premium 22 000–40 000 PLN.' },
          { q: 'Czy warto remontować mieszkanie pod wynajem w Krakowie?', a: 'Tak — przy rosnących stawkach najmu krótkoterminowego czas zwrotu z remontowanego mieszkania w centrum Krakowa wynosi 3–5 lat. Kluczowy jest dobór trwałych materiałów (gres zamiast paneli, farby zmywalne).' },
          { q: 'Jak długo czeka się na ekipę remontową w Krakowie?', a: 'Na sprawdzoną ekipę w Krakowie czeka się 4–12 tygodni. Wiosna i lato to szczyty popytu. Bookuj z wyprzedzeniem i miej kosztorys gotowy przed rozmowami.' },
        ],
      },
      en: {
        title: 'Kraków Apartment Renovation Cost 2026 — Current Prices',
        description: 'How much does apartment renovation cost in Kraków 2026? Economy: 660–880 PLN/m², standard: 990–1,320 PLN/m². Free renovation cost calculator.',
        h1: 'Renovation Cost in Kraków 2026',
        subtitle: 'Current labor and material prices for Kraków — 2026 data',
        intro: 'Kraków is Poland\'s second most expensive renovation market. Strong investor interest, short-term rental demand, and IT sector growth keep labor rates about 10% above the national average.',
        marketNote: 'Renovation activity is highest in Kazimierz, Podgórze, and Nowa Huta — popular for tourist rentals. Crews specializing in Airbnb-ready flats charge premium rates.',
        faq: [
          { q: 'How much does a 50 m² apartment renovation cost in Kraków in 2026?', a: 'Economy 33,000–44,000 PLN, standard 49,500–66,000 PLN, premium 82,500–137,500 PLN.' },
          { q: 'Is Kraków cheaper than Warsaw for renovation?', a: 'About 8–10% cheaper than Warsaw, but 10–15% more expensive than Łódź and smaller cities. Prices are similar to Wrocław.' },
          { q: 'How much does a bathroom renovation cost in Kraków?', a: 'A 6 m² bathroom in Kraków: economy 8,000–12,000 PLN, standard 13,000–20,000 PLN, premium 22,000–40,000 PLN.' },
        ],
      },
      ru: {
        title: 'Стоимость ремонта квартиры в Кракове 2026 — актуальные цены',
        description: 'Сколько стоит ремонт квартиры в Кракове в 2026? Эконом 660–880 PLN/м², стандарт 990–1 320 PLN/м². Бесплатный калькулятор сметы ремонта.',
        h1: 'Стоимость ремонта в Кракове 2026',
        subtitle: 'Актуальные цены на материалы и работу в Кракове — данные 2026 года',
        intro: 'Краков — второй по стоимости рынок ремонта в Польше. Рост туристической аренды и IT-сектора держат ставки на ~10% выше среднего по стране.',
        marketNote: 'Наибольшая активность ремонта: Казимеж, Подгуже и Нова Хута. Бригады, специализирующиеся на квартирах под Airbnb, устанавливают более высокие ставки.',
        faq: [
          { q: 'Сколько стоит ремонт квартиры 50 м² в Кракове в 2026 году?', a: 'Эконом 33 000–44 000 PLN, оптимальный 49 500–66 000 PLN, премиум 82 500–137 500 PLN.' },
          { q: 'Краков дешевле Варшавы?', a: 'На 8–10% дешевле Варшавы, но на 10–15% дороже Лодзи и небольших городов.' },
        ],
      },
      uk: {
        title: 'Вартість ремонту квартири у Кракові 2026 — актуальні ціни',
        description: 'Скільки коштує ремонт квартири у Кракові в 2026? Економ 660–880 PLN/м², стандарт 990–1 320 PLN/м². Безкоштовний калькулятор кошторису.',
        h1: 'Вартість ремонту у Кракові 2026',
        subtitle: 'Актуальні ціни на матеріали та роботу у Кракові — дані 2026 року',
        intro: 'Краків — другий за вартістю ринок ремонту в Польщі. Зростання туристичної оренди та IT-сектора тримає ставки приблизно на 10% вище за середні по країні.',
        marketNote: 'Найбільша активність ремонту: Казімеж, Підгуже та Нова Хута. Незалежний кошторис захистить від завищених пропозицій.',
        faq: [
          { q: 'Скільки коштує ремонт квартири 50 м² у Кракові в 2026 році?', a: 'Економ 33 000–44 000 PLN, оптимальний 49 500–66 000 PLN, преміум 82 500–137 500 PLN.' },
        ],
      },
    },
  },

  /* ─── WROCŁAW ───────────────────────────────────────────────────────────── */
  {
    slug: 'wroclaw', displayName: 'Wrocław', calcCity: 'wroclaw', multiplier: 1.10,
    nameLocative: { pl: 'we Wrocławiu', en: 'in Wrocław', ru: 'во Вроцлаве', uk: 'у Вроцлаві' },
    ranges: { economy: R(33000,44000), standard: R(49500,66000), premium: R(82500,137500) },
    perM2:  { economy: R(660,880),    standard: R(990,1320),    premium: R(1650,2750)  },
    content: {
      pl: {
        title: 'Kalkulator kosztów remontu Wrocław 2026 — aktualne ceny',
        description: 'Ile kosztuje remont mieszkania we Wrocławiu? Ekonomiczny 660–880 PLN/m², standard 990–1 320 PLN/m². Sprawdź aktualne ceny i oblicz kosztorys online.',
        h1: 'Koszt remontu we Wrocławiu 2026',
        subtitle: 'Aktualne ceny robocizny i materiałów dla Wrocławia — dane z 2026 roku',
        intro: 'Wrocław to jeden z najszybciej rozwijających się rynków nieruchomości w Polsce — rosnące inwestycje deweloperskie i napływ pracowników korporacyjnych utrzymują ceny robocizny o ok. 10% powyżej średniej krajowej, przy jednocześnie dobrej dostępności ekip.',
        marketNote: 'Największy ruch remontowy: Krzyki, Fabryczna i Psie Pole — dzielnice nowych inwestycji. Ekipy wyspecjalizowane w nowych budynkach mają kalendarze zajęte na 2–3 miesiące.',
        faq: [
          { q: 'Ile kosztuje remont mieszkania 50 m² we Wrocławiu w 2026?', a: 'Ekonomiczny 33 000–44 000 PLN, optymalny 49 500–66 000 PLN, premium 82 500–137 500 PLN.' },
          { q: 'Ile kosztuje remont kuchni we Wrocławiu?', a: 'Remont kuchni 10–12 m² we Wrocławiu (bez mebli i AGD): ekonomicznie 6 000–9 000 PLN, standardowo 9 500–15 000 PLN, premium 16 000–28 000 PLN.' },
          { q: 'Jak kształtują się ceny remontu we Wrocławiu vs. Warszawa?', a: 'Wrocław jest tańszy od Warszawy o ok. 8–10%, a ceny zbliżone do Krakowa.' },
          { q: 'Ile trwa remont mieszkania we Wrocławiu?', a: 'Standardowy remont 50 m² we Wrocławiu trwa 6–10 tygodni. Łazienka i kuchnia: po 2–3 tygodnie ze względu na prace mokre.' },
          { q: 'Jakie błędy najczęściej popełniają zleceniodawcy we Wrocławiu?', a: 'Trzy najczęstsze: (1) brak kosztorysu przed zebraniem ofert, (2) płatność całości z góry, (3) brak pisemnej umowy z zakresem prac. Każdy z tych błędów może kosztować 5 000–20 000 PLN.' },
        ],
      },
      en: {
        title: 'Wrocław Apartment Renovation Cost 2026 — Current Prices',
        description: 'How much does apartment renovation cost in Wrocław 2026? Economy: 660–880 PLN/m², standard: 990–1,320 PLN/m². Free renovation cost calculator.',
        h1: 'Renovation Cost in Wrocław 2026',
        subtitle: 'Current labor and material prices for Wrocław — 2026 data',
        intro: 'Wrocław is one of Poland\'s fastest-growing real estate markets. Developer investment and corporate workforce growth keep labor rates about 10% above the national average, with good overall crew availability.',
        marketNote: 'Renovation activity is highest in Krzyki, Fabryczna, and Psie Pole. Crews for new builds are typically booked 2–3 months ahead.',
        faq: [
          { q: 'How much does a 50 m² apartment renovation cost in Wrocław in 2026?', a: 'Economy 33,000–44,000 PLN, standard 49,500–66,000 PLN, premium 82,500–137,500 PLN.' },
          { q: 'Is Wrocław cheaper than Warsaw for renovation?', a: 'About 8–10% cheaper than Warsaw, with prices similar to Kraków.' },
          { q: 'How much does a kitchen renovation cost in Wrocław?', a: 'A 10–12 m² kitchen (excl. furniture and appliances): economy 6,000–9,000 PLN, standard 9,500–15,000 PLN, premium 16,000–28,000 PLN.' },
        ],
      },
      ru: {
        title: 'Стоимость ремонта квартиры во Вроцлаве 2026 — актуальные цены',
        description: 'Сколько стоит ремонт квартиры во Вроцлаве в 2026? Эконом 660–880 PLN/м², стандарт 990–1 320 PLN/м². Бесплатный калькулятор сметы.',
        h1: 'Стоимость ремонта во Вроцлаве 2026',
        subtitle: 'Актуальные цены на материалы и работу во Вроцлаве — данные 2026 года',
        intro: 'Вроцлав — один из самых быстроразвивающихся рынков недвижимости в Польше. Ставки на ~10% выше среднего по стране при хорошей доступности бригад.',
        marketNote: 'Наибольшая активность ремонта: Кшики, Фабрична и Псе Поле. Бригады для новостроек забронированы на 2–3 месяца вперёд.',
        faq: [
          { q: 'Сколько стоит ремонт квартиры 50 м² во Вроцлаве в 2026 году?', a: 'Эконом 33 000–44 000 PLN, оптимальный 49 500–66 000 PLN, премиум 82 500–137 500 PLN.' },
          { q: 'Вроцлав дешевле Варшавы?', a: 'Примерно на 8–10% дешевле Варшавы, цены схожи с краковскими.' },
        ],
      },
      uk: {
        title: 'Вартість ремонту квартири у Вроцлаві 2026 — актуальні ціни',
        description: 'Скільки коштує ремонт квартири у Вроцлаві в 2026? Економ 660–880 PLN/м², стандарт 990–1 320 PLN/м². Безкоштовний калькулятор.',
        h1: 'Вартість ремонту у Вроцлаві 2026',
        subtitle: 'Актуальні ціни на матеріали та роботу у Вроцлаві — дані 2026 року',
        intro: 'Вроцлав — один із найбільш швидкозростаючих ринків нерухомості в Польщі. Ставки приблизно на 10% вищі за середні по країні при хорошій доступності бригад.',
        marketNote: 'Найбільша ремонтна активність: Кшики, Фабрична та Псе Поле.',
        faq: [
          { q: 'Скільки коштує ремонт квартири 50 м² у Вроцлаві в 2026 році?', a: 'Економ 33 000–44 000 PLN, оптимальний 49 500–66 000 PLN, преміум 82 500–137 500 PLN.' },
        ],
      },
    },
  },

  /* ─── GDAŃSK ────────────────────────────────────────────────────────────── */
  {
    slug: 'gdansk', displayName: 'Gdańsk', calcCity: 'gdansk', multiplier: 1.05,
    nameLocative: { pl: 'w Gdańsku', en: 'in Gdańsk', ru: 'в Гданьске', uk: 'у Гданську' },
    ranges: { economy: R(31500,42000), standard: R(47250,63000), premium: R(78750,131250) },
    perM2:  { economy: R(630,840),    standard: R(945,1260),    premium: R(1575,2625)  },
    content: {
      pl: {
        title: 'Kalkulator kosztów remontu Gdańsk 2026 — aktualne ceny',
        description: 'Ile kosztuje remont mieszkania w Gdańsku? Ekonomiczny 630–840 PLN/m², standard 945–1 260 PLN/m². Sprawdź aktualne ceny i oblicz kosztorys online.',
        h1: 'Koszt remontu w Gdańsku 2026',
        subtitle: 'Aktualne ceny robocizny i materiałów dla Gdańska — dane z 2026 roku',
        intro: 'Gdańsk i Trójmiasto to rynek remontowy z podwójnym napędem: rosnące ceny nadmorskich nieruchomości i popyt turystyczny windują stawki ok. 5% powyżej średniej krajowej, przy jednocześnie dużej bazie specjalistycznych wykonawców.',
        marketNote: 'Największy ruch remontowy: Wrzeszcz, Oliwa i Śródmieście. Sezon letni to czas kiedy ekipy mają pełne kalendarze. Zimą (październik–marzec) można negocjować stawki i szybciej uzyskać termin.',
        faq: [
          { q: 'Ile kosztuje remont mieszkania 50 m² w Gdańsku w 2026?', a: 'Ekonomiczny 31 500–42 000 PLN, optymalny 47 250–63 000 PLN, premium 78 750–131 250 PLN.' },
          { q: 'Czy remont w Gdańsku jest tańszy niż w Warszawie?', a: 'Tak — Gdańsk jest tańszy od Warszawy o ok. 12–15% i od Krakowa/Wrocławia o ok. 4–5%. Większa baza wykonawców w całym Trójmieście sprzyja niższym cenom.' },
          { q: 'Kiedy najlepiej remontować w Gdańsku?', a: 'Najlepsza dostępność ekip i negocjowalność stawek: październik–marzec. Unikaj zlecania remontu wiosną (kwiecień–maj), gdy popyt skacze przed sezonem turystycznym.' },
          { q: 'Ile kosztuje remont pod wynajem turystyczny w Gdańsku?', a: 'Wykończenie pod najem krótkoterminowy (trwałe materiały, łatwa konserwacja) kosztuje ok. 15–20% więcej niż standard, ale stawki za dobę w Trójmieście zwracają tę inwestycję szybciej.' },
          { q: 'Jak wygląda rynek remontowy w Trójmieście vs. Gdańsk?', a: 'Sopot to najdroższa lokalizacja w Trójmieście (+10–15% vs. Gdańsk). Gdynia jest zbliżona cenowo do Gdańska. Cała metropolia ma lepszą dostępność ekip specjalizujących się w odporności na wilgoć niż inne regiony.' },
        ],
      },
      en: {
        title: 'Gdańsk Apartment Renovation Cost 2026 — Current Prices',
        description: 'How much does apartment renovation cost in Gdańsk 2026? Economy: 630–840 PLN/m², standard: 945–1,260 PLN/m². Free renovation cost calculator.',
        h1: 'Renovation Cost in Gdańsk 2026',
        subtitle: 'Current labor and material prices for Gdańsk — 2026 data',
        intro: 'Gdańsk and the Tricity area are driven by coastal property prices and tourist demand, pushing labor rates about 5% above the national average, with a large base of specialist contractors.',
        marketNote: 'Renovation activity is highest in Wrzeszcz, Oliwa, and the Old Town. Winter (October–March) is the best time to negotiate rates and availability.',
        faq: [
          { q: 'How much does a 50 m² apartment renovation cost in Gdańsk in 2026?', a: 'Economy 31,500–42,000 PLN, standard 47,250–63,000 PLN, premium 78,750–131,250 PLN.' },
          { q: 'Is Gdańsk cheaper than Warsaw for renovation?', a: 'Yes — about 12–15% cheaper than Warsaw and 4–5% cheaper than Kraków or Wrocław.' },
          { q: 'When is the best time to renovate in Gdańsk?', a: 'Best crew availability and negotiable rates: October–March. Avoid commissioning work in spring (April–May) when demand spikes before the tourist season.' },
        ],
      },
      ru: {
        title: 'Стоимость ремонта квартиры в Гданьске 2026 — актуальные цены',
        description: 'Сколько стоит ремонт квартиры в Гданьске в 2026? Эконом 630–840 PLN/м², стандарт 945–1 260 PLN/м². Бесплатный калькулятор сметы.',
        h1: 'Стоимость ремонта в Гданьске 2026',
        subtitle: 'Актуальные цены на материалы и работу в Гданьске — данные 2026 года',
        intro: 'Гданьск и Труймясто — рынок с двойным импульсом: прибрежная недвижимость и туристический спрос поднимают ставки примерно на 5% выше среднего по стране.',
        marketNote: 'Наибольшая ремонтная активность: Вжещ, Олива и Старый город. Зима — лучшее время для переговоров по ставкам.',
        faq: [
          { q: 'Сколько стоит ремонт квартиры 50 м² в Гданьске в 2026 году?', a: 'Эконом 31 500–42 000 PLN, оптимальный 47 250–63 000 PLN, премиум 78 750–131 250 PLN.' },
          { q: 'Гданьск дешевле Варшавы?', a: 'Да — примерно на 12–15% дешевле Варшавы и на 4–5% дешевле Кракова/Вроцлава.' },
        ],
      },
      uk: {
        title: 'Вартість ремонту квартири у Гданську 2026 — актуальні ціни',
        description: 'Скільки коштує ремонт квартири у Гданську в 2026? Економ 630–840 PLN/м², стандарт 945–1 260 PLN/м². Безкоштовний калькулятор.',
        h1: 'Вартість ремонту у Гданську 2026',
        subtitle: 'Актуальні ціни на матеріали та роботу у Гданську — дані 2026 року',
        intro: 'Гданськ і Трімісто — ринок з подвійним імпульсом: прибережна нерухомість та туристичний попит тримають ставки приблизно на 5% вище за середні по країні.',
        marketNote: 'Найбільша ремонтна активність: Вжещ, Оліва та Старе місто. Зима — найкращий час для переговорів щодо ставок.',
        faq: [
          { q: 'Скільки коштує ремонт квартири 50 м² у Гданську в 2026 році?', a: 'Економ 31 500–42 000 PLN, оптимальний 47 250–63 000 PLN, преміум 78 750–131 250 PLN.' },
        ],
      },
    },
  },

  /* ─── POZNAŃ ────────────────────────────────────────────────────────────── */
  {
    slug: 'poznan', displayName: 'Poznań', calcCity: 'poznan', multiplier: 1.05,
    nameLocative: { pl: 'w Poznaniu', en: 'in Poznań', ru: 'в Познани', uk: 'у Познані' },
    ranges: { economy: R(31500,42000), standard: R(47250,63000), premium: R(78750,131250) },
    perM2:  { economy: R(630,840),    standard: R(945,1260),    premium: R(1575,2625)  },
    content: {
      pl: {
        title: 'Kalkulator kosztów remontu Poznań 2026 — aktualne ceny',
        description: 'Ile kosztuje remont mieszkania w Poznaniu? Ekonomiczny 630–840 PLN/m², standard 945–1 260 PLN/m². Sprawdź aktualne ceny i oblicz kosztorys online.',
        h1: 'Koszt remontu w Poznaniu 2026',
        subtitle: 'Aktualne ceny robocizny i materiałów dla Poznania — dane z 2026 roku',
        intro: 'Poznań to jeden z bardziej zrównoważonych rynków remontowych w Polsce — stawki ok. 5% powyżej średniej krajowej, dobra dostępność ekip i stabilny popyt bez gwałtownych sezonowych skoków.',
        marketNote: 'Największy ruch remontowy: Jeżyce, Grunwald i Stare Miasto. Rynek jest stabilny przez cały rok — z nieznacznym szczytem wiosną (marzec–maj). Styczeń–marzec to najlepsza pora do negocjacji.',
        faq: [
          { q: 'Ile kosztuje remont mieszkania 50 m² w Poznaniu w 2026?', a: 'Ekonomiczny 31 500–42 000 PLN, optymalny 47 250–63 000 PLN, premium 78 750–131 250 PLN.' },
          { q: 'Ile kosztuje wykończenie nowego mieszkania w Poznaniu?', a: 'Wykończenie mieszkania od dewelopera w standardzie optymalnym w Poznaniu kosztuje 900–1 200 PLN/m² — dla 50 m² to 45 000–60 000 PLN. Wliczone: podłogi, ściany, sufit, drzwi wewnętrzne, armatura łazienkowa.' },
          { q: 'Czy Poznań jest tańszy od Warszawy i Krakowa?', a: 'Tak — ok. 12–15% tańszy od Warszawy i ok. 4–5% tańszy od Krakowa/Wrocławia. Dobra dostępność ekip wspiera niższe stawki.' },
          { q: 'Kiedy remontować w Poznaniu?', a: 'Styczeń–marzec: najlepsza dostępność ekip i możliwość negocjacji cen. Unikaj okresu kwiecień–sierpień — szczyt popytu i najdłuższe terminy oczekiwania.' },
          { q: 'Jak znaleźć dobrego wykonawcę w Poznaniu?', a: 'Sprawdzone metody: lokalne grupy Facebook ("Poleceni wykonawcy Poznań"), Oferteo, Fixly, opinie na Google Maps z datami. Zawsze poproś o referencje do weryfikacji i podpisz umowę z zakresem prac.' },
        ],
      },
      en: {
        title: 'Poznań Apartment Renovation Cost 2026 — Current Prices',
        description: 'How much does apartment renovation cost in Poznań 2026? Economy: 630–840 PLN/m², standard: 945–1,260 PLN/m². Free renovation cost calculator.',
        h1: 'Renovation Cost in Poznań 2026',
        subtitle: 'Current labor and material prices for Poznań — 2026 data',
        intro: 'Poznań is one of Poland\'s most balanced renovation markets — rates about 5% above the national average, with good crew availability and steady demand year-round.',
        marketNote: 'Renovation activity is highest in Jeżyce, Grunwald, and the Old Town. The market is stable year-round, with a small peak in spring. January–March is the best time to negotiate.',
        faq: [
          { q: 'How much does a 50 m² apartment renovation cost in Poznań in 2026?', a: 'Economy 31,500–42,000 PLN, standard 47,250–63,000 PLN, premium 78,750–131,250 PLN.' },
          { q: 'Is Poznań cheaper than Warsaw and Kraków?', a: 'Yes — about 12–15% cheaper than Warsaw and 4–5% cheaper than Kraków or Wrocław.' },
          { q: 'When is the best time to renovate in Poznań?', a: 'January–March: best crew availability and negotiable rates. Avoid April–August — peak demand and longest waiting times.' },
        ],
      },
      ru: {
        title: 'Стоимость ремонта квартиры в Познани 2026 — актуальные цены',
        description: 'Сколько стоит ремонт квартиры в Познани в 2026? Эконом 630–840 PLN/м², стандарт 945–1 260 PLN/м². Бесплатный калькулятор сметы.',
        h1: 'Стоимость ремонта в Познани 2026',
        subtitle: 'Актуальные цены на материалы и работу в Познани — данные 2026 года',
        intro: 'Познань — один из наиболее сбалансированных рынков ремонта в Польше. Ставки примерно на 5% выше среднего по стране, хорошая доступность бригад и стабильный спрос.',
        marketNote: 'Наибольшая ремонтная активность: Ежице, Грунвальд и Старый город. Январь–март — лучшее время для переговоров по ценам.',
        faq: [
          { q: 'Сколько стоит ремонт квартиры 50 м² в Познани в 2026 году?', a: 'Эконом 31 500–42 000 PLN, оптимальный 47 250–63 000 PLN, премиум 78 750–131 250 PLN.' },
          { q: 'Познань дешевле Варшавы?', a: 'Да — примерно на 12–15% дешевле Варшавы и на 4–5% дешевле Кракова/Вроцлава.' },
        ],
      },
      uk: {
        title: 'Вартість ремонту квартири у Познані 2026 — актуальні ціни',
        description: 'Скільки коштує ремонт квартири у Познані в 2026? Економ 630–840 PLN/м², стандарт 945–1 260 PLN/м². Безкоштовний калькулятор.',
        h1: 'Вартість ремонту у Познані 2026',
        subtitle: 'Актуальні ціни на матеріали та роботу у Познані — дані 2026 року',
        intro: 'Познань — один із найбільш збалансованих ринків ремонту в Польщі. Ставки приблизно на 5% вищі за середні по країні при хорошій доступності бригад.',
        marketNote: 'Найбільша ремонтна активність: Єжице, Ґрунвальд та Старе місто. Січень–березень — найкращий час для переговорів.',
        faq: [
          { q: 'Скільки коштує ремонт квартири 50 м² у Познані в 2026 році?', a: 'Економ 31 500–42 000 PLN, оптимальний 47 250–63 000 PLN, преміум 78 750–131 250 PLN.' },
        ],
      },
    },
  },

  /* ─── ŁÓDŹ ──────────────────────────────────────────────────────────────── */
  {
    slug: 'lodz', displayName: 'Łódź', calcCity: 'other', multiplier: 1.00,
    nameLocative: { pl: 'w Łodzi', en: 'in Łódź', ru: 'в Лодзи', uk: 'у Лодзі' },
    ranges: { economy: R(30000,40000), standard: R(45000,60000), premium: R(75000,125000) },
    perM2:  { economy: R(600,800),    standard: R(900,1200),    premium: R(1500,2500)  },
    content: {
      pl: {
        title: 'Kalkulator kosztów remontu Łódź 2026 — aktualne ceny',
        description: 'Ile kosztuje remont mieszkania w Łodzi? Ekonomiczny 600–800 PLN/m², standard 900–1 200 PLN/m². Sprawdź aktualne ceny i oblicz kosztorys online.',
        h1: 'Koszt remontu w Łodzi 2026',
        subtitle: 'Aktualne ceny robocizny i materiałów dla Łodzi — dane z 2026 roku',
        intro: 'Łódź to najtańszy spośród sześciu głównych rynków remontowych w Polsce. Niższe koszty życia i duże zasoby dostępnych ekip sprawiają, że robocizna jest tu ok. 15–20% tańsza niż w Warszawie — przy tych samych materiałach. Rewitalizacja centrum i OFF Piotrkowska przyciągają coraz więcej inwestorów.',
        marketNote: 'Rynek remontowy w Łodzi przeżywa drugą młodość dzięki rewitalizacji kamienic przy Piotrkowskiej, Śródmieściu i Bałutach. Dostępność ekip lepsza niż w innych dużych miastach, stawki bardziej negocjowalne — szczególnie poza sezonem.',
        faq: [
          { q: 'Ile kosztuje remont mieszkania 50 m² w Łodzi w 2026?', a: 'Ekonomiczny 30 000–40 000 PLN, optymalny 45 000–60 000 PLN, premium 75 000–125 000 PLN. To najtańsze ceny spośród sześciu głównych miast w Polsce.' },
          { q: 'Dlaczego remont w Łodzi jest tańszy niż w innych miastach?', a: 'Niższe koszty życia i zarobki wykonawców, większa dostępność siły roboczej i mniejszy popyt deweloperski utrzymują stawki na bazowym poziomie. Łódź oferuje lepszy ROI dla inwestorów remontowych.' },
          { q: 'Ile kosztuje remont kamienicy w Łodzi?', a: 'Remont mieszkania w łódzkiej kamienicy wymaga często dodatkowych nakładów: wzmocnienia stropów, wymiany instalacji i izolacji akustycznej. Całkowity koszt 50 m² kamienicy w Łodzi: 60 000–150 000 PLN zależnie od stanu technicznego.' },
          { q: 'Czy warto inwestować w remont pod wynajem w Łodzi?', a: 'Tak — niskie ceny zakupu i rosnący popyt (studenci, pracownicy korporacji) sprawia, że ROI z remontowanego mieszkania pod wynajem długoterminowy w Łodzi jest często wyższy niż w Warszawie. Czas zwrotu z remontu: 4–7 lat.' },
          { q: 'Jakie dzielnice w Łodzi warto remontować?', a: 'Najlepsze perspektywy: Śródmieście (Piotrkowska), Polesie i Widzew. Bałuty i Górna — dużo starszego zasobu, niskie ceny zakupu i rosnąca popularność wśród inwestorów.' },
        ],
      },
      en: {
        title: 'Łódź Apartment Renovation Cost 2026 — Current Prices',
        description: 'How much does apartment renovation cost in Łódź 2026? Economy: 600–800 PLN/m², standard: 900–1,200 PLN/m². Free renovation cost calculator.',
        h1: 'Renovation Cost in Łódź 2026',
        subtitle: 'Current labor and material prices for Łódź — 2026 data',
        intro: 'Łódź is the most affordable of Poland\'s six major renovation markets — labor rates are 15–20% below Warsaw\'s, with large crew availability. City-center revitalization is attracting growing investor interest.',
        marketNote: 'Łódź\'s renovation market is reviving thanks to tenement redevelopment along Piotrkowska, Śródmieście, and Bałuty. Crew availability is typically better than in other major cities, with more negotiating room — especially off-season.',
        faq: [
          { q: 'How much does a 50 m² apartment renovation cost in Łódź in 2026?', a: 'Economy 30,000–40,000 PLN, standard 45,000–60,000 PLN, premium 75,000–125,000 PLN. The lowest prices among Poland\'s six major cities.' },
          { q: 'Why is renovation in Łódź cheaper than other Polish cities?', a: 'Lower cost of living, larger labor supply, and lower developer demand keep rates at baseline. Łódź offers better ROI for renovation investors compared to Warsaw or Kraków.' },
          { q: 'Is Łódź a good market for renovation investment?', a: 'Yes — low purchase prices and growing rental demand (students, corporate workers) means renovation ROI in Łódź often exceeds Warsaw. Payback period: 4–7 years.' },
        ],
      },
      ru: {
        title: 'Стоимость ремонта квартиры в Лодзи 2026 — актуальные цены',
        description: 'Сколько стоит ремонт квартиры в Лодзи в 2026? Эконом 600–800 PLN/м², стандарт 900–1 200 PLN/м². Бесплатный калькулятор сметы.',
        h1: 'Стоимость ремонта в Лодзи 2026',
        subtitle: 'Актуальные цены на материалы и работу в Лодзи — данные 2026 года',
        intro: 'Лодзь — самый доступный из шести крупных рынков ремонта в Польше. Ставки на 15–20% ниже варшавских при большой доступности бригад. Реновация центра города привлекает всё больше инвесторов.',
        marketNote: 'Рынок ремонта в Лодзи переживает подъём благодаря реновации многоквартирных домов вдоль Пётрковской и Балут. Доступность бригад лучше, чем в других крупных городах.',
        faq: [
          { q: 'Сколько стоит ремонт квартиры 50 м² в Лодзи в 2026 году?', a: 'Эконом 30 000–40 000 PLN, оптимальный 45 000–60 000 PLN, премиум 75 000–125 000 PLN. Самые низкие цены среди шести крупных городов Польши.' },
          { q: 'Почему ремонт в Лодзи дешевле?', a: 'Более низкий уровень жизни, большой рынок труда и меньший девелоперский спрос удерживают ставки на базовом уровне.' },
        ],
      },
      uk: {
        title: 'Вартість ремонту квартири у Лодзі 2026 — актуальні ціни',
        description: 'Скільки коштує ремонт квартири у Лодзі в 2026? Економ 600–800 PLN/м², стандарт 900–1 200 PLN/м². Безкоштовний калькулятор.',
        h1: 'Вартість ремонту у Лодзі 2026',
        subtitle: 'Актуальні ціни на матеріали та роботу у Лодзі — дані 2026 року',
        intro: 'Лодзь — найдоступніший з шести великих ринків ремонту в Польщі. Ставки на 15–20% нижчі за варшавські при великій доступності бригад.',
        marketNote: 'Ринок ремонту в Лодзі переживає підйом завдяки реновації будинків вздовж вулиці Пйотрківської та Балут. Доступність бригад краща, ніж в інших великих містах.',
        faq: [
          { q: 'Скільки коштує ремонт квартири 50 м² у Лодзі в 2026 році?', a: 'Економ 30 000–40 000 PLN, оптимальний 45 000–60 000 PLN, преміум 75 000–125 000 PLN. Найнижчі ціни серед шести великих міст Польщі.' },
        ],
      },
    },
  },
]

export const CITY_MAP: Record<string, CityData> = Object.fromEntries(CITIES.map(c => [c.slug, c]))
