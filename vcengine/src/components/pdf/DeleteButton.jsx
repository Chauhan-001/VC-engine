import { Loader2 } from "lucide-react";

export default function DeleteButton({ onDelete, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={disabled || loading}
      aria-label="Delete selected PDF pages"
      className="
        w-full
        border-[3px]
        border-black
        bg-[#0066ff]
        px-6
        py-3
        font-mono
        text-sm
        font-bold
        uppercase
        text-white
        shadow-[4px_4px_0px_0px_black]
        transition-all
        hover:-translate-x-[2px]
        hover:-translate-y-[2px]
        hover:shadow-[6px_6px_0px_0px_black]
        disabled:opacity-50
        disabled:hover:translate-x-0
        disabled:hover:translate-y-0
        disabled:hover:shadow-[4px_4px_0px_0px_black]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#0066ff]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0a0a0a]
      "
    >
      <span className="inline-flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Deleting...
          </>
        ) : (
          "DELETE PAGES"
        )}
      </span>
    </button>
  );
}

