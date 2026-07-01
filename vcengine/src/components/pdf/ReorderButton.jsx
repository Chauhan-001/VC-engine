function ReorderButton({
  onSave,
  loading,
  disabled,
}) {
  return (
    <button
      onClick={onSave}
      disabled={disabled || loading}
      className={`
        w-full
        border-[3px]
        border-black
        px-6
        py-4
        font-mono
        text-sm
        font-bold
        uppercase
        shadow-[4px_4px_0px_0px_black]
        transition-all
        duration-150

        ${
          disabled || loading
            ? `
              cursor-not-allowed
              bg-[#2a2a2a]
              text-gray-500
              shadow-none
            `
            : `
              bg-[#3ECF8E]
              text-black
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
      {loading
        ? "Saving..."
        : "Save New Order"}
    </button>
  );
}

export default ReorderButton;