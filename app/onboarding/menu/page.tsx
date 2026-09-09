

import { MenuForm } from "./menu-form";
import { getCurrentBusiness } from "@/lib/dal";

export default async function MenuPage() {
  const business = await getCurrentBusiness();

  return (
    <main className="mx-auto flex flex-1 w-full max-w-lg flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Tu menú</h1>
        <p className="text-muted">Cuéntanos qué platos y ofertas te representan.</p>
      </div>
      <MenuForm
        defaultValues={{
          signatureDishes: business?.signatureDishes,
          specials: business?.specials,
        }}
      />
    </main>
  );
}