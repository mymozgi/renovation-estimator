# LANDING PAGE — IMPLEMENTATION

Goal:

Implement the full marketing landing page based on spec from task 017.

Depends on:

017-landing-page-redesign.md

Activities:

* build Hero section:
  * full-width image placeholder (grey rounded rectangle, labeled "renovation photo")
  * bold serif headline
  * value proposition subheadline
  * primary CTA button
  * social proof line

* build How it Works section:
  * 3 cards in a row (stacked on mobile)
  * icon + step number + title + description
  * image placeholder for wizard screenshot

* build For Whom section:
  * 3 cards with image placeholders (grey rectangle, labeled by audience)
  * title + 2-line description per card

* build What You Get section:
  * icon list of 5 features
  * clean horizontal layout

* build Pricing Transparency teaser:
  * reuse block from current landing
  * link to /methodology

* build FAQ section:
  * 8 questions as accordion (expand/collapse)
  * answers written in plain language, no jargon
  * translatable via locale files (add faq keys to messages/*.json)

* build Articles preview:
  * show 3 articles from the articles list
  * cluster badge + title + description + "Read →"
  * link to /[locale]/articles

* build Final CTA section:
  * image placeholder
  * headline + subtext
  * CTA button

* add language switcher to landing header (top-right)
* add links to /articles in landing navigation or footer
* ensure all copy is translatable (add landing section keys to messages/*.json)
* verify responsive layout at 390px (all sections stack, no overflow)

Output:

full landing page implemented with all 8 sections, image placeholders, FAQ accordion, articles preview

Validation:

page scrolls through all sections on mobile; FAQ expands/collapses; articles link goes to /[locale]/articles; 3 CTAs visible at scroll positions top / mid / bottom
