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

      {state.errors && state.errors.length > 0 && (
        <p className="text-sm text-red-600">{state.errors[0]}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black text-white py-2 disabled:opacity-50"
      >
        {pending ? "Guardando..." : "Continuar"}
      </button>
    </form>
  );
}