import { Link } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-[1200px] px-6 pb-24">
          <header className="mb-12">
            <h1 className="text-6xl font-black uppercase">Privacy Policy</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">100% Local Processing</p>
          </header>

          <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
            <div className="border-b-[3px] border-black px-6 py-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Summary</h2>
            </div>
            <div className="p-6 space-y-4 text-sm font-mono text-gray-300">
              <p>
                VCEngine is designed to process files in your browser. No cloud uploads. No user accounts are required.
              </p>
              <p>
                We do not sell your data and we do not require sign-ins to run tools.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Key Principles</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>• Files never leave the device.</p>
                <p>• No cloud uploads.</p>
                <p>• No user accounts required.</p>
                <p>• No selling of user data.</p>
                <p>• Browser-based processing only.</p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Local Storage Usage</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  Some tools may use local storage for UI preferences and session conveniences.
                </p>
                <p>
                  Stored data stays in your browser and is not transmitted to any external service.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Third-Party Libraries Used</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  VCEngine uses client-side libraries (for example, FFmpeg.wasm and UI libraries). These libraries run locally.
                </p>
                <p>
                  We recommend you review third-party license terms in the project repository.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Cookies Policy</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  We keep usage minimal. If cookies are used, they are limited to standard site functionality and do not enable account features.
                </p>
                <p>
                  You can clear browser data at any time.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Contact</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  For privacy-related questions, contact via the repository or official project channel.
                </p>
                <p className="text-gray-400">
                  Prefer developer-friendly disclosures and clear file-handling assumptions.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8">
            <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
              <div className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">100% Local Processing</div>
              <p className="mt-3 text-sm text-gray-400 font-mono">
                No cloud uploads. No user accounts required. Your files stay in your browser.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/documentation"
                  className="inline-flex items-center justify-center border-[3px] border-black bg-[#0066ff] px-6 py-3 font-mono text-xs font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] hover:-translate-y-[1px] transition-all"
                >
                  Learn How It Works
                </Link>
                <Link
                  to="/terms-of-service"
                  className="inline-flex items-center justify-center border-[3px] border-black bg-[#111] px-6 py-3 font-mono text-xs font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] hover:-translate-y-[1px] transition-all"
                >
                  View Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

