import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { Product } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const cartData = await req.json()

    const line_items = cartData.map((item: Product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    const cartId = cookieStore.get('cartId')?.value

    if (!cartId) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      line_items,
      mode: 'payment',
      metadata: {
        cartId,
      },
    })

    return NextResponse.json(session)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
