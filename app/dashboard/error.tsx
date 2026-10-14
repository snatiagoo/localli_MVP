"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

// Safety net for anything that throws while rendering the dashboard and
// isn't already handled closer to the source (e.g. a DB error in
// generateWeeklyFormats). Claude failures for a single suggestion are handled
// in saveSuggestion as "failed" cards and never reach this. Doesn't replace
// dashboard/layout.tsx, so the sidebar stays usable.
export default function DashboardError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // In production the message is hidden from the browser; the digest
    // matches the full error in Vercel's server logs.
    console.error("Dashboard error", { digest: error.digest, error });
  }, [error]);

  return (
    <main className="flex flex-col items-center gap-12 p-10 w-[80%] mx-auto">
      <div className="w-full rounded-2xl bg-primary border-l-8 border-accent px-10 py-14 mt-4">
        <div className="flex flex-col gap-4 max-w-lg">
          <h1 className="font-display text-3xl font-bold text-white m-0">
            Algo salió mal al cargar tu panel
          </h1>
          <p className="m-0 text-white/70 text-sm leading-relaxed">
            No es culpa tuya. Puede ser un problema temporal, así que inténtalo
            de nuevo en unos segundos.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="self-start mt-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Intentar de nuevo
          </button>
          {error.digest && (
            <p className="m-0 text-white/40 text-xs">Código de error: {error.digest}</p>
          )}
        </div>
      </div>
    </main>
  );
}
