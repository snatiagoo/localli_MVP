import { getCurrentBusiness } from "@/lib/dal";
import { LogisticsForm } from "./logistics-form";

export default async function LogisticsPage() {
  const business = await getCurrentBusiness();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Últimos detalles</h1>
        <p className="text-gray-600">Esto nos ayuda a ajustar las recomendaciones a lo que puedes hacer.</p>
      </div>
      <LogisticsForm
        defaultValues={{
          contentComfortLevel: business?.contentComfortLevel,
          postingFrequency: business?.postingFrequency,
          socialHandles: business?.socialHandles,
          address: business?.address,
          phone: business?.phone,
        }}
      />
    </main>
  );
}
