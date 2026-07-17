import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  // @ts-ignore
  devIndicators: {
    appIsrStatus: false,
  },
  // @ts-ignore
  allowedDevOrigins: ["192.168.178.68", "localhost:3000"],

  /**
   * Redirects from the previous (Astro) site's URLs.
   *
   * That site served French at the root (`/mentions-legales`) and prefixed only
   * en/ht; this one is locale-prefixed throughout, with one shared Kreyòl slug
   * per route. These two documents are statutory (§ 5 TMG / GDPR) and are cited
   * from outside the site, so their old URLs must keep resolving.
   *
   * `/ht/enfomasyon-legal` and `/ht/konfidansyalite` need no entry — the old
   * paths are identical to the new routes.
   */
  async redirects() {
    return [
      // Impressum / mentions légales — § 5 TMG
      { source: "/mentions-legales", destination: "/fr/enfomasyon-legal", permanent: true },
      { source: "/en/imprint", destination: "/en/enfomasyon-legal", permanent: true },
      // Privacy policy — GDPR
      { source: "/confidentialite", destination: "/fr/konfidansyalite", permanent: true },
      { source: "/en/privacy", destination: "/en/konfidansyalite", permanent: true },
    ];
  },
};

export default nextConfig;
