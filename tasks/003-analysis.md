# ANALYSIS

Goal:

Extract implementation requirements from PRD, wireframes, and research data.

Activities:

* map wizard screens to components (landing, general settings, room list, room settings, conditions, finishers, labor, report, download)
* define area calculation formulas:
  * wall area = (2 × (width + length) × height) − (windows × avg m²) − (doors × avg m²)
  * floor area = width × length
  * ceiling area = width × length
* define estimation formula:
  * (materials + preparation + labor + supporting materials) × regional multiplier
  * output: min estimate and max estimate range
* inventory all UI components from wireframes:
  * option card (selectable, 2-column grid)
  * condition list item (label + description + PLN/m² indicator)
  * room card (icon, name, dimensions, tier badge, price range)
  * running estimate footer (total range + room count)
  * step counter (dots + STEP X OF 7 label)
* define Zustand store shape (property settings, rooms array, per-room config)
* define Zod validation schemas per step
* identify edge cases: zero rooms, one room, no windows, max dimensions, all Premium tier

Output:

calculation spec, component inventory, store interface draft

Validation:

architecture phase can begin without open questions
