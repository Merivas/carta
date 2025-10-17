import { useState } from "react";
import "./App.css";

const BASE_CHARACTERS = [
  {
    name: "Mickey Mouse",
    title: "Capitan de la fantasia",
    description:
      "Mickey aporta curiosidad infinita y una actitud positiva que enciende cualquier aventura grupal.",
    keywords: ["Optimista", "Lider"]
  },
  {
    name: "Minnie Mouse",
    title: "Disenadora de sonrisas",
    description:
      "Minnie mezcla creatividad y calidez para dar la bienvenida a todas las personas.",
    keywords: ["Elegante", "Atenta"]
  },
  {
    name: "Donald",
    title: "Explorador impulsivo",
    description:
      "Donald transforma la energia intensa en motivacion pura cuando el reto lo inspira.",
    keywords: ["Energetico", "Determinado"]
  },
  {
    name: "Goofy",
    title: "Genio impredecible",
    description:
      "Goofy rompe el hielo con ocurrencias genuinas que animan cualquier reunion.",
    keywords: ["Autentico", "Divertido"]
  },
  {
    name: "Pluto",
    title: "Companero leal",
    description:
      "Pluto permanece atento y siempre listo para ofrecer apoyo sincero.",
    keywords: ["Leal", "Confiable"]
  },
  {
    name: "Ariel",
    title: "Guardiana del oceano",
    description:
      "Ariel comparte curiosidad por nuevos mundos y ganas de escuchar historias frescas.",
    keywords: ["Curiosa", "Valiente"]
  },
  {
    name: "Elsa",
    title: "Reina del hielo",
    description:
      "Elsa canaliza calma y poder para construir espacios seguros y elegantes.",
    keywords: ["Serena", "Poderosa"]
  },
  {
    name: "Anna",
    title: "Aliada incansable",
    description:
      "Anna impulsa la aventura con optimismo real y acciones decididas.",
    keywords: ["Fiel", "Perseverante"]
  },
  {
    name: "Moana",
    title: "Navegante audaz",
    description:
      "Moana confia en su intuicion y lidera con valentia contagiosa.",
    keywords: ["Valiente", "Visionaria"]
  },
  {
    name: "Simba",
    title: "Heredero valiente",
    description:
      "Simba demuestra crecimiento constante y un corazon listo para proteger a su gente.",
    keywords: ["Valeroso", "Inspirador"]
  },
  {
    name: "Stitch",
    title: "Experimento adorable",
    description:
      "Stitch combina energia caotica con un afecto enorme por su ohana.",
    keywords: ["Jugueton", "Leal"]
  },
  {
    name: "Mulan",
    title: "Estratega resiliente",
    description:
      "Mulan observa cada detalle y actua con disciplina para defender a su familia.",
    keywords: ["Ingeniosa", "Valiente"]
  },
  {
    name: "Rapunzel",
    title: "Artista luminosa",
    description:
      "Rapunzel ilumina la sala con creatividad ilimitada y ganas de aprender.",
    keywords: ["Creativa", "Curiosa"]
  },
  {
    name: "Hercules",
    title: "Heroe mitico",
    description:
      "Hercules demuestra fuerza y humildad al mismo tiempo, siempre listo para ayudar.",
    keywords: ["Forzudo", "Humilde"]
  },
  {
    name: "Bella",
    title: "Curadora de historias",
    description:
      "Bella comprende la esencia de cada relato y fomenta conversaciones profundas.",
    keywords: ["Intelectual", "Empatica"]
  },
  {
    name: "Aladdin",
    title: "Sonador callejero",
    description:
      "Aladdin halla soluciones ingeniosas incluso con recursos limitados.",
    keywords: ["Ingenioso", "Valiente"]
  },
  {
    name: "Olaf",
    title: "Embajador del abrazo",
    description:
      "Olaf celebra la amistad con humor inocente y calidez reconfortante.",
    keywords: ["Amable", "Entusiasta"]
  },
  {
    name: "Buzz Lightyear",
    title: "Guardian estelar",
    description:
      "Buzz avanza siempre al frente con disciplina espacial y un lema inspirador.",
    keywords: ["Audaz", "Disciplinado"]
  },
  {
    name: "Jengibre",
    title: "Caballero crujiente",
    description:
      "Jengibre defiende a sus amigos de Muy Muy Lejano con ingenio y risas aun en medio del caos.",
    keywords: ["Tenaz", "Ocurrente"]
  },
  {
    name: "Tiana",
    title: "Visionaria culinaria",
    description:
      "Tiana combina disciplina y suenos grandes mientras impulsa a todos a trabajar por lo que aman.",
    keywords: ["Trabajadora", "Inspiradora"]
  },
  {
    name: "Cenicienta",
    title: "Sonadora perseverante",
    description:
      "Cenicienta mantiene esperanza y elegancia incluso bajo presion y contagia calma al equipo.",
    keywords: ["Resiliente", "Amable"]
  },
  {
    name: "Blancanieves",
    title: "Aliada armoniosa",
    description:
      "Blancanieves equilibra talentos muy distintos con alegria y crea redes de apoyo confiables.",
    keywords: ["Empatica", "Dulce"]
  },
  {
    name: "Jasmine",
    title: "Princesa visionaria",
    description:
      "Jasmine rompe limitaciones tradicionales para abrir caminos que dan libertad a quienes la rodean.",
    keywords: ["Valiente", "Curiosa"]
  },
  {
    name: "Pocahontas",
    title: "Mensajera de armonia",
    description:
      "Pocahontas escucha a la naturaleza y une perspectivas diferentes con serenidad valiente.",
    keywords: ["Sabia", "Diplomatica"]
  },
  {
    name: "Merida",
    title: "Arquera indomable",
    description:
      "Merida impulsa a cuestionar tradiciones y a seguir el propio camino con valentia directa.",
    keywords: ["Independiente", "Audaz"]
  }
];

