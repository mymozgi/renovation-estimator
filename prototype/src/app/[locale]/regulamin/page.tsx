import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingHeader } from '@/components/LandingHeader'
import { LandingFooter } from '@/components/LandingFooter'

export const metadata: Metadata = {
  title: 'Regulamin — Remontowo | Kalkulator kosztów remontu',
  description: 'Regulamin korzystania z serwisu Remontowo.pl — bezpłatnego kalkulatora kosztów remontu. Przeczytaj zasady korzystania z narzędzia oraz politykę prywatności.',
  robots: { index: true, follow: true },
}

type Props = { params: Promise<{ locale: string }> }

const SECTIONS = [
  {
    id: 'definicje',
    title: '§1. Definicje',
    content: [
      '**Serwis** — strona internetowa dostępna pod adresem remontowo.pl, umożliwiająca szacowanie kosztów prac remontowych.',
      '**Użytkownik** — każda osoba fizyczna lub prawna korzystająca z Serwisu.',
      '**Kalkulator** — narzędzie informatyczne dostępne w Serwisie, generujące szacunkowe kosztorysy remontów.',
      '**Kosztorys** — wynik działania Kalkulatora, wyrażony w PLN, stanowiący orientacyjne oszacowanie kosztów remontu.',
      '**Usługodawca** — podmiot udostępniający Serwis i Kalkulator.',
    ],
  },
  {
    id: 'postanowienia-ogolne',
    title: '§2. Postanowienia ogólne',
    content: [
      'Regulamin określa zasady korzystania z Serwisu Remontowo, a w szczególności z Kalkulatora kosztów remontu.',
      'Korzystanie z Serwisu jest bezpłatne i nie wymaga rejestracji ani zakładania konta użytkownika.',
      'Przeglądanie Serwisu i korzystanie z Kalkulatora jest możliwe po akceptacji niniejszego Regulaminu, która następuje przez korzystanie z Serwisu.',
      'Serwis jest przeznaczony wyłącznie do celów informacyjnych i nie stanowi oferty handlowej w rozumieniu art. 66 Kodeksu cywilnego.',
    ],
  },
  {
    id: 'zakres-uslug',
    title: '§3. Zakres usług',
    content: [
      'Serwis udostępnia Kalkulator szacujący koszty remontu na podstawie danych wprowadzonych przez Użytkownika: rodzaju nieruchomości, powierzchni, lokalizacji i standardu wykończenia.',
      'Generowane Kosztorysy mają charakter szacunkowy i orientacyjny. Rzeczywiste koszty remontu mogą się różnić w zależności od specyficznych warunków, wymagań technicznych, wybranych wykonawców i aktualnych cen rynkowych.',
      'Serwis może udostępniać artykuły i poradniki o charakterze informacyjnym dotyczące rynku remontowego.',
      'Usługodawca zastrzega prawo do modyfikacji zakresu usług, w tym Kalkulatora, bez uprzedniego powiadomienia.',
    ],
  },
  {
    id: 'obowiazki-uzytkownika',
    title: '§4. Obowiązki Użytkownika',
    content: [
      'Użytkownik zobowiązuje się korzystać z Serwisu zgodnie z jego przeznaczeniem oraz obowiązującym prawem.',
      'Zakazane jest korzystanie z Serwisu w sposób zakłócający jego działanie lub uciążliwy dla innych Użytkowników.',
      'Zakazane jest podejmowanie działań mających na celu nieuprawniony dostęp do danych lub systemów Usługodawcy.',
      'Użytkownik przyjmuje do wiadomości, że Kosztorys ma charakter wyłącznie szacunkowy i nie zastępuje wyceny sporządzonej przez profesjonalnego kosztorysanta lub wykonawcę.',
    ],
  },
  {
    id: 'odpowiedzialnosc',
    title: '§5. Odpowiedzialność i ograniczenia',
    content: [
      'Usługodawca dokłada wszelkich starań, aby dane w Serwisie były aktualne i zgodne z realiami rynkowymi, jednak nie gwarantuje ich pełnej dokładności, kompletności ani aktualności.',
      'Usługodawca nie ponosi odpowiedzialności za decyzje finansowe lub zakupowe podjęte przez Użytkownika na podstawie Kosztorysu wygenerowanego przez Kalkulator.',
      'Usługodawca nie ponosi odpowiedzialności za ewentualne przerwy w działaniu Serwisu spowodowane pracami technicznymi, awariami lub przyczynami niezależnymi od Usługodawcy.',
      'Całkowita odpowiedzialność Usługodawcy względem Użytkownika, niezależnie od podstawy prawnej, jest ograniczona do przypadków wyrządzenia szkody z winy umyślnej.',
    ],
  },
  {
    id: 'dane-osobowe',
    title: '§6. Dane osobowe i prywatność',
    content: [
      'Serwis nie wymaga podawania danych osobowych w celu korzystania z Kalkulatora. Wygenerowane Kosztorysy nie są przypisywane do konkretnych Użytkowników.',
      'Serwis może zbierać anonimowe dane statystyczne dotyczące korzystania z Serwisu (np. liczba odwiedzin, regiony, typy urządzeń) za pomocą narzędzi analitycznych.',
      'W zakresie, w jakim Serwis zbiera dane osobowe (np. w formularzach kontaktowych), dane te przetwarzane są zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).',
      'Użytkownik ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia oraz przenoszenia, a także do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
    ],
  },
  {
    id: 'wlasnosc-intelektualna',
    title: '§7. Własność intelektualna',
    content: [
      'Wszelkie treści udostępniane w Serwisie, w tym teksty, grafiki, logotypy, kod oprogramowania Kalkulatora, podlegają ochronie prawnoautorskiej i stanowią własność Usługodawcy lub podmiotów, którym Usługodawca udzielił stosownych licencji.',
      'Użytkownik uprawniony jest do korzystania z Serwisu wyłącznie na własny, niekomercyjny użytek.',
      'Kopiowanie, reprodukowanie, rozpowszechnianie lub modyfikowanie treści Serwisu bez pisemnej zgody Usługodawcy jest zakazane.',
    ],
  },
  {
    id: 'postanowienia-koncowe',
    title: '§8. Postanowienia końcowe',
    content: [
      'Regulamin wchodzi w życie z dniem opublikowania w Serwisie.',
      'Usługodawca zastrzega prawo do zmiany Regulaminu. O istotnych zmianach Użytkownicy będą informowani poprzez stosowne powiadomienie w Serwisie.',
      'W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.',
      'Wszelkie spory wynikające z korzystania z Serwisu będą rozpatrywane przez sąd właściwy miejscowo dla siedziby Usługodawcy.',
      'Data ostatniej aktualizacji Regulaminu: 1 stycznia 2026 roku.',
    ],
  },
]

export default async function RegulaminPage({ params }: Props) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />

      {/* Hero */}
      <section className="bg-surface border-b border-border py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-primary-fixed text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulamin
          </span>
          <h1 className="font-bold text-fg text-3xl md:text-4xl leading-tight mb-3">
            Regulamin serwisu Remontowo
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Ostatnia aktualizacja: 1 stycznia 2026 roku
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[220px_1fr] gap-10">

          {/* TOC sidebar */}
          <nav className="hidden md:block">
            <div className="sticky top-6">
              <div className="text-xs font-semibold text-fg uppercase tracking-wider mb-3">Spis treści</div>
              <ol className="flex flex-col gap-2">
                {SECTIONS.map(({ id, title }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-xs text-muted hover:text-primary transition-colors leading-snug block"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {SECTIONS.map(({ id, title, content }) => (
              <section key={id} id={id} className="scroll-mt-6">
                <h2 className="font-bold text-fg text-lg mb-4 pb-2 border-b border-border">{title}</h2>
                <ol className="flex flex-col gap-3">
                  {content.map((item, i) => {
                    const parts = item.split(/\*\*(.*?)\*\*/g)
                    return (
                      <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                        <span className="shrink-0 w-5 text-right text-xs text-border font-mono mt-0.5">{i + 1}.</span>
                        <p>
                          {parts.map((part, j) =>
                            j % 2 === 1
                              ? <strong key={j} className="text-fg font-semibold">{part}</strong>
                              : <span key={j}>{part}</span>
                          )}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </section>
            ))}

            {/* Contact */}
            <section className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="font-semibold text-fg text-base mb-2">Kontakt</h2>
              <p className="text-muted text-sm leading-relaxed mb-3">
                W przypadku pytań dotyczących niniejszego Regulaminu lub Serwisu prosimy o kontakt mailowy.
              </p>
              <a
                href="mailto:kontakt@remontowo.pl"
                className="text-sm text-primary font-medium hover:underline"
              >
                kontakt@remontowo.pl
              </a>
            </section>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-primary-fixed border border-border rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-semibold text-fg text-base mb-1">Gotowy na kosztorys?</div>
            <p className="text-muted text-sm">Bezpłatnie, bez rejestracji, w 5 minut.</p>
          </div>
          <Link
            href={`/${locale}/kalkulator`}
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-[12px] font-semibold text-base tracking-[0.08em] hover:bg-primary/90 transition-colors"
          >
            Oblicz kosztorys
          </Link>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
