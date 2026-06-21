import { useState } from 'react'
import { products } from '../lib/products'
import { ProductCard } from './product-card'
import { cn } from '../lib/utils'

const categories = ['Todos', 'Trajes', 'Blusas', 'Faldas', 'Textiles']

export function ProductGrid() {
  const [active, setActive] = useState('Todos')

  const filtered =
    active === 'Todos'
      ? products
      : products.filter((p) => p.category === active)

  return (
    <section id="galeria" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground flex items-start">
            La colección
          </p>
          <h2 className="font-heading text-4xl tracking-tight md:text-5xl">
            Galería de prendas
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                active === cat
                  ? "border-zinc-900 bg-zinc-900 text-white font-medium"
                  : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-900",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
