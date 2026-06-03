# REPORT DELIVERY

Goal:

Deliver the renovation estimate as a PDF to the user's email.

Activities:

* select free email delivery service:
  * evaluate Brevo (300 emails/day free), Resend (3 000/month free), EmailOctopus (2 500 contacts free)
  * requirement: supports transactional email with PDF attachment
  * requirement: provides contact list / subscriber database for growth
  * decision: pick one, document API setup
* implement email capture form (user enters email on download screen)
* implement PDF generation:
  * use React PDF or print-to-PDF (window.print with print CSS)
  * PDF must be readable as a draft — not final design
  * include regional disclaimer on every page:
    "Prices are average estimates for [selected city]. Actual costs may vary ±10–15%."
  * city name must be dynamic — resolved from user's city selection (Warsaw, Gdańsk, Kraków, etc.)
* implement server action: receive email + estimate data → generate PDF → send via chosen service
* implement delivery confirmation screen (email sent, check inbox)
* do not store personal data beyond what is required to send the email:
  * no database of emails in MVP
  * contact list opt-in only if user explicitly agrees
* support regeneration: user can re-submit email to resend the same estimate

Output:

working email delivery flow, draft PDF layout, delivery confirmation screen

Validation:

user enters email → PDF received in inbox with correct city-specific regional disclaimer
