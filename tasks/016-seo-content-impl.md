# SEO CONTENT — IMPLEMENTATION

Goal:

Publish SEO-optimized article content using the structure from task 012.

Depends on:

012-content-seo-localization.md
015-localization-impl.md

Activities:

* implement article template as reusable Next.js layout:
  * hero image (region-relevant renovation photo)
  * hook paragraph
  * problem section
  * explanation section (with product reference)
  * checklist component
  * CTA block (links to free estimate tool)
  * metadata: title, description, og:image, canonical URL
* set up /blog or /articles route for content
* implement MDX or CMS-compatible content source (MDX files recommended for prototype)
* write 3 pilot articles (one per cluster category):
  * Budget: "Why estimate renovation costs before you start"
  * Rooms: "Kitchen renovation cost in Poland — what to expect"
  * Regional: "Warsaw renovation costs 2024 — room-by-room breakdown"
* add JSON-LD structured data (Article schema) to each article
* add internal CTA in each article linking to the estimate tool
* add sitemap.xml generation
* add robots.txt

Output:

article template, 3 pilot articles, sitemap, CTA integration

Validation:

3 articles render correctly with metadata; CTA links to estimate flow; sitemap includes article URLs
