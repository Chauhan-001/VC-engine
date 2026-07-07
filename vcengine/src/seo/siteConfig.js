export const SITE = {
  name: "VCEngine Media Suite",
  shortName: "VCEngine",
  url: "https://www.vcenginemedia.site",
  origin: "https://www.vcenginemedia.site",
  twitter: "@vcenginemedia",
  locale: "en_US",
  defaultOgImage: "https://www.vcenginemedia.site/og-default.png",
  description:
    "Powerful, secure, client-side tools to compress and convert PDFs, images, audio, and video. No uploads, no accounts, fully private in your browser.",
  business: {
    name: "VCEngine Media",
    email: "support@vcenginemedia.site",
    areaServed: "Worldwide",
    priceRange: "Free",
    sameAs: [
      "https://github.com/Chauhan-001",
      "https://twitter.com/vcenginemedia",
    ],
  },
};

export function canonicalFor(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return `${SITE.origin}${clean}`;
}
