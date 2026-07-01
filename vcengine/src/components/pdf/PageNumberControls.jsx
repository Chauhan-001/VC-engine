import PageNumberButton from "./PageNumberButton";

function PageNumberControls({
  position,
  setPosition,

  startNumber,
  setStartNumber,

  fontSize,
  setFontSize,

  color,
  setColor,

  loading,
  onAdd,
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
        Page Number Settings
      </h3>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block font-mono text-xs uppercase text-gray-400">
            Position
          </label>

          <select
            value={position}
            onChange={(e) =>
              setPosition(e.target.value)
            }
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111]
              px-4
              py-3
              text-white
              outline-none
            "
          >
            <option>top-left</option>
            <option>top-center</option>
            <option>top-right</option>
            <option>bottom-left</option>
            <option>bottom-center</option>
            <option>bottom-right</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase text-gray-400">
            Start Number
          </label>

          <input
            type="number"
            min={1}
            value={startNumber}
            onChange={(e) =>
              setStartNumber(
                Number(e.target.value)
              )
            }
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111]
              px-4
              py-3
              text-white
              outline-none
            "
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase text-gray-400">
            Font Size
          </label>

          <input
            type="number"
            min={8}
            max={40}
            value={fontSize}
            onChange={(e) =>
              setFontSize(
                Number(e.target.value)
              )
            }
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111]
              px-4
              py-3
              text-white
              outline-none
            "
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-xs uppercase text-gray-400">
            Color
          </label>

          <select
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111]
              px-4
              py-3
              text-white
              outline-none
            "
          >
            <option>black</option>
            <option>blue</option>
            <option>red</option>
            <option>gray</option>
          </select>
        </div>

      </div>

      <div className="mt-8">
        <PageNumberButton
          onAdd={onAdd}
          loading={loading}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default PageNumberControls;