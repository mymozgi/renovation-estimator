# IMPLEMENTATION

Goal:

Build the full working application following the sprint plan.

Activities:

* initialize Next.js project (TypeScript, Tailwind, shadcn/ui, Zustand, React Hook Form, Zod, React PDF, Stripe)
* implement Zustand store (property settings, rooms array, per-room config)
* implement calculation engine (area, preparation, materials, labor, regional multiplier, min/max output)
* implement wizard flow:
  * landing → general settings → room list → room settings → wall condition → floor condition → ceiling condition → finishers → labor estimation → report
  * back navigation preserves state
  * step counter updates per screen
* implement room list (add room, edit room, remove room, running estimate footer)
* implement labor estimation screen (rates table + per-room totals)
* implement full estimation report screen (summary, cost breakdown, room accordion)
* implement React PDF report (summary, estimate ranges, room breakdown, finish summary, labor)
* implement Stripe checkout server action (create session, handle webhook, unlock PDF)
* implement email delivery (PDF as attachment)
* verify all estimates stay within ±10–15% target range

Output:

working application, full wizard flow functional, estimate generates, PDF downloads

Validation:

complete flow: landing → configure → estimate → pay → PDF received
