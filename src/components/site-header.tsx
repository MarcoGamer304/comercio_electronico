import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from './cart-provider'
import { cn } from '../lib/utils'

const navLinks = [
  { href: '/#galeria', label: 'Galería' },
  { href: '/#pedidos', label: 'Medidas' },
  { href: '/#historia', label: 'Historia' },
]

export function SiteHeader() {
  const { totalItems, setIsOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          className="flex w-24 items-center gap-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav className="hidden w-44 items-center gap-7 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              to={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="font-heading tracking-tight md:text-2xl subtitle"
        >
          MAJUSKE
        </Link>

        <div className="flex w-24 items-center justify-end gap-4 md:w-40">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 text-sm transition-colors hover:text-primary"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="size-5" />
            <span className="hidden md:inline">Carrito</span>
            {totalItems > 0 && (
              <span className=" -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red text-[10px] font-medium md:static md:size-5 md:text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-border/60 transition-all md:hidden',
          mobileOpen ? 'max-h-60' : 'max-h-0 border-t-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
