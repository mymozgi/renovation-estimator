# Project Status

## Current Phase
MVP Polish → Pre-Launch Security & Analytics

## Current Sprint
Security Hardening + Analytics Setup

---

## Completed

### Sprint: Core Infrastructure
- [x] Monorepo folder architecture (apps/web, apps/api)
- [x] Next.js 16 + TypeScript + Tailwind v4
- [x] shadcn/ui component library
- [x] Token-based design system (CSS variables, dark mode, breakpoints)
- [x] FastAPI backend structure

### Sprint: Audit Pipeline
- [x] Screenshot service (Playwright, desktop 1440px + mobile 390px, JS fallback)
- [x] Metadata extraction (BeautifulSoup)
- [x] AI audit analysis (Claude, structured JSON output, regions)
- [x] Mock analysis (realistic data, no API key required)
- [x] Visual issue regions + screenshot annotations
- [x] Audit context configurator (pre-audit tag selector)

### Sprint: Monetisation
- [x] Free / premium section split (UX + Accessibility free)
- [x] Paywall blur overlay (PremiumLock component)
- [x] Premium insights placeholder (4 locked cards + Upgrade CTA)
- [x] Lemon Squeezy checkout flow (dev mode + real LS key path)
- [x] Payment verification endpoint (GET /api/v1/payment/verify)
- [x] localStorage unlock persistence

### Sprint: Report UI
- [x] Audit report page with free + locked sections
- [x] Score overview (4 SVG progress bars with colour coding)
- [x] Severity badges (Critical / Warning / Info / Good)
- [x] Expandable screenshot annotations per issue card
- [x] PDF export (fpdf2 — executive summary, score bars, key findings, recommendations)
- [x] Download PDF button

### Sprint: MVP Polish (SEO & UX)
- [x] Header navigation (sticky, logo, nav links, mobile hamburger)
- [x] Footer (Privacy Policy link, Analyze Website)
- [x] Privacy Policy page (/privacy-policy) with Acceptable Use block
- [x] Audit loading screen (dual spinner, rotating messages, skeleton)
- [x] Report charts (score overview component, PDF score bars)
- [x] SEO content pages: /how-it-works, /sample-report, /pricing, /faq
- [x] SEO technical foundation (sitemap.xml, robots.txt, OG tags, Twitter cards, JSON-LD, canonical URLs, noindex on /audit)
- [x] Landing page content optimisation (no buzzwords, benefit-driven copy, structured data)

### Codebase & Architecture
- [x] Select UI Library (shadcn/ui)

---

## In Progress

### Landing Page
- [ ] **Landing page inline sections** — How It Works, Pricing, FAQ exist as separate routes but not as scrollable anchor sections on the home page. Nav anchor links (#how-it-works etc.) currently point to separate pages, not inline sections.

### Compliance
- [ ] **Privacy Review** — Privacy Policy page exists; no formal legal review completed.

### Security
- [ ] **URL Validation** — Frontend validates http/https prefix; backend uses Pydantic HttpUrl. No server-side SSRF / private IP blocking implemented yet.

---

## Backlog

### Security (Priority: High)
- [ ] SSRF Protection (block private IPs, internal ranges in screenshot + metadata services)
- [ ] Rate Limiting (slowapi or equivalent on audit + screenshot endpoints)
- [ ] Security Headers (CSP, X-Frame-Options, HSTS in next.config.ts and FastAPI)
- [ ] Security Audit (full review of all endpoints)

### Compliance
- [ ] Terms of Service page (/terms)
- [ ] Cookie Strategy (consent banner if cookies added)

### Codebase & Architecture
- [ ] Code Audit
- [ ] Architecture Review

### Data Storage
- [ ] Select Storage Solution (PostgreSQL / Supabase / PlanetScale)
- [ ] Database Design
- [ ] Audit History (persist reports per session or user)
- [ ] Report Storage (persist screenshots, avoid regeneration)

### Product Analytics
- [ ] Select Analytics Platform (Plausible / PostHog / Mixpanel)
- [ ] Event Tracking (URL submit, report view, unlock, PDF download)
- [ ] Funnel Tracking (submit → free view → upgrade → PDF)

### Testing
- [ ] Unit Tests (Vitest + pytest)
- [ ] Integration Tests (API endpoint coverage)
- [ ] E2E Tests (Playwright — full audit flow, payment flow)
- [ ] Security Tests (SSRF, input fuzzing)

### Marketing & Retention
- [ ] Lead Capture (email input, mailing list)
- [ ] Report Email Delivery
- [ ] 30-Day Follow-up Email

### Product
- [ ] OG image (/public/og-image.png — referenced in metadata but not yet created)
- [ ] Terms of Service page

---

## Current Priority

1. SSRF Protection + Rate Limiting (Security — blocking launch risk)
2. Security Headers (next.config.ts + FastAPI)
3. Terms of Service page
4. OG image creation
5. Analytics platform selection + basic event tracking
6. Landing page inline sections (anchor scroll UX)

---

## Launch Readiness

UI/UX: 92%
SEO: 82%
Security: 22%
Analytics: 0%
Testing: 10%

Overall: 65%

