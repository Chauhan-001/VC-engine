import { useMemo } from "react";
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { computeATSScore } from "../../utils/resume/atsChecker";

const SEVERITY_COLORS = {
  high:   { bg: "#3b0000", text: "#ff6b6b", border: "#ff3b30" },
  medium: { bg: "#1a1200", text: "#f59e0b", border: "#f59e0b" },
  low:    { bg: "#0a1a0a", text: "#22c55e", border: "#22c55e" },
};

export function ATSTab({ resumeData }) {
  const result = useMemo(() => computeATSScore(resumeData), [resumeData]);

  const color = result.score >= 80 ? "#22c55e" : result.score >= 60 ? "#f59e0b" : "#ff3b30";

  return (
    <div className="flex flex-col gap-0 pb-8">
      <div className="border-b-[3px] border-black p-6 bg-[#111]">
        <div className="flex items-center justify-between gap-6">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${color} ${result.score * 3.6}deg, #1a1a1a 0deg)` }} />
            <div className="absolute inset-[5px] rounded-full bg-[#111] flex flex-col items-center justify-center">
              <span className="font-mono text-2xl font-black text-white leading-none">{result.score}</span>
              <span className="font-mono text-[8px] uppercase text-gray-500 leading-none">/100</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-white">ATS Score</h3>
            <p className="mt-1 font-mono text-[10px] uppercase" style={{ color }}>
              {result.score >= 80 ? "✓ ATS Optimized" : result.score >= 60 ? "⚠ Needs Improvement" : "✗ Below Threshold"}
            </p>
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-gray-500">
              Based on keyword density, action verbs, metrics, and section completeness.
            </p>
          </div>
        </div>

        <div className="mt-4 border-[2px] border-[#222] bg-[#0a0a0a] h-3 overflow-hidden">
          <div className="h-full transition-all duration-700" style={{ width: `${result.score}%`, background: color }} />
        </div>
      </div>

      {/* Issues */}
      <div className="p-4 space-y-2">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Issues Found ({result.issues.length})</h4>
        {result.issues.length === 0 && (
          <div className="flex items-center gap-2 border-[2px] border-[#22c55e] bg-[#0a1a0a] p-3">
            <CheckCircle2 size={14} className="text-[#22c55e]" />
            <p className="font-mono text-xs text-[#22c55e]">Your resume looks ATS-ready!</p>
          </div>
        )}
        {result.issues.map((issue, idx) => (
          <div key={idx} className="flex items-start gap-3 border-[2px] p-3"
            style={{ borderColor: SEVERITY_COLORS[issue.severity]?.border || "#333", background: SEVERITY_COLORS[issue.severity]?.bg || "#111" }}>
            <AlertCircle size={13} className="mt-0.5 shrink-0" style={{ color: SEVERITY_COLORS[issue.severity]?.text }} />
            <div>
              <p className="font-mono text-[11px] font-bold uppercase" style={{ color: SEVERITY_COLORS[issue.severity]?.text }}>{issue.label}</p>
              <p className="mt-0.5 font-mono text-[10px] text-gray-400">{issue.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-[3px] border-black mx-4 my-2" />

      <div className="p-4">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Score Breakdown</h4>
        <div className="space-y-2">
          {Object.entries(result.metrics).map(([key, val]) => {
            const labels = { contact: "Contact Info", summary: "Summary", experience: "Experience", skills: "Skills", projects: "Projects", education: "Education", length: "Length" };
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase text-gray-400 w-24">{labels[key] || key}</span>
                <div className="flex-1 border-[2px] border-[#222] bg-[#0a0a0a] h-2 overflow-hidden">
                  <div className="h-full bg-[#0066ff]" style={{ width: `${Math.min(100, (val / 15) * 100)}%` }} />
                </div>
                <span className="font-mono text-[10px] text-gray-500 w-8 text-right">{val}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}