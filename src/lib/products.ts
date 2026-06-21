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

export const products: Product[] = [
  {
    id: 'traje-tipico',
    name: 'Traje Típico Guanacasteco',
    category: 'Trajes',
    price: 89000,
    image: '/images/traje-tipico.png',
    shortDescription: 'Blusa de algodón y falda floral con enaguas',
    description:
      'El traje típico guanacasteco es el corazón de nuestra colección. Blusa blanca de algodón con cuello fruncido y falda amplia decorada con cintas y motivos florales bordados a mano. Cada pieza celebra la herencia campesina de la provincia de Guanacaste.',
    materials: 'Algodón 100%, cintas de satén, bordado a mano',
    madeToOrder: true,
  },
  {
    id: 'blusa-bordada',
    name: 'Blusa Bordada Campesina',
    category: 'Blusas',
    price: 32000,
    image: '/images/blusa-bordada.png',
    shortDescription: 'Bordado floral en el escote',
    description:
      'Blusa blanca de algodón con escote fruncido y bordado floral multicolor inspirado en los jardines del Valle Central. Una prenda versátil que combina la tradición folklórica con el uso diario.',
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
    name: 'Atuendo Típico Caballero',
    category: 'Trajes',
    price: 68000,
    image: '/images/camisa-hombre.png',
    shortDescription: 'Camisa, pañuelo y sombrero',
    description:
      'Conjunto folklórico para caballero: camisa blanca de algodón, pañuelo rojo al cuello y pantalón oscuro, acompañado de sombrero de fibra natural. El traje del sabanero costarricense en su máxima expresión.',
    materials: 'Algodón 100%, fibra natural, pañuelo de algodón',
    madeToOrder: true,
  },
  {
    id: 'falda-floral',
    name: 'Falda Folklórica Floral',
    category: 'Faldas',
    price: 48000,
    image: '/images/falda-floral.png',
    shortDescription: 'Vuelo amplio con cintas de colores',
    description:
      'Falda circular de vuelo amplio decorada con cintas y aplicaciones florales en rojo, amarillo y verde. Diseñada para el baile folklórico y las celebraciones tradicionales.',
    materials: 'Algodón y satén, cintas de colores',
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
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function formatColones(value: number) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(value)
}
