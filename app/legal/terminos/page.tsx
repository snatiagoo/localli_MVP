// Real first draft — NOT legal advice, get a lawyer/gestor to review before
// going live with real payments.
export default function TerminosPage() {
  return (
    <main className="flex-1 py-16 px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="font-display text-3xl font-bold m-0">Términos y condiciones</h1>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">1. Qué es Localli</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Localli es un servicio de suscripción mensual que envía cada semana ideas de
            contenido para redes sociales (plano, montaje y descripción) pensadas para bares y
            restaurantes.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">2. Tu cuenta</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Para usar Localli necesitas crear una cuenta y completar la información de tu
            negocio. Eres responsable de que esa información sea correcta y de mantener segura
            el acceso a tu cuenta.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">3. Precio y facturación</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Localli funciona mediante una suscripción mensual, gestionada y cobrada a través de
            Stripe. Puedes cancelar tu suscripción cuando quieras desde tu cuenta; no hay
            permanencia mínima. Al cancelar, mantienes el acceso hasta el final del periodo ya
            pagado.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">4. Uso del servicio</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Las sugerencias de contenido que recibes son para el uso de tu propio negocio. No
            está permitido revender el acceso a Localli ni usar el servicio para generar
            contenido no relacionado con hostelería.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">5. Sin garantía de resultados</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Localli te da ideas concretas de qué grabar y publicar, pero no puede garantizar
            resultados de negocio (más reservas, ventas o seguidores): estos dependen también de
            factores fuera de nuestro control, como la ejecución, tu zona o la competencia.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">6. Cambios en el servicio</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Podemos mejorar o modificar Localli con el tiempo. Si cambiamos el precio para
            suscripciones nuevas, tu precio de entrada se mantiene mientras tu suscripción siga
            activa sin interrupción.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">7. Contacto</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Para cualquier duda sobre estos términos, escríbenos a locallicont@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
