# SITEMAP + SEO

Goal:

Make all pages discoverable by search engines — sitemap.xml, robots.txt, JSON-LD structured data for articles, and Open Graph metadata.

Business logic:

SEO articles (task 016) exist but Google cannot efficiently index them without a sitemap. Without JSON-LD, articles don't qualify for Rich Results (enhanced search listings). This is the difference between organic traffic existing or not. Organic search is the primary growth channel for this product.

---

## Activities

### sitemap.xml

Create `src/app/sitemap.ts` (Next.js built-in, generates /sitemap.xml):

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['pl', 'en', 'uk', 'ru', 'be']
  const baseUrl = 'https://yourdomain.com'

  // Static pages per locale
  const staticPages = locales.flatMap((locale) => [
    { url: `${baseUrl}/${locale}`,             changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/${locale}/methodology`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/${locale}/articles`,    changeFrequency: 'weekly',  priority: 0.8 },
  ])

  // Article pages per locale
  const articlePages = locales.flatMap((locale) =>
    (articles[locale] ?? []).map((a) => ({
      url:             `${baseUrl}/${locale}/articles/${a.slug}`,
      lastModified:    new Date(a.publishedAt),
      changeFrequency: 'monthly' as const,
      priority:        0.7,
    }))
  )

  return [...staticPages, ...articlePages]
}
```

### robots.txt

Create `src/app/robots.ts`:

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### JSON-LD for articles

Add to `[locale]/articles/[slug]/page.tsx`:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  datePublished: article.publishedAt,
  author: { '@type': 'Organization', name: 'EstiMate' },
  publisher: { '@type': 'Organization', name: 'EstiMate', url: baseUrl },
}
// Inject: <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
```

### Open Graph metadata

Add `generateMetadata()` to article and landing pages:

```typescript
export async function generateMetadata({ params }) {
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    alternates: {
      canonical: `/${locale}/articles/${slug}`,
      languages: { pl: `/pl/articles/${slug}`, en: `/en/articles/${slug}` }
    }
  }
}
```

### hreflang

Add `alternates.languages` to all locale pages so Google knows about language variants.

---

Output:

/sitemap.xml, /robots.txt, JSON-LD on articles, Open Graph on landing + articles, hreflang on all pages

Validation:

Google Search Console accepts sitemap without errors; Rich Results Test shows Article structured data; Open Graph debugger shows correct preview
