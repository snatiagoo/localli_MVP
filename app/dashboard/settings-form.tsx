"use client";
// also present on feat/cron PR and merged but I wanted to create a 
// specific push for it so im addign this comment to do it

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
      <h2 className="text-lg font-semibold">Ajustes del negocio</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="targetAudience" className="text-sm font-medium">
          ¿A quién quieres atraer?
        </label>
        <input
          id="targetAudience"
          name="targetAudience"
          type="text"
          defaultValue={defaultValues.targetAudience ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        {state.properties?.targetAudience?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.targetAudience.errors[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="brandTone" className="text-sm font-medium">
          ¿Cómo describirías el tono de tu marca?
        </label>
        <input
          id="brandTone"
          name="brandTone"
          type="text"
          defaultValue={defaultValues.brandTone ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        {state.properties?.brandTone?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.brandTone.errors[0]}</p>
        )}
      </div>

      <hr className="border-gray-300" />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium mb-1">Nivel de comodidad con el contenido</legend>
        <div className="flex flex-col gap-2">
          {(Object.entries(COMFORT_LEVEL_LABELS) as [ComfortLevel, string][]).map(
            ([value, label]) => (
              <label
                key={value}
                className="cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm has-checked:border-black has-checked:bg-black has-checked:text-white"
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
        <legend className="text-sm font-medium mb-1">Frecuencia de publicación semanal</legend>
        <div className="flex gap-3">
          {POSTING_FREQUENCY_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex-1 cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-center text-sm has-checked:border-black has-checked:bg-black has-checked:text-white"
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
      </fieldset>

      {state.errors && state.errors.length > 0 && (
        <p className="text-sm text-red-600">{state.errors[0]}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black text-white py-2 disabled:opacity-50"
      >
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
