import Link from "next/link";

// Placeholder — the "proof" page (why social media matters for restaurants),
// shown right after sign-up and before onboarding. Real content comes later;
// this applies the visual system so navigation/testing works meanwhile.
export default function ProofPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="font-display text-2xl font-bold">
        Localli<span className="text-accent">.</span>
      </div>
      <p className="max-w-md text-muted">
        Aquí va el contenido sobre por qué las redes sociales importan para tu negocio.
      </p>
      <Link
        href="/onboarding/basics"
        className="rounded-[10px] bg-primary text-white px-8 py-3 font-bold"
      >
        Continuar
      </Link>
    </main>
  );
}
