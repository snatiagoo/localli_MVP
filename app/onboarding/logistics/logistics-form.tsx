"use client";

import { useActionState } from "react";
import { saveLogistics, type LogisticFormState } from "./actions";
import { COMFORT_LEVEL_LABELS } from "@/lib/content/comfort-levels";
import type { ComfortLevel } from "@/lib/db/schema";

const initialState: LogisticFormState = { errors: [] };

const POSTING_FREQUENCY_OPTIONS: { value: "1" | "2" | "3"; label: string }[] = [
  { value: "1", label: "1 vez por semana" },
  { value: "2", label: "2 veces por semana" },
  { value: "3", label: "3 veces por semana" },
];

export function LogisticsForm({
  defaultValues,
}: {
  defaultValues: {
    contentComfortLevel?: ComfortLevel | null;
    postingFrequency?: number | null;
    socialHandles?: { instagram?: string | null; tiktok?: string | null; facebook?: string | null } | null;
    address?: string | null;
    phone?: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState(saveLogistics, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
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
      </fieldset>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold">Redes sociales (opcional, solo como referencia)</p>
        <input
          name="instagramHandle"
          type="text"
          placeholder="Instagram"
          defaultValue={defaultValues.socialHandles?.instagram ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        <input
          name="tiktokHandle"
          type="text"
          placeholder="TikTok"
          defaultValue={defaultValues.socialHandles?.tiktok ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        <input
          name="facebookHandle"
          type="text"
          placeholder="Facebook"
          defaultValue={defaultValues.socialHandles?.facebook ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        {state.properties?.socialHandles?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.socialHandles.errors[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="address" className="text-sm font-semibold">
          Dirección (opcional)
        </label>
        <input
          id="address"
          name="address"
          type="text"
          defaultValue={defaultValues.address ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-semibold">
          Teléfono (opcional)
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          defaultValue={defaultValues.phone ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
      </div>

      {state.errors && state.errors.length > 0 && (
        <p className="text-sm text-red-600">{state.errors[0]}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-[10px] bg-primary text-white py-3 font-bold disabled:opacity-50"
      >
        {pending ? "Guardando..." : "Continuar"}
      </button>
    </form>
  );
}
