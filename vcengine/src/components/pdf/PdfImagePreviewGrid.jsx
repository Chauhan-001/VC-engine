import PdfImagePreview from "./PdfImagePreview";

function PdfImagePreviewGrid({
  previews,
  selectedPages,
  onTogglePage,
}) {
  if (!previews.length) {
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
            PDF Preview
          </h2>
        </div>

        {/* Empty State */}
        <div
          className="
            flex
            min-h-[700px]
            items-center
            justify-center
            p-10
          "
        >
          <div className="text-center">
            <h3
              className="
                font-mono
                text-2xl
                font-black
                uppercase
                text-white
              "
            >
              No PDF Loaded
            </h3>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                text-gray-400
              "
            >
              Upload a PDF to preview
              all pages before converting
              them into images.
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
          flex
          items-center
          justify-between
          border-b-[3px]
          border-black
          px-6
          py-4
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
            Page Preview
          </h2>

          <p
            className="
              mt-2
              text-xs
              uppercase
              text-gray-400
            "
          >
            {previews.length} Pages
            {" • "}
            {selectedPages.length} Selected
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

      {/* Grid */}
      <div
        className="
          max-h-[1200px]
          overflow-y-auto
          bg-[#0f0f0f]
          p-6
        "
      >
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {previews.map((preview) => (
            <PdfImagePreview
              key={preview.pageNumber}
              pageNumber={
                preview.pageNumber
              }
              imageUrl={preview.url}
              selected={selectedPages.includes(
                preview.pageNumber
              )}
              onToggle={onTogglePage}
            />
          ))}
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
            Total Pages:
            {" "}
            {previews.length}
          </span>

          <span>
            Browser Rendering
          </span>
        </div>
      </div>
    </div>
  );
}

export default PdfImagePreviewGrid;