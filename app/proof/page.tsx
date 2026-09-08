import Link from "next/link";

// Placeholder — the "proof" page (why social media matters for restaurants),
// shown right after sign-up and before onboarding. Content + design come
// later during UI/UX polish.
export default function ProofPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <p>Aquí va el contenido sobre por qué las redes sociales importan para tu negocio.</p>
      <Link href="/onboarding/basics" className="rounded-md bg-black text-white px-6 py-3">
        Continuar
      </Link>
    </main>
  );
}
