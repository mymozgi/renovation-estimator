# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The repository root is **not** an npm package. The application lives entirely in
`prototype/` — that is where `package.json`, all source and all tooling sit. Run every
npm command from there.

| Path | What it is |
|---|---|
| `prototype/` | The Next.js application. All code changes happen here. |
| `context-docs/` | Product specs. `PRD.md` is authoritative; see `context-docs/CLAUDE.md`. |
| `skills/`, `routing/` | Prompt-engineering assets for agent workflows, not application code. |
| `references/wireframes/` | Design references. |

`prototype/CLAUDE.md` imports `prototype/AGENTS.md`, which carries a standing warning:
**this is Next.js 16, which has breaking changes relative to older training data.**
Consult `prototype/node_modules/next/dist/docs/` before writing framework code rather
than relying on remembered Next.js conventions.

## Commands

All from `prototype/`:

```bash
npm run dev            # dev server on :3000 (Turbopack)
npm run build          # production build — also runs the TypeScript check
npm run lint           # eslint
npm test               # Playwright suite (auto-starts the dev server)
npm run test:ui        # Playwright UI mode
npx playwright test tests/smoke.spec.ts -g "hero CTA"   # a single test by title
```

`npx tsc --noEmit` type-checks without building, but it reads the generated route types
in `.next/`. After routes are added or deleted those types go stale and report phantom
errors about missing route modules — `rm -rf .next` and rebuild before believing them.

## Architecture

### Two parallel estimator implementations

This is the single most important thing to understand before changing calculation or
wizard code. Two complete, unconnected stacks exist:

**Live stack — `/kalkulator`.** `src/app/[locale]/kalkulator/page.tsx` is a ~1000-line
self-contained client component holding its own Polish-named domain types
(`'warszawa'`, `'ekonomiczny'`), its own `useState` wizard machine, and its own
estimator `calcEst()` — a single PLN-per-m² baseline scaled by city and standard
multipliers. It hands off to the PDF flow through `localStorage` under
`remontowo_pdf_data` / `remontowo_email`, shaped by `src/lib/kosztorys-types.ts`, and
consumed by `/pobierz`, `KosztorysPDF.tsx` and `POST /api/email-pdf` (which receives an
already-rendered PDF as base64 and only mails it).

**Legacy stack — `/rooms`, `/estimate`, `/report`, `/download`.** These use the
English-named `src/lib/types.ts`, the Zustand store in `src/lib/store.ts`, and the
per-surface engine in `src/lib/calculations.ts` + `src/lib/pricing.ts` (area maths,
material/labor/preparation ranges per finish × tier, regional multipliers). Its PDF is
`src/lib/pdf.tsx`, rendered server-side by `POST /api/send-report`.

The legacy routes still build but nothing links to them and they are absent from the
sitemap; the landing page and nav point only at `/kalkulator`. The `context-docs/`
specs describe the legacy model, so specs and live behaviour disagree — the live
calculator is the one users reach. Decide deliberately which stack a change belongs to.
`src/lib/db.ts` (Supabase subscriber storage) is likewise orphaned — nothing imports it,
so `SUPABASE_URL` / `SUPABASE_SECRET_KEY` are currently unused at runtime.

### Internationalisation

`next-intl` with locales `pl` (default), `en`, `ru`, `uk` declared in
`src/i18n/routing.ts`. Every page lives under `src/app/[locale]/`. `messages/be.json`
exists but Belarusian is not in `routing`, so it is inert — add the locale to `routing`
to enable it.

Locale negotiation runs in **`src/proxy.ts`**, not `middleware.ts` — Next.js 16 renamed
the file. `src/app/layout.tsx` is a pass-through returning `children`; the real
`<html>`/`<body>`, fonts and providers are in `src/app/[locale]/layout.tsx`, so
document-level additions belong there.

### Scheduled article publishing

`src/content/articles.ts` holds the full article bodies keyed by locale, each with a
`publishedAt` date. `publishedArticles()` hides future-dated entries in production but
shows them all in `next dev`, so drafts are reviewable locally and go live on their date
with no redeploy. `sitemap.ts` sets `revalidate = 3600` to match. An article queue is
already scheduled out to 2027 — adding one means adding a dated entry, not shipping a
page.

### SEO

`src/lib/seo.ts` centralises this: `SITE_URL` from `NEXT_PUBLIC_BASE_URL`,
`alternatesFor()` for canonical + hreflang (including `x-default`), and a `NOINDEX`
constant for funnel and preview steps. `NEXT_PUBLIC_BASE_URL` must exactly match the
served host, www prefix included, or canonicals and the sitemap point at the wrong
origin. `src/content/cities.ts` drives the programmatic `/remont/[city]` pages.

### Styling

Tailwind v4, configured entirely through the `@theme inline` block in
`src/app/globals.css` — there is no `tailwind.config`. Use the semantic aliases
(`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-primary`, `bg-surface`) rather
than raw palette steps; they map to the Figma design system, and the raw `green-*` /
`charcoal-*` scales exist to define them.

## Deployment

Vercel, from `prototype/vercel.json`. Because the app is in a subdirectory, the Vercel
project's **Root Directory must be set to `prototype`**. `prototype/.env.example`
documents the environment variables and what degrades without each — notably, a missing
`RESEND_API_KEY` makes `/api/email-pdf` answer 503 `NOT_CONFIGURED` and the PDF is
downloaded in the browser but never emailed.

## Conventions

Commits are plain imperative sentences describing the effect
(`Publish articles on a schedule instead of on merge`). Note that
`skills/standards/git-workflow-standards.md` prescribes Conventional Commits; the
repository does not follow it, and the observed style above is the real convention.

`context-docs/PROJECT_STATUS.md` is an unfilled template, and `context-docs/TESTING.md`
describes a Vitest and Pytest stack that does not exist — the only tests are the
Playwright specs in `prototype/tests/`. Treat those two documents as aspirational.
