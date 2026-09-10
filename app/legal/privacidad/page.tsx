// Real first draft — NOT legal advice, get a lawyer/gestor to review before
// going live with real payments.
export default function PrivacidadPage() {
  return (
    <main className="flex-1 py-16 px-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="font-display text-3xl font-bold m-0">Política de privacidad</h1>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">1. Responsable del tratamiento</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Santiago González Vallejo, contacto: locallicont@gmail.com, es responsable de los datos
            personales que se recogen a través de Localli.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">2. Qué datos recogemos</h2>
          <ul className="m-0 pl-5 flex flex-col gap-1.5 list-disc text-[15px] leading-relaxed text-muted">
            <li>Datos de cuenta: tu email, gestionado a través de Clerk (nuestro proveedor de autenticación).</li>
            <li>Datos de tu negocio: nombre, tipo de cocina, platos y especiales, redes sociales, dirección y teléfono (estos dos últimos, opcionales).</li>
            <li>Preferencias de contenido: público objetivo, tono de marca, nivel de comodidad con el contenido y frecuencia de publicación.</li>
            <li>Datos de pago: gestionados directamente por Stripe. Localli nunca almacena los datos de tu tarjeta.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">3. Para qué usamos tus datos</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Usamos los datos de tu negocio para generar tus sugerencias de contenido semanales y
            para gestionar tu suscripción. La base legal es la ejecución del contrato de
            suscripción que aceptas al registrarte.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">4. Con quién compartimos tus datos</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            No vendemos tus datos. Los compartimos únicamente con los proveedores que hacen
            posible el servicio, cada uno actuando como encargado del tratamiento:
          </p>
          <ul className="m-0 pl-5 flex flex-col gap-1.5 list-disc text-[15px] leading-relaxed text-muted">
            <li><strong>Clerk</strong> — gestión de cuentas y acceso.</li>
            <li><strong>Neon / Vercel</strong> — alojamiento de la base de datos y de la aplicación.</li>
            <li><strong>Stripe</strong> — procesamiento de pagos y suscripciones.</li>
            <li><strong>Anthropic (Claude)</strong> — genera el texto de tus sugerencias a partir de los datos de tu negocio (nombre, cocina, platos, especiales).</li>
          </ul>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Algunos de estos proveedores pueden procesar datos fuera de la Unión Europea, en cuyo
            caso lo hacen bajo garantías reconocidas por el RGPD (como las cláusulas
            contractuales tipo).
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">5. Cuánto tiempo conservamos tus datos</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Conservamos tus datos mientras tu cuenta esté activa. Si cancelas tu suscripción y
            eliminas tu cuenta, tus datos se eliminan de nuestra base de datos.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-lg font-bold m-0">6. Tus derechos</h2>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Puedes acceder, rectificar, eliminar tus datos, oponerte a su tratamiento o
            solicitar su portabilidad escribiendo a locallicont@gmail.com. También puedes editar
            la mayoría de tus datos de negocio directamente desde tu perfil en Localli.
          </p>
        </section>
      </div>
    </main>
  );
}
