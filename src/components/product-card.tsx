import { Link } from 'react-router-dom'
import { type Product, formatColones, CONFIG_OFERTAS } from '../lib/products'
import { cn } from '../lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Comprobamos si este producto específico está en oferta
  const oferta = CONFIG_OFERTAS.find((o) => o.id === product.id)
  const tieneOferta = !!oferta
  const precioMostrar = tieneOferta ? oferta.precioOferta : product.price

  return (
    <Link 
      to={`/producto/${product.id}`} 
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:shadow-md"
    >
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-zinc-100 box-shadow-sm border border-zinc-200">
        {tieneOferta && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
            OFERTA
          </span>
        )}
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Información del Producto */}
      <div className="mt-4 flex flex-1 flex-col justify-between text-left">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">
            {product.category}
          </p>
          <h3 className="mt-1 font-heading text-base font-medium text-zinc-900 line-clamp-2 group-hover:underline">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Bloque de Precios adaptativo */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className={cn(
            "text-base font-bold",
            tieneOferta ? "text-red-600" : "text-zinc-900"
          )}>
            {formatColones(precioMostrar)}
          </span>
          {tieneOferta && (
            <span className="text-xs text-zinc-400 line-through">
              {formatColones(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}