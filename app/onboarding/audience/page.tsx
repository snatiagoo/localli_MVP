import { getCurrentBusiness } from "@/lib/dal";
import { AudienceForm } from "./audience-form";

export default async function AudiencePage() {
  const business = await getCurrentBusiness();

  return (
    <main className="mx-auto flex flex-1 w-full max-w-lg flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Tu público y tu tono</h1>
        <p className="text-muted">Ayúdanos a entender a quién le hablas.</p>
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