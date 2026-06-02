# DESIGN

Goal:

Build the component system and all screens matching the wireframe visual direction.

Activities:

* configure Tailwind tokens:
  * background: warm cream
  * primary: forest green (CTA, price accents, selected states)
  * surface: white (cards)
  * muted: soft gray-green (disabled CTA, secondary text)
  * border: light neutral
* configure shadcn/ui base: Button, Input, Card, Badge
* build shared wizard layout (STEP X OF 7 counter, dot progress bar, back button, sticky bottom CTA)
* build option card (tap to select, 2-column grid, icon + label, selected/unselected state)
* build condition list item (full-width card, label + description left, PLN/m² right in green)
* build room card (icon, room type, dimensions, quality tier badge, min–max PLN range, edit/delete actions)
* build running estimate footer (sticky bar, total range left, room count right)
* implement screens:
  * Landing: bold headline, 4 feature cards, full-width CTA
  * General Settings: property type, condition, scope, city (all option card grids)
  * Room List: empty state, filled state, add room button, remove room popup
  * Room Settings: room type grid, dimension inputs (+/−), calculated areas display
  * Wall / Floor / Ceiling Condition: condition list with PLN/m² indicators
  * Choose Finishers: quality tier row + wall/floor/ceiling finish grids
  * Labor Estimation: standard rates table + per-room labor estimate table
  * Full Estimation Report: summary header, cost bar breakdown, room-by-room accordion
  * Download Result: email input, send CTA
* verify all layouts at 390px

Output:

all screens implemented, tokens applied, components reusable

Validation:

matches wireframe hierarchy and visual language, no layout breaks at 390px
