'use client'

import { ShoppingBag } from 'lucide-react'

import { useCart } from './cart-context'
import UpdateQuantity from './update-quantity'
import RemoveProduct from './remove-product'
import ClearCart from './clear-cart'
import CartCheckout from './cart-checkout'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'

export default function CartList({ cartId }: { cartId: string | undefined }) {
  const { cart } = useCart()

  const allTotalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
  const allTotalProductsQuantity = cart.reduce((acc, product) => acc + product.quantity, 0)

  return (
    <>
      <div className='my-6 flex w-full items-center justify-start gap-x-1'>
        <h2 className='font-semibold sm:text-xl'>Shopping cart</h2>
        {cart.length ? (
          <span>
            - created on{' '}
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }).format(new Date(cart[0].createdAt))}
          </span>
        ) : null}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Quantity</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className='text-right'>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.length ? (
            cart.map(({ id, title, price, quantity, image }) => (
              <TableRow key={id}>
                <TableCell>
                  <div className='flex items-center justify-center'>
                    <UpdateQuantity
                      price={price}
                      productId={id}
                      quantity={quantity}
                      type='decrement'
                    />
                    <span className='size-full text-center tabular-nums'>{quantity}</span>
                    <UpdateQuantity
                      price={price}
                      productId={id}
                      quantity={quantity}
                      type='increment'
                    />
                  </div>
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell className='tabular-nums'>${price.toFixed(2)}</TableCell>
                <TableCell className='tabular-nums'>${(price * quantity).toFixed(2)}</TableCell>
                <TableCell className='flex items-center justify-end'>
                  <div className='relative'>
                    <img
                      alt={title}
                      className='h-16 w-16 rounded border border-[#27272a] object-cover'
                      src={image}
                    />
                    <RemoveProduct productId={id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <div className='flex w-full flex-col items-center justify-center gap-2 pt-2'>
                  <ShoppingBag size={40} />
                  <span className='text-xl font-semibold'>Your cart is empty</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {cart.length > 0 && (
          <TableFooter className='bg-transparent'>
            <TableRow>
              <TableCell colSpan={1}>
                <ClearCart cartId={cartId} />
              </TableCell>
              <TableCell className='font-semibold' colSpan={2}>
                Total Products:{' '}
                <span className='font-normal tabular-nums'>{allTotalProductsQuantity}</span>
              </TableCell>
              <TableCell className='font-semibold' colSpan={1}>
                Total Price:{' '}
                <span className='font-normal tabular-nums'>${allTotalPrice.toFixed(2)}</span>
              </TableCell>
              <TableCell className='text-end' colSpan={1}>
                <CartCheckout cartData={cart} />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </>
  )
}
