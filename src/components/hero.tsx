import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'

export function Hero() {
  
  const location = useLocation();

  // Función para manejar el scroll suave manual dentro de la misma página
  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } 
    }
  }

  return (
    <section className="mx-auto px-5 pt-24 pb-12 md:pt-24 md:pb-12 color-primary">
      {/* Contenedor principal */}
      <div className="mx-auto max-w-3xl flex flex-col gap-8 items-center text-center py-12 md:py-12">

        {/* Subtítulo superior */}
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-700 font-semibold">
          Hecho a mano en Costa Rica
        </p>

        {/* Título principal - Cambiado a h1 por SEO y semántica */}
        <p className="text-balance font-heading text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl text-black">
          Tradición tejida a la medida de ti
        </p>

        {/* Párrafo descriptivo */}
        <p className="mx-auto mt-2 max-w-xl text-pretty leading-relaxed text-gray-700">
          Prendas folklóricas costarricenses confeccionadas por artesanas, con
          la opción de crear tu pieza a medida. Trajes típicos, blusas bordadas
          y textiles que celebran nuestra herencia.
        </p>

        {/* Bloque de acciones unificado y corregido */}
        <div className="mt-4 flex flex-col items-center justify-center gap-3 text-gray-700 w-full max-w-xs mx-auto">
          
          {/* PRIMER BOTÓN: Ver Galería (Manual con la función de scroll) */}
          <Link 
            to="/#galeria" 
            onClick={(e) => handleScrollLink(e, 'galeria')}
            className="w-full"
          >
            <Button size="lg" className="w-full">
              Ver galería
            </Button>
          </Link>

          {/* SEGUNDO BOTÓN: Pedido a Medida (Manual con la función de scroll) */}
          <Link 
            to="/#pedidos" 
            onClick={(e) => handleScrollLink(e, 'pedidos')}
            className="w-full"
          >
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

      {/* Imagen Banner */}
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