import { Link } from 'react-router-dom'
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

export function CheckoutView() {
  const { items, subtotal, clear } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [shipping, setShipping] = useState('domicilio')

  const shippingCost = items.length === 0 ? 0 : shipping === 'domicilio' ? 3500 : 0
  const total = subtotal + shippingCost
  const hasCustom = items.some((i) => i.size === 'A medida')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" />
        </div>
        <h1 className="mt-6 font-heading text-3xl">¡Pedido recibido!</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Gracias por apoyar la artesanía costarricense. Te enviaremos un correo
          para confirmar los detalles
          {hasCustom ? ' y coordinar las medidas de tus prendas a medida' : ''}.
        </p>
        <Link to="/#galeria">
          <Button className="mt-8">
            Seguir explorando
          </Button>
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="font-heading text-3xl">Tu carrito está vacío</h1>
        <p className="mt-3 text-muted-foreground">
          Agrega prendas para continuar con tu pedido.
        </p>
        <Link to="/#galeria">
          <Button className="mt-8">
            Ver galería
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:py-12 bg-[#F9F6F0]">
      <Link
        to="/#galeria"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Seguir comprando
      </Link>

      <h1 className="font-heading text-4xl tracking-tight md:text-5xl">
        Finalizar pedido
      </h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-heading text-xl">Datos de contacto</legend>
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
            <legend className="font-heading text-xl">Entrega</legend>
            <RadioGroup value={shipping} onValueChange={setShipping}>
              <Label
                htmlFor="domicilio"
                className="flex cursor-pointer items-center justify-between rounded-md border border-border p-4"
              >
                <span className="flex items-center gap-3">
                  <RadioGroupItem value="domicilio" id="domicilio" />
                  <span>
                    <span className="block text-sm font-medium">
                      Envío a domicilio
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Todo el país · 2 a 4 días
                    </span>
                  </span>
                </span>
                <span className="text-sm">{formatColones(3500)}</span>
              </Label>
              <Label
                htmlFor="retiro"
                className="flex cursor-pointer items-center justify-between rounded-md border border-border p-4"
              >
                <span className="flex items-center gap-3">
                  <RadioGroupItem value="retiro" id="retiro" />
                  <span>
                    <span className="block text-sm font-medium">
                      Retiro en taller
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      San José centro
                    </span>
                  </span>
                </span>
                <span className="text-sm">Gratis</span>
              </Label>
            </RadioGroup>
            {shipping === 'domicilio' && (
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea
                  id="address"
                  required
                  placeholder="Provincia, cantón, distrito y señas exactas"
                />
              </div>
            )}
          </fieldset>

          {hasCustom && (
            <fieldset className="space-y-4">
              <legend className="font-heading text-xl">Pedido a medida</legend>
              <p className="text-sm text-muted-foreground">
                Tu pedido incluye prendas a medida. Coordinaremos las medidas
                contigo antes de confeccionar.
              </p>
              <div className="space-y-2">
                <Label htmlFor="custom-notes">Notas adicionales</Label>
                <Textarea
                  id="custom-notes"
                  placeholder="Fechas importantes, preferencias de color, referencias..."
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

        <aside className="h-fit rounded-lg border border-border bg-secondary p-6 lg:sticky lg:top-24">
          <h2 className="font-heading text-xl">Resumen</h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li
                key={`${item.product.id}-${item.size}`}
                className="flex gap-3"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-muted">
                  <img
                    src={item.product.image || '/placeholder.svg'}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start text-black">
                  <span className="text-sm font-medium leading-tight">
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
    </div>
  )
}
