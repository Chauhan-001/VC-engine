function WatermarkModeTabs({
  mode,
  setMode,
}) {
  return (
    <div className="mb-8">
      <p
        className="
          mb-3
          font-mono
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-gray-400
        "
      >
        Watermark Type
      </p>

      <div
        className="
          grid
          grid-cols-2
          gap-3
        "
      >
        {/* TEXT TAB */}
        <button
          type="button"
          onClick={() => setMode("text")}
          className={`
            border-[3px]
            border-black
            px-4
            py-3
            font-mono
            text-xs
            font-bold
            uppercase
            shadow-[4px_4px_0px_0px_black]
            transition-all
            duration-200

            ${
              mode === "text"
                ? `
                  bg-[#0066ff]
                  text-white
                  -translate-x-[2px]
                  -translate-y-[2px]
                  shadow-[6px_6px_0px_0px_black]
                `
                : `
                  bg-[#111111]
                  text-gray-400
                  hover:text-white
                  hover:-translate-x-[2px]
                  hover:-translate-y-[2px]
                  hover:shadow-[6px_6px_0px_0px_black]
                `
            }
          `}
        >
          TEXT
        </button>

        {/* IMAGE TAB */}
        <button
          type="button"
          onClick={() => setMode("image")}
          className={`
            border-[3px]
            border-black
            px-4
            py-3
            font-mono
            text-xs
            font-bold
            uppercase
            shadow-[4px_4px_0px_0px_black]
            transition-all
            duration-200

            ${
              mode === "image"
                ? `
                  bg-[#0066ff]
                  text-white
                  -translate-x-[2px]
                  -translate-y-[2px]
                  shadow-[6px_6px_0px_0px_black]
                `
                : `
                  bg-[#111111]
                  text-gray-400
                  hover:text-white
                  hover:-translate-x-[2px]
                  hover:-translate-y-[2px]
                  hover:shadow-[6px_6px_0px_0px_black]
                `
            }
          `}
        >
          IMAGE
        </button>
      </div>
    </div>
  );
}

export default WatermarkModeTabs;