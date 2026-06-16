import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// Server-only client — uses secret key, never exposed to browser
function getClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) throw new Error('Supabase env vars not set')
  return createClient(url, key, { auth: { persistSession: false } })
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface Subscriber {
  id: string
  email: string
  locale: string
  consent: boolean
  source: string | null
  created_at: string
}

export interface PdfToken {
  id: string
  token: string
  order_id: string
  email: string
  payload: unknown
  used: boolean
  expires_at: string
  created_at: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Save an email subscriber. Only called when user explicitly opts in.
 * Silently ignores duplicate emails (upsert on email).
 */
export async function saveSubscriber(
  email: string,
  locale: string,
  consent: boolean,
  source = 'download_form',
): Promise<void> {
  if (!consent) return
  const db = getClient()
  const { error } = await db
    .from('subscribers')
    .upsert({ email, locale, consent, source }, { onConflict: 'email' })
  if (error) throw error
}

/**
 * Create a one-time PDF download token after successful payment.
 * Token is 64-char hex (32 random bytes), expires in 24h.
 */
export async function savePdfToken(
  orderId: string,
  email: string,
  payload: unknown,
): Promise<string> {
  const db = getClient()
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  const { error } = await db.from('pdf_tokens').insert({
    token,
    order_id: orderId,
    email,
    payload,
    used: false,
    expires_at: expiresAt,
  })
  if (error) throw error
  return token
}

/**
 * Redeem a PDF token — returns the stored payload if valid, null otherwise.
 * Marks the token as used (single-use).
 */
export async function redeemToken(token: string): Promise<unknown | null> {
  const db = getClient()

  const { data, error } = await db
    .from('pdf_tokens')
    .select('*')
    .eq('token', token)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !data) return null

  // Mark used
  await db.from('pdf_tokens').update({ used: true }).eq('id', data.id)

  return data.payload
}

/**
 * Save an order record for audit trail.
 * Idempotent — ignores duplicate order_id.
 */
export async function saveOrder(
  orderId: string,
  email: string,
  amountEur: number,
  locale = 'pl',
): Promise<void> {
  const db = getClient()
  const { error } = await db
    .from('orders')
    .upsert(
      { order_id: orderId, email, amount_eur: amountEur, status: 'paid', locale },
      { onConflict: 'order_id' },
    )
  if (error) throw error
}
