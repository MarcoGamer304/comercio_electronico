import { useState } from 'react'
import { products } from '../lib/products'
import { ProductCard } from './product-card'
import { cn } from '../lib/utils'

const categories = ['Todos', 'Trajes', 'Blusas', 'Camisas', 'Textiles']

export function ProductGrid() {
  const [active, setActive] = useState('Todos')

  const filtered =
    active === 'Todos'
      ? products
      : products.filter((p) => p.category === active)

  return (
    <section id="galeria" className="mb-6 px-5 py-4 md:py-12 mt-5">
      
      {/* 1. Div superior independiente: Centrado */}
      <div className="mb-1 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-700 font-semibold">
          La colección
        </p>
      </div>

      {/* 2. Div inferior: Galería a la izquierda, Filtros a la derecha a la misma altura */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Izquierda */}
        <div className="mb-2 md:mb-0">
          <p className="text-3xl tracking-tight font-medium text-gray-700 ">
            Galería de prendas
          </p>
        </div>
        
        {/* Derecha */}
        <div className="flex flex-wrap gap-2 md:justify-end">
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

      {/* 
        CORRECCIÓN AQUÍ: 
        - Mantenemos grid-cols-2 en móvil (para que no queden muy estrujados).
        - Cambiamos md:grid-cols-3 por md:grid-cols-4 en pantallas medianas/laptops.
        - Añadimos lg:grid-cols-5 en pantallas de escritorio más grandes para aumentar más la malla y achicar los divs.
      */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}