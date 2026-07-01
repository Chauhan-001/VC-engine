import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
} from "lucide-react";

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function PdfUploadCard({
  pdfFile,
  onFileSelected,
  onRemove,
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] =
    useState(false);

  function handleFiles(files) {
    const file = files?.[0];

    if (!file) {
      return;
    }

    if (
      file.type !==
      "application/pdf"
    ) {
      alert(
        "Please upload a PDF file."
      );

      return;
    }

    onFileSelected(file);
  }

  function handleDrop(e) {
    e.preventDefault();

    setDragging(false);

    handleFiles(
      e.dataTransfer.files
    );
  }

  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#161616]
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <div
        className="
          border-b-[3px]
          border-black
          px-6
          py-4
        "
      >
        <h2
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            tracking-[0.2em]
            text-white
          "
        >
          Upload PDF
        </h2>
      </div>

      <div className="p-6">
        {/* Upload Area */}
        {!pdfFile && (
          <div
            onClick={() =>
              inputRef.current?.click()
            }
            onDragOver={(e) => {
              e.preventDefault();

              setDragging(true);
            }}
            onDragLeave={() =>
              setDragging(false)
            }
            onDrop={handleDrop}
            className={`
              cursor-pointer
              border-[3px]
              border-dashed
              p-10
              text-center
              transition-all

              ${
                dragging
                  ? `
                    border-[#0066ff]
                    bg-[#0f172a]
                  `
                  : `
                    border-[#333]
                    bg-[#111111]
                    hover:border-[#0066ff]
                  `
              }
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) =>
                handleFiles(
                  e.target.files
                )
              }
            />

            <div
              className="
                mx-auto
                mb-6
                flex
                h-24
                w-24
                items-center
                justify-center
                border-[3px]
                border-black
                bg-black
                shadow-[4px_4px_0px_0px_black]
              "
            >
              <Upload
                size={42}
                className="text-[#0066ff]"
              />
            </div>

            <h3
              className="
                font-mono
                text-2xl
                font-black
                uppercase
                text-white
              "
            >
              Drop PDF Here
            </h3>

            <p
              className="
                mt-3
                text-sm
                text-gray-400
              "
            >
              or click to browse
            </p>

            <button
              type="button"
              className="
                mt-8
                border-[3px]
                border-black
                bg-[#0066ff]
                px-8
                py-3
                font-mono
                text-sm
                font-bold
                uppercase
                text-white
                shadow-[4px_4px_0px_0px_black]
              "
            >
              Select PDF
            </button>
          </div>
        )}

        {/* Uploaded File */}
        {pdfFile && (
          <div
            className="
              flex
              items-center
              gap-4
              border-[3px]
              border-black
              bg-[#111111]
              p-4
              shadow-[4px_4px_0px_0px_black]
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                border-[2px]
                border-black
                bg-[#0066ff]
                text-white
              "
            >
              <FileText size={28} />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="
                  truncate
                  font-bold
                  text-white
                "
              >
                {pdfFile.name}
              </h3>

              <p
                className="
                  mt-1
                  font-mono
                  text-xs
                  text-gray-400
                "
              >
                {formatFileSize(
                  pdfFile.size
                )}
              </p>
            </div>

            <button
              onClick={onRemove}
              className="
                text-gray-500
                transition-colors
                hover:text-red-400
              "
            >
              <X size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfUploadCard;