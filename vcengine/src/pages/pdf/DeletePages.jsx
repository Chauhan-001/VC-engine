import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "pdf-lib";

import Toast from "../../components/common/Toast";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import DeletePagePreview from "../../components/pdf/PdfPagePreview";
import DeletePageGrid from "../../components/pdf/PageGrid";
import DeleteStatsCard from "../../components/pdf/DeleteStatsCard";
import DeleteButton from "../../components/pdf/DeleteButton";
import DeleteInput from "../../components/pdf/DeleteInput";

function uniqSortedNumbers(arr) {
  const set = new Set();
  for (const n of arr) {
    const x = Number(n);
    if (Number.isFinite(x)) set.add(x);
  }
  return Array.from(set).sort((a, b) => a - b);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function parseDeletionInput(input, pageCount) {
  const raw = String(input ?? "").trim();
  if (!raw) return { numbers: [], error: null };

  const tokens = raw
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const out = [];

  for (const token of tokens) {
    const rangeMatch = token.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const from = Number(rangeMatch[1]);
      const to = Number(rangeMatch[2]);
      if (!Number.isFinite(from) || !Number.isFinite(to)) {
        return { numbers: [], error: "Invalid range syntax." };
      }
      const a = Math.min(from, to);
      const b = Math.max(from, to);
      if (a < 1 || b < 1 || pageCount > 0) {
        if (a > pageCount || b > pageCount) {
          return {
            numbers: [],
            error: `Range contains pages outside the PDF bounds (1-${pageCount}).`,
          };
        }
      }
      for (let i = a; i <= b; i++) out.push(i);
      continue;
    }

    const singleMatch = token.match(/^(\d+)$/);
    if (singleMatch) {
      const n = Number(singleMatch[1]);
      if (!Number.isFinite(n)) return { numbers: [], error: "Invalid number." };
      if (pageCount > 0 && (n < 1 || n > pageCount)) {
        return {
          numbers: [],
          error: `Page ${n} is outside the PDF bounds (1-${pageCount}).`,
        };
      }
      out.push(n);
      continue;
    }

    return { numbers: [], error: "Invalid input format. Use 5, 1-4, 1,5,8-12." };
  }

  const numbers = uniqSortedNumbers(out);
  return { numbers, error: null };
}

function buildInputFromNumbers(numbers) {
  const sorted = uniqSortedNumbers(numbers);
  if (sorted.length === 0) return "";
  // Compact contiguous ranges for readability.
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const n = sorted[i];
    if (n === prev + 1) {
      prev = n;
      continue;
    }
    ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
    start = n;
    prev = n;
  }
  ranges.push(start === prev ? `${start}` : `${start}-${prev}`);
  return ranges.join(",");
}

export default function DeletePages() {
  const [toast, setToast] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  // Selected page numbers for deletion (original page numbers).
  const [selectedPages, setSelectedPages] = useState(() => new Set());
  const selectedPageArray = useMemo(
    () => Array.from(selectedPages).sort((a, b) => a - b),
    [selectedPages]
  );

  const [previewPage, setPreviewPage] = useState(1);

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorCard, setErrorCard] = useState(null);

  const pushToast = useCallback((type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const resetState = useCallback(() => {
    setSelectedPages(new Set());
    setPreviewPage(1);
    setInputValue("");
    setInputError(null);
    setErrorCard(null);
    setPageCount(0);
    setPdfFile(null);
  }, []);

  const handlePdfSelected = useCallback(async (selectedFiles) => {
    setErrorCard(null);
    setToast(null);

    const file = selectedFiles?.[0];
    if (!file) return;

    try {
      setLoading(false);
      setPdfFile(file);
      setSelectedPages(new Set());
      setInputValue("");
      setInputError(null);
      setPreviewPage(1);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setPageCount(count);
      if (count > 0) setPreviewPage(1);

      pushToast("success", "PDF loaded. Select pages to delete.");
    } catch (e) {
      console.error(e);
      setPdfFile(null);
      setPageCount(0);
      setErrorCard({ message: "Failed to read PDF. It may be corrupted." });
      pushToast("error", "Failed To Read PDF");
    }
  }, [pushToast]);

  const setSelectionFromNumbers = useCallback(
    (numbers) => {
      const valid = uniqSortedNumbers(numbers).filter((n) => n >= 1 && n <= pageCount);
      setSelectedPages(new Set(valid));

      const nextInput = buildInputFromNumbers(valid);
      setInputValue(nextInput);
      setInputError(null);

      if (valid.length > 0) {
        setPreviewPage((prev) => {
          // Keep preview if still selected, otherwise preview first selected.
          return valid.includes(prev) ? prev : valid[0];
        });
      } else {
        setPreviewPage((prev) => (pageCount > 0 ? clamp(prev, 1, pageCount) : 1));
      }
    },
    [pageCount]
  );

  const handleInputChange = useCallback(
    (raw) => {
      setInputValue(raw);
      setErrorCard(null);

      if (!pageCount) {
        setInputError(null);
        setSelectedPages(new Set());
        return;
      }

      const { numbers, error } = parseDeletionInput(raw, pageCount);
      if (error) {
        setInputError(error);
        // Do not change selection while input is invalid.
        return;
      }

      setSelectedPages(new Set(numbers));
      setInputError(null);

      if (numbers.length > 0) {
        setPreviewPage((prev) => (numbers.includes(prev) ? prev : numbers[0]));
      }
    },
    [pageCount]
  );

  const handleTogglePage = useCallback(
    (pageNumber) => {
      if (!pageCount) return;
      setErrorCard(null);

      setSelectedPages((prev) => {
        const next = new Set(prev);
        if (next.has(pageNumber)) next.delete(pageNumber);
        else next.add(pageNumber);

        const arr = Array.from(next).sort((a, b) => a - b);
        const nextInput = buildInputFromNumbers(arr);
        setInputValue(nextInput);
        setInputError(null);

        if (next.size > 0) {
          setPreviewPage((p) => (next.has(p) ? p : arr[0]));
        }

        return next;
      });
    },
    [pageCount]
  );

  const downloadBlob = useCallback((blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!pdfFile || !pageCount) return;

    const pagesToDelete = Array.from(selectedPages).sort((a, b) => a - b);
    if (!pagesToDelete.length) return;

    setLoading(true);
    setErrorCard(null);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const srcPdf = await PDFDocument.load(pdfBytes);

      // Validate again against current pageCount.
      const toDeleteSet = new Set(pagesToDelete.filter((n) => n >= 1 && n <= srcPdf.getPageCount()));

      const outPdf = await PDFDocument.create();
      const total = srcPdf.getPageCount();

      for (let i = 1; i <= total; i++) {
        if (toDeleteSet.has(i)) continue;
        const [copiedPage] = await outPdf.copyPages(srcPdf, [i - 1]);
        outPdf.addPage(copiedPage);
      }

      const outBytes = await outPdf.save();
      const outBlob = new Blob([outBytes], { type: "application/pdf" });
      downloadBlob(outBlob, "updated.pdf");
      pushToast("success", "Pages deleted. Downloading updated.pdf...");
    } catch (e) {
      console.error(e);
      setErrorCard({ message: "Failed to delete pages. The PDF may be corrupted or too large." });
      pushToast("error", "Failed To Delete Pages");
    } finally {
      setLoading(false);
    }
  }, [downloadBlob, pageCount, pdfFile, pushToast, selectedPages]);

  // Keep preview within bounds.
  useEffect(() => {
    if (!pageCount) return;
    setPreviewPage((p) => clamp(p, 1, pageCount));
  }, [pageCount]);

  const originalPagesCount = pageCount;
  const deletedCount = selectedPageArray.length;
  const remaining = Math.max(0, originalPagesCount - deletedCount);

  const handlePrev = useCallback(() => {
    setPreviewPage((p) => Math.max(1, p - 1));
  }, []);
  const handleNext = useCallback(() => {
    setPreviewPage((p) => Math.min(pageCount || 1, p + 1));
  }, [pageCount]);

  const onKeyDownPreview = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
      // ESC should do nothing.
    },
    [handleNext, handlePrev]
  );

  useEffect(() => {
    // Global key support only when PDF is loaded & preview is visible.
    const handler = (e) => {
      if (!pdfFile || !pageCount) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNext, handlePrev, pageCount, pdfFile]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {toast && <Toast type={toast.type} message={toast.message} />}
      <Navbar />

      <main className="relative overflow-hidden pt-28">
        <div
          className="absolute inset-0 opacity-70 pointer-events-none animate-[moveGrid_12s_linear_infinite]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1000px] px-6 pb-24">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase text-gray-300 transition-colors hover:text-[#0066ff]"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 className="text-6xl font-black uppercase">DELETE PDF PAGES</h1>
          <p className="mt-4 max-w-xl text-lg text-gray-400">
            Remove unwanted pages from your PDF instantly. Everything stays local in your browser.
          </p>

          <div className="mt-14">
            <UploadZone
              title="Drag & Drop PDF file here"
              subtitle="or click to browse local PDF files"
              accept=".pdf"
              multiple={false}
              onFilesSelected={handlePdfSelected}
            />
          </div>

          {errorCard && (
            <div className="mt-6 border-[3px] border-black bg-[#1a1a1a] p-5 shadow-[6px_6px_0px_0px_black]">
              <p className="font-mono text-sm font-bold uppercase text-red-300">{errorCard.message}</p>
            </div>
          )}

          {pdfFile && pageCount > 0 && (
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* LEFT (40% on desktop) */}
              <section className="md:col-span-1">
                <div className="
                  border-[3px]
                  border-black
                  bg-[#1a1a1a]
                  p-6
                  shadow-[6px_6px_0px_0px_black]
                ">
                  <h2 className="font-mono text-sm font-bold uppercase text-white">Page Preview</h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-gray-400">
                    Click a page card to update the live preview.
                  </p>

                  <div
                    className="mt-6"
                    tabIndex={0}
                    onKeyDown={onKeyDownPreview}
                    aria-label="Live PDF page preview"
                  >
                    <DeletePagePreview
                      pdfFile={pdfFile}
                      pageNumber={previewPage}
                      pageCount={pageCount}
                    />

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="
                          border-[3px]
                          border-black
                          bg-[#161616]
                          px-4
                          py-2
                          font-mono
                          text-xs
                          font-bold
                          uppercase
                          text-gray-200
                          shadow-[4px_4px_0px_0px_black]
                          transition-all
                          hover:-translate-y-[2px]
                          hover:text-[#0066ff]
                          hover:border-[#0066ff]
                          hover:shadow-[6px_6px_0px_0px_black]
                          disabled:opacity-50
                          disabled:hover:translate-y-0
                        "
                        disabled={previewPage <= 1 || loading}
                        aria-label="Previous page"
                      >
                        Previous
                      </button>

                      <div className="font-mono text-xs uppercase tracking-wider text-gray-400">
                        PAGE {previewPage}
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="
                          border-[3px]
                          border-black
                          bg-[#161616]
                          px-4
                          py-2
                          font-mono
                          text-xs
                          font-bold
                          uppercase
                          text-gray-200
                          shadow-[4px_4px_0px_0px_black]
                          transition-all
                          hover:-translate-y-[2px]
                          hover:text-[#0066ff]
                          hover:border-[#0066ff]
                          hover:shadow-[6px_6px_0px_0px_black]
                          disabled:opacity-50
                          disabled:hover:translate-y-0
                        "
                        disabled={previewPage >= pageCount || loading}
                        aria-label="Next page"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* RIGHT (60% on desktop) */}
              <section className="md:col-span-1">
                <div className="
                  border-[3px]
                  border-black
                  bg-[#1a1a1a]
                  p-6
                  shadow-[6px_6px_0px_0px_black]
                ">
                  <h2 className="font-mono text-sm font-bold uppercase text-white">Delete Controls</h2>

                  <div className="mt-6">
                    <DeleteInput
                      value={inputValue}
                      onChange={handleInputChange}
                      pageCount={pageCount}
                      error={inputError}
                      disabled={loading}
                      ariaLabel="Pages to delete input"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="font-mono text-xs uppercase tracking-wider text-gray-400">PAGES</div>
                    <DeletePageGrid
                      pageCount={pageCount}
                      selectedPages={selectedPages}
                      onTogglePage={(n) => handleTogglePage(n)}
                      onSelectPreview={(n) => setPreviewPage(n)}
                      disabled={loading}
                    />
                  </div>

                  <div className="mt-6">
                    <DeleteStatsCard
                      originalPages={originalPagesCount}
                      selectedForDeletion={deletedCount}
                      remaining={remaining}
                    />
                  </div>

                  <div className="mt-6">
                    <DeleteButton
                      onDelete={handleDelete}
                      disabled={deletedCount === 0 || loading}
                      loading={loading}
                    />
                  </div>

                  <div className="mt-4 font-mono text-xs uppercase tracking-wider text-gray-400">
                    updated.pdf will be generated locally.
                  </div>
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

