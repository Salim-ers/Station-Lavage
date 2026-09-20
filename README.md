# H2AU Lavage — site vitrine

Site de la station de lavage **H2AU Lavage (Saint-Maximin Lavage)**, Saint-Maximin (Oise).
Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev                  # http://localhost:3000
npm run build && npm start   # version de production
npm run typecheck
```

Node 20.9 ou plus récent. Déploiement conseillé : Vercel (aucune configuration supplémentaire).

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domaine définitif (canonical, sitemap, Open Graph, données structurées). |
| `CONTACT_WEBHOOK_URL` | Webhook qui reçoit les messages du formulaire en JSON (Make, Zapier, n8n, Formspree…). Sans lui, le formulaire affiche un message invitant à appeler. |

## Modifier le contenu : tout est dans `data/`

| Fichier | Contenu |
| --- | --- |
| `data/station.ts` | Nom, adresse, téléphone, horaires, e-mail, paiement, réseaux sociaux, informations légales, liens (itinéraire, carte, avis). |
| `data/programs.ts` | Les 3 programmes (6 €, 8 €, 12 €) : description, options, durée. |
| `data/equipment.ts` | Équipements. Seuls ceux marqués `confirmed: true` sont affichés. |
| `data/media.ts` | Photos, galerie, avant/après. |
| `data/reviews.ts` | Avis clients réels et note Google. |
| `data/articles.ts` | Articles « Conseils » (structure prête pour un CMS). |
| `data/faq.ts` | Questions fréquentes. |
| `data/navigation.ts` | Menus. |

Tant qu'une information vaut `null` ou `[]`, le site affiche un emplacement du type
`[DÉTAILS À RENSEIGNER]` : il suffit de compléter le fichier, sans toucher aux composants.

## Photos

Les photos actuelles viennent de la fiche Google (basse résolution) : elles ont été retouchées
(exposition, contraste, étalonnage) sans modifier la station. Pour les remplacer par des originaux HD,
déposer les fichiers dans `assets/photos/` en gardant les mêmes noms :

- `station-auvent.jpg`, `hero-station.jpg` (version étalonnée), `hero-station-sale.jpg` (effet « pare-brise sale » du Hero) ;
- `portique-rouleaux-etalonne.jpg`.

Pour ajouter une photo : l'importer dans `data/media.ts` puis l'ajouter à `gallery`.
Pour activer le comparateur avant/après avec de vraies photos : renseigner `beforeAfter.before` et `beforeAfter.after`.

## Informations à fournir par la station

- Contenu des 3 programmes (prestations, options, durée).
- Modes de paiement.
- Confirmation de l'adresse (relevée sur Google) et coordonnées GPS.
- Confirmation des horaires 7j/7 (le site affiche « 24h/24, 7j/7 »).
- Équipements disponibles en plus des rouleaux et de l'aspiration (haute pression, mousse, lustrage…).
- Informations légales (raison sociale, SIRET, RCS, TVA, directeur de publication, hébergeur), e-mail.
- Durée de conservation des messages et prestataire du formulaire (politique de confidentialité).
- Réseaux sociaux, avis clients à mettre en avant, photos HD.

## Organisation du code

```
app/                 pages (accueil, programmes, equipements, comment-ca-marche, station,
                     conseils/[slug], contact, pages légales), API contact, SEO (sitemap, robots, manifest, images)
components/home/     sections de l'accueil
components/sections/ blocs réutilisables (carte programme, galerie, comparateur, carte, formulaire…)
components/layout/   navigation, pied de page, barre mobile, curseur, progression du lavage
components/visuals/  illustration de voiture, transition mousse
lib/                 SEO, validation du formulaire, utilitaires
public/textures/     textures générées (mousse, salissures, grain)
```

## Accessibilité, performance, vie privée

- Navigation clavier complète, lien d'évitement, focus visibles, menu mobile avec piège de focus.
- `prefers-reduced-motion` respecté : animations et effets désactivés, contenu intact.
- Sans JavaScript, tout le contenu reste visible.
- Images optimisées (AVIF/WebP), police locale, pages statiques.
- Aucun traceur ni cookie publicitaire : pas de bandeau imposé. La carte Google Maps ne se charge qu'après un clic (choix réversible sur `/cookies`).
- Les illustrations de voiture sont signalées comme « démonstration visuelle ».
