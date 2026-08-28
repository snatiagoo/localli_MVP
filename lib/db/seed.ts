import { config } from "dotenv";
config({ path: ".env.local" });

import type { ComfortLevel, MediaType } from "./schema";
import type { Goal } from "@/lib/content/goals";

// The starting content format library for the restaurant category.
// `goalTags: []` means "suits every goal" (no restriction).
const FORMATS: {
  id: string;
  name: string;
  mediaType: MediaType;
  description: string;
  goalTags: Goal[];
  requiresComfortLevel: ComfortLevel;
  promptGuidance: string;
}[] = [
  {
    id: "signature_dish_spotlight_video",
    name: "Video de plato estrella",
    mediaType: "video",
    description: "Video corto mostrando la preparación o presentación de un plato insignia.",
    goalTags: ["more_walk_ins", "more_takeout_orders", "promote_new_menu_items"],
    requiresComfortLevel: "simple_video",
    promptGuidance:
      "Enfócate en uno de los platos estrella del negocio. Incluye un plano de cocción o preparación y un plano del emplatado final.",
  },
  {
    id: "daily_special_photo",
    name: "Foto del especial del día",
    mediaType: "photo",
    description: "Foto simple y apetecible del especial o menú del día.",
    goalTags: [],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Usa buena luz natural si es posible. Destaca el plato del día o una oferta recurrente.",
  },
  {
    id: "behind_the_scenes_prep",
    name: "Detrás de cámaras: la preparación",
    mediaType: "video",
    description: "Video mostrando al equipo preparando un plato, dando personalidad a la marca.",
    goalTags: ["more_brand_awareness"],
    requiresComfortLevel: "confident_video",
    promptGuidance:
      "Muestra manos trabajando, el ambiente de la cocina, y algo de energía y movimiento.",
  },
  {
    id: "customer_reaction_nudge",
    name: "Reacción de un cliente",
    mediaType: "video",
    description: "Video corto de un cliente probando o reaccionando a un plato (con su permiso).",
    goalTags: ["more_brand_awareness", "more_walk_ins"],
    requiresComfortLevel: "simple_video",
    promptGuidance: "Pide permiso al cliente. Captura una reacción genuina al primer bocado.",
  },
  {
    id: "specials_announcement_post",
    name: "Anuncio de especial u oferta",
    mediaType: "photo",
    description: "Foto más texto anunciando una oferta, evento o especial recurrente.",
    goalTags: ["more_takeout_orders", "more_reservations"],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Usa la lista de especiales/eventos del negocio. Sé claro sobre fecha o condiciones si aplica.",
  },
  {
    id: "new_menu_item_teaser_video",
    name: "Adelanto de plato nuevo",
    mediaType: "video",
    description: "Video corto tipo teaser presentando un plato nuevo del menú.",
    goalTags: ["promote_new_menu_items"],
    requiresComfortLevel: "simple_video",
    promptGuidance:
      "Genera intriga: no muestres todo el plato de inmediato, guarda el mejor plano para el final.",
  },
  {
    id: "plating_closeup_photo",
    name: "Primer plano de textura",
    mediaType: "photo",
    description:
      "Foto macro, muy de cerca, resaltando la textura de un plato (queso derretido, salsa, marcas de cocción).",
    goalTags: [],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Acércate mucho al plato. Busca un momento con textura visual: un corte, una salsa cayendo, o marcas de cocción.",
  },
  {
    id: "flat_lay_photo",
    name: "Foto cenital del plato",
    mediaType: "photo",
    description: "Foto estática desde arriba, composición cuidada de uno o varios platos.",
    goalTags: [],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Toma la foto directamente desde arriba (cenital). Cuida la composición: espacio, colores y orden de los elementos en la mesa.",
  },
  {
    id: "reservation_ambience_photo",
    name: "Ambiente del local",
    mediaType: "photo",
    description: "Foto del ambiente o decoración del local para atraer reservas o visitas.",
    goalTags: ["more_reservations", "more_walk_ins"],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Muestra el espacio en un momento atractivo: buena luz, mesas puestas, ambiente acogedor.",
  },
  {
    id: "quick_recipe_tip_video",
    name: "Tip rápido de cocina",
    mediaType: "video",
    description: "Video corto compartiendo un tip o truco relacionado con un plato del menú.",
    goalTags: ["more_brand_awareness", "promote_new_menu_items"],
    requiresComfortLevel: "confident_video",
    promptGuidance:
      "Comparte un dato curioso o técnica simple relacionada a un ingrediente o plato del negocio.",
  },
  {
    id: "walk_in_offer_photo",
    name: "Oferta para clientes que llegan",
    mediaType: "photo",
    description: "Foto más texto con una oferta simple para atraer gente al local hoy.",
    goalTags: ["more_walk_ins"],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Enfatiza inmediatez ('hoy', 'ahora'). Usa un plato o especial fácil de preparar.",
  },
  {
    id: "dish_process_video",
    name: "Proceso completo: cómo se hace",
    mediaType: "video",
    description:
      "Video más largo mostrando el proceso completo de un plato, de principio a fin.",
    goalTags: ["more_brand_awareness", "promote_new_menu_items"],
    requiresComfortLevel: "confident_video",
    promptGuidance:
      "Muestra el plato de principio a fin: ingredientes, preparación paso a paso, y resultado final. Más extenso que un video de highlights.",
  },
  {
    id: "chef_explains_dish_video",
    name: "El chef explica el plato",
    mediaType: "video",
    description:
      "El chef o dueño habla a cámara sobre el origen de un plato o un cambio en el menú.",
    goalTags: ["more_brand_awareness", "promote_new_menu_items"],
    requiresComfortLevel: "confident_video",
    promptGuidance:
      "El chef o dueño habla directo a cámara: por qué existe ese plato, de dónde viene la receta, o qué lo hace especial. Tono cercano y personal.",
  },
  {
    id: "carousel_ingredients_steps_photo",
    name: "Carrusel: ingredientes y pasos",
    mediaType: "photo",
    description:
      "Publicación de varias fotos (carrusel): el plato terminado, sus ingredientes, y un paso clave de la preparación.",
    goalTags: ["promote_new_menu_items"],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Genera 3 fotos para un carrusel: 1) el plato terminado, 2) los ingredientes principales, 3) un paso clave del emplatado o preparación.",
  },
  {
    id: "review_screenshot_photo",
    name: "Reseña de un cliente",
    mediaType: "photo",
    description:
      "Captura de pantalla de una reseña real positiva, con una reacción corta del negocio.",
    goalTags: ["more_brand_awareness", "more_reservations"],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Usa una reseña real y positiva del negocio (captura de pantalla). Añade una reacción breve y agradecida en la descripción.",
  },
  {
    id: "direct_reservation_cta_photo",
    name: "Invitación directa a reservar",
    mediaType: "photo",
    description:
      "Foto atractiva del local o un plato, con un llamado directo a reservar o pedir (enlace en la bio).",
    goalTags: ["more_reservations", "more_takeout_orders"],
    requiresComfortLevel: "photo_only",
    promptGuidance:
      "Foto apetecible del plato o el local. La descripción debe invitar claramente a reservar o pedir, mencionando el enlace en la bio.",
  },
];

async function main() {
  // Loaded dynamically (not at the top of the file) so `config()` above has
  // already set process.env.DATABASE_URL before lib/db/index.ts reads it —
  // otherwise, since JS loads all top-level imports before running any
  // code, it would try to connect before the env var was even set.
  const { db } = await import("./index");
  const { contentFormats } = await import("./schema");

  for (const format of FORMATS) {
    // db.insert(table).values(row) -> the Drizzle equivalent of
    // `INSERT INTO content_formats (...) VALUES (...)`.
    // .onConflictDoUpdate(...) makes this safe to run more than once: if a
    // row with this id already exists (conflict on the primary key), update
    // its fields instead of erroring out — so re-running the seed script
    // just refreshes the data rather than failing on duplicates.
    await db
      .insert(contentFormats)
      .values(format)
      .onConflictDoUpdate({ target: contentFormats.id, set: format });
  }

  console.log(`Seeded ${FORMATS.length} content formats.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
