import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="mx-auto px-5 pt-16 pb-20 md:pt-24 md:pb-28 color-primary ">
      <div className="mx-auto max-w-3xl flex flex-col items-center">
        <p className="mb-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Hecho a mano en Costa Rica
        </p>
        <h1 className="text-balance font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
          Tradición tejida a la medida de ti
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Prendas folklóricas costarricenses confeccionadas por artesanas, con
          la opción de crear tu pieza a medida. Trajes típicos, blusas bordadas
          y textiles que celebran nuestra herencia.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/#galeria">
            <Button size="lg">
              Ver galería
            </Button>
          </Link>
          <Link to="/#pedidos">
            <Button
              size="lg"
              variant="outline" className="bg-[#B23A26] text-white"
            >
              Pedido a medida
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative mt-16 aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted md:mt-20 md:aspect-[16/8]">
        <img
          src="/images/banner.jpeg"
          alt="Traje típico folklórico costarricense con blusa de algodón y falda floral"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
