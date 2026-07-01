import { useMemo } from "react";
import { computeATSScore } from "../../utils/resume/atsChecker";

export default function ATSScoreCard({ resumeData }) {
  const result = useMemo(() => computeATSScore(resumeData), [resumeData]);

  const color = result.score >= 80 ? "#22c55e" : result.score >= 60 ? "#f59e0b" : "#ff3b30";

  return (
    <div className="border-[3px] border-black bg-[#161616] p-5 shadow-[6px_6px_0px_0px_black]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-mono text-sm font-bold uppercase text-white">ATS Checker</h3>
          <p className="mt-1 font-mono text-xs uppercase text-gray-400">Live heuristic score</p>
        </div>
        <div className="border-[2px] border-black bg-[#111] px-4 py-2 shadow-[3px_3px_0px_0px_black]">
          <div className="font-mono text-[11px] uppercase text-gray-400 font-bold">ATS SCORE</div>
          <div className="font-mono text-2xl font-black" style={{ color }}>{result.score}/100</div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {result.issues.slice(0, 5).map((issue) => (
          <li key={issue.label} className="font-mono text-xs uppercase text-gray-300 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {issue.label}
          </li>
        ))}
      </ul>
    </div>
  );
}