export default function ImagePreview({ previewUrl, convertedUrl, outputLabel, convertedName }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[20px] border border-white/10 bg-[#0b0b0b] p-4">
        <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          Original
        </div>
        {previewUrl ? (
          <img src={previewUrl} alt="Original preview" className="h-72 w-full rounded-[12px] object-contain" />
        ) : (
          <div className="flex h-72 items-center justify-center rounded-[12px] border border-dashed border-white/10 text-sm text-gray-500">
            Upload an image to preview it here.
          </div>
        )}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[#0b0b0b] p-4">
        <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
          Converted
        </div>
        {convertedUrl ? (
          <>
            <img src={convertedUrl} alt="Converted preview" className="h-72 w-full rounded-[12px] object-contain" />
            <div className="mt-3 text-sm text-gray-400">{convertedName || outputLabel}</div>
          </>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-[12px] border border-dashed border-white/10 text-sm text-gray-500">
            Convert the image to preview the result.
          </div>
        )}
      </div>
    </div>
  );
}
