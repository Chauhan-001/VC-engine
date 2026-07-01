export default function ImagesToVideoSettings({
  images,
  setImages,
  audioFile,
  setAudioFile,

  outputFormat,
  setOutputFormat,
  resolutionPreset,
  setResolutionPreset,
  customWidth,
  setCustomWidth,
  customHeight,
  setCustomHeight,
  fps,
  setFps,
  aspectRatio,
  setAspectRatio,
  fitMode,
  setFitMode,
  quality,
  setQuality,
  globalSpeed,
  setGlobalSpeed,
  reverse,
  setReverse,
  transitionsEnabled,
  setTransitionsEnabled,

  audioVolume,
  setAudioVolume,
  audioSpeed,
  setAudioSpeed,
  loopAudio,
  setLoopAudio,
  fadeIn,
  setFadeIn,
  fadeOut,
  setFadeOut,
  trimStart,
  setTrimStart,
  trimEnd,
  setTrimEnd,
  audioTrimEnabled,
  setAudioTrimEnabled,

  loading,
  generationProgress,
  hasImages,
  onGenerate,
}) {
  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Global Settings</h2>
      </div>

      <div className="p-6 space-y-8">
        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Output Format</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { v: "mp4", label: "MP4" },
              { v: "webm", label: "WEBM" },
              { v: "mov", label: "MOV" },
              { v: "gif", label: "GIF" },
            ].map((x) => (
              <button
                key={x.v}
                type="button"
                onClick={() => setOutputFormat(x.v)}
                className={
                  "border-[3px] border-black bg-[#111111] px-4 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (outputFormat === x.v ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Resolution</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { v: "720p", label: "720p" },
              { v: "1080p", label: "1080p" },
              { v: "1440p", label: "1440p" },
              { v: "4k", label: "4K" },
              { v: "custom", label: "Custom" },
            ].map((x) => (
              <button
                key={x.v}
                type="button"
                onClick={() => setResolutionPreset(x.v)}
                className={
                  "border-[3px] border-black bg-[#111111] px-4 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (resolutionPreset === x.v ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {x.label}
              </button>
            ))}
          </div>

          {resolutionPreset === "custom" && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="font-mono text-[11px] font-bold uppercase text-gray-400">Width</span>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  className="mt-1 w-full border-[3px] border-black bg-[#0f0f0f] p-3 font-mono text-white outline-none"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[11px] font-bold uppercase text-gray-400">Height</span>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  className="mt-1 w-full border-[3px] border-black bg-[#0f0f0f] p-3 font-mono text-white outline-none"
                />
              </label>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">FPS</h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[24, 30, 60].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFps(n)}
                className={
                  "border-[3px] border-black bg-[#111111] px-4 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (fps === n ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {n} FPS
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Aspect Ratio</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {["16:9", "9:16", "1:1", "4:5", "21:9"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setAspectRatio(r)}
                className={
                  "border-[3px] border-black bg-[#111111] px-4 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (aspectRatio === r ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Fit Mode</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {["contain", "cover", "stretch", "blur"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFitMode(m)}
                className={
                  "border-[3px] border-black bg-[#111111] px-4 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (fitMode === m ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {m === "blur" ? "Blur Background" : m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Video Quality</h3>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {["low", "medium", "high", "ultra"].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuality(q)}
                className={
                  "border-[3px] border-black bg-[#111111] px-3 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (quality === q ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {q.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Global Speed</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0.25, 0.5, 1, 1.5, 2, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setGlobalSpeed(s)}
                className={
                  "border-[3px] border-black bg-[#111111] px-3 py-3 shadow-[4px_4px_0px_0px_black] transition-all uppercase font-mono font-black text-white " +
                  (globalSpeed === s ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 font-mono text-sm text-gray-300">
            <input type="checkbox" checked={reverse} onChange={(e) => setReverse(e.target.checked)} />
            Reverse Final Video
          </label>
          <label className="flex items-center gap-3 font-mono text-sm text-gray-300">
            <input
              type="checkbox"
              checked={transitionsEnabled}
              onChange={(e) => setTransitionsEnabled(e.target.checked)}
            />
            Enable Transitions
          </label>
        </div>

        <div className="border-[2px] border-black bg-[#0f0f0f] p-4 shadow-[3px_3px_0px_0px_black]">
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Audio Source</h3>
          <div className="mt-4">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="w-full"
            />
            {audioFile && (
              <p className="mt-2 font-mono text-xs uppercase text-gray-400">Selected: {audioFile.name}</p>
            )}
          </div>

          {audioFile && (
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="font-mono text-[11px] font-bold uppercase text-gray-400">Volume</span>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.01}
                  value={audioVolume}
                  onChange={(e) => setAudioVolume(Number(e.target.value))}
                  className="w-full"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[11px] font-bold uppercase text-gray-400">Audio Speed</span>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={audioSpeed}
                  onChange={(e) => setAudioSpeed(Number(e.target.value))}
                  className="w-full"
                />
              </label>
              <label className="flex items-center gap-3 font-mono text-sm text-gray-300">
                <input type="checkbox" checked={loopAudio} onChange={(e) => setLoopAudio(e.target.checked)} />
                Loop Until Video Ends
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {loading && (
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden border-[2px] border-black bg-black/40">
                <div className="h-full bg-[#22c55e] transition-all duration-300" style={{ width: `${Math.max(5, generationProgress)}%` }} />
              </div>
              <p className="text-center font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {generationProgress < 100 ? `Rendering ${generationProgress}%` : "Finishing preview..."}
              </p>
            </div>
          )}

          <button
            type="button"
            disabled={!hasImages || loading}
            onClick={onGenerate}
            className="
              border-[3px]
              border-black
              bg-[#ff3b30]
              px-8
              py-4
              font-mono
              text-sm
              font-bold
              uppercase
              text-white
              shadow-[6px_6px_0px_0px_black]
              transition-all
              hover:-translate-y-1
              hover:shadow-[8px_8px_0px_0px_black]
              active:translate-y-1
              active:shadow-none
              disabled:opacity-50
              disabled:hover:translate-y-0
            "
          >
            {loading ? "Generating..." : "Generate Video"}
          </button>
        </div>
      </div>
    </div>
  );
}

