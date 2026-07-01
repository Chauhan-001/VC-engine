import { useState } from "react";

function ImageSettingsPanel({ image, onUpdate, onClose }) {
  const [localDuration, setLocalDuration] = useState(image.duration || 3);
  const [customDuration, setCustomDuration] = useState("");
  const [useCustom, setUseCustom] = useState(!Number.isInteger(image.duration));

  function handleDurationSelect(dur) {
    setLocalDuration(dur);
    setUseCustom(false);
    onUpdate(image.id, "duration", dur);
  }

  function handleCustomDuration() {
    const val = parseFloat(customDuration);
    if (!isNaN(val) && val > 0) {
      setLocalDuration(val);
      onUpdate(image.id, "duration", val);
    }
  }

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-4 py-3 flex items-center justify-between">
        <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">Image Settings</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xs font-mono uppercase"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <p className="font-mono text-[10px] uppercase text-gray-400 mb-2">{image.file.name}</p>

          <h4 className="font-mono text-xs font-bold uppercase text-white mb-2">Duration</h4>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 5].map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => handleDurationSelect(dur)}
                className={
                  "border-[2px] border-black bg-[#111111] px-2 py-2 font-mono text-xs font-bold uppercase text-white " +
                  (localDuration === dur && !useCustom ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
                }
              >
                {dur}s
              </button>
            ))}
            <button
              type="button"
              onClick={() => setUseCustom(true)}
              className={
                "border-[2px] border-black bg-[#111111] px-2 py-2 font-mono text-xs font-bold uppercase text-white " +
                (useCustom ? "bg-[#ff3b30]" : "hover:bg-[#1b1b1b]")
              }
            >
              Custom
            </button>
          </div>

          {useCustom && (
            <div className="mt-3 flex items-end gap-2">
              <label className="flex-1">
                <span className="font-mono text-[10px] font-bold uppercase text-gray-400">Duration (seconds)</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  onBlur={handleCustomDuration}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCustomDuration();
                      onClose();
                    }
                  }}
                  className="mt-1 w-full border-[2px] border-black bg-[#0f0f0f] p-2 font-mono text-white outline-none text-xs"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageSettingsPanel;