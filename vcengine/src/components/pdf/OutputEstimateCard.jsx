import { useMemo } from "react";

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let idx = 0;
  let value = bytes;
  while (value >= 1024 && idx < units.length - 1) {
    value /= 1024;
    idx++;
  }
  const fixed = idx === 0 ? 0 : value < 10 ? 2 : value < 100 ? 1 : 0;
  return `${value.toFixed(fixed)} ${units[idx]}`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function OutputEstimateCard({
  originalBytes,
  estimatedBytes,
  savingsPercent,
  completed,
  compressedBytes,
}) {
  const effectiveEstimatedBytes = useMemo(() => {
    if (!completed) return estimatedBytes || 0;
    return compressedBytes || estimatedBytes || 0;
  }, [completed, compressedBytes, estimatedBytes]);

  const effectiveSavingsPercent = useMemo(() => {
    if (!originalBytes) return 0;
    const baseSavings = savingsPercent ?? 0;
    if (!completed) return clamp(baseSavings, 0, 100);
    if (!compressedBytes) return clamp(baseSavings, 0, 100);
    const computed = (1 - compressedBytes / originalBytes) * 100;
    return clamp(computed, 0, 100);
  }, [originalBytes, savingsPercent, completed, compressedBytes]);

  const originalLabel = originalBytes ? formatBytes(originalBytes) : "—";
  const estimatedLabel = effectiveEstimatedBytes ? formatBytes(effectiveEstimatedBytes) : "—";

  return (
    <div>
      <h2 className="font-mono text-sm font-bold uppercase text-white">Output Estimate</h2>

      <div className="mt-4 border-[3px] border-black bg-[#0f0f0f] p-4 shadow-[4px_4px_0px_0px_black]">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
              Original Size:
            </span>
            <span className="font-mono text-sm font-bold text-white">{originalLabel}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
              {completed ? "Compressed Size:" : "Estimated Size:"}
            </span>
            <span className="font-mono text-sm font-bold text-white">{estimatedLabel}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
              Savings:
            </span>
            <span className="font-mono text-sm font-bold text-[#0066ff]">
              {effectiveSavingsPercent ? `${effectiveSavingsPercent.toFixed(0)}%` : "—"}
            </span>
          </div>

          <div className="border-t-[3px] border-black pt-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
              {completed ? "Compression completed." : "Estimates update instantly as you change levels."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
