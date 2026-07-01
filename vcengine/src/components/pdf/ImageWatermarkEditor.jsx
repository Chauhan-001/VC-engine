function ImageWatermarkEditor({
  watermarkPosition,
  setWatermarkPosition,

  imageScale,
  setImageScale,

  rotation,
  setRotation,

  opacity,
  setOpacity,
}) {
  function move(dx, dy) {
    setWatermarkPosition((prev) => ({
      x: Math.max(
        0,
        Math.min(100, prev.x + dx)
      ),

      y: Math.max(
        0,
        Math.min(100, prev.y + dy)
      ),
    }));
  }

  function setPreset(x, y) {
    setWatermarkPosition({
      x,
      y,
    });
  }

  function resetAll() {
    setWatermarkPosition({
      x: 50,
      y: 50,
    });

    setImageScale(40);

    setRotation(0);

    setOpacity(50);
  }

  return (
    <div
      className="
        mt-6
        border-[3px]
        border-black
        bg-[#111111]
        p-5
        shadow-[4px_4px_0px_0px_black]
      "
    >
      {/* Header */}
      <h4
        className="
          mb-5
          font-mono
          text-xs
          font-bold
          uppercase
          text-white
        "
      >
        Image Position Editor
      </h4>

      {/* Quick Presets */}
      <div className="mb-6">
        <p
          className="
            mb-3
            font-mono
            text-[11px]
            font-bold
            uppercase
            text-gray-400
          "
        >
          Quick Positions
        </p>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() =>
              setPreset(20, 20)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Top Left
          </button>

          <button
            onClick={() =>
              setPreset(50, 20)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Top Center
          </button>

          <button
            onClick={() =>
              setPreset(80, 20)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Top Right
          </button>

          <button
            onClick={() =>
              setPreset(20, 50)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Left
          </button>

          <button
            onClick={() =>
              setPreset(50, 50)
            }
            className="
              border-[2px]
              border-black
              bg-[#0066ff]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
            "
          >
            Center
          </button>

          <button
            onClick={() =>
              setPreset(80, 50)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Right
          </button>

          <button
            onClick={() =>
              setPreset(20, 80)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Bottom Left
          </button>

          <button
            onClick={() =>
              setPreset(50, 80)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Bottom Center
          </button>

          <button
            onClick={() =>
              setPreset(80, 80)
            }
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-[10px]
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            Bottom Right
          </button>
        </div>
      </div>

      {/* Fine Controls */}
      <div className="mb-6">
        <p
          className="
            mb-3
            font-mono
            text-[11px]
            font-bold
            uppercase
            text-gray-400
          "
        >
          Fine Adjustments
        </p>

        <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
          <div />

          <button
            onClick={() => move(0, -2)}
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            ↑
          </button>

          <div />

          <button
            onClick={() => move(-2, 0)}
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            ←
          </button>

          <button
            onClick={() =>
              setPreset(50, 50)
            }
            className="
              border-[2px]
              border-black
              bg-[#0066ff]
              py-2
              text-[10px]
              font-bold
              text-white
              shadow-[2px_2px_0px_0px_black]
            "
          >
            C
          </button>

          <button
            onClick={() => move(2, 0)}
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            →
          </button>

          <div />

          <button
            onClick={() => move(0, 2)}
            className="
              border-[2px]
              border-black
              bg-[#1a1a1a]
              py-2
              text-white
              shadow-[2px_2px_0px_0px_black]
              hover:bg-[#0066ff]
            "
          >
            ↓
          </button>

          <div />
        </div>
      </div>

      {/* Status */}
      <div
        className="
          border-[2px]
          border-black
          bg-[#0a0a0a]
          p-3
        "
      >
        <p
          className="
            font-mono
            text-[10px]
            uppercase
            text-gray-400
          "
        >
          X: {Math.round(watermarkPosition.x)}%
        </p>

        <p
          className="
            mt-1
            font-mono
            text-[10px]
            uppercase
            text-gray-400
          "
        >
          Y: {Math.round(watermarkPosition.y)}%
        </p>

        <p
          className="
            mt-1
            font-mono
            text-[10px]
            uppercase
            text-gray-400
          "
        >
          Scale: {imageScale}%
        </p>

        <p
          className="
            mt-1
            font-mono
            text-[10px]
            uppercase
            text-gray-400
          "
        >
          Rotation: {rotation}°
        </p>

        <p
          className="
            mt-1
            font-mono
            text-[10px]
            uppercase
            text-gray-400
          "
        >
          Opacity: {opacity}%
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={resetAll}
        className="
          mt-5
          w-full
          border-[3px]
          border-black
          bg-[#ff4444]
          py-3
          font-mono
          text-xs
          font-bold
          uppercase
          text-white
          shadow-[4px_4px_0px_0px_black]
          transition-all
          hover:-translate-x-[2px]
          hover:-translate-y-[2px]
          hover:shadow-[6px_6px_0px_0px_black]
        "
      >
        Reset Watermark
      </button>
    </div>
  );
}

export default ImageWatermarkEditor;