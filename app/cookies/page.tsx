import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { CookieControls } from "@/components/sections/CookieControls";
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
          Ce site ne dépose aucun cookie publicitaire ni de mesure d&apos;audience. C&apos;est pourquoi aucun bandeau ne vous est
          imposé à l&apos;arrivée.
        </p>
      </LegalSection>
      <LegalSection title="Ce que le site enregistre dans votre navigateur">
        <ul>
          <li>
            <strong>Animation d&apos;accueil</strong> (stockage de session) : retient que l&apos;animation d&apos;ouverture a déjà été
            jouée. Effacé à la fermeture de l&apos;onglet.
          </li>
          <li>
            <strong>Carte Google Maps</strong> (stockage local) : retient votre accord si vous avez choisi d&apos;afficher la carte.
          </li>
        </ul>
      </LegalSection>
      <LegalSection title="Services tiers">
        <p>
          La carte interactive est fournie par Google Maps. Elle n&apos;est chargée qu&apos;après votre clic ; Google peut alors déposer
          ses propres cookies, régis par sa politique de confidentialité. Les liens « Itinéraire » ouvrent Google Maps dans un
          nouvel onglet.
        </p>
      </LegalSection>
      <LegalSection title="Votre choix">
        <CookieControls />
      </LegalSection>
    </LegalPage>
  );
}
