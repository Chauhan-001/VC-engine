import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

function SortablePageCard({
  pageNumber,
  onPreview,
  onRemove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: pageNumber,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex
        items-center
        justify-between
        border-[3px]
        border-black
        bg-[#1a1a1a]
        px-4
        py-3
        shadow-[4px_4px_0px_0px_black]
        transition-all
        duration-150
        ${
          isDragging
            ? "rotate-2 shadow-[8px_8px_0px_0px_black]"
            : "hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_black]"
        }
      `}
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="
          cursor-grab
          text-gray-400
          transition-colors
          active:cursor-grabbing
          hover:text-[#0066ff]
        "
        aria-label={`Drag page ${pageNumber}`}
      >
        <GripVertical size={18} />
      </button>

      {/* Page Number */}
      <button
        type="button"
        onClick={() => onPreview(pageNumber)}
        className="
          flex-1
          px-4
          text-center
          font-mono
          text-sm
          font-bold
          uppercase
          text-white
          transition-colors
          hover:text-[#0066ff]
        "
      >
        Page {pageNumber}
      </button>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(pageNumber)}
        className="
          text-gray-400
          transition-colors
          hover:text-red-400
        "
        aria-label={`Remove page ${pageNumber}`}
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default SortablePageCard;