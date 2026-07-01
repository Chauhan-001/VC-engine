import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, HardDrive, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ImageDropzone from "../../components/image/converter/ImageDropzone";
import ImagePreview from "../../components/image/converter/ImagePreview";
import ConvertButton from "../../components/image/converter/ConvertButton";
import DownloadButton from "../../components/image/converter/DownloadButton";
import convertImage from "../../utils/image/convertImage";

const CONVERTER_CONFIGS = {
  "jpg-to-png": {
    title: "JPG to PNG",
    description: "Convert JPG and JPEG files to transparent PNG output in your browser.",
    acceptedFormats: "JPG, JPEG",
    accept: ".jpg,.jpeg,image/jpeg",
    inputMimeTypes: ["image/jpeg", "image/jpg"],
    outputFormat: "png",
    outputMimeType: "image/png",
    outputExtension: "png",
    outputLabel: "PNG",
  },
  "png-to-jpg": {
    title: "PNG to JPG",
    description: "Turn PNG images into compact JPG files locally without uploading anything.",
    acceptedFormats: "PNG",
    accept: ".png,image/png",
    inputMimeTypes: ["image/png"],
    outputFormat: "jpg",
    outputMimeType: "image/jpeg",
    outputExtension: "jpg",
    outputLabel: "JPG",
  },
  "webp-to-png": {
    title: "WEBP to PNG",
    description: "Convert WEBP files to PNG using browser-based image processing.",
    acceptedFormats: "WEBP",
    accept: ".webp,image/webp",
    inputMimeTypes: ["image/webp"],
    outputFormat: "png",
    outputMimeType: "image/png",
    outputExtension: "png",
    outputLabel: "PNG",
  },
  "png-to-webp": {
    title: "PNG to WEBP",
    description: "Convert PNG images to WEBP with a single click and download the result.",
    acceptedFormats: "PNG",
    accept: ".png,image/png",
    inputMimeTypes: ["image/png"],
    outputFormat: "webp",
    outputMimeType: "image/webp",
    outputExtension: "webp",
    outputLabel: "WEBP",
  },
  "svg-to-png": {
    title: "SVG to PNG",
    description: "Convert SVG files to a standard PNG image right in the browser.",
    acceptedFormats: "SVG",
    accept: ".svg,image/svg+xml",
    inputMimeTypes: ["image/svg+xml"],
    outputFormat: "png",
    outputMimeType: "image/png",
    outputExtension: "png",
    outputLabel: "PNG",
  },
};

export default function ImageConverter({ converterKey = "jpg-to-png" }) {
  const config = useMemo(() => CONVERTER_CONFIGS[converterKey] || CONVERTER_CONFIGS["jpg-to-png"], [converterKey]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [convertedName, setConvertedName] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");
  const objectUrlsRef = useRef([]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  function trackUrl(url) {
    if (url) objectUrlsRef.current.push(url);
    return url;
  }

  function revokeUrl(url) {
    if (!url) return;
    URL.revokeObjectURL(url);
    objectUrlsRef.current = objectUrlsRef.current.filter((tracked) => tracked !== url);
  }

  function resetPreviewStates(nextFile = null) {
    if (previewUrl) revokeUrl(previewUrl);
    if (convertedUrl) revokeUrl(convertedUrl);
    setPreviewUrl("");
    setConvertedUrl("");
    setConvertedName("");
    setError("");
    if (nextFile) {
      const nextPreviewUrl = trackUrl(URL.createObjectURL(nextFile));
      setPreviewUrl(nextPreviewUrl);
    }
  }

  function handleFileSelected(file) {
    if (!file) return;
    setSelectedFile(file);
    resetPreviewStates(file);
  }

  async function handleConvert() {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    try {
      setIsBusy(true);
      setError("");
      const result = await convertImage(selectedFile, config);
      if (convertedUrl) revokeUrl(convertedUrl);
      const nextUrl = trackUrl(URL.createObjectURL(result.blob));
      setConvertedUrl(nextUrl);
      setConvertedName(result.fileName);
    } catch (err) {
      setError(err.message || "Conversion failed.");
    } finally {
      setIsBusy(false);
    }
  }

  function handleDownload() {
    if (!convertedUrl) return;
    const link = document.createElement("a");
    link.href = convertedUrl;
    link.download = convertedName || `${selectedFile?.name || "converted"}.${config.outputExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <Link to="/" className="mb-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-[#0066ff]">
                <ArrowLeft size={18} />
                Back to Image Lab
              </Link>
              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">{config.title}</h1>
              <p className="mt-4 text-lg text-gray-400">{config.description}</p>
              <p className="mt-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#0066ff]">
                No Uploads • 100% Private • Single File Conversion
              </p>
            </div>

            <div className="rounded-[16px] border border-white/10 bg-[#111111] p-5 shadow-[8px_8px_0px_0px_#111111]">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
                <HardDrive size={16} />
                100% Local Processing
              </div>
              <p className="mt-3 max-w-sm text-sm text-gray-400">Your files stay on your device and are converted directly in your browser.</p>
            </div>
          </div>

          <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <ImageDropzone
                  accept={config.accept}
                  acceptedFormats={config.acceptedFormats}
                  onFileSelected={handleFileSelected}
                  selectedFile={selectedFile}
                  isBusy={isBusy}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <ConvertButton onConvert={handleConvert} disabled={!selectedFile} isBusy={isBusy} />
                  <DownloadButton onDownload={handleDownload} disabled={!convertedUrl} />
                </div>

                {error ? <div className="text-sm text-[#ff3b30]">{error}</div> : null}
              </div>

              <div className="space-y-6">
                <ImagePreview previewUrl={previewUrl} convertedUrl={convertedUrl} outputLabel={config.outputLabel} convertedName={convertedName} />
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1">
              <Sparkles size={14} />
              {config.outputLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1">
              {config.acceptedFormats}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1">
              Instant Download
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
