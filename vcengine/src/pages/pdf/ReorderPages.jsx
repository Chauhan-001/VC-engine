import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";
import { PDFDocument } from "pdf-lib";
import PdfPagePreview from "../../components/pdf/PdfPagePreview";
import ReorderPageGrid from "../../components/pdf/ReorderPageGrid";
import ReorderSummary from "../../components/pdf/ReorderSummary";

function ReorderPages() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [pages, setPages] = useState([]);
  const [removedPages, setRemovedPages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

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

      const totalPages = pdf.numPages;

      setPageCount(totalPages);

      setPages(
        Array.from(
          { length: totalPages },
          (_, index) => index + 1
        )
      );

      setRemovedPages([]);

      setCurrentPage(1);
    } catch (error) {
      console.error(
        "PDF Upload Error:",
        error
      );
    }
  }

  function handlePreview(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleRemove(pageNumber) {
    setPages((prev) =>
      prev.filter(
        (page) => page !== pageNumber
      )
    );

    setRemovedPages((prev) => [
      ...prev,
      pageNumber,
    ]);

    if (currentPage === pageNumber) {
      const nextPage =
        pages.find(
          (page) => page !== pageNumber
        ) || 1;

      setCurrentPage(nextPage);
    }
  }

  async function handleSaveOrder() {
  if (!pdfFile || pages.length === 0) {
    return;
  }

  try {
    setLoading(true);

    const bytes = await pdfFile.arrayBuffer();

    const sourcePdf = await PDFDocument.load(bytes);

    const newPdf = await PDFDocument.create();

    // Convert page numbers to zero-based indexes
    const pageIndexes = pages.map(
      (page) => page - 1
    );

    const copiedPages = await newPdf.copyPages(
      sourcePdf,
      pageIndexes
    );

    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    const outputBytes = await newPdf.save();

    const blob = new Blob(
      [outputBytes],
      {
        type: "application/pdf",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "reordered.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "Reorder PDF Error:",
      error
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="relative overflow-hidden pt-28">
        {/* Animated Dots */}
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
            Reorder PDF Pages
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-400">
            Drag, rearrange, and organize your PDF pages instantly.
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
              {/* Preview + Grid */}
              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {/* Left */}
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

                {/* Right */}
                <div>
                  <ReorderPageGrid
                    pages={pages}
                    setPages={setPages}
                    onPreview={handlePreview}
                    onRemove={handleRemove}
                  />
                </div>
              </div>

              {/* Summary */}
              <ReorderSummary
                originalPageCount={pageCount}
                currentPages={pages}
                removedPages={removedPages}
                loading={loading}
                onSave={handleSaveOrder}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReorderPages;