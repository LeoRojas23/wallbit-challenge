'use client'

import { Trash2 } from 'lucide-react'

import { Button } from '../ui/button'

import { useCart } from './cart-context'

import { clearCartAction } from '@/app/actions/actions'

export default function ClearCart({ cartId }: { cartId: string | undefined }) {
  const { clearCart } = useCart()

  async function formAction() {
    if (!cartId) return

    clearCart(cartId)
    await clearCartAction()
  }

  return (
    <form action={formAction} className='h-full w-28'>
      <Button
        className='flex w-full items-center justify-center gap-1'
        type='submit'
        variant='destructive'
      >
        <Trash2 />
        <span>Clear cart</span>
      </Button>
    </form>
  )
}
