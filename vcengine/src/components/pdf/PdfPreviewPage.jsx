function PdfPreviewPage({
  image,
  index,

  pageSize,
  orientation,
  margin,
  fitMode,
}) {
  const PAGE_SIZES = {
    A4: {
      width: 595,
      height: 842,
    },

    Letter: {
      width: 612,
      height: 792,
    },

    Legal: {
      width: 612,
      height: 1008,
    },
  };

  let {
    width,
    height,
  } =
    PAGE_SIZES[pageSize] ||
    PAGE_SIZES.A4;

  if (orientation === "landscape") {
    [width, height] = [
      height,
      width,
    ];
  }

  const previewScale = 0.35;

  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-4
      "
    >
      {/* Page Label */}
      <div
        className="
          border-[2px]
          border-black
          bg-[#0066ff]
          px-4
          py-2
          font-mono
          text-xs
          font-bold
          uppercase
          text-white
          shadow-[3px_3px_0px_0px_black]
        "
      >
        Page {index + 1}
      </div>

      {/* PDF Page */}
      <div
        className="
          relative
          overflow-hidden
          border-[4px]
          border-black
          bg-white
          shadow-[10px_10px_0px_0px_black]
        "
        style={{
          width:
            width *
            previewScale,

          height:
            height *
            previewScale,
        }}
      >
        {/* Margin Guide */}
        <div
          className="
            absolute
            border-2
            border-dashed
            border-gray-300
            pointer-events-none
          "
          style={{
            top:
              margin *
              previewScale,

            left:
              margin *
              previewScale,

            right:
              margin *
              previewScale,

            bottom:
              margin *
              previewScale,
          }}
        />

        {/* Image */}
        <img
          src={image.preview}
          alt={image.file.name}
          className={`
            absolute
            inset-0
            h-full
            w-full
            p-[${margin}px]

            ${
              fitMode ===
              "contain"
                ? "object-contain"
                : "object-cover"
            }
          `}
          style={{
            padding:
              margin *
              previewScale,
          }}
        />
      </div>

      {/* Footer */}
      <div
        className="
          text-center
          font-mono
          text-xs
          uppercase
          text-gray-500
        "
      >
        {pageSize}
        {" • "}
        {orientation}
      </div>
    </div>
  );
}

export default PdfPreviewPage;