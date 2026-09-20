import Link from "next/link";
import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { Placeholder } from "@/components/ui/Reveal";
import { fullAddress, links, siteUrl, station, TODO } from "@/data/station";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: "Mentions légales", description: "Mentions légales du site H2AU Lavage, station de lavage à Saint-Maximin.", path: "/mentions-legales" }),
  robots: { index: false, follow: true },
};

const v = (x: string | null) => x ?? <Placeholder>{TODO.info}</Placeholder>;

export default function MentionsLegales() {
  const l = station.legal;
  return (
    <LegalPage title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <dl>
          <dt>Nom commercial</dt>
          <dd>{station.name} ({station.subtitle})</dd>
          <dt>Raison sociale</dt>
          <dd>{v(l.companyName)}</dd>
          <dt>Forme juridique</dt>
          <dd>{v(l.legalForm)}</dd>
          <dt>SIRET</dt>
          <dd>{v(l.siret)}</dd>
          <dt>RCS</dt>
          <dd>{v(l.rcs)}</dd>
          <dt>TVA intracommunautaire</dt>
          <dd>{v(l.vat)}</dd>
          <dt>Adresse</dt>
          <dd>{fullAddress}</dd>
          <dt>Téléphone</dt>
          <dd>
            <a href={links.tel}>{station.phone.display}</a>
          </dd>
          <dt>E-mail</dt>
          <dd>{v(station.email)}</dd>
          <dt>Directeur de la publication</dt>
          <dd>{v(l.director)}</dd>
        </dl>
      </LegalSection>
      <LegalSection title="Hébergement">
        <p>{v(l.host)}</p>
      </LegalSection>
      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus de ce site (textes, photographies, illustrations, logo, mise en page) est protégé par le droit
          de la propriété intellectuelle. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les illustrations de véhicules présentes sur le site sont des créations graphiques : elles ne représentent pas des
          réalisations de la station. Elles sont signalées comme « démonstration visuelle » lorsque c&apos;est nécessaire.
        </p>
      </LegalSection>
      <LegalSection title="Informations affichées">
        <p>
          Les tarifs et informations pratiques sont donnés à titre indicatif et peuvent évoluer. En cas de différence, les
          informations affichées à la station font foi.
        </p>
      </LegalSection>
      <LegalSection title="Données personnelles et cookies">
        <p>
          Voir la <Link href="/politique-confidentialite">politique de confidentialité</Link> et la page{" "}
          <Link href="/cookies">gestion des cookies</Link>.
        </p>
      </LegalSection>
      <p className="mt-12 text-sm text-graphite">Site : {siteUrl}</p>
    </LegalPage>
  );
}
