"use client";

import { useState } from "react";
import { useActionState } from "react";
import { saveMenu, type MenuFormState } from "./actions";

const MAX_LIST_ITEMS = 6;

const initialState: MenuFormState = { errors: [] };

type SpecialDraft = { label: string; description: string };

export function MenuForm({
  defaultValues,
}: {
  defaultValues: {
    signatureDishes?: string[] | null;
    specials?: { label: string; description?: string | null }[] | null;
  };
}) {
  const [dishes, setDishes] = useState<string[]>(
    defaultValues.signatureDishes?.length ? defaultValues.signatureDishes : [""],
  );
  const [specials, setSpecials] = useState<SpecialDraft[]>(
    defaultValues.specials?.length
      ? defaultValues.specials.map((s) => ({ label: s.label, description: s.description ?? "" }))
      : [{ label: "", description: "" }],
  );

  // TODO — call useActionState(saveMenu, initialState) here, destructuring
  // [state, formAction, pending], same pattern as basics-form.tsx.

  const [state, formAction, pending] = useActionState(saveMenu, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Platos estrella</label>
        {dishes.map((dish, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={dish}
              onChange={(e) =>
                setDishes((prev) => prev.map((d, idx) => (idx === i ? e.target.value : d)))
              }
              className="flex-1 rounded-md border border-gray-300 px-3 py-2"
            />
            {dishes.length > 1 && (
              <button
                type="button"
                onClick={() => setDishes((prev) => prev.filter((_, idx) => idx !== i))}
                className="px-2 text-gray-500"
              >
                Quitar
              </button>
            )}
          </div>
        ))}
        {dishes.length < MAX_LIST_ITEMS && (
          <button
            type="button"
            onClick={() => setDishes((prev) => [...prev, ""])}
            className="self-start text-sm text-blue-600"
          >
            + Añadir plato
          </button>
        )}
        <input
          type="hidden"
          name="signatureDishes"
          value={JSON.stringify(dishes.map((d) => d.trim()).filter((d) => d !== ""))}
        />
        {state?.properties?.signatureDishes?.errors?.[0]}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Especiales u ofertas recurrentes</label>
        {specials.map((special, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-md border border-gray-200 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={special.label}
                onChange={(e) =>
                  setSpecials((prev) =>
                    prev.map((s, idx) => (idx === i ? { ...s, label: e.target.value } : s)),
                  )
                }
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              />
              {specials.length > 1 && (
                <button
                  type="button"
                  onClick={() => setSpecials((prev) => prev.filter((_, idx) => idx !== i))}
                  className="px-2 text-gray-500"
                >
                  Quitar
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Descripción (opcional)"
              value={special.description}
              onChange={(e) =>
                setSpecials((prev) =>
                  prev.map((s, idx) => (idx === i ? { ...s, description: e.target.value } : s)),
                )
              }
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        ))}
        {specials.length < MAX_LIST_ITEMS && (
          <button
            type="button"
            onClick={() => setSpecials((prev) => [...prev, { label: "", description: "" }])}
            className="self-start text-sm text-blue-600"
          >
            + Añadir especial
          </button>
        )}
        <input
          type="hidden"
          name="specials"
          value={JSON.stringify(
            specials
              .filter((s) => s.label.trim() !== "")
              .map((s) => ({
                label: s.label.trim(),
                description: s.description.trim() === "" ? undefined : s.description.trim(),
              })),
          )}
        />
        {state?.properties?.specials?.errors?.[0]}
      </div>

      {state?.errors?.[0]}

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