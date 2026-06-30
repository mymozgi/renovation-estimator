import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { locale } = await req.json()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'Kosztorys PDF — Remontowo.pl',
            description: 'Szczegółowy kosztorys remontu z podziałem na pomieszczenia',
          },
          unit_amount: 2900,
        },
        quantity: 1,
      },
    ],
    payment_method_types: ['card', 'blik', 'p24'],
    success_url: `${baseUrl}/${locale}/pobierz?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/${locale}/kalkulator`,
  })

  return NextResponse.json({ url: session.url })
}
