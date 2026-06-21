import { Link } from 'react-router-dom'
import { type Product, formatColones } from '../lib/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/producto/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.madeToOrder && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-wider text-foreground backdrop-blur">
            A medida
          </span>
        )}
      </div>
      <div className="mt-3 flex justify-between gap-3">
        <div className='flex flex-col items-start '>
          <h3 className="text-sm font-medium leading-tight text-black">{product.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>
        <span className="shrink-0 text-sm text-black">{formatColones(product.price)}</span>
      </div>
    </Link>
  )
}
