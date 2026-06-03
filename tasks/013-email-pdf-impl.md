# EMAIL + PDF — IMPLEMENTATION

Goal:

Implement email delivery and PDF generation based on spec from task 010.

Depends on:

010-report-delivery.md

Activities:

* select and configure email service (Resend recommended — 3 000 free/month, simple API, Next.js-friendly):
  * create Resend account, generate API key
  * install resend package
  * configure RESEND_API_KEY in .env.local
* implement PDF generation server action:
  * input: estimate data (rooms, property settings, city, total)
  * output: PDF buffer
  * PDF sections: property summary, total estimate, room breakdown, finish summary, labor estimate
  * include on every page: "Prices are average estimates for [city]. Actual costs may vary ±10–15%."
  * city name resolved dynamically from user's session data
* implement send-report server action:
  * receive: email address + estimate payload
  * generate PDF buffer
  * send via Resend with PDF as attachment
  * return: success | error
* implement delivery confirmation UI:
  * success state: "Report sent. Check your inbox."
  * error state: "Something went wrong. Try again."
  * retry button on error
* test with real email address before marking done
* do not log or persist email addresses to any database

Output:

working email delivery, PDF generated with regional disclaimer, confirmation UI

Validation:

email received with correct PDF attachment; disclaimer shows correct city name
