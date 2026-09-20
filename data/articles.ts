/**
 * CONSEILS — mini-blog.
 * Structure pensée pour être branchée plus tard sur un CMS (Sanity, Strapi,
 * Notion, fichiers MDX…) : chaque article est un objet autonome.
 * Les conseils sont généraux : ils ne décrivent pas les services de la station.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "tip"; text: string };

export type Article = {
  slug: string;
  title: string;
  category: "Méthode" | "Carrosserie" | "Jantes" | "Intérieur" | "Saisons" | "Entretien";
  /** zone de la voiture mise en avant dans le visuel de l'article */
  visual: "full" | "wheel" | "front" | "glass" | "side";
  publishedAt: string; // ISO
  excerpt: string;
  sections: { heading: string; blocks: ArticleBlock[] }[];
};

const PUBLISHED = "2026-09-18";

export const articles: Article[] = [
  {
    slug: "comment-bien-laver-sa-voiture",
    title: "Comment bien laver sa voiture ?",
    category: "Méthode",
    visual: "full",
    publishedAt: PUBLISHED,
    excerpt: "Le bon moment, le bon ordre, les bons gestes : la méthode simple pour un résultat net, sans traces.",
    sections: [
      {
        heading: "Choisir le bon moment",
        blocks: [
          { type: "p", text: "Évitez le plein soleil et une carrosserie brûlante : l'eau et les produits sèchent trop vite et laissent des marques. Tôt le matin, en soirée ou par temps couvert, le résultat est plus régulier." },
          { type: "tip", text: "Une station ouverte 24h/24 permet justement de choisir son créneau." },
        ],
      },
      {
        heading: "Rincer avant de frotter",
        blocks: [
          { type: "p", text: "Sable et poussière agissent comme un abrasif. Un premier rinçage généreux les décolle avant tout contact avec la peinture." },
        ],
      },
      {
        heading: "Du haut vers le bas",
        blocks: [
          { type: "p", text: "Toit, vitres, capot et coffre d'abord, puis les flancs, et enfin le bas de caisse, la zone la plus chargée. Vous ne ramenez pas la saleté sur ce qui est déjà propre." },
        ],
      },
      {
        heading: "Rincer complètement",
        blocks: [
          { type: "p", text: "Un rinçage soigné élimine les résidus de produit, notamment dans les joints, autour des rétroviseurs, des poignées et de la plaque." },
        ],
      },
      {
        heading: "Terminer par l'intérieur",
        blocks: [
          { type: "p", text: "Une fois l'extérieur terminé, sortez les tapis, aspirez l'habitacle puis le coffre. Les vitres intérieures se font en dernier." },
        ],
      },
    ],
  },
  {
    slug: "dans-quel-ordre-nettoyer-une-voiture",
    title: "Dans quel ordre nettoyer une voiture ?",
    category: "Méthode",
    visual: "side",
    publishedAt: PUBLISHED,
    excerpt: "Commencer par les jantes, finir par les vitres : l'ordre qui évite de salir ce qui vient d'être lavé.",
    sections: [
      {
        heading: "L'ordre qui fonctionne",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Videz l'habitacle : objets, déchets, tapis.",
              "Jantes et pneus : ce sont les plus sales.",
              "Rinçage de toute la carrosserie.",
              "Lavage du haut vers le bas.",
              "Rinçage final.",
              "Séchage et finitions.",
              "Aspiration, puis vitres intérieures.",
            ],
          },
        ],
      },
      {
        heading: "Pourquoi les jantes d'abord ?",
        blocks: [
          { type: "p", text: "Les jantes concentrent la poussière de freins et la boue. En les nettoyant en premier, les éclaboussures tombent sur une carrosserie qui n'est pas encore lavée." },
        ],
      },
      {
        heading: "Pourquoi l'intérieur en dernier ?",
        blocks: [
          { type: "p", text: "Portes ouvertes pendant le lavage extérieur, l'eau finit dans l'habitacle. Mieux vaut aspirer une fois la carrosserie rincée et les portières refermées." },
        ],
      },
    ],
  },
  {
    slug: "eviter-les-traces-apres-lavage",
    title: "Comment éviter les traces après lavage ?",
    category: "Carrosserie",
    visual: "glass",
    publishedAt: PUBLISHED,
    excerpt: "Calcaire, produit qui sèche, chiffon sale : les causes des traces, et comment les éviter.",
    sections: [
      {
        heading: "D'où viennent les traces",
        blocks: [
          { type: "p", text: "La plupart des traces sont des minéraux contenus dans l'eau, qui restent sur la carrosserie quand les gouttes sèchent. Les résidus de produit mal rincés en laissent aussi." },
        ],
      },
      {
        heading: "Les bons réflexes",
        blocks: [
          {
            type: "list",
            items: [
              "Pas de lavage en plein soleil ni sur une carrosserie chaude.",
              "Ne laissez jamais sécher un produit sur la peinture.",
              "Rincez abondamment, en insistant sur les joints et les recoins.",
              "Séchez rapidement avec une microfibre propre et sèche.",
            ],
          },
        ],
      },
      {
        heading: "Les vitres",
        blocks: [
          { type: "p", text: "Essuyez-les en dernier, avec une microfibre dédiée, en mouvements droits plutôt que circulaires. Une fois à l'intérieur, une autre microfibre sèche suffit souvent." },
        ],
      },
    ],
  },
  {
    slug: "comment-nettoyer-des-jantes",
    title: "Comment nettoyer des jantes ?",
    category: "Jantes",
    visual: "wheel",
    publishedAt: PUBLISHED,
    excerpt: "Poussière de freins, goudron, boue : la méthode pour des jantes nettes sans les abîmer.",
    sections: [
      {
        heading: "Attendre qu'elles refroidissent",
        blocks: [
          { type: "p", text: "Après un trajet, les freins chauffent les jantes. Un produit appliqué sur une jante chaude sèche trop vite et peut laisser des marques." },
        ],
      },
      {
        heading: "Rincer, puis nettoyer",
        blocks: [
          { type: "p", text: "Un premier rinçage retire la boue et une partie de la poussière. Utilisez ensuite un produit adapté au type de jante — aluminium, acier, vernie — en vérifiant l'étiquette." },
        ],
      },
      {
        heading: "Un outil réservé aux roues",
        blocks: [
          { type: "p", text: "La poussière de freins est métallique et abrasive. La brosse ou l'éponge des jantes ne doit jamais servir sur la carrosserie." },
          { type: "tip", text: "Pensez à l'arrière des rayons et au flanc des pneus : c'est là que la saleté s'accumule." },
        ],
      },
    ],
  },
  {
    slug: "a-quelle-frequence-laver-sa-voiture",
    title: "À quelle fréquence laver sa voiture ?",
    category: "Entretien",
    visual: "side",
    publishedAt: PUBLISHED,
    excerpt: "Pas de règle unique : usage, stationnement et saison changent tout. Nos repères.",
    sections: [
      {
        heading: "Un repère général",
        blocks: [
          { type: "p", text: "Pour un usage courant, un lavage toutes les deux à trois semaines garde la carrosserie saine. C'est un repère, pas une règle : l'environnement compte autant que le kilométrage." },
        ],
      },
      {
        heading: "Quand laver plus souvent",
        blocks: [
          {
            type: "list",
            items: [
              "En hiver, quand les routes sont salées.",
              "Après un long trajet sur autoroute : les insectes s'accumulent.",
              "Si la voiture dort sous un arbre : sève et fientes.",
              "Après un passage sur un chantier ou un chemin boueux.",
            ],
          },
        ],
      },
      {
        heading: "Ne pas attendre",
        blocks: [
          { type: "p", text: "Fientes, sève et insectes attaquent le vernis s'ils restent plusieurs jours, surtout au soleil. Mieux vaut les retirer vite, même entre deux lavages complets." },
        ],
      },
    ],
  },
  {
    slug: "pourquoi-laver-sa-voiture-en-hiver",
    title: "Pourquoi laver sa voiture en hiver ?",
    category: "Saisons",
    visual: "front",
    publishedAt: PUBLISHED,
    excerpt: "Le sel de déneigement ne s'arrête pas à la carrosserie. Pourquoi l'hiver est la saison où laver compte le plus.",
    sections: [
      {
        heading: "Le sel, ennemi discret",
        blocks: [
          { type: "p", text: "Le sel répandu sur les routes favorise la corrosion. Il se loge sous la voiture, dans les passages de roue et sur le bas de caisse, là où on ne le voit pas." },
        ],
      },
      {
        heading: "Voir et être vu",
        blocks: [
          { type: "p", text: "Boue et projections ternissent les phares, les vitres, les rétroviseurs et les capteurs d'aide à la conduite. Un véhicule propre, c'est aussi une meilleure visibilité." },
        ],
      },
      {
        heading: "Les bons gestes par temps froid",
        blocks: [
          {
            type: "list",
            items: [
              "Lavez régulièrement pendant les périodes de salage.",
              "Insistez sur le bas de caisse et les passages de roue.",
              "Essuyez les joints de portes pour éviter qu'ils ne collent au gel.",
              "Par grand froid, séchez serrures et joints avant de repartir.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "enlever-les-insectes-sur-une-carrosserie",
    title: "Comment enlever les insectes sur une carrosserie ?",
    category: "Carrosserie",
    visual: "front",
    publishedAt: PUBLISHED,
    excerpt: "Pare-chocs, rétroviseurs, pare-brise : ramollir d'abord, jamais gratter à sec.",
    sections: [
      {
        heading: "Agir vite",
        blocks: [
          { type: "p", text: "Les résidus d'insectes sont acides et durcissent au soleil. Plus ils restent, plus ils marquent le vernis." },
        ],
      },
      {
        heading: "Ramollir avant de retirer",
        blocks: [
          { type: "p", text: "Humidifiez longuement la zone — un chiffon mouillé posé quelques minutes fonctionne bien — ou utilisez un produit spécifique. Les résidus partent ensuite sans forcer." },
          { type: "tip", text: "Ne grattez jamais à sec : c'est la meilleure façon de rayer la peinture." },
        ],
      },
      {
        heading: "Les zones à surveiller",
        blocks: [
          { type: "list", items: ["Pare-chocs avant et calandre.", "Coques de rétroviseurs.", "Pare-brise : le lave-glace ne suffit pas toujours.", "Plaque et phares avant."] },
        ],
      },
    ],
  },
  {
    slug: "nettoyer-l-interieur-de-sa-voiture",
    title: "Comment nettoyer correctement l'intérieur d'une voiture ?",
    category: "Intérieur",
    visual: "glass",
    publishedAt: PUBLISHED,
    excerpt: "Tapis, sièges, rails, coffre : un habitacle propre en quelques étapes, dans le bon ordre.",
    sections: [
      {
        heading: "Vider, puis sortir les tapis",
        blocks: [
          { type: "p", text: "Retirez objets et déchets, sortez les tapis et secouez-les. Vous les aspirerez à part, c'est plus rapide et plus efficace." },
        ],
      },
      {
        heading: "Aspirer du haut vers le bas",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Sièges et assises, en insistant dans les plis.",
              "Entre les sièges et la console.",
              "Rails : avancez puis reculez chaque siège.",
              "Plancher, puis tapis.",
              "Coffre en dernier.",
            ],
          },
        ],
      },
      {
        heading: "Surfaces et vitres",
        blocks: [
          { type: "p", text: "Une microfibre légèrement humide suffit pour le tableau de bord. Évitez les produits gras sur le volant et les pédales. Les vitres intérieures se font en dernier, puis aérez." },
        ],
      },
    ],
  },
  {
    slug: "haute-pression-les-bons-reflexes",
    title: "Haute pression : les bons réflexes",
    category: "Méthode",
    visual: "side",
    publishedAt: PUBLISHED,
    excerpt: "Distance, angle, zones sensibles : utiliser une lance haute pression sans abîmer sa voiture.",
    sections: [
      {
        heading: "Garder ses distances",
        blocks: [
          { type: "p", text: "Une lance trop proche peut abîmer joints, autocollants ou retouches de peinture. Une trentaine de centimètres est un repère souvent conseillé, davantage sur les zones fragiles." },
        ],
      },
      {
        heading: "Incliner le jet",
        blocks: [
          { type: "p", text: "Un jet légèrement incliné fait glisser la saleté ; un jet perpendiculaire la frappe. Travaillez du haut vers le bas, par zones." },
        ],
      },
      {
        heading: "Zones à ménager",
        blocks: [
          { type: "list", items: ["Joints de portes et de vitres.", "Phares, capteurs et caméras.", "Flancs des pneus.", "Éclats ou retouches de peinture."] },
        ],
      },
      {
        heading: "Sécurité",
        blocks: [
          { type: "p", text: "Tenez la lance fermement, ne la dirigez jamais vers une personne ou un animal, et suivez toujours les consignes affichées sur l'équipement." },
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}

export function readingTime(article: Article) {
  const text = article.sections
    .flatMap((s) => [s.heading, ...s.blocks.map((b) => (b.type === "list" ? b.items.join(" ") : b.text))])
    .join(" ");
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.round(words / 180));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
