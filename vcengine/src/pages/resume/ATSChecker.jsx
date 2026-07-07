import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, ListChecks, Sparkles, Target } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ToolLayout from "../../components/tools/ToolLayout.jsx";

const DEFAULT_RESUME = `Jane Doe
Senior Product Designer
jane.doe@email.com | (555) 123-4567 | Seattle, WA
LinkedIn: linkedin.com/in/janedoe

Summary
Product designer with 6+ years creating polished digital experiences for SaaS teams. Skilled in user research, interaction design, and design systems, with a track record of shipping features used by 50k+ users.

Experience
Senior Product Designer — Northwind Labs | 2021-Present
- Led redesign of the onboarding flow, improving activation by 24%.
- Built a shared component library adopted by 3 product squads.
- Partnered with engineering to launch 8 major releases.

Skills
Figma, UX Research, Design Systems, Prototyping, Accessibility, React

Education
BFA in Interaction Design — University of Washington`;

const DEFAULT_ROLE = "Product Designer";
const DEFAULT_KEYWORDS = "UX, UI, Figma, accessibility, design systems";

function analyzeResume({ resumeText, targetRole, keywords }) {
  const text = resumeText.trim();
  const lower = text.toLowerCase();
  const hasEmail = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i.test(text);
  const hasPhone = /(\+?\d[\d\s().-]{7,}\d)/.test(text);
  const hasLocation = /\b(seattle|new york|san francisco|remote|city|state|country)\b/i.test(text);
  const hasSummary = /\b(summary|profile|about)\b/i.test(text);
  const hasExperience = /\b(experience|work history|professional experience|employment)\b/i.test(text);
  const hasSkills = /\b(skills|technical skills|core competencies|tools|technologies)\b/i.test(text);
  const hasEducation = /\b(education|degree|university|college|school)\b/i.test(text);
  const bulletLines = text.split(/\n/).filter((line) => /^\s*[-•*]\s+/.test(line)).length;
  const metricCount = (text.match(/\b\d+%|\b\d+\+|\b\d+\s*(years|yrs|year)|\b\d+\s*(projects|clients|teams|users)|\b\d+k\b|\b\d+\s*(m|million)\b/gi) || []).length;
  const keywordList = keywords
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const keywordMatches = keywordList.filter((keyword) => lower.includes(keyword)).length;
  const keywordCoverage = keywordList.length ? keywordMatches / keywordList.length : 1;

  let score = 40;
  if (hasEmail) score += 8;
  if (hasPhone) score += 4;
  if (hasLocation) score += 3;
  if (hasSummary) score += 8;
  if (hasExperience) score += 14;
  if (hasSkills) score += 8;
  if (hasEducation) score += 4;
  if (bulletLines >= 3) score += 6;
  if (metricCount >= 2) score += 5;
  if (text.length > 220) score += 4;
  if (targetRole.trim()) score += 3;
  if (keywordList.length && keywordCoverage >= 0.5) score += 5;
  if (keywordList.length && keywordCoverage >= 1) score += 3;

  score = Math.min(100, Math.round(score));

  const issues = [];
  if (!hasEmail) {
    issues.push({ title: "Contact details are incomplete", body: "Add an email address so recruiters can reach you." });
  }
  if (!hasSummary) {
    issues.push({ title: "Summary section is missing", body: "Add a short summary that reflects the target role and strengths." });
  }
  if (!hasExperience) {
    issues.push({ title: "Experience section is missing", body: "Surface your relevant jobs and accomplishments clearly." });
  }
  if (!hasSkills) {
    issues.push({ title: "Skills section is missing", body: "List core tools, platforms, and specialties in a scannable way." });
  }
  if (bulletLines < 3) {
    issues.push({ title: "Bullets are too sparse", body: "Use three or more achievement-focused bullets to improve parsing and readability." });
  }
  if (metricCount < 2) {
    issues.push({ title: "Metrics are light", body: "Add numbers that quantify impact, such as revenue, growth, or user counts." });
  }
  if (keywordList.length && keywordCoverage < 0.5) {
    issues.push({ title: "Keyword alignment is weak", body: `Add more of the keywords you selected for ${targetRole || "the role"}.` });
  }

  const suggestions = [];
  if (!hasSummary) {
    suggestions.push("Write a concise summary tailored to the role.");
  }
  if (metricCount < 2) {
    suggestions.push("Add measurable wins such as percentage growth or headcount changes.");
  }
  if (keywordList.length && keywordCoverage < 1) {
    suggestions.push("Sprinkle the target keywords into your summary, skills, and experience bullets.");
  }
  if (bulletLines < 3) {
    suggestions.push("Turn plain paragraphs into short bullet points with action verbs.");
  }
  if (!hasEducation) {
    suggestions.push("Include education if it is relevant to the role or required by the employer.");
  }
  if (!suggestions.length) {
    suggestions.push("Your resume already reads like a strong ATS candidate. Keep the structure consistent.");
  }

  const checks = [
    { label: "Contact details present", good: hasEmail && hasPhone },
    { label: "Summary section included", good: hasSummary },
    { label: "Experience bullets present", good: bulletLines >= 3 },
    { label: "Skills and keywords aligned", good: hasSkills && keywordCoverage >= 0.5 },
  ];

  return { score, issues, suggestions, checks, keywordCoverage, bulletLines, metricCount, targetRole };
}

