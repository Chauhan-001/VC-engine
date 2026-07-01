import ReorderButton from "./ReorderButton";

function ReorderSummary({
  originalPageCount,
  currentPages,
  removedPages,
  loading,
  onSave,
}) {
  return (
    <div
      className="
        mt-10
        border-[3px]
        border-black
        bg-[#1a1a1a]
        p-6
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <h3
        className="
          mb-6
          font-mono
          text-sm
          font-bold
          uppercase
          text-white
        "
      >
        Document Summary
      </h3>

      {/* Stats */}
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Original
          </span>

          <span
            className="
              font-mono
              text-sm
              font-bold
              text-white
            "
          >
            {originalPageCount} Pages
          </span>
        </div>

        <div className="h-[2px] bg-[#2a2a2a]" />

        <div className="flex items-center justify-between">
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Current
          </span>

          <span
            className="
              font-mono
              text-sm
              font-bold
              text-[#3ECF8E]
            "
          >
            {currentPages.length} Pages
          </span>
        </div>

        <div className="h-[2px] bg-[#2a2a2a]" />

        <div className="flex items-center justify-between">
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Removed
          </span>

          <span
            className="
              font-mono
              text-sm
              font-bold
              text-red-400
            "
          >
            {removedPages.length} Pages
          </span>
        </div>

      </div>

      {/* Current Order */}
      <div
        className="
          mt-6
          border-[2px]
          border-[#2a2a2a]
          bg-[#111111]
          p-4
        "
      >
        <p
          className="
            mb-2
            font-mono
            text-xs
            font-bold
            uppercase
            text-gray-400
          "
        >
          Current Order
        </p>

        <p
          className="
            font-mono
            text-sm
            text-white
            break-words
          "
        >
          {currentPages.join(", ")}
        </p>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <ReorderButton
          onSave={onSave}
          loading={loading}
          disabled={currentPages.length === 0}
        />
      </div>
    </div>
  );
}

export default ReorderSummary;