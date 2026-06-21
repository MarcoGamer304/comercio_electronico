import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="mx-auto px-5 pt-24 pb-12 md:pt-24 md:pb-12 color-primary ">
      {/* Contenedor principal con márgenes verticales estandarizados (py) */}
      <div className="mx-auto max-w-3xl flex flex-col gap-8 items-center text-center py-12 md:py-12">

        {/* Subtítulo superior: margen inferior estandarizado a mb-4 */}
        <p className="mb-8 text-xs uppercase tracking-[0.25em] text-gray-700 font-semibold">
          Hecho a mano en Costa Rica
        </p>

        {/* Título principal: flujo natural sin márgenes agresivos */}
        <p className="text-balance font-heading text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl text-black">
          Tradición tejida a la medida de ti
        </p>

        {/* Párrafo descriptivo: margen superior estandarizado a mt-6 */}
        <p className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed text-gray-700">
          Prendas folklóricas costarricenses confeccionadas por artesanas, con
          la opción de crear tu pieza a medida. Trajes típicos, blusas bordadas
          y textiles que celebran nuestra herencia.
        </p>

        {/* Bloque de acciones: margen superior estandarizado a mt-8 y botones en columna idénticos */}
        <div className="flex flex-col items-center justify-center gap-3 text-gray-700 w-full max-w-xs mx-auto">
          <Link to="/#galeria" className="w-full">
            <Button size="lg" className="w-full">
              Ver galería
            </Button>
          </Link>

          <Link to="/#pedidos" className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="bg-[#B23A26] text-white w-full border-none hover:bg-[#9c3220] transition-colors"
            >
              Pedido a medida
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative mt-8 aspect-16/10 w-full overflow-hidden rounded-lg bg-muted md:mt-8 md:aspect-16/8">
        <img
          src="/images/banner.jpeg"
          alt="Traje típico folklórico costarricense con blusa de algodón y falda floral"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
