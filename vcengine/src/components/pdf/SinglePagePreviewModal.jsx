import { useEffect, useMemo, useRef, useState } from "react";

function SinglePagePreviewModal({
  isOpen,
  onClose,
  pdfFile,
  pageNumber,
  displayPageNumber,
  disabled,
  onRemove,
}) {
  const canvasRef = useRef(null);

  const [pdfJsReady, setPdfJsReady] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState(null);

  const canRender = useMemo(() => {
    return Boolean(isOpen && pdfFile && pageNumber);
  }, [isOpen, pdfFile, pageNumber]);

  useEffect(() => {
    if (!canRender) return;

    let cancelled = false;

    async function renderPage() {
      setRendering(true);
      setPdfJsReady(false);
      setError(null);

      try {
        const pdfjsLib = await import("pdfjs-dist");

        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.min.mjs",
            import.meta.url
          ).toString();
        } catch {
          // Already configured
        }

        const buffer = await pdfFile.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
          data: buffer,
        }).promise;

        const page = await pdf.getPage(pageNumber);

        // Smaller paper preview
        const desiredWidth = 320;

        const originalViewport = page.getViewport({
          scale: 1,
        });

        const scale =
          desiredWidth / originalViewport.width;

        const viewport = page.getViewport({
          scale,
        });

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        if (!cancelled) {
          setPdfJsReady(true);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError("Failed to preview this page.");
        }
      } finally {
        if (!cancelled) {
          setRendering(false);
        }
      }
    }

    renderPage();

    return () => {
      cancelled = true;
    };
  }, [canRender, pdfFile, pageNumber]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => {
          if (!disabled) {
            onClose?.();
          }
        }}
      />

      {/* Modal Wrapper */}
      <div className="relative flex h-full items-start justify-center px-4 pt-24">

        <div
          className="
            relative
            w-full
            max-w-[450px]
            border-[3px]
            border-black
            bg-[#1a1a1a]
            p-5
            shadow-[10px_10px_0px_0px_black]
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={disabled}
            className="
              absolute
              right-4
              top-4
              flex
              h-6
              w-6
              items-center
              justify-center
              border-[2px]
              border-black
              bg-[#161616]
              text-xs
              font-bold
              text-white
              shadow-[2px_2px_0px_0px_black]
              transition-all
              hover:border-[#0066ff]
              hover:text-[#0066ff]
            "
          >
            ×
          </button>

          {/* Header */}
          <div>
            <h2
              className="
                font-mono
                text-xl
                font-bold
                uppercase
                text-white
              "
            >
              Page {displayPageNumber ?? pageNumber} Preview
            </h2>

            <p
              className="
                mt-2
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-gray-400
              "
            >
              {rendering
                ? "Rendering..."
                : pdfJsReady
                ? "Ready"
                : "Loading"}
            </p>
          </div>

          {/* Paper Viewer */}
          <div
            className="
              mt-5
              max-h-[45vh]
              overflow-y-auto
              border-[3px]
              border-black
              bg-[#0f0f0f]
              p-4
              shadow-[4px_4px_0px_0px_black]
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-[360px]
                bg-white
                p-4
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
                <canvas
                  ref={canvasRef}
                  className="
                    block
                    h-auto
                    w-full
                    object-contain
                  "
                />
              )}
            </div>
          </div>

          {/* Remove Button */}
          <div className="mt-5">
            <button
              onClick={() => onRemove?.(pageNumber)}
              disabled={disabled}
              className="
                w-full
                border-[3px]
                border-black
                bg-[#161616]
                px-6
                py-3
                font-mono
                text-sm
                font-bold
                uppercase
                text-gray-200
                shadow-[4px_4px_0px_0px_black]
                transition-all
                hover:-translate-x-[2px]
                hover:-translate-y-[2px]
                hover:border-red-500
                hover:text-red-400
                hover:shadow-[6px_6px_0px_0px_black]
              "
            >
              Remove Page
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default SinglePagePreviewModal;