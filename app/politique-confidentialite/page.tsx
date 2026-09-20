import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { Placeholder } from "@/components/ui/Reveal";
import { fullAddress, links, station, TODO } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Politique de confidentialité",
    description: "Comment H2AU Lavage traite les données personnelles transmises via le site (formulaire de contact).",
    path: "/politique-confidentialite",
  }),
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  const who = station.legal.companyName ?? station.name;
  return (
    <LegalPage title="Politique de confidentialité">
      <LegalSection title="Responsable du traitement">
        <p>
          {who}, {fullAddress}. Téléphone : <a href={links.tel}>{station.phone.display}</a>. E-mail :{" "}
          {station.email ?? <Placeholder>{TODO.info}</Placeholder>}.
        </p>
      </LegalSection>
      <LegalSection title="Données collectées">
        <p>Le site ne collecte des données personnelles que lorsque vous utilisez le formulaire de contact :</p>
        <ul>
          <li>prénom et nom ;</li>
          <li>adresse e-mail ;</li>
          <li>numéro de téléphone (facultatif) ;</li>
          <li>sujet et contenu de votre message.</li>
        </ul>
        <p>Aucun outil de mesure d&apos;audience ni de publicité n&apos;est utilisé.</p>
      </LegalSection>
      <LegalSection title="Finalité et base légale">
        <p>Ces données servent uniquement à répondre à votre demande. Le traitement repose sur votre consentement, donné en cochant la case du formulaire.</p>
      </LegalSection>
      <LegalSection title="Destinataires">
        <p>
          Les messages sont transmis à l&apos;exploitant de la station. Prestataire technique utilisé pour l&apos;acheminement des
          messages : <Placeholder>{TODO.info}</Placeholder>. Vos données ne sont ni vendues ni cédées.
        </p>
      </LegalSection>
      <LegalSection title="Durée de conservation">
        <p>
          <Placeholder>{TODO.info}</Placeholder> (durée à préciser par l&apos;exploitant ; à titre d&apos;usage, le temps nécessaire au
          traitement de la demande).
        </p>
      </LegalSection>
      <LegalSection title="Vos droits">
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de retrait
          de votre consentement. Pour les exercer, contactez-nous avec les coordonnées ci-dessus.
        </p>
        <p>
          Vous pouvez également adresser une réclamation à la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>
      <LegalSection title="Cookies">
        <p>
          Voir la page <Link href="/cookies">gestion des cookies</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
