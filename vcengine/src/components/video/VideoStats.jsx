function formatFileSize(bytes = 0) {
  if (!bytes) return "0 B";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function VideoStats({
  originalImagesTotalSize = 0,
  generatedVideoSize = 0,
  imagesCount = 0,
  totalDuration = 0,
  format,
}) {
  const percent =
    originalImagesTotalSize > 0
      ? ((generatedVideoSize / originalImagesTotalSize) * 100).toFixed(1)
      : "0";

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Video Statistics</h2>
      </div>
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <div className="flex h-12 w-12 items-center justify-center border-[2px] border-black bg-[#222]">
            <span className="font-mono font-black">IMG</span>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Original images total</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(originalImagesTotalSize)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <div className="flex h-12 w-12 items-center justify-center border-[2px] border-black bg-[#ff3b30] text-white">
            <span className="font-mono font-black">VID</span>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Generated video size</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{formatFileSize(generatedVideoSize)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <div className="flex h-12 w-12 items-center justify-center border-[2px] border-black bg-[#22c55e] text-white">
            <span className="font-mono font-black">%</span>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Compression percentage</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{percent}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Image count</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{imagesCount}</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Total duration</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{totalDuration.toFixed(1)}s</p>
          </div>
          <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black] col-span-2">
            <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Format</p>
            <p className="mt-1 font-mono text-lg font-black text-white">{String(format).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

