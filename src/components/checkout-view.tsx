import { Link, useLocation } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { Check, ChevronLeft } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import {
  RadioGroup,
  RadioGroupItem,
} from './ui/radio-group'
import { useCart } from './cart-provider'
import { formatColones, products, CONFIG_OFERTAS } from '../lib/products'
import { cn } from '../lib/utils'

// 1. Vinculamos la pasarela del checkout a los IDs de tus accesorios reales en products.ts
const COMPLEMENTARIOS_IDS = ['panuelo-rojo', 'cinta-pelo', 'aretes-tipicos', 'abanico-madera'];

export function CheckoutView() {
  const { items, subtotal, clear, addItem } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [shipping, setShipping] = useState('domicilio')

  const shippingCost = items.length === 0 ? 0 : shipping === 'domicilio' ? 3500 : 0
  const total = subtotal + shippingCost
  const hasCustom = items.some((i) => i.size === 'A medida')

  const location = useLocation();

  // 2. Mapeamos los IDs de los complementarios inyectando lógica de ofertas si existiera alguna para ellos
  const accesoriosComplementarios = COMPLEMENTARIOS_IDS.map((id) => {
    const prodReal = products.find((p) => p.id === id)
    if (!prodReal) return null

    const oferta = CONFIG_OFERTAS.find((o) => o.id === id)
    return {
      ...prodReal,
      precioOriginal: prodReal.price,
      precioFinal: oferta ? oferta.precioOferta : prodReal.price,
      tieneOferta: !!oferta,
    }
  }).filter(Boolean)

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-gray-700 text-center gap-4 flex flex-col items-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6 text-green-600" />
        </div>
        <p className="mt-6 font-heading text-3xl text-black">¡Pedido recibido!</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Gracias por apoyar el folclore costarricense. Te enviaremos un correo
          para confirmar los detalles
          {hasCustom ? ' y coordinar las medidas solicitadas' : ''}.
        </p>
        <Link to="/#galeria" onClick={(e) => handleScrollLink(e, 'galeria')}>
          <Button className="mt-8 bg-[#B23A26] text-white w-full border-none hover:bg-[#9c3220] transition-colors">
            Seguir explorando
          </Button>
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center gap-2 flex flex-col items-center text-gray-700">
        <p className="font-heading text-3xl text-black">Tu carrito está vacío</p>
        <p className="mt-3 text-muted-foreground">
          Agrega prendas para continuar con tu pedido.
        </p>
        <Link to="/#galeria" onClick={(e) => handleScrollLink(e, 'galeria')}>
          <Button className="mt-4 bg-[#B23A26] text-white w-full border-none hover:bg-[#9c3220] transition-colors">
            Ver galería
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:py-12 bg-[#F9F6F0] text-gray-600">
      <Link
        to="/#galeria"
        onClick={(e) => handleScrollLink(e, 'galeria')}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Seguir comprando
      </Link>

      <div className="mt-2 grid gap-12 lg:grid-cols-[1fr_380px] bg-white p-8 rounded-lg">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-heading text-xl text-black text-left">Datos de contacto</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 text-left">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" required placeholder="María Rodríguez" />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" required placeholder="+506 8888 0000" />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" required placeholder="maria@correo.com" />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-heading text-xl text-black text-left">Entrega</legend>
            <RadioGroup value={shipping} onValueChange={setShipping} className="grid gap-3">
              <Label
                htmlFor="domicilio"
                className="flex cursor-pointer items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-zinc-50"
              >
                <span className="flex items-center gap-3">
                  <RadioGroupItem
                    value="domicilio"
                    id="domicilio"
                    className="border-gray-400 text-gray-900 focus:border-gray-900 data-[state=checked]:bg-gray-900 data-[state=checked]:text-white"
                  />
                  <span className="text-left">
                    <span className="block text-sm font-medium text-black">Envío a domicilio</span>
                    <span className="block text-xs text-muted-foreground">Todo el país · 2 a 4 días</span>
                  </span>
                </span>
                <span className="text-sm font-medium">{formatColones(3500)}</span>
              </Label>

              <Label
                htmlFor="retiro"
                className="flex cursor-pointer items-center justify-between rounded-md border border-border p-4 transition-colors hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <RadioGroupItem
                    value="retiro"
                    id="retiro"
                    className="border-gray-400 text-gray-900 focus:border-gray-900 data-[state=checked]:bg-gray-900 data-[state=checked]:text-white"
                  />
                  <span className="text-left">
                    <span className="block text-sm font-medium text-black">Retiro en taller</span>
                    <span className="block text-xs text-muted-foreground">San José centro</span>
                  </span>
                </span>
                <span className="text-sm font-medium text-green-600">Gratis</span>
              </Label>
            </RadioGroup>

            {shipping === 'domicilio' && (
              <div className="space-y-2 mt-4 text-left">
                <Label htmlFor="address" className="text-sm font-medium">Dirección</Label>
                <Textarea
                  id="address"
                  required
                  placeholder="Provincia, cantón, distrito y señas exactas"
                  className="mt-1 min-h-20"
                />
              </div>
            )}
          </fieldset>

          {hasCustom && (
            <fieldset className="space-y-4 flex flex-col gap-1 text-start">
              <legend className="font-heading text-xl text-black text-left">Pedido a medida</legend>
              <p className="text-sm text-muted-foreground">
                Tu pedido incluye prendas a medida. Coordinaremos las medidas contigo antes de confeccionar.
              </p>
              <div className="space-y-2 mt-2">
                <Label htmlFor="custom-notes">Notas adicionales</Label>
                <Textarea
                  id="custom-notes"
                  placeholder="Fechas importantes, preferencias de color, referencias..."
                />
              </div>
            </fieldset>
          )}

          <Button type="submit" size="lg" className="w-full bg-[#B23A26] text-white hover:bg-[#9c3220] transition-colors">
            Confirmar pedido · {formatColones(total)}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No se realizará ningún cobro hasta confirmar los detalles de tu pedido.
          </p>
        </form>

        {/* Resumen lateral */}
        <aside className="order-first lg:order-none h-fit rounded-lg border border-border bg-zinc-50/50 p-6 lg:sticky lg:top-24">
          <p className="font-heading text-xl text-black text-left font-medium">Resumen del pedido</p>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={`${item.product.id}-${item.size}`} className="flex gap-3 items-start">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted border border-gray-100">
                  <img
                    src={item.product.image || '/placeholder.svg'}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start text-black min-w-0 text-left">
                  <span className="text-sm font-medium leading-tight line-clamp-2">
                    {item.product.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Talla {item.size} · x{item.quantity}
                  </span>
                  <span className="mt-2 text-sm font-semibold">
                    {formatColones(item.product.price * item.quantity)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium text-gray-900">{formatColones(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Envío</dt>
              <dd className="font-medium text-gray-900">
                {shippingCost === 0 ? <span className="text-green-600 font-semibold">Gratis</span> : formatColones(shippingCost)}
              </dd>
            </div>
          </dl>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Total a pagar</span>
            <span className="font-heading text-2xl font-bold text-black">{formatColones(total)}</span>
          </div>
        </aside>
      </div>

      {/* PASARELA DE PRODUCTOS COMPLEMENTARIOS REALES */}
      <div className="mt-12 bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-left">
        <h3 className="font-heading text-xl text-black font-semibold mb-2">
          ¿Deseas agregar un toque final a tu conjunto?
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Completa tu atuendo típico costarricense añadiendo alguno de nuestros accesorios artesanales:
        </p>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin mt-4">
          {accesoriosComplementarios.map((prod) => {
            if (!prod) return null
            return (
              <div 
                key={prod.id} 
                className="bg-zinc-50 min-w-[190px] max-w-[190px] snap-start border border-gray-200/80 rounded-lg p-3 flex flex-col justify-between group transition-shadow hover:shadow-sm"
              >
                {/* Envoltura visual con enlace por si quiere revisar su detalle */}
                <Link to={`/producto/${prod.id}`} className="block flex-1 flex flex-col">
                  <div className="relative aspect-square w-full mb-2 rounded-md bg-white overflow-hidden border border-gray-100">
                    {prod.tieneOferta && (
                      <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                        OFERTA
                      </span>
                    )}
                    <img 
                      src={prod.image || '/placeholder.svg'} 
                      alt={prod.name} 
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <h4 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight group-hover:underline">
                      {prod.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className={cn("text-sm font-bold", prod.tieneOferta ? "text-red-600" : "text-gray-900")}>
                        {formatColones(prod.precioFinal)}
                      </span>
                      {prod.tieneOferta && (
                        <span className="text-[10px] text-gray-400 line-through">
                          {formatColones(prod.precioOriginal)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <Button 
                  type="button"
                  onClick={() => {
                    // Si el accesorio tiene oferta, lo inyectamos al carrito respetando su precio rebajado
                    const finalItem = prod.tieneOferta
                      ? { ...prod, price: prod.precioFinal, name: `${prod.name} (Oferta)` }
                      : prod;
                    addItem(finalItem, { size: 'Única' })
                  }}
                  size="sm" 
                  className="mt-3 w-full text-xs bg-[#B23A26] text-white hover:bg-[#9c3220] transition-colors"
                >
                  + Agregar
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}