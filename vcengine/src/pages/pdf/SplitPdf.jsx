import { useMemo, useState } from "react";


import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "pdf-lib";

import Toast from "../../components/common/Toast";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import PagePreviewGrid from "../../components/pdf/PagePreviewGrid";
import SinglePagePreviewModal from "../../components/pdf/SinglePagePreviewModal";
import MultiRangeInput from "../../components/pdf/MultiRangeInput";
import SelectedPagesActions from "../../components/pdf/SelectedPagesActions";
import SplitLoadingOverlay from "../../components/pdf/SplitLoadingOverlay";
import SplitButton from "../../components/pdf/SplitButton";

function SplitPdf() {
  const [toast, setToast] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [selectedPages, setSelectedPages] = useState(() => new Set()); // originalPageNumber
  const [pages, setPages] = useState([]); // [{ originalPageNumber, displayPageNumber }]

  const [ranges, setRanges] = useState([]); // {id, from, to}

  const [loading, setLoading] = useState(false);

  const [previewOpenPage, setPreviewOpenPage] = useState(null); // originalPageNumber






  const canSplit = useMemo(() => {
    if (!pdfFile || pageCount <= 0) return false;
    if (!ranges.length) return false;

    const normalized = ranges.map((r) => ({
      from: Number(r.from),
      to: Number(r.to),
    }));

    for (const r of normalized) {
      if (!Number.isFinite(r.from) || !Number.isFinite(r.to)) return false;
      if (r.from < 1 || r.to < 1) return false;
      if (r.from > pageCount || r.to > pageCount) return false;
      if (r.from > r.to) return false;
    }

    // overlap check (contiguous allowed => touching is OK)
    const sorted = normalized.slice().sort((a, b) => a.from - b.from);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1].from <= sorted[i].to) return false;
    }

    return true;
  }, [pageCount, pdfFile, ranges]);



  const pushToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3000);
  };

  const handlePdfSelected = async (selectedFiles) => {
    const file = selectedFiles?.[0];
    if (!file) return;

    try {
      setPdfFile(file);
      setPageCount(0);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const count = pdf.getPageCount();
      setPageCount(count);

      // Default range: 1-1 (or 1-last if small)
      const safeTo = Math.min(1, count);
      setRanges([{ id: "range-1", from: 1, to: safeTo }]);
      setSelectedPages(new Set());
      setPages(
        Array.from({ length: count }, (_, i) => ({
          originalPageNumber: i + 1,
          displayPageNumber: i + 1,
        }))
      );

    } catch (e) {
      console.error(e);
      setPdfFile(null);
      setPageCount(0);
      pushToast("error", "Failed To Read PDF");
    }
  };

  const splitRange = async (pdfBytes, from, to) => {
    const pdf = await PDFDocument.load(pdfBytes);

    const out = await PDFDocument.create();
    for (let i = from - 1; i <= to - 1; i++) {
      const [copiedPage] = await out.copyPages(pdf, [i]);
      out.addPage(copiedPage);
    }

    const outBytes = await out.save();
    return new Blob([outBytes], { type: "application/pdf" });
  };

  // (EXTRACT SELECTED removed per requirements)
  const extractSelectedPages = async (pdfBytes, pagesToExtract) => {

    const pdf = await PDFDocument.load(pdfBytes);

    const out = await PDFDocument.create();
    const sorted = [...pagesToExtract].sort((a, b) => a - b);

    for (const pageNumber of sorted) {
      const index = pageNumber - 1;
      const [copiedPage] = await out.copyPages(pdf, [index]);
      out.addPage(copiedPage);
    }

    const outBytes = await out.save();
    return new Blob([outBytes], { type: "application/pdf" });
  };


  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSplit = async () => {
    if (!pdfFile) return;

    try {
      if (!canSplit) {
        pushToast("error", "Invalid ranges. Please check overlap and bounds.");
        return;
      }

      setLoading(true);

      const pdfBytes = await pdfFile.arrayBuffer();

      // download each range as a separate file
      for (const r of ranges) {
        const from = Number(r.from);
        const to = Number(r.to);
        const blob = await splitRange(pdfBytes, from, to);
        downloadBlob(blob, `split-${from}-${to}.pdf`);
      }

      pushToast("success", "Split Completed Successfully");
    } catch (e) {
      console.error(e);
      pushToast("error", "Failed To Split PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleExtractSelected = async () => {
    if (!pdfFile) return;
    if (!selectedPages.size) {
      pushToast("error", "Select one or more pages first.");
      return;
    }

    try {
      setLoading(true);
      const pdfBytes = await pdfFile.arrayBuffer();
      const blob = await extractSelectedPages(pdfBytes, selectedPages);
      downloadBlob(blob, "selected-pages.pdf");
      pushToast("success", "Selected Pages Extracted Successfully");
    } catch (e) {
      console.error(e);
      pushToast("error", "Failed To Extract Selected Pages");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {toast && <Toast type={toast.type} message={toast.message} />}
      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative overflow-hidden pt-28">
        {/* Animated Dotted Background (same style as MergePdf) */}
        <div
          className="absolute inset-0 opacity-70 pointer-events-none animate-[moveGrid_12s_linear_infinite]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1000px] px-6 pb-24">
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
            Back to Home
          </Link>

          {/* Heading */}
          <h1 className="text-6xl font-black uppercase">PDF SPLITTER</h1>
          <p className="mt-4 max-w-xl text-lg text-gray-400">
            Split pages or extract page ranges instantly. Everything happens locally in your browser.
          </p>

          {/* Upload Zone */}
          <div className="mt-14">
            <UploadZone
              title="Drag & Drop PDF file here"
              subtitle="or click to browse local PDF files"
              accept=".pdf"
              multiple={false}
              onFilesSelected={handlePdfSelected}
            />
          </div>

          {/* Two-column layout after upload */}
          {pdfFile && pageCount > 0 && (
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left: Preview Grid */}
              <section
                className="
                  border-[3px]
                  border-black
                  bg-[#1a1a1a]
                  p-6
                  shadow-[6px_6px_0px_0px_black]
                "
              >
                <h2 className="font-mono text-sm font-bold uppercase text-white">
                  Page Preview ({pageCount})
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-gray-400">
                  Click a page card to preview. Select inside the preview. X removes from selection.
                </p>

                <div className="mt-6 relative">

                  <PagePreviewGrid
                    pages={pages}
                    selectedPages={selectedPages}
                    ranges={ranges}
                    onClickPreview={(originalPageNumber) => {
                      setPreviewOpenPage(originalPageNumber);
                    }}
                    onRemovePage={(originalPageNumber) => {
                      setPages((prev) => {
                        const next = prev.filter((p) => p.originalPageNumber !== originalPageNumber);
                        return next.map((p, idx) => ({
                          ...p,
                          displayPageNumber: idx + 1,
                        }));
                      });
                      setSelectedPages((prev) => {
                        const next = new Set(prev);
                        next.delete(originalPageNumber);
                        return next;
                      });
                      if (previewOpenPage === originalPageNumber) setPreviewOpenPage(null);
                    }}
                  />

                  <SinglePagePreviewModal
                    isOpen={previewOpenPage != null}
                    onClose={() => setPreviewOpenPage(null)}
                    pdfFile={pdfFile}
                    pageNumber={previewOpenPage} // originalPageNumber (pdf.js render)
                    displayPageNumber={
                      previewOpenPage == null ? null : pages.find((p) => p.originalPageNumber === previewOpenPage)?.displayPageNumber ?? null
                    }
                    selected={previewOpenPage != null && selectedPages.has(previewOpenPage)}
                    disabled={loading}
                    onSelect={(originalPageNumber) => {
                      setSelectedPages((prev) => {
                        const next = new Set(prev);
                        if (next.has(originalPageNumber)) next.delete(originalPageNumber);
                        else next.add(originalPageNumber);
                        return next;
                      });
                    }}
                    onRemove={(originalPageNumber) => {
                      setPages((prev) => {
                        const next = prev.filter((p) => p.originalPageNumber !== originalPageNumber);
                        return next.map((p, idx) => ({
                          ...p,
                          displayPageNumber: idx + 1,
                        }));
                      });
                      setSelectedPages((prev) => {
                        const next = new Set(prev);
                        next.delete(originalPageNumber);
                        return next;
                      });
                      setPreviewOpenPage(null);
                    }}
                  />

                  <SplitLoadingOverlay loading={loading && pageCount > 0} label="Generating previews" />
                </div>



              </section>

              {/* Right: Options */}
              <section
                className="
                  border-[3px]
                  border-black
                  bg-[#1a1a1a]
                  p-6
                  shadow-[6px_6px_0px_0px_black]
                "
              >
                <h2 className="font-mono text-sm font-bold uppercase text-white">
                  Split Options
                </h2>

                <div className="mt-6">
                  <MultiRangeInput
                    ranges={ranges}
                    setRanges={setRanges}
                    pageCount={pageCount}
                    onError={(msg) => pushToast("error", msg)}
                  />
                </div>

                <div className="mt-8">
                  <SplitButton onSplit={handleSplit} loading={loading} disabled={!canSplit} />
                </div>
              </section>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SplitPdf;

