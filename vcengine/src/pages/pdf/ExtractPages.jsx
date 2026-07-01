import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "pdf-lib";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import PdfPagePreview from "../../components/pdf/PdfPagePreview";
import PageGrid from "../../components/pdf/PageGrid";
import ExtractControls from "../../components/pdf/ExtractControls";

import { parsePageInput } from "../../utils/parsePageInput";

function ExtractPages() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPages, setSelectedPages] = useState([]);
  const [pageInput, setPageInput] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleFileUpload(files) {
    try {
      const file = files[0];

      if (!file) return;

      setPdfFile(file);

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

      const bytes = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: bytes,
      }).promise;

      setPageCount(pdf.numPages);

      setCurrentPage(1);
      setSelectedPages([]);
      setPageInput("");
    } catch (error) {
      console.error("PDF Upload Error:", error);
    }
  }

  function handleTogglePage(pageNumber) {
    setCurrentPage(pageNumber);

    setSelectedPages((prev) => {
      let updated;

      if (prev.includes(pageNumber)) {
        updated = prev.filter(
          (page) => page !== pageNumber
        );
      } else {
        updated = [...prev, pageNumber].sort(
          (a, b) => a - b
        );
      }

      setPageInput(updated.join(","));

      return updated;
    });
  }

  function handleInputChange(value) {
    setPageInput(value);

    const parsedPages = parsePageInput(
      value,
      pageCount
    );

    setSelectedPages(parsedPages);

    if (parsedPages.length > 0) {
      setCurrentPage(parsedPages[0]);
    }
  }

  async function handleExtract() {
    if (!pdfFile || selectedPages.length === 0) {
      return;
    }

    try {
      setLoading(true);

      const bytes = await pdfFile.arrayBuffer();

      const sourcePdf =
        await PDFDocument.load(bytes);

      const newPdf =
        await PDFDocument.create();

      const pageIndexes =
        selectedPages.map(
          (page) => page - 1
        );

      const copiedPages =
        await newPdf.copyPages(
          sourcePdf,
          pageIndexes
        );

      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      const outputBytes =
        await newPdf.save();

      const blob = new Blob(
        [outputBytes],
        {
          type: "application/pdf",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "extracted-pages.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Extract PDF Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSelectAll() {
    const pages = Array.from(
      { length: pageCount },
      (_, index) => index + 1
    );

    setSelectedPages(pages);

    setPageInput(`1-${pageCount}`);

    setCurrentPage(1);
  }

  function handleClearSelection() {
    setSelectedPages([]);
    setPageInput("");
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-28">
        {/* Animated Dotted Background */}
        <div
          className="
            absolute
            inset-0
            opacity-70
            pointer-events-none
            animate-[moveGrid_12s_linear_infinite]
          "
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-24">
          {/* Back Button */}
          <Link
            to="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              font-mono
              text-sm
              font-bold
              uppercase
              text-gray-300
              transition-colors
              hover:text-[#0066ff]
            "
          >
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          {/* Heading */}
          <h1 className="text-6xl font-black uppercase">
            Extract PDF Pages
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Extract specific pages into a new PDF instantly.
            Everything happens locally in your browser.
          </p>

          {/* Upload Zone */}
          <div className="mt-14">
            <UploadZone
              title="Drag & Drop PDF here"
              subtitle="or click to browse local PDF files"
              accept=".pdf"
              multiple={false}
              onFilesSelected={handleFileUpload}
            />
          </div>

          {pdfFile && (
            <>
              {/* Preview + Controls */}
              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {/* Left Side */}
                <div>
                  <h2
                    className="
                      mb-4
                      font-mono
                      text-sm
                      font-bold
                      uppercase
                      text-white
                    "
                  >
                    Page Preview
                  </h2>

                  <PdfPagePreview
                    pdfFile={pdfFile}
                    pageNumber={currentPage}
                    pageCount={pageCount}
                  />
                </div>

                {/* Right Side */}
                <ExtractControls
                  pageInput={pageInput}
                  setPageInput={handleInputChange}
                  pageCount={pageCount}
                  selectedPages={selectedPages}
                  loading={loading}
                  onExtract={handleExtract}
                />
              </div>

              {/* Page Selection */}
              <div className="mt-12">
                <div className="mb-4 flex items-center justify-between">
                  <h2
                    className="
                      font-mono
                      text-sm
                      font-bold
                      uppercase
                      text-white
                    "
                  >
                    Page Selection
                  </h2>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSelectAll}
                      className="
                        border-[3px]
                        border-black
                        bg-[#0066ff]
                        px-4
                        py-2
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        shadow-[4px_4px_0px_0px_black]
                        transition-all
                        hover:-translate-x-[2px]
                        hover:-translate-y-[2px]
                        hover:shadow-[6px_6px_0px_0px_black]
                      "
                    >
                      Select All
                    </button>

                    <button
                      onClick={handleClearSelection}
                      className="
                        border-[3px]
                        border-black
                        bg-[#1a1a1a]
                        px-4
                        py-2
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        text-white
                        shadow-[4px_4px_0px_0px_black]
                        transition-all
                        hover:-translate-x-[2px]
                        hover:-translate-y-[2px]
                        hover:shadow-[6px_6px_0px_0px_black]
                      "
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <PageGrid
                  pageCount={pageCount}
                  selectedPages={selectedPages}
                  onTogglePage={handleTogglePage}
                />
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ExtractPages;