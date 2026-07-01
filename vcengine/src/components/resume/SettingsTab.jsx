import { Palette, Type, Layout, Minus, FileText } from "lucide-react";

const ACCENT_COLORS = [
  { id: "blue",   hex: "#0066ff", label: "Blue"   },
  { id: "green",  hex: "#22c55e", label: "Green"  },
  { id: "purple", hex: "#a855f7", label: "Purple" },
  { id: "red",    hex: "#ff3b30", label: "Red"    },
  { id: "amber",  hex: "#f59e0b", label: "Amber"  },
  { id: "cyan",   hex: "#06b6d4", label: "Cyan"   },
];

const FONTS = ["Inter", "Poppins", "Roboto", "Source Sans 3", "Merriweather"];

const HEADER_STYLES = ["Modern", "Corporate", "Minimal", "Bold"];

const DIVIDERS = ["Line", "Block", "Classic", "Minimal"];

const PAGE_SIZES = ["A4", "Letter", "Legal"];

function SettingGroup({ icon: Icon, title, children }) {
  return (
    <div className="border-b-[3px] border-black">
      <div className="flex items-center gap-3 border-b-[2px] border-[#1a1a1a] px-4 py-3">
        <Icon size={14} className="text-[#0066ff]" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function OptionButton({ label, active, onClick, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        border-[2px]
        border-black
        px-3
        py-2
        font-mono
        text-[10px]
        font-bold
        uppercase
        shadow-[2px_2px_0px_0px_black]
        transition-all
        hover:-translate-y-[1px]
        hover:shadow-[3px_3px_0px_0px_black]
        ${active ? "text-white" : "bg-[#111] text-gray-400 hover:text-white"}
      `}
      style={active ? { background: style?.bg || "#0066ff", ...style } : {}}
    >
      {label}
    </button>
  );
}

export function SettingsTab({ themeColor, setThemeColor, fontFamily, setFontFamily, headerStyle, setHeaderStyle, dividerStyle, setDividerStyle, pageSize, setPageSize, onePageMode, setOnePageMode }) {

  return (
    <div className="flex flex-col pb-8">
      {/* Accent Color */}
      <SettingGroup icon={Palette} title="Accent Color">
        <div className="grid grid-cols-3 gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setThemeColor(c.hex)}
              className={`
                flex items-center gap-2
                border-[2px]
                px-3
                py-2.5
                font-mono
                text-[10px]
                font-bold
                uppercase
                shadow-[2px_2px_0px_0px_black]
                transition-all
                hover:-translate-y-[1px]
                ${themeColor === c.hex ? "border-white text-white" : "border-[#222] bg-[#111] text-gray-400"}
              `}
            >
              <span className="h-3 w-3 shrink-0 border border-black/50" style={{ background: c.hex }} />
              {c.label}
            </button>
          ))}
        </div>
      </SettingGroup>

      {/* Font */}
      <SettingGroup icon={Type} title="Font Family">
        <div className="space-y-2">
          {FONTS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFontFamily(f)}
              className={`
                w-full
                border-[2px]
                border-black
                px-4
                py-2.5
                text-left
                shadow-[2px_2px_0px_0px_black]
                transition-all
                hover:-translate-y-[1px]
                ${fontFamily === f ? "bg-[#0066ff] text-white" : "bg-[#111] text-gray-400 hover:text-white"}
              `}
              style={{ fontFamily: f }}
            >
              <span className="font-bold text-sm">{f}</span>
              <span className="ml-2 font-mono text-[9px] uppercase opacity-60">Aa Bb Cc</span>
            </button>
          ))}
        </div>
      </SettingGroup>

      {/* Header Style */}
      <SettingGroup icon={Layout} title="Header Style">
        <div className="grid grid-cols-2 gap-2">
          {HEADER_STYLES.map((h) => (
            <OptionButton key={h} label={h} active={headerStyle === h} onClick={() => setHeaderStyle(h)} style={{ bg: "#0066ff" }} />
          ))}
        </div>
      </SettingGroup>

      {/* Section Dividers */}
      <SettingGroup icon={Minus} title="Section Dividers">
        <div className="grid grid-cols-2 gap-2">
          {DIVIDERS.map((d) => (
            <OptionButton key={d} label={d} active={dividerStyle === d} onClick={() => setDividerStyle(d)} style={{ bg: "#0066ff" }} />
          ))}
        </div>
      </SettingGroup>

      {/* Page Size */}
      <SettingGroup icon={FileText} title="Page Size">
        <div className="flex gap-2">
          {PAGE_SIZES.map((p) => (
            <OptionButton key={p} label={p} active={pageSize === p} onClick={() => setPageSize(p)} style={{ bg: "#0066ff" }} />
          ))}
        </div>
      </SettingGroup>

      {/* One Page Mode */}
      <div className="p-4">
        <div className="flex items-center justify-between border-[2px] border-black bg-[#111] px-4 py-3 shadow-[3px_3px_0px_0px_black]">
          <div>
            <p className="font-mono text-xs font-bold uppercase text-white">One Page Mode</p>
            <p className="mt-0.5 font-mono text-[10px] text-gray-500">Compress resume to fit one page</p>
          </div>
          <button
            type="button"
            onClick={() => setOnePageMode(!onePageMode)}
            className={`
              relative
              h-6
              w-12
              border-[2px]
              border-black
              transition-colors
              ${onePageMode ? "bg-[#0066ff]" : "bg-[#222]"}
            `}
          >
            <span
              className={`
                absolute
                top-0.5
                h-4
                w-4
                border-[2px]
                border-black
                bg-white
                transition-all
                ${onePageMode ? "left-[22px]" : "left-[2px]"}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
