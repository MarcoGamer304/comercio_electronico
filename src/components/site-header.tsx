import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from './cart-provider'
import { cn } from '../lib/utils'

const navLinks = [
  { href: '/#galeria', label: 'Galería', targetId: 'galeria' },
  { href: '/#pedidos', label: 'Medidas', targetId: 'pedidos' },
  { href: '/#historia', label: 'Historia', targetId: 'historia' },
]

export function SiteHeader() {
  const { totalItems, setIsOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  const location = useLocation()

  // Función para manejar el desplazamiento suave
  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, _href: string, targetId: string) => {
    // Si ya estamos en la página de inicio ('/'), hacemos scroll suave sin recargar
    if (location.pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setMobileOpen(false) // Cierra el menú móvil si estaba abierto
    }
    // Si estás en otra ruta (ej: /producto/1), dejamos que el <Link> actúe normal y te lleve a '/'
  }
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setMobileOpen(false) // Por si acaso el menú móvil estaba desplegado
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* LADO IZQUIERDO */}
        <button
          className="flex w-24 items-center gap-2 md:hidden text-gray-700"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav className="hidden w-44 items-center gap-7 text-sm md:flex text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleScrollLink(e, link.href, link.targetId)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CENTRO PERFECTO */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-heading tracking-tight md:text-2xl subtitle text-center font-bold"
        >
          MAJUSKE
        </Link>

        {/* LADO DERECHO */}
        <div className="flex w-24 items-center justify-end gap-4 md:w-44 text-gray-700">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 text-sm transition-colors hover:text-primary text-gray-700"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="size-5" />
            <span className="hidden md:inline">Carrito</span>

            {totalItems > 0 && (
              <span className="-right-2 -top-2 flex size-5 items-center justify-center rounded border border-zinc-500 text-[10px] font-semibold text-gray-700 md:static md:size-6 md:text-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 transition-all md:hidden',
          mobileOpen ? 'max-h-60' : 'max-h-0 border-t-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-3 text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleScrollLink(e, link.href, link.targetId)}
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