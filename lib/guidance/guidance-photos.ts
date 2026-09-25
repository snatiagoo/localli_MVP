// Ordered list of the editing-guidance sidebar items. Not a sequence you
// have to enforce step-by-step — just an ordered array to render the
// sidebar from and index into for "which item is currently shown". The
// first entry is the intro (no screenshot); the rest each pair one
// Instagram-editor screenshot with a title + explanation. Descriptions use
// **word** to mark emphasis — rendered via lib/utils/render-with-bold.tsx,
// same convention as Claude's generated captions.
export type GuidanceObject = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export const guidanceArray: GuidanceObject[] = [
  {
    id: "intro",
    title: "Antes de empezar",
    description:
      "Para seguir esta guía necesitas dos cosas: la **app de Instagram** instalada en tu móvil, y una **cuenta de Instagram** (o Facebook) para tu negocio. Todo lo que viene a continuación se edita directamente en Instagram — no hace falta ninguna otra app.",
  },
  {
    id: "create_project",
    title: "Crear el proyecto",
    description:
      "Abre Instagram, dale al **botón de crear (el +)** y elige **Reel**. Ahí empieza tu proyecto: todo lo que grabes o subas se monta desde esta pantalla.",
    image: "/guidance-layer/01-crear-proyecto.png",
  },
  {
    id: "add_clips",
    title: "Añadir los clips",
    description:
      "Sube los vídeos o fotos que grabaste siguiendo el plano de la sugerencia. Puedes **añadir varios clips seguidos** — se colocan uno detrás de otro en el orden en que los seleccionas.",
    image: "/guidance-layer/02-anadir-clips.png",
  },
  {
    id: "add_music",
    title: "Añadir música",
    description:
      "Con el clip ya en el editor, busca el **icono de música** y elige una canción. Una música con ritmo alegre y **de fondo (no muy alta)** suele funcionar mejor que el silencio.",
    image: "/guidance-layer/03-anadir-musica.png",
  },
  {
    id: "add_text",
    title: "Añadir texto",
    description:
      "Toca el **icono de texto (la «A»)** para escribir sobre el vídeo — el gancho, el nombre del plato, o lo que indique la sugerencia. No hace falta mucho texto, **una o dos frases cortas** es suficiente.",
    image: "/guidance-layer/04-anadir-texto.png",
  },
  {
    id: "move_text",
    title: "Mover el texto",
    description:
      "Una vez escrito, puedes **arrastrar el texto con el dedo** a la parte de la pantalla que quieras — normalmente arriba o en el centro, **evitando taparle la cara al plato** o a la persona.",
    image: "/guidance-layer/05-mover-texto.png",
  },
  {
    id: "choose_font",
    title: "Elegir la fuente",
    description:
      "Desliza entre las **opciones de letra** que aparecen encima del teclado hasta encontrar una que se lea bien y quede acorde al tono de tu negocio.",
    image: "/guidance-layer/06-elegir-fuente.png",
  },
  {
    id: "text_style",
    title: "Estilo del texto",
    description:
      "Junto a la fuente, puedes cambiar el **color del texto** y el **fondo que lleva detrás** (o quitarlo del todo) para que se lea bien encima del vídeo, sea cual sea el fondo.",
    image: "/guidance-layer/07-estilo-texto.png",
  },
  {
    id: "captions",
    title: "Subtítulos automáticos",
    description:
      "Si hablas en el vídeo, Instagram puede **generar subtítulos automáticamente** — búscalos en el mismo menú que el texto. Ayudan mucho a quien ve el vídeo **sin sonido**, que es la mayoría.",
    image: "/guidance-layer/08-subtitulos.png",
  },
  {
    id: "overlay_image",
    title: "Superponer una imagen",
    description:
      "Si quieres añadir un elemento encima del vídeo (un sello, un precio, un logo), usa la **opción de superponer capas** — funciona igual que el texto, pero con una imagen en vez de letras.",
    image: "/guidance-layer/09-superponer.png",
  },
  {
    id: "sequence",
    title: "Ordenar la secuencia",
    description:
      "Si grabaste varios clips, **mantén pulsado uno para arrastrarlo** y cambiar el orden en que aparecen. Sigue el orden de los planos tal como los describe la sugerencia.",
    image: "/guidance-layer/10-secuencia.png",
  },
  {
    id: "export",
    title: "Exportar y publicar",
    description:
      "Cuando esté todo listo, dale a **siguiente** y **publica el Reel** — con la descripción que te dimos ya escrita, solo tienes que copiarla y pegarla.",
    image: "/guidance-layer/11-exportar.png",
  },
];
