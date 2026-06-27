import { Check, X } from "lucide-react";

function PdfThumbnailCard({
  pageNumber,
  thumbnailSrc,
  selected,
  onToggleSelect,
  onRemove,
  onFocus,
  onArrow,
  tabIndex,
  disabled,
}) {
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      disabled={disabled}
      aria-label={`Page ${pageNumber} preview`}
      onClick={() => onToggleSelect?.(pageNumber)}
      onFocus={onFocus}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          onArrow?.(e, pageNumber);
        }
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          onRemove?.(pageNumber);
        }
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggleSelect?.(pageNumber);
        }
      }}
      className={`
        relative
        group
        flex
        items-center
        justify-center
        rounded-none
        border-[3px]
        bg-[#161616]
        shadow-[3px_3px_0px_0px_black]
        transition-all
        hover:-translate-y-[2px]
        focus:outline-none
      
        ${selected ? "border-[#0066ff]" : "border-black hover:border-[#0066ff]"}
        ${selected ? "shadow-[6px_6px_0px_0px_black]" : ""}
      `}
    >
      {/* image */}
      <div className="relative w-full">
        <div className="w-full aspect-[4/5] bg-[#0f0f0f]">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`Page ${pageNumber} thumbnail`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="h-full w-full animate-pulse bg-[#0f0f0f]" />
          )}
        </div>

        {/* page number */}
        <div className="pointer-events-none absolute left-2 top-2 rounded-none border-[3px] border-black bg-[#1a1a1a] px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black]">
          {pageNumber}
        </div>

        {/* selected check */}
        {selected && (
          <div className="pointer-events-none absolute right-2 top-2 flex h-8 w-8 items-center justify-center border-[3px] border-[#0066ff] bg-[#0066ff]/10 shadow-[3px_3px_0px_0px_black]">
            <Check className="text-[#0066ff]" size={18} />
          </div>
        )}

        {/* remove (X) */}
        <div className="absolute right-2 bottom-2">
          <button
            type="button"
            aria-label={`Remove page ${pageNumber} from preview`}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(pageNumber);
            }}
            onKeyDown={(e) => e.stopPropagation()}
            disabled={disabled}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              border-[3px]
              border-black
              bg-[#1a1a1a]
              text-[#f0f0f0]
              shadow-[2px_2px_0px_0px_black]
              transition-all
              hover:-translate-y-[1px]
              hover:border-[#0066ff]
              hover:text-[#0066ff]
            "
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </button>
  );
}

export default PdfThumbnailCard;

