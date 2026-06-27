import { Link } from "react-router-dom";

function ToolCard({
  title,
  badge,
  icon,
  color,
  tools,
  featured = false,
}) {
  return (
    <div
      className={`
        group
        bg-[#1a1a1a]
        border-[3px]
        border-black
        p-6
        shadow-[6px_6px_0px_0px_black]
        transition-all
        duration-150
        hover:-translate-x-[2px]
        hover:-translate-y-[2px]
        hover:shadow-[10px_10px_0px_0px_black]
        ${featured ? "min-h-[380px]" : "min-h-[260px]"}
      `}
    >
      {/* ICON */}
      <div
        className="
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          border-[3px]
          border-black
          bg-white
          transition-all
          duration-200
          group-hover:text-white
        "
        style={{
          boxShadow: `4px 4px 0px ${color}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
        }}
      >
        <img
          src={icon}
          alt={title}
          className="h-7 w-7 object-contain"
        />
      </div>

      {/* TITLE */}
      <h3 className="mb-2 text-[32px] font-black uppercase text-white">
        {title}
      </h3>

      {/* BADGE */}
      {badge && (
        <div
          className="
            mb-6
            inline-block
            border-2
            border-black
            px-2
            py-1
            font-mono
            text-[11px]
            font-bold
            uppercase
            text-white
          "
          style={{
            backgroundColor: color,
          }}
        >
          {badge}
        </div>
      )}

      {/* TOOLS */}
      <div
        className={`
          gap-2
          ${featured ? "grid grid-cols-2" : "flex flex-col"}
        `}
      >
        {tools.map((tool, index) => {
          const isObject = typeof tool === "object";

          const toolClasses = `
            block
            border
            border-[#2a2a2a]
            bg-[#161616]
            px-3
            py-2
            font-mono
            text-[12px]
            font-bold
            uppercase
            text-gray-200
            transition-all
            duration-150
            hover:-translate-y-[1px]
            hover:border-gray-500
          `;

          if (isObject) {
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className={toolClasses}
              >
                {tool.name}
              </Link>
            );
          }

          return (
            <div
              key={index}
              className={toolClasses}
            >
              {tool}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ToolCard;