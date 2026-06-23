import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { useCart } from './cart-provider' 
import { formatColones } from '../lib/products'

// Muestra de productos con imágenes reales para asegurar el renderizado
const PRODUCTOS_DESCUENTO = [
  {
    id: 'desc-1',
    name: 'Combo Blusa Folklórica + Pañuelo',
    price: 17500, // Precio con descuento
    precioOriginal: 25000,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'desc-2',
    name: 'Falda Típica Escolar (Especial)',
    price: 12600, // Precio con descuento
    precioOriginal: 18000,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop&q=60',
  },
  {
    id: 'desc-3',
    name: 'Fajón Artesanal Tricolor',
    price: 5600, // Precio con descuento
    precioOriginal: 8000,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&auto=format&fit=crop&q=60',
  }
]

export function Hero() {
  const location = useLocation();
  const { addItem } = useCart() // Tipado estricto sin 'any'

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
    <section className="mx-auto px-5 pb-12 pt-5 md:pt-0 md:pb-12 color-primary">
      {/* Contenedor principal */}
      <div className="mx-auto max-w-3xl flex flex-col gap-8 items-center text-center py-12 md:py-12">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-700 font-semibold">
          Hecho a mano en Costa Rica
        </p>

        <p className="text-balance font-heading text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl text-black">
          Tradición tejida a la medida de ti
        </p>

        <p className="mx-auto mt-2 max-w-xl text-pretty leading-relaxed text-gray-700">
          Prendas folklóricas costarricenses confeccionadas por artesanas, con
          la opción de crear tu pieza a medida. Trajes típicos, blusas bordadas
          y textiles que celebran nuestra herencia.
        </p>

        <div className="mt-4 flex flex-col items-center justify-center gap-3 text-gray-700 w-full max-w-xs mx-auto">
          <Link to="/#galeria" onClick={(e) => handleScrollLink(e, 'galeria')} className="w-full">
            <Button size="lg" className="w-full">
              Ver galería
            </Button>
          </Link>

          <Link to="/#pedidos" onClick={(e) => handleScrollLink(e, 'pedidos')} className="w-full">
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

      {/* PASARELA DE PRODUCTOS CON DESCUENTO */}
      <div className="mb-10 max-w-6xl mx-auto px-2">
        <h3 className="font-heading text-xl text-black font-semibold mb-4 text-center md:text-left">
           Ofertas Especiales de Temporada
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-thin">
          {PRODUCTOS_DESCUENTO.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white min-w-[220px] max-w-[220px] snap-start border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-square w-full mb-3 rounded-md overflow-hidden bg-gray-100">
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  OFERTA
                </span>
                <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 text-left mb-1">
                  {prod.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="text-sm font-bold text-red-600">{formatColones(prod.price)}</span>
                  <span className="text-xs text-gray-400 line-through">{formatColones(prod.precioOriginal)}</span>
                </div>
              </div>
              <Button 
                onClick={() => addItem({
                  id: prod.id, name: `${prod.name} (% OFF)`, price: prod.price, image: prod.image,
                  category: '',
                  shortDescription: '',
                  description: '',
                  materials: '',
                  madeToOrder: false
                }, { size: 'Estándar' })}
                size="sm" 
                className="mt-3 w-full bg-black text-white hover:bg-gray-800 text-xs"
              >
                Agregar Oferta
              </Button>
            </div>
          ))}
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