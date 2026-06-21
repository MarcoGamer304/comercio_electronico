import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className=" bg-[#EFEBE2]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 flex flex-col items-center">
            <p className="font-heading text-3xl subtitle pb-3">MAJUSKE</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Textiles y prendas folklóricas de Costa Rica, hechas a mano y a tu
              medida.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground text-black">
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
            <p className="text-xs uppercase tracking-widest text-muted-foreground text-black">
              Contacto
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Grecia, Costa Rica</li>
              <li>majuske@gmail.com</li>
              <li>+506 2222 0000</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-400 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} MAJUSKE. Hecho con cariño en Costa Rica.</p>
          <p>Pura vida.</p>
        </div>
      </div>
    </footer>
  )
}
