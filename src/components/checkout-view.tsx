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
import { formatColones } from '../lib/products'

// Lista de productos complementarios con imágenes reales
const PRODUCTOS_COMPLEMENTARIOS = [
  {
    id: 'comp-1',
    name: 'Pañuelo Folklórico Rojo',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&auto=format&fit=crop&q=60',
    category: 'Accesorios',
    shortDescription: 'Pañuelo tradicional para completar tu atuendo folklórico.',
    description: 'Pañuelo de tela liviana con colores típicos, ideal para adornar el traje folklórico y darle un toque elegante.',
    materials: 'Tela ligera y resistente',
    madeToOrder: false,
  },
  {
    id: 'comp-2',
    name: 'Cinta Costarricense para Pelo',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&auto=format&fit=crop&q=60',
    category: 'Accesorios',
    shortDescription: 'Cinta decorativa con estilo costarricense para el cabello.',
    description: 'Cinta para pelo con colores inspirados en la tradición folklórica costarricense, perfecta para eventos culturales y fiestas típicas.',
    materials: 'Algodón y seda',
    madeToOrder: false,
  },
  {
    id: 'comp-3',
    name: 'Arracadas / Aretes Típicos',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=60',
    category: 'Accesorios',
    shortDescription: 'Aretes tradicionales para complementar el conjunto folklórico.',
    description: 'Arracadas artesanales que realzan el estilo folklórico con un diseño clásico y colores tradicionales.',
    materials: 'Metal y textiles decorativos',
    madeToOrder: false,
  },
  {
    id: 'comp-4',
    name: 'Abanico Artesanal de Madera',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?w=400&auto=format&fit=crop&q=60',
    category: 'Accesorios',
    shortDescription: 'Abanico de madera hecho a mano para eventos folklóricos.',
    description: 'Abanico artesanal con detalles tradicionales, ideal para usar en bailes folklóricos y celebraciones típicas.',
    materials: 'Madera y tela pintada',
    madeToOrder: false,
  },
];

export function CheckoutView() {

  const { items, subtotal, clear, addItem } = useCart() // Eliminado el "as any"
  const [submitted, setSubmitted] = useState(false)
  const [shipping, setShipping] = useState('domicilio')

  const shippingCost = items.length === 0 ? 0 : shipping === 'domicilio' ? 3500 : 0
  const total = subtotal + shippingCost
  const hasCustom = items.some((i) => i.size === 'A medida')

  const location = useLocation();

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
        <Link
          to="/#galeria"
          onClick={(e) => handleScrollLink(e, 'galeria')}>
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
        <Link
          to="/#galeria"
          onClick={(e) => handleScrollLink(e, 'galeria')}>
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
        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-heading text-xl text-black">Datos de contacto</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" required placeholder="María Rodríguez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" required placeholder="+506 8888 0000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="maria@correo.com"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-heading text-xl text-black">Entrega</legend>
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
                  <span>
                    <span className="block text-sm font-medium text-black">
                      Envío a domicilio
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Todo el país · 2 a 4 días
                    </span>
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
                  <span>
                    <span className="block text-sm font-medium text-black">
                      Retiro en taller
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      San José centro
                    </span>
                  </span>
                </span>
                <span className="text-sm font-medium text-green-600">Gratis</span>
              </Label>
            </RadioGroup>

            {shipping === 'domicilio' && (
              <div className="space-y-2 mt-4">
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
            <fieldset className="space-y-4 flex flex-col gap-4 text-start">
              <legend className="font-heading text-xl text-black text-center">Pedido a medida</legend>
              <p className="text-sm text-muted-foreground">
                Tu pedido incluye prendas a medida. Coordinaremos las medidas
                contigo antes de confeccionar.
              </p>
              <div className="space-y-2 mt-4">
                <Label htmlFor="custom-notes" className="mb-4">
                  Notas adicionales
                </Label>
                <Textarea
                  id="custom-notes"
                  placeholder="Fechas importantes, preferences de color, referencias..."
                />
              </div>
            </fieldset>
          )}

          <Button type="submit" size="lg" className="w-full bg-[#B23A26] text-white">
            Confirmar pedido · {formatColones(total)}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No se realizará ningún cobro hasta confirmar los detalles de tu
            pedido.
          </p>
        </form>

        <aside className="order-first lg:order-none h-fit rounded-lg border border-border bg-secondary p-6 lg:sticky lg:top-24">
          <p className="font-heading text-xl text-black">Resumen</p>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li
                key={`${item.product.id}-${item.size}`}
                className="flex gap-3 items-start"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <img
                    src={item.product.image || '/placeholder.svg'}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start text-black min-w-0">
                  <span className="text-sm font-medium leading-tight text-start ">
                    {item.product.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Talla {item.size} · x{item.quantity}
                  </span>
                  <span className="mt-auto text-sm">
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
              <dd>{formatColones(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Envío</dt>
              <dd>
                {shippingCost === 0 ? 'Gratis' : formatColones(shippingCost)}
              </dd>
            </div>
          </dl>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>
            <span className="font-heading text-2xl text-black">{formatColones(total)}</span>
          </div>
        </aside>
      </div>

      {/* PASARELA DE PRODUCTOS COMPLEMENTARIOS */}
      <div className="mt-12 bg-white p-8 rounded-lg border border-gray-100">
        <h3 className="font-heading text-xl text-black font-semibold mb-2">
          ¿Deseas agregar un toque final a tu traje?
        </h3>
        <p className="text-sm text-gray-400 mb-6">Completa tu outfit folklórico costarricense con estos accesorios:</p>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
          {PRODUCTOS_COMPLEMENTARIOS.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-[#F9F6F0] min-w-[180px] max-w-[180px] snap-start border border-gray-200 rounded-md p-3 flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full mb-2 rounded bg-white overflow-hidden">
                <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-medium text-gray-900 line-clamp-2 text-left">
                  {prod.name}
                </h4>
                <p className="text-sm font-semibold text-gray-800 mt-1 text-left">
                  {formatColones(prod.price)}
                </p>
              </div>
              <Button 
                type="button"
                onClick={() => addItem(prod, { size: 'Única' })}
                size="sm" 
                variant="outline"
                className="mt-3 w-full text-xs bg-white text-black border-gray-300 hover:bg-gray-50"
              >
                + Agregar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}