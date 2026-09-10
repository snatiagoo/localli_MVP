import { requireActiveSubscription } from "@/lib/dal";
import { getOrGenerateWeeklySuggestions } from "@/lib/suggestions/orchestrator";
import { SettingsForm } from "./settings-form";
import { SuggestionCard } from "./suggestion-card";

const GREETINGS = [
  (name: string) => `¡Hola, ${name}! Aquí tienes tus ideas para esta semana.`,
  (name: string) => `Buenas, ${name}. Esto es lo que sugerimos para tu negocio esta semana.`,
  (name: string) => `¡Vamos con la semana, ${name}! Aquí tienes tus ideas, justo abajo.`,
  (name: string) => `${name}, esto es lo que grabamos esta semana.`,
  (name: string) => `Hola de nuevo, ${name}. Tus sugerencias ya están listas más abajo.`,
  (name: string) => `¡Otra semana, otras ideas! Échales un vistazo, ${name}.`,
  (name: string) => `${name}, aquí abajo tienes el contenido de esta semana.`,
  (name: string) => `Buenas, ${name}. Vamos a por otra semana de contenido.`,
  (name: string) => `Hola, ${name}. Tus ideas de esta semana te esperan más abajo.`,
  (name: string) => `¡Ya está lista tu semana, ${name}!`,
];

export default async function DashboardPage() {
  const business = await requireActiveSubscription();

  const suggestionRows = await getOrGenerateWeeklySuggestions(business);

  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)](
    business.name ?? "negocio",
  );

  return (
    <main className="flex flex-col items-center gap-12 p-10 w-[80%] mx-auto">
      <div className="w-full rounded-2xl bg-primary border-l-8 border-accent px-10 py-14 mt-4">
        <div className="flex flex-col gap-2 max-w-lg">
          <h1 className="font-display text-3xl font-bold text-white m-0">{greeting}</h1>
          <p className="m-0 text-white/70 text-sm">
            Tus sugerencias de esta semana están justo debajo.
          </p>
        </div>
      </div>

      <div id="sugerencias" className="flex flex-col items-center gap-5 w-full scroll-mt-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="font-display text-[28px] font-bold m-0">Sugerencias de esta semana</h2>
          <p className="m-0 text-[15px] text-muted">
            {business.name ?? "Tu negocio"} &mdash; {suggestionRows.length} ideas listas para grabar
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-full">
          {suggestionRows.map((row) => (
            <div key={row.id} className="flex-1 min-w-80 max-w-105">
              <SuggestionCard row={row} total={suggestionRows.length} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-border w-full max-w-lg" />

      <div id="ajustes" className="max-w-lg w-full scroll-mt-8">
        <SettingsForm
          defaultValues={{
            targetAudience: business.targetAudience,
            brandTone: business.brandTone,
            contentComfortLevel: business.contentComfortLevel,
            postingFrequency: business.postingFrequency,
          }}
        />
      </div>
    </main>
  );
}
