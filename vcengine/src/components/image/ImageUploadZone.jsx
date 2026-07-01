import { useMemo, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

const SUPPORTED_INPUT_TEXT = "JPG, JPEG, PNG, WEBP, AVIF, BMP";

export default function ImageUploadZone({ images, onAddFiles, onRemoveAll, onRemoveOne }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rejectCount, setRejectCount] = useState(0);

  const count = images.length;
  const canAddMore = count < 100;
  const remaining = Math.max(0, 100 - count);
  const accept = useMemo(() => ".jpg,.jpeg,.png,.webp,.avif,.bmp", []);

  function openPicker() {
    if (!canAddMore) return;
    inputRef.current?.click();
  }

  function validateFiles(files) {
    const list = Array.from(files || []);
    if (!list.length) return { ok: [], rejected: 0 };

    const supportedExt = new Set(["jpg", "jpeg", "png", "webp", "avif", "bmp"]);
    let rejected = 0;
    const ok = [];

    for (const file of list) {
      const ext = String(file.name || "")
        .split(".")
        .pop()
        ?.toLowerCase();
      const type = String(file.type || "").toLowerCase();
      const supported =
        supportedExt.has(ext) ||
        type.includes("jpeg") ||
        type.includes("png") ||
        type.includes("webp") ||
        type.includes("avif") ||
        type.includes("bmp");

      if (!supported) {
        rejected += 1;
        continue;
      }

      ok.push(file);
    }

    return { ok, rejected };
  }

  function handleFiles(files) {
    if (!canAddMore) return;
    const { ok, rejected } = validateFiles(files);
    setRejectCount(rejected);

    const slice = ok.slice(0, remaining);
    if (slice.length) onAddFiles(slice);
  }

  function onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (!canAddMore) return;
    handleFiles(event.dataTransfer?.files);
  }

  return (
    <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
            Upload Panel
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Drag & Drop</h2>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Images
          </div>
          <div className="text-2xl font-black">{count}</div>
        </div>
      </div>

      <div
        className={`mt-6 rounded-[20px] border border-dashed border-white/15 bg-[#0b0b0b] p-8 text-center transition-all ${
          isDragging ? "border-[#0066ff] bg-[#0f1f3b]" : ""
        }`}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (canAddMore) setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (canAddMore) setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") openPicker();
        }}
        onClick={openPicker}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0066ff]/15 text-[#0066ff]">
          <UploadCloud size={24} />
        </div>

        <div className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
          Drag & Drop Your Images Here
        </div>

        <div className="mt-3 text-sm text-gray-400">or click to browse</div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          <span className="rounded-full border border-white/10 px-3 py-1">JPG</span>
          <span className="rounded-full border border-white/10 px-3 py-1">PNG</span>
          <span className="rounded-full border border-white/10 px-3 py-1">WEBP</span>
          <span className="rounded-full border border-white/10 px-3 py-1">AVIF</span>
        </div>

        <div className="mt-6 text-sm text-gray-400">Up to 100 images • Max 50MB each</div>

        <button
          type="button"
          className="mt-6 rounded-full border border-[#0066ff] bg-[#0066ff] px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-[1px]"
          onClick={(event) => {
            event.stopPropagation();
            openPicker();
          }}
          disabled={!canAddMore}
        >
          Select Images
        </button>

        <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          {SUPPORTED_INPUT_TEXT}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {rejectCount > 0 && <div className="mt-4 text-sm text-[#ff3b30]">Ignored {rejectCount} unsupported file(s).</div>}

      {images.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Added Images
            </div>
            <button type="button" className="text-sm text-gray-400 transition-colors hover:text-white" onClick={onRemoveAll}>
              Remove All
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {images.slice(0, 8).map((image) => (
              <button
                key={image.id}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0b0b] px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-gray-300"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveOne?.(image.id);
                }}
              >
                <span className="max-w-[120px] truncate">{image.name}</span>
                <X size={12} />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
