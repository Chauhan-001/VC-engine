import GeneratePdfButton from "./GeneratedPdfButton";

function ImagesToPdfConfig({
  pageSize,
  setPageSize,

  orientation,
  setOrientation,

  margin,
  setMargin,

  fitMode,
  setFitMode,

  quality,
  setQuality,

  loading,
  imageCount,

  onGenerate,
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
          PDF Settings
        </h2>
      </div>

      <div className="space-y-8 p-6">
        {/* Page Size */}
        <div>
          <label
            className="
              mb-3
              block
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Page Size
          </label>

          <div className="grid grid-cols-3 gap-3">
            {["A4", "Letter", "Legal"].map(
              (size) => (
                <button
                  key={size}
                  onClick={() =>
                    setPageSize(size)
                  }
                  className={`
                    border-[3px]
                    border-black
                    py-3
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    shadow-[3px_3px_0px_0px_black]
                    transition-all

                    ${
                      pageSize === size
                        ? `
                          bg-[#0066ff]
                          text-white
                        `
                        : `
                          bg-[#0f0f0f]
                          text-gray-300
                          hover:bg-[#222]
                        `
                    }
                  `}
                >
                  {size}
                </button>
              )
            )}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label
            className="
              mb-3
              block
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Orientation
          </label>

          <div className="grid grid-cols-2 gap-3">
            {[
              "portrait",
              "landscape",
            ].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setOrientation(item)
                }
                className={`
                  border-[3px]
                  border-black
                  py-3
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  shadow-[3px_3px_0px_0px_black]
                  transition-all

                  ${
                    orientation === item
                      ? `
                        bg-[#0066ff]
                        text-white
                      `
                      : `
                        bg-[#0f0f0f]
                        text-gray-300
                        hover:bg-[#222]
                      `
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Margin */}
        <div>
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <label
              className="
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              Margin
            </label>

            <span
              className="
                font-mono
                text-xs
                font-bold
                text-[#0066ff]
              "
            >
              {margin}px
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="50"
            value={margin}
            onChange={(e) =>
              setMargin(
                Number(
                  e.target.value
                )
              )
            }
            className="
              w-full
              cursor-pointer
            "
          />
        </div>

        {/* Fit Mode */}
        <div>
          <label
            className="
              mb-3
              block
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Image Fit
          </label>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Contain",
                value: "contain",
              },

              {
                label: "Cover",
                value: "cover",
              },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() =>
                  setFitMode(
                    item.value
                  )
                }
                className={`
                  border-[3px]
                  border-black
                  py-3
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  shadow-[3px_3px_0px_0px_black]
                  transition-all

                  ${
                    fitMode ===
                    item.value
                      ? `
                        bg-[#0066ff]
                        text-white
                      `
                      : `
                        bg-[#0f0f0f]
                        text-gray-300
                        hover:bg-[#222]
                      `
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quality */}
        <div>
          <label
            className="
              mb-3
              block
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Image Quality
          </label>

          <select
            value={quality}
            onChange={(e) =>
              setQuality(
                e.target.value
              )
            }
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
            "
          >
            <option value="high">
              High Quality
            </option>

            <option value="medium">
              Medium Quality
            </option>

            <option value="low">
              Low Quality
            </option>
          </select>
        </div>

        {/* Info Card */}
        <div
          className="
            border-[2px]
            border-[#0066ff]
            bg-[#0f0f0f]
            p-4
          "
        >
          <h4
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-[#0066ff]
            "
          >
            Processing Information
          </h4>

          <ul
            className="
              mt-3
              space-y-2
              text-sm
              text-gray-400
            "
          >
            <li>
              • Images stay on your
              device
            </li>

            <li>
              • No server uploads
            </li>

            <li>
              • Generate a single PDF
            </li>

            <li>
              • Supports drag & drop
              ordering
            </li>
          </ul>
        </div>

        {/* Generate Button */}
        <GeneratePdfButton
          onGenerate={onGenerate}
          loading={loading}
          disabled={imageCount === 0}
          imageCount={imageCount}
        />
      </div>
    </div>
  );
}

export default ImagesToPdfConfig;