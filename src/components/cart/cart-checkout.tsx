import { useActionState } from 'react'

import { Button } from '../ui/button'
import Dots from '../dots'

import { Product } from '@/types'

const fn = async (prev: unknown, cartData: Product[]) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartData),
  })

  const data = await res.json()

  window.location = data.url
}

export default function CartCheckout({ cartData }: { cartData: Product[] }) {
  const [, formAction, isPending] = useActionState(fn, null)

  const formActionData = formAction.bind(null, cartData)

  return (
    <form action={formActionData}>
      <Button type='submit'>{isPending ? <Dots /> : 'Checkout'}</Button>
    </form>
  )
}
