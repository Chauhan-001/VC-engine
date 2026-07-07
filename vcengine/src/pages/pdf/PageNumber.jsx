import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument, rgb } from "pdf-lib";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import PdfPageNumberPreview from "../../components/pdf/PdfPageNumberPreview";
import PageNumberControls from "../../components/pdf/PageNumberControls";

function PageNumbers() {

    const [previewSettings, setPreviewSettings] = useState({
  position: "bottom-center",
  startNumber: 1,
  fontSize: 16,
  color: "black",
});

  const [pdfFile, setPdfFile] =
    useState(null);

  const [pageCount, setPageCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [position, setPosition] =
    useState("bottom-center");

  const [startNumber, setStartNumber] =
    useState(1);

  const [fontSize, setFontSize] =
    useState(16);

  const [color, setColor] =
    useState("black");

  async function handleUpload(files) {
    const file = files[0];

    if (!file) return;

    setPdfFile(file);

    const pdfjs =
      await import("pdfjs-dist");

    const bytes =
      await file.arrayBuffer();

    const pdf =
      await pdfjs
        .getDocument({ data: bytes })
        .promise;

    setPageCount(pdf.numPages);
  }

  function getColor() {
    switch (color) {
      case "blue":
        return rgb(0, 0.4, 1);

      case "red":
        return rgb(1, 0, 0);

      case "gray":
        return rgb(0.5, 0.5, 0.5);

      default:
        return rgb(0, 0, 0);
    }
  }

  async function handleAddNumbers() {
    if (!pdfFile) return;

    try {
      setLoading(true);

      const bytes =
        await pdfFile.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      const pages =
        pdf.getPages();

      pages.forEach((page, index) => {
        const { width, height } =
          page.getSize();

        const number =
          startNumber + index;

        let x = 30;
        let y = 30;

        if (position.includes("right"))
          x = width - 50;

        if (position.includes("center"))
          x = width / 2;

        if (position.includes("top"))
          y = height - 30;

        page.drawText(
          String(number),
          {
            x,
            y,
            size: fontSize,
            color: getColor(),
          }
        );
      });

      const output =
        await pdf.save();

      const blob = new Blob(
        [output],
        {
          type:
            "application/pdf",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;
      a.download =
        "page-numbers.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-28">

        <div className="mx-auto max-w-[1280px] px-6 pb-24">

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
            "
          >
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          <h1 className="text-6xl font-black uppercase">
            Page Numbers
          </h1>

          <p className="mt-4 text-gray-400">
            Add professional page numbers to your PDF.
          </p>

          <div className="mt-14">
            <UploadZone
              title="Drag & Drop PDF Here"
              subtitle="or click to browse"
              accept=".pdf"
              multiple={false}
              onFilesSelected={handleUpload}
            />
          </div>

          {pdfFile && (
            <div className="mt-12 grid gap-6 lg:grid-cols-2">

              <PdfPageNumberPreview
  pdfFile={pdfFile}
  pageNumber={1}
  position={position}
  startNumber={startNumber}
  fontSize={fontSize}
  color={color}
/>

              <PageNumberControls
                position={position}
                setPosition={setPosition}
                startNumber={startNumber}
                setStartNumber={setStartNumber}
                fontSize={fontSize}
                setFontSize={setFontSize}
                color={color}
                setColor={setColor}
                loading={loading}
                onAdd={handleAddNumbers}
              />

            </div>
          )}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default PageNumbers;