import { useMemo } from "react";

import { QUALITY_PRESETS } from "../../utils/image/formatPresets";

export default function QualitySelector({ state, setState }) {
  const presets = useMemo(
    () => [
      { key: "maximum", label: "MAXIMUM QUALITY", value: QUALITY_PRESETS.maximum },
      { key: "high", label: "HIGH QUALITY", value: QUALITY_PRESETS.high },
      { key: "balanced", label: "BALANCED", value: QUALITY_PRESETS.balanced },
      { key: "small", label: "SMALL SIZE", value: QUALITY_PRESETS.small },
      { key: "ultra", label: "ULTRA COMPRESSION", value: QUALITY_PRESETS.ultra },
    ],
    []
  );

  function applyPreset(key) {
    const preset = QUALITY_PRESETS[key];
    if (typeof preset !== "number") return;
    setState({ qualityPreset: key, quality: preset });
  }

  return (
    <div className="rounded border-[3px] border-black bg-[#0b0b0b] p-5 shadow-[4px_4px_0px_0px_black]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase text-[#0066ff]">Quality</div>
          <div className="mt-2 text-sm font-bold text-gray-300">
            {state.quality}% • {state.qualityPreset.toUpperCase()}
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-[11px] font-bold uppercase text-gray-400">Custom Slider</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {presets.map((p) => {
          const active = state.qualityPreset === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => applyPreset(p.key)}
              className={[
                "border-[3px] border-black px-3 py-2 font-mono text-[11px] font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all",
                active
                  ? "bg-[#0066ff] text-white hover:-translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_black]"
                  : "bg-[#0a0a0a] text-white/90 hover:-translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_black]",
              ].join(" ")}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <label className="font-mono text-[11px] font-bold uppercase text-gray-400">0% — 100%</label>
        <input
          type="range"
          min={0}
          max={100}
          value={state.quality}
          onChange={(e) => setState({ qualityPreset: "custom", quality: Number(e.target.value) })}
          className="mt-3 w-full"
        />
        <div className="mt-2 font-mono text-xs font-bold uppercase text-gray-500">
          Estimated Output Size: —
        </div>
      </div>
    </div>
  );
}
