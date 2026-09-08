
import { requireActiveSubscription } from "@/lib/dal";
import { getOrGenerateWeeklySuggestions } from "@/lib/suggestions/orchestrator";
import { SettingsForm } from "./settings-form";
// Placeholder — this is a manual/temporary check that the format-selection
// algorithm runs against real DB data. The real suggestion cards (shot
// list, editing notes, caption via Claude) get built in a later step.
export default async function DashboardPage() {
  const business = await requireActiveSubscription();

  const suggestionRows = await getOrGenerateWeeklySuggestions(business);

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-8">
      <div>
        <p>Bienvenido, {business.name ?? "negocio"}. Aquí irán tus sugerencias semanales.</p>
        <ul className="mt-4 list-disc pl-5">
          {suggestionRows.map((row) => (
            <li key={row.id}>
              #{row.position} ({row.mediaType}, {row.status}): {row.caption}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-lg">
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

