import { useMemo } from "react";

function SectionRow({ section, onRename, onDuplicate, onDelete, onToggleCollapse, onReorder }) {
  return (
    <div className="border-[2px] border-black bg-[#111] p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCollapse(section.id)}
              className="border-[2px] border-black bg-[#0f0f0f] px-2 py-1 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black]"
              aria-label="Collapse"
            >
              {section.collapsed ? "+" : "-"}
            </button>

            <input
              value={section.title}
              onChange={(e) => onRename(section.id, e.target.value)}
              className="flex-1 bg-transparent text-white font-mono text-xs uppercase font-bold outline-none"
            />
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase text-gray-400">
            {section.type === "fixed" ? "Fixed" : section.type === "custom" ? "Custom" : "Standard"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onReorder(section.id, "up")}
            className="border-[2px] border-black bg-[#0f0f0f] px-2 py-1 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
          >
            ↑
          </button>
          <button
            onClick={() => onReorder(section.id, "down")}
            className="border-[2px] border-black bg-[#0f0f0f] px-2 py-1 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
          >
            ↓
          </button>
        </div>
      </div>

      {!section.collapsed && (
        <div className="mt-3 space-y-3">
          <div>
            <p className="font-mono text-[11px] uppercase text-gray-400">Basic payload editing (placeholder)</p>
            {section.title === "Summary" && (
              <textarea
                value={section.payload?.text || ""}
                onChange={(e) =>
                  onRename(section.id, section.title) /* no-op for placeholder */
                }
                className="mt-2 w-full min-h-[64px] resize-none border-[2px] border-black bg-[#0f0f0f] px-3 py-2 font-mono text-xs text-white outline-none"
                placeholder="Write a concise summary"
              />
            )}
            {section.type === "custom" && (
              <textarea
                value={section.payload?.text || ""}
                onChange={() => {}}
                className="mt-2 w-full min-h-[64px] resize-none border-[2px] border-black bg-[#0f0f0f] px-3 py-2 font-mono text-xs text-white outline-none opacity-70"
                placeholder="Custom content (render-ready scaffold)"
                disabled
              />
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onDuplicate(section.id)}
              className="border-[2px] border-black bg-[#0066ff] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
            >
              Duplicate
            </button>
            <button
              onClick={() => onDelete(section.id)}
              className="border-[2px] border-black bg-[#ff3b30] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumeSectionEditor({
  sections,
  onUpdate,
  onDelete,
  onRename,
  onDuplicate,
  onToggleCollapse,
  onReorder,
}) {
  const stable = useMemo(() => sections || [], [sections]);

  return (
    <div className="space-y-4">
      {stable.map((section) => (
        <SectionRow
          key={section.id}
          section={section}
          onRename={onRename}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          onToggleCollapse={onToggleCollapse}
          onReorder={onReorder}
        />
      ))}
    </div>
  );
}

