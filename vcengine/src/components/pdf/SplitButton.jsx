import { Loader2, Scissors } from "lucide-react";

function SplitButton({ onSplit, loading, disabled }) {
  return (
    <button
      onClick={onSplit}
      disabled={loading || disabled}
      className={`
        flex
        w-full
        items-center
        justify-center
        gap-3
        border-[3px]
        border-black
        px-8
        py-4
        font-mono
        text-sm
        font-bold
        uppercase
        shadow-[4px_4px_0px_0px_black]
        transition-all
        duration-150

        ${
          loading || disabled
            ? `
              cursor-not-allowed
              bg-gray-600
              text-gray-300
              opacity-70
            `
            : `
              bg-[#0066ff]
              text-white
              hover:-translate-x-[2px]
              hover:-translate-y-[2px]
              hover:shadow-[6px_6px_0px_0px_black]
              active:translate-x-[2px]
              active:translate-y-[2px]
              active:shadow-none
            `
        }
      `}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Splitting...</span>
        </>
      ) : (
        <>
          <Scissors size={18} />
          <span>Split PDF</span>
        </>
      )}
    </button>
  );
}

export default SplitButton;

