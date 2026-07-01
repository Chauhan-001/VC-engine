import { useRef, useState } from "react";
import {
  Upload,
  Video,
  X,
} from "lucide-react";

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  return `${(
    bytes /
    (1024 * 1024 * 1024)
  ).toFixed(2)} GB`;
}

function VideoUploadCard({
  videoFile,
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

    const validTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    const isValid =
      validTypes.includes(
        file.type
      ) ||
      file.name
        .toLowerCase()
        .match(
          /\.(mp4|mov|webm|avi|mkv)$/
        );

    if (!isValid) {
      alert(
        "Supported formats: MP4, MOV, WEBM, AVI, MKV"
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
          Upload Video
        </h2>
      </div>

      <div className="p-6">
        {!videoFile && (
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
                    border-[#ff3b30]
                    bg-[#2a0d0b]
                  `
                  : `
                    border-[#333]
                    bg-[#111111]
                    hover:border-[#ff3b30]
                  `
              }
            `}
          >
            <input
              ref={inputRef}
              type="file"
              accept="
                .mp4,
                .mov,
                .webm,
                .avi,
                .mkv
              "
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
                className="
                  text-[#ff3b30]
                "
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
              Drop Video Here
            </h3>

            <p
              className="
                mt-3
                text-sm
                text-gray-400
              "
            >
              MP4 • MOV • WEBM • AVI • MKV
            </p>

            <button
              type="button"
              className="
                mt-8
                border-[3px]
                border-black
                bg-[#ff3b30]
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
              Select Video
            </button>
          </div>
        )}

        {videoFile && (
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
                bg-[#ff3b30]
                text-white
              "
            >
              <Video size={28} />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="
                  truncate
                  font-bold
                  text-white
                "
              >
                {videoFile.name}
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
                  videoFile.size
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

export default VideoUploadCard;