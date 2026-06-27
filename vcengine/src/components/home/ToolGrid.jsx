import ToolCard from "../tools/ToolCard";
import { toolCategories } from "../../data/toolCategories";

function ToolGrid() {
  return (
    <section id="tools" className="mx-auto max-w-[1280px] px-6 py-24">

      {/* SECTION TITLE */}
      <div className="mb-14 border-l-[6px] border-[#0066ff] pl-6">

        <h2 className="text-5xl font-black uppercase text-white">
          Powerful Toolsets
        </h2>

        <p className="mt-2 font-mono text-sm uppercase text-gray-400">
          Everything you need for productivity,
          right in your browser.
        </p>

      </div>

      {/* BENTO GRID */}
      <div className="grid gap-6 md:grid-cols-12">

        {/* PDF */}
        <div className="md:col-span-6">
          <ToolCard {...toolCategories[0]} />
        </div>

        {/* AUDIO */}
        <div className="md:col-span-6">
          <ToolCard {...toolCategories[1]} />
        </div>

        {/* IMAGE */}
        <div className="md:col-span-4">
          <ToolCard {...toolCategories[2]} />
        </div>

        {/* VIDEO */}
        <div className="md:col-span-4">
          <ToolCard {...toolCategories[3]} />
        </div>

        {/* RESUME */}
        <div className="md:col-span-4">
          <ToolCard {...toolCategories[4]} />
        </div>

      </div>
    </section>
  );
}

export default ToolGrid;