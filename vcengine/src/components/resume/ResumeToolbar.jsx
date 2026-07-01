export default function ResumeToolbar({ zoomLevel, setZoomLevel, onUndo, onRedo }) {
  return (
    <div className="sticky top-0 z-50 mb-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b-[3px] border-black">
      <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <button
            className="border-[2px] border-black bg-[#0f0f0f] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
            onClick={onUndo}
          >
            Undo
          </button>
          <button
            className="border-[2px] border-black bg-[#0f0f0f] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
            onClick={onRedo}
          >
            Redo
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase text-gray-400">Zoom</span>
          {[0.5, 0.75, 1, 1.25, 1.5].map((z) => (
            <button
              key={z}
              onClick={() => setZoomLevel(z)}
              className={`border-[2px] border-black px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${
                Math.abs(zoomLevel - z) < 0.01 ? "bg-[#0066ff]" : "bg-[#0f0f0f]"
              }`}
            >
              {Math.round(z * 100)}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

