export default function GenerateGifButton({ disabled, loading, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="
        border-[3px]
        border-black
        bg-[#ff3b30]
        px-8
        py-4
        font-mono
        text-sm
        font-bold
        uppercase
        text-white
        shadow-[6px_6px_0px_0px_black]
        transition-all
        hover:-translate-y-1
        hover:shadow-[8px_8px_0px_0px_black]
        active:translate-y-1
        active:shadow-none
        disabled:opacity-50
        disabled:hover:translate-y-0
      "
    >
      {loading ? "Generating..." : "Generate GIF"}
    </button>
  );
}

