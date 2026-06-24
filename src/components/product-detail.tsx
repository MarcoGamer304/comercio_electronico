/* eslint-disable react-hooks/purity */
import { useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ChevronLeft, Check, Star, AlertCircle, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useCart } from "./cart-provider";
import { type Product, formatColones, products, CONFIG_OFERTAS } from "../lib/products";
import { cn } from "../lib/utils";
import { INITIAL_REVIEWS, contieneContenidoInapropiado, type Review } from "../lib/reviews";

const sizes = ["XS", "S", "M", "L", "XL", "A medida"];
const COMPLEMENTARIOS_IDS = ['panuelo-rojo', 'cinta-pelo', 'aretes-tipicos', 'abanico-madera'];
const REVIEWS_POR_PAGINA = 5; // Cantidad de comentarios por página

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [notes, setNotes] = useState("");
  const isCustom = size === "A medida";

  const navigate = useNavigate();

  // Comprobamos si este producto específico tiene una oferta activa
  const ofertaAsociada = CONFIG_OFERTAS.find((o) => o.id === product.id);
  const tieneOferta = !!ofertaAsociada;

  // Determinamos los precios correctos para la interfaz y el carrito
  const precioOriginal = product.price;
  const precioFinal = tieneOferta ? ofertaAsociada.precioOferta : product.price;

  // Traemos e integramos la lógica de accesorios complementarios
  const accesoriosComplementarios = COMPLEMENTARIOS_IDS.map((id) => {
    const prodReal = products.find((p) => p.id === id)
    if (!prodReal) return null

    const oferta = CONFIG_OFERTAS.find((o) => o.id === id)
    return {
      ...prodReal,
      precioOriginal: prodReal.price,
      precioFinal: oferta ? oferta.precioOferta : prodReal.price,
      tieneOferta: !!oferta,
    }
  }).filter(Boolean)

  function handleAdd() {
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


  // --- LOGICA DE REVIEWS Y RENDIMIENTO ---

  // 1. Estado para controlar si la sección está abierta/expandida (Evita procesamiento innecesario de listas largas)
  const [reviewsExpandidas, setReviewsExpandidas] = useState(false);

  // Cargar lista base del localStorage o iniciales
  const [listaReviews, setListaReviews] = useState<Review[]>(() => {
    const locales = localStorage.getItem(`reviews_${product.id}`);
    if (locales) return JSON.parse(locales);
    return INITIAL_REVIEWS.map(r => ({ ...r, productId: product.id }));
  });

  // Estados para Filtros y Paginación
  const [filtroOrden, setFiltroOrden] = useState("reciente"); // reciente, antiguo, calificacion-desc, calificacion-asc, nombre-asc, nombre-desc
  const [paginaActual, setPaginaActual] = useState(1);

  // Estados del Formulario
  const [revName, setRevName] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [yaComento, setYaComento] = useState(() => {
    return localStorage.getItem(`usuario_comento_${product.id}`) === "true";
  });

  // 2. Aplicación de Filtros usando useMemo (Solo se recalcula si cambia la lista o el criterio de orden)
  const reviewsFiltradasYOrdenadas = useMemo(() => {
    const copia = [...listaReviews];
    
    return copia.sort((a, b) => {
      if (filtroOrden === "reciente") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filtroOrden === "antiguo") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (filtroOrden === "calificacion-desc") {
        return b.rating - a.rating;
      }
      if (filtroOrden === "calificacion-asc") {
        return a.rating - b.rating;
      }
      if (filtroOrden === "nombre-asc") {
        return a.name.localeCompare(b.name);
      }
      if (filtroOrden === "nombre-desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [listaReviews, filtroOrden]);

  // 3. Segmentación por Paginación
  const totalPaginas = Math.ceil(reviewsFiltradasYOrdenadas.length / REVIEWS_POR_PAGINA);
  
  const reviewsPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * REVIEWS_POR_PAGINA;
    const fin = inicio + REVIEWS_POR_PAGINA;
    return reviewsFiltradasYOrdenadas.slice(inicio, fin);
  }, [reviewsFiltradasYOrdenadas, paginaActual]);

  // Cambiar de filtro reinicia a la página 1
  const handleCambioFiltro = (nuevoOrden: string) => {
    setFiltroOrden(nuevoOrden);
    setPaginaActual(1);
  };

  const handleSubirReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!revName.trim() || !revComment.trim()) {
      setFormError("Por favor, completa todos los campos del formulario.");
      return;
    }

    if (contieneContenidoInapropiado(revComment) || contieneContenidoInapropiado(revName)) {
      setFormError("El comentario o nombre contiene palabras inapropiadas. Por favor, modifícalo.");
      return;
    }

    const nuevaReview: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      name: revName.trim(),
      rating: revRating,
      comment: revComment.trim(),
      createdAt: new Date().toISOString(),
      approved: false 
    };

    const nuevasReviews = [nuevaReview, ...listaReviews];
    setListaReviews(nuevasReviews); // Actualizamos el estado para que se refleje inmediatamente
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(nuevasReviews));
    localStorage.setItem(`usuario_comento_${product.id}`, "true");

    setFormSuccess(true);
    setYaComento(true);
    setRevName("");
    setRevComment("");
    setPaginaActual(1); // Manda al usuario a la primera página para ver su comentario en revisión
  };

  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const diffTime = Math.abs(Date.now() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Hoy mismo";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10 bg-[#F9F6F0]">
      <button
        onClick={handleBackToGallery}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer text-gray-700"
      >
        <ChevronLeft className="size-4" />
        Volver a la galería
      </button>

      <div className="grid gap-8 md:grid-cols-2 md:gap-14">
        {/* Contenedor de la Imagen */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-muted box-shadow-sm border border-zinc-200">
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
        <div className="text-gray-700 bg-white p-5 md:p-6 rounded-lg box-shadow-sm border border-zinc-200">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 font-heading text-3xl tracking-tight md:text-5xl text-black text-center md:text-left leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 justify-center md:justify-start w-full">
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

            <p className="mt-6 leading-relaxed text-muted-foreground text-center md:text-left text-sm md:text-base">
              {product.description}
            </p>
          </div>

          <div className="mt-8">
            <Label className="text-sm">Talla</Label>
            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
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
            <div className="mt-6 text-left">
              <Label htmlFor="notes" className="text-sm">
                Tus medidas y detalles
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: busto 90cm, cintura 70cm, cadera 96cm, alto 1.65m. Color preferido..."
                className="mt-3 mb-2 min-h-28 text-sm"
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

        {/* CARRUSEL DE ACCESORIOS */}
        <div className="col-span-full mt-4 bg-white p-5 md:p-8 rounded-lg border border-gray-200 shadow-sm text-left overflow-hidden">
          <h3 className="font-heading text-lg md:text-xl text-black font-semibold mb-1">
            ¿Deseas agregar un toque final a tu conjunto?
          </h3>
          <p className="text-xs md:text-sm text-gray-500 mb-5">
            Completa tu atuendo típico costarricense añadiendo alguno de nuestros accesorios artesanales:
          </p>

          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin mt-2 w-full">
            {accesoriosComplementarios.map((prod) => {
              if (!prod) return null
              return (
                <div
                  key={prod.id}
                  className="bg-zinc-50 w-40 sm:w-48 shrink-0 snap-start border border-gray-200/80 rounded-lg p-3 flex flex-col justify-between group transition-shadow hover:shadow-sm"
                >
                  <Link to={`/producto/${prod.id}`} className="block flex-1 flex-col">
                    <div className="relative aspect-square w-full mb-2 rounded-md bg-white overflow-hidden border border-gray-100">
                      {prod.tieneOferta && (
                        <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                          OFERTA
                        </span>
                      )}
                      <img
                        src={prod.image || '/placeholder.svg'}
                        alt={prod.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-left">
                      <h4 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight group-hover:underline">
                        {prod.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-2">
                        <span className={cn("text-xs md:text-sm font-bold", prod.tieneOferta ? "text-red-600" : "text-gray-900")}>
                          {formatColones(prod.precioFinal)}
                        </span>
                        {prod.tieneOferta && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatColones(prod.precioOriginal)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <Button
                    type="button"
                    onClick={() => {
                      const finalItem = prod.tieneOferta
                        ? { ...prod, price: prod.precioFinal, name: `${prod.name} (Oferta)` }
                        : prod;
                      addItem(finalItem, { size: 'Única' })
                    }}
                    size="sm"
                    className="mt-3 w-full text-xs bg-[#B23A26] text-white hover:bg-[#9c3220] transition-colors py-1 h-8"
                  >
                    + Agregar
                  </Button>
                </div>
              )
            })}
          </div>
        </div>

        {/* SECCIÓN DE RESEÑAS CON MEJORAS DE CARGA, FILTROS Y PAGINACIÓN */}
        <div className="col-span-full mt-2 bg-white rounded-lg border border-gray-200 shadow-sm text-left overflow-hidden">
          
          {/* Cabecera interactiva para abrir/cerrar */}
          <button 
            type="button"
            onClick={() => setReviewsExpandidas(!reviewsExpandidas)}
            className="w-full flex items-center justify-between p-5 md:p-8 hover:bg-zinc-50/50 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="font-heading text-lg md:text-xl text-black font-semibold">
                Opiniones de nuestros clientes
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {listaReviews.length} {listaReviews.length === 1 ? "opinión registrada" : "opiniones registradas"} para este artículo.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-zinc-100 px-3 py-1.5 rounded-md border border-zinc-200">
              {reviewsExpandidas ? (
                <>Ocultar opiniones <ChevronUp className="size-4" /></>
              ) : (
                <>Ver opiniones <ChevronDown className="size-4" /></>
              )}
            </div>
          </button>

          {/* El contenido de abajo solo se renderiza si el usuario expande la sección */}
          {reviewsExpandidas && (
            <div className="p-5 md:p-8 pt-0 border-t border-zinc-100 grid gap-8 lg:grid-cols-3 animate-in fade-in duration-200">
              
              {/* Columna Izquierda/Central: Filtros y Lista de Reseñas */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Barra de Herramientas de Filtros */}
                {listaReviews.length > 0 && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 p-3 rounded-md border border-zinc-200/60">
                    <span className="text-xs font-medium text-gray-600">
                      Mostrando {reviewsPaginadas.length} de {reviewsFiltradasYOrdenadas.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <label htmlFor="filtro-opiniones" className="text-xs text-gray-500 whitespace-nowrap">Ordenar por:</label>
                      <select
                        id="filtro-opiniones"
                        value={filtroOrden}
                        onChange={(e) => handleCambioFiltro(e.target.value)}
                        className="text-xs rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900 focus:border-zinc-900 focus:outline-none"
                      >
                        <option value="reciente">Más recientes</option>
                        <option value="antiguo">Más antiguos</option>
                        <option value="calificacion-desc">Calificación: Alta a Baja</option>
                        <option value="calificacion-asc">Calificación: Baja a Alta</option>
                        <option value="nombre-asc">Nombre: A - Z</option>
                        <option value="nombre-desc">Nombre: Z - A</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Lista propiamente dicha */}
                <div className="space-y-6">
                  {reviewsPaginadas.map((rev) => (
                    <div key={rev.id} className={cn(
                      "border-b border-zinc-100 pb-5 last:border-none last:pb-0 relative",
                      !rev.approved && "opacity-75 bg-zinc-50/50 p-2 rounded border border-dashed border-amber-200"
                    )}>
                      {!rev.approved && (
                        <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded">
                          En revisión de moderación
                        </span>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn("size-3.5", i < rev.rating ? "fill-current" : "text-gray-200")}
                            />
                          ))}
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-gray-900">{rev.name}</span>
                        <span className="text-[10px] md:text-xs text-gray-400 ml-auto">
                          {formatTimeAgo(rev.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}

                  {listaReviews.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-6">Nadie ha dejado una opinión aún. ¡Sé el primero!</p>
                  )}
                </div>

                {/* Controles de Paginación */}
                {totalPaginas > 1 && (
                  <div className="flex items-center justify-center gap-2 border-t border-zinc-100 pt-4 text-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                      disabled={paginaActual === 1}
                      className="h-8 px-2 text-xs hover:bg-[#B23A26] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="size-4 mr-1" /> Anterior
                    </Button>
                    
                    <span className="text-xs font-medium text-gray-700 px-2">
                      Página {paginaActual} de {totalPaginas}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                      disabled={paginaActual === totalPaginas}
                      className="h-8 px-2 text-xs hover:bg-[#B23A26] hover:text-white transition-colors"
                    >
                      Siguiente <ChevronRight className="size-4 ml-1" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Columna Derecha: Formulario */}
              <div className="bg-zinc-50 p-4 md:p-5 rounded-lg border border-zinc-200/60 h-fit">
                <h4 className="text-sm font-semibold text-black mb-1">Déjanos tu opinión</h4>
                <p className="text-xs text-gray-500 mb-4">Tu correo o perfil no son necesarios. Revisamos las opiniones manualmente.</p>

                {formSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                    <p className="text-xs md:text-sm text-green-800 font-medium">
                      ¡Gracias por tu comentario!
                    </p>
                    <p className="text-[11px] text-green-700 mt-1">
                      Tu reseña ha sido enviada con éxito y aparecerá públicamente una vez aprobada por nuestro equipo técnico.
                    </p>
                  </div>
                ) : yaComento ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-center">
                    <p className="text-xs text-blue-800 font-medium">
                      Ya enviaste una reseña para este producto
                    </p>
                    <p className="text-[11px] text-blue-700 mt-1">
                      Para evitar spam, el sistema limita una opinión por artículo desde el mismo navegador. ¡Apreciamos tu apoyo!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubirReview} className="space-y-4">
                    {formError && (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2 text-red-800 text-xs">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tu Nombre</label>
                      <input
                        type="text"
                        maxLength={40}
                        value={revName}
                        onChange={(e) => setRevName(e.target.value)}
                        placeholder="Ej: Ana M."
                        className="w-full text-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-zinc-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Calificación</label>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setRevRating(num)}
                            className="cursor-pointer text-amber-400 transition-transform active:scale-95"
                          >
                            <Star className={cn("size-5", num <= revRating ? "fill-current" : "text-gray-300")} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tu Reseña</label>
                      <textarea
                        rows={3}
                        maxLength={300}
                        value={revComment}
                        onChange={(e) => setRevComment(e.target.value)}
                        placeholder="¿Qué te pareció el diseño, la tela o los acabados a mano?..."
                        className="w-full text-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-zinc-900 focus:outline-none resize-none"
                      />
                      <span className="text-[10px] text-gray-400 block text-right mt-1">Máx. 300 caracteres</span>
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      className="w-full text-xs bg-zinc-900 text-white hover:bg-zinc-800 h-9"
                    >
                      Enviar Reseña
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}