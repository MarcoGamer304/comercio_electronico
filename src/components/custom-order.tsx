import { Ruler, Scissors, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const steps = [
  {
    icon: Ruler,
    title: 'Comparte tus medidas',
    description:
      'Elige una prenda y envíanos tus medidas exactas o el modelo que sueñas.',
  },
  {
    icon: Scissors,
    title: 'Confección artesanal',
    description:
      'Nuestras artesanas confeccionan tu pieza a mano, bordado por bordado.',
  },
  {
    icon: Truck,
    title: 'Entrega de tu pieza',
    description:
      'Recibe tu prenda única en casa, lista para celebrar nuestras raíces.',
  },
]

export function CustomOrder() {
  return (
    <section id="pedidos" className="bg-secondary bg-[#EFEBE2]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl flex flex-col items-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Pedidos a medida
          </p>
          <h2 className="text-balance font-heading tracking-tight subtitle-size pt-3">
            Una prenda hecha solo para ti
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Cada cuerpo es distinto y cada celebración es única. Confeccionamos
            trajes típicos y textiles a tu medida, respetando la técnica
            tradicional costarricense.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3" >
          {steps.map((step, i) => (
           <div key={step.title} className="text-center flex flex-col gap-1">
                <div className="mx-auto flex rounded-full items-center justify-center bg-white p-4 shadow-sm mb-2">
                  <step.icon className="text-primary size-5 font-red" />
                </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Paso {i + 1}
              </p>
              <h3 className="mt-1 font-heading text-2xl font-semibold text-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/#galeria">
            <Button size="lg" className="bg-[#B23A26] text-white">
              Empezar mi pedido
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
