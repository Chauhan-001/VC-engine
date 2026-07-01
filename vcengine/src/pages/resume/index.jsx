import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-[1800px] px-6 pb-24">
          <h1 className="text-6xl font-black uppercase">Resume Studio</h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Dynamic resume builder with one-page mode, templates, ATS insights, and live preview.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="border-[3px] border-black bg-[#161616] p-6 shadow-[6px_6px_0px_0px_black]">
              <h2 className="font-mono text-sm font-bold uppercase text-white">Builder</h2>
              <p className="mt-2 font-mono text-xs uppercase text-gray-400">Edit sections • One-page optimization • Live preview</p>
              <Link
                to="/resume/builder"
                className="mt-5 inline-flex w-full items-center justify-center border-[3px] border-black bg-[#0066ff] px-6 py-4 font-mono text-xs font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] hover:-translate-y-[1px] transition-all"
              >
                Open Resume Builder
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


