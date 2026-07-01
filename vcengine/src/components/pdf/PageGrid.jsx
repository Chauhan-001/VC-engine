import { useMemo } from "react";

function range(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export default function DeletePageGrid({
  pageCount,
  selectedPages,
  onTogglePage,
  onSelectPreview,
  disabled,
}) {
  const pages = useMemo(() => range(pageCount || 0), [pageCount]);

  const isSelected = (n) => Boolean(selectedPages?.has?.(n));

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-6">
        {pages.map((n) => {
          const selected = isSelected(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => {
                if (disabled) return;
                onTogglePage?.(n);
                onSelectPreview?.(n);
              }}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter") {
                  e.preventDefault();
                  onTogglePage?.(n);
                  onSelectPreview?.(n);
                }
              }}
              aria-label={selected ? `Selected page ${n} for deletion` : `Select page ${n} for deletion`}
              className={
                "group w-full flex items-center justify-center border-[3px] px-2 py-3 font-mono text-sm font-bold shadow-[3px_3px_0px_0px_black] transition-all hover:-translate-y-[2px] " +
                (selected
                  ? "bg-[#3b0000] border-red-500 text-[#ff6b6b] hover:border-red-400 hover:shadow-[6px_6px_0px_0px_black]"
                  : "bg-[#161616] border-[#0066ff] text-white hover:text-[#0066ff] hover:border-[#0066ff] hover:shadow-[6px_6px_0px_0px_black]")
              }
              disabled={disabled}
            >
              {n}
            </button>
          );
        })}
      </div>

      {pageCount > 0 && (
        <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gray-400">
          Click a page to select for deletion. Preview updates instantly.
        </div>
      )}
    </div>
  );
}

