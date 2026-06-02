# REVIEW

Goal:

Validate the product against PRD and confirm launch readiness.

Activities:

* verify all MVP features implemented:
  * property setup (type, condition, scope, city)
  * room configuration (dimensions, conditions, finish selections)
  * estimation engine (materials, preparation, labor, supporting materials, regional multiplier)
  * estimate preview (total range, cost breakdown, room-by-room)
  * PDF report (summary, estimate ranges, rooms, finish summary, labor estimate)
  * payment (Stripe checkout, 5–7 EUR, PDF unlock after payment)
* verify estimation precision: test against reference room configs, target ±10–15%
* verify mobile-first: no horizontal scroll at 390px, touch targets reachable, typography readable
* verify guest flow: no account creation, no persistent storage, session-only state
* verify PDF accuracy: all wizard data reflected correctly in document
* verify Stripe flow: checkout, success, cancel, webhook handling
* verify performance: page load <2s, interactions <100ms
* verify accessibility: keyboard navigation, semantic HTML, adequate contrast
* verify PRD constraints: no scraping, no accounts, no dashboards, no exact procurement prices
* document any blockers, regressions, or unresolved questions

Output:

review findings, launch readiness checklist, go / no-go decision

Validation:

all PRD requirements verified or blockers explicitly documented with resolution path
