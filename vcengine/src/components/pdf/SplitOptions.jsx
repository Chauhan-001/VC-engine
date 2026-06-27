function SplitOptions({
  mode,
  onChangeMode,
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
}) {
  return (
    <div className="space-y-6">
      {/* Option 1 */}
      <div
        className="
          border-[3px]
          border-black
          bg-[#1a1a1a]
          p-6
          shadow-[6px_6px_0px_0px_black]
        "
      >
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="radio"
            checked={mode === "custom"}
            onChange={() => onChangeMode("custom")}
            className="mt-1 accent-[#0066ff]"
          />

          <div className="flex-1">
            <h3 className="font-mono text-sm font-bold uppercase text-white">
              Custom Range
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-gray-400">
              From → To (inclusive)
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-gray-400">
                  From
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="
                    mt-2
                    w-full
                    rounded-none
                    border-[3px]
                    border-black
                    bg-[#0f0f0f]
                    px-3
                    py-2
                    font-mono
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    shadow-[3px_3px_0px_0px_black]
                    transition-all
                    hover:border-[#0066ff]
                    focus:border-[#0066ff]
                  "
                  value={fromValue}
                  onChange={(e) => onChangeFrom(e.target.value)}
                />
              </div>

              <div>
                <label className="font-mono text-[11px] font-bold uppercase text-gray-400">
                  To
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  className="
                    mt-2
                    w-full
                    rounded-none
                    border-[3px]
                    border-black
                    bg-[#0f0f0f]
                    px-3
                    py-2
                    font-mono
                    text-sm
                    font-bold
                    text-white
                    outline-none
                    shadow-[3px_3px_0px_0px_black]
                    transition-all
                    hover:border-[#0066ff]
                    focus:border-[#0066ff]
                  "
                  value={toValue}
                  onChange={(e) => onChangeTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </label>
      </div>

      {/* Option 2 */}
      <div
        className="
          border-[3px]
          border-black
          bg-[#1a1a1a]
          p-6
          shadow-[6px_6px_0px_0px_black]
        "
      >
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="radio"
            checked={mode === "all"}
            onChange={() => onChangeMode("all")}
            className="mt-1 accent-[#0066ff]"
          />

          <div className="flex-1">
            <h3 className="font-mono text-sm font-bold uppercase text-white">
              Extract All Pages
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-gray-400">
              Creates one PDF per page.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default SplitOptions;

