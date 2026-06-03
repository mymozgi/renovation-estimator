# CONTENT, SEO AND LOCALIZATION

Goal:

Prepare the growth foundation: localized product and SEO-ready content structure.

---

## Part 1 — Localization

Languages:

* Polish — /pl (primary)
* English — /en
* Ukrainian — /uk
* Russian — /ru
* Belarusian — /be

Activities:

* set up i18n routing in Next.js with locale prefix (/pl, /en, /uk, /ru, /be)
* extract all UI strings into locale files (JSON)
* translate: landing, wizard screens, report, download, methodology
* apply locale-aware number formatting (PLN currency, decimal separators)
* ensure city names render correctly in each language
* implement language selector as dropdown with flag icons:
  * 🇵🇱 Polski
  * 🇬🇧 English
  * 🇺🇦 Українська
  * 🇷🇺 Русский
  * 🇧🇾 Беларуская
  * dropdown must show current language flag + name
  * dropdown must be accessible (keyboard navigable)
  * positioned top-right on landing, visible on all pages

---

## Part 2 — SEO Article Template

Each article must contain:

* hero image (renovation-related, region-relevant)
* hook (1 paragraph — problem the reader has)
* problem (expanded, why this is painful or costly)
* explanation (how the product solves it)
* checklist (actionable steps reader can take)
* CTA (link to free estimate tool)

---

## Part 3 — Content Clusters

Budget:

* why estimate before renovation
* hidden renovation costs homeowners miss
* renovation estimate psychology — why people underestimate

Contractors:

* how to choose a renovation company in Poland
* questions to ask before signing a contract
* how to accept completed renovation work

Property Types:

* apartment renovation estimate
* house renovation estimate
* townhouse renovation
* semi-detached house
* coastal property renovation

Rooms:

* kitchen renovation cost
* bathroom renovation cost
* garage renovation
* balcony renovation
* hallway and vestibule
* master bedroom renovation
* children's room renovation
* home office renovation

Materials:

* where to save on renovation materials
* where not to save (what cutting corners costs you)

Regional (one article per city):

* Warsaw renovation costs and specifics
* Kraków renovation costs and specifics
* Wrocław renovation costs and specifics
* Gdańsk renovation costs and specifics
* Poznań renovation costs and specifics

---

Output:

i18n setup, article template, content cluster map, 3 pilot articles

Validation:

product renders correctly in all 5 languages; language dropdown shows correct flag and switches locale; at least 1 article per cluster is publishable
