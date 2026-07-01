const QUALITY = [
  { value: "low", label: "LOW" },
  { value: "medium", label: "MEDIUM" },
  { value: "high", label: "HIGH" },
  { value: "ultra", label: "ULTRA" },
];

export default function GifQualitySelector({ value, onChange }) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {QUALITY.map((q) => (
        <button
          key={q.value}
          type="button"
          onClick={() => onChange(q.value)}
          className={
            "border-[3px] border-black bg-[#111111] px-4 py-4 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
            (value === q.value ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
          }
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}

