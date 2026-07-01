import { Clapperboard } from "lucide-react";

function CompressVideoButton({
  onCompress,
  loading,
  progress = 0,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onCompress}
      disabled={disabled || loading}
      className={`
        group
        w-full
        border-[3px]
        border-black
        px-6
        py-5
        shadow-[6px_6px_0px_0px_black]
        transition-all
        duration-200

        ${
          disabled || loading
            ? `
              cursor-not-allowed
              bg-[#2a2a2a]
              text-gray-500
              shadow-none
            `
            : `
              bg-[#ff3b30]
              text-white
              hover:-translate-x-[2px]
              hover:-translate-y-[2px]
              hover:shadow-[8px_8px_0px_0px_black]
              active:translate-x-[2px]
              active:translate-y-[2px]
              active:shadow-none
            `
        }
      `}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center gap-4">
          <Clapperboard
            size={24}
            className={`
              transition-transform
              ${
                loading
                  ? "animate-pulse"
                  : "group-hover:scale-110"
              }
            `}
          />

          <div className="text-left">
            <div
              className="
                font-mono
                text-2xl
                font-black
                uppercase
              "
            >
              {loading
                ? "Compressing..."
                : "Compress Video"}
            </div>
          </div>
        </div>

        {loading && (
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden border-[2px] border-black bg-black/40">
              <div
                className="h-full bg-[#22c55e] transition-all duration-300"
                style={{ width: `${Math.max(5, progress)}%` }}
              />
            </div>
            <p className="text-center font-mono text-[11px] uppercase tracking-wider text-gray-200">
              {progress < 100 ? `Processing ${progress}%` : "Finishing export..."}
            </p>
          </div>
        )}
      </div>
    </button>
  );
}

export default CompressVideoButton;