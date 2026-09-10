import Link from "next/link";

type ExampleCard = {
  label: string;
  meta: string;
  planos: string[];
  montaje?: string[];
  descripcion: React.ReactNode;
};

const CARDS: ExampleCard[] = [
  {
    label: "Foto 1 de 3",
    meta: "Semana del 3",
    planos: [
      "Coloca las bravas recién hechas cerca de la ventana, aprovechando la luz natural.",
      "Acércate con el móvil y toma la foto desde arriba, que se vea bien la salsa.",
    ],
    descripcion: (
      <>
        Las bravas de toda la vida, <strong>como las de casa de la abuela</strong> 🥔 Hoy
        tenemos mesa libre a partir de las 21h.
        <br />
        #tapasmadrid #bravas #barrio
      </>
    ),
  },
  {
    label: "Video 2 de 3",
    meta: "Semana del 3 · 25 s",
    planos: [
      "Graba el amasado de la masa desde cerca, mostrando la textura.",
      "Sigue la pizza entrando al horno de leña.",
      "Termina con el corte y el queso estirándose.",
    ],
    montaje: [
      "Tres cortes rápidos y rítmicos.",
      "Música italiana animada de fondo.",
      "Texto en el segundo 2: «Horno de leña, receta de siempre».",
    ],
    descripcion: (
      <>
        Masa madre, 24 horas de fermentación y horno de leña. <strong>Así hacemos pizza
        nosotros</strong> 🍕
        <br />
        #pizzanapolitana #hornodeleña #recienhecha
      </>
    ),
  },
  {
    label: "Foto 1 de 2",
    meta: "Semana del 10",
    planos: [
      "Prepara la mesa de brunch con las tostadas, el zumo y el café recién hecho.",
      "Toma la foto desde arriba, mostrando toda la mesa junta.",
    ],
    descripcion: (
      <>
        Brunch de fin de semana: aguacate, huevo poché y nuestro pan de masa madre 🥑
        <strong> Reserva tu mesa antes del domingo</strong>.
        <br />
        #brunch #findesemana #desayunos
      </>
    ),
  },
  {
    label: "Video 1 de 3",
    meta: "Semana del 10 · 20 s",
    planos: [
      "Graba la pieza de carne entrando a la brasa.",
      "Acércate al corte final, mostrando el punto de cocción.",
      "Termina con el plato ya montado en la mesa.",
    ],
    montaje: [
      "Corte seco justo cuando la carne toca la brasa.",
      "Sonido ambiente de la brasa, sin música.",
      "Texto en el segundo 1: «Chuletón madurado 30 días».",
    ],
    descripcion: (
      <>
        Chuletón madurado 30 días, a la brasa de carbón. <strong>Se reserva con antelación</strong>,
        se agota rápido 🔥
        <br />
        #asador #chuleton #brasa
      </>
    ),
  },
  {
    label: "Foto 1 de 3",
    meta: "Semana del 17",
    planos: [
      "Coloca el menú del día completo en la mesa, con los tres platos visibles.",
      "Fotografía el comedor con las mesas ya puestas, antes de abrir.",
    ],
    descripcion: (
      <>
        Menú del día de hoy: lentejas, merluza y flan casero 🍽️ <strong>10,50€, de lunes a
        viernes</strong>.
        <br />
        #menudeldia #comidacasera #barrio
      </>
    ),
  },
  {
    label: "Video 3 de 3",
    meta: "Semana del 17 · 18 s",
    planos: [
      "Graba la mariscada recién servida, con vapor todavía saliendo.",
      "Acércate a las gambas y los mejillones, mostrando el color.",
    ],
    montaje: [
      "Un solo corte, sin edición.",
      "Texto en el segundo 0: «Marisco fresco, todos los días».",
    ],
    descripcion: (
      <>
        Marisco de lonja, fresco cada mañana 🦐 <strong>Encarga tu mariscada con un día de
        antelación</strong>.
        <br />
        #marisqueria #mariscofresco #lonja
      </>
    ),
  },
  {
    label: "Foto 2 de 2",
    meta: "Semana del 24",
    planos: [
      "Sirve la copa de vino junto a la tabla de quesos.",
      "Toma la foto desde el lateral, a la altura de la mesa, con luz de vela si es de noche.",
    ],
    descripcion: (
      <>
        Un tinto de la casa y una tabla para compartir 🍷 <strong>Ideal para después del
        trabajo</strong>.
        <br />
        #vinoteca #tapeo #despuesdeltrabajo
      </>
    ),
  },
  {
    label: "Video 1 de 2",
    meta: "Semana del 24 · 15 s",
    planos: [
      "Graba la hamburguesa recién montada, capa por capa.",
      "Acércate al corte por la mitad, mostrando el punto de la carne y el queso fundido.",
    ],
    montaje: [
      "Corte rápido entre cada capa.",
      "Música con ritmo marcado.",
      "Texto en el segundo 1: «100% carne fresca, cada día».",
    ],
    descripcion: (
      <>
        Nuestra burger de la casa, <strong>recién montada, nunca precocinada</strong> 🍔
        <br />
        #burger #hamburguesacasera #carnefresca
      </>
    ),
  },
  {
    label: "Foto 1 de 3",
    meta: "Semana del 31",
    planos: [
      "Coloca la copa de helado sobre un fondo neutro, junto a la ventana.",
      "Acércate para que se vea bien la textura y los toppings.",
    ],
    descripcion: (
      <>
        Sabor de temporada: <strong>higo con nueces caramelizadas</strong> 🍨 Solo hasta que se
        acabe la fruta de temporada.
        <br />
        #heladoartesanal #saborestemporada #hechoencasa
      </>
    ),
  },
  {
    label: "Video 2 de 3",
    meta: "Semana del 31 · 22 s",
    planos: [
      "Graba al cocinero removiendo el guiso en la cazuela de barro.",
      "Acércate al plato ya servido, con vapor saliendo.",
      "Termina con el comedor de fondo, con algunas mesas ocupadas.",
    ],
    montaje: [
      "Cortes lentos, sin prisa.",
      "Música tranquila de fondo.",
      "Texto en el segundo 2: «Receta de mi abuela, sin cambiar nada».",
    ],
    descripcion: (
      <>
        El guiso de siempre, a fuego lento durante tres horas 🍲 <strong>Hoy toca, y no sobra
        mucho</strong>.
        <br />
        #cocinatradicional #recetadeabuela #cocinaacasera
      </>
    ),
  },
  {
    label: "Foto 2 de 3",
    meta: "Semana del 38",
    planos: [
      "Coloca la caña recién tirada junto a la tabla de picoteo.",
      "Toma la foto a la altura de la mesa, con la terraza de fondo desenfocada.",
    ],
    descripcion: (
      <>
        Caña bien tirada y tabla para compartir, en nuestra terraza 🍻 <strong>Hoy hay
        fútbol, ven a verlo con nosotros</strong>.
        <br />
        #cervezaartesanal #terraza #gastrobar
      </>
    ),
  },
];

