'use client'

import { X } from 'lucide-react'

import { Button } from '../ui/button'

import { useCart } from './cart-context'

import { removeProductAction } from '@/app/actions/actions'

export default function RemoveProduct({ productId }: { productId: number }) {
  const { removeProduct } = useCart()

  async function formAction() {
    removeProduct(productId)

    await removeProductAction(productId)
  }

  return (
    <form action={formAction}>
      <Button
        className='absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full p-3.5'
        variant='destructive'
      >
        <X />
      </Button>
    </form>
  )
}
