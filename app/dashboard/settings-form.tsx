"use client";

import { useActionState } from "react";
import { updateBusinessSettings, type SettingsFormState } from "./actions";
import { COMFORT_LEVEL_LABELS } from "@/lib/content/comfort-levels";
import type { ComfortLevel } from "@/lib/db/schema";

const initialState: SettingsFormState = { errors: [] };

const POSTING_FREQUENCY_OPTIONS: { value: "1" | "2" | "3"; label: string }[] = [
  { value: "1", label: "1 vez por semana" },
  { value: "2", label: "2 veces por semana" },
  { value: "3", label: "3 veces por semana" },
];

export function SettingsForm({
  defaultValues,
}: {
  defaultValues: {
    targetAudience?: string | null;
    brandTone?: string | null;
    contentComfortLevel?: ComfortLevel | null;
    postingFrequency?: number | null;
  };
}) {
  const [state, formAction, pending] = useActionState(updateBusinessSettings, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold m-0">Ajustes del negocio</h2>
        <p className="m-0 text-sm text-muted">
          Esto influye directamente en lo que te sugerimos cada semana.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="targetAudience" className="text-sm font-semibold">
          ¿A quién quieres atraer?
        </label>
        <input
          id="targetAudience"
          name="targetAudience"
          type="text"
          defaultValue={defaultValues.targetAudience ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        {state.properties?.targetAudience?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.targetAudience.errors[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="brandTone" className="text-sm font-semibold">
          ¿Cómo describirías el tono de tu marca?
        </label>
        <input
          id="brandTone"
          name="brandTone"
          type="text"
          defaultValue={defaultValues.brandTone ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        {state.properties?.brandTone?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.brandTone.errors[0]}</p>
        )}
      </div>

      <hr className="border-border" />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold mb-1">Nivel de comodidad con el contenido</legend>
        <div className="flex flex-col gap-2">
          {(Object.entries(COMFORT_LEVEL_LABELS) as [ComfortLevel, string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className="cursor-pointer rounded-[10px] border border-border bg-surface px-4 py-3 text-sm font-semibold hover:border-accent/50 has-checked:border-accent has-checked:bg-accent/10 has-checked:text-accent"
              >
                <input
                  type="radio"
                  name="contentComfortLevel"
                  value={value}
                  defaultChecked={defaultValues.contentComfortLevel === value}
                  className="sr-only"
                />
                {label}
              </label>
            ),
          )}
        </div>
        {state.properties?.contentComfortLevel?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.contentComfortLevel.errors[0]}</p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold mb-1">Frecuencia de publicación semanal</legend>
        <div className="flex gap-2.5">
          {POSTING_FREQUENCY_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex-1 cursor-pointer rounded-[10px] border border-border bg-surface px-2 py-3 text-center text-sm font-semibold hover:border-accent/50 has-checked:border-accent has-checked:bg-accent/10 has-checked:text-accent"
            >
              <input
                type="radio"
                name="postingFrequency"
                value={value}
                defaultChecked={String(defaultValues.postingFrequency ?? "") === value}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
        {state.properties?.postingFrequency?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.postingFrequency.errors[0]}</p>
        )}
        <p className="m-0 text-xs text-muted">
          Los cambios aquí no afectan a las sugerencias de esta semana, ya generadas — se aplican a
          partir de la semana que viene.
        </p>
      </fieldset>

      {state.errors && state.errors.length > 0 && (
        <p className="text-sm text-red-600">{state.errors[0]}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-[10px] bg-primary text-white py-3 font-bold disabled:opacity-50"
      >
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
