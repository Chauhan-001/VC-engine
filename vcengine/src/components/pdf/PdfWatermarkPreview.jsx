import { useEffect, useRef, useState } from "react";

function PdfWatermarkPreview({
  pdfFile,
  mode,

  watermarkText,
  fontSize,
  textColor,

  opacity,
  rotation,

  watermarkImage,
  imageScale,

  watermarkPosition,
  setWatermarkPosition,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  const draggingRef = useRef(false);

  function getTextColor() {
    switch (textColor) {
      case "red":
        return "#ff0000";

      case "blue":
        return "#0066ff";

      case "gray":
        return "#666666";

      default:
        return "#000000";
    }
  }

  useEffect(() => {
    if (!watermarkImage) {
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(
      watermarkImage
    );

    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [watermarkImage]);

  useEffect(() => {
    if (!pdfFile || !canvasRef.current) {
      return;
    }

    let cancelled = false;

    async function renderPdf() {
      try {
        setLoading(true);

        const pdfjsLib = await import(
          "pdfjs-dist"
        );

        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            new URL(
              "pdfjs-dist/build/pdf.worker.min.mjs",
              import.meta.url
            ).toString();
        } catch {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            new URL(
              "pdfjs-dist/build/pdf.worker.mjs",
              import.meta.url
            ).toString();
        }

        const bytes =
          await pdfFile.arrayBuffer();

        if (cancelled) return;

        const pdf =
          await pdfjsLib.getDocument({
            data: bytes,
          }).promise;

        if (cancelled) return;

        const page =
          await pdf.getPage(1);

        if (cancelled) return;

        const viewport =
          page.getViewport({
            scale: 1.15,
          });

        const canvas =
          canvasRef.current;

        if (!canvas) return;

        const ctx =
          canvas.getContext("2d");

        canvas.width =
          viewport.width;

        canvas.height =
          viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        if (!cancelled) {
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Preview Error:",
          error
        );

        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfFile]);

  function updatePosition(
    clientX,
    clientY
  ) {
    if (!wrapperRef.current) {
      return;
    }

    const rect =
      wrapperRef.current.getBoundingClientRect();

    const x =
      ((clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((clientY - rect.top) /
        rect.height) *
      100;

    setWatermarkPosition({
      x: Math.max(
        0,
        Math.min(100, x)
      ),

      y: Math.max(
        0,
        Math.min(100, y)
      ),
    });
  }

  function handleMouseDown(e) {
    draggingRef.current = true;

    updatePosition(
      e.clientX,
      e.clientY
    );
  }

  function handleMouseMove(e) {
    if (!draggingRef.current) {
      return;
    }

    updatePosition(
      e.clientX,
      e.clientY
    );
  }

  function handleMouseUp() {
    draggingRef.current = false;
  }

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
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <h3
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            text-white
          "
        >
          Live Preview
        </h3>

        <span
          className="
            font-mono
            text-xs
            uppercase
            text-gray-400
          "
        >
          Drag Watermark
        </span>
      </div>

      <div
        className="
          max-h-[700px]
          overflow-y-auto
          border-[3px]
          border-black
          bg-[#111]
          p-4
        "
      >
        {loading && (
          <div
            className="
              py-12
              text-center
              font-mono
              text-xs
              uppercase
              text-gray-400
            "
          >
            Rendering Preview...
          </div>
        )}

        <div
          className="
            flex
            justify-center
          "
        >
          <div
            ref={wrapperRef}
            className="
              relative
              inline-block
              cursor-move
              select-none
            "
            onMouseDown={
              handleMouseDown
            }
            onMouseMove={
              handleMouseMove
            }
            onMouseUp={
              handleMouseUp
            }
            onMouseLeave={
              handleMouseUp
            }
          >
            <canvas
              ref={canvasRef}
              className="
                block
                max-w-full
                bg-white
                shadow-[8px_8px_0px_0px_black]
              "
            />

            {/* TEXT WATERMARK */}
            {mode === "text" &&
              watermarkText && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    font-bold
                    whitespace-nowrap
                  "
                  style={{
                    left: `${watermarkPosition.x}%`,
                    top: `${watermarkPosition.y}%`,

                    transform:
                      `translate(-50%,-50%) rotate(${rotation}deg)`,

                    fontSize,

                    color:
                      getTextColor(),

                    opacity:
                      opacity / 100,
                  }}
                >
                  {watermarkText}
                </div>
              )}

            {/* IMAGE WATERMARK */}
            {mode === "image" &&
              imageUrl && (
                <img
                  src={imageUrl}
                  alt="watermark"
                  className="
                    pointer-events-none
                    absolute
                    select-none
                  "
                  draggable={false}
                  style={{
                    left: `${watermarkPosition.x}%`,
                    top: `${watermarkPosition.y}%`,

                    transform:
                      `
                      translate(-50%,-50%)
                      rotate(${rotation}deg)
                      scale(${imageScale / 100})
                    `,

                    opacity:
                      opacity / 100,

                    maxWidth: 250,

                    maxHeight: 250,

                    objectFit:
                      "contain",
                  }}
                />
              )}
          </div>
        </div>
      </div>

      <p
        className="
          mt-4
          font-mono
          text-xs
          uppercase
          text-gray-400
        "
      >
        Drag anywhere on the preview
        to reposition the watermark.
      </p>
    </div>
  );
}

export default PdfWatermarkPreview;