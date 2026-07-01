export default function PageUtilizationCard({ utilization, onePageMode }) {
  const pct = utilization?.pct ?? 72;
  const status = utilization?.status ?? (pct < 90 ? "SAFE" : "NEAR LIMIT");

  return (
    <div className="border-[3px] border-black bg-[#161616] p-5 shadow-[6px_6px_0px_0px_black]">
      <h3 className="font-mono text-sm font-bold uppercase text-white">Page Utilization</h3>
      <p className="mt-1 font-mono text-xs uppercase text-gray-400">
        {onePageMode ? "One Page Mode Active" : "Multi-page preview"}
      </p>

      <div className="mt-4 border-[2px] border-black bg-[#111] p-4 shadow-[3px_3px_0px_0px_black]">
        <div className="font-mono text-[11px] uppercase text-gray-400 font-bold">PAGE UTILIZATION</div>
        <div className="mt-1 font-mono text-4xl font-black text-white">{pct}%</div>
        <div className="mt-1 font-mono text-xs uppercase font-bold text-[#0066ff]">{status}</div>
      </div>

      <div className="mt-4 font-mono text-[11px] uppercase text-gray-200">
        Auto-compress is applied when “Keep Resume To One Page” is enabled.
      </div>
    </div>
  );
}