// Positions/sizes/rotations for the background scatter — hand-placed rather
// than randomized so the depth effect reads intentionally instead of messy,
// and so it renders identically server- and client-side (Math.random() at
// render time would mismatch between the two).
const LAYOUT = [
  { top: "-6%", left: "2%", width: "17rem", rotate: "-6deg", opacity: 0.35, blur: "1px" },
  { top: "4%", left: "68%", width: "15rem", rotate: "5deg", opacity: 0.3, blur: "1px" },
  { top: "38%", left: "-4%", width: "16rem", rotate: "4deg", opacity: 0.4, blur: "0.5px" },
  { top: "58%", left: "78%", width: "14rem", rotate: "-4deg", opacity: 0.3, blur: "1px" },
  { top: "70%", left: "6%", width: "13rem", rotate: "7deg", opacity: 0.25, blur: "1.5px" },
  { top: "-8%", left: "38%", width: "13rem", rotate: "3deg", opacity: 0.25, blur: "1.5px" },
  { top: "20%", left: "84%", width: "17rem", rotate: "-3deg", opacity: 0.35, blur: "0.5px" },
  { top: "78%", left: "40%", width: "15rem", rotate: "-5deg", opacity: 0.3, blur: "1px" },
  { top: "10%", left: "20%", width: "12rem", rotate: "-8deg", opacity: 0.2, blur: "2px" },
  { top: "48%", left: "30%", width: "12rem", rotate: "6deg", opacity: 0.2, blur: "2px" },
  { top: "85%", left: "84%", width: "13rem", rotate: "4deg", opacity: 0.25, blur: "1.5px" },
];

function MiniCard({ card }: { card: ExampleCard }) {
  return (
    <div className="flex flex-col bg-surface rounded-2xl overflow-hidden shadow-[0_4px_16px_oklch(0.34_0.11_258/0.1)]">
      <div className="flex items-center justify-between gap-2 bg-primary px-4 py-3">
        <span className="font-display text-sm font-bold text-white">{card.label}</span>
        <span className="text-[10px] font-medium text-white/70 whitespace-nowrap">{card.meta}</span>
      </div>
      <div className="flex flex-col p-4 gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-bold tracking-wider text-accent">PLANOS</span>
          <div className="flex flex-col gap-1">
            {card.planos.map((shot, i) => (
              <p key={i} className="m-0 text-[11px] leading-relaxed">
                <span className="font-display font-bold">{i + 1}.</span> {shot}
              </p>
            ))}
          </div>
        </div>

        {card.montaje && (
          <div className="border-t border-border pt-3 flex flex-col gap-1.5">
            <span className="text-[9px] font-bold tracking-wider text-accent">MONTAJE</span>
            <ul className="m-0 pl-3.5 flex flex-col gap-1 list-disc marker:text-accent">
              {card.montaje.map((line, i) => (
                <li key={i} className="text-[11px] leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-border pt-3 flex flex-col gap-1.5">
          <span className="text-[9px] font-bold tracking-wider text-accent">DESCRIPCIÓN</span>
          <div className="bg-background rounded-lg px-3 py-2.5">
            <p className="m-0 text-[11px] leading-relaxed">{card.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamplesPage() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Background scatter — decorative only, never interactive. */}
      <div className="absolute inset-0" aria-hidden="true">
        {CARDS.map((card, i) => {
          const pos = LAYOUT[i % LAYOUT.length];
          return (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.width,
                opacity: pos.opacity,
                filter: `blur(${pos.blur})`,
                transform: `rotate(${pos.rotate})`,
              }}
            >
              <MiniCard card={card} />
            </div>
          );
        })}
      </div>

      {/* Foreground CTA */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md bg-background/70 backdrop-blur-sm rounded-3xl p-10">
        <div className="font-display text-2xl font-bold">
          Localli<span className="text-accent">.</span>
        </div>
        <p className="text-muted">
          Esto es justo el tipo de ideas que vas a recibir cada semana: el plano, el montaje y
          la descripción ya escritos, listos para grabar.
        </p>
        <Link
          href="/paywall"
          className="rounded-[10px] bg-primary text-white px-8 py-3 font-bold"
        >
          Continuar
        </Link>
      </div>
    </main>
  );
}
