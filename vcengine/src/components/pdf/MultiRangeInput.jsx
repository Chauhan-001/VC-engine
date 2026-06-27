function parseIntSafe(value) {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) ? n : NaN;
}

function MultiRangeInput({
  ranges,
  setRanges,
  pageCount,
  onError,
}) {
  const addRange = () => {
    setRanges((prev) => {
      const next = [...prev];
      const first = next.length ? next[next.length - 1].to + 1 : 1;
      const from = Math.max(1, first);
      const to = Math.min(pageCount, from);
      next.push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()), from, to });
      return next;
    });
  };

  const updateRange = (id, patch) => {
    setRanges((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRange = (id) => {
    setRanges((prev) => prev.filter((r) => r.id !== id));
  };

  const rangesValidation = () => {
    const normalized = ranges.map((r) => {
      const from = parseIntSafe(r.from);
      const to = parseIntSafe(r.to);
      return { ...r, from, to };
    });

    for (const r of normalized) {
      if (!Number.isFinite(r.from) || !Number.isFinite(r.to)) {
        return "All range values must be valid numbers.";
      }
      if (r.from < 1 || r.to < 1 || r.from > pageCount || r.to > pageCount) {
        return "Ranges must be within the document page count.";
      }
      if (r.from > r.to) {
        return "Each range must have From <= To.";
      }
    }

    // overlap check
    const sorted = [...normalized].sort((a, b) => a.from - b.from);
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      if (b.from <= a.to) {
        return "Ranges must not overlap.";
      }
    }

    return null;
  };

  const validateAndNotify = () => {
    const err = rangesValidation();
    if (err) onError?.(err);
    return err;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-mono text-sm font-bold uppercase text-white">Split Ranges</h3>

        <button
          type="button"
          onClick={addRange}
          className="
            border-[3px]
            border-black
            bg-[#0066ff]
            px-4
            py-2
            font-mono
            text-xs
            font-bold
            uppercase
            text-white
            shadow-[3px_3px_0px_0px_black]
            transition-all
            hover:-translate-x-[1px]
            hover:-translate-y-[1px]
            hover:shadow-[5px_5px_0px_0px_black]
          "
        >
          Add Range
        </button>
      </div>

      <div className="space-y-3">
        {ranges.map((r, idx) => (
          <div
            key={r.id}
            className="
              border-[3px]
              border-black
              bg-[#1a1a1a]
              p-4
              shadow-[6px_6px_0px_0px_black]
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-mono text-[11px] font-bold uppercase text-gray-400">Range {idx + 1}</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase text-gray-400">From</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      className="
                        mt-2
                        w-full
                        rounded-none
                        border-[3px]
                        border-black
                        bg-[#0f0f0f]
                        px-3
                        py-2
                        font-mono
                        text-sm
                        font-bold
                        text-white
                        outline-none
                        shadow-[3px_3px_0px_0px_black]
                        transition-all
                        hover:border-[#0066ff]
                        focus:border-[#0066ff]
                      "
                      value={r.from}
                      onChange={(e) => updateRange(r.id, { from: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] font-bold uppercase text-gray-400">To</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      className="
                        mt-2
                        w-full
                        rounded-none
                        border-[3px]
                        border-black
                        bg-[#0f0f0f]
                        px-3
                        py-2
                        font-mono
                        text-sm
                        font-bold
                        text-white
                        outline-none
                        shadow-[3px_3px_0px_0px_black]
                        transition-all
                        hover:border-[#0066ff]
                        focus:border-[#0066ff]
                      "
                      value={r.to}
                      onChange={(e) => updateRange(r.id, { to: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeRange(r.id)}
                disabled={ranges.length === 1}
                className="
                  shrink-0
                  border-[3px]
                  border-black
                  bg-[#161616]
                  px-3
                  py-2
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  text-gray-200
                  shadow-[3px_3px_0px_0px_black]
                  transition-all
                  hover:-translate-y-[1px]
                  hover:border-[#0066ff]
                  hover:text-[#0066ff]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                aria-label={`Remove range ${idx + 1}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden validate hook, called from parent */}
      <button
        type="button"
        className="hidden"
        onClick={validateAndNotify}
        aria-hidden="true"
      />
    </div>
  );
}

export default MultiRangeInput;

