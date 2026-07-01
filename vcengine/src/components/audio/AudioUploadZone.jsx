import { useState } from "react";

export default function AudioUploadZone({ onFilesSelected, accept = "audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac", maxFiles }) {
  const [dragOver, setDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files || []);
    const filtered = dropped.filter((f) => f.type.startsWith("audio/"));
    if (filtered.length > 0) {
      onFilesSelected?.(maxFiles ? filtered.slice(0, maxFiles) : filtered);
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-[3px] bg-[#161616] shadow-[6px_6px_0px_0px_black] p-10 text-center transition-colors ${dragOver ? "border-[#0066ff]" : "border-black"}`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center border-[3px] border-black bg-black shadow-[4px_4px_0px_0px_black]">
          <span className="font-mono text-2xl font-black text-white">♪</span>
        </div>
        <h2 className="font-mono text-2xl font-black uppercase">Drop Audio Here</h2>
        <p className="mt-4 max-w-md text-sm text-gray-400">or</p>
        <label className="mt-4 cursor-pointer">
          <input
            type="file"
            accept={accept}
            onChange={(e) => e.target.files?.length && onFilesSelected?.(maxFiles ? Array.from(e.target.files).slice(0, maxFiles) : Array.from(e.target.files))}
            className="hidden"
            multiple={!maxFiles}
          />
          <span className="inline-block border-[3px] border-black bg-[#0066ff] px-8 py-3 font-mono text-sm font-bold uppercase text-white shadow-[4px_4px_0px_0px_black] hover:-translate-y-[1px] transition-all">
            Select Audio
          </span>
        </label>
      </div>
    </div>
  );
}
