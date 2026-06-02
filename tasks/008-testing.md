# TESTING

Goal:

Validate correctness of calculations, wizard flow, and integrations.

Activities:

* unit tests — calculation engine (Vitest):
  * area formulas: wall, floor, ceiling with/without windows and doors
  * preparation cost per condition level (walls and floors)
  * material cost per finish type and quality tier
  * labor cost per finish type with each regional multiplier
  * total min/max range for a complete room config
  * edge cases: 0 windows, 0 doors, min dimensions, max dimensions
* component tests — forms (React Testing Library):
  * required fields blocked on empty
  * dimension inputs enforce min/max
  * wizard cannot advance with invalid data
* E2E tests — wizard flow (Playwright):
  * full flow: landing → settings → rooms → conditions → finishes → report
  * back navigation preserves entered data
  * add room, edit room, remove room
  * running estimate updates after room changes
* E2E tests — report:
  * room breakdown totals match room cards
  * grand total equals sum of all rooms
* E2E tests — PDF:
  * document generates without error
  * all sections present (summary, estimate ranges, rooms, finishes, labor)
* E2E tests — payment (Stripe test mode):
  * checkout session creates successfully
  * success route unlocks PDF
  * cancel route returns to report
* responsive tests: 390px, 768px, 1280px (no horizontal scroll, no layout breaks)
* accessibility tests: keyboard navigation, focus states, contrast ratios

Output:

passing test suite with coverage on calculation engine and all critical flows

Validation:

no failing tests, all critical paths covered
