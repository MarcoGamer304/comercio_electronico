export function StorySection() {
  return (
    <section id="historia" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-muted">
          <img
            src="/images/taller1.jpeg"
            alt="Manos de artesana bordando motivos florales folklóricos sobre tela de algodón"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-8 items-center text-gray-700">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Nuestra historia
          </p>
          <p className="text-balance font-heading text-4xl tracking-tight md:text-5xl text-black">
            Hilos que cuentan nuestra tierra
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Majuske nace del deseo de preservar la riqueza folklórica
            costarricense. Trabajamos de la mano con costureras el Valle Central, 
            manteniendo vivas técnicas de costura que
            se transmiten de generación en generación.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada prenda es una pieza viva de nuestra cultura: lleva el tiempo,
            las manos y el cariño de quien la confecciona.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            <div>
              <dt className="font-heading text-3xl">+10</dt>
              <dd className="text-xs text-muted-foreground">Costureras aliadas</dd>
            </div>
            <div>
              <dt className="font-heading text-3xl">100%</dt>
              <dd className="text-xs text-muted-foreground">Hecho a tu medida</dd>
            </div>
            <div>
              <dt className="font-heading text-3xl">7</dt>
              <dd className="text-xs text-muted-foreground">Provincias</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
