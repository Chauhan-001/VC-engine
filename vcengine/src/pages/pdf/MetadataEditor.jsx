import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PDFDocument } from "@cantoo/pdf-lib";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import UploadZone from "../../components/common/UploadZone";

import MetadataControls from "../../components/pdf/MetadataControls";
import MetadataPreviewCard from "../../components/pdf/MetadataPreviewCard";

function MetadataEditor() {
  const [pdfFile, setPdfFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // Metadata
  const [title, setTitle] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [keywords, setKeywords] =
    useState("");

  const [creator, setCreator] =
    useState("");

  const [producer, setProducer] =
    useState("");

  const [
    creationDate,
    setCreationDate,
  ] = useState(null);

  const [
    modificationDate,
    setModificationDate,
  ] = useState(null);

  async function handleUpload(files) {
    try {
      const file = files?.[0];

      if (!file) return;

      setPdfFile(file);

      const bytes =
        await file.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      setTitle(
        pdf.getTitle() || ""
      );

      setAuthor(
        pdf.getAuthor() || ""
      );

      setSubject(
        pdf.getSubject() || ""
      );

      setKeywords(
        pdf.getKeywords()?.join(
          ", "
        ) || ""
      );

      setCreator(
        pdf.getCreator() || ""
      );

      setProducer(
        pdf.getProducer() || ""
      );

      setCreationDate(
        pdf.getCreationDate()
      );

      setModificationDate(
        pdf.getModificationDate()
      );
    } catch (error) {
      console.error(
        "Metadata Upload Error:",
        error
      );

      alert(
        "Failed to read PDF metadata."
      );
    }
  }

  function handleReset() {
    setTitle("");

    setAuthor("");

    setSubject("");

    setKeywords("");

    setCreator("");

    setProducer("");
  }

  async function handleSave() {
    if (!pdfFile) return;

    try {
      setLoading(true);

      const bytes =
        await pdfFile.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      pdf.setTitle(title);

      pdf.setAuthor(author);

      pdf.setSubject(subject);

      pdf.setKeywords(
        keywords
          .split(",")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      );

      pdf.setCreator(creator);

      pdf.setProducer(producer);

      pdf.setModificationDate(
        new Date()
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
        ) + "-metadata.pdf";

      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Metadata Save Error:",
        error
      );

      alert(
        "Failed to save metadata."
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
              hover:text-[#7c3aed]
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
            Metadata Editor
          </h1>

          <p
            className="
              mt-4
              max-w-2xl
              text-gray-400
            "
          >
            View and edit PDF metadata
            directly in your browser.
            No files are uploaded to
            any server.
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

          {/* Editor */}
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
              <MetadataPreviewCard
                title={title}
                author={author}
                subject={subject}
                keywords={keywords}
                creator={creator}
                producer={producer}
                creationDate={
                  creationDate
                }
                modificationDate={
                  modificationDate
                }
              />

              {/* Controls */}
              <MetadataControls
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                subject={subject}
                setSubject={setSubject}
                keywords={keywords}
                setKeywords={
                  setKeywords
                }
                creator={creator}
                setCreator={
                  setCreator
                }
                producer={producer}
                setProducer={
                  setProducer
                }
                loading={loading}
                onSave={
                  handleSave
                }
                onReset={
                  handleReset
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

export default MetadataEditor;