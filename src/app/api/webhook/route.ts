import { eq } from 'drizzle-orm'
import { expireTag } from 'next/cache'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { cartTable } from '@/db/schema'
import { db } from '@/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-siganture header' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
  }

  switch (event?.type) {
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object

      const cartId = checkoutSessionCompleted.metadata?.cartId

      if (!cartId) {
        return NextResponse.json({ error: 'Cart not found' }, { status: 400 })
      }

      await db.delete(cartTable).where(eq(cartTable.cartId, cartId))
      expireTag(cartId)

      break
    }
    default:
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
  }

  return new Response(null, { status: 200 })
}
