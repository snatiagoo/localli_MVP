import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const PROBLEMS = [
  { bold: "Es domingo por la noche", rest: " y no tienes ni idea de qué publicar el lunes." },
  { bold: "Grabas un vídeo", rest: " lo miras, no te convence y lo borras." },
  { bold: "Pediste presupuesto a una agencia", rest: " y te pareció el sueldo de media persona." },
];

const STEPS = [
  {
    title: "Nos dices a qué te dedicas",
    body: "«Bar de menú del día en Vallecas.» Con eso ya tenemos suficiente para empezar.",
  },
  {
    title: "El lunes tienes el plan de la semana",
    body: "Tres vídeos, con el guion de plano, duración y edición para el móvil.",
  },
  {
    title: "Grabas, copias el texto y publicas",
    body: "Diez minutos entre servicio y servicio. La descripción y los hashtags ya escritos.",
  },
];

const FEATURES = [
  {
    title: "Ideas pensadas para restaurantes",
    body: "El plato del día, la mesa llena, el cocinero trabajando. Formatos que funcionan en bares y restaurantes, no en cualquier negocio.",
  },
  {
    title: "El montaje explicado como a un amigo",
    body: "«Corta cuando el plato toca la mesa. Pon el texto arriba, tapa el botón de seguir abajo.»",
  },
  {
    title: "La descripción ya escrita",
    body: "Con gancho, llamada a reservar y los hashtags que usa la gente de tu zona. Copias y pegas.",
  },
  {
    title: "Un calendario que no se te olvida",
    body: "Te recordamos San Valentín con tres semanas de antelación, no el día 13 por la noche.",
  },
];

const RESTAURANT_TYPES = [
  "Bar de tapas",
  "Restaurante de menú del día",
  "Cafetería",
  "Asador o parrilla",
  "Cocina tradicional",
  "Restaurante de barrio",
  "Bar de vinos",
  "Tapería",
];

const BENEFITS = [
  "El precio de entrada es el que mantienes para siempre.",
  "Plan semanal hecho para restaurantes, no para «cualquier negocio».",
  "Te llamamos y montamos el primer vídeo contigo.",
];

