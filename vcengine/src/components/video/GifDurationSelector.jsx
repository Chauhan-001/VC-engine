export default function GifDurationSelector({
  value,
  customDuration,
  options,
  onChange,
  onCustomChange,
}) {
  const showCustom = value === "custom";

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={
              "border-[3px] border-black bg-[#111111] px-4 py-4 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
              (value === opt.value ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {showCustom && (
        <div className="mt-4">
          <label className="block font-mono text-xs font-bold uppercase text-gray-400">Custom duration (seconds)</label>
          <input
            type="number"
            min={1}
            max={30}
            step={0.5}
            value={customDuration}
            onChange={(e) => onCustomChange(e.target.value)}
            className="mt-2 w-full border-[3px] border-black bg-[#0f0f0f] p-3 font-mono text-white outline-none"
          />
          <p className="mt-2 font-mono text-[11px] uppercase text-gray-400">Max 30 seconds</p>
        </div>
      )}
    </div>
  );
}

