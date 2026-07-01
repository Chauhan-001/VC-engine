import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Trash2,
  ShieldCheck,
} from "lucide-react";

import ImageQueueItem from "./ImageQueueItem";

function ImagesQueue({
  images,
  onRemove,
  onClearAll,
  onDragEnd,
  selectedImageId,
  onSelect,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (!images.length) {
    return null;
  }

  const totalSize = images.reduce(
    (sum, item) =>
      sum + item.file.size,
    0
  );

  const totalSizeMB = (
    totalSize /
    (1024 * 1024)
  ).toFixed(1);

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
          px-5
          py-4
        "
      >
        <h3
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            tracking-[0.2em]
            text-white
          "
        >
          Queue ({images.length} Files)
        </h3>

        <button
          onClick={onClearAll}
          className="
            flex
            items-center
            gap-2
            font-mono
            text-xs
            font-bold
            uppercase
            text-gray-400
            transition-colors
            hover:text-red-400
          "
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      {/* Queue */}
      <div className="p-5">
        <DndContext
          sensors={sensors}
          collisionDetection={
            closestCenter
          }
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={images.map(
              (item) => item.id
            )}
            strategy={
              verticalListSortingStrategy
            }
          >
            <div className="space-y-4">
{images.map(
                (image, index) => (
                  <ImageQueueItem
                    key={image.id}
                    image={image}
                    index={index}
                    onRemove={onRemove}
                    isSelected={selectedImageId === image.id}
                    onSelect={onSelect}
                  />
                )
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Footer Stats */}
      <div
        className="
          border-t-[3px]
          border-black
          px-5
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
            Total: {images.length} files
          </span>

          <span>
            {totalSizeMB} MB
          </span>
        </div>

        {/* Privacy Card */}
        <div
          className="
            mt-5
            border-[2px]
            border-[#0066ff]
            bg-[#0f0f0f]
            p-4
          "
        >
          <div className="flex gap-3">
            <ShieldCheck
              size={22}
              className="
                mt-1
                text-[#0066ff]
              "
            />

            <div>
              <h4
                className="
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#0066ff]
                "
              >
                Privacy Guarantee
              </h4>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-gray-400
                "
              >
                All files are processed
                locally in your browser.
                Your images never leave
                your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesQueue;