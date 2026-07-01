import ImageCard from "./ImageCard";

export default function ImageList({ images, selectedImages, onToggleSelect, onRemove }) {
  return (
    <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 shadow-[8px_8px_0px_0px_#111111]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0066ff]">
            Image List
          </div>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight">Ready to Compress</h2>
        </div>
        <div className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          {images?.length || 0} files
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {(images || []).length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-white/10 bg-[#0b0b0b] px-4 py-8 text-center text-sm text-gray-500">
            Add images to start the batch.
          </div>
        ) : (
          (images || []).map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              checked={selectedImages?.includes(image.id)}
              onToggle={() => onToggleSelect?.(image.id)}
              onRemove={() => onRemove?.(image.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
