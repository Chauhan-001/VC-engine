import React from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ToolLayout from "../../components/tools/ToolLayout.jsx";

export default function ResumeTemplates() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-[1800px] px-6 pb-24">
          <ToolLayout title="Resume Templates">
            <div className="font-mono text-sm uppercase text-gray-400">
              Templates page scaffold.
            </div>
          </ToolLayout>
        </div>
      </main>
      <Footer />
    </div>
  );
}

