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

  const [state, formAction, pending] = useActionState(saveMenu, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Platos estrella</label>
        {dishes.map((dish, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={dish}
              onChange={(e) =>
                setDishes((prev) => prev.map((d, idx) => (idx === i ? e.target.value : d)))
              }
              className="flex-1 rounded-[10px] border border-border bg-surface px-3 py-2.5 text-sm"
            />
            {dishes.length > 1 && (
              <button
                type="button"
                onClick={() => setDishes((prev) => prev.filter((_, idx) => idx !== i))}
                className="px-2 text-muted"
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
            className="self-start text-sm font-semibold text-accent"
          >
            + Añadir plato
          </button>
        )}
        <input
          type="hidden"
          name="signatureDishes"
          value={JSON.stringify(dishes.map((d) => d.trim()).filter((d) => d !== ""))}
        />
        {state?.properties?.signatureDishes?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.signatureDishes.errors[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Especiales u ofertas recurrentes</label>
        {specials.map((special, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-[10px] border border-border bg-surface p-3">
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
                className="flex-1 rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm"
              />
              {specials.length > 1 && (
                <button
                  type="button"
                  onClick={() => setSpecials((prev) => prev.filter((_, idx) => idx !== i))}
                  className="px-2 text-muted"
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
              className="rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm"
            />
          </div>
        ))}
        {specials.length < MAX_LIST_ITEMS && (
          <button
            type="button"
            onClick={() => setSpecials((prev) => [...prev, { label: "", description: "" }])}
            className="self-start text-sm font-semibold text-accent"
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
        {state?.properties?.specials?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.specials.errors[0]}</p>
        )}
      </div>

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
