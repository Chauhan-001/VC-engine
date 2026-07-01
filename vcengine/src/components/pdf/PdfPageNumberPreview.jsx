import { useEffect, useRef, useState } from "react";

function PdfPageNumberPreview({
  pdfFile,
  pageNumber = 1,
  position,
  startNumber,
  fontSize,
  color,
}) {
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!pdfFile) return;

    let cancelled = false;

    async function renderPreview() {
      try {
        setLoading(true);
        setError("");

        const pdfjsLib = await import("pdfjs-dist");

        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.min.mjs",
            import.meta.url
          ).toString();
        } catch {
          pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            "pdfjs-dist/build/pdf.worker.mjs",
            import.meta.url
          ).toString();
        }

        const bytes = await pdfFile.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
          data: bytes,
        }).promise;

        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale: 1.2,
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

        // Draw page number preview
        const pageLabel =
          startNumber + pageNumber - 1;

        let x = 30;
        let y = canvas.height - 30;

        if (position.includes("center")) {
          x = canvas.width / 2;
          ctx.textAlign = "center";
        }

        if (position.includes("right")) {
          x = canvas.width - 30;
          ctx.textAlign = "right";
        }

        if (position.includes("left")) {
          ctx.textAlign = "left";
        }

        if (position.includes("top")) {
          y = 30;
        }

        const colors = {
          black: "#000000",
          blue: "#0066ff",
          red: "#ff0000",
          gray: "#666666",
        };

        ctx.fillStyle =
          colors[color] || "#000000";

        ctx.font = `${fontSize}px Arial`;

        ctx.fillText(
          String(pageLabel),
          x,
          y
        );

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(
            "Failed to load preview."
          );
        }
      }
    }

    renderPreview();

    return () => {
      cancelled = true;
    };
  }, [
    pdfFile,
    pageNumber,
    position,
    startNumber,
    fontSize,
    color,
  ]);

  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#1a1a1a]
        p-6
        shadow-[6px_6px_0px_0px_black]
      "
    >
      <h3
        className="
          mb-4
          font-mono
          text-sm
          font-bold
          uppercase
          text-white
        "
      >
        Live Preview
      </h3>

      <div
        className="
          max-h-[700px]
          overflow-y-auto
          bg-[#111]
          p-4
        "
      >
        {loading && (
          <p className="font-mono text-gray-400">
            Rendering...
          </p>
        )}

        {error && (
          <p className="font-mono text-red-400">
            {error}
          </p>
        )}

        <canvas
          ref={canvasRef}
          className="
            mx-auto
            block
            max-w-full
            bg-white
            shadow-lg
          "
        />
      </div>
    </div>
  );
}

export default PdfPageNumberPreview;