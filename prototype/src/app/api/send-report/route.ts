import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { PDFReport } from '@/lib/pdf'
import { CITY_LABELS } from '@/lib/labels'
import type { Room, PropertySettings } from '@/lib/types'

export const runtime = 'nodejs'

interface SendReportBody {
  email: string
  property: PropertySettings
  rooms: Room[]
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  // Parse and validate body
  let body: SendReportBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { email, property, rooms } = body

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (!rooms || rooms.length === 0) {
    return NextResponse.json({ error: 'No rooms in estimate.' }, { status: 400 })
  }

  // Check env
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    return NextResponse.json(
      { error: 'Email delivery is not configured. Use the "Save as PDF" button instead.', code: 'NOT_CONFIGURED' },
      { status: 503 }
    )
  }

  // Generate PDF
  let pdfBuffer: Buffer
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(PDFReport, { property, rooms }) as any
    pdfBuffer = Buffer.from(await renderToBuffer(element))
  } catch (err) {
    console.error('PDF generation failed:', err)
    return NextResponse.json({ error: 'Failed to generate PDF.' }, { status: 500 })
  }

  // Send via Resend
  const cityLabel = property.city ? CITY_LABELS[property.city] : 'your city'
  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: email,
      subject: `Your renovation estimate — ${cityLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1C1C1A">
          <h2 style="font-size:20px;margin-bottom:8px">Your renovation estimate is ready</h2>
          <p style="color:#6B7060;margin-bottom:16px">
            Based on ${cityLabel} regional pricing. The full breakdown is attached as a PDF.
          </p>
          <p style="font-size:12px;color:#9B9A8A;border-top:1px solid #E2DAD0;padding-top:12px;margin-top:24px">
            Prices are average estimates for ${cityLabel}. Actual costs may vary ±10–15%.
            This is not a final quote.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `renovation-estimate-${cityLabel.toLowerCase().replace(/\s+/g, '-')}.pdf`,
          content: pdfBuffer,
        },
      ],
    })
  } catch (err) {
    console.error('Resend delivery failed:', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }

  // No data is persisted — email and estimate data are used only for this request
  return NextResponse.json({ success: true })
}
