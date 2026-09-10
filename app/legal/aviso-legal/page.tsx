// Real first draft — NOT legal advice, get a lawyer/gestor to review before
// going live with real payments. NIF/DNI is intentionally omitted since the
// site is currently pre-autónomo-registration (per the user's gestor).
export default function AvisoLegalPage() {
  return (
    <main className="flex-1 py-16 px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="font-display text-3xl font-bold m-0">Aviso legal</h1>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">1. Titular del sitio</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Este sitio web (en adelante, &laquo;Localli&raquo;) es operado por Santiago González Vallejo,
            actualmente en fase de lanzamiento previo al alta como autónomo, con domicilio en
            España y correo electrónico de contacto locallicont@gmail.com.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">2. Objeto</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Localli es un servicio de suscripción que genera semanalmente sugerencias de
            contenido para redes sociales (plano, montaje y descripción) dirigido a bares y
            restaurantes.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">3. Condiciones de acceso y uso</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            El acceso a las funciones de Localli requiere crear una cuenta y contar con una
            suscripción activa. El usuario se compromete a facilitar información veraz sobre su
            negocio y a hacer un uso adecuado del servicio.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">4. Propiedad intelectual</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            El nombre &laquo;Localli&raquo;, su diseño y su código son propiedad del titular del
            sitio. Las sugerencias de contenido generadas para cada negocio pueden usarse
            libremente por ese negocio en sus propias redes sociales.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">5. Exclusión de responsabilidad</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Localli ofrece sugerencias de contenido a modo orientativo. No garantizamos
            resultados concretos (reservas, ventas o seguidores) derivados de su uso.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">6. Legislación aplicable</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Este aviso legal se rige por la legislación española. Para cualquier controversia,
            las partes se someten a los juzgados y tribunales que correspondan según la ley.
          </p>
        </section>
      </div>
    </main>
  );
}
