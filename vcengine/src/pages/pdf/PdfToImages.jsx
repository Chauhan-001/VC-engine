import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import JSZip from "jszip";
import { saveAs } from "file-saver";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import PdfUploadCard from "../../components/pdf/PdfUploadCard";
import PdfPagesSelector from "../../components/pdf/PdfPagesSelector";
import PdfImagePreviewGrid from "../../components/pdf/PdfImagePreviewGrid";
import PdfToImagesConfig from "../../components/pdf/PdfToImagesConfig";

function PdfToImages() {
  const [pdfFile, setPdfFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [previews, setPreviews] =
    useState([]);

  const [pageCount, setPageCount] =
    useState(0);

  const [
    selectedPages,
    setSelectedPages,
  ] = useState([]);

  const [outputMode, setOutputMode] =
    useState("all");

  const [
    selectedPagesInput,
    setSelectedPagesInput,
  ] = useState("");

  const [imageFormat, setImageFormat] =
    useState("png");

  const [dpi, setDpi] =
    useState(150);

  const [colorMode, setColorMode] =
    useState("color");

  const [
    downloadAsZip,
    setDownloadAsZip,
  ] = useState(true);

  async function loadPdfPreviews(
    file
  ) {
    try {
      setLoading(true);

      // Cleanup old previews
      previews.forEach((item) => {
        URL.revokeObjectURL(
          item.url
        );
      });

      const pdfjsLib =
        await import(
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

      setPageCount(
        pdf.numPages
      );

      const generated = [];

      for (
        let i = 1;
        i <= pdf.numPages;
        i++
      ) {
        const page =
          await pdf.getPage(i);

        const viewport =
          page.getViewport({
            scale: 0.4,
          });

        const canvas =
          document.createElement(
            "canvas"
          );

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

        const blob =
          await new Promise(
            (resolve) =>
              canvas.toBlob(
                resolve,
                "image/png"
              )
          );

        const url =
          URL.createObjectURL(
            blob
          );

        generated.push({
          pageNumber: i,
          url,
        });
      }

      setPreviews(generated);

      setSelectedPages(
        generated.map(
          (item) =>
            item.pageNumber
        )
      );
    } catch (error) {
      console.error(
        "Preview Error:",
        error
      );

      alert(
        "Failed to load PDF."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleFileSelected(
    file
  ) {
    setPdfFile(file);

    await loadPdfPreviews(file);
  }

  function handleRemovePdf() {
    previews.forEach((item) => {
      URL.revokeObjectURL(
        item.url
      );
    });

    setPdfFile(null);

    setPreviews([]);

    setPageCount(0);

    setSelectedPages([]);

    setSelectedPagesInput("");
  }

  function handleTogglePage(
    pageNumber
  ) {
    setSelectedPages((prev) => {
      if (
        prev.includes(
          pageNumber
        )
      ) {
        return prev.filter(
          (p) =>
            p !== pageNumber
        );
      }

      return [
        ...prev,
        pageNumber,
      ].sort(
        (a, b) => a - b
      );
    });
  }

  useEffect(() => {
    if (
      outputMode !==
      "selected"
    ) {
      return;
    }

    if (
      !selectedPagesInput.trim()
    ) {
      return;
    }

    try {
      const pages = [];

      selectedPagesInput
        .split(",")
        .forEach((part) => {
          const value =
            part.trim();

          if (
            value.includes("-")
          ) {
            const [
              start,
              end,
            ] =
              value.split(
                "-"
              );

            const s =
              Number(start);

            const e =
              Number(end);

            for (
              let i = s;
              i <= e;
              i++
            ) {
              pages.push(i);
            }
          } else {
            pages.push(
              Number(value)
            );
          }
        });

      const valid =
        [...new Set(pages)]
          .filter(
            (p) =>
              p >= 1 &&
              p <= pageCount
          )
          .sort(
            (a, b) =>
              a - b
          );

      setSelectedPages(valid);
    } catch {
      console.log(
        "Invalid page range"
      );
    }
  }, [
    selectedPagesInput,
    outputMode,
    pageCount,
  ]);
    function applyColorMode(
    canvas,
    mode
  ) {
    if (mode === "color") {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    const imageData =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

    const pixels =
      imageData.data;

    for (
      let i = 0;
      i < pixels.length;
      i += 4
    ) {
      const r = pixels[i];
      const g =
        pixels[i + 1];
      const b =
        pixels[i + 2];

      const gray =
        0.299 * r +
        0.587 * g +
        0.114 * b;

      // Grayscale
      if (
        mode ===
        "grayscale"
      ) {
        pixels[i] = gray;
        pixels[i + 1] =
          gray;
        pixels[i + 2] =
          gray;
      }

      // Black & White
      if (mode === "bw") {
        const bw =
          gray > 128
            ? 255
            : 0;

        pixels[i] = bw;
        pixels[i + 1] =
          bw;
        pixels[i + 2] =
          bw;
      }
    }

    ctx.putImageData(
      imageData,
      0,
      0
    );
  }

  async function handleConvert() {
    if (!pdfFile) {
      return;
    }

    try {
      setLoading(true);

      const pdfjsLib =
        await import(
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

      const pdf =
        await pdfjsLib.getDocument({
          data: bytes,
        }).promise;

      const pagesToExport =
        outputMode ===
        "all"
          ? Array.from(
              {
                length:
                  pageCount,
              },
              (_, i) =>
                i + 1
            )
          : selectedPages;

      const zip =
        new JSZip();

      for (const pageNum of pagesToExport) {
        const page =
          await pdf.getPage(
            pageNum
          );

        const scale =
          dpi / 72;

        const viewport =
          page.getViewport({
            scale,
          });

        const canvas =
          document.createElement(
            "canvas"
          );

        const ctx =
          canvas.getContext(
            "2d"
          );

        canvas.width =
          viewport.width;

        canvas.height =
          viewport.height;

        await page.render({
          canvasContext:
            ctx,

          viewport,
        }).promise;

        applyColorMode(
          canvas,
          colorMode
        );

        const mimeType = {
          png: "image/png",

          jpeg:
            "image/jpeg",

          webp:
            "image/webp",
        }[imageFormat];

        const quality =
          imageFormat ===
          "png"
            ? undefined
            : 0.95;

        const blob =
          await new Promise(
            (resolve) =>
              canvas.toBlob(
                resolve,
                mimeType,
                quality
              )
          );

        const filename = `page-${pageNum}.${imageFormat}`;

        // ZIP DOWNLOAD
        if (
          downloadAsZip ||
          pagesToExport.length >
            1
        ) {
          zip.file(
            filename,
            blob
          );
        }

        // SINGLE FILE DOWNLOAD
        else {
          saveAs(
            blob,
            filename
          );
        }
      }

      // DOWNLOAD ZIP
      if (
        downloadAsZip ||
        pagesToExport.length >
          1
      ) {
        const zipBlob =
          await zip.generateAsync(
            {
              type: "blob",
            }
          );

        saveAs(
          zipBlob,
          `${pdfFile.name.replace(
            ".pdf",
            ""
          )}-images.zip`
        );
      }
    } catch (error) {
      console.error(
        "Convert Error:",
        error
      );

      alert(
        "Failed to convert PDF."
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

      <main className="pt-28">
        <div
          className="
            mx-auto
            max-w-[1800px]
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

          {/* Header */}
          <div className="mb-12">
            <h1
              className="
                text-6xl
                font-black
                uppercase
              "
            >
              PDF To Images
            </h1>

            <p
              className="
                mt-4
                max-w-3xl
                text-lg
                text-gray-400
              "
            >
              Convert PDF pages into PNG,
              JPEG, or WEBP images directly
              in your browser. Everything
              stays private on your device.
            </p>
          </div>

          {/* Main Layout */}
          <div
            className="
              grid
              gap-8
              xl:grid-cols-[350px_1fr_340px]
            "
          >
            {/* LEFT */}
            <div className="space-y-8">
              <PdfUploadCard
                pdfFile={pdfFile}
                onFileSelected={
                  handleFileSelected
                }
                onRemove={
                  handleRemovePdf
                }
              />

              {pageCount > 0 && (
                <PdfPagesSelector
                  pageCount={pageCount}
                  outputMode={
                    outputMode
                  }
                  setOutputMode={
                    setOutputMode
                  }
                  selectedPagesInput={
                    selectedPagesInput
                  }
                  setSelectedPagesInput={
                    setSelectedPagesInput
                  }
                />
              )}
            </div>

            {/* CENTER */}
            <PdfImagePreviewGrid
              previews={previews}
              selectedPages={
                selectedPages
              }
              onTogglePage={
                handleTogglePage
              }
            />

            {/* RIGHT */}
            <PdfToImagesConfig
              imageFormat={
                imageFormat
              }
              setImageFormat={
                setImageFormat
              }
              dpi={dpi}
              setDpi={setDpi}
              colorMode={
                colorMode
              }
              setColorMode={
                setColorMode
              }
              downloadAsZip={
                downloadAsZip
              }
              setDownloadAsZip={
                setDownloadAsZip
              }
              loading={loading}
              pageCount={
                selectedPages.length
              }
              onConvert={
                handleConvert
              }
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PdfToImages;