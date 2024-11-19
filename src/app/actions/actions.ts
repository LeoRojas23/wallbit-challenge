'use server'

import { createId } from '@paralleldrive/cuid2'
import { cookies } from 'next/headers'
import { expireTag } from 'next/cache'
import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { cartTable } from '@/db/schema'

export async function addToCart(formData: FormData) {
  const cookieStore = await cookies()
  const { quantity, productId } = Object.fromEntries(formData)

  let cartId = cookieStore.get('cartId')?.value

  if (!cartId) {
    cartId = createId()

    cookieStore.set('cartId', cartId, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
  }

  const product = await fetch(`https://fakestoreapi.com/products/${Number(productId)}`).then(res =>
    res.json(),
  )

  const existingProduct = await db
    .select({ cartId: cartTable.cartId, quantity: cartTable.quantity, price: cartTable.price })
    .from(cartTable)
    .where(and(eq(cartTable.cartId, cartId), eq(cartTable.id, product.id)))
    .then(res => res[0])

  if (existingProduct) {
    const newQuantity = existingProduct.quantity + Number(quantity)
    const newTotalPrice = existingProduct.price * newQuantity

    await db
      .update(cartTable)
      .set({
        quantity: newQuantity,
        totalPrice: newTotalPrice,
      })
      .where(and(eq(cartTable.cartId, cartId), eq(cartTable.id, product.id)))
  } else {
    await db.insert(cartTable).values({
      cartId,
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: Number(quantity),
      totalPrice: product.price * Number(quantity),
    })
  }

  expireTag(cartId)
}

export async function removeProductAction(productId: number) {
  const cartId = (await cookies()).get('cartId')?.value

  if (!cartId) return

  await db.delete(cartTable).where(and(eq(cartTable.cartId, cartId), eq(cartTable.id, productId)))

  expireTag(cartId)
}

export async function updateQuantity(
  type: 'increment' | 'decrement',
  productId: number,
  quantity: number,
  productPrice: number,
) {
  const cartId = (await cookies()).get('cartId')?.value

  if (!cartId) return

  await db.transaction(async tx => {
    if (quantity === 1 && type === 'decrement') {
      await tx
        .delete(cartTable)
        .where(and(eq(cartTable.cartId, cartId), eq(cartTable.id, productId)))
    } else {
      const newQuantity = type === 'decrement' ? quantity - 1 : quantity + 1
      const newTotalPrice = newQuantity * productPrice

      await tx
        .update(cartTable)
        .set({
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        })
        .where(and(eq(cartTable.cartId, cartId), eq(cartTable.id, productId)))
    }
  })

  expireTag(cartId)
}

export async function clearCartAction() {
  const cartId = (await cookies()).get('cartId')?.value

  if (!cartId) return

  await db.delete(cartTable).where(eq(cartTable.cartId, cartId))

  expireTag(cartId)
}
