import { getCurrentBusiness } from "@/lib/dal";
import { AudienceForm } from "./audience-form";

export default async function AudiencePage() {
  const business = await getCurrentBusiness();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Tu público y tu tono</h1>
        <p className="text-gray-600">Ayúdanos a entender a quién le hablas.</p>
      </div>
      <AudienceForm
        defaultValues={{
          targetAudience: business?.targetAudience,
          brandTone: business?.brandTone,
        }}
      />
    </main>
  );
}