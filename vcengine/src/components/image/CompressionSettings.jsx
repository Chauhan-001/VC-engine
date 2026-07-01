import { useMemo } from "react";

const OUTPUT_FORMATS = [
  { value: "webp", label: "WEBP" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "avif", label: "AVIF" },
];

const QUALITY_PRESETS = [
  { key: "maximum", label: "Maximum Quality", value: 90 },
  { key: "high", label: "High Quality", value: 80 },
  { key: "balanced", label: "Balanced", value: 65 },
  { key: "small", label: "Small Size", value: 45 },
];

const RESIZE_OPTIONS = [
  { value: "original", label: "Original Size" },
  { value: "75", label: "75%" },
  { value: "50", label: "50%" },
  { value: "custom", label: "Custom" },
];

const COMPRESSION_MODES = [
  { value: "lossless", label: "Lossless" },
  { value: "balanced", label: "Balanced" },
  { value: "aggressive", label: "Aggressive" },
];

export default function CompressionSettings({ state, setState, capabilities }) {
  const avifSupported = capabilities?.avif?.supported ?? false;
  const webpSupported = capabilities?.webp?.supported ?? false;

  const outputFormatHint = useMemo(() => {
    if (state.outputFormat === "avif" && !avifSupported) return "AVIF fallback if unsupported";
    if (state.outputFormat === "webp" && !webpSupported) return "WEBP fallback if unsupported";
    return "";
  }, [state.outputFormat, avifSupported, webpSupported]);

  return (
    <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
            Compression Settings
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Simple Controls</h2>
        </div>
        <div className="rounded-[14px] border border-white/10 bg-[#0b0b0b] px-4 py-3 text-right">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Output
          </div>
          <div className="mt-1 text-sm font-black uppercase">{state.outputFormat.toUpperCase()}</div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
              Output Format
            </label>
            {outputFormatHint ? <span className="text-xs text-[#ff3b30]">{outputFormatHint}</span> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {OUTPUT_FORMATS.map((format) => {
              const disabled =
                (format.value === "avif" && !avifSupported) ||
                (format.value === "webp" && !webpSupported);
              return (
                <button
                  key={format.value}
                  type="button"
                  onClick={() => setState({ outputFormat: format.value })}
                  disabled={disabled}
                  className={`rounded-full border px-4 py-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
                    state.outputFormat === format.value
                      ? "border-[#0066ff] bg-[#0066ff] text-white"
                      : "border-white/10 bg-[#0b0b0b] text-gray-300"
                  } ${disabled ? "opacity-50" : ""}`}
                >
                  {format.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
              Quality
            </label>
            <span className="text-sm font-semibold text-gray-400">{state.quality}%</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {QUALITY_PRESETS.map((preset) => (
              <button
                key={preset.key}
                type="button"
                onClick={() => setState({ qualityPreset: preset.key, quality: preset.value })}
                className={`rounded-full border px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
                  state.qualityPreset === preset.key
                    ? "border-[#0066ff] bg-[#0066ff] text-white"
                    : "border-white/10 bg-[#0b0b0b] text-gray-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={state.quality}
            onChange={(event) => setState({ qualityPreset: "custom", quality: Number(event.target.value) })}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#222]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
              Resize
            </label>
            <select
              value={state.resizeMode}
              onChange={(event) => setState({ resizeMode: event.target.value })}
              className="w-full rounded-[14px] border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm font-semibold text-white outline-none"
            >
              {RESIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
              Metadata
            </label>
            <select
              value={state.keepMetadata ? "keep" : "strip"}
              onChange={(event) => setState({ keepMetadata: event.target.value === "keep" })}
              className="w-full rounded-[14px] border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm font-semibold text-white outline-none"
            >
              <option value="strip">Strip Metadata</option>
              <option value="keep">Keep Metadata</option>
            </select>
          </div>
        </div>

        {state.resizeMode === "custom" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
                Width
              </label>
              <input
                type="number"
                value={state.width}
                onChange={(event) => setState({ width: event.target.value })}
                className="w-full rounded-[14px] border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm font-semibold text-white outline-none"
                placeholder="Width"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
                Height
              </label>
              <input
                type="number"
                value={state.height}
                onChange={(event) => setState({ height: event.target.value })}
                className="w-full rounded-[14px] border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm font-semibold text-white outline-none"
                placeholder="Height"
              />
            </div>
            <label className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm font-semibold text-gray-300 md:col-span-2">
              <input
                type="checkbox"
                checked={state.maintainAspectRatio}
                onChange={(event) => setState({ maintainAspectRatio: event.target.checked })}
              />
              Keep Aspect Ratio
            </label>
          </div>
        )}

        <div>
          <label className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
            Compression Mode
          </label>
          <div className="flex flex-wrap gap-2">
            {COMPRESSION_MODES.map((mode) => (
              <button
                key={mode.value}
                type="button"
                onClick={() => setState({ compressionMode: mode.value })}
                className={`rounded-full border px-4 py-2 font-mono text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
                  state.compressionMode === mode.value
                    ? "border-[#0066ff] bg-[#0066ff] text-white"
                    : "border-white/10 bg-[#0b0b0b] text-gray-300"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
