import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className=" bg-pink-950">
      <div className="mx-auto max-w-6xl px-5 py-14 text-white">
        <div className="gap-10 grid md:flex md:justify-between md:items-center">

          <div className="md:col-span-2 flex flex-col items-center">
            <p className="font-heading text-3xl subtitle pb-3 text-black">MAJUSKE</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Textiles y prendas folklóricas de Costa Rica, hechas a tu
              medida.
            </p>
          </div>

          <div>
            <p className="text-xm uppercase tracking-widest text-muted-foreground text-black">
              Tienda
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/#galeria" className="hover:text-primary">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/#pedidos" className="hover:text-primary">
                  Pedidos a medida
                </Link>
              </li>
              <li>
                <Link to="/#historia" className="hover:text-primary">
                  Nuestra historia
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xm uppercase tracking-widest text-muted-foreground text-black">
              Contacto
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Grecia, Costa Rica</li>
              <li>majuske@gmail.com</li>
              <li>+506 83313787</li>
            </ul>
          </div>

          <div>
            <p className="text-xm uppercase tracking-widest text-muted-foreground text-black">
              Redes Sociales
            </p>
            <div>
              
              {/* 2. Iconos de Redes Sociales Funcionales (Alineados a la izquierda por defecto, cambia 'justify-start' a 'justify-center' si va en el Footer centrado) */}
              <div className="flex justify-center gap-5 mt-6">
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com" // Reemplaza con tu usuario real
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-black"
                  aria-label="Ir a TikTok"
                >
                  <Icon icon="ic:baseline-tiktok" className="text-2xl cursor-pointer" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=100057448330251" // Reemplaza con tu página real
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-blue-600"
                  aria-label="Ir a Facebook"
                >
                  <Icon icon="mdi:facebook" className="text-2xl cursor-pointer" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com" // Reemplaza con tu perfil real
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-pink-600"
                  aria-label="Ir a Instagram"
                >
                  <Icon icon="mdi:instagram" className="text-2xl cursor-pointer" />
                </a>

                {/* WhatsApp directo con mensaje predeterminado */}
                <a
                  href="https://wa.me/50683313787?text=Hola!%20Me%20interesa%20obtener%20más%20información%20sobre%20las%20prendas%20de%20Majuske."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 hover:text-green-600"
                  aria-label="Escribir por WhatsApp"
                >
                  <Icon icon="mdi:whatsapp" className="text-2xl cursor-pointer" />
                </a>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-700 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} MAJUSKE. Hecho con cariño en Costa Rica.</p>
        </div>
      </div>
    </footer>
  )
}
