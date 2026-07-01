import { useState, useEffect } from "react";
import { formatTime, parseTime } from "../../utils/audio/formatTime";

export default function TrimControls({ trimStart, trimEnd, duration, onTrimChange }) {
  const [startStr, setStartStr] = useState("00:00");
  const [endStr, setEndStr] = useState("00:00");

  useEffect(() => {
    setStartStr(formatTime(trimStart || 0));
    setEndStr(formatTime(trimEnd || duration || 0));
  }, [trimStart, trimEnd, duration]);

  function handleStartBlur() {
    const val = parseTime(startStr);
    if (val !== null && val >= 0 && val < (trimEnd || duration)) {
      onTrimChange?.(val, trimEnd);
    }
  }

  function handleEndBlur() {
    const val = parseTime(endStr);
    if (val !== null && val > (trimStart || 0) && val <= (duration || 0)) {
      onTrimChange?.(trimStart, val);
    }
  }

  const selectedDuration = (trimEnd || 0) - (trimStart || 0);

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Trim Controls</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Start Time
            </label>
            <input
              type="text"
              value={startStr}
              onChange={(e) => setStartStr(e.target.value)}
              onBlur={handleStartBlur}
              placeholder="00:00"
              className="w-full border-[2px] border-black bg-[#111] px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-[#0066ff] transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              End Time
            </label>
            <input
              type="text"
              value={endStr}
              onChange={(e) => setEndStr(e.target.value)}
              onBlur={handleEndBlur}
              placeholder="00:00"
              className="w-full border-[2px] border-black bg-[#111] px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-[#0066ff] transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Selected
            </label>
            <div className="w-full border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2.5 font-mono text-sm font-bold text-[#0066ff]">
              {formatTime(Math.max(0, selectedDuration))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
