import Link from "next/link";

// These are paraphrased, general insights from conversations with business
// owners about the VALUE of social media itself — not testimonials about
// Localli, which has no track record yet. Keep it that way: nothing here
// should imply anyone used Localli specifically.
const INSIGHTS = [
  { bold: "Más reservas", rest: " de las que conseguían antes, solo por estar activos en redes." },
  { bold: "Clientes nuevos", rest: " que no habrían encontrado el sitio de otra forma." },
  { bold: "Más autoridad", rest: " — la gente confía más en un negocio que ve vivo y activo." },
  { bold: "Ganas de probar cosas nuevas", rest: " en la carta, porque por fin veían qué funcionaba y qué no." },
  { bold: "Hasta caras conocidas", rest: " de la zona, que se pasaron atraídos por lo que veían." },
];

const REASONS = [
  {
    title: "Te descubre gente que no te conocía",
    body: "Un vídeo que funciona llega a mucha más gente de la que entra por tu puerta cada día — el algoritmo hace ese trabajo por ti.",
  },
  {
    title: "La gente confía en lo que ve",
    body: "Ver un plato real, en un sitio real, pesa más que cualquier anuncio. Es prueba social, no publicidad.",
  },
  {
    title: "Cuesta una fracción de una agencia",
    body: "No necesitas un equipo de marketing para publicar bien — necesitas saber qué grabar y cuándo.",
  },
];

export default function ProofPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="h-1.5 bg-accent" />

      <div className="flex items-center px-6 sm:px-14 py-6">
        <div className="font-display text-xl font-bold">
          Localli<span className="text-accent">.</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 sm:px-14 pb-20">
        <div className="max-w-2xl w-full flex flex-col gap-16">
          <section className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wider text-accent">
              LO QUE NOS HAN CONTADO
            </span>
            <p className="text-[15px] leading-relaxed text-muted mt-3 mb-2">
              Antes de construir Localli, hablamos con dueños de bares y restaurantes sobre lo
              que las redes sociales les habían cambiado de verdad. Esto es lo que se repite una
              y otra vez:
            </p>
            <div className="flex flex-col mt-2">
              {INSIGHTS.map((line, i) => (
                <p
                  key={i}
                  className={`font-display text-lg sm:text-xl leading-snug m-0 py-4 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <span className="font-bold text-foreground">{line.bold}</span>
                  <span className="text-muted">{line.rest}</span>
                </p>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-wider text-accent">POR QUÉ FUNCIONA</span>
            <div className="flex flex-col gap-8 mt-4">
              {REASONS.map((reason, i) => (
                <div key={i} className="flex items-start gap-5">
                  <span className="font-display text-3xl font-bold text-accent w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="font-bold text-[15px]">{reason.title}</span>
                    <span className="text-[15px] leading-relaxed text-muted">{reason.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <blockquote className="pl-5 border-l-4 border-accent flex flex-col gap-4">
              <p className="font-display italic text-lg leading-relaxed m-0">
                El problema nunca ha sido si las redes funcionan. El problema es que no tienes
                tiempo para aprender edición, ni presupuesto para una agencia — y sin ideas
                claras, es fácil dejarlo para «la semana que viene».
              </p>
              <p className="text-[15px] leading-relaxed text-muted m-0">
                Localli existe para quitarte esa barrera: cada semana, exactamente qué grabar,
                editar y publicar.
              </p>
            </blockquote>
          </section>

          <Link
            href="/onboarding/basics"
            className="self-center rounded-[10px] bg-primary text-white px-8 py-3.5 font-bold"
          >
            Continuar
          </Link>
        </div>
      </div>
    </main>
  );
}
