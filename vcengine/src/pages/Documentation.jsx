import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Documentation() {
  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "pdf-suite", label: "PDF Suite" },
    { id: "video-studio", label: "Video Studio" },
    { id: "audio-studio", label: "Audio Studio" },
    { id: "image-lab", label: "Image Lab" },
    { id: "resume-studio", label: "Resume Studio" },
    { id: "privacy-first", label: "Privacy First Architecture" },
    { id: "browser-processing", label: "Browser Processing Technology" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-[1400px] px-6 pb-24">
          <header className="mb-12">
            <h1 className="text-6xl font-black uppercase">Documentation</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Learn how VCEngine works and how all tools process files locally.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
            {/* Anchor navigation */}
            <aside className="sticky top-24">
              <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
                <h2 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em] mb-4">
                  On this page
                </h2>
                <nav className="space-y-3">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block font-mono text-xs font-bold uppercase text-gray-400 hover:text-[#0066ff] transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-6 border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
                <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em] mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    to="/status"
                    className="block font-mono text-xs font-bold uppercase text-gray-400 hover:text-[#0066ff] transition-colors"
                  >
                    Status
                  </Link>
                  <Link
                    to="/privacy-policy"
                    className="block font-mono text-xs font-bold uppercase text-gray-400 hover:text-[#0066ff] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="block font-mono text-xs font-bold uppercase text-gray-400 hover:text-[#0066ff] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <section className="space-y-8">
              <section id="getting-started" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Getting Started</h2>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-300 font-mono">
                    1) Upload a file (drag & drop or browse).
                  </p>
                  <p className="text-sm text-gray-300 font-mono">
                    2) Choose options (format, quality, mode).
                  </p>
                  <p className="text-sm text-gray-300 font-mono">
                    3) Run processing locally in your browser using FFmpeg.wasm (or browser-native APIs).
                  </p>
                  <p className="text-sm text-gray-300 font-mono">
                    4) Download results. Temporary processing artifacts are cleaned up after export.
                  </p>
                  <div className="text-xs text-gray-400 font-mono uppercase">
                    Tip: Keep your browser tab open during processing.
                  </div>
                </div>
              </section>

              <section id="pdf-suite" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">PDF Suite</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>Merge, split, compress, and extract pages using client-side processing.</p>
                  <p>Watermark and protect flows run locally (no server upload).</p>
                  <p>All tools are designed for fast in-browser results.</p>
                </div>
              </section>

              <section id="video-studio" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Video Studio</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>Compress and extract media using FFmpeg.wasm in your browser.</p>
                  <p>Preview-only features use browser rendering where possible.</p>
                  <p>Downloads happen entirely on-device.</p>
                </div>
              </section>

              <section id="audio-studio" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Audio Studio</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>Merge, split, boost volume, and change speed using FFmpeg.wasm.</p>
                  <p>Processing is queued and exported in your browser.</p>
                  <p>Drag & drop is supported for offline workflows.</p>

                </div>
              </section>

              <section id="image-lab" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Image Lab</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>Resize and compress images locally in the browser.</p>
                  <p>Output quality controls are applied before download.</p>
                </div>
              </section>

              <section id="resume-studio" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Resume Studio</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>Build and preview resumes with offline rendering.</p>
                  <p>Templates and editing controls run in-browser.</p>
                </div>
              </section>

              <section id="privacy-first" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Privacy First Architecture</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>Files never leave the device for processing.</p>
                  <p>No accounts required. No authentication flows.</p>
                  <p>Downloads and exports are generated locally.</p>
                </div>
              </section>

              <section id="browser-processing" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Browser Processing Technology</h2>
                </div>
                <div className="p-6 space-y-3 text-sm text-gray-300 font-mono">
                  <p>FFmpeg.wasm handles audio/video/PDF transformations offline.</p>
                  <p>Temporary processing files are written to FFmpeg’s in-memory filesystem and cleaned after export.</p>
                  <p>Object URLs are revoked after downloads to keep memory usage stable.</p>
                </div>
              </section>

              <section id="faq" className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">FAQ</h2>
                </div>
                <div className="p-6 space-y-4 text-sm font-mono text-gray-300">
                  <div>
                    <div className="font-bold text-white">Does VCEngine send my files to a server?</div>
                    <div className="text-gray-400 mt-1">
                      No. Processing runs in your browser. Downloads are generated locally.
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white">Can I use this offline?</div>
                    <div className="text-gray-400 mt-1">
                      The tools are designed for offline processing. You still need your app’s static assets available.
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-white">Why does processing take time?</div>
                    <div className="text-gray-400 mt-1">
                      FFmpeg.wasm runs in your browser. Speed depends on file size and your CPU.
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

