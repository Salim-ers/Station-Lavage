import { RevealLines, JetRule } from "@/components/ui/Reveal";
import { StationMap } from "@/components/sections/StationMap";
import { StationInfo } from "@/components/sections/StationInfo";

/** Localisation / itinéraire. */
export function MapSection() {
  return (
    <section className="bg-carbon py-24 md:py-32" aria-labelledby="map-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <RevealLines id="map-title" lines={["Direction", "Saint-Maximin."]} className="t-lg" />
          <JetRule className="mt-6 w-24" delay={250} />
          <StationInfo tone="dark" className="mt-10" />
        </div>
        <div className="lg:col-span-7">
          <StationMap />
        </div>
      </div>
    </section>
  );
}
