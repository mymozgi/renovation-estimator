# ARCHITECTURE

Goal:

Define file structure, data models, and system boundaries before implementation begins.

Activities:

* define Next.js app router structure (pages, layouts, server actions)
* define Zustand store interface:
  * property: type (apartment/house), condition (new/pre-owned), scope (cosmetic/premium/full), city
  * rooms: Room[]
  * per room: id, type, width, length, height, windows, doors, wallCondition, floorCondition, ceilingCondition, wallFinish, floorFinish, ceilingFinish, qualityTier
* define calculation engine module:
  * area-engine → preparation-engine → finish-engine → labor-engine → regional-engine → total-engine
  * each module: pure function, typed inputs, typed output with min/max
* define Zod schemas for each wizard step
* define server actions:
  * createCheckoutSession (Stripe, 5–7 EUR)
  * generatePDF (React PDF, returns buffer)
  * sendReportEmail (PDF attachment)
* define routing: / → /estimate → /estimate/rooms → /estimate/report → /checkout → /report/[token]

Output:

file tree, TypeScript interfaces, calculation engine function signatures

Validation:

implementation can start without architecture decisions remaining open
