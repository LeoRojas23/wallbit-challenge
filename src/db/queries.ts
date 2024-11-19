'server only'

import { unstable_cacheTag as cacheTag } from 'next/cache'
import { asc, eq } from 'drizzle-orm'

import { cartTable } from './schema'

import { db } from '.'

export async function getCart(cartId: string | undefined) {
  'use cache'
  if (!cartId) return []

  cacheTag('cartId', cartId)

  return await db
    .select()
    .from(cartTable)
    .where(eq(cartTable.cartId, cartId))
    .orderBy(asc(cartTable.createdAt))
}

export async function getProductById(id: number) {
  return await fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
}
