import { formatFileSize } from "../../utils/audio/formatTime";

function StatCard({ label, value, sub }) {
  return (
    <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
      <p className="font-mono text-[10px] font-bold uppercase text-gray-400">{label}</p>
      <p className="mt-1 font-mono text-lg font-black text-white">{value}</p>
      {sub && <p className="font-mono text-[10px] text-gray-500">{sub}</p>}
    </div>
  );
}

export default function AudioResultCard({ file, url, stats, onDownload, onClear, downloadLabel }) {
  if (!file) return null;

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] animate-fadeIn">
      <div className="border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Result</h2>
        {onClear && (
          <button type="button" onClick={onClear} className="text-gray-400 hover:text-red-400 transition-colors font-mono text-xs uppercase">
            Clear
          </button>
        )}
      </div>
      <div className="p-6 space-y-4">
        {stats && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} />
            ))}
          </div>
        )}

        <div className="border-[2px] border-black bg-[#0f0f0f] p-4">
          <p className="font-mono text-[10px] font-bold uppercase text-gray-400 mb-2">Preview</p>
          <audio src={url} controls preload="metadata" className="w-full" />
        </div>

        {onDownload && (
          <button
            onClick={onDownload}
            className="
              flex w-full items-center justify-center gap-3
              border-[3px] border-black
              bg-[#22c55e]
              px-6 py-5
              font-mono text-xl font-black uppercase
              text-white
              shadow-[6px_6px_0px_0px_black]
              transition-all
              hover:-translate-y-1
              hover:shadow-[8px_8px_0px_0px_black]
              active:translate-y-1
              active:shadow-none
            "
          >
            {downloadLabel || "Download"}
          </button>
        )}
      </div>
    </div>
  );
}
