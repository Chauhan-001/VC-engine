export default function FormatSelector({ value, onChange }) {
  const formats = [
    { value: "mp3", label: "MP3" },
    { value: "wav", label: "WAV" },
    { value: "aac", label: "AAC" },
    { value: "ogg", label: "OGG" },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {formats.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onChange(f.value)}
          className={
            "border-[3px] border-black bg-[#111111] px-4 py-4 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
            (value === f.value ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

