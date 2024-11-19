'use client'

import { useCart } from '../cart/cart-context'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { addToCart } from '@/app/actions/actions'

export default function FormHeader({ cartId }: { cartId: string | undefined }) {
  const { addProduct } = useCart()

  async function formAction(formData: FormData) {
    addProduct({
      title: 'Loading...',
      price: 0,
      image: 'placeholder.webp',
      quantity: Number(formData.get('quantity')),
      id: Number(formData.get('productId')),
      cartId: cartId ?? 'cartId',
      totalPrice: 0,
      createdAt: new Date().toISOString(),
    })

    await addToCart(formData)
  }

  return (
    <form
      action={formAction}
      className='flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6'
    >
      <div className='flex items-center justify-center gap-2 sm:gap-6'>
        <Label className='flex w-fit items-center gap-2 text-sm'>
          Quantity
          <Input
            autoComplete='off'
            className='w-20 border-neutral-700'
            defaultValue='1'
            id='quantity'
            min='1'
            name='quantity'
            type='number'
          />
        </Label>
        <Label className='flex w-fit items-center gap-2 text-sm'>
          Product ID
          <Input
            autoComplete='off'
            className='w-20 border-neutral-700'
            defaultValue='1'
            max='20'
            min='1'
            name='productId'
            placeholder='123'
            type='number'
          />
        </Label>
      </div>
      <Button type='submit'>Add</Button>
    </form>
  )
}
