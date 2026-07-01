import { useMemo } from "react";

function getRangeIndexForPage(ranges, pageNumber) {
  if (!Array.isArray(ranges)) return -1;
  const n = Number(pageNumber);
  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i];
    const from = Number(r.from);
    const to = Number(r.to);
    if (Number.isFinite(from) && Number.isFinite(to) && n >= from && n <= to) return i;
  }
  return -1;
}

function PagePreviewGrid({
  pages,
  selectedPages,
  ranges,
  onClickPreview,
  onRemovePage,
}) {
  const nums = useMemo(() => pages || [], [pages]);

  const checkSelected = (pageNumber) => Boolean(selectedPages?.has(pageNumber));

  const rangeStyle = (rangeIndex, selected) => {
    // Pattern-based indicators (no color palette spam)
    if (rangeIndex === 0) {
      return selected
        ? "border-[#0066ff] shadow-[6px_6px_0px_0px_black]"
        : "border-[#0066ff]";
    }
    if (rangeIndex === 1) {
      return selected
        ? "border-[#0066ff] shadow-[6px_6px_0px_0px_black] border-dashed"
        : "border-dashed border-black";
    }
    if (rangeIndex === 2) {
      return selected
        ? "border-[#0066ff] shadow-[6px_6px_0px_0px_black]"
        : "border-[6px] border-black";
    }
    if (rangeIndex >= 3) {
      return selected
        ? "border-[#0066ff] shadow-[6px_6px_0px_0px_black]"
        : "border-black";
    }
    return selected ? "border-[#0066ff] shadow-[6px_6px_0px_0px_black]" : "border-black";
  };

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
      {nums.map((pageNumber) => {
        const selected = checkSelected(pageNumber);
        const rangeIndex = getRangeIndexForPage(ranges, pageNumber);

        const originalPageNumber = pageNumber.originalPageNumber;
        const displayPageNumber = pageNumber.displayPageNumber;

        return (
          <div key={originalPageNumber} className="relative">
            <button
              type="button"
              className={
                "group w-full " +
                "flex items-center justify-center rounded-none " +
                "border-[3px] bg-[#161616] px-2 py-3 " +
                "font-mono text-sm font-bold text-white " +
                "shadow-[3px_3px_0px_0px_black] " +
                "transition-all hover:-translate-y-[2px] hover:text-[#0066ff] hover:border-[#0066ff] " +
                rangeStyle(rangeIndex, selected)
              }
              onClick={() => onClickPreview?.(originalPageNumber)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onClickPreview?.(originalPageNumber);
                }
              }}
              aria-label={`Preview page ${displayPageNumber}`}
            >
              {displayPageNumber}

              {rangeIndex >= 3 && (
                <span
                  className="pointer-events-none absolute -top-3 -right-3 inline-flex h-8 min-w-8 items-center justify-center "
                  style={{
                    border: "3px solid #0066ff",
                    background: "#0066ff1a",
                    color: "#0066ff",
                    boxShadow: "3px 3px 0px 0px #000",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontWeight: 900,
                    fontSize: 11,
                    padding: "2px 6px",
                    textTransform: "uppercase",
                  }}
                >
                  R{rangeIndex + 1}
                </span>
              )}
            </button>

            {/* Small neo-brutalist X (never overlaps page number) */}
            <button
              type="button"
              aria-label={`Remove page ${displayPageNumber} from preview`}
              className="absolute right-1 top-1 flex h-[18px] w-[18px] items-center justify-center
                rounded-none
                border-[3px] border-black bg-[#161616]
                text-[10px] font-black leading-none text-[#f0f0f0]
                shadow-[2px_2px_0px_0px_black]
                transition-all
                hover:bg-[#3b0000] hover:text-[#ff3b3b] hover:border-[#ff3b3b]"
              onClick={(e) => {
                e.stopPropagation();
                onRemovePage?.(originalPageNumber);
              }}
              onKeyDown={(e) => e.stopPropagation()}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PagePreviewGrid;


