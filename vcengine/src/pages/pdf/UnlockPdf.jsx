import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "@cantoo/pdf-lib";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import UnlockControls from "../../components/pdf/UnlockControls";

function UnlockPdf() {
  const [pdfFile, setPdfFile] =
    useState(null);

  const [pageCount, setPageCount] =
    useState(0);

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleUpload(files) {
    try {
      setError("");

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

      try {
        const pdf =
          await pdfjsLib.getDocument({
            data: bytes,
            password: "",
          }).promise;

        setPageCount(pdf.numPages);
      } catch {
        setPageCount(0);
      }
    } catch (err) {
      console.error(
        "Upload Error:",
        err
      );

      setError(
        "Failed to load PDF."
      );
    }
  }

  async function handleUnlock() {
    if (!pdfFile || !password) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const bytes =
        await pdfFile.arrayBuffer();

      const pdf =
        await PDFDocument.load(
          bytes,
          {
            password,
          }
        );

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
        pdfFile.name.replace(
          ".pdf",
          ""
        ) + "-unlocked.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(
        "Unlock Error:",
        err
      );

      setError(
        "Invalid password or corrupted PDF."
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
              hover:text-[#00aa55]
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
            Unlock PDF
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-gray-400
            "
          >
            Remove password protection
            from your PDF locally in
            your browser. No files are
            uploaded to any server.
          </p>

          {/* Upload */}
          <div className="mt-14">
            <UploadZone
              title="Drag & Drop Protected PDF"
              subtitle="or click to browse"
              accept=".pdf"
              multiple={false}
              onFilesSelected={
                handleUpload
              }
            />
          </div>

          {/* Controls */}
          {pdfFile && (
            <div className="mt-12">
              <UnlockControls
                pdfFile={pdfFile}
                pageCount={pageCount}
                password={password}
                setPassword={
                  setPassword
                }
                loading={loading}
                error={error}
                onUnlock={
                  handleUnlock
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

export default UnlockPdf;