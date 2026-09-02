
import { requireOnboardedBusiness } from "@/lib/dal";
import { generateWeeklyFormats } from "@/lib/suggestions/weekly-generation";

// Placeholder — this is a manual/temporary check that the format-selection
// algorithm runs against real DB data. The real suggestion cards (shot
// list, editing notes, caption via Claude) get built in a later step.
export default async function DashboardPage() {
  const business = await requireOnboardedBusiness();
  const formats = await generateWeeklyFormats(business);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div>
        <p>Bienvenido, {business.name ?? "negocio"}. Aquí irán tus sugerencias semanales.</p>
        <ul className="mt-4 list-disc pl-5">
          {formats.map((format) => (
            <li key={format.id}>
              {format.id} ({format.mediaType})
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
