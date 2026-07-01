export default function DeleteStatsCard({
  originalPages,
  selectedForDeletion,
  remaining,
}) {
  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#161616]
        p-5
        shadow-[4px_4px_0px_0px_black]
      "
      aria-label="Deletion statistics"
    >
      <div className="font-mono text-xs uppercase tracking-wider text-gray-400">
        Stats
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border-[3px] border-black bg-[#0f0f0f] p-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
            Original Pages
          </div>
          <div className="mt-1 text-2xl font-black text-white">{originalPages}</div>
        </div>

        <div className="border-[3px] border-black bg-[#0f0f0f] p-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
            Selected For Deletion
          </div>
          <div className="mt-1 text-2xl font-black text-white text-[#ff4d4d]">{selectedForDeletion}</div>
        </div>

        <div className="border-[3px] border-black bg-[#0f0f0f] p-4">
          <div className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
            Remaining
          </div>
          <div className="mt-1 text-2xl font-black text-white">{remaining}</div>
        </div>
      </div>
    </div>
  );
}

