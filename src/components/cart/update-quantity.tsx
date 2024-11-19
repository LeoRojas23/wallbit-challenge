'use client'

import { Minus, Plus } from 'lucide-react'

import { Button } from '../ui/button'

import { useCart } from './cart-context'

import { updateQuantity } from '@/app/actions/actions'

interface Props {
  type: 'increment' | 'decrement'
  productId: number
  quantity: number
  price: number
}

export default function UpdateQuantity({ type, productId, quantity, price }: Props) {
  const { incrementQuantity, decrementQuantity } = useCart()

  async function formAction() {
    if (type === 'increment') {
      incrementQuantity(productId)
      await updateQuantity(type, productId, quantity, price)
    } else {
      decrementQuantity(productId)
      await updateQuantity(type, productId, quantity, price)
    }
  }

  return (
    <form action={formAction}>
      <Button
        className='flex size-9 items-center justify-center rounded-full'
        type='submit'
        variant='outline'
      >
        {type === 'increment' ? (
          <Plus className='size-4 sm:size-5' />
        ) : (
          <Minus className='size-4 sm:size-5' />
        )}
      </Button>
    </form>
  )
}
