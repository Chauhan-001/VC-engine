import {
  HardDrive,
  TrendingDown,
  Zap,
} from "lucide-react";

function formatFileSize(bytes = 0) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  }

  return `${(
    bytes /
    (1024 * 1024 * 1024)
  ).toFixed(2)} GB`;
}

function CompressionStats({
  originalSize = 0,
  compressedSize = 0,
  estimatedOutputSize = null,
  estimatedReduction = null,
}) {
  const savedBytes =
    Math.max(
      originalSize -
        compressedSize,
      0
    );

  const savedPercent =
    originalSize > 0
      ? (
          (savedBytes /
            originalSize) *
          100
        ).toFixed(1)
      : 0;

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
          Compression Stats
        </h2>
      </div>

      <div className="space-y-5 p-6">

        {/* Original */}
        <div
          className="
            flex
            items-center
            gap-4
            border-[2px]
            border-black
            bg-[#111111]
            p-4
            shadow-[3px_3px_0px_0px_black]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              border-[2px]
              border-black
              bg-[#222]
            "
          >
            <HardDrive
              size={20}
              className="
                text-gray-300
              "
            />
          </div>

          <div>
            <p
              className="
                font-mono
                text-[11px]
                font-bold
                uppercase
                text-gray-400
              "
            >
              Original Size
            </p>

            <p
              className="
                mt-1
                text-lg
                font-black
                text-white
              "
            >
              {formatFileSize(
                originalSize
              )}
            </p>
          </div>
        </div>

        {estimatedOutputSize !== null && (
          <div
            className="
              flex
              items-center
              gap-4
              border-[2px]
              border-black
              bg-[#111111]
              p-4
              shadow-[3px_3px_0px_0px_black]
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                border-[2px]
                border-black
                bg-[#0066ff]
              "
            >
              <TrendingDown
                size={20}
                className="
                  text-white
                "
              />
            </div>

            <div>
              <p
                className="
                  font-mono
                  text-[11px]
                  font-bold
                  uppercase
                  text-gray-400
                "
              >
                Estimated Output
              </p>

              <p
                className="
                  mt-1
                  text-lg
                  font-black
                  text-white
                "
              >
                {formatFileSize(estimatedOutputSize)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {estimatedReduction !== null
                  ? `${estimatedReduction.toFixed(1)}% smaller`
                  : "Ready to compress"}
              </p>
            </div>
          </div>
        )}

        {/* Compressed */}
        <div
          className="
            flex
            items-center
            gap-4
            border-[2px]
            border-black
            bg-[#111111]
            p-4
            shadow-[3px_3px_0px_0px_black]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              border-[2px]
              border-black
              bg-[#ff3b30]
            "
          >
            <Zap
              size={20}
              className="
                text-white
              "
            />
          </div>

          <div>
            <p
              className="
                font-mono
                text-[11px]
                font-bold
                uppercase
                text-gray-400
              "
            >
              Compressed Size
            </p>

            <p
              className="
                mt-1
                text-lg
                font-black
                text-white
              "
            >
              {compressedSize
                ? formatFileSize(
                    compressedSize
                  )
                : "--"}
            </p>
          </div>
        </div>

        {/* Saved */}
        <div
          className="
            flex
            items-center
            gap-4
            border-[2px]
            border-black
            bg-[#111111]
            p-4
            shadow-[3px_3px_0px_0px_black]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              border-[2px]
              border-black
              bg-[#22c55e]
            "
          >
            <TrendingDown
              size={20}
              className="
                text-white
              "
            />
          </div>

          <div>
            <p
              className="
                font-mono
                text-[11px]
                font-bold
                uppercase
                text-gray-400
              "
            >
              Space Saved
            </p>

            <p
              className="
                mt-1
                text-lg
                font-black
                text-white
              "
            >
              {compressedSize
                ? `${savedPercent}%`
                : "--"}
            </p>

            {compressedSize >
              0 && (
              <p
                className="
                  mt-1
                  text-xs
                  text-gray-400
                "
              >
                {formatFileSize(
                  savedBytes
                )}{" "}
                saved
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CompressionStats;