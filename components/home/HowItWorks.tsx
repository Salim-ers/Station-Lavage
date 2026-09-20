import { SectionHeading } from "@/components/ui/SectionHeading";
import { WashTimeline } from "@/components/sections/WashTimeline";
import { ButtonLink } from "@/components/ui/Button";
import { programs } from "@/data/programs";
import { station } from "@/data/station";

/** 07 — Comment ça marche (anthracite). */
export function HowItWorks() {
  const steps = [
    { title: "J'arrive à la station", text: <>{station.address.complement}, {station.city}.</> },
    {
      title: "Je choisis mon programme",
      text: (
        <span className="flex gap-3 text-lg font-extrabold text-white" style={{ fontStretch: "118%" }}>
          {programs.map((p) => (
            <span key={p.id}>{p.price}&nbsp;€</span>
          ))}
        </span>
      ),
    },
    { title: "Je lance mon lavage", text: "Le programme choisi, c'est parti." },
    { title: "Je laisse le programme faire son travail", text: "Quelques minutes, et la saleté a disparu." },
    { title: "Je reprends la route", text: "Propre. Et ça se voit." },
  ];

  return (
    <section className="relative bg-anthracite pt-24 lg:pt-0" data-wash-step="07" data-wash-label="Finition" aria-labelledby="how-title">
      <div className="container-x pb-24 lg:pb-0">
        <WashTimeline
          steps={steps}
          header={<SectionHeading id="how-title" title={["Quelques minutes.", "Un autre visage."]} intro="Cinq étapes, du parking à la route." />}
        />
      </div>
      <div className="container-x pb-24 md:pb-32">
        <ButtonLink href="/comment-ca-marche" variant="secondary">
          Le fonctionnement en détail
        </ButtonLink>
      </div>
    </section>
  );
}
