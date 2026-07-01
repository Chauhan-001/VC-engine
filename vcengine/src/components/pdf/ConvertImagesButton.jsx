import { ImageIcon } from "lucide-react";

function ConvertImagesButton({
  onConvert,
  loading,
  disabled,
  pageCount,
}) {
  return (
    <button
      type="button"
      onClick={onConvert}
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
              bg-[#0066ff]
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
      <div className="flex items-center justify-center gap-4">
        <ImageIcon
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
              ? "Converting..."
              : "Convert To Images"}
          </div>

          {!loading &&
            pageCount > 0 && (
              <div
                className="
                  mt-1
                  font-mono
                  text-[11px]
                  uppercase
                  text-blue-100
                "
              >
                {pageCount} page
                {pageCount > 1
                  ? "s"
                  : ""}
                {" "}ready
              </div>
            )}
        </div>
      </div>
    </button>
  );
}

export default ConvertImagesButton;