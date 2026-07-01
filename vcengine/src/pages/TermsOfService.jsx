import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-[1200px] px-6 pb-24">
          <header className="mb-12">
            <h1 className="text-6xl font-black uppercase">Terms of Service</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Simple, developer-friendly terms</p>
          </header>

          <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
            <div className="border-b-[3px] border-black px-6 py-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Acceptance</h2>
            </div>
            <div className="p-6 space-y-4 text-sm font-mono text-gray-300">
              <p>
                By using VCEngine, you agree to these terms. If you do not agree, stop using the service.
              </p>
              <p>
                This service is client-side only. It does not replace your own responsibility for file handling.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Local Processing Disclaimer</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  All processing runs in your browser via client-side technologies. We make no guarantees about performance on every device.
                </p>
                <p>
                  You are responsible for the files you upload and the outputs you download.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">User Responsibilities</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>Do not upload files you do not have rights to use or transform.</p>
                <p>Verify results before distribution or publication.</p>
                <p>Ensure your browser and device resources can handle processing workloads.</p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Intellectual Property</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  You retain rights to your input files. VCEngine and its code are subject to the project’s license.
                </p>
                <p>
                  Outputs may contain content derived from your files, and you are responsible for compliance.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Limitation of Liability</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  To the maximum extent permitted by law, VCEngine is provided "as is" without warranties.
                </p>
                <p>
                  We are not liable for any direct, indirect, incidental, or consequential damages from using the tools.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Open-source Dependencies</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  The service uses open-source and third-party libraries. Respective licenses apply to those dependencies.
                </p>
                <p>
                  Review dependency licenses in the repository.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Service Availability</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  Availability may vary depending on device performance and browser support.
                </p>
                <p>
                  You should not rely on VCEngine as a mission-critical processing system.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Changes to Terms</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  We may update these terms. Continued use after changes means you accept the updated terms.
                </p>
              </div>
            </section>

            <section className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Contact</h2>
              </div>
              <div className="p-6 space-y-3 text-sm font-mono text-gray-300">
                <p>
                  For questions about these terms, contact via the project repository or official channel.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8">
            <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
              <div className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Ready to use?</div>
              <div className="mt-3 text-sm text-gray-400 font-mono">
                Review how local processing works in the Documentation.
              </div>
              <div className="mt-4">
                <Link
                  to="/documentation"
                  className="inline-flex items-center justify-center border-[3px] border-black bg-[#0066ff] px-6 py-3 font-mono text-xs font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] hover:-translate-y-[1px] transition-all"
                >
                  Open Documentation
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

