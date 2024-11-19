import { cookies } from 'next/headers'

import Header from '@/components/header/header'
import { getCart } from '@/db/queries'
import { CartProvider } from '@/components/cart/cart-context'
import CartList from '@/components/cart/cart-list'

export default async function Home() {
  const cartId = (await cookies()).get('cartId')?.value
  const cartPromise = getCart(cartId)

  return (
    <CartProvider cartPromise={cartPromise}>
      <Header cartId={cartId} />
      <CartList cartId={cartId} />
    </CartProvider>
  )
}
