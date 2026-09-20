import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { Loader } from "@/components/layout/Loader";
import { JsonLd, stationJsonLd, SITE_NAME } from "@/lib/seo";
import { siteUrl } from "@/data/station";

const archivo = localFont({
  src: "./fonts/archivo-variable-latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "H2AU Lavage — Station de lavage auto à Saint-Maximin (60), ouverte 24h/24",
    template: "%s | H2AU Lavage Saint-Maximin",
  },
  description:
    "H2AU Lavage, station de lavage automobile à Saint-Maximin (Oise). Ouverte 24h/24. Trois programmes : 6 €, 8 € et 12 €.",
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070909",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Exécuté avant l'affichage :
 * - html.js : active les révélations au scroll
 * - html.first-visit : loader à la première arrivée sur l'accueil (une fois par session)
 * - filet de sécurité : si les scripts ne démarrent pas, tout le contenu reste visible
 */
const initScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&!sessionStorage.getItem('h2au-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){sessionStorage.setItem('h2au-intro','1');d.classList.add('first-visit');setTimeout(function(){d.classList.remove('first-visit');d.classList.add('no-intro')},2200)}else{d.classList.add('no-intro')}}catch(e){d.classList.add('no-intro')}setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.add('reveal-fallback')},3000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        <JsonLd data={stationJsonLd()} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Loader />
        <Providers>
          <Navbar />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileStickyBar />
          <CustomCursor />
          <RevealObserver />
        </Providers>
      </body>
    </html>
  );
}
