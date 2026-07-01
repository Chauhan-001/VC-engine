import { ImageIcon } from "lucide-react";

function PdfImagePreview({
  pageNumber,
  imageUrl,
  selected,
  onToggle,
}) {
  return (
    <div
      className={`
        border-[3px]
        border-black
        bg-[#161616]
        shadow-[6px_6px_0px_0px_black]
        transition-all
        duration-200

        ${
          selected
            ? "ring-4 ring-[#0066ff]"
            : ""
        }
      `}
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b-[3px]
          border-black
          px-4
          py-3
        "
      >
        <div className="flex items-center gap-2">
          <ImageIcon
            size={16}
            className="text-[#0066ff]"
          />

          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-white
            "
          >
            Page {pageNumber}
          </span>
        </div>

        <input
          type="checkbox"
          checked={selected}
          onChange={() =>
            onToggle(pageNumber)
          }
          className="
            h-4
            w-4
            accent-[#0066ff]
          "
        />
      </div>

      {/* Preview */}
      <div
        className="
          flex
          items-center
          justify-center
          bg-[#0f0f0f]
          p-4
        "
      >
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            bg-white
            shadow-[4px_4px_0px_0px_black]
          "
        >
          <img
            src={imageUrl}
            alt={`Page ${pageNumber}`}
            className="
              block
              h-auto
              w-full
              max-w-[220px]
              object-contain
            "
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          border-t-[3px]
          border-black
          px-4
          py-3
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            font-mono
            text-[11px]
            uppercase
            text-gray-400
          "
        >
          <span>
            PDF Page
          </span>

          <span>
            #{pageNumber}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PdfImagePreview;