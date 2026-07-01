import PdfPreviewPage from "./PdfPreviewPage";

function PdfPagesPreview({
  images,

  pageSize,
  orientation,

  margin,
  fitMode,
}) {
  if (!images.length) {
    return (
      <div
        className="
          border-[3px]
          border-black
          bg-[#161616]
          p-10
          shadow-[6px_6px_0px_0px_black]
        "
      >
        <div
          className="
            flex
            min-h-[600px]
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <h3
              className="
                font-mono
                text-xl
                font-black
                uppercase
                text-white
              "
            >
              PDF Preview
            </h3>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                text-gray-400
              "
            >
              Upload images to see how
              your final PDF will look.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
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
              PDF Preview
            </h2>

            <p
              className="
                mt-2
                text-xs
                uppercase
                text-gray-400
              "
            >
              {images.length}
              {" "}
              page
              {images.length > 1
                ? "s"
                : ""}
              {" • "}
              {pageSize}
              {" • "}
              {orientation}
            </p>
          </div>

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
            Live Preview
          </div>
        </div>
      </div>

      {/* Pages */}
      <div
        className="
          max-h-[1200px]
          overflow-y-auto
          bg-[#0f0f0f]
          p-8
        "
      >
        <div className="space-y-12">
          {images.map(
            (image, index) => (
              <PdfPreviewPage
                key={image.id}
                image={image}
                index={index}
                pageSize={pageSize}
                orientation={
                  orientation
                }
                margin={margin}
                fitMode={fitMode}
              />
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          border-t-[3px]
          border-black
          px-6
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            font-mono
            text-xs
            uppercase
            text-gray-400
          "
        >
          <span>
            Generated PDF:
            {" "}
            {images.length}
            {" "}
            pages
          </span>

          <span>
            Browser Processing
          </span>
        </div>
      </div>
    </div>
  );
}

export default PdfPagesPreview;