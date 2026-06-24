// 1. Definición del Tipo de Producto (asegúrate de tenerlo igual o similar)
export type Product = {

  id: string
  name: string
  category: string
  price: number
  image: string
  shortDescription: string
  description: string
  materials: string
  madeToOrder: boolean
}

// 2. Tu catálogo unificado de productos (Faldas, Blusas, Trajes y ahora Accesorios)
export const products: Product[] = [
  // --- TUS PRODUCTOS ACTUALES (Mantén los que ya tenías aquí) ---
  {
    id: 'traje-tipico',
    name: 'Traje Típico Mujer',
    category: 'Trajes',
    price: 89000,
    image: '/images/TrajeMujer.jpeg',
    shortDescription: 'Blusa de algodón y enagua de satin',
    description:
      'El traje típico guanacasteco es el corazón de nuestra colección. Blusa blanca de algodón con cuello fruncido y enagua amplia decorada con vuelos coloridos. Cada pieza celebra la herencia campesina de la provincia de Guanacaste.',
    materials: 'Algodón 100%, Satin 100%',
    madeToOrder: true,
  },
  {
    id: 'blusa-bordada',
    name: 'Blusa Colonial',
    category: 'Blusas',
    price: 32000,
    image: '/images/BlusaMujer.jpeg',
    shortDescription: 'Blusa roja con bordado floral en el escote',
    description:
      'Blusa Roja de algodón con escote fruncido y bordado floral inspirado en la época colonial del Valle Central. Una prenda versátil que combina la tradición folklórica con el uso diario.',
    materials: 'Algodón 100%, hilo de bordado de colores',
    madeToOrder: true,
  },
  {
    id: 'rebozo',
    name: 'Rebozo Tejido a Mano',
    category: 'Textiles',
    price: 45000,
    image: '/images/rebozo.png',
    shortDescription: 'Chal artesanal en telar',
    description:
      'Rebozo tejido en telar tradicional con franjas en tonos tierra, ocre y rojo. Pieza abrigada y elegante que rinde homenaje a las técnicas textiles heredadas de generación en generación.',
    materials: 'Mezcla de algodón y lana, tejido en telar',
    madeToOrder: false,
  },
  {
    id: 'camisa-hombre',
    name: 'Traje Típico Caballero',
    category: 'Trajes',
    price: 68000,
    image: '/images/TrajeHombre.jpeg',
    shortDescription: 'Camisa, pantalon, sombrero y accesorios',
    description:
      'Conjunto folklórico para caballero: camisa blanca de algodón, pañuelo blanco al cuello y pantalón beige, acompañado de sombrero de fibra natural y un conjunto de accesorios. El traje del sabanero guanacasteco costarricense en su máxima expresión.',
    materials: 'Algodón 100%, fibra natural, pañuelo de algodón y accesorios',
    madeToOrder: true,
  },
  {
    id: 'falda-floral',
    name: 'Camisa de Caballero Colonial',
    category: 'Camisas',
    price: 30000,
    image: '/images/CamisaHombre.jpeg',
    shortDescription: 'Saco y chaleco de caballero',
    description:
      'Conjunto colonial para caballero: camisa blanca, saco blanco, moño rojo y chaleco azul. Diseñada para el baile folklórico y las celebraciones tradicionales.',
    materials: 'Algodón 100%',
    madeToOrder: true,
  },
  {
    id: 'mantel-bordado',
    name: 'Camino de Mesa Bordado',
    category: 'Textiles',
    price: 24000,
    image: '/images/mantel-bordado.png',
    shortDescription: 'Bordado floral sobre algodón natural',
    description:
      'Camino de mesa de algodón natural con bordado floral folklórico en rojo y verde. Lleva la calidez de la artesanía costarricense a tu hogar.',
    materials: 'Algodón natural, bordado a mano',
    madeToOrder: false,
  },

  // --- NUEVOS ACCESORIOS COMPLEMENTARIOS PARA EL CHECKOUT ---
  // Añadimos estos 4 elementos con los mismos IDs que busca el CheckoutView
  {
    id: 'panuelo-rojo',
    name: 'Pañuelo Folclórico Rojo Tradicional',
    price: 3000,
    image: '/images/panueloRojo.jpeg', // Coloca tus rutas de imágenes reales
    category: 'Accesorios',
    shortDescription: 'Pañuelo de algodon para trajes típicos.',
    description: 'El complemento indispensable para el traje típico costarricense. Cuadrado tradicional de color rojo intenso y bordes pulidos.',
    materials: 'Algodón ligero',
    madeToOrder: false,
  },
  {
    id: 'Sandalias-folcloricas',
    name: 'Sandalias Folclóricas',
    price: 2500,
    image: '/images/sandalias.jpeg',
    category: 'Accesorios',
    shortDescription: 'Sandalias tradicionales para bailes folclóricos.',
    description: 'Sandalias de cuero genuino con detalles artesanales, ideales para desfiles y celebraciones nacionales.',
    materials: 'Cuero de alta calidad y suela de goma',
    madeToOrder: false,
  },
  {
    id: 'aretes-tipicos',
    name: 'Aretes Típicos',
    price: 4500,
    image: '/images/aretes.jpeg',
    category: 'Accesorios',
    shortDescription: 'Aretes clásicos para baile folclórico.',
    description: 'Aretes livianos que realzan la elegancia de la blusa campesina.',
    materials: 'Fantasía fina y cuentas textiles',
    madeToOrder: false,
  },
  {
    id: 'abanico-madera',
    name: 'Abanico de Madera',
    price: 6000,
    image: '/images/abanico.jpeg',
    category: 'Accesorios',
    shortDescription: 'Abanico artesanal.',
    description: 'Abanico funcional de madera tallada.',
    materials: 'Madera de pino tratada',
    madeToOrder: false,
  },
];

// 3. Centralización de Ofertas Especiales de Temporada
// Aquí decides qué ID del catálogo goza de un descuento y cuánto costará
export const CONFIG_OFERTAS = [
  { id: 'traje-tipico', precioOferta: 75000 },
  { id: 'blusa-bordada', precioOferta: 26000 },
  { id: 'camisa-hombre', precioOferta: 58000 },

  // Tip pro: Si en algún momento quieres poner un accesorio en oferta, 
  // solo vienes aquí y lo agregas así:
  // { id: 'panuelo-rojo', precioOferta: 2000 }
];

// 4. Utilidad para formatear la moneda nacional costarricense (Colones)
export function formatColones(value: number): string {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
  }).format(value);
}

export function getProduct(id: string) {

  return products.find((p) => p.id === id)

}