import { FileText, X } from "lucide-react";
import MergeButton from "./MergeButton";

function FileList({
  files,
  onRemoveFile,
  onClearAll,
  onMerge,
  loading,
}) {
    const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
  return (
    <div
      className="
        mt-10
        border-[3px]
        border-black
        bg-[#1a1a1a]
        p-6
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-mono text-sm font-bold uppercase text-white">
          {files.length} Files Added
        </h3>

        <button
          onClick={onClearAll}
          className="
            font-mono
            text-xs
            font-bold
            uppercase
            text-red-400
            transition-colors
            hover:text-red-300
          "
        >
          Clear All
        </button>
      </div>

      {/* File Items */}
      <div className="space-y-3">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="
              flex
              items-center
              justify-between
              border
              border-[#2a2a2a]
              bg-[#161616]
              px-4
              py-3
              transition-all
              hover:border-[#0066ff]
            "
          >
<div className="flex items-center gap-3">
  <FileText
    size={18}
    className="text-[#0066ff]"
  />

  <div>
    <p
      className="
        font-mono
        text-sm
        text-gray-200
      "
    >
      {file.name}
    </p>

    <p
      className="
        mt-1
        font-mono
        text-[11px]
        uppercase
        text-gray-500
      "
    >
      {formatFileSize(file.size)}
    </p>
  </div>
</div>

            <button
              onClick={() => onRemoveFile(index)}
              className="
                text-gray-400
                transition-colors
                hover:text-red-400
              "
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Merge Button */}
      <div className="mt-6 flex justify-end">
        <MergeButton
  onMerge={onMerge}
  loading={loading}
  disabled={files.length < 2}
/>
      </div>
    </div>
  );
}

export default FileList;