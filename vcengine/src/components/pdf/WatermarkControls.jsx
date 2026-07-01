import WatermarkButton from "./WatermarkButton";
import WatermarkModeTabs from "./WatermarkModeTabs";
import ImageWatermarkEditor from "./ImageWatermarkEditor";

const TEXT_PRESETS = [
  "CONFIDENTIAL",
  "DRAFT",
  "SAMPLE",
  "PRIVATE",
];

function WatermarkControls({
  mode,
  setMode,

  // Text
  watermarkText,
  setWatermarkText,

  fontSize,
  setFontSize,

  textColor,
  setTextColor,

  // Common
  opacity,
  setOpacity,

  rotation,
  setRotation,

  // Image
  watermarkImage,
  setWatermarkImage,

  imageScale,
  setImageScale,

  // NEW
  watermarkPosition,
  setWatermarkPosition,

  // Actions
  loading,
  onAddWatermark,
}) {
  function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setWatermarkImage(file);
  }

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
        Watermark Settings
      </h3>

      {/* Mode Tabs */}
      <WatermarkModeTabs
        mode={mode}
        setMode={setMode}
      />

      {/* TEXT MODE */}
      {mode === "text" && (
        <div className="space-y-6">
          {/* Presets */}
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
              Quick Presets
            </label>

            <div className="grid grid-cols-2 gap-2">
              {TEXT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setWatermarkText(preset)
                  }
                  className="
                    border-[2px]
                    border-black
                    bg-[#111111]
                    px-3
                    py-2
                    font-mono
                    text-[11px]
                    font-bold
                    uppercase
                    text-gray-300
                    shadow-[2px_2px_0px_0px_black]
                    transition-all
                    hover:bg-[#0066ff]
                    hover:text-white
                  "
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <label
              className="
                mb-2
                block
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              Watermark Text
            </label>

            <input
              type="text"
              value={watermarkText}
              onChange={(e) =>
                setWatermarkText(
                  e.target.value
                )
              }
              placeholder="CONFIDENTIAL"
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
                focus:border-[#0066ff]
              "
            />
          </div>

          {/* Font Size */}
          <div>
            <label
              className="
                mb-2
                block
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              Font Size ({fontSize}px)
            </label>

            <input
              type="range"
              min="20"
              max="120"
              value={fontSize}
              onChange={(e) =>
                setFontSize(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />
          </div>

          {/* Text Color */}
          <div>
            <label
              className="
                mb-2
                block
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              Text Color
            </label>

            <select
              value={textColor}
              onChange={(e) =>
                setTextColor(
                  e.target.value
                )
              }
              className="
                w-full
                border-[3px]
                border-black
                bg-[#111111]
                px-4
                py-3
                font-mono
                text-white
                outline-none
              "
            >
              <option value="gray">
                Gray
              </option>

              <option value="black">
                Black
              </option>

              <option value="red">
                Red
              </option>

              <option value="blue">
                Blue
              </option>
            </select>
          </div>
        </div>
      )}

      {/* IMAGE MODE */}
      {mode === "image" && (
        <div className="space-y-6">
          {/* Upload */}
          <div>
            <label
              className="
                mb-2
                block
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              Watermark Image
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageUpload}
              className="
                w-full
                border-[3px]
                border-black
                bg-[#111111]
                px-3
                py-3
                text-sm
                text-white
              "
            />

            {watermarkImage && (
              <p
                className="
                  mt-2
                  font-mono
                  text-xs
                  text-green-400
                "
              >
                {watermarkImage.name}
              </p>
            )}
          </div>

          {/* Scale */}
          <div>
            <label
              className="
                mb-2
                block
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              Image Size ({imageScale}%)
            </label>

            <input
              type="range"
              min="10"
              max="100"
              value={imageScale}
              onChange={(e) =>
                setImageScale(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />
          </div>

          {/* Image Editor */}
          <ImageWatermarkEditor
            watermarkPosition={
              watermarkPosition
            }
            setWatermarkPosition={
              setWatermarkPosition
            }
            imageScale={imageScale}
            setImageScale={setImageScale}
            rotation={rotation}
            setRotation={setRotation}
            opacity={opacity}
            setOpacity={setOpacity}
          />
        </div>
      )}

      {/* COMMON CONTROLS */}
      <div className="mt-8 space-y-6">
        {/* Rotation */}
        <div>
          <label
            className="
              mb-2
              block
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Rotation ({rotation}°)
          </label>

          <input
            type="range"
            min="-180"
            max="180"
            value={rotation}
            onChange={(e) =>
              setRotation(
                Number(e.target.value)
              )
            }
            className="w-full"
          />
        </div>

        {/* Opacity */}
        <div>
          <label
            className="
              mb-2
              block
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Opacity ({opacity}%)
          </label>

          <input
            type="range"
            min="10"
            max="100"
            value={opacity}
            onChange={(e) =>
              setOpacity(
                Number(e.target.value)
              )
            }
            className="w-full"
          />
        </div>
      </div>

      {/* Button */}
      <div className="mt-8">
        <WatermarkButton
          onAdd={onAddWatermark}
          loading={loading}
          disabled={
            mode === "text"
              ? !watermarkText.trim()
              : !watermarkImage
          }
        />
      </div>
    </div>
  );
}

export default WatermarkControls;