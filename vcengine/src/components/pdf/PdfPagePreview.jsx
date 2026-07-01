import { useEffect, useMemo, useRef, useState } from "react";

export default function PdfPagePreview({ pdfFile, pageNumber, pageCount }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState(null);

  const canRender = useMemo(() => {
    return Boolean(pdfFile && pageCount > 0 && pageNumber >= 1 && pageNumber <= pageCount);
  }, [pdfFile, pageCount, pageNumber]);

  useEffect(() => {
    if (!canRender) {
      setReady(false);
      setRendering(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function render() {
      setRendering(true);
      setReady(false);
      setError(null);

      try {
        const pdfjsLib = await import("pdfjs-dist");

        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.min.mjs",
            import.meta.url
          ).toString();
        } catch {
          // noop
        }

        const buffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

        const page = await pdf.getPage(pageNumber);

        // Fit into ~600px height with centered paper.
        const desiredCanvasWidth = 560;
        const viewport = page.getViewport({ scale: 1 });
        const scale = desiredCanvasWidth / viewport.width;

        const scaledViewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        canvas.width = Math.floor(scaledViewport.width);
        canvas.height = Math.floor(scaledViewport.height);

        await page.render({
          canvasContext: ctx,
          viewport: scaledViewport,
        }).promise;

        if (!cancelled) setReady(true);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Failed to render this page.");
      } finally {
        if (!cancelled) setRendering(false);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [canRender, pdfFile, pageNumber]);

  return (
  <div
    className="
      border-[3px]
      border-black
      bg-[#0f0f0f]
      p-4
      shadow-[4px_4px_0px_0px_black]
    "
    aria-label={`PDF preview page ${pageNumber}`}
  >
    {/* Scrollable Preview Area */}
    <div
      className="
        max-h-[70vh]
        overflow-y-auto
        overflow-x-hidden
        p-2
      "
    >
      {/* Center PDF */}
      <div className="flex justify-center">
        <div
          className="
            w-full
            max-w-[700px]
            bg-white
            p-2
            shadow-[6px_6px_0px_0px_#222]
          "
        >
          {error ? (
            <div
              className="
                p-4
                font-mono
                text-xs
                font-bold
                uppercase
                text-red-500
              "
            >
              {error}
            </div>
          ) : (
            <>
              {!ready && (
                <div
                  className="
                    p-4
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    text-gray-700
                  "
                >
                  {rendering ? "Rendering..." : "Loading..."}
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="
                  block
                  w-full
                  h-auto
                  max-w-full
                  object-contain
                "
              />
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

