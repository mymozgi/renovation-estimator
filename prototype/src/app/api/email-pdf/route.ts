import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: { email: string; pdfBase64: string; city: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { email, pdfBase64, city } = body
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!pdfBase64) {
    return NextResponse.json({ error: 'Missing PDF' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    return NextResponse.json({ error: 'Email not configured', code: 'NOT_CONFIGURED' }, { status: 503 })
  }

  const resend = new Resend(apiKey)
  const cityLabel = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'twojego miasta'
  const pdfBuffer = Buffer.from(pdfBase64, 'base64')

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: email,
      subject: `Twój kosztorys remontu — ${cityLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1C1C1A;padding:24px">
          <img src="https://remonta.pl/logo-header-remonta.png" alt="Remonta" style="height:28px;margin-bottom:24px" />
          <h2 style="font-size:20px;margin:0 0 8px">Twój kosztorys jest gotowy</h2>
          <p style="color:#6B7060;margin:0 0 16px">
            Szczegółowy kosztorys remontu dla <strong>${cityLabel}</strong> jest w załączniku.
            Znajdziesz tam podział na pomieszczenia, materiały i robociznę.
          </p>
          <p style="color:#6B7060;margin:0 0 24px">
            Masz pytania? Napisz do nas: <a href="mailto:remontapoland@gmail.com" style="color:#1D5039">remontapoland@gmail.com</a>
          </p>
          <p style="font-size:12px;color:#9B9A8A;border-top:1px solid #E2DAD0;padding-top:12px;margin:0">
            Podane ceny to szacunki na podstawie danych rynkowych ${cityLabel}. Rzeczywiste koszty mogą się różnić o ±10–15%.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `kosztorys-remontowo-${city || 'pl'}.pdf`,
          content: pdfBuffer,
        },
      ],
    })
  } catch (err) {
    console.error('Resend failed:', err)
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
