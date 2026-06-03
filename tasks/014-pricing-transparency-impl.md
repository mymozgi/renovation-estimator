# PRICING TRANSPARENCY — IMPLEMENTATION

Goal:

Implement the pricing transparency block and methodology content based on spec from task 011.

Depends on:

011-pricing-transparency.md

Activities:

* add pricing transparency section to landing page:
  * position: between feature cards and CTA
  * content: 4 line items showing example rates (wall painting, floor tile, labor, regional markup)
  * show ±10–15% confidence label
  * keep it short — 5–6 lines max, no walls of text
* create /methodology page (or expandable section on landing):
  * plain-language explanation of the estimation formula
  * explain regional multipliers by city (Warsaw +20%, Kraków +10%, etc.)
  * explain tier differences (Economy / Standard / Premium)
  * explain what is not included (permits, design, structural work)
  * link from landing footer and from the estimate report
* update estimate report screen:
  * add "Based on [city] average pricing" label below total
  * add ±10–15% confidence indicator near total estimate
  * city name must reflect actual user selection
* update download screen:
  * add disclaimer line: "These are average market estimates for [city], not a final quote."
* add trust badge row to landing:
  * "Based on real Polish market data"
  * "No account needed"
  * "±10–15% precision"
  * "Estimate in under 10 minutes"

Output:

landing transparency section, methodology page, report confidence labels, trust badges

Validation:

user sees city-specific disclaimer on report; methodology page answers "where do these numbers come from"
