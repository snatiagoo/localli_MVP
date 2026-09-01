// TODO — build this Server Component page. Goal:
//
// 1. Fetch the current business's existing data (if any) using
//    getCurrentBusiness() from "@/lib/dal" — same function you already
//    used in app/dashboard/page.tsx and app/onboarding/layout.tsx. This is
//    what lets the form pre-fill if someone navigates back to this step
//    after already filling it in once.
//
// 2. Render some page content (heading/intro text — your call on wording
//    and layout) plus the <BasicsForm /> component from "./basics-form",
//    passing it a `defaultValues` prop shaped like:
//    { name: business?.name, cuisine: business?.cuisine, goal: business?.goal }
//    (BasicsForm's defaultValues prop type already expects exactly this shape.)
//
// Remember this needs to be an async function component, since
// getCurrentBusiness() is async.


import { getCurrentBusiness } from "@/lib/dal";
import { BasicsForm } from "./basics-form";

export default async function BasicsPage() {
  const business = await getCurrentBusiness();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Empecemos con lo básico</h1>
        <p className="text-gray-600">Cuéntanos sobre tu negocio.</p>
      </div>
      <BasicsForm
        defaultValues={{ name: business?.name, cuisine: business?.cuisine, goal: business?.goal }}
      />
    </main>
  );
}