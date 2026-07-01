import { useEffect, useMemo, useState } from "react";

export default function ImageComparisonSlider({ images, selectedImages, comparisonMode, onModeChange }) {
  const [position, setPosition] = useState(50);

  const selectedImage = useMemo(() => {
    return images.find((image) => image.id === selectedImages?.[0]) || images[0] || null;
  }, [images, selectedImages]);

  useEffect(() => {
    setPosition(50);
  }, [selectedImage?.id]);

  const safePosition = useMemo(() => {
    const value = Number(position);
    if (!Number.isFinite(value)) return 50;
    return Math.max(5, Math.min(95, value));
  }, [position]);

  if (!selectedImage) {
    return (
      <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
          Preview & Results
        </div>
        <div className="mt-4 rounded-[16px] border border-dashed border-white/10 bg-[#0b0b0b] p-8 text-center text-sm text-gray-500">
          Upload and compress an image to preview the result.
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
            Preview & Results
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Before vs After</h2>
        </div>

        <div className="flex gap-2">
          {[
            { value: "slider", label: "Slider" },
            { value: "side-by-side", label: "Side by Side" },
          ].map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => onModeChange?.(mode.value)}
              className={`rounded-full border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] transition-all ${
                comparisonMode === mode.value
                  ? "border-[#0066ff] bg-[#0066ff] text-white"
                  : "border-white/10 bg-[#0b0b0b] text-gray-400"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {comparisonMode === "side-by-side" ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[16px] border border-white/10 bg-[#0b0b0b] p-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Original
            </div>
            <img src={selectedImage.previewUrl} alt="Original" className="mt-3 h-72 w-full rounded-[12px] object-contain" />
            <div className="mt-3 text-sm text-gray-400">{selectedImage.name}</div>
          </div>
          <div className="rounded-[16px] border border-white/10 bg-[#0b0b0b] p-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Compressed
            </div>
            {selectedImage.outputUrl ? (
              <img src={selectedImage.outputUrl} alt="Compressed" className="mt-3 h-72 w-full rounded-[12px] object-contain" />
            ) : (
              <div className="mt-3 flex h-72 items-center justify-center rounded-[12px] border border-dashed border-white/10 text-sm text-gray-500">
                Compress to preview the result.
              </div>
            )}
            <div className="mt-3 text-sm text-[#22c55e]">{selectedImage.savedPercent || 0}% Saved</div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[16px] border border-white/10 bg-[#0b0b0b] p-4">
          <div className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[#111111]">
            <img src={selectedImage.previewUrl} alt="Original" className="h-80 w-full object-contain" />
            {selectedImage.outputUrl ? (
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${safePosition}%` }}>
                <img src={selectedImage.outputUrl} alt="Compressed" className="h-80 w-full object-contain" />
              </div>
            ) : null}
            <input
              type="range"
              min="5"
              max="95"
              value={safePosition}
              onChange={(event) => setPosition(Number(event.target.value))}
              className="absolute inset-x-0 bottom-0 h-10 w-full cursor-pointer opacity-0"
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-gray-400">
            <span className="rounded-full border border-white/10 bg-[#111111] px-3 py-2">Original</span>
            <span className="rounded-full border border-white/10 bg-[#111111] px-3 py-2">Compressed</span>
            <span className="rounded-full border border-white/10 bg-[#111111] px-3 py-2">{selectedImage.savedPercent || 0}% Saved</span>
          </div>
        </div>
      )}
    </section>
  );
}
