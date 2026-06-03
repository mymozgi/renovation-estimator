# LOCALIZATION — IMPLEMENTATION

Goal:

Implement multi-language support for Polish, Ukrainian, Russian, and Belarusian.

Depends on:

012-content-seo-localization.md

Activities:

* choose i18n approach:
  * use next-intl (recommended for Next.js App Router) or next-i18next
  * install package, configure middleware for locale detection
  * routes: /pl/* (default), /uk/*, /ru/*, /be/*
* extract all UI strings to locale JSON files:
  * messages/pl.json (Polish — primary)
  * messages/uk.json (Ukrainian)
  * messages/ru.json (Russian)
  * messages/be.json (Belarusian)
  * scope: landing, wizard steps, report, download, methodology, error states
* translate all strings for all 4 languages
* update number formatting:
  * currency: PLN throughout
  * decimal separator: locale-aware (e.g. space as thousands separator in Polish: 48 300 PLN)
* update city labels to render in each language
* add language switcher to landing and navigation
* test all 4 locales end-to-end: landing → wizard → report → download
* ensure HTML lang attribute is set correctly per locale

Output:

4-language product, locale switcher, locale-aware formatting

Validation:

full wizard flow works in all 4 languages; city names and PLN values render correctly
