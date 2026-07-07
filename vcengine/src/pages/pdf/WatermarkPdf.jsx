import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument, degrees, rgb } from "pdf-lib";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import WatermarkControls from "../../components/pdf/WatermarkControls";
import PdfWatermarkPreview from "../../components/pdf/PdfWatermarkPreview";

function WatermarkPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [loading, setLoading] = useState(false);

  // Mode
  const [mode, setMode] = useState("text");

  // Text watermark
  const [watermarkText, setWatermarkText] =
    useState("CONFIDENTIAL");

  const [fontSize, setFontSize] =
    useState(48);

  const [textColor, setTextColor] =
    useState("gray");

  // Common
  const [opacity, setOpacity] =
    useState(50);

  const [rotation, setRotation] =
    useState(-45);

  // Image watermark
  const [watermarkImage, setWatermarkImage] =
    useState(null);

  const [imageScale, setImageScale] =
    useState(40);

  // Position (0–100%)
  const [
    watermarkPosition,
    setWatermarkPosition,
  ] = useState({
    x: 50,
    y: 50,
  });

  async function handleUpload(files) {
    try {
      const file = files?.[0];

      if (!file) return;

      setPdfFile(file);

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
        await file.arrayBuffer();

      const pdf =
        await pdfjsLib.getDocument({
          data: bytes,
        }).promise;

      setPageCount(pdf.numPages);
    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );
    }
  }

  function getPdfColor() {
    switch (textColor) {
      case "red":
        return rgb(1, 0, 0);

      case "blue":
        return rgb(0, 0.4, 1);

      case "gray":
        return rgb(0.5, 0.5, 0.5);

      default:
        return rgb(0, 0, 0);
    }
  }

  async function handleAddWatermark() {
    if (!pdfFile) return;

    try {
      setLoading(true);

      const bytes =
        await pdfFile.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      const pages =
        pdf.getPages();

      let embeddedImage = null;

      // IMAGE MODE
      if (
        mode === "image" &&
        watermarkImage
      ) {
        const imageBytes =
          await watermarkImage.arrayBuffer();

        if (
          watermarkImage.type.includes(
            "png"
          )
        ) {
          embeddedImage =
            await pdf.embedPng(
              imageBytes
            );
        } else {
          embeddedImage =
            await pdf.embedJpg(
              imageBytes
            );
        }
      }

      pages.forEach((page) => {
        const { width, height } =
          page.getSize();

        // Convert preview coordinates
        const centerX =
          (watermarkPosition.x /
            100) *
          width;

        const centerY =
          height -
          (watermarkPosition.y /
            100) *
            height;

        // =====================
        // TEXT WATERMARK
        // =====================

        if (
          mode === "text" &&
          watermarkText.trim()
        ) {
          const textWidth =
            watermarkText.length *
            fontSize *
            0.3;

          page.drawText(
            watermarkText,
            {
              x:
                centerX -
                textWidth / 2,

              y:
                centerY -
                fontSize / 2,

              size: fontSize,

              rotate:
                degrees(rotation),

              opacity:
                opacity / 100,

              color:
                getPdfColor(),
            }
          );
        }

        // =====================
        // IMAGE WATERMARK
        // =====================

        if (
          mode === "image" &&
          embeddedImage
        ) {
          // Limit to 40% page width
          const maxWidth =
            width * 0.4;

          const scaleFactor =
            (imageScale / 100) *
            (maxWidth /
              embeddedImage.width);

          const imgWidth =
            embeddedImage.width *
            scaleFactor;

          const imgHeight =
            embeddedImage.height *
            scaleFactor;

          page.drawImage(
            embeddedImage,
            {
              x:
                centerX -
                imgWidth / 2,

              y:
                centerY -
                imgHeight / 2,

              width: imgWidth,

              height: imgHeight,

              rotate:
                degrees(rotation),

              opacity:
                opacity / 100,
            }
          );
        }
      });

      const output =
        await pdf.save();

      const blob =
        new Blob([output], {
          type: "application/pdf",
        });

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;
      a.download =
        "watermarked.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Watermark Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#0a0a0a]
        text-white
      "
    >
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-28">
        <div
          className="
            mx-auto
            max-w-[1400px]
            px-6
            pb-24
          "
        >
          {/* Back */}
          <Link
            to="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              font-mono
              text-sm
              uppercase
              text-gray-400
              transition-colors
              hover:text-[#0066ff]
            "
          >
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          {/* Heading */}
          <h1
            className="
              text-6xl
              font-black
              uppercase
            "
          >
            Add Watermark
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-gray-400
            "
          >
            Add text or image
            watermarks to your PDF.
            Everything happens
            locally in your browser.
          </p>

          {/* Upload */}
          <div className="mt-14">
            <UploadZone
              title="Drag & Drop PDF Here"
              subtitle="or click to browse"
              accept=".pdf"
              multiple={false}
              onFilesSelected={
                handleUpload
              }
            />
          </div>

          {/* Content */}
          {pdfFile && (
            <div
              className="
                mt-12
                grid
                gap-6
                lg:grid-cols-2
              "
            >
              {/* Preview */}
              <PdfWatermarkPreview
                pdfFile={pdfFile}
                mode={mode}
                watermarkText={
                  watermarkText
                }
                fontSize={fontSize}
                textColor={textColor}
                opacity={opacity}
                rotation={rotation}
                watermarkImage={
                  watermarkImage
                }
                imageScale={imageScale}
                watermarkPosition={
                  watermarkPosition
                }
                setWatermarkPosition={
                  setWatermarkPosition
                }
              />

              {/* Controls */}
              <WatermarkControls
                mode={mode}
                setMode={setMode}

                watermarkText={
                  watermarkText
                }
                setWatermarkText={
                  setWatermarkText
                }

                fontSize={fontSize}
                setFontSize={
                  setFontSize
                }

                textColor={textColor}
                setTextColor={
                  setTextColor
                }

                opacity={opacity}
                setOpacity={
                  setOpacity
                }

                rotation={rotation}
                setRotation={
                  setRotation
                }

                watermarkImage={
                  watermarkImage
                }
                setWatermarkImage={
                  setWatermarkImage
                }

                imageScale={imageScale}
                setImageScale={
                  setImageScale
                }

                watermarkPosition={
                  watermarkPosition
                }
                setWatermarkPosition={
                  setWatermarkPosition
                }

                loading={loading}
                onAddWatermark={
                  handleAddWatermark
                }
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default WatermarkPdf;