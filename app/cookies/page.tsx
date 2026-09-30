import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Gestion des cookies", description: "Cookies et stockage utilisés sur le site H2AU Lavage.", path: "/cookies" }),
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Gestion des cookies">
      <LegalSection title="En bref">
        <p>
          Ce site ne dépose lui-même aucun cookie publicitaire ni de mesure d&apos;audience. C&apos;est pourquoi aucun bandeau ne
          vous est imposé à l&apos;arrivée.
        </p>
      </LegalSection>
      <LegalSection title="Ce que le site enregistre dans votre navigateur">
        <ul>
          <li>
            <strong>Animation d&apos;accueil</strong> (stockage de session) : retient que l&apos;animation d&apos;ouverture a déjà été
            jouée. Effacé à la fermeture de l&apos;onglet.
          </li>
        </ul>
      </LegalSection>
      <LegalSection title="Services tiers">
        <p>
          La carte affichée sur le site (page « La station ») est directement fournie par Google Maps : elle se charge dès
          l&apos;affichage de la page, et Google peut y déposer ses propres cookies, régis par sa politique de confidentialité.
          Les liens « Itinéraire » ouvrent Google Maps dans un nouvel onglet.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
