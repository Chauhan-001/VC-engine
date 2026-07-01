import { useMemo } from "react";
import { Download, Trash2 } from "lucide-react";

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(size >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function formatResolution(width, height) {
  if (!width || !height) return "—";
  return `${width} × ${height}`;
}

export default function ImageCard({ image, checked, onToggle, onRemove }) {
  const savedText = useMemo(() => {
    if (!Number.isFinite(image?.size) || !Number.isFinite(image?.outputSize) || image.size <= 0) return "—";
    const saved = Math.max(0, Math.round(((image.size - image.outputSize) / image.size) * 100));
    return `${saved}%`;
  }, [image]);

  return (
    <div className={`rounded-[16px] border ${checked ? "border-[#0066ff]" : "border-white/10"} bg-[#0b0b0b] p-4`}> 
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 rounded border-white/20 bg-transparent" />

          <div className="h-16 w-16 overflow-hidden rounded-[10px] border border-white/10 bg-[#111111]">
            {image?.previewUrl ? (
              <img src={image.previewUrl} alt={image.name} className="h-full w-full object-cover" />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-white">{image?.name || "Image"}</div>
            <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
              <span>{formatResolution(image?.outputWidth || image?.width, image?.outputHeight || image?.height)}</span>
              <span>{formatBytes(image?.size || 0)}</span>
              <span>{image?.outputSize ? formatBytes(image.outputSize) : "Pending"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="rounded-full border border-white/10 bg-[#111111] px-3 py-2 text-gray-300">
            {savedText}
          </div>
          <div className="rounded-full border border-white/10 bg-[#111111] px-3 py-2 text-gray-300">
            {image?.status === "done" ? "Compressed" : image?.status === "compressing" ? "Compressing" : "Queued"}
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-white/10 bg-[#111111] p-2 text-gray-300 transition-colors hover:text-[#ff3b30]"
            aria-label="Remove image"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
