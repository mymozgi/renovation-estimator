# DATABASE — SUPABASE

Goal:

Set up Supabase PostgreSQL database to store email subscribers, PDF tokens, and order records.

Business logic:

Three data needs: (1) email marketing list — users who opt in on download screen, (2) PDF tokens — one-time links generated after payment, (3) orders — audit trail of Lemon Squeezy transactions.

---

## Activities

* create Supabase project (free tier: 500MB, sufficient for MVP)
* create tables:

```sql
-- Email subscribers (opt-in only)
CREATE TABLE subscribers (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email      text NOT NULL UNIQUE,
  locale     text NOT NULL DEFAULT 'pl',
  consent    boolean NOT NULL DEFAULT false,
  source     text,           -- 'download_form' | 'landing_cta'
  created_at timestamptz DEFAULT now()
);

-- PDF download tokens
CREATE TABLE pdf_tokens (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  token      text NOT NULL UNIQUE,   -- 64-char random hex
  order_id   text NOT NULL UNIQUE,   -- Lemon Squeezy order ID
  email      text NOT NULL,
  payload    jsonb NOT NULL,          -- serialized estimate data
  used       boolean DEFAULT false,
  expires_at timestamptz NOT NULL,   -- now() + 24h
  created_at timestamptz DEFAULT now()
);

-- Orders (audit trail)
CREATE TABLE orders (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id     text NOT NULL UNIQUE,  -- Lemon Squeezy order ID
  email        text NOT NULL,
  amount_eur   numeric(8,2),
  status       text NOT NULL,         -- 'paid' | 'refunded'
  locale       text,
  created_at   timestamptz DEFAULT now()
);
```

* enable Row Level Security on all tables (see task 023)
* configure policies: all writes via service_role only, no public access
* add required env vars:

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

* implement `src/lib/db.ts` — typed Supabase client helpers:
  * `saveSubscriber(email, locale, consent)`
  * `savePdfToken(orderId, email, payload)` → returns token
  * `redeemToken(token)` → returns payload or null (if expired/used)
  * `saveOrder(orderId, email, amount)`

* update email capture form on download screen:
  * add opt-in checkbox: "Send me renovation tips and updates (optional)"
  * save to `subscribers` only if checkbox is checked
  * checkbox unchecked = send PDF but do not store email

---

Output:

Supabase project, 3 tables with RLS, typed DB helpers in src/lib/db.ts

Validation:

subscriber saved only when consent = true, token redeemed correctly, duplicate order_id rejected
