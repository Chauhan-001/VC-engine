import ExtractButton from "./ExtractButton";


function ExtractControls({
  pageInput,
  setPageInput,
  pageCount,
  selectedPages,
  loading,
  onExtract,
}) {
  return (
    <div
      className="
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
        Extract Controls
      </h3>

      {/* Input */}
      <div className="mb-6">
        <label
          className="
            mb-2
            block
            font-mono
            text-xs
            font-bold
            uppercase
            text-gray-300
          "
        >
          Pages To Extract
        </label>

        <input
          type="text"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          placeholder="Example: 1,5,8-12"
          className="
            w-full
            border-[3px]
            border-black
            bg-[#0f0f0f]
            px-4
            py-3
            font-mono
            text-sm
            text-white
            outline-none
            transition-colors
            focus:border-[#0066ff]
          "
        />

        <div
          className="
            mt-3
            space-y-1
            font-mono
            text-[11px]
            uppercase
            text-gray-400
          "
        >
          <p>Single: 5</p>
          <p>Range: 1-10</p>
          <p>Multiple: 1,5,8-12</p>
        </div>
      </div>

      {/* Stats */}
      <div
        className="
          mb-6
          border-[3px]
          border-black
          bg-[#111111]
          p-4
        "
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase text-gray-400">
            Original
          </span>

          <span className="font-mono text-sm font-bold text-white">
            {pageCount} Pages
          </span>
        </div>

        <div className="my-3 h-[2px] bg-[#2a2a2a]" />

        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase text-gray-400">
            Selected
          </span>

          <span className="font-mono text-sm font-bold text-[#0066ff]">
            {selectedPages.length} Pages
          </span>
        </div>

        <div className="my-3 h-[2px] bg-[#2a2a2a]" />

        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase text-gray-400">
            Output
          </span>

          <span className="font-mono text-sm font-bold text-[#3ECF8E]">
            {selectedPages.length} Pages
          </span>
        </div>
      </div>

      {/* Button */}
      <ExtractButton
        onExtract={onExtract}
        loading={loading}
        disabled={selectedPages.length === 0}
      />
    </div>
  );
}

export default ExtractControls;