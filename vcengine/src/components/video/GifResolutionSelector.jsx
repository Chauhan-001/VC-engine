export default function GifResolutionSelector({ value, onChange, options, isNumeric }) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {options.map((opt) => {
        const optValue = opt.value;
        const active = isNumeric ? Number(value) === Number(optValue) : value === optValue;
        return (
          <button
            key={String(optValue)}
            type="button"
            onClick={() => onChange(optValue)}
            className={
              "border-[3px] border-black bg-[#111111] px-4 py-4 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
              (active ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

