export default function AudioProgress({ progress, label }) {
  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden border-[2px] border-black bg-black/40">
        <div className="h-full bg-[#22c55e] transition-all duration-300" style={{ width: `${Math.max(5, progress)}%` }} />
      </div>
      <p className="text-center font-mono text-[11px] uppercase tracking-wider text-gray-300">
        {progress < 100 ? `${label || "Processing"} ${progress}%` : "Finishing..."}
      </p>
    </div>
  );
}
