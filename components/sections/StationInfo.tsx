import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { links, station } from "@/data/station";
import { cn } from "@/lib/utils";

/** Bloc d'informations pratiques (adresse, horaires, téléphone) + actions. */
export function StationInfo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const muted = dark ? "text-metal" : "text-graphite";
  const rule = dark ? "border-white/12" : "border-carbon/12";
  return (
    <div className={className}>
      <dl className={cn("border-t", rule)}>
        <div className={cn("grid grid-cols-[2rem_1fr] gap-x-3 border-b py-5", rule)}>
          <dt className="pt-0.5">
            <Icon name="pin" className={cn("size-5", dark ? "text-h2au-bright" : "text-h2au-deep")} />
            <span className="sr-only">Adresse</span>
          </dt>
          <dd>
            <address className="not-italic">
              <span className="font-semibold">{station.address.street}</span>
              <br />
              {station.address.postalCode} {station.city} ({station.departmentCode})
              <br />
              <span className={cn("text-sm", muted)}>{station.address.complement}</span>
            </address>
          </dd>
        </div>
        <div className={cn("grid grid-cols-[2rem_1fr] items-center gap-x-3 border-b py-5", rule)}>
          <dt>
            <span className="gps ml-0.5" aria-hidden="true">
              <i />
            </span>
            <span className="sr-only">Horaires</span>
          </dt>
          <dd className="font-semibold">{station.openingHoursLong}</dd>
        </div>
        <div className={cn("grid grid-cols-[2rem_1fr] items-center gap-x-3 border-b py-5", rule)}>
          <dt>
            <Icon name="phone" className={cn("size-5", dark ? "text-h2au-bright" : "text-h2au-deep")} />
            <span className="sr-only">Téléphone</span>
          </dt>
          <dd>
            <a href={links.tel} className="nav-link font-semibold">
              {station.phone.display}
            </a>
          </dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={links.directions} leadingIcon="pin" icon={null} cursor="→">
          Itinéraire
        </ButtonLink>
        <ButtonLink href={links.tel} variant={dark ? "secondary" : "secondary-dark"} leadingIcon="phone" icon={null} cursor="GO">
          Appeler
        </ButtonLink>
      </div>
    </div>
  );
}
