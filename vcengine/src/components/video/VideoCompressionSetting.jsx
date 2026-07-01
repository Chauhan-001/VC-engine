import { Rabbit, Gauge, Zap, Flame } from "lucide-react";
import CompressVideoButton from "./CompressVideoButton";

const LEVELS = [
  {
    id: "low",
    title: "Low",
    subtitle: "Best Quality",
    icon: Rabbit,
    color: "#22c55e",
    description: "Fast compression with minimal quality loss.",
  },
  {
    id: "medium",
    title: "Medium",
    subtitle: "Recommended",
    icon: Gauge,
    color: "#0066ff",
    description: "Balanced size reduction and quality.",
  },
  {
    id: "high",
    title: "High",
    subtitle: "Smaller Size",
    icon: Zap,
    color: "#f59e0b",
    description: "Better compression with some quality loss.",
  },
  {
    id: "extreme",
    title: "Extreme",
    subtitle: "Maximum Compression",
    icon: Flame,
    color: "#ff3b30",
    description: "Smallest file size with aggressive compression.",
  },
];

function VideoCompressionSettings({
  compressionLevel,
  setCompressionLevel,
  resolution,
  setResolution,
  fps,
  setFps,
  bitrateMode,
  setBitrateMode,
  customBitrate,
  setCustomBitrate,
  loading,
  compressionProgress,
  estimatedOutputSize,
  estimatedReduction,
  hasVideo,
  onCompress,
}) {
  function formatFileSize(bytes = 0) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  return (
    <div
      className="
        w-full
        flex
        flex-col
        border-[3px]
        border-black
        bg-[#161616]
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <div
        className="
          border-b-[3px]
          border-black
          px-6
          py-4
        "
      >
        <h2
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            tracking-[0.2em]
            text-white
          "
        >
          COMPRESSION SETTINGS
        </h2>
      </div>

      <div className="flex flex-col gap-8 p-6">
        {/* Compression Level Selector */}
        <div>
          <label
            className="
              mb-4
              block
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            Compression Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEVELS.map((level) => {
              const Icon = level.icon;
              const active = compressionLevel === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setCompressionLevel(level.id)}
                  className={`
                    w-full
                    border-[3px]
                    border-black
                    p-4
                    text-left
                    shadow-[4px_4px_0px_0px_black]
                    transition-all
                    ${active ? "scale-[1.02]" : "hover:-translate-y-1"}
                  `}
                  style={{
                    background: active ? level.color : "#111111",
                    color: active ? "#ffffff" : "#e5e7eb",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        border-[2px]
                        border-black
                        bg-black
                      "
                    >
                      <Icon size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className="
                            font-mono
                            text-sm
                            font-black
                            uppercase
                            truncate
                          "
                        >
                          {level.title}
                        </h3>

                        <span
                          className="
                            font-mono
                            text-[10px]
                            uppercase
                            opacity-75
                            shrink-0
                          "
                        >
                          {level.subtitle}
                        </span>
                      </div>

                      <p
                        className="
                          mt-2
                          text-xs
                          leading-5
                          opacity-90
                          line-clamp-2
                        "
                      >
                        {level.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-[#333] border-[1px]" />

        {/* Advanced Grid */}
        <div>
          <label
            className="
              mb-4
              block
              font-mono
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            Custom Parameters
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1: Resolution & FPS */}
            <div className="space-y-6">
              {/* Resolution */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    text-gray-400
                  "
                >
                  Resolution
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {["original", "1080p", "720p", "480p"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setResolution(item)}
                      className={`
                        border-[3px]
                        border-black
                        py-3
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        shadow-[3px_3px_0px_0px_black]
                        transition-all
                        ${
                          resolution === item
                            ? `
                              bg-[#ff3b30]
                              text-white
                            `
                            : `
                              bg-[#111111]
                              text-gray-300
                              hover:bg-[#222222]
                            `
                        }
                      `}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* FPS */}
              <div>
                <label
                  className="
                    mb-2
                    block
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    text-gray-400
                  "
                >
                  FPS
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {["original", "60", "30", "24"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFps(item)}
                      className={`
                        border-[3px]
                        border-black
                        py-3
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        shadow-[3px_3px_0px_0px_black]
                        transition-all
                        ${
                          fps === item
                            ? `
                              bg-[#ff3b30]
                              text-white
                            `
                            : `
                              bg-[#111111]
                              text-gray-300
                              hover:bg-[#222222]
                            `
                        }
                      `}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Bitrate Mode & Custom Input */}
            <div className="flex flex-col gap-6">
              <div>
                <label
                  className="
                    mb-2
                    block
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    text-gray-400
                  "
                >
                  Bitrate Mode
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {["auto", "custom"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setBitrateMode(mode)}
                      className={`
                        border-[3px]
                        border-black
                        py-3
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        shadow-[3px_3px_0px_0px_black]
                        transition-all
                        ${
                          bitrateMode === mode
                            ? `
                              bg-[#ff3b30]
                              text-white
                            `
                            : `
                              bg-[#111111]
                              text-gray-300
                              hover:bg-[#222222]
                            `
                        }
                      `}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {bitrateMode === "custom" && (
                <div>
                  <label
                    className="
                      mb-2
                      block
                      font-mono
                      text-xs
                      font-bold
                      uppercase
                      text-gray-400
                    "
                  >
                    Custom Bitrate (kbps)
                  </label>

                  <input
                    type="number"
                    min="500"
                    step="100"
                    value={customBitrate}
                    onChange={(e) => setCustomBitrate(e.target.value)}
                    className="
                      w-full
                      border-[3px]
                      border-black
                      bg-[#111111]
                      px-4
                      py-3
                      font-mono
                      text-sm
                      text-white
                      outline-none
                      transition-colors
                      focus:border-[#ff3b30]
                    "
                  />
                </div>
              )}
            </div>

            {/* Column 3: Privacy & Compress button */}
            <div className="flex flex-col justify-between gap-6">
              {/* Privacy */}
              <div
                className="
                  border-[2px]
                  border-[#ff3b30]
                  bg-[#1a0d0c]
                  p-4
                "
              >
                <h3
                  className="
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    text-[#ff6b61]
                  "
                >
                  Privacy First
                </h3>

                <ul
                  className="
                    mt-2
                    space-y-1
                    text-xs
                    text-gray-300
                  "
                >
                  <li>• Videos never leave your device</li>
                  <li>• FFmpeg runs entirely in your browser</li>
                  <li>• No upload limits or server latency</li>
                  <li>• Local processing ensures complete privacy</li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-auto space-y-4">
                <div
                  className="
                    border-[2px]
                    border-black
                    bg-[#0f0f0f]
                    p-4
                  "
                >
                  <p
                    className="
                      font-mono
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-gray-400
                    "
                  >
                    Estimated Result
                  </p>
                  <p className="mt-2 text-lg font-black text-white">
                    {estimatedOutputSize ? formatFileSize(estimatedOutputSize) : "--"}
                  </p>
                  <p className="mt-1 text-sm text-gray-300">
                    {estimatedReduction !== null
                      ? `${estimatedReduction.toFixed(1)}% smaller than original`
                      : "Adjust settings to preview a smaller output."}
                  </p>
                </div>

                <CompressVideoButton
                  onCompress={onCompress}
                  loading={loading}
                  progress={compressionProgress}
                  disabled={!hasVideo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCompressionSettings;