import { Menu } from "lucide-react";
import logo from "../../assets/logo.png";

const navItems = [
  {
    title: "Tools",
    id: "tools",
  },
  {
    title: "About",
    id: "about",
  },
  {
    title: "GitHub",
    path: "https://github.com/Chauhan-001",
    external: true,
  },
];

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b-[3px] border-black bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">

        {/* LOGO */}
        <img
          src={logo}
          alt="VCENGINE"
          className="
            h-10
            w-auto
            bg-white
            border-[3px]
            border-black
            shadow-[4px_4px_0px_0px_#0066ff]
            transition-all
            duration-200
            hover:shadow-[6px_6px_0px_0px_#0066ff]
          "
        />

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-20">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.title}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  font-mono
                  text-[14px]
                  font-bold
                  uppercase
                  text-[#f0f0f0]
                  transition-colors
                  hover:text-[#0066ff]
                "
              >
                {item.title}
              </a>
            ) : (
              <button
                key={item.title}
                onClick={() => scrollToSection(item.id)}
                className="
                  font-mono
                  text-[14px]
                  font-bold
                  uppercase
                  text-[#f0f0f0]
                  transition-colors
                  hover:text-[#0066ff]
                "
              >
                {item.title}
              </button>
            )
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DESKTOP BUTTON */}
          <button
            onClick={() => scrollToSection("tools")}
            className="
              hidden
              md:block
              border-[3px]
              border-black
              bg-[#0066ff]
              px-5
              py-2
              font-mono
              text-[13px]
              font-bold
              uppercase
              text-white
              shadow-[4px_4px_0px_0px_black]
              transition-all
              hover:-translate-x-[2px]
              hover:-translate-y-[2px]
              hover:shadow-[6px_6px_0px_0px_black]
              active:translate-x-[2px]
              active:translate-y-[2px]
              active:shadow-none
            "
          >
            Launch Tools
          </button>

          {/* MOBILE MENU */}
          <button
            className="md:hidden text-white"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;