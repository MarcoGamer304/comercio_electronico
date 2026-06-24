export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

// Lista negra básica para filtrar contenido inapropiado en Costa Rica
const PALABRAS_PROHIBIDAS = ["parió", "mierda", "puta", "picha", "malparido", "carepicha", "cerote"];

export function contieneContenidoInapropiado(texto: string): boolean {
  const textoMinuscula = texto.toLowerCase();
  return PALABRAS_PROHIBIDAS.some((palabra) => textoMinuscula.includes(palabra));
}

// Reseñas quemadas de respaldo por si un producto no tiene aún dinámicas
export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "all", // Muestra general o fallback
    name: "Mariela M.",
    rating: 5,
    comment: "¡Absolutamente hermoso! Los acabados a mano son de una calidad excepcional. Pedí la talla a medida y me entalló a la perfección. Súper recomendadas.",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // Hace 2 semanas
    approved: true
  },
  {
    id: "rev-2",
    productId: "all",
    name: "Carlos S.",
    rating: 5,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  }
];