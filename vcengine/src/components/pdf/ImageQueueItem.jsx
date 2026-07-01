import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  X,
  Image as ImageIcon,
} from "lucide-react";

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ImageQueueItem({
  image,
  index,
  onRemove,
  isSelected,
  onSelect,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,

    transform,
    transition,

    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),

    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect?.(image.id)}
      className={`
        border-[3px]
        border-black
        bg-[#151515]
        p-4
        shadow-[4px_4px_0px_0px_black]
        transition-all
        cursor-pointer

        ${
          isDragging
            ? `
              z-50
              rotate-1
              opacity-80
              shadow-[8px_8px_0px_0px_#0066ff]
            `
            : ""
        }

        ${
          isSelected
            ? "border-[#ff3b30] shadow-[6px_6px_0px_0px_#ff3b30]"
            : ""
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="
            cursor-grab
            text-gray-500
            transition-colors
            active:cursor-grabbing
            hover:text-white
          "
        >
          <GripVertical size={22} />
        </button>

        {/* Index */}
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            border-[2px]
            border-black
            bg-[#0066ff]
            font-mono
            text-xs
            font-bold
            text-white
          "
        >
          {index + 1}
        </div>

        {/* Thumbnail */}
        <div
          className="
            h-20
            w-20
            overflow-hidden
            border-[2px]
            border-black
            bg-black
            flex-shrink-0
          "
        >
          {image.preview ? (
            <img
              src={image.preview}
              alt={image.file.name}
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-gray-500
              "
            >
              <ImageIcon size={28} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h4
            className="
              truncate
              font-bold
              text-white
            "
          >
            {image.file.name}
          </h4>

          <div
            className="
              mt-1
              flex
              flex-wrap
              gap-2
              font-mono
              text-xs
              text-gray-400
            "
          >
            <span>
              {formatFileSize(
                image.file.size
              )}
            </span>

            {image.width &&
              image.height && (
                <>
                  <span>•</span>

                  <span>
                    {image.width} ×{" "}
                    {image.height}
                  </span>
                </>
              )}
          </div>
        </div>

        {/* Remove */}
        <button
          onClick={() =>
            onRemove(image.id)
          }
          className="
            text-gray-500
            transition-colors
            hover:text-red-400
          "
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}

export default ImageQueueItem;