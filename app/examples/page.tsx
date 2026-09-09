import Link from "next/link";

// Placeholder — the static examples/showcase page (pre-written content
// examples per business type, not live-generated), shown right before the
// paywall. Real content comes later; this applies the visual system so
// navigation/testing works meanwhile.
export default function ExamplesPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="font-display text-2xl font-bold">
        Localli<span className="text-accent">.</span>
      </div>
      <p className="max-w-md text-muted">
        Aquí van ejemplos de contenido generado para distintos tipos de negocio.
      </p>
      <Link
        href="/paywall"
        className="rounded-[10px] bg-primary text-white px-8 py-3 font-bold"
      >
        Continuar
      </Link>
    </main>
  );
}
