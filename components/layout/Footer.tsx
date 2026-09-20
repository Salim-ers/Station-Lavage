import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { footerNav, legalNav } from "@/data/navigation";
import { programs } from "@/data/programs";
import { links, station } from "@/data/station";

export function Footer() {
  const socials = Object.entries(station.social).filter(([, url]) => Boolean(url)) as [string, string][];
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-white/10 bg-carbon pb-8 pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-lg">Faites-la briller.</p>
            <p className="mt-5 max-w-sm text-metal">
              Station de lavage automobile à Saint-Maximin, dans l&apos;Oise. Ouverte jour et nuit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                Itinéraire <span className="sr-only">(nouvel onglet)</span>
              </a>
              <a href={links.tel} className="btn btn-secondary btn-sm">
                {station.phone.display}
              </a>
            </div>
          </div>

          <nav aria-label="Plan du site" className="lg:col-span-2">
            <h2 className="t-label text-metal">Navigation</h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-label text-metal">La station</h2>
            <address className="mt-4 space-y-2.5 not-italic text-white/80">
              <p>
                {station.address.street}
                <br />
                {station.address.postalCode} {station.city}, {station.department}
              </p>
              <p className="text-metal">{station.address.complement}</p>
              <p className="flex items-center gap-2.5">
                <span className="gps" aria-hidden="true"><i /></span>
                {station.openingHoursLong}
              </p>
              <p>
                <a href={links.tel} className="nav-link hover:text-white">
                  {station.phone.display}
                </a>
              </p>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-label text-metal">Programmes</h2>
            <p className="mt-4 text-[1.35rem] font-extrabold" style={{ fontStretch: "118%" }}>
              {programs.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && <span className="px-1.5 text-h2au">—</span>}
                  {p.price}&nbsp;€
                </span>
              ))}
            </p>
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-4 text-white/80">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="nav-link capitalize hover:text-white">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none mt-16 select-none leading-none text-white/[.06]">
          <Wordmark className="block text-[29vw] lg:text-[23vw] [&_.wordmark-2]:text-h2au/25" />
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-metal md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {station.name} — {station.subtitle}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
