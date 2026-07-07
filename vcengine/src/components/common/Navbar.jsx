import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const logo = "/logo-288.webp";

const navItems = [
  { title: "Tools", id: "tools" },
  { title: "About", id: "about" },
  { title: "GitHub", path: "https://github.com/Chauhan-001", external: true },
];

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNav = (item) => {
    if (!item.external) scrollToSection(item.id);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b-[3px] border-black bg-[#0a0a0a]/95 backdrop-blur-md">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link to="/" aria-label="VCEngine home" className="inline-flex">
          <img
            src={logo}
            alt="VCEngine"
            width={288}
            height={161}
            decoding="async"
            className="h-10 w-auto border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#0066ff] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_#0066ff]"
          />
        </Link>

        <nav className="hidden items-center gap-20 md:flex" aria-label="Primary">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.title}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[14px] font-bold uppercase text-[#f0f0f0] transition-colors hover:text-[#0066ff]"
              >
                {item.title}
              </a>
            ) : (
              <button
                key={item.title}
                onClick={() => handleNav(item)}
                className="font-mono text-[14px] font-bold uppercase text-[#f0f0f0] transition-colors hover:text-[#0066ff]"
              >
                {item.title}
              </button>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection("tools")}
            className="hidden border-[3px] border-black bg-[#0066ff] px-5 py-2 font-mono text-[13px] font-bold uppercase text-white shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:block"
          >
            Launch Tools
          </button>

          <button
            className="text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          className="border-b-[3px] border-black bg-[#0a0a0a] px-6 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.title}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-bold uppercase text-[#f0f0f0] transition-colors hover:text-[#0066ff]"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </a>
              ) : (
                <button
                  key={item.title}
                  onClick={() => handleNav(item)}
                  className="text-left font-mono text-sm font-bold uppercase text-[#f0f0f0] transition-colors hover:text-[#0066ff]"
                >
                  {item.title}
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
