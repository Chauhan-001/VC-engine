import { useMemo } from "react";

export default function BulkActions({
  selectedCount = 0,
  hasImages = false,
  onSelectAll,
  onRemoveAll,
  onCompressAll,
  onDownloadAll,
  onDownloadZip,
}) {
  const buttons = useMemo(
    () => [
      { key: "selectAll", label: "Select All", onClick: onSelectAll, disabled: !hasImages },
      { key: "removeAll", label: "Remove All", onClick: onRemoveAll, disabled: !hasImages },
      { key: "compressAll", label: "Compress All", onClick: onCompressAll, disabled: !hasImages },
      { key: "downloadAll", label: "Download All", onClick: onDownloadAll, disabled: !hasImages },
      { key: "downloadZip", label: "Download ZIP", onClick: onDownloadZip, disabled: !hasImages },
    ],
    [hasImages, onSelectAll, onRemoveAll, onCompressAll, onDownloadAll, onDownloadZip]
  );

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">Bulk Actions</div>
          <div className="mt-2 text-xl font-black uppercase tracking-tight">Batch Ready</div>
        </div>
        <div className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          {selectedCount} selected
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {buttons.map((button) => (
          <button
            key={button.key}
            type="button"
            onClick={button.onClick}
            disabled={button.disabled}
            className={`rounded-full border px-4 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
              button.key === "downloadAll" || button.key === "downloadZip"
                ? "border-[#22c55e] bg-[#22c55e] text-black"
                : "border-[#0066ff] bg-[#0066ff] text-white"
            } ${button.disabled ? "cursor-not-allowed opacity-50" : "hover:-translate-y-[1px]"}`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
