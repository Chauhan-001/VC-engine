import { useMemo } from "react";

function SizeField({ label, value, placeholder, onChange }) {
  return (
    <div>
      <label className="font-mono text-[11px] font-bold uppercase text-gray-400">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded border-[3px] border-black bg-[#0a0a0a] px-3 py-2 font-mono text-sm font-bold text-white shadow-[4px_4px_0px_0px_black] outline-none"
      />
    </div>
  );
}

export default function ResizeControls({ state, setState }) {
  const modes = useMemo(
    () => [
      { value: "original", label: "ORIGINAL SIZE" },
      { value: "percentage", label: "PERCENTAGE MODE" },
      { value: "custom", label: "CUSTOM MODE" },
    ],
    []
  );

  function setMode(mode) {
    setState({ resizeMode: mode });
  }

  return (
    <div className="rounded border-[3px] border-black bg-[#0b0b0b] p-5 shadow-[4px_4px_0px_0px_black]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase text-[#0066ff]">Resize</div>
          <div className="mt-2 text-sm font-bold text-gray-300">
            {state.resizeMode === "original"
              ? "No resizing"
              : state.resizeMode === "percentage"
                ? `Scale: ${state.width || "—"}%`
                : "Custom dimensions"}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => {
            const active = state.resizeMode === m.value;
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                className={[
                  "border-[3px] border-black px-3 py-2 font-mono text-[11px] font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all",
                  active
                    ? "bg-[#0066ff] text-white hover:-translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_black]"
                    : "bg-[#0a0a0a] text-white/90 hover:-translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_black]",
                ].join(" ")}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {state.resizeMode === "percentage" && (
          <div className="mt-3">
            <div className="font-mono text-[11px] font-bold uppercase text-gray-400">
              Quick percentages
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[50, 75, 90].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setState({ width: String(pct), height: "", maintainAspectRatio: true })}
                  className={[
                    "border-[3px] border-black px-3 py-2 font-mono text-[11px] font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all",
                    state.width === String(pct)
                      ? "bg-[#0066ff] text-white hover:-translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_black]"
                      : "bg-[#0a0a0a] text-white/90 hover:-translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_black]",
                  ].join(" ")}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        )}

        {state.resizeMode === "custom" && (
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <SizeField
              label="WIDTH"
              value={state.width}
              placeholder="e.g. 1280"
              onChange={(v) => setState({ width: v })}
            />
            <SizeField
              label="HEIGHT"
              value={state.height}
              placeholder="e.g. 720"
              onChange={(v) => setState({ height: v })}
            />

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 rounded border-[3px] border-black bg-[#0a0a0a] p-3 shadow-[4px_4px_0px_0px_black]">
                <input
                  type="checkbox"
                  checked={state.maintainAspectRatio}
                  onChange={(e) => setState({ maintainAspectRatio: e.target.checked })}
                />
                <span className="font-mono text-xs font-bold uppercase text-gray-200">
                  Maintain Aspect Ratio
                </span>
              </label>
            </div>
          </div>
        )}

        {(state.resizeMode === "custom" || state.resizeMode === "percentage") && (
          <div className="mt-2">
            <div className="font-mono text-[11px] font-bold uppercase text-gray-400">
              Maintain Aspect Ratio
            </div>
            <label className="mt-2 flex items-center gap-3 rounded border-[3px] border-black bg-[#0a0a0a] p-3 shadow-[4px_4px_0px_0px_black]">
              <input
                type="checkbox"
                checked={state.maintainAspectRatio}
                onChange={(e) => setState({ maintainAspectRatio: e.target.checked })}
              />
              <span className="font-mono text-xs font-bold uppercase text-gray-200">
                Keep proportions while resizing
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
