import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCart } from "./cart-provider";
import { type Product, formatColones } from "../lib/products";
import { cn } from "../lib/utils";
import { CONFIG_OFERTAS } from "../lib/products";

const sizes = ["XS", "S", "M", "L", "XL", "A medida"];

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [notes, setNotes] = useState("");
  const isCustom = size === "A medida";

  const navigate = useNavigate();

  // 2. Comprobamos si este producto específico tiene una oferta activa
  const ofertaAsociada = CONFIG_OFERTAS.find((o) => o.id === product.id);
  const tieneOferta = !!ofertaAsociada;
  
  // Determinamos los precios correctos para la interfaz y el carrito
  const precioOriginal = product.price;
  const precioFinal = tieneOferta ? ofertaAsociada.precioOferta : product.price;

  function handleAdd() {
    // Si tiene oferta, enviamos un objeto modificado al carrito con el precio rebajado
    const productoParaCarrito = tieneOferta 
      ? { ...product, price: precioFinal, name: `${product.name} (Oferta)` }
      : product;

    addItem(productoParaCarrito, { size, notes: notes.trim() || undefined });
  }

  const handleBackToGallery = () => {
    navigate("/");

    setTimeout(() => {
      const element = document.getElementById("galeria");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:py-10">
      <button
        onClick={handleBackToGallery}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer text-gray-700"
      >
        <ChevronLeft className="size-4" />
        Volver a la galería
      </button>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Contenedor de la Imagen con Badge de Oferta */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-muted">
          {tieneOferta && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm animate-pulse">
              OFERTA ESPECIAL
            </span>
          )}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Detalles del producto */}
        <div className="text-gray-700 bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 font-heading text-4xl tracking-tight md:text-5xl text-black text-center md:text-left">
              {product.name}
            </h1>
            
            {/* Rediseño del precio para admitir descuentos visuales */}
            <div className="mt-4 flex items-center gap-3 justify-center md:justify-start w-full">
              <span className={cn(
                "font-heading text-2xl font-bold",
                tieneOferta ? "text-red-600" : "text-black"
              )}>
                {formatColones(precioFinal)}
              </span>
              {tieneOferta && (
                <span className="text-sm text-gray-400 line-through mt-1">
                  {formatColones(precioOriginal)}
                </span>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground text-center md:text-left">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <Label className="text-sm">Talla</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-12 rounded-sm border px-3 py-2 text-sm transition-all cursor-pointer",
                    size === s
                      ? "border-zinc-900 bg-zinc-900 text-white font-medium"
                      : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-900",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {isCustom && (
            <div className="mt-6">
              <Label htmlFor="notes" className="text-sm">
                Tus medidas y detalles
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: busto 90cm, cintura 70cm, cadera 96cm, alto 1.65m. Color preferido..."
                className="mt-3 mb-2 min-h-28"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Confirmaremos los detalles por correo antes de confeccionar.
              </p>
            </div>
          )}

          <Button
            size="lg"
            className="mt-8 w-full bg-[#B23A26] text-white hover:bg-[#9c3220] transition-colors"
            onClick={handleAdd}
          >
            Agregar al carrito
          </Button>

          <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground flex flex-col items-start">
            <li className="flex gap-3 items-start">
              <Check className="size-4 shrink-0 text-primary" />
              <span className="flex-1 text-left min-w-0">{product.materials}</span>
            </li>
            <li className="flex gap-3 items-start">
              <Check className="size-4 shrink-0 text-primary" />
              <span className="flex-1 text-left min-w-0">
                {product.madeToOrder
                  ? 'Disponible para confección a medida'
                  : 'Pieza lista para envío'}
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <Check className="size-4 shrink-0 text-primary" />
              <span className="flex-1 text-left min-w-0">Hecho a mano por artesanas costarricenses</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}