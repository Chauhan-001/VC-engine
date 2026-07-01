function formatFileSize(bytes = 0) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function AudioStats({
  originalVideoSize = 0,
  extractedAudioSize = 0,
  format,
  quality,
}) {
  const percent =
    originalVideoSize > 0
      ? ((extractedAudioSize / originalVideoSize) * 100).toFixed(1)
      : "0";

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
          Audio Statistics
        </h2>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex items-center gap-4 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <div className="flex h-12 w-12 items-center justify-center border-[2px] border-black bg-[#222]">
            <span className="font-mono font-black">VID</span>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Original video size</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(originalVideoSize)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <div className="flex h-12 w-12 items-center justify-center border-[2px] border-black bg-[#ff3b30] text-white">
            <span className="font-mono font-black">AUD</span>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Extracted audio size</p>
            <p className="mt-1 font-mono text-lg font-black text-white">
              {extractedAudioSize ? formatFileSize(extractedAudioSize) : "--"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <div className="flex h-12 w-12 items-center justify-center border-[2px] border-black bg-[#22c55e] text-white">
            <span className="font-mono font-black">%</span>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Compression percentage</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{extractedAudioSize ? `${percent}%` : "--"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Format</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{format || "--"}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Quality</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{quality || "--"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

