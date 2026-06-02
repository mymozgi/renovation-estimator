# Renovation Estimator — Engineering Rules

## Philosophy

Build:

* lean
* modular
* scalable
* MVP-ready
* production quality

Avoid:

* overengineering
* premature abstractions
* enterprise complexity
* unnecessary infrastructure

Primary principle:

Deliver user value before adding complexity.

---

# Product Definition

This product is NOT:

* contractor software
* BIM software
* CAD software
* procurement system
* project management software

This product IS:

* renovation budgeting assistant
* renovation estimate generator
* consumer renovation planner

Primary user:

Homeowners who want to understand approximately how much renovation may cost.

Core pain:

Users do not understand renovation budgets and material costs before starting renovation.

Target outcome:

Budget confidence.

NOT engineering precision.

Target estimate variance:

±10–15%

---

# Platform Rules

Application Type:

Responsive Web Application

Supported:

* Desktop (primary)
* Mobile (adaptive)
* Tablet (adaptive)

Do NOT optimize for:

* PWA
* offline mode
* native apps

Responsive strategy:

Desktop → source layout

Mobile → adaptation

---

# Tech Stack

Frontend:

* Next.js
* TypeScript
* Tailwind
* shadcn/ui

Backend:

Preferred:

* FastAPI

Alternative:

* Next.js Server Actions
* Supabase

Choose lowest complexity option.

AI:

* Claude
* OpenAI

Automation:

* Playwright

PDF:

* React PDF

---

# Frontend Rules

Build:

* responsive-first
* desktop-optimized
* reusable components
* semantic tokens
* CSS variables
* responsive layouts

Avoid:

* inline styles
* duplicated UI
* giant forms
* large components

Rules:

* components < 200 LOC preferred
* separate UI and business logic
* use reusable primitives
* preserve responsive behavior

---

# Backend Rules

Build:

* modular services
* typed responses
* async APIs
* clean validation

Avoid:

* unnecessary microservices
* queues
* background jobs
* excessive abstraction

---

# Estimation Rules

Estimate includes:

* materials
* supporting materials
* preparation work
* labor work
* regional pricing

Estimate hierarchy:

Materials
+
Preparation
+
Labor
+
Supporting Materials
×
Regional Multiplier

Always return:

* minimum estimate
* maximum estimate

Never output:

* single exact estimate

Use ranges.

---

# Pricing Rules

Country:

Poland

Supported regions:

* Warsaw
* Krakow
* Wroclaw
* Gdansk
* Poznan

Future-ready:

Country
→ Region
→ Renovation Tier

Pricing layers:

* Economy
* Standard
* Premium

Pricing should be:

* curated
* stable
* updateable

Avoid:

* real-time pricing
* live scraping
* exact SKU pricing

---

# Material Rules

Default Mode:

Tier-based estimation

Optional Mode:

Product URL import

Supported stores:

* Leroy Merlin
* Castorama

Product links:

* optional
* never mandatory

Preferred estimation flow:

Tier
→ Estimate

Advanced flow:

Tier
→ Product links
→ Refined estimate

---

# Labor Rules

Labor should:

* calculate automatically
* depend on region
* depend on room size
* depend on finish type
* depend on preparation complexity

Users should NOT:

* manually enter labor prices

Display:

* labor ranges
* labor per m²

---

# UX Rules

Primary UX Goal:

Reduce anxiety around renovation budgeting.

UX principles:

* low cognitive load
* progressive disclosure
* instant feedback
* estimate visibility
* touch-friendly controls

Desktop:

* room workspace
* sticky estimate summary

Tablet:

* adaptive summary

Mobile:

* wizard flow

Avoid:

* engineering terminology
* mandatory material links
* advanced geometry
* giant forms

Always prefer:

estimate speed
over
configuration flexibility

---

# Payment Rules

Business model:

Guest flow

Flow:

Estimate
→ Preview
→ Payment
→ PDF

Payment:

5–7 EUR equivalent

Users should NOT:

* create accounts
* save projects
* manage dashboards

---

# AI Rules

Build:

* structured outputs only
* actionable outputs only
* deterministic logic

Avoid:

* hallucinated pricing
* generated market analytics
* assumptions without validation

Before generating code:

* analyze architecture
* reuse patterns
* avoid duplication

---

# Token Efficiency Rules

Prefer:

* concise responses
* incremental edits
* targeted changes

Avoid:

* rewriting unchanged files
* regenerating entire repositories
* long explanations

---

# Architecture Rules

Prioritize:

* simplicity
* modularity
* low dependency count

Avoid:

* premature abstraction
* enterprise patterns
* future-proofing too early

---

# AI Workflow Rules

Large tasks:

1. Analyze
2. Plan
3. Implement
4. Validate
5. Continue

Never:

* build entire app at once
* rewrite unrelated files
* regenerate architecture

---

# Working Modes

Default Mode:

PLAN

---

## PLAN

Purpose:

* analyze
* propose implementation

Output:

* summary
* affected files
* implementation plan

Restrictions:

* no code
* no file creation

---

## IMPLEMENT

Purpose:

* execute approved scope

Output:

* files changed
* validation
* implementation summary

Restrictions:

* no unrelated changes

---

## REVIEW

Purpose:

* evaluate code
* evaluate UX
* evaluate architecture

Output:

* findings
* risks
* recommendations

Restrictions:

* no modifications

---

# Scope Protection

Never expand scope without approval.

If unclear:

* ask questions
* propose options
* wait

Do not:

* redesign UX
* rename architecture
* add dependencies
* add features
* change data models

unless explicitly approved.

---

# Anti-Complexity Rules

Never add:

* authentication
* dashboards
* saved projects
* collaboration
* admin panels
* contractor flows
* analytics systems
* real-time pricing

unless explicitly requested.

