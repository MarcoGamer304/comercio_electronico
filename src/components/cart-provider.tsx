/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../lib/products'

export type CartItem = {
  product: Product
  quantity: number
  size: string
  notes?: string
}

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addItem: (product: Product, options?: { size?: string; notes?: string }) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clear: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  function addItem(
    product: Product,
    options?: { size?: string; notes?: string },
  ) {
    const size = options?.size ?? 'Única'
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size,
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }
      return [...prev, { product, quantity: 1, size, notes: options?.notes }]
    })
    setIsOpen(true)
  }

  function removeItem(id: string, size: string) {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === id && i.size === size)),
    )
  }

  function updateQuantity(id: string, size: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === id && i.size === size ? { ...i, quantity } : i,
      ),
    )
  }

  function clear() {
    setItems([])
  }

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
    [items],
  )

  const value: CartContextType = {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
