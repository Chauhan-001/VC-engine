import { useState } from "react";
import BrowserPreview from "./BrowserPreview";
import shieldIcon from "../../assets/shield.png";
import { Link } from "react-router-dom";

function Hero() {
const [mousePos, setMousePos] = useState({
  x: 0,
  y: 0,
});

  return (
    <section
      onMouseMove={(e) =>
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        })
      }
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
        border-b-[3px]
        border-black
        bg-[#0a0a0a]
        px-6
        pt-24
        text-center
      "
    >
      {/* Animated Dotted Background */}
      <div
        className="
          absolute
          inset-0
          opacity-70
          pointer-events-none
          animate-[moveGrid_12s_linear_infinite]
        "
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Mouse Glow */}
      <div
        className="
          absolute
          pointer-events-none
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#0066ff]
          opacity-[0.12]
          blur-[120px]
          transition-all
          duration-300
        "
        style={{
          left: mousePos.x - 225,
          top: mousePos.y - 225,
        }}
      />

      {/* Ambient Center Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#0066ff]
          opacity-[0.08]
          blur-[150px]
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Top Badge */}
        <div
          className="
            mb-6
            flex
            animate-[float_4s_ease-in-out_infinite]
            items-center
            gap-3
            border-[3px]
            border-black
            bg-white
            px-5
            py-3
            font-mono
            text-xs
            font-bold
            uppercase
            text-black
            shadow-[4px_4px_0px_0px_#0066ff]
            transition-all
            duration-200
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[8px_8px_0px_0px_#0066ff]
          "
        >
          <img
            src={shieldIcon}
            alt="Secure"
            className="h-5 w-5 object-contain"
          />

          <span>Secure Client-Side Processing</span>
        </div>

    {/* Mobile Heading */}
<h1
  className="
    block
    md:hidden
    text-5xl
    font-extrabold
    uppercase
    tracking-[-0.1em]
    leading-[0.82]
    text-white
    transform
    skew-x-[-6deg]
    [text-shadow:2px_0_0_#00F5FF,-2px_0_0_#FF007A]
  "
>
  DIGITAL
  <br />
  TOOLS
</h1>

{/* Desktop Heading */}
<h1
  className="
    hidden
    md:block
    max-w-5xl
    text-5xl
    font-black
    uppercase
    leading-tight
    text-white
    md:text-7xl
  "
>
  ALL YOUR DIGITAL TOOLS
</h1>

{/* Desktop Highlighted Text */}
<div
  className="
    hidden
    md:block
    mt-4
    border-[3px]
    border-black
    bg-white
    px-6
    py-3
    shadow-[8px_8px_0px_0px_black]
  "
>
  <span
    className="
      text-3xl
      font-black
      uppercase
      text-[#0066ff]
      md:text-5xl
    "
  >
    DIRECTLY IN THE BROWSER.
  </span>
</div>
        {/* Subtitle */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
            font-mono
            text-sm
            font-bold
            uppercase
            text-white
          "
        >
          <span>NO UPLOADS</span>

          <div className="h-2 w-2 bg-[#0066ff]" />

          <span>NO ACCOUNTS</span>

          <div className="h-2 w-2 bg-[#0066ff]" />

          <span>NO WAITING</span>
        </div>

        {/* CTA Buttons */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-4
            sm:flex-row
          "
        >
          <a
            href="#tools"
            className="
              border-[3px]
              border-black
              bg-[#0066ff]
              px-8
              py-4
              font-mono
              font-bold
              uppercase
              text-white
              shadow-[4px_4px_0px_0px_black]
              transition-all
              duration-200
              hover:-translate-x-1
              hover:-translate-y-1
              hover:shadow-[8px_8px_0px_0px_black]
            "
          >
            Explore Tools
          </a>

<Link
  to="/documentation"
  className="
    border-[3px]
    border-black
    bg-white
    px-8
    py-4
    font-mono
    font-bold
    uppercase
    text-black
    shadow-[4px_4px_0px_0px_black]
    transition-all
    duration-200
    hover:-translate-x-1
    hover:-translate-y-1
    hover:shadow-[8px_8px_0px_0px_black]
  "
>
  How It Works
</Link>
        </div>

        {/* Browser Preview */}
        <BrowserPreview />
      </div>
    </section>
  );
}

export default Hero;