import ConvertImagesButton from "./ConvertImagesButton";

function PdfToImagesConfig({
  imageFormat,
  setImageFormat,

  dpi,
  setDpi,

  colorMode,
  setColorMode,

  downloadAsZip,
  setDownloadAsZip,

  loading,
  pageCount,

  onConvert,
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
          Export Settings
        </h2>
      </div>

      <div className="space-y-8 p-6">

        {/* Image Format */}
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
            Image Format
          </label>

          <div className="grid grid-cols-3 gap-3">
            {["png", "jpeg", "webp"].map(
              (format) => (
                <button
                  key={format}
                  onClick={() =>
                    setImageFormat(format)
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
                      imageFormat === format
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
                  {format}
                </button>
              )
            )}
          </div>
        </div>

        {/* DPI */}
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
            DPI
          </label>

          <div className="grid grid-cols-2 gap-3">
            {[72, 150, 200, 300].map(
              (value) => (
                <button
                  key={value}
                  onClick={() =>
                    setDpi(value)
                  }
                  className={`
                    border-[3px]
                    border-black
                    py-3
                    font-mono
                    text-xs
                    font-bold
                    shadow-[3px_3px_0px_0px_black]
                    transition-all

                    ${
                      dpi === value
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
                  {value} DPI
                </button>
              )
            )}
          </div>
        </div>

        {/* Color Mode */}
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
            Color Mode
          </label>

          <select
            value={colorMode}
            onChange={(e) =>
              setColorMode(
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
            <option value="color">
              Full Color
            </option>

            <option value="grayscale">
              Grayscale
            </option>

            <option value="bw">
              Black & White
            </option>
          </select>
        </div>

        {/* ZIP Option */}
        <div>
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
            "
          >
            <input
              type="checkbox"
              checked={downloadAsZip}
              onChange={(e) =>
                setDownloadAsZip(
                  e.target.checked
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
              Download as ZIP
            </span>
          </label>

          <p
            className="
              mt-2
              text-xs
              text-gray-400
            "
          >
            Recommended for PDFs
            with multiple pages.
          </p>
        </div>

        {/* Privacy Card */}
        <div
          className="
            border-[2px]
            border-[#0066ff]
            bg-[#0f172a]
            p-4
          "
        >
          <h3
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-[#60a5fa]
            "
          >
            Privacy First
          </h3>

          <ul
            className="
              mt-3
              space-y-2
              text-sm
              text-gray-300
            "
          >
            <li>
              • No files leave your
              device
            </li>

            <li>
              • Everything runs in your
              browser
            </li>

            <li>
              • Fast local processing
            </li>

            <li>
              • No upload limits
            </li>
          </ul>
        </div>

        {/* Convert Button */}
        <ConvertImagesButton
          onConvert={onConvert}
          loading={loading}
          disabled={pageCount === 0}
          pageCount={pageCount}
        />

      </div>
    </div>
  );
}

export default PdfToImagesConfig;