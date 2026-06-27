import { useEffect, useMemo, useRef, useState } from "react";
import { getDocument } from "pdfjs-dist";

import PdfThumbnailCard from "./PdfThumbnailCard";

function PdfThumbnailGrid({
  pdfFile,
  pageNumbers,
  selectedPages,
  onToggleSelect,
  onRemovePage,
  disabled,
}) {
  const containerRef = useRef(null);
  const [thumbs, setThumbs] = useState({}); // pageNumber -> dataUrl
  const [activeRenderPages, setActiveRenderPages] = useState(new Set());
  const [ready, setReady] = useState(false);

  const pagesToRender = useMemo(() => pageNumbers || [], [pageNumbers]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!pdfFile) return;

      try {
        // Load PDF (pdf.js)
        const buffer = await pdfFile.arrayBuffer();
        const pdf = await getDocument({ data: buffer }).promise;

        // IntersectionObserver for lazy thumbnail rendering
        const root = containerRef.current;
        const observer = new IntersectionObserver(
          async (entries) => {
            if (cancelled) return;

            for (const entry of entries) {
              const pageNumber = Number(entry.target.getAttribute("data-page"));
              if (!pageNumber) continue;

              if (entry.isIntersecting) {
                if (activeRenderPages.has(pageNumber)) continue;
                setActiveRenderPages((prev) => {
                  const next = new Set(prev);
                  next.add(pageNumber);
                  return next;
                });

                try {
                  const page = await pdf.getPage(pageNumber);

                  // Scale: small but readable; keep it fast.
                  const viewport = page.getViewport({ scale: 0.35 });

                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");
                  canvas.width = Math.floor(viewport.width);
                  canvas.height = Math.floor(viewport.height);

                  await page.render({ canvasContext: ctx, viewport }).promise;

                  const dataUrl = canvas.toDataURL("image/png");

                  if (!cancelled) {
                    setThumbs((prev) => ({ ...prev, [pageNumber]: dataUrl }));
                  }
                } catch (e) {
                  // ignore per-page failures
                  console.error(e);
                }
              }
            }
          },
          { root: root || undefined, rootMargin: "200px", threshold: 0.01 }
        );

        // Observe each card placeholder
        const nodes = containerRef.current?.querySelectorAll("[data-page]") || [];
        nodes.forEach((n) => observer.observe(n));

        if (!cancelled) setReady(true);

        return () => observer.disconnect();
      } catch (e) {
        console.error(e);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [pdfFile]);

  const checkSelected = (pageNumber) => selectedPages?.has(pageNumber);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6"
      >
        {pagesToRender.map((pageNumber) => (
          <div key={pageNumber} data-page={pageNumber}>
            <PdfThumbnailCard
              pageNumber={pageNumber}
              thumbnailSrc={thumbs[pageNumber]}
              selected={checkSelected(pageNumber)}
              onToggleSelect={(p) => onToggleSelect?.(p)}
              onRemove={(p) => onRemovePage?.(p)}
              disabled={disabled}
              tabIndex={0}
            />
          </div>
        ))}
      </div>

      {/* subtle overlay while thumbs are initializing */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="h-full w-full animate-pulse bg-[#0a0a0a]" />
        </div>
      )}
    </div>
  );
}

export default PdfThumbnailGrid;

