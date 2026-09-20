import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "H2AU Lavage — Saint-Maximin",
    short_name: "H2AU Lavage",
    description: "Station de lavage automobile à Saint-Maximin (60), ouverte 24h/24.",
    start_url: "/",
    display: "standalone",
    background_color: "#070909",
    theme_color: "#070909",
    lang: "fr",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
