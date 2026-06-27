import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer id="about" className="border-t-[3px] border-[#0066ff] bg-black py-16">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          <img
            src={logo}
            alt="VCENGINE"
            className="
              h-12
              w-fit
              border-[3px]
              border-black
              bg-white
              shadow-[4px_4px_0px_0px_#0066ff]
            "
          />

          <p className="max-w-md text-sm font-bold uppercase leading-7 text-gray-400">
            THE NEXT GENERATION OF CLIENT-SIDE WEB APPLICATIONS.
            EFFICIENT, HIGH-PERFORMANCE, AND SYSTEMATICALLY SECURE.
          </p>

          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066ff]">
            © 2026 VCENGINE. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-2 gap-10">

          {/* PRODUCT */}
          <div>
            <h4
              className="
                mb-4
                inline-block
                border-b-2
                border-[#0066ff]
                pb-1
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-white
              "
            >
              Product
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/documentation"
                className="
                  font-mono
                  text-sm
                  uppercase
                  text-gray-400
                  transition-colors
                  hover:text-[#0066ff]
                "
              >
                Documentation
              </Link>

              <Link
                to="/status"
                className="
                  font-mono
                  text-sm
                  uppercase
                  text-gray-400
                  transition-colors
                  hover:text-[#0066ff]
                "
              >
                Status
              </Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h4
              className="
                mb-4
                inline-block
                border-b-2
                border-[#0066ff]
                pb-1
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-white
              "
            >
              Legal
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/privacy"
                className="
                  font-mono
                  text-sm
                  uppercase
                  text-gray-400
                  transition-colors
                  hover:text-[#0066ff]
                "
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="
                  font-mono
                  text-sm
                  uppercase
                  text-gray-400
                  transition-colors
                  hover:text-[#0066ff]
                "
              >
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;