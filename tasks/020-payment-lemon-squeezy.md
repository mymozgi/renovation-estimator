# PAYMENT — LEMON SQUEEZY

Goal:

Implement one-time payment (5–7 EUR) to unlock the PDF report using Lemon Squeezy as Merchant of Record.

Business logic:

User completes estimate → sees preview (totals only, no breakdown) → clicks "Get full report" → pays 5–7 EUR → receives PDF by email + one-time download link. Lemon Squeezy handles EU VAT (23% Poland) automatically.

Depends on:

021-database-supabase.md (pdf_tokens table)
023-security.md (webhook signature verification)

---

## Activities

* create Lemon Squeezy account → store → product "Renovation Report PDF" → price 5–7 EUR
* implement `/api/checkout` server action:
  * receive estimate data (serialized room config + property settings)
  * create Lemon Squeezy checkout session with custom data (estimate payload)
  * return checkout URL → redirect user
* implement `/api/webhook/lemon-squeezy` route:
  * verify HMAC-SHA256 signature (see task 023)
  * on `order_created` event: generate PDF → store token in Supabase → send email via Resend
  * idempotency: skip if order_id already processed
* implement `/report/[token]` page:
  * validate token (Supabase lookup, not expired, not used)
  * mark token as used
  * stream PDF to user as download
* update report screen:
  * show total estimate range (blurred or truncated breakdown)
  * CTA: "Get full report — 5 EUR" → triggers checkout
* update download screen:
  * remove free email send
  * replace with "Your report is being prepared" after payment
* add required env vars:

```
LEMONSQUEEZY_API_KEY=
LEMONSQUEEZY_STORE_ID=
LEMONSQUEEZY_PRODUCT_ID=
LEMONSQUEEZY_WEBHOOK_SECRET=
```

---

Output:

checkout flow, webhook handler, PDF token delivery, /report/[token] download page

Validation:

payment completes in Lemon Squeezy test mode → PDF received by email → token download works → token cannot be reused
