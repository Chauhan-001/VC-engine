import { Download, Trash2 } from "lucide-react";

export default function GifPreviewCard({ gifUrl, gifFile, onDownload, onClear }) {
  if (!gifFile) return null;

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Generated GIF</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-gray-400 hover:text-red-400 transition-colors"
          aria-label="Clear gif"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="border-[2px] border-black bg-[#0f0f0f] p-4">
          {gifUrl ? (
            <img src={gifUrl} alt="Generated GIF" className="w-full max-h-[360px] object-contain" />
          ) : (
            <div className="text-gray-400 font-mono">No GIF URL</div>
          )}
          <p className="mt-3 font-mono text-[11px] uppercase text-gray-400">Looping GIF preview</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">File</p>
            <p className="mt-1 font-mono text-sm font-black text-white break-words">{gifFile.name}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Type</p>
            <p className="mt-1 font-mono text-sm font-black text-white">image/gif</p>
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
          Download GIF
        </button>
      </div>
    </div>
  );
}

