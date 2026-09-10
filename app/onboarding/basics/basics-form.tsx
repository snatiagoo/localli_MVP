"use client";

import { useActionState } from "react";
import { saveBasics, type BasicsFormState } from "./actions";
import { GOAL_LABELS, type Goal } from "@/lib/content/goals";

const initialState: BasicsFormState = { errors: [] };

export function BasicsForm({
  defaultValues,
}: {
  defaultValues: { name?: string | null; cuisine?: string | null; goal?: Goal | null };
}) {
  const [state, formAction, pending] = useActionState(saveBasics, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-semibold">
          Nombre del negocio
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultValues.name ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        {state.properties?.name?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.name.errors[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cuisine" className="text-sm font-semibold">
          Tipo de cocina o especialidad
        </label>
        <input
          id="cuisine"
          name="cuisine"
          type="text"
          defaultValue={defaultValues.cuisine ?? ""}
          className="rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
        />
        {state?.properties?.cuisine?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.cuisine.errors[0]}</p>
        )}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold mb-1">
          ¿Qué quieres conseguir más? <span className="text-muted font-normal">(lo más importante)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.entries(GOAL_LABELS) as [Goal, string][]).map(([value, label]) => (
            <label
              key={value}
              className="cursor-pointer rounded-[10px] border border-border bg-surface px-4 py-3 text-sm font-semibold hover:border-accent/50 has-checked:border-accent has-checked:bg-accent/10 has-checked:text-accent"
            >
              <input
                type="radio"
                name="goal"
                value={value}
                defaultChecked={defaultValues.goal === value}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
        {state?.properties?.goal?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.goal.errors[0]}</p>
        )}
      </fieldset>

      {state?.errors?.[0] && <p className="text-sm text-red-600">{state.errors[0]}</p>}

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
