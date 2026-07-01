import {
  Rabbit,
  Gauge,
  Zap,
  Flame,
} from "lucide-react";

const LEVELS = [
  {
    id: "low",
    title: "Low",
    subtitle: "Best Quality",
    icon: Rabbit,
    color: "#22c55e",
    description:
      "Fast compression with minimal quality loss.",
  },

  {
    id: "medium",
    title: "Medium",
    subtitle: "Recommended",
    icon: Gauge,
    color: "#0066ff",
    description:
      "Balanced size reduction and quality.",
  },

  {
    id: "high",
    title: "High",
    subtitle: "Smaller Size",
    icon: Zap,
    color: "#f59e0b",
    description:
      "Better compression with some quality loss.",
  },

  {
    id: "extreme",
    title: "Extreme",
    subtitle: "Maximum Compression",
    icon: Flame,
    color: "#ff3b30",
    description:
      "Smallest file size with aggressive compression.",
  },
];

function CompressionLevelSelector({
  compressionLevel,
  setCompressionLevel,
}) {
  return (
    <div
      className="
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
          Compression Level
        </h2>
      </div>

      <div className="space-y-4 p-6">
        {LEVELS.map((level) => {
          const Icon =
            level.icon;

          const active =
            compressionLevel ===
            level.id;

          return (
            <button
              key={level.id}
              onClick={() =>
                setCompressionLevel(
                  level.id
                )
              }
              className={`
                w-full
                border-[3px]
                border-black
                p-4
                text-left
                shadow-[4px_4px_0px_0px_black]
                transition-all

                ${
                  active
                    ? "scale-[1.02]"
                    : "hover:-translate-y-1"
                }
              `}
              style={{
                background: active
                  ? level.color
                  : "#111111",

                color: active
                  ? "#ffffff"
                  : "#e5e7eb",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    border-[2px]
                    border-black
                    bg-black
                  "
                >
                  <Icon
                    size={22}
                  />
                </div>

                <div className="flex-1">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <h3
                      className="
                        font-mono
                        text-sm
                        font-black
                        uppercase
                      "
                    >
                      {level.title}
                    </h3>

                    <span
                      className="
                        font-mono
                        text-[10px]
                        uppercase
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
  );
}

export default CompressionLevelSelector;