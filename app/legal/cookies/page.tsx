// Real first draft — NOT legal advice. Localli has no analytics/marketing
// cookies as of this writing (verified against the codebase), so this stays
// short: only technical/necessary cookies, which don't require a consent
// banner under Spanish law (LSSI-CE), just disclosure.
export default function CookiesPage() {
  return (
    <main className="flex-1 py-16 px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="font-display text-3xl font-bold m-0">Política de cookies</h1>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">1. Qué son las cookies</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Las cookies son pequeños archivos que se guardan en tu navegador para recordar
            información entre visitas, como mantener tu sesión iniciada.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">2. Qué cookies usamos</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Localli solo usa cookies técnicas, necesarias para que el servicio funcione:
          </p>
          <ul className="m-0 pl-5 flex flex-col gap-1.5 list-disc text-[15px] leading-relaxed text-muted">
            <li>
              <strong>Cookie de sesión (Clerk)</strong> — mantiene tu sesión iniciada mientras
              usas el panel de Localli.
            </li>
            <li>
              <strong>Cookies de Stripe</strong> — solo durante el proceso de pago, en la página
              de pago alojada por Stripe, para procesar tu suscripción de forma segura.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">3. Lo que no hacemos</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            No usamos cookies de analítica, publicidad ni seguimiento de terceros. La preferencia
            de tema claro/oscuro se guarda en tu navegador (localStorage), no mediante cookies.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">4. Cómo gestionar las cookies</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Puedes eliminar o bloquear las cookies desde la configuración de tu navegador, aunque
            si bloqueas la cookie de sesión no podrás mantener la sesión iniciada en Localli.
          </p>
        </section>
      </div>
    </main>
  );
}
