import { useState } from 'react'
import { products } from '../lib/products'
import { ProductCard } from './product-card'
import { cn } from '../lib/utils'

// Filtros específicos para las prendas de vestir y textiles
const categoriesPrendas = ['Todos', 'Trajes', 'Blusas', 'Camisas', 'Textiles']
// Filtros específicos para los accesorios (puedes ampliarlo si agregas más tipos de accesorios)
const categoriesAccesorios = ['Todos', 'Accesorios']

export function ProductGrid() {
  // Creamos dos estados independientes para que no se interfieran entre sí
  const [activePrendas, setActivePrendas] = useState('Todos')
  const [activeAccesorios, setActiveAccesorios] = useState('Todos')

  // 1. Filtrado para la sección de prendas (Ropa y Textiles)
  // Excluimos explícitamente la categoría 'Accesorios' para que no se mezcle aquí
  const todasLasPrendas = products.filter((p) => p.category !== 'Accesorios')
  
  const filteredPrendas =
    activePrendas === 'Todos'
      ? todasLasPrendas
      : todasLasPrendas.filter((p) => p.category === activePrendas)

  // 2. Filtrado para la sección de accesorios
  // Obtenemos únicamente los que pertenezcan a la categoría 'Accesorios'
  const todosLosAccesorios = products.filter((p) => p.category === 'Accesorios')

  const filteredAccesorios =
    activeAccesorios === 'Todos'
      ? todosLosAccesorios
      : todosLosAccesorios.filter((p) => p.category === activeAccesorios)

  return (
    <section id="galeria" className="mb-6 px-5 py-4 md:py-12 mt-5">
      
      {/* ================= SECCIÓN DE PRENDAS DE VESTIR ================= */}
      <div className="mb-1 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-700 font-semibold">
          La colección
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0">
          <p className="text-3xl tracking-tight font-medium text-gray-700 ">
            Galería de prendas
          </p>
        </div>
        
        {/* Filtros de Prendas */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {categoriesPrendas.map((cat) => (
            <button
              key={cat}
              onClick={() => setActivePrendas(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer',
                activePrendas === cat
                  ? "border-zinc-900 bg-zinc-900 text-white font-medium"
                  : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-900",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:grid-cols-5 box-shadow-sm p-4 rounded-lg border border-zinc-200 bg-[#EFEBE2] bg-secondary mb-8">
        {filteredPrendas.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredPrendas.length === 0 && (
          <p className="col-span-full text-center py-8 text-sm text-gray-500">No hay prendas disponibles en esta categoría.</p>
        )}
      </div>


      {/* ================= SECCIÓN DE ACCESORIOS ================= */}
      <div className="mt-4 mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0">
          <p className="text-3xl tracking-tight font-medium text-gray-700 ">
            Galería de accesorios
          </p>
        </div>
        
        {/* Filtros de Accesorios */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {categoriesAccesorios.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveAccesorios(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer',
                activeAccesorios === cat
                  ? "border-zinc-900 bg-zinc-900 text-white font-medium"
                  : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-900",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:grid-cols-5 box-shadow-sm p-4 rounded-lg border border-zinc-200 bg-[#EFEBE2] bg-secondary">
        {filteredAccesorios.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredAccesorios.length === 0 && (
          <p className="col-span-full text-center py-8 text-sm text-gray-500">No hay accesorios disponibles.</p>
        )}
      </div>

    </section>
  )
}