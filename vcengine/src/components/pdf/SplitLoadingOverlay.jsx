function SplitLoadingOverlay({ loading, label }) {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 z-20">
      <div className="h-full w-full bg-black/50" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className="
            w-full
            max-w-md
            border-[3px]
            border-black
            bg-[#1a1a1a]
            p-6
            shadow-[10px_10px_0px_0px_black]
          "
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#0066ff] border-t-transparent" />
            <div>
              <p className="font-mono text-sm font-bold uppercase text-white">Processing</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-gray-400">{label}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-4 w-full animate-pulse bg-[#0f0f0f]" />
            <div className="h-4 w-5/6 animate-pulse bg-[#0f0f0f]" />
            <div className="h-4 w-2/3 animate-pulse bg-[#0f0f0f]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitLoadingOverlay;

