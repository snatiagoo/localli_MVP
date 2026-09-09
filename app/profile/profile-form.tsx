"use client";

import { useState, useActionState } from "react";
import { updateBusinessProfile, type ProfileFormState } from "./actions";
import { GOAL_LABELS, type Goal } from "@/lib/content/goals";

const MAX_LIST_ITEMS = 6;
const initialState: ProfileFormState = { errors: [] };

type SpecialDraft = { label: string; description: string };

export function ProfileForm({
  defaultValues,
}: {
  defaultValues: {
    name?: string | null;
    cuisine?: string | null;
    goal?: Goal | null;
    signatureDishes?: string[] | null;
    specials?: { label: string; description?: string | null }[] | null;
    socialHandles?: { instagram?: string | null; tiktok?: string | null; facebook?: string | null } | null;
    address?: string | null;
    phone?: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState(updateBusinessProfile, initialState);

  const [dishes, setDishes] = useState<string[]>(
    defaultValues.signatureDishes?.length ? defaultValues.signatureDishes : [""],
  );
  const [specials, setSpecials] = useState<SpecialDraft[]>(
    defaultValues.specials?.length
      ? defaultValues.specials.map((s) => ({ label: s.label, description: s.description ?? "" }))
      : [{ label: "", description: "" }],
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <h2 className="font-display text-2xl font-bold">Perfil del negocio</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          {state.properties?.cuisine?.errors?.[0] && (
            <p className="text-sm text-red-600">{state.properties.cuisine.errors[0]}</p>
          )}
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold mb-1">¿Qué quieres conseguir más?</legend>
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
        {state.properties?.goal?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.goal.errors[0]}</p>
        )}
      </fieldset>

      <hr className="border-border" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          {state.properties?.signatureDishes?.errors?.[0] && (
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
          {state.properties?.specials?.errors?.[0] && (
            <p className="text-sm text-red-600">{state.properties.specials.errors[0]}</p>
          )}
        </div>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold">Redes sociales (opcional, solo como referencia)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
        </div>
        {state.properties?.socialHandles?.errors?.[0] && (
          <p className="text-sm text-red-600">{state.properties.socialHandles.errors[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      </div>

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
