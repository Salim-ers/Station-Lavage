import Image from "next/image";
import Link from "next/link";
import { RevealLines, JetRule } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { StationInfo } from "@/components/sections/StationInfo";
import { photos } from "@/data/media";

/** 08 — La station : photo 65 % / informations 35 %. */
export function StationBlock() {
  return (
    <section className="section-white py-24 md:py-36" data-wash-step="08" data-wash-label="Brillance" aria-labelledby="station-title">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div data-reveal="clip" className="zoom-img relative aspect-[4/3] overflow-hidden rounded-[var(--radius-medium)] lg:col-span-8 lg:aspect-auto lg:min-h-[640px]">
          <Image
            src={photos.heroStation.src}
            alt={photos.heroStation.alt}
            fill
            sizes="(min-width: 1024px) 64vw, 100vw"
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: "62% 50%" }}
          />
          <span className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-carbon/75 px-3.5 py-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-white backdrop-blur md:bottom-6 md:left-6">
            <span className="gps" aria-hidden="true">
              <i />
            </span>
            Vous êtes arrivé
          </span>
        </div>

        <div className="flex flex-col justify-end lg:col-span-4">
          <p className="t-label text-graphite">La station</p>
          <RevealLines id="station-title" lines={["H2AU.", "Saint-Maximin."]} className="t-lg mt-4" />
          <JetRule className="mt-6 w-24" delay={250} />
          <StationInfo className="mt-10" />
          <Link href="/station" className="nav-link mt-8 inline-flex w-fit items-center gap-2 font-semibold">
            Découvrir la station <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
