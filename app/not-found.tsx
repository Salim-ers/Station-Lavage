import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { JetRule } from "@/components/ui/Reveal";
import { CarSilhouette } from "@/components/visuals/CarSilhouette";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-carbon pb-24 pt-32">
      <div className="container-x relative z-10">
        <p className="t-label text-h2au-bright">Erreur 404</p>
        <h1 className="t-mega mt-6">
          Mauvaise
          <br />
          piste.
        </h1>
        <JetRule className="mt-8 w-28" />
        <p className="t-lead mt-8 text-metal">Cette page n&apos;existe pas ou a changé d&apos;adresse. La station, elle, n&apos;a pas bougé.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
          <ButtonLink href="/programmes" variant="secondary">
            Les programmes
          </ButtonLink>
        </div>
        <p className="mt-10 text-sm text-metal">
          Besoin d&apos;aide ? <Link href="/contact" className="nav-link text-white">Contactez-nous</Link>
        </p>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -right-[20%] bottom-[4%] w-[90%] opacity-40 md:w-[60%]">
        <CarSilhouette dirt={0.8} shine={0} />
      </div>
    </section>
  );
}
