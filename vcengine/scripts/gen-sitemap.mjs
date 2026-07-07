import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PAGE_SEO, DEFAULT_SEO } from "../src/seo/pageSeo.js";
import { SITE } from "../src/seo/siteConfig.js";

const root = dirname(fileURLToPath(import.meta.url));

function priorityFor(path) {
  if (path === "/") return 1.0;
  if (path === "/documentation" || path === "/resume") return 0.7;
  const depth = path.split("/").filter(Boolean).length;
  return depth <= 2 ? 0.9 : 0.8;
}

const today = new Date().toISOString().slice(0, 10);

const urls = Object.keys(PAGE_SEO)
  .filter((p) => !PAGE_SEO[p].noindex)
  .sort()
  .map((p) => {
    const loc = SITE.origin + (p === "/" ? "/" : p);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(join(root, "..", "public/sitemap.xml"), xml, "utf8");
console.log(`sitemap.xml written with ${Object.keys(PAGE_SEO).filter((p) => !PAGE_SEO[p].noindex).length} URLs`);
