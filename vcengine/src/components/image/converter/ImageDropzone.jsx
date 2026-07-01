import { UploadCloud } from "lucide-react";

export default function ImageDropzone({ accept, acceptedFormats, onFileSelected, selectedFile, isBusy }) {
  function handleFiles(files) {
    const [file] = Array.from(files || []);
    if (file) onFileSelected(file);
  }

  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-[#0b0b0b] px-6 py-12 text-center transition-all hover:border-[#0066ff] hover:bg-[#111111]">
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
        disabled={isBusy}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0066ff]/15 text-[#0066ff]">
        <UploadCloud size={24} />
      </div>
      <div className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
        Drop your image here
      </div>
      <div className="mt-3 text-sm text-gray-400">or click to browse</div>
      <div className="mt-4 text-sm text-gray-500">Accepted: {acceptedFormats}</div>
      <div className="mt-6 rounded-full border border-white/10 bg-[#111111] px-4 py-2 text-sm text-gray-300">
        {selectedFile ? selectedFile.name : "No file selected yet"}
      </div>
    </label>
  );
}
