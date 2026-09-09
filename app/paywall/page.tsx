import { checkoutFunction } from "./actions";

const BENEFITS = [
  "El plato del día, no «contenido de valor».",
  "El plano exacto: qué grabar y en qué orden.",
  "La descripción ya escrita, lista para pegar.",
];

export default function PaywallPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="h-1.5 bg-accent" />

      <div className="flex items-center px-14 py-6">
        <div className="font-display text-xl font-bold">
          Localli<span className="text-accent">.</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-16 px-14 pb-16 max-w-6xl w-full box-border">
        {/* Left: editorial content */}
        <div className="flex flex-col gap-7">
          <span className="text-xs font-bold tracking-wider text-accent">
            PARA BARES Y RESTAURANTES DE BARRIO
          </span>

          <h1 className="font-display text-4xl font-bold leading-tight max-w-lg m-0">
            Cada lunes sabes exactamente qué grabar.
          </h1>

          <p className="m-0 text-base leading-relaxed text-muted max-w-md">
            Nada de «contenido de valor». Te decimos el plato, el plano y la hora exacta — tú
            solo grabas.
          </p>

          <blockquote className="my-2 pl-5 border-l-4 border-accent">
            <p className="font-display italic text-lg leading-relaxed m-0">
              Domingo por la noche. Cero ideas para el lunes. Otra vez.
            </p>
          </blockquote>

          <div className="flex flex-col gap-4 mt-2">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-baseline gap-3.5">
                <span className="font-display text-2xl font-bold text-accent w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed pt-0.5">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: offset price card */}
        <div className="flex flex-col mt-16">
          <div className="border-t-[6px] border-accent bg-surface rounded-b-2xl shadow-[0_8px_24px_oklch(0.34_0.11_258/0.12)] p-8 flex flex-col gap-4">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">[PRECIO]</span>
              <span className="text-sm text-muted">/mes</span>
            </div>
            <form action={checkoutFunction}>
              <button
                type="submit"
                className="w-full rounded-[10px] bg-primary text-white py-3.5 font-bold"
              >
                Suscribirme
              </button>
            </form>
            <span className="text-xs text-muted">Cancela cuando quieras. Sin permanencia.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
