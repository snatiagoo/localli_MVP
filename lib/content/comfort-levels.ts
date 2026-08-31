import type { ComfortLevel } from "@/lib/db/schema";

export const COMFORT_LEVEL_LABELS: Record<ComfortLevel, string> = {
  photo_only: "Solo fotos, nada de video",
  simple_video: "Videos sencillos, sin complicarme",
  confident_video: "Cómodo grabando y editando video",
};
