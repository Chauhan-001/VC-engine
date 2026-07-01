import { Download } from "lucide-react";

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

export default function ResultsSummary({ totalOriginalBytes, totalCompressedBytes, spaceSavedPct, hasResults, onDownloadZip }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
            Results Summary
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Space Saved</h2>
        </div>

        {hasResults ? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#22c55e] bg-[#22c55e] px-4 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all hover:-translate-y-[1px]"
            onClick={onDownloadZip}
          >
            <Download size={16} />
            Download All as ZIP
          </button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[16px] border border-white/10 bg-[#0b0b0b] p-4">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Total Original</div>
          <div className="mt-3 text-2xl font-black">{formatBytes(totalOriginalBytes)}</div>
        </div>
        <div className="rounded-[16px] border border-white/10 bg-[#0b0b0b] p-4">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Total Compressed</div>
          <div className="mt-3 text-2xl font-black">{formatBytes(totalCompressedBytes)}</div>
        </div>
        <div className="rounded-[16px] border border-white/10 bg-[#0b0b0b] p-4">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">Space Saved</div>
          <div className="mt-3 text-2xl font-black text-[#22c55e]">{spaceSavedPct}%</div>
        </div>
      </div>
    </section>
  );
}
