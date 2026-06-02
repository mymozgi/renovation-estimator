# PLANNING

Goal:

Sequence features into implementable sprints with clear acceptance criteria.

Activities:

* confirm feature priority order against PRD
* define Sprint 1 — Project Setup:
  * Next.js, TypeScript, Tailwind, shadcn/ui, Zustand, React Hook Form, Zod
  * landing page + general settings screen
  * acceptance: settings save to store, navigation advances to room list
* define Sprint 2 — Room Configuration:
  * room list screen, room settings wizard (type + dimensions)
  * area calculation engine
  * acceptance: rooms added, floor/wall/ceiling areas calculated correctly
* define Sprint 3 — Conditions and Finishes:
  * wall, floor, ceiling condition steps
  * finisher selection (quality tier + finish per surface)
  * material and preparation cost engine
  * acceptance: per-room cost range shown on room card
* define Sprint 4 — Estimation and Report:
  * labor estimation screen
  * full estimation report screen
  * React PDF document generation
  * acceptance: PDF downloads with correct data for all rooms
* define Sprint 5 — Payment and Delivery:
  * Stripe checkout server action (5–7 EUR)
  * PDF unlock after successful payment
  * email delivery of PDF
  * acceptance: payment completes, PDF received
* define Sprint 6 — Polish and Launch:
  * error states, loading states, edge cases
  * accessibility, performance, responsive QA
  * acceptance: passes launch readiness checklist (task 009)

Output:

sprint plan with acceptance criteria

Validation:

implementation phase can proceed sprint-by-sprint without planning gaps
