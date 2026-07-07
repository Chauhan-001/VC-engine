import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Toast from "../../components/common/Toast";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";
import FileList from "../../components/pdf/FileList";

function MergePdf() {
  // State to store uploaded PDFs
  const [toast, setToast] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add new files
  const handleFiles = (selectedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles,
    ]);
  };

  // Remove a single file
  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  // Clear all files
  const handleClearAll = () => {
    setFiles([]);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files.");
      return;
    }

    try {
      setLoading(true);

      // Create an empty PDF
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();

      // Process every uploaded PDF
      for (const file of files) {
        // Convert file to binary data
        const arrayBuffer = await file.arrayBuffer();

        // Load PDF
        const pdf = await PDFDocument.load(arrayBuffer);

        // Get all page indices
        const pageIndices = pdf.getPageIndices();

        // Copy pages into merged PDF
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);

        // Add pages
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      // Save merged PDF
      const mergedBytes = await mergedPdf.save();

      // Create downloadable file
      const blob = new Blob([mergedBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";

      document.body.appendChild(link);
      link.click();

      setToast({
        type: "success",
        message: "PDF Merged Successfully",
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed To Merge PDFs",
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      {toast && (
  <Toast
    type={toast.type}
    message={toast.message}
  />
)}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="relative overflow-hidden pt-28">
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
          <h1 className="text-6xl font-black uppercase">
            PDF MERGER
          </h1>

          <p className="mt-4 max-w-xl text-lg text-gray-400">
            Combine multiple PDF files into one secure document instantly.
          </p>

          {/* Upload Zone */}
          <div className="mt-14">
            <UploadZone
              title="Drag & Drop PDF files here"
              subtitle="or click to browse local PDF files"
              accept=".pdf"
              multiple={true}
              onFilesSelected={handleFiles}
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
           <FileList
  files={files}
  onRemoveFile={handleRemoveFile}
  onClearAll={handleClearAll}
  onMerge={handleMerge}
  loading={loading}
/>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MergePdf;