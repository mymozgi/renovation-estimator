# SECURITY

Goal:

Protect the application against injections, abuse, and data leaks across all layers — input, API, PDF, email, and payment.

---

## Threat Model

This product accepts user input (dimensions, email, room config), generates PDFs, sends emails, and processes payments. Attack surface:

* form inputs → calculation engine → stored/displayed
* email field → Resend API → inbox
* API routes → server actions → Supabase
* PDF generation → file served to user
* Lemon Squeezy webhooks → order processing
* Environment variables → API keys

---

## Part 1 — Input Validation (Zod at API boundary)

Every API route and server action must validate ALL inputs with Zod before processing.

Rules:

* never trust client-sent data — re-validate on the server
* use strict schemas, no `.passthrough()`
* reject unknown fields

Required schemas:

```typescript
// Room config — prevent unrealistic dimensions that blow up calculations
RoomSchema = z.object({
  type:             z.enum(['kitchen','living_room','bedroom','bathroom','hallway','office']),
  width:            z.number().min(1).max(50),
  length:           z.number().min(1).max(50),
  height:           z.number().min(2).max(6),
  windows:          z.number().int().min(0).max(20),
  doors:            z.number().int().min(0).max(10),
  wallCondition:    z.enum(['ready','primer','putty','full_prep']),
  floorCondition:   z.enum(['ready','leveling']),
  ceilingCondition: z.enum(['ready','primer','full_prep']),
  wallFinish:       z.enum(['paint','wallpaper','decorative_plaster']),
  floorFinish:      z.enum(['laminate','tile','vinyl']),
  ceilingFinish:    z.enum(['paint','stretch_ceiling','drywall']),
  qualityTier:      z.enum(['economy','standard','premium']),
})

// Email — strict RFC 5321 pattern, max length
EmailSchema = z.string().email().max(254)

// Send-report body
SendReportSchema = z.object({
  email:    EmailSchema,
  property: PropertySchema,
  rooms:    z.array(RoomSchema).min(1).max(20),
})
```

Validation:

* reject request with 400 if Zod parse fails
* log validation failures (without PII) for abuse monitoring

---

## Part 2 — Injection Prevention

### SQL injection

Using Supabase JS client — parameterized queries only.

Rules:

* NEVER use raw SQL string concatenation
* use `supabase.from('table').insert({ ... })` exclusively
* if raw SQL is needed, use `supabase.rpc()` with parameterized function

### XSS (Cross-Site Scripting)

Next.js escapes JSX by default. Additional rules:

* NEVER use `dangerouslySetInnerHTML` with user data
* sanitize any user-provided text before rendering (use `DOMPurify` if rendering HTML)
* do not reflect raw query params into the page without sanitization
* CSP header blocks inline scripts from unknown sources (see Part 5)

### Command injection

No shell commands in this app. Rules:

* NEVER use `child_process.exec()` or `os.system()` with user input
* PDF generation uses `@react-pdf/renderer` (no shell involvement)

### Email header injection

Email field used in Resend API. Rules:

* strip newlines from email: `email.replace(/[\r\n]/g, '')`
* validate with Zod `.email()` before any use
* never interpolate raw user input into email headers or subject

### PDF injection

User-supplied strings (room type, city name) appear in the PDF. Rules:

* escape special characters before PDF rendering
* use only values from allowed enums — never render raw free-text user input in PDF
* room type and city come from enum keys, not free text — this is already safe by design

---

## Part 3 — Rate Limiting

Without rate limiting, the `/api/send-report` endpoint can be abused to send unlimited emails via Resend.

Implement rate limiting on all API routes:

```typescript
// Use upstash/ratelimit (free tier: 10,000 req/day) or a simple in-memory limiter
// Limits:
//   /api/send-report    → 5 requests per IP per hour
//   /api/checkout       → 10 requests per IP per hour
//   /api/webhook/*      → no rate limit (authenticated by signature)
```

Options:

* `@upstash/ratelimit` + Upstash Redis (free tier sufficient)
* simple in-memory `Map` with TTL (sufficient for single-instance server, not for edge)

---

## Part 4 — Webhook Signature Verification

Lemon Squeezy sends webhooks to `/api/webhook/lemon-squeezy`. Without verification, anyone can fake an order.

Implementation:

```typescript
// Verify X-Signature header using HMAC-SHA256
const signature = req.headers.get('X-Signature')
const rawBody   = await req.text()
const expected  = crypto
  .createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET!)
  .update(rawBody)
  .digest('hex')

if (signature !== expected) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
}
```

Rules:

* reject webhook if signature missing or invalid — return 401
* verify BEFORE processing any order logic
* idempotency: store processed `order_id` in Supabase, skip duplicates

---

## Part 5 — Security Headers

Add HTTP security headers via `next.config.ts`:

```typescript
headers: [
  { key: 'X-Frame-Options',        value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // next.js requires unsafe-inline for now
      "style-src 'self' 'unsafe-inline' https://fonts.cdnfonts.com",
      "font-src 'self' https://fonts.cdnfonts.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://api.resend.com https://*.supabase.co https://api.lemonsqueezy.com",
      "frame-ancestors 'none'",
    ].join('; ')
  },
]
```

---

## Part 6 — Environment Variable Security

Rules:

* all secrets in `.env.local` — never commit to git
* `.env.local` is already in `.gitignore` — verify this
* client-side env vars (`NEXT_PUBLIC_*`) must NEVER contain secrets
* API keys for Resend, Supabase, Lemon Squeezy are server-only
* add `.env.local.example` documenting all required variables (without values)

Audit all `process.env` usages:

* confirm none are exposed via `NEXT_PUBLIC_` prefix
* confirm `.env.local` is gitignored

---

## Part 7 — Supabase Row Level Security (RLS)

Supabase has RLS disabled by default on new tables.

Rules:

* enable RLS on ALL tables
* `subscribers` table: insert only via service_role (API route), no public read
* `pdf_tokens` table: select only with matching token value, no bulk read
* `orders` table: insert via webhook only, no public access

Example policy:

```sql
-- pdf_tokens: allow read only for the specific token
CREATE POLICY "token lookup" ON pdf_tokens
  FOR SELECT USING (token = current_setting('app.token', true));
```

---

## Part 8 — PDF Token Security

After Lemon Squeezy payment, user receives a one-time token to download the PDF.

Token design:

* 32 bytes random → hex string (64 chars) via `crypto.randomBytes(32)`
* stored in Supabase `pdf_tokens` with `expires_at` (24h TTL) and `used` flag
* single-use: mark `used = true` on first download
* expired or used tokens → 404

Rules:

* token must NOT be sequential or guessable
* do not expose token in URLs that appear in logs (use POST, not GET, for token exchange)

---

## Part 9 — Dependency Audit

Run before each release:

```bash
npm audit
npx better-npm-audit audit
```

Rules:

* no critical or high severity vulnerabilities in production dependencies
* update dependencies monthly
* do not use packages with 0 maintainers or last updated > 2 years ago

---

## OWASP Top 10 Coverage

| OWASP | Risk | Coverage |
|---|---|---|
| A01 Broken Access Control | PDF token brute force | Single-use token + RLS |
| A02 Cryptographic Failures | Secrets in env | Server-only env vars |
| A03 Injection | SQL, XSS, email header | Zod + parameterized queries + DOMPurify |
| A04 Insecure Design | Fake webhook orders | HMAC signature verification |
| A05 Security Misconfiguration | Missing headers | CSP + security headers |
| A06 Vulnerable Components | Outdated deps | npm audit monthly |
| A07 Auth Failures | n/a (no auth in MVP) | — |
| A08 Data Integrity | Fake payments | Webhook signature |
| A09 Logging Failures | No abuse detection | Rate limiting + error logging |
| A10 SSRF | n/a (no user URLs) | — |

---

Output:

Zod schemas on all API routes, rate limiting on send-report and checkout, webhook signature verification, security headers in next.config.ts, RLS enabled on all Supabase tables, pdf token system

Validation:

* send-report rejects malformed bodies with 400
* webhook rejects requests without valid signature with 401
* security headers present on all responses (verify with securityheaders.com)
* npm audit returns 0 critical/high findings
* PDF token cannot be reused after first download
