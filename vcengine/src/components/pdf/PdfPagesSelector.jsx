import { FileText } from "lucide-react";

function PdfPagesSelector({
  pageCount,

  outputMode,
  setOutputMode,

  selectedPagesInput,
  setSelectedPagesInput,
}) {
  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#161616]
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <div
        className="
          border-b-[3px]
          border-black
          px-6
          py-4
        "
      >
        <div className="flex items-center gap-3">
          <FileText
            size={18}
            className="text-[#0066ff]"
          />

          <h2
            className="
              font-mono
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-white
            "
          >
            Pages
          </h2>
        </div>
      </div>

      <div className="p-6">
        {/* Total Pages */}
        <div
          className="
            mb-8
            font-mono
            text-sm
            text-gray-300
          "
        >
          Total Pages:{" "}
          <span
            className="
              font-bold
              text-[#0066ff]
            "
          >
            {pageCount}
          </span>
        </div>

        {/* Options */}
        <div className="space-y-5">
          {/* All Pages */}
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
            "
          >
            <input
              type="radio"
              checked={
                outputMode ===
                "all"
              }
              onChange={() =>
                setOutputMode("all")
              }
              className="
                h-4
                w-4
                accent-[#0066ff]
              "
            />

            <span
              className="
                font-mono
                text-sm
                text-white
              "
            >
              All Pages
            </span>
          </label>

          {/* Selected Pages */}
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
            "
          >
            <input
              type="radio"
              checked={
                outputMode ===
                "selected"
              }
              onChange={() =>
                setOutputMode(
                  "selected"
                )
              }
              className="
                h-4
                w-4
                accent-[#0066ff]
              "
            />

            <span
              className="
                font-mono
                text-sm
                text-white
              "
            >
              Select Pages
            </span>
          </label>
        </div>

        {/* Input */}
        {outputMode ===
          "selected" && (
          <div className="mt-6">
            <input
              type="text"
              value={
                selectedPagesInput
              }
              onChange={(e) =>
                setSelectedPagesInput(
                  e.target.value
                )
              }
              placeholder="e.g. 1-3, 5, 7-10"
              className="
                w-full
                border-[3px]
                border-black
                bg-[#111111]
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

            <p
              className="
                mt-3
                text-xs
                leading-5
                text-gray-400
              "
            >
              Enter page numbers or
              ranges separated by
              commas.
            </p>

            <div
              className="
                mt-4
                border-[2px]
                border-[#0066ff]
                bg-[#0f172a]
                p-3
              "
            >
              <p
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  text-[#60a5fa]
                "
              >
                Examples:
              </p>

              <ul
                className="
                  mt-2
                  space-y-1
                  font-mono
                  text-[11px]
                  text-gray-300
                "
              >
                <li>1,2,3</li>
                <li>1-5</li>
                <li>1-3,7,10-12</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfPagesSelector;