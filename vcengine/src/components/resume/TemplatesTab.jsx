import { useState } from "react";
import { Check } from "lucide-react";
import { TEMPLATES } from "../../utils/resume/templates";

function TemplateCard({ tpl, selected, onSelect }) {
  const isSelected = selected === tpl.id;

  return (
    <button
      type="button"
      onClick={() => onSelect(tpl.id)}
      className={`
        group
        relative
        flex
        flex-col
        overflow-hidden
        border-[3px]
        text-left
        transition-all
        duration-150
        hover:-translate-y-[2px]
        ${isSelected
          ? "border-[#0066ff] shadow-[6px_6px_0px_0px_#0066ff]"
          : "border-black bg-[#161616] shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black]"
        }
      `}
    >
      <div className="relative h-[100px] overflow-hidden bg-[#0f0f0f]">
        <div className="absolute inset-0 p-3">
          <div className="h-2 w-3/4 mb-1.5 rounded-sm bg-[#0066ff]" />
          <div className="h-1.5 w-1/2 mb-3 rounded-sm bg-[#333]" />
          <div className="space-y-1">
            {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
              <div key={i} className="h-1 rounded-sm bg-[#2a2a2a]" style={{ width: `${w * 100}%` }} />
            ))}
          </div>
        </div>
        <div className="absolute right-2 top-2 border-[2px] border-black bg-[#0a0a0a] px-2 py-0.5">
          <span className="font-mono text-[9px] font-black uppercase text-[#0066ff]">
            {tpl.sections?.length || 0} sections
          </span>
        </div>
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0066ff]/20">
            <div className="flex h-8 w-8 items-center justify-center border-[3px] border-black bg-[#0066ff] shadow-[3px_3px_0px_0px_black]">
              <Check size={16} className="text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="border-t-[2px] border-black bg-[#111] px-3 py-2.5">
        <div className="font-mono text-xs font-black uppercase text-white">{tpl.title}</div>
        <div className="mt-0.5 font-mono text-[9px] uppercase text-gray-500">{tpl.description}</div>
        <div className="mt-1 font-mono text-[9px] text-gray-600">{tpl.bestUse}</div>
      </div>
    </button>
  );
}

export function TemplatesTab({ selectedTemplate, onSelect }) {
  const categories = Object.entries(TEMPLATES);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.[0] || "");

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-2 border-b-[3px] border-black p-4">
        {categories.map(([cat]) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`
              border-[2px] border-black px-3 py-1.5 font-mono text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px]
              ${activeCategory === cat ? "bg-[#0066ff] text-white" : "bg-[#111] text-gray-400 hover:text-white"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-gray-600">
          {TEMPLATES[activeCategory] ? "1 template" : ""} · switching preserves your data
        </p>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES[activeCategory] && (
            <TemplateCard
              key={TEMPLATES[activeCategory].id}
              tpl={TEMPLATES[activeCategory]}
              selected={selectedTemplate}
              onSelect={onSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}