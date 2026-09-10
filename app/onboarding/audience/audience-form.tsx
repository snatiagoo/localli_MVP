"use client";

import { useActionState } from "react";
import { saveAudience, type AudienceFormState } from "./actions";

const initialState: AudienceFormState = { errors: [] };

export function AudienceForm({
  defaultValues,
}: {
  defaultValues: { targetAudience?: string | null; brandTone?: string | null };
}) {
  const [state, formAction, pending] = useActionState(saveAudience, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
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
