import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortablePageCard from "./SortablePageCard";

function ReorderPageGrid({
  pages,
  setPages,
  onPreview,
  onRemove,
}) {
  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = pages.indexOf(active.id);
    const newIndex = pages.indexOf(over.id);

    setPages((prevPages) =>
      arrayMove(prevPages, oldIndex, newIndex)
    );
  }

  return (
    <div
      className="
        mt-10
        border-[3px]
        border-black
        bg-[#1a1a1a]
        p-6
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h3
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            text-white
          "
        >
          Page Order
        </h3>

        <p
          className="
            mt-2
            font-mono
            text-xs
            uppercase
            text-gray-400
          "
        >
          Drag cards to reorder • Click page to preview
        </p>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={pages}
          strategy={rectSortingStrategy}
        >
          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {pages.map((pageNumber) => (
              <SortablePageCard
                key={pageNumber}
                pageNumber={pageNumber}
                onPreview={onPreview}
                onRemove={onRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default ReorderPageGrid;