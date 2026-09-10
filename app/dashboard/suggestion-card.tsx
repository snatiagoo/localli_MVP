"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { regenerateAction } from "./actions";
import type { suggestions } from "@/lib/db/schema";

type SuggestionRow = typeof suggestions.$inferSelect;

function formatWeek(weekStartDate: string) {
  const d = new Date(weekStartDate);
  return `Semana del ${d.getDate()}`;
}

// Splits "text **bold** more text" into alternating plain/bold pieces and
// renders the **-wrapped ones as <strong> — Claude is instructed to mark
// emphasis this way in the caption instead of inventing a custom format.
function renderWithBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}

// Returns one line per note instead of joining them into a single run-on
// paragraph — cuts, music, and each text overlay are distinct pieces of
// advice and read far better as separate lines than mashed together.
function formatEditingNotes(notes: NonNullable<SuggestionRow["editingNotes"]>) {
  const lines: string[] = [];
  if (notes.cuts) lines.push(notes.cuts);
  if (notes.music) lines.push(notes.music);
  for (const overlay of notes.textOverlays ?? []) {
    lines.push(`Texto en el segundo ${overlay.atSecond}: «${overlay.text}»`);
  }
  return lines;
}

export function SuggestionCard({ row, total }: { row: SuggestionRow; total: number }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Called directly (no <form>) so the pending state from useTransition is
  // available right here to blur the whole card — a <form>'s useFormStatus
  // only reports pending to descendants of the form, not sibling content.
  function handleRegenerate() {
    setError(null);
    const formData = new FormData();
    formData.set("suggestionId", row.id);
    startTransition(async () => {
      const result = await regenerateAction(formData);
      if (result.error) setError(result.error);
    });
  }

  const mediaLabel = row.mediaType === "video" ? "Video" : "Foto";
  const headerTitle = `${mediaLabel} ${row.position} de ${total}`;
  const headerMeta =
    row.mediaType === "video" && row.targetDurationSeconds
      ? `${formatWeek(row.weekStartDate)} · ${row.targetDurationSeconds} s`
      : formatWeek(row.weekStartDate);

  const montajeLines = row.editingNotes ? formatEditingNotes(row.editingNotes) : [];

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-surface/80">
          <Loader2 size={28} className="animate-spin text-accent" />
          <span className="text-xs font-semibold text-muted">Generando una idea nueva…</span>
        </div>
      )}

      <div
        className={`flex flex-col bg-surface rounded-2xl overflow-hidden shadow-[0_4px_16px_oklch(0.34_0.11_258/0.1)] transition-all duration-300 ${
          isPending ? "blur-sm opacity-60" : ""
        }`}
      >
        {row.status === "failed" ? (
          <>
            <div className="flex items-center justify-between gap-2 bg-primary px-5 py-4">
              <span className="font-display text-base font-bold text-white">{headerTitle}</span>
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={isPending}
                title="Regenerar"
                className="flex items-center justify-center w-[26px] h-[26px] shrink-0 bg-white/10 hover:bg-white/25 disabled:opacity-50 rounded-full"
              >
                <RegenerateIcon />
              </button>
            </div>
            {error && (
              <div className="bg-accent/10 text-accent text-xs font-semibold px-5 py-2.5">{error}</div>
            )}
            <div className="p-6 text-sm text-muted">
              No se pudo generar esta sugerencia. Intenta regenerarla.
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2 bg-primary px-5 py-4">
              <span className="font-display text-base font-bold text-white">{headerTitle}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/70 whitespace-nowrap pt-0.5">{headerMeta}</span>
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={isPending}
                  title="Regenerar"
                  className="flex items-center justify-center w-[26px] h-[26px] shrink-0 bg-white/10 hover:bg-white/25 disabled:opacity-50 rounded-full"
                >
                  <RegenerateIcon />
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-accent/10 text-accent text-xs font-semibold px-5 py-2.5">{error}</div>
            )}

            <div className="flex flex-col p-6 gap-5 flex-1">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold tracking-wider text-accent">PLANOS</span>
                <div className="flex flex-col gap-1.5">
                  {row.shotList.map((shot, i) => (
                    <p key={i} className="m-0 text-[13.5px] leading-relaxed">
                      <span className="font-display font-bold">{i + 1}.</span> {shot.description}
                    </p>
                  ))}
                </div>
              </div>

              {montajeLines.length > 0 && (
                <div className="border-t border-border pt-5 flex flex-col gap-2">
                  <span className="text-[11px] font-bold tracking-wider text-accent">MONTAJE</span>
                  <ul className="m-0 pl-4 flex flex-col gap-1.5 list-disc marker:text-accent">
                    {montajeLines.map((line, i) => (
                      <li key={i} className="text-[13.5px] leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-border pt-5 flex flex-col gap-2 mt-auto">
                <span className="text-[11px] font-bold tracking-wider text-accent">DESCRIPCIÓN</span>
                <div className="bg-background rounded-[10px] px-4 py-3.5">
                  <p className="m-0 text-[13.5px] leading-relaxed">{renderWithBold(row.caption)}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function RegenerateIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"></path>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
      <path d="M3 22v-6h6"></path>
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
    </svg>
  );
}
