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
  // TODO — call useActionState(saveBasics, initialState) here, and
  // destructure its 3-item return array: [state, formAction, pending].
  // Recap: `state` is whatever saveBasics last returned (or initialState,
  // before the first submit), `formAction` is what you hand to the form's
  // action prop INSTEAD of saveBasics directly, and `pending` is true while
  // a submission is in flight.

  const [state, formAction, pending] = useActionState(saveBasics, initialState);



  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nombre del negocio
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultValues.name ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        {state.properties?.name?.errors?.[0]}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cuisine" className="text-sm font-medium">
          Tipo de cocina o especialidad
        </label>
        <input
          id="cuisine"
          name="cuisine"
          type="text"
          defaultValue={defaultValues.cuisine ?? ""}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        {state?.properties?.cuisine?.errors?.[0]}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium mb-1">
          ¿Qué quieres conseguir más? <span className="text-gray-500">(lo más importante)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.entries(GOAL_LABELS) as [Goal, string][]).map(([value, label]) => (
            <label
              key={value}
              className="cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm has-checked:border-black has-checked:bg-black has-checked:text-white"
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
        {state?.properties?.goal?.errors?.[0]}
      </fieldset>

      {state?.errors?.[0]}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black text-white py-2 disabled:opacity-50"
      >
        {pending? "Guardando..." : "Continuar"}
      </button>
    </form>
  );
}
