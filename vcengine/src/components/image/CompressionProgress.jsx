import { useMemo } from "react";

export default function CompressionProgress({ isCompressing, progress, completed, total }) {
  const pct = useMemo(() => {
    const p = Number(progress);
    if (!Number.isFinite(p)) return 0;
    return Math.max(0, Math.min(100, p));
  }, [progress]);

  const blocks = useMemo(() => {
    // 10 blocks of █░
    const filled = Math.round(pct / 10);
    const bar = "█".repeat(filled) + "░".repeat(10 - filled);
    return bar;
  }, [pct]);

  return (
    <div className="rounded border-[3px] border-black bg-[#0b0b0b] p-5 shadow-[4px_4px_0px_0px_black]">
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-xs font-bold uppercase text-[#0066ff]">
          Compression Progress
        </div>
        <div className="font-mono text-xs font-bold uppercase text-gray-400">
          {Number.isFinite(total) ? `${completed}/${total} Complete` : "—"}
        </div>
      </div>

      <div className="mt-4 font-mono text-sm font-black tracking-wide text-white">
        {isCompressing ? "Compressing Images..." : "Idle"}
      </div>

      <div className="mt-2 font-mono text-sm font-black text-[#0066ff]">{blocks}</div>

      <div className="mt-2 font-mono text-xs font-bold uppercase text-gray-500">
        {pct}%{/* pct */}
      </div>
    </div>
  );
}
