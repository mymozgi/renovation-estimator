import { createClient } from '@supabase/supabase-js'

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
