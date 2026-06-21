import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from './ui/sheet'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useCart } from './cart-provider'
import { formatColones } from '../lib/products'

export function CartSheet() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md bg-white text-gray-700">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-heading text-xl font-normal text-black">
            Tu carrito
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="bg-[#B23A26] text-white">
              Seguir explorando
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 py-5"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-muted">
                      <img
                        src={item.product.image || '/placeholder.svg'}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium leading-tight">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Talla: {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.size)
                          }
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-sm border border-border">
                          <button
                            className="flex size-7 items-center justify-center transition-colors hover:bg-muted"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            aria-label="Disminuir"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className="flex size-7 items-center justify-center transition-colors hover:bg-muted"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            aria-label="Aumentar"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-black">
                          {formatColones(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading text-lg text-black">
                  {formatColones(subtotal)}
                </span>
              </div>
              <Separator />
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                <Button
                  size="lg"
                  className="w-full bg-[#B23A26] text-white"
                >
                  Finalizar pedido
                </Button>
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                Los pedidos a medida se confirman tras revisar tus medidas.
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
