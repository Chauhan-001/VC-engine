import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE, canonicalFor } from "./siteConfig";
import { PAGE_SEO, DEFAULT_SEO } from "./pageSeo";

function buildBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ name: "Home", url: SITE.origin + "/" }];
  let acc = "";
  const labels = {
    pdf: "PDF Tools",
    image: "Image Tools",
    audio: "Audio Tools",
    video: "Video Tools",
    resume: "Resume Tools",
    documentation: "Documentation",
  };
  segments.forEach((seg, i) => {
    acc += "/" + seg;
    const isLast = i === segments.length - 1;
    const name = labels[seg]
      ? labels[seg]
      : seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({
      name: isLast ? name : name,
      url: SITE.origin + acc,
    });
  });
  return crumbs;
}

function buildJsonLd(pathname, meta) {
  const graph = [
    {
      "@type": "Organization",
      "@id": SITE.origin + "/#organization",
      name: SITE.name,
      url: SITE.origin + "/",
      logo: SITE.origin + "/favicon.svg",
      sameAs: SITE.business.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": SITE.origin + "/#website",
      name: SITE.name,
      url: SITE.origin + "/",
      inLanguage: "en",
      publisher: { "@id": SITE.origin + "/#organization" },
    },
    {
      "@type": "LocalBusiness",
      "@id": SITE.origin + "/#localbusiness",
      name: SITE.business.name,
      url: SITE.origin + "/",
      email: SITE.business.email,
      areaServed: SITE.business.areaServed,
      priceRange: SITE.business.priceRange,
      parentOrganization: { "@id": SITE.origin + "/#organization" },
    },
  ];

  const crumbs = buildBreadcrumbs(pathname);
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  });

  if (pathname !== "/") {
    graph.push({
      "@type": "Service",
      name: meta.title.split(" — ")[0].split(" | ")[0],
      description: meta.description,
      serviceType: "Online Tool",
      provider: { "@id": SITE.origin + "/#organization" },
      areaServed: SITE.business.areaServed,
      url: canonicalFor(pathname),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });
  }

  if (meta.faq && meta.faq.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: meta.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export default function Seo() {
  const { pathname } = useLocation();
  const key = pathname.replace(/\/+$/, "") || "/";
  const meta = PAGE_SEO[key] || {};
  const title = meta.title || DEFAULT_SEO.title;
  const description = meta.description || DEFAULT_SEO.description;
  const canonical = canonicalFor(pathname);
  const robots = meta.noindex ? "noindex,nofollow" : "index,follow";
  const jsonLd = buildJsonLd(key, meta);

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {meta.keywords && meta.keywords.length ? (
        <meta name="keywords" content={meta.keywords.join(", ")} />
      ) : null}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={meta.ogType || "website"} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={SITE.defaultOgImage} />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE.defaultOgImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