const ACCENT_COLORS = [
  "#6c4cf5",
  "#b44bff",
  "#f3722c",
  "#43aa8b",
  "#f94144",
  "#577590",
  "#f8961e",
  "#6f2dbd",
  "#90be6d"
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const lightenHex = (hex, amount = 0.5) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return hex;
  }

  const numeric = parseInt(normalized, 16);
  const r = (numeric >> 16) & 0xff;
  const g = (numeric >> 8) & 0xff;
  const b = numeric & 0xff;
  const ratio = clamp(amount, 0, 1);
  const toHex = (component) => component.toString(16).padStart(2, "0");

  const newR = Math.round(r + (255 - r) * ratio);
  const newG = Math.round(g + (255 - g) * ratio);
  const newB = Math.round(b + (255 - b) * ratio);

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

const CHARACTERS = BASE_CHARACTERS.map((character, index) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  return {
    ...character,
    accent,
    accentSoft: lightenHex(accent, 0.55)
  };
});

const CharacterCard = ({ character }) => {
  if (!character) {
    return (
      <article className="card card--empty">
        <p>
          Aun no hay carta generada. Pulsa el boton para conocer al personaje
          destacado del dia.
        </p>
      </article>
    );
  }

  return (
    <article
      className="card"
      style={{
        "--accent": character.accent,
        "--accent-soft": character.accentSoft
      }}
    >
      <header className="card__header">
        <span className="card__badge">Personaje destacado</span>
        <h2>{character.name}</h2>
        <p className="card__subtitle">{character.title}</p>
      </header>

      <section className="card__body">
        <p>{character.description}</p>
      </section>

      <footer className="card__footer">
        <ul className="card__keywords">
          {character.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
};

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [history, setHistory] = useState([]);

  const handleReveal = () => {
    const previousName = selectedCharacter?.name;
    const pool = CHARACTERS.filter((character) => character.name !== previousName);
    const candidates = pool.length > 0 ? pool : CHARACTERS;
    const next =
      candidates[Math.floor(Math.random() * candidates.length)];

    setSelectedCharacter(next);
    setHistory((prev) =>
      [next.name, ...prev.filter((name) => name !== next.name)].slice(0, 6)
    );
  };

  return (
    <div className="app">
      <main className="app__layout">
        <section className="intro">
          <h1>Cartas de presentacion Disney</h1>
          <p>
            Presiona el boton para generar una carta unica que destaca las
            fortalezas de un personaje clasico de Disney.
          </p>
        </section>

        <section className="actions">
          <button
            type="button"
            className="app__reveal-button"
            onClick={handleReveal}
          >
            {selectedCharacter ? "Generar otro personaje" : "Revelar personaje"}
          </button>
        </section>

        <section className="card-slot">
          <CharacterCard character={selectedCharacter} />
        </section>

        {history.length > 0 && (
          <section className="app__history">
            <h3>Personajes recientes</h3>
            <ul>
              {history.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
