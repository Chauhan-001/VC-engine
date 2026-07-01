import { Download, Trash2 } from "lucide-react";

function formatFileSize(bytes = 0) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function AudioPreviewCard({ audioUrl, file, onDownload, onClear }) {
  if (!file) return null;

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
          Extracted Audio
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-gray-400 hover:text-red-400 transition-colors"
          aria-label="Clear audio"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="border-[3px] border-black bg-[#0f0f0f] p-4 shadow-[4px_4px_0px_0px_black]">
          {audioUrl ? (
            <audio
              src={audioUrl}
              controls
              preload="metadata"
              className="w-full"
            />
          ) : (
            <div className="text-gray-400 font-mono">No audio URL</div>
          )}

          <div className="mt-4 border-[2px] border-black bg-[#111111] p-4">
            <p className="font-mono text-xs uppercase text-gray-400">Waveform placeholder</p>
            <div className="mt-2 h-12 bg-[#161616]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">File size</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(file.size)}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Type</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{file.type || "audio"}</p>
          </div>
        </div>

        <button
          onClick={onDownload}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            border-[3px]
            border-black
            bg-[#22c55e]
            px-6
            py-5
            font-mono
            text-xl
            font-black
            uppercase
            text-white
            shadow-[6px_6px_0px_0px_black]
            transition-all
            hover:-translate-y-1
            hover:shadow-[8px_8px_0px_0px_black]
            active:translate-y-1
            active:shadow-none
          "
        >
          <Download size={22} />
          Download Audio
        </button>
      </div>
    </div>
  );
}

