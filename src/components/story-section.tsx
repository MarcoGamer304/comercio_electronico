export function StorySection() {
  return (
    <section id="historia" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          <img
            src="/images/taller.png"
            alt="Manos de artesana bordando motivos florales folklóricos sobre tela de algodón"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Nuestra historia
          </p>
          <h2 className="text-balance font-heading text-4xl tracking-tight md:text-5xl">
            Hilos que cuentan nuestra tierra
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Telar nace del deseo de preservar la riqueza del vestido folklórico
            costarricense. Trabajamos de la mano con artesanas de Guanacaste y
            el Valle Central, manteniendo vivas técnicas de bordado y telar que
            se transmiten de generación en generación.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada prenda es una pieza viva de nuestra cultura: lleva el tiempo,
            las manos y el cariño de quien la confecciona.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            <div>
              <dt className="font-heading text-3xl">+25</dt>
              <dd className="text-xs text-muted-foreground">Artesanas aliadas</dd>
            </div>
            <div>
              <dt className="font-heading text-3xl">100%</dt>
              <dd className="text-xs text-muted-foreground">Hecho a mano</dd>
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
