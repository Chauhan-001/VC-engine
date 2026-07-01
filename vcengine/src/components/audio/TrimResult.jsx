import { formatFileSize } from "../../utils/audio/formatTime";

export default function TrimResult({ originalFile, trimmedFile, originalDuration, trimmedDuration, onDownload, onClear }) {
  if (!trimmedFile) return null;

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] animate-fadeIn">
      <div className="border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Trim Result</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-gray-400 hover:text-red-400 transition-colors font-mono text-xs uppercase"
        >
          Clear
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[10px] font-bold uppercase text-gray-400">Original Duration</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(originalDuration)}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[10px] font-bold uppercase text-gray-400">Trimmed Duration</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(trimmedDuration)}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[10px] font-bold uppercase text-gray-400">Original Size</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(originalFile?.size || 0)}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[10px] font-bold uppercase text-gray-400">Output Size</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(trimmedFile?.size || 0)}</p>
          </div>
        </div>

        <div className="border-[2px] border-black bg-[#0f0f0f] p-4">
          <p className="font-mono text-[10px] font-bold uppercase text-gray-400 mb-2">Preview</p>
          <audio src={URL.createObjectURL(trimmedFile)} controls preload="metadata" className="w-full" />
        </div>

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
          Download Trimmed Audio
        </button>
      </div>
    </div>
  );
}
