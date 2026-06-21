import { useNavigate } from "react-router-dom"; // Cambiamos Link por useNavigate
import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCart } from "./cart-provider";
import { type Product, formatColones } from "../lib/products";
import { cn } from "../lib/utils";

const sizes = ["XS", "S", "M", "L", "XL", "A medida"];

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [notes, setNotes] = useState("");
  const isCustom = size === "A medida";

  const navigate = useNavigate();

  function handleAdd() {
    addItem(product, { size, notes: notes.trim() || undefined });
  }

  // Redirige al inicio y baja suavemente hasta la sección de la galería
  const handleBackToGallery = () => {
    navigate("/");

    // Le damos un brevísimo momento a React Router para montar la vista 'Home'
    setTimeout(() => {
      const element = document.getElementById("galeria");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:py-10">
      {/* Botón corregido con comportamiento de navegación y scroll */}
      <button
        onClick={handleBackToGallery}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer text-gray-700"
      >
        <ChevronLeft className="size-4" />
        Volver a la galería
      </button>

      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* ... Resto de tu código intacto ... */}
        <div className="text-gray-700 bg-white p-6 rounded-lg shadow">

          <div className="flex flex-col gap-6 items-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {product.category}
            </p>
            <p className="mt-2 font-heading text-4xl tracking-tight md:text-5xl text-black">
              {product.name}
            </p>
            <p className="mt-4 font-heading text-2xl">
              {formatColones(product.price)}
            </p>

            <p className="mt-6 leading-relaxed text-muted-foreground">
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
                    "min-w-12 rounded-sm border px-3 py-2 text-sm transition-all",
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
                className="mt-3 mb-2 md:mb-2 min-h-28"
              />
              <p className="mt-2 md:mt-2 text-xs text-muted-foreground">
                Confirmaremos los detalles por correo antes de confeccionar.
              </p>
            </div>
          )}

          <Button
            size="lg"
            className="mt-8 w-full bg-[#B23A26] text-white"
            onClick={handleAdd}
          >
            Agregar al carrito
          </Button>

          <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <Check className="size-4 shrink-0 text-primary" />
              {product.materials}
            </li>
            <li className="flex gap-3">
              <Check className="size-4 shrink-0 text-primary" />
              {product.madeToOrder
                ? "Disponible para confección a medida"
                : "Pieza lista para envío"}
            </li>
            <li className="flex gap-3">
              <Check className="size-4 shrink-0 text-primary" />
              Hecho a mano por artesanas costarricenses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}