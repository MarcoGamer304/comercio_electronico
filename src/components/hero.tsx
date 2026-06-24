import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { useCart } from './cart-provider' 
import { products, formatColones } from '../lib/products'
import { CONFIG_OFERTAS } from '../lib/products'

export function Hero() {
  const location = useLocation()
  const { addItem } = useCart()

  // 2. Mapeamos y filtramos para obtener los objetos completos con sus imágenes y descripciones reales
  const productosEnOferta = CONFIG_OFERTAS.map((oferta) => {
    const productoOriginal = products.find((p) => p.id === oferta.id)
    if (!productoOriginal) return null
    
    return {
      ...productoOriginal,
      precioOriginal: productoOriginal.price, // Guardamos el valor original para tacharlo
      price: oferta.precioOferta, // Pisamos el precio base con el de oferta para el carrito
    }
  }).filter(Boolean) // Removemos nulos si algún ID no se encontrara

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
      <div className="mb-4 mx-auto px-4 py-4 bg-[#EFEBE2] bg-secondary rounded-lg border border-zinc-200 box-shadow-sm">
        <h3 className="font-heading text-xl text-black font-semibold mb-4 text-center md:text-left">
          Ofertas Especiales de Temporada
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-thin">
          {productosEnOferta.map((prod) => {
            if (!prod) return null
            return (
              <div 
                key={prod.id} 
                className="bg-white min-w-[220px] max-w-[220px] snap-start border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col justify-between group transition-shadow hover:shadow-md"
              >
                {/* Enlace envolvente al detalle del producto real */}
                <Link to={`/producto/${prod.id}`} className="block flex-1 flex flex-col">
                  <div className="relative aspect-square w-full mb-3 rounded-md overflow-hidden bg-muted">
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                      OFERTA
                    </span>
                    <img 
                      src={prod.image || '/placeholder.svg'} 
                      alt={prod.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-start">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 text-left mb-1 group-hover:underline">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-left text-gray-500 line-clamp-1 mb-2">
                      {prod.shortDescription}
                    </p>
                    <div className="flex items-baseline gap-2 mt-auto pb-1">
                      <span className="text-sm font-bold text-red-600">{formatColones(prod.price)}</span>
                      <span className="text-xs text-gray-400 line-through">{formatColones(prod.precioOriginal)}</span>
                    </div>
                  </div>
                </Link>

                {/* Botón de compra rápida con precio de oferta e interfaz limpia */}
                <Button 
                  onClick={() => addItem(
                    { ...prod, name: `${prod.name} (Oferta)` }, 
                    { size: 'Estándar' }
                  )}
                  size="sm" 
                  className="mt-3 w-full bg-[#B23A26] text-white hover:bg-[#9c3220] transition-colors text-xs"
                >
                  Agregar Oferta
                </Button>
              </div>
            )
          })}
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