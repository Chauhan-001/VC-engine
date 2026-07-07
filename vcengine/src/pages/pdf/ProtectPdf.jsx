import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "@cantoo/pdf-lib";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import ProtectControls from "../../components/pdf/ProtectControls";

function ProtectPdf() {
  const [pdfFile, setPdfFile] =
    useState(null);

  const [pageCount, setPageCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [
    userPassword,
    setUserPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    ownerPassword,
    setOwnerPassword,
  ] = useState("");

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

  async function handleProtect() {
    if (!pdfFile) {
      return;
    }

    if (
      userPassword !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      const bytes =
        await pdfFile.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      pdf.encrypt({
        userPassword,

        ownerPassword:
          ownerPassword.trim() ||
          userPassword,

        permissions: {
          printing: "highResolution",

          modifying: false,

          copying: false,

          annotating: false,

          fillingForms: true,

          contentAccessibility: true,

          documentAssembly: false,
        },
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
        "protected.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Protect Error:",
        error
      );

      alert(
        "Failed to protect PDF."
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
            Protect PDF
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-gray-400
            "
          >
            Add password protection
            to your PDF directly in
            your browser. Your files
            never leave your device.
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

          {/* Info */}
          {pdfFile && (
            <div
              className="
                mt-8
                border-[3px]
                border-black
                bg-[#111111]
                p-5
                shadow-[4px_4px_0px_0px_black]
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  gap-6
                  font-mono
                  text-xs
                  uppercase
                "
              >
                <span>
                  File:
                  {" "}
                  {pdfFile.name}
                </span>

                <span>
                  Pages:
                  {" "}
                  {pageCount}
                </span>

                <span className="text-green-400">
                  Local Processing
                </span>
              </div>
            </div>
          )}

          {/* Controls */}
          {pdfFile && (
            <div className="mt-10">
              <ProtectControls
                userPassword={
                  userPassword
                }
                setUserPassword={
                  setUserPassword
                }
                confirmPassword={
                  confirmPassword
                }
                setConfirmPassword={
                  setConfirmPassword
                }
                ownerPassword={
                  ownerPassword
                }
                setOwnerPassword={
                  setOwnerPassword
                }
                loading={loading}
                onProtect={
                  handleProtect
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

export default ProtectPdf;