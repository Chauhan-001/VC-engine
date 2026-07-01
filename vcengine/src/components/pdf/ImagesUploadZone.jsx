import { useRef, useState } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

function ImagesUploadZone({
  onFilesSelected,
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] =
    useState(false);

  function processFiles(files) {
    const validFiles = Array.from(
      files
    ).filter((file) =>
      file.type.startsWith("image/")
    );

    if (!validFiles.length) {
      return;
    }

    onFilesSelected(validFiles);
  }

  function handleDrop(e) {
    e.preventDefault();

    setDragging(false);

    processFiles(
      e.dataTransfer.files
    );
  }

  function handleInputChange(e) {
    processFiles(e.target.files);

    e.target.value = "";
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();

        setDragging(true);
      }}
      onDragLeave={() =>
        setDragging(false)
      }
      onDrop={handleDrop}
      onClick={() =>
        inputRef.current?.click()
      }
      className={`
        cursor-pointer
        border-[3px]
        border-black
        p-10
        shadow-[6px_6px_0px_0px_black]
        transition-all

        ${
          dragging
            ? "bg-[#0066ff] text-white"
            : "bg-[#161616]"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="
          image/png,
          image/jpeg,
          image/jpg,
          image/webp
        "
        onChange={
          handleInputChange
        }
        className="hidden"
      />

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <div
          className="
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
          <UploadCloud
            size={44}
          />
        </div>

        <h2
          className="
            font-mono
            text-2xl
            font-black
            uppercase
          "
        >
          Drop Images Here
        </h2>

<p
           className="
             mt-4
             max-w-md
             text-sm
             text-gray-400
           "
         >
           Upload multiple images
           and turn them into
           a video slideshow.
         </p>

        <div
          className="
            mt-8
            flex
            flex-wrap
            justify-center
            gap-3
          "
        >
          {[
            "PNG",
            "JPG",
            "JPEG",
            "WEBP",
          ].map((type) => (
            <div
              key={type}
              className="
                flex
                items-center
                gap-2
                border-[2px]
                border-black
                bg-black
                px-4
                py-2
                font-mono
                text-xs
                font-bold
                uppercase
                shadow-[3px_3px_0px_0px_black]
              "
            >
              <ImageIcon
                size={14}
              />

              {type}
            </div>
          ))}
        </div>

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
          Select Images
        </button>
      </div>
    </div>
  );
}

export default ImagesUploadZone;