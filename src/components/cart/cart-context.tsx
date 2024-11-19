'use client'

import { createContext, use, useCallback, useMemo, useOptimistic, useContext } from 'react'

import { Product } from '@/types'

type CartAction =
  | { type: 'ADD_PRODUCT'; payload: { product: Product } }
  | { type: 'REMOVE_PRODUCT'; payload: { productId: number } }
  | { type: 'INCREMENT_QUANTITY'; payload: { productId: number } }
  | { type: 'DECREMENT_QUANTITY'; payload: { productId: number } }
  | { type: 'CLEAR_CART'; payload: { cartId: string } }

type CartContextType = {
  cart: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: number) => void
  incrementQuantity: (productId: number) => void
  decrementQuantity: (productId: number) => void
  clearCart: (cartId: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(current: Product[], action: CartAction) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const { product } = action.payload

      const existingProduct = current.find(p => p.id === product.id)

      if (existingProduct) {
        return current.map(p =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + product.quantity,
                totalPrice: (p.quantity + product.quantity) * p.price,
              }
            : p,
        )
      }

      return [...current, product]
    }
    case 'REMOVE_PRODUCT': {
      const { productId } = action.payload

      return current.filter(product => product.id !== productId)
    }
    case 'INCREMENT_QUANTITY': {
      const { productId } = action.payload

      return current.map(product => {
        return product.id === productId
          ? {
              ...product,
              quantity: product.quantity + 1,
              totalPrice: (product.price + 1) * product.quantity,
            }
          : product
      })
    }
    case 'DECREMENT_QUANTITY': {
      const { productId } = action.payload

      return current
        .map(product => {
          return product.id === productId
            ? {
                ...product,
                quantity: product.quantity - 1,
                totalPrice: (product.quantity - 1) * product.price,
              }
            : product
        })
        .filter(product => product.quantity > 0)
    }
    case 'CLEAR_CART': {
      return []
    }
    default: {
      return current
    }
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode
  cartPromise: Promise<Product[]>
}) {
  const initialCart = use(cartPromise)
  const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer)

  const addProduct = useCallback(
    (product: Product) => {
      updateOptimisticCart({ type: 'ADD_PRODUCT', payload: { product } })
    },
    [updateOptimisticCart],
  )

  const removeProduct = useCallback(
    (productId: number) => {
      updateOptimisticCart({ type: 'REMOVE_PRODUCT', payload: { productId } })
    },
    [updateOptimisticCart],
  )

  const incrementQuantity = useCallback(
    (productId: number) => {
      updateOptimisticCart({ type: 'INCREMENT_QUANTITY', payload: { productId } })
    },
    [updateOptimisticCart],
  )

  const decrementQuantity = useCallback(
    (productId: number) => {
      updateOptimisticCart({ type: 'DECREMENT_QUANTITY', payload: { productId } })
    },
    [updateOptimisticCart],
  )

  const clearCart = useCallback(
    (cartId: string) => {
      updateOptimisticCart({ type: 'CLEAR_CART', payload: { cartId } })
    },
    [updateOptimisticCart],
  )

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      addProduct,
      removeProduct,
      incrementQuantity,
      decrementQuantity,
      clearCart,
    }),
    [optimisticCart, addProduct, removeProduct, incrementQuantity, decrementQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
