import { memo } from "react";

const LCP_WIDTH = 1200;
const LCP_HEIGHT = 800;

const heroSrcSetAvif = [
  "/hero-lcp-400.avif 400w",
  "/hero-lcp-800.avif 800w",
  "/hero-lcp-1200.avif 1200w",
].join(", ");

const heroSrcSetWebp = [
  "/hero-lcp-400.webp 400w",
  "/hero-lcp-800.webp 800w",
  "/hero-lcp-1200.webp 1200w",
].join(", ");

const sizes = "(max-width: 768px) 90vw, 400px";

function BrowserPreview() {
  return (
    <div
      className="
        mt-16
        w-full
        max-w-6xl
        overflow-hidden
        border-[3px]
        border-black
        bg-[#1a1a1a]
        shadow-[12px_12px_0px_0px_black]
      "
    >
      {/* Browser Top Bar */}
      <div className="flex h-12 items-center border-b-[3px] border-black bg-white px-6">
        <div className="flex gap-3">
          <div className="h-5 w-5 border-2 border-black bg-red-500" />
          <div className="h-5 w-5 border-2 border-black bg-yellow-400" />
          <div className="h-5 w-5 border-2 border-black bg-green-500" />
        </div>

        <div
          className="
            mx-auto
            flex
            h-8
            w-[50%]
            items-center
            justify-center
            border-[3px]
            border-black
            bg-gray-300
            font-mono
            text-xs
            font-bold
            uppercase
          "
        >
          vcenginemedia.site
        </div>
      </div>

      {/* Browser Content */}
      <div className="grid gap-8 bg-[#111] p-8 md:grid-cols-3">
        {/* POWERFUL — LCP image: eager, high priority, responsive AVIF/WebP */}
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            shadow-[6px_6px_0px_0px_#0066ff]
            transition-all
            duration-300
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#0066ff]
          "
        >
          <picture>
            <source
              type="image/avif"
              srcSet={heroSrcSetAvif}
              sizes={sizes}
            />
            <img
              src="/hero-lcp-800.webp"
              srcSet={heroSrcSetWebp}
              sizes={sizes}
              alt="VCEngine running heavy media processing tasks powerfully in the browser"
              width={LCP_WIDTH}
              height={LCP_HEIGHT}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* PRIVATE */}
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            shadow-[6px_6px_0px_0px_#FF6B35]
            transition-all
            duration-300
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#FF6B35]
          "
        >
          <img
            src="/preview-private-800.webp"
            alt="Your files stay private and never leave your device"
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        {/* LIGHTNING FAST */}
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            shadow-[6px_6px_0px_0px_#C6FF00]
            transition-all
            duration-300
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#C6FF00]
          "
        >
          <img
            src="/preview-lightning-800.webp"
            alt="VCEngine delivers lightning-fast, instant results"
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(BrowserPreview);
