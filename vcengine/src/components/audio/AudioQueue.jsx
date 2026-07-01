import { formatFileSize } from "../../utils/audio/formatTime";

export default function AudioQueue({ items, onRemove, onReorder, onClearAll, totalDuration }) {
  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Queue</h2>
        <div className="flex items-center gap-4">
          {totalDuration != null && (
            <span className="font-mono text-[10px] font-bold uppercase text-gray-400">Total: {totalDuration}</span>
          )}
          <button type="button" onClick={onClearAll} className="text-gray-400 hover:text-red-400 transition-colors font-mono text-[10px] font-bold uppercase">
            Remove All
          </button>
        </div>
      </div>
      <div className="divide-y divide-[#1a1a1a]">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-3">
            <div className="font-mono text-xl font-black text-gray-600 select-none">#{index + 1}</div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-mono text-xs font-bold text-white">{item.file.name}</p>
              <p className="font-mono text-[10px] text-gray-500">{formatFileSize(item.file.size)}</p>
            </div>
            <button type="button" onClick={() => onRemove?.(index)} className="text-gray-500 hover:text-red-400 transition-colors font-mono text-[10px] font-bold uppercase">
              Remove
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="px-6 py-8 text-center font-mono text-sm text-gray-500">No files in queue</div>
        )}
      </div>
    </div>
  );
}
