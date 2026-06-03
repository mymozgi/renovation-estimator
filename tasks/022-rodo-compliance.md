# RODO / GDPR COMPLIANCE

Goal:

Make the product legally compliant with RODO (Polish GDPR implementation) for the EU market — privacy policy, cookie consent, data collection disclosures, and user rights.

Business logic:

Selling to Polish/EU users and collecting emails requires GDPR compliance. Without it: fines up to €20M or 4% of global turnover. Practical risk for this product: UODO (Polish DPA) complaints, inability to use Stripe/Lemon Squeezy, removal from app stores.

Depends on:

021-database-supabase.md (email storage)
020-payment-lemon-squeezy.md (payment data)

Required before collecting any emails or payments.

---

## Activities

### Legal pages

Create 3 static pages (server components, translatable):

* `/[locale]/privacy` — Privacy Policy (RODO-compliant):
  * data controller identity (name, address, email)
  * what data is collected (email, locale, IP via logs)
  * legal basis (Art. 6(1)(a) RODO — consent for email, Art. 6(1)(b) — contract for payment)
  * data retention periods (subscribers: until unsubscribe; orders: 5 years for tax)
  * third-party processors: Resend, Supabase, Lemon Squeezy — with their GDPR status
  * user rights: access, rectification, erasure, portability, objection
  * how to exercise rights: privacy@[domain]
  * right to complain to UODO (Urząd Ochrony Danych Osobowych)

* `/[locale]/terms` — Terms of Service:
  * product description (estimate tool, not legal advice)
  * payment terms (5–7 EUR, non-refundable digital goods)
  * disclaimer: estimates are ±10–15%, not binding quotes
  * governing law: Poland, Polish courts

* `/[locale]/cookies` — Cookie Policy:
  * list all cookies set: session (necessary), localStorage/a11y prefs (functional)
  * no third-party tracking cookies in MVP
  * how to manage/delete

### Cookie consent banner

Custom component `CookieBanner.tsx`:

* appears on first visit (check `cookie_consent` in localStorage)
* two buttons: "Accept necessary" · "Accept all"
* necessary cookies: session state, a11y preferences — no consent needed
* functional cookies (if analytics added later): require consent
* stores choice in localStorage `cookie_consent`: `'necessary'` | `'all'`
* small banner at bottom of screen, not fullscreen modal
* link to /cookies page
* accessible (keyboard navigable, focus trap)

### Form updates

* email capture form on download screen:
  * add: "By submitting you agree to our [Privacy Policy]" (required link, not checkbox)
  * opt-in checkbox for newsletter (separate, optional)

* checkout flow (Lemon Squeezy):
  * Lemon Squeezy handles payment data — reference their DPA in privacy policy

### Unsubscribe

* add `/api/unsubscribe?token=[token]` route
* generates unique unsubscribe token per subscriber on save
* clicking link: sets `unsubscribed = true` in Supabase, stops emails

### Data needed from business owner

```
Company / full name:
NIP:
Legal address:
Privacy contact email:  (e.g. privacy@yourdomain.com)
Website domain:
DPA (Data Processing Agreement) with Supabase: yes/no
DPA with Resend: yes/no
DPA with Lemon Squeezy: yes/no
```

---

Output:

/privacy, /terms, /cookies pages, CookieBanner component, updated email form, unsubscribe route

Validation:

cookie banner appears on first visit and does not reappear after choice; privacy page covers all RODO Article 13 requirements; unsubscribe link removes email from active list
