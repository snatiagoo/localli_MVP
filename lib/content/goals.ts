// The "goal" a business picks during onboarding — what they want more of.
// This drives which content formats get suggested to them (see format-selection.ts).
export type Goal =
  | "more_walk_ins"
  | "more_takeout_orders"
  | "more_reservations"
  | "more_brand_awareness"
  | "promote_new_menu_items";

export const GOAL_LABELS: Record<Goal, string> = {
  more_walk_ins: "Más clientes en el local",
  more_takeout_orders: "Más pedidos para llevar",
  more_reservations: "Más reservas",
  more_brand_awareness: "Más reconocimiento de marca",
  promote_new_menu_items: "Dar a conocer platos nuevos",
};
