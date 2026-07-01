import { FileText, Layers, Cpu, Mail, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "builder",   label: "Resume Builder", icon: FileText },
  { id: "templates", label: "Templates",       icon: Layers   },
  { id: "ats",       label: "ATS Checker",     icon: Cpu      },
  { id: "cover",     label: "Cover Letter",    icon: Mail     },
  { id: "settings",  label: "Settings",        icon: Settings },
];

export default function WorkspaceNav({ activeTab, onTabChange }) {
  return (
    <nav
      className="
        flex
        flex-col
        h-full
        w-[60px]
        shrink-0
        border-r-[3px]
        border-black
        bg-[#0f0f0f]
        overflow-hidden
        select-none
        xl:w-[240px]
      "
    >
      {/* Brand */}
      <div className="border-b-[3px] border-black px-3 py-5 xl:px-6">
        <div className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#0066ff] hidden xl:block">
          RESUME STUDIO
        </div>
        <div className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#0066ff] xl:hidden text-center">
          RS
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-1 flex-1 pt-3 px-1 xl:px-3">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              title={label}
              className={`
                group
                flex
                items-center
                gap-3
                rounded-none
                border-[2px]
                px-3
                py-3
                text-left
                transition-all
                duration-150
                xl:px-4
                ${
                  active
                    ? "border-black bg-[#0066ff] shadow-[3px_3px_0px_0px_black] text-white"
                    : "border-transparent bg-transparent text-gray-400 hover:border-black hover:bg-[#161616] hover:text-white hover:shadow-[2px_2px_0px_0px_black]"
                }
              `}
            >
              <Icon
                size={18}
                className={`shrink-0 ${active ? "text-white" : "text-gray-500 group-hover:text-white"}`}
              />
              <span className="hidden xl:block font-mono text-xs font-bold uppercase tracking-wide truncate">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t-[3px] border-black px-3 py-4 xl:px-6">
        <div className="hidden xl:block font-mono text-[9px] uppercase tracking-wider text-gray-600">
          VCEngine v1.0
        </div>
      </div>
    </nav>
  );
}