// Every section shares this centered column — content stays left-aligned
// inside it, but the column itself sits centered on the page instead of
// hugging the left edge on wide screens.
const CONTAINER = "max-w-5xl mx-auto px-6 sm:px-14";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="h-1.5 bg-accent" />

      {/* Nav — deliberately full-width (not the centered CONTAINER below):
          logo sits at the true left edge, buttons at the true right edge. */}
      <div className="flex items-center justify-between px-6 sm:px-14 py-6">
        <div className="font-display text-xl font-bold">
          Localli<span className="text-accent">.</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="onLight" />
          <Link href="/sign-in" className="text-sm font-semibold text-muted hover:text-foreground hidden sm:inline">
            Iniciar sesión
          </Link>
          <Link
            href="/sign-up"
            className="rounded-[10px] bg-primary text-white px-5 py-2.5 text-sm font-bold"
          >
            Crear cuenta
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className={`${CONTAINER} pt-10 pb-20`}>
        <div className="max-w-3xl">
          <span className="text-xs font-bold tracking-wider text-accent">
            PARA BARES Y RESTAURANTES QUE QUIEREN LLENAR MÁS MESAS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mt-4 mb-6">
            Cada lunes te decimos exactamente qué grabar esta semana.
          </h1>
          <p className="text-base leading-relaxed text-muted max-w-xl mb-8">
            Tres ideas de vídeo pensadas para tu restaurante, con los planos, el montaje y la
            descripción ya escritos. Tú pones el móvil y diez minutos.
          </p>
          <Link
            href="/sign-up"
            className="inline-block rounded-[10px] bg-primary text-white px-7 py-3.5 font-bold"
          >
            Crear cuenta
          </Link>
          <p className="text-xs text-muted mt-4">
            Solo aceptamos 50 restaurantes en esta primera fase. Sin permanencia.
          </p>
        </div>
      </section>

      {/* Seamos sinceros */}
      <section className="border-t border-border bg-surface">
        <div className={`${CONTAINER} py-16 max-w-3xl`}>
          <span className="text-xs font-bold tracking-wider text-accent">SEAMOS SINCEROS</span>
          <div className="flex flex-col mt-6 mb-8">
            {PROBLEMS.map((line, i) => (
              <p
                key={i}
                className={`font-display text-lg sm:text-xl leading-snug m-0 py-5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="font-bold text-foreground">{line.bold}</span>
                <span className="text-muted">{line.rest}</span>
              </p>
            ))}
          </div>
          <p className="text-base leading-relaxed text-muted max-w-xl">
            No es que no sepas vender lo tuyo. Es que nadie te ha dicho todavía qué grabar el
            martes a las once con tres mesas ocupadas.
          </p>
        </div>
      </section>

      {/* Tres pasos */}
      <section className="border-t border-border">
        <div className={`${CONTAINER} py-16`}>
          <h2 className="font-display text-2xl sm:text-[28px] font-bold mb-10 max-w-xl">
            Tres pasos, y el tercero lo haces tú en el móvil
          </h2>
          <div className="flex flex-col gap-8 max-w-2xl">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-5">
                <span className="font-display text-3xl font-bold text-accent w-12 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-bold text-[15px]">{step.title}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{step.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué llega a tu correo */}
      <section className="border-t border-border bg-surface">
        <div className={`${CONTAINER} py-16`}>
          <h2 className="font-display text-2xl sm:text-[28px] font-bold mb-10 max-w-xl">
            Qué llega a tu correo cada lunes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="font-bold text-[15px]">{feature.title}</span>
                <span className="text-[15px] leading-relaxed text-muted">{feature.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Un lunes cualquiera — mockup. Its own subtly-tinted "room" (bg-background,
          a touch darker than the page's bg-surface elsewhere) so the white card
          reads as sitting inside it, text left / card right like the reference. */}
      <section className="border-t border-border bg-background">
        <div className={`${CONTAINER} py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}>
          <div>
            <span className="text-xs font-bold tracking-wider text-accent">UN LUNES CUALQUIERA</span>
            <h2 className="font-display text-2xl sm:text-[28px] font-bold mt-4 mb-3 max-w-xl">
              Esto es literalmente lo que recibe un bar de menú
            </h2>
            <p className="text-[15px] leading-relaxed text-muted max-w-xl">
              Nada de plantillas vacías ni «contenido de valor». Planos concretos, duración
              concreta, texto ya escrito.
            </p>
          </div>

          <div className="max-w-md w-full md:justify-self-end rounded-2xl overflow-hidden bg-surface shadow-[0_8px_24px_oklch(0.34_0.11_258/0.12)]">
            <div className="flex items-start justify-between gap-2 bg-primary px-5 py-4">
              <span className="font-display text-base font-bold text-white">Video 1 de 3</span>
              <span className="text-xs font-medium text-white/70 whitespace-nowrap pt-0.5">
                Semana del 3 · 20 s
              </span>
            </div>
            <div className="flex flex-col">
              {/* border-t sits directly on each full-width block (not on an
                  inset inner wrapper), so the divider runs edge-to-edge
                  across the card, matching the reference layout. */}
              <div className="flex flex-col gap-2 px-6 py-5">
                <span className="text-[11px] font-bold tracking-wider text-accent">PLANOS</span>
                <div className="flex flex-col gap-1.5">
                  <p className="m-0 text-[13.5px] leading-relaxed">
                    <span className="font-display font-bold">1.</span> Sartén con fuego alto, 3 segundos.
                  </p>
                  <p className="m-0 text-[13.5px] leading-relaxed">
                    <span className="font-display font-bold">2.</span> Emplatado desde arriba, junto a la ventana.
                  </p>
                  <p className="m-0 text-[13.5px] leading-relaxed">
                    <span className="font-display font-bold">3.</span> Mano cogiendo el primer bocado.
                  </p>
                </div>
              </div>

              <div className="border-t border-border flex flex-col gap-2 px-6 py-5">
                <span className="text-[11px] font-bold tracking-wider text-accent">MONTAJE</span>
                <p className="m-0 text-[13.5px] leading-relaxed">
                  Tres cortes limpios. Música alegre de fondo, bajita. Texto arriba en el
                  segundo 1: «El plato que se agota todos los días.»
                </p>
              </div>

              <div className="border-t border-border flex flex-col gap-2 px-6 py-5">
                <span className="text-[11px] font-bold tracking-wider text-accent">DESCRIPCIÓN</span>
                <div className="bg-background rounded-[10px] px-4 py-3.5">
                  <p className="m-0 text-[13.5px] leading-relaxed">
                    Lo hacemos a diario y a las 14:30 ya vuela 🍝 ¿Te guardamos mesa?
                    <br />
                    #menudeldia #vallecas #comidacasera
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="border-t border-border bg-surface">
        <div className={`${CONTAINER} py-16 max-w-2xl`}>
          <blockquote className="pl-5 border-l-4 border-accent flex flex-col gap-4">
            <p className="font-display italic text-lg leading-relaxed m-0">
              Cada semana miramos qué vídeos han funcionado de verdad en negocios como el tuyo, y
              reescribimos las recomendaciones a mano.
            </p>
            <p className="text-[15px] leading-relaxed text-muted m-0">
              Hay una máquina montando tu plan, sí. Pero detrás hay personas decidiendo qué
              merece la pena recomendar y qué es ruido. Por eso el plan del mes que viene será
              mejor que el de este.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Hecho para restaurantes como */}
      <section className="border-t border-border">
        <div className={`${CONTAINER} py-16`}>
          <h2 className="font-display text-2xl sm:text-[28px] font-bold mb-8 max-w-xl">
            Hecho para restaurantes como
          </h2>
          <div className="flex flex-wrap gap-3 max-w-2xl mb-10">
            {RESTAURANT_TYPES.map((type) => (
              <span
                key={type}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold"
              >
                {type}
              </span>
            ))}
          </div>
          <div className="max-w-xl border-l-4 border-border pl-5">
            <p className="text-[15px] leading-relaxed text-muted m-0">
              Si vendes online a nivel nacional, eres una marca grande con equipo de marketing o
              no tienes nada que ver con hostelería, Localli no es para ti. Y te lo decimos
              ahora, no después de cobrarte.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-linear-to-br from-primary to-footer">
        <div className={`${CONTAINER} py-20`}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 max-w-xl">
            Solo 50 restaurantes en esta primera fase. ¿Va el tuyo?
          </h2>
          <p className="text-base leading-relaxed text-white/70 max-w-lg mb-8">
            Crea tu cuenta ahora y en unos minutos tienes tu plan de la semana listo para grabar.
          </p>
          <div className="flex flex-col gap-3 max-w-md mb-9">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-display text-lg font-bold text-accent w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed text-white/90">{benefit}</span>
              </div>
            ))}
          </div>
          <Link
            href="/sign-up"
            className="inline-block rounded-[10px] bg-accent text-white px-7 py-3.5 font-bold"
          >
            Crear cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}
