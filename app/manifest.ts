import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bet939 Game",
    short_name: "Bet939",
    description:
      "Independent informational guide for Bet939 Game App users in Pakistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FAF6",
    theme_color: "#F7FAF6",
    lang: "en-PK",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/bet939-logo.webp",
        sizes: "1024x1024",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