export default function ATSChecker() {
  const [resumeText, setResumeText] = useState(() => {
    try {
      return localStorage.getItem("atsResumeText") || DEFAULT_RESUME;
    } catch {
      return DEFAULT_RESUME;
    }
  });
  const [targetRole, setTargetRole] = useState(() => {
    try {
      return localStorage.getItem("atsTargetRole") || DEFAULT_ROLE;
    } catch {
      return DEFAULT_ROLE;
    }
  });
  const [keywords, setKeywords] = useState(() => {
    try {
      return localStorage.getItem("atsKeywords") || DEFAULT_KEYWORDS;
    } catch {
      return DEFAULT_KEYWORDS;
    }
  });
  const [analysis, setAnalysis] = useState(() => {
    try {
      const saved = localStorage.getItem("atsAnalysis");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("atsResumeText", resumeText);
      localStorage.setItem("atsTargetRole", targetRole);
      localStorage.setItem("atsKeywords", keywords);
    } catch {}
  }, [resumeText, targetRole, keywords]);

  useEffect(() => {
    if (!analysis) {
      const next = analyzeResume({ resumeText, targetRole, keywords });
      setAnalysis(next);
      try {
        localStorage.setItem("atsAnalysis", JSON.stringify(next));
      } catch {}
    }
  }, [analysis, keywords, resumeText, targetRole]);

  const scoreTone = useMemo(() => {
    if (!analysis) return { label: "Ready to analyze", color: "#60a5fa" };
    if (analysis.score >= 80) return { label: "ATS-ready", color: "#22c55e" };
    if (analysis.score >= 60) return { label: "Needs polish", color: "#f59e0b" };
    return { label: "Needs stronger structure", color: "#ef4444" };
  }, [analysis]);

  const handleAnalyze = () => {
    const next = analyzeResume({ resumeText, targetRole, keywords });
    setAnalysis(next);
    try {
      localStorage.setItem("atsAnalysis", JSON.stringify(next));
    } catch {}
  };

  const handleLoadSample = () => {
    setResumeText(DEFAULT_RESUME);
    setTargetRole(DEFAULT_ROLE);
    setKeywords(DEFAULT_KEYWORDS);
    const next = analyzeResume({ resumeText: DEFAULT_RESUME, targetRole: DEFAULT_ROLE, keywords: DEFAULT_KEYWORDS });
    setAnalysis(next);
    try {
      localStorage.setItem("atsAnalysis", JSON.stringify(next));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-[1800px] px-6 pb-24">
          <ToolLayout title="ATS Resume Checker">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 shadow-[6px_6px_0px_0px_black]">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                    <FileText size={16} className="text-[#60a5fa]" />
                    Paste your resume
                  </div>
                  <textarea
                    value={resumeText}
                    onChange={(event) => setResumeText(event.target.value)}
                    className="min-h-[300px] w-full rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-4 font-mono text-sm text-gray-100 outline-none ring-0"
                    placeholder="Paste your resume content here..."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 shadow-[6px_6px_0px_0px_black]">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                      <Target size={14} className="text-[#60a5fa]" />
                      Target role
                    </div>
                    <input
                      value={targetRole}
                      onChange={(event) => setTargetRole(event.target.value)}
                      className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-gray-100 outline-none"
                      placeholder="e.g. Frontend Developer"
                    />
                  </label>

                  <label className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 shadow-[6px_6px_0px_0px_black]">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                      <Sparkles size={14} className="text-[#60a5fa]" />
                      ATS keywords
                    </div>
                    <textarea
                      value={keywords}
                      onChange={(event) => setKeywords(event.target.value)}
                      className="min-h-[92px] w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2 text-sm text-gray-100 outline-none"
                      placeholder="React, JavaScript, Product Design"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="rounded-full border border-[#60a5fa] bg-[#60a5fa] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:-translate-y-[1px]"
                  >
                    Analyze resume
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="rounded-full border border-[#2a2a2a] bg-[#161616] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-200 transition hover:-translate-y-[1px]"
                  >
                    Load sample
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {!analysis ? (
                  <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-[6px_6px_0px_0px_black]">
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Ready when you are</p>
                    <p className="mt-3 text-sm leading-7 text-gray-300">
                      Paste your content, define the role, and let the checker surface structural issues, weak keywords, and missing proof points.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-[6px_6px_0px_0px_black]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">ATS fit score</p>
                          <p className="mt-2 text-4xl font-black text-white">{analysis.score}/100</p>
                          <p className="mt-2 text-sm text-gray-400">Target role: {analysis.targetRole || "General"}</p>
                        </div>
                        <div
                          className="flex h-24 w-24 items-center justify-center rounded-full border-[8px] bg-[#0a0a0a] text-xl font-black"
                          style={{ borderColor: scoreTone.color, color: scoreTone.color }}
                        >
                          {analysis.score}
                        </div>
                      </div>
                      <div className="mt-4 rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-3 text-sm text-gray-300">
                        <span className="font-semibold" style={{ color: scoreTone.color }}>
                          {scoreTone.label}
                        </span>
                        <span className="ml-2">• {analysis.keywordCoverage >= 0.5 ? "Keyword coverage looks healthy" : "Keyword coverage needs more alignment"}</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-[6px_6px_0px_0px_black]">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                        <ListChecks size={16} className="text-[#60a5fa]" />
                        ATS checklist
                      </div>
                      <div className="space-y-2">
                        {analysis.checks.map((check) => (
                          <div key={check.label} className="flex items-center justify-between rounded-lg border border-[#232323] bg-[#0a0a0a] px-3 py-2 text-sm text-gray-200">
                            <span>{check.label}</span>
                            {check.good ? (
                              <CheckCircle2 size={16} className="text-[#22c55e]" />
                            ) : (
                              <AlertTriangle size={16} className="text-[#f59e0b]" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-[6px_6px_0px_0px_black]">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                        <AlertTriangle size={16} className="text-[#f59e0b]" />
                        Issues found
                      </div>
                      <div className="space-y-2">
                        {analysis.issues.map((issue) => (
                          <div key={issue.title} className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-3">
                            <p className="text-sm font-semibold text-white">{issue.title}</p>
                            <p className="mt-1 text-sm text-gray-400">{issue.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-6 shadow-[6px_6px_0px_0px_black]">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                        <Sparkles size={16} className="text-[#60a5fa]" />
                        Suggested next steps
                      </div>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {analysis.suggestions.map((suggestion) => (
                          <li key={suggestion} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-[#60a5fa]" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ToolLayout>
        </div>
      </main>
      <Footer />
    </div>
  );
}

