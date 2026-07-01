export default function MultiRowSelect({ value, onChange, options }) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {options.map((opt) => (
        <button
          key={opt.value}
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
  );
}

