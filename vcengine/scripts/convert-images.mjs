import sharp from "sharp";
import { readdir, mkdir, access, unlink, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assetsDir = join(root, "src", "assets");
const publicDir = join(root, "public");
const TMP = "C:\\Users\\rajpu\\AppData\\Local\\Temp\\kilo";

const HERO_SOURCES = ["powerful.webp", "private.webp", "lightning-fast.webp"];

// images that are displayed very small -> cap their intrinsic width tightly
const SMALL = {
  "logo.webp": 300,
  "shield.webp": 64,
  "github.webp": 64,
  "linkedin.webp": 64,
  "audio.webp": 256,
  "image.webp": 256,
  "pdf.webp": 256,
  "video.webp": 256,
  "resume.webp": 256,
};

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function compressAssets() {
  const files = (await readdir(assetsDir)).filter(
    (f) => extname(f).toLowerCase() === ".webp"
  );
  for (const file of files) {
    const src = join(assetsDir, file);
    const img = sharp(src);
    const meta = await img.metadata();
    let width = meta.width;
    const maxW = SMALL[file] ?? 800;
    if (width > maxW) width = maxW;
    const tmp = join(TMP, `${basename(file)}.tmp`);
    await mkdir(TMP, { recursive: true });
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(tmp);
    try {
      execSync(
        `powershell -NoProfile -Command "Copy-Item -Path '${tmp.replace(/'/g, "''")}' -Destination '${src.replace(/'/g, "''")}' -Force"`
      );
    } catch (err) {
      console.warn(`skip ${file} (write blocked by sync): ${err.message.split("\n")[0]}`);
    }
    await unlink(tmp).catch(() => {});
    let after;
    try {
      after = await sharp(src).metadata();
    } catch {
      after = { width, height: "?" };
    }
    const size = (await import("node:fs")).statSync(src).size;
    console.log(
      `compress ${file}: ${meta.width}x${meta.height} -> ${after.width}x${after.height} (${(size / 1024).toFixed(1)}KB)`
    );
  }
}

// Generate properly-sized, public-served copies of critical (above-the-fold)
// images. We read the source (read-only) and write new files into /public so
// we never need to overwrite the OneDrive-locked source assets.
const PUBLIC_COPIES = {
  "logo.webp": { name: "logo-288.webp", width: 288, quality: 86 },
  "shield.webp": { name: "shield-64.webp", width: 64, quality: 86 },
  "private.webp": { name: "preview-private-800.webp", width: 800, quality: 82 },
  "lightning-fast.webp": { name: "preview-lightning-800.webp", width: 800, quality: 82 },
};

async function generatePublicCopies() {
  await mkdir(publicDir, { recursive: true });
  for (const [srcFile, cfg] of Object.entries(PUBLIC_COPIES)) {
    const src = join(assetsDir, srcFile);
    if (!(await exists(src))) {
      console.warn(`skip ${cfg.name}: source missing`);
      continue;
    }
    const out = join(publicDir, cfg.name);
    await sharp(src)
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: 6 })
      .toFile(out);
    const m = await sharp(out).metadata();
    const size = (await import("node:fs")).statSync(out).size;
    console.log(`public copy ${cfg.name}: ${m.width}x${m.height} (${(size / 1024).toFixed(1)}KB)`);
  }
}

async function generateHero() {
  const source = join(assetsDir, "powerful.webp");
  if (!(await exists(source))) {
    console.warn("hero source missing, skipping");
    return;
  }
  const meta = await sharp(source).metadata();
  const ratio = meta.height / meta.width;
  const widths = [400, 800, 1200];
  if (!(await exists(publicDir))) await mkdir(publicDir, { recursive: true });

  for (const w of widths) {
    const h = Math.round(w * ratio);
    await sharp(source)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 58, effort: 6 })
      .toFile(join(publicDir, `hero-lcp-${w}.avif`));
    await sharp(source)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(join(publicDir, `hero-lcp-${w}.webp`));
    console.log(`hero-lcp ${w}x${h} generated`);
  }
  // expose intrinsic size for the markup
  const out = join(publicDir, "hero-lcp.sizes.json");
  await import("node:fs").then((fs) =>
    fs.writeFileSync(out, JSON.stringify({ width: 1200, height: Math.round(1200 * ratio) }))
  );
}

async function main() {
  if (!process.env.SKIP_COMPRESS) {
    console.log("== compressing assets (best-effort) ==");
    await compressAssets();
  }
  console.log("== generating public image copies ==");
  await generatePublicCopies();
  console.log("== generating hero LCP images ==");
  await generateHero();
  console.log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
