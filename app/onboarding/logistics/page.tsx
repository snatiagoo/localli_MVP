import { requirePreviousOnboardingSteps } from "@/lib/dal";
import { LogisticsForm } from "./logistics-form";

export default async function LogisticsPage() {
  const business = await requirePreviousOnboardingSteps();

  return (
    <main className="mx-auto flex flex-1 w-full max-w-lg flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Últimos detalles</h1>
        <p className="text-muted">Esto nos ayuda a ajustar las recomendaciones a lo que puedes hacer.</p>
      </div>
      <LogisticsForm
        defaultValues={{
          contentComfortLevel: business.contentComfortLevel,
          postingFrequency: business.postingFrequency,
          socialHandles: business.socialHandles,
          address: business.address,
          phone: business.phone,
        }}
      />
    </main>
  );
}
