import Link from "next/link";

// Placeholder — the static examples/showcase page (pre-written content
// examples per business type, not live-generated), shown right before the
// paywall. Content + design come later during UI/UX polish.
export default function ExamplesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <p>Aquí van ejemplos de contenido generado para distintos tipos de negocio.</p>
      <Link href="/paywall" className="rounded-md bg-black text-white px-6 py-3">
        Continuar
      </Link>
    </main>
  );
}
