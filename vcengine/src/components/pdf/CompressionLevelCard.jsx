import { useMemo } from "react";

const LEVELS = ["LOW", "MEDIUM", "HIGH"]; // slider positions: 0..2

function levelToValue(level) {
  const idx = LEVELS.indexOf(level);
  return idx >= 0 ? idx : 1; // default MEDIUM
}

function valueToLevel(value) {
  const v = Number.isFinite(value) ? value : 1;
  const idx = Math.max(0, Math.min(2, v));
  return LEVELS[idx];
}

function getDescription(level) {
  if (level === "LOW") {
    return {
      title: "LOW",
      description: "Best quality / Less compression",
    };
  }
  if (level === "MEDIUM") {
    return {
      title: "BALANCED (MEDIUM)",
      description:
        "Optimal balance between file size reduction and readability.\nBest for emails and web.",
    };
  }
  return {
    title: "MAXIMUM COMPRESSION",
    description: "Maximum compression.\nSmallest file size.",
  };
}

export default function CompressionLevelCard({
  level,
  onChangeLevel,
  disabled,
}) {
  const safeLevel = useMemo(() => {
    return LEVELS.includes(level) ? level : "MEDIUM";
  }, [level]);

  const sliderValue = useMemo(
    () => levelToValue(safeLevel),
    [safeLevel]
  );
  const activeDescription = useMemo(
    () => getDescription(safeLevel),
    [safeLevel]
  );

  const emitChange = (nextValue) => {
    if (disabled) return;
    const nextLevel = valueToLevel(nextValue);
    onChangeLevel?.(nextLevel);
  };

  return (
    <div>
      <h2 className="font-mono text-sm font-bold uppercase text-white">
        Compression Level
      </h2>

      <div className="mt-3 border-[3px] border-black bg-[#0f0f0f] p-4 shadow-[4px_4px_0px_0px_black]">
        <div className="mt-1">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold uppercase text-gray-300">
              LOW
            </span>

            <div className="flex-1 px-3">
              <input
                type="range"
                min={0}
                max={2}
                step={1}
                value={sliderValue}
                disabled={disabled}
                onChange={(e) => emitChange(Number(e.target.value))}
                aria-label="Compression level"
                className="compression-level-range"
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                  width: "100%",
                  height: "18px",
                  background: "transparent",
                }}
              />

              {/* Thick neo-brutalist track + blue active indicator */}
              <div className="relative -mt-5">
                <div className="h-[6px] w-full border-[3px] border-black bg-[#161616]" />
                <div
                  className="absolute top-[50%] left-0 -translate-y-1/2 h-[6px] border-[3px] border-black bg-[#0066ff] transition-all"
                  style={{ width: `${(sliderValue / 2) * 100}%` }}
                />
              </div>

              {/* Thumb snap positions (visual dots) */}
              <div className="relative -mt-2">
                <div className="flex justify-between px-0">
                  {[0, 1, 2].map((i) => {
                    const active = i === sliderValue;
                    return (
                      <div
                        key={i}
                        className={[
                          "h-[12px] w-[12px] rounded-none border-[3px] border-black",
                          "shadow-[3px_3px_0px_0px_black] transition-all",
                          active ? "bg-[#0066ff] scale-110" : "bg-[#161616]",
                        ].join(" ")}
                        aria-hidden="true"
                        style={{ marginTop: 2 }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <span className="font-mono text-xs font-bold uppercase text-gray-300">
              HIGH
            </span>
          </div>
        </div>

        {/* Labels */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {LEVELS.map((l, idx) => {
            const active = idx === sliderValue;
            return (
              <div key={l} className="text-center">
                <span
                  className={[
                    "font-mono text-xs font-bold uppercase tracking-wider transition-all",
                    active ? "text-white text-[13px]" : "text-gray-500",
                  ].join(" ")}
                  style={active ? { color: "#0066ff" } : undefined}
                >
                  {l}
                </span>
              </div>
            );
          })}
        </div>

        {/* Description card (ONLY one active card) */}
        <div className="mt-5 border-[3px] border-black bg-[#161616] p-4 shadow-[6px_6px_0px_0px_black]">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066ff]">
            {activeDescription.title}
          </p>
          <p className="mt-3 whitespace-pre-line font-mono text-sm font-bold uppercase text-white">
            {activeDescription.description}
          </p>
          <div className="mt-3 h-[2px] w-full bg-black" />
        </div>
      </div>

      {/* Minimal CSS for the real range thumb (keeps accessibility + snapping). */}
      <style>{`
        .compression-level-range::-webkit-slider-runnable-track {
          height: 6px;
          background: transparent;
          border: none;
        }
        .compression-level-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border: 3px solid #000;
          background: #0a0a0a;
          box-shadow: 4px 4px 0px 0px #000, 0 0 0 3px rgba(0,102,255,0);
          transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
          cursor: ${disabled ? "not-allowed" : "pointer"};
          border-radius: 0;
        }
        .compression-level-range:focus-visible::-webkit-slider-thumb{
          box-shadow: 4px 4px 0px 0px #000, 0 0 0 3px rgba(0,102,255,0.45);
        }
        .compression-level-range::-moz-range-track {
          height: 6px;
          background: transparent;
          border: none;
        }
        .compression-level-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border: 3px solid #000;
          background: #0a0a0a;
          box-shadow: 4px 4px 0px 0px #000;
          transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
          cursor: ${disabled ? "not-allowed" : "pointer"};
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}
