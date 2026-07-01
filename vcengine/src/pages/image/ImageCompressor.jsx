import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, HardDrive, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import ImageUploadZone from "../../components/image/ImageUploadZone";
import CompressionSettings from "../../components/image/CompressionSettings";
import ImageList from "../../components/image/ImageList";
import BulkActions from "../../components/image/BulkActions";
import ResultsSummary from "../../components/image/ResultsSummary";
import ImageComparisonSlider from "../../components/image/ImageComparisonSlider";

import detectCapabilities from "../../utils/image/detectCapabilities";
import compressImageFile from "../../utils/image/compressImage";
import downloadZipImages from "../../utils/image/downloadZip";

const DEFAULT_STATE = {
  images: [],
  selectedImages: [],
  outputFormat: "webp",
  qualityPreset: "balanced",
  quality: 65,
  resizeMode: "original",
  width: "",
  height: "",
  maintainAspectRatio: true,
  compressionMode: "balanced",
  keepMetadata: false,
  comparisonMode: "slider",
  isCompressing: false,
  progress: 0,
  results: [],
};

export default function ImageCompressor() {
  const [state, setState] = useState(DEFAULT_STATE);
  const objectUrlsRef = useRef([]);

  const capabilities = useMemo(() => detectCapabilities(), []);
  const avifSupported = capabilities?.avif?.supported ?? false;
  const webpSupported = capabilities?.webp?.supported ?? false;

  const selectedCount = state.selectedImages.length;
  const totalOriginalBytes = useMemo(() => {
    return state.images.reduce((sum, img) => sum + (img.size || 0), 0);
  }, [state.images]);

  const totalCompressedBytes = useMemo(() => {
    return state.results.reduce((sum, r) => sum + (r.outputSize || 0), 0);
  }, [state.results]);

  const spaceSavedPct = useMemo(() => {
    if (!totalOriginalBytes) return 0;
    const saved = totalOriginalBytes - totalCompressedBytes;
    return Math.max(0, Math.round((saved / totalOriginalBytes) * 100));
  }, [totalOriginalBytes, totalCompressedBytes]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  function setPatch(patchOrUpdater) {
    setState((current) => {
      const patch = typeof patchOrUpdater === "function" ? patchOrUpdater(current) : patchOrUpdater;
      return { ...current, ...patch };
    });
  }

  function trackUrl(url) {
    if (url) objectUrlsRef.current.push(url);
    return url;
  }

  function revokeUrl(url) {
    if (!url) return;
    URL.revokeObjectURL(url);
    objectUrlsRef.current = objectUrlsRef.current.filter((tracked) => tracked !== url);
  }

  function handleAddFiles(files) {
    const validated = [];
    const supportedExt = new Set(["jpg", "jpeg", "png", "webp", "avif", "bmp"]);

    for (const file of Array.from(files || [])) {
      const ext = String(file.name || "")
        .split(".")
        .pop()
        ?.toLowerCase();
      const type = String(file.type || "").toLowerCase();
      const isSupported =
        supportedExt.has(ext) ||
        type.includes("jpeg") ||
        type.includes("png") ||
        type.includes("webp") ||
        type.includes("avif") ||
        type.includes("bmp");

      if (!isSupported) continue;

      validated.push({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: trackUrl(URL.createObjectURL(file)),
        outputUrl: null,
        outputSize: null,
        outputWidth: null,
        outputHeight: null,
        savedPercent: 0,
        status: "queued",
      });
    }

    if (!validated.length) return;

    setPatch((current) => {
      const next = [...current.images, ...validated].slice(0, 100);
      return {
        images: next,
        selectedImages: next.map((img) => img.id),
      };
    });
  }

  function handleRemoveImage(id) {
    setPatch((current) => {
      const image = current.images.find((item) => item.id === id);
      if (image?.previewUrl) revokeUrl(image.previewUrl);
      if (image?.outputUrl) revokeUrl(image.outputUrl);

      return {
        images: current.images.filter((item) => item.id !== id),
        selectedImages: current.selectedImages.filter((item) => item !== id),
        results: current.results.filter((result) => result.id !== id),
      };
    });
  }

  function handleSelectToggle(id) {
    setPatch((current) => {
      const exists = current.selectedImages.includes(id);
      return {
        selectedImages: exists
          ? current.selectedImages.filter((item) => item !== id)
          : [...current.selectedImages, id],
      };
    });
  }

  function handleSelectAll() {
    setPatch((current) => ({ selectedImages: current.images.map((img) => img.id) }));
  }

  function handleRemoveAll() {
    setPatch((current) => {
      current.images.forEach((img) => {
        if (img.previewUrl) revokeUrl(img.previewUrl);
        if (img.outputUrl) revokeUrl(img.outputUrl);
      });
      return { ...DEFAULT_STATE, selectedImages: [] };
    });
  }

  async function handleCompressAll() {
    const targetIds = state.selectedImages.length ? state.selectedImages : state.images.map((img) => img.id);
    const queue = state.images.filter((img) => targetIds.includes(img.id));

    if (!queue.length) return;

    setPatch({
      isCompressing: true,
      progress: 0,
      results: [],
      images: state.images.map((img) => (targetIds.includes(img.id) ? { ...img, status: "compressing" } : img)),
    });

    const results = [];

    for (const [index, image] of queue.entries()) {
      if (image.outputUrl) revokeUrl(image.outputUrl);

      const result = await compressImageFile(image.file, state);
      const outputUrl = trackUrl(URL.createObjectURL(result.blob));
      const savedPercent = image.size > 0 ? Math.max(0, Math.round(((image.size - result.blob.size) / image.size) * 100)) : 0;
      const entry = {
        id: image.id,
        name: image.name,
        outputSize: result.blob.size,
        outputUrl,
        outputWidth: result.width,
        outputHeight: result.height,
        savedPercent,
        outputFormat: result.outputFormat || state.outputFormat,
      };

      results.push(entry);

      setPatch((current) => ({
        progress: Math.round(((index + 1) / queue.length) * 100),
        images: current.images.map((item) =>
          item.id === image.id
            ? {
                ...item,
                status: "done",
                outputUrl,
                outputSize: result.blob.size,
                outputWidth: result.width,
                outputHeight: result.height,
                savedPercent,
                outputFormat: result.outputFormat || state.outputFormat,
              }
            : item
        ),
        results: [...current.results.filter((resultItem) => resultItem.id !== image.id), entry],
      }));
    }

    setPatch({ isCompressing: false, progress: 100 });
  }

  async function handleDownloadAll() {
    const downloadable = state.images.filter((img) => img.outputUrl);
    for (const image of downloadable) {
      const link = document.createElement("a");
      link.href = image.outputUrl;
      const extension = image.outputFormat || state.outputFormat;
      link.download = image.name.replace(/\.[^.]+$/, "") + "." + (extension === "jpg" ? "jpg" : extension);
      link.click();
    }
  }

  async function handleDownloadZip() {
    const downloadable = state.images.filter((img) => img.outputUrl);
    await downloadZipImages(downloadable, state.outputFormat);
  }

  const outputFormatLabel = useMemo(() => {
    if (state.outputFormat === "avif" && !avifSupported) return "AVIF (fallback)";
    if (state.outputFormat === "webp" && !webpSupported) return "WEBP (fallback)";
    return state.outputFormat.toUpperCase();
  }, [state.outputFormat, avifSupported, webpSupported]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pb-24 pt-28">
        <div className="mx-auto max-w-[1800px] px-6">
          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-[#0066ff]"
              >
                <ArrowLeft size={18} />
                Back to Image Lab
              </Link>

              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Image Compressor
              </h1>

              <p className="mt-4 text-lg text-gray-400">
                Compress JPG, PNG, WEBP and AVIF images locally.
              </p>

              <p className="mt-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#0066ff]">
                No Uploads • 100% Private • Batch Support
              </p>
            </div>

            <div className="rounded-[16px] border border-white/10 bg-[#111111] p-5 shadow-[8px_8px_0px_0px_#111111]">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
                <HardDrive size={16} />
                100% Local Processing
              </div>
              <p className="mt-3 max-w-sm text-sm text-gray-400">
                Your files never leave your device.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[430px_1fr]">
            <ImageUploadZone
              images={state.images}
              onAddFiles={handleAddFiles}
              onRemoveAll={handleRemoveAll}
              onRemoveOne={handleRemoveImage}
            />

            <CompressionSettings
              state={state}
              setState={setPatch}
              capabilities={capabilities}
            />
          </div>

          <div className="mt-10">
            <BulkActions
              selectedCount={selectedCount}
              hasImages={state.images.length > 0}
              onSelectAll={handleSelectAll}
              onRemoveAll={handleRemoveAll}
              onCompressAll={handleCompressAll}
              onDownloadAll={handleDownloadAll}
              onDownloadZip={handleDownloadZip}
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <ImageList
              images={state.images}
              selectedImages={state.selectedImages}
              onToggleSelect={handleSelectToggle}
              onRemove={handleRemoveImage}
            />

            <ImageComparisonSlider
              images={state.images}
              selectedImages={state.selectedImages}
              comparisonMode={state.comparisonMode}
              onModeChange={(mode) => setPatch({ comparisonMode: mode })}
            />
          </div>

          <div className="mt-10">
            <ResultsSummary
              totalOriginalBytes={totalOriginalBytes}
              totalCompressedBytes={totalCompressedBytes}
              spaceSavedPct={spaceSavedPct}
              hasResults={state.results.length > 0}
              onDownloadZip={handleDownloadZip}
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "No Uploads",
              "100% Local Processing",
              "Batch Support",
              "Fast & Efficient",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[16px] border border-white/10 bg-[#111111] px-5 py-4 text-center font-mono text-sm font-semibold uppercase tracking-[0.2em] text-gray-300"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1">
              <Sparkles size={14} />
              {outputFormatLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1">
              Quality {state.quality}%
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111] px-3 py-1">
              Resize {state.resizeMode === "original" ? "Original" : state.resizeMode}
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

