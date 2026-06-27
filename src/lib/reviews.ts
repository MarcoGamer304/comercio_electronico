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
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-3",
    productId: "all",
    name: "Eduardo S.",
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-4",
    productId: "all",
    name: "Juan S.",
    rating: 5,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-5",
    productId: "all",
    name: "Marco S.",
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-6",
    productId: "all", // Muestra general o fallback
    name: "Kevin M.",
    rating: 5,
    comment: "¡Absolutamente hermoso! Los acabados a mano son de una calidad excepcional. Pedí la talla a medida y me entalló a la perfección. Súper recomendadas.",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // Hace 2 semanas
    approved: true
  },
  {
    id: "rev-7",
    productId: "all",
    name: "Cesar S.",
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-8",
    productId: "all",
    name: "Ethan S.",
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-9",
    productId: "all",
    name: "Judas S.",
    rating: 5,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-10",
    productId: "all",
    name: "Oscar S.",
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-11",
    productId: "all", // Muestra general o fallback
    name: "Maria M.",
    rating: 5,
    comment: "¡Absolutamente hermoso! Los acabados a mano son de una calidad excepcional. Pedí la talla a medida y me entalló a la perfección. Súper recomendadas.",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // Hace 2 semanas
    approved: true
  },
  {
    id: "rev-12",
    productId: "all",
    name: "Penelope S.",
    rating: 4,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-13",
    productId: "all",
    name: "Sandra S.",
    rating: 5,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-14",
    productId: "all",
    name: "José S.",
    rating: 5,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  },
  {
    id: "rev-15",
    productId: "all",
    name: "Maciel S.",
    rating: 5,
    comment: "Compré el traje para mi hija y los detalles de los colores son sumamente vivos. Muy buena atención con el tema de la entrega en San José.",
    createdAt: new Date(Date.now() - 330 * 24 * 60 * 60 * 1000).toISOString(), // Hace 1 mes
    approved: true
  }
];