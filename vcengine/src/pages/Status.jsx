import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function StatusCard({ title, value }) {
  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
      <div className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">{title}</div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
        <div className="font-mono text-sm font-black uppercase text-white">{value}</div>
      </div>
    </div>
  );
}

export default function Status() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleString());
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-[1200px] px-6 pb-24">
          <header className="mb-12">
            <h1 className="text-6xl font-black uppercase">System Status</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">All Systems Operational</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
            <section className="space-y-6">
              <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
                <div className="flex items-center justify-between gap-6">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Suites</h2>
                  <div className="font-mono text-[11px] uppercase text-gray-400">{lastUpdated ? `Last Updated: ${lastUpdated}` : "Last Updated:"}</div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StatusCard title="PDF Suite" value="ONLINE" />
                  <StatusCard title="Video Studio" value="ONLINE" />
                  <StatusCard title="Audio Studio" value="ONLINE" />
                  <StatusCard title="Image Lab" value="ONLINE" />
                  <StatusCard title="Resume Studio" value="ONLINE" />
                </div>
              </div>

              <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Uptime</h2>
                <div className="mt-4 text-gray-300 font-mono text-sm">
                  <div className="font-black text-white">99.9% Local Processing Reliability</div>
                  <div className="mt-2 text-gray-400">Since everything runs client-side.</div>
                </div>
                <div className="mt-4 text-gray-500 font-mono text-xs uppercase">
                  No real server monitoring • No external APIs
                </div>
              </div>
            </section>

            <aside>
              <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
                <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Notes</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-400 font-mono">
                  <li>VCEngine runs entirely in your browser for offline workflows.</li>
                  <li>Processing reliability depends on your device resources.</li>
                  <li>If processing fails, try smaller files or different formats.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

