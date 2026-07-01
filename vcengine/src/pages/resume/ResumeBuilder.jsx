import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ResumeSidebar from "../../components/resume/ResumeSidebar.jsx";
import LiveResumePreview from "../../components/resume/LiveResumePreview.jsx";
import ResumeToolbar from "../../components/resume/ResumeToolbar.jsx";

const DEFAULT_SECTIONS = [
  { id: "contact", title: "Contact", type: "fixed", collapsed: false, payload: {} },
  {
    id: "summary",
    title: "Summary",
    type: "standard",
    collapsed: false,
    payload: { text: "" },
  },
  {
    id: "education",
    title: "Education",
    type: "standard",
    collapsed: false,
    payload: { items: [{ school: "", degree: "", dates: "", details: "" }] },
  },
  {
    id: "experience",
    title: "Experience",
    type: "standard",
    collapsed: false,
    payload: { items: [{ company: "", role: "", dates: "", location: "", bullets: [], tags: [] }] },
  },
  {
    id: "projects",
    title: "Projects",
    type: "standard",
    collapsed: false,
    payload: { items: [{ name: "", description: "", tech: [], links: "", duration: "", achievements: [] }] },
  },
  {
    id: "skills",
    title: "Skills",
    type: "standard",
    collapsed: false,
    payload: { categories: [] },
  },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function estimateUtilization(resumeData) {
  // Lightweight heuristic: based on total characters in editable sections.
  const chars = resumeData.sections
    .filter((s) => s.type !== "fixed")
    .reduce((acc, s) => {
      const p = s.payload || {};
      return acc + JSON.stringify(p).length;
    }, 0);

  // Map chars into 0..1 range.
  const score = chars / 12000; // tuned for typical resumes.
  return clamp(score, 0, 1);
}

function utilizationLabel(util) {
  if (util < 0.75) return { pct: Math.round(util * 100), status: "SAFE" };
  if (util < 0.92) return { pct: Math.round(util * 100), status: "NEAR LIMIT" };
  return { pct: Math.round(util * 100), status: "OVER" };
}

function applyOnePageCompression(sections, enabled) {
  if (!enabled) return sections;

  // Simple compression rules: collapse low-value sections and trim some repeated whitespace.
  return sections.map((s) => {
    if (s.type === "fixed") return s;
    const collapsed = s.title === "Projects" || s.title === "Education" ? true : s.collapsed;

    const payload = { ...(s.payload || {}) };
    // Trim overly long summary.
    if (s.title === "Summary" && typeof payload.text === "string") {
      payload.text = payload.text.slice(0, 520);
    }
    // Limit bullets per experience/project.
    if (s.title === "Experience" && payload.items?.[0]?.bullets) {
      payload.items = payload.items.map((it, idx) => ({
        ...it,
        bullets: (it.bullets || []).slice(0, 4),
      }));
    }
    if (s.title === "Projects" && payload.items?.[0]?.achievements) {
      payload.items = payload.items.map((it) => ({
        ...it,
        achievements: (it.achievements || []).slice(0, 2),
      }));
    }

    return { ...s, collapsed };
  });
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(() => ({
    sections: DEFAULT_SECTIONS,
    contact: {
      name: "",
      email: "",
      phone: "",
      location: "",
      links: "",
      headline: "Software Engineer",
    },
  }));

  const [selectedTemplate, setSelectedTemplate] = useState("chronological");
  const [pageSize, setPageSize] = useState("A4");
  const [onePageMode, setOnePageMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [themeColor, setThemeColor] = useState("#0066ff");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [headerStyle, setHeaderStyle] = useState("Modern");
  const [dividerStyle, setDividerStyle] = useState("Line");

  // Mobile fallback
  const [mobileTab, setMobileTab] = useState("editor");

  const util = useMemo(() => estimateUtilization(resumeData), [resumeData]);
  const utilization = utilizationLabel(util);

  const compressedSections = useMemo(
    () => applyOnePageCompression(resumeData.sections, onePageMode),
    [resumeData.sections, onePageMode]
  );

  // Basic undo/redo stack for editor operations.
  const historyRef = useRef({ past: [], future: [] });

  function pushHistory(next) {
    historyRef.current.past.push(structuredClone(resumeData));
    historyRef.current.future = [];
    setResumeData(next);
  }

  function handleUndo() {
    const { past, future } = historyRef.current;
    if (!past.length) return;
    const prev = past.pop();
    future.push(structuredClone(resumeData));
    setResumeData(prev);
  }

  function handleRedo() {
    const { past, future } = historyRef.current;
    if (!future.length) return;
    const next = future.pop();
    past.push(structuredClone(resumeData));
    setResumeData(next);
  }

  // Persist drafts
  useEffect(() => {
    try {
      localStorage.setItem("resumeData.v1", JSON.stringify(resumeData));
    } catch {}
  }, [resumeData]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("resumeData.v1");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.sections) setResumeData(parsed);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navbar height is fixed in Navbar component: h-16 (4rem)
  const navbarH = "4rem";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-[1800px] px-6 pb-24">
          <div className="mb-8">
            <h1 className="text-6xl font-black uppercase">Resume Studio</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Build dynamic one-page resumes with templates, ATS scoring, and live preview.
            </p>
          </div>

          {/* Mobile: tabs (no split panes) */}
          <div className="xl:hidden mb-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMobileTab("editor")}
                className={`border-[3px] border-black bg-[#161616] px-4 py-3 font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-[1px] ${mobileTab === "editor" ? "bg-[#0066ff]" : "bg-[#111]"}`}
              >
                Editor
              </button>
              <button
                onClick={() => setMobileTab("preview")}
                className={`border-[3px] border-black bg-[#161616] px-4 py-3 font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-[1px] ${mobileTab === "preview" ? "bg-[#0066ff]" : "bg-[#111]"}`}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Desktop: split-pane with independent scrollers */}
          <div className="hidden xl:grid xl:grid-cols-[760px_1fr] xl:gap-8 xl:items-start">
            {/* LEFT: independent editor scroller */}
            <section
              className="overflow-y-auto overflow-x-hidden"
              style={{ height: `calc(100vh - ${navbarH})` }}
            >
              <ResumeSidebar
                resumeData={resumeData}
                setResumeData={(updater) =>
                  pushHistory(
                    typeof updater === "function" ? updater(resumeData) : updater
                  )
                }
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                onePageMode={onePageMode}
                setOnePageMode={setOnePageMode}
                pageSize={pageSize}
                setPageSize={setPageSize}
                themeColor={themeColor}
                setThemeColor={setThemeColor}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
                headerStyle={headerStyle}
                setHeaderStyle={setHeaderStyle}
                dividerStyle={dividerStyle}
                setDividerStyle={setDividerStyle}
                onUndo={handleUndo}
                onRedo={handleRedo}
                utilization={utilization}
              />
            </section>

            {/* RIGHT: sticky preview workspace */}
            <section
              className="sticky top-0 overflow-y-auto overflow-x-hidden"
              style={{ height: `calc(100vh - ${navbarH})` }}
            >
              <ResumeToolbar
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
              <LiveResumePreview
                resumeData={{ ...resumeData, sections: compressedSections }}
                template={selectedTemplate}
                pageSize={pageSize}
                zoomLevel={zoomLevel}
                onePageMode={onePageMode}
                themeColor={themeColor}
                fontFamily={fontFamily}
                headerStyle={headerStyle}
                dividerStyle={dividerStyle}
              />
            </section>
          </div>

          {/* Mobile/tablet: render only one panel */}
          <div className="xl:hidden">
            {mobileTab === "editor" ? (
              <section
                className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden"
              >
                <ResumeSidebar
                  resumeData={resumeData}
                  setResumeData={(updater) =>
                    pushHistory(typeof updater === "function" ? updater(resumeData) : updater)
                  }
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  onePageMode={onePageMode}
                  setOnePageMode={setOnePageMode}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  themeColor={themeColor}
                  setThemeColor={setThemeColor}
                  fontFamily={fontFamily}
                  setFontFamily={setFontFamily}
                  headerStyle={headerStyle}
                  setHeaderStyle={setHeaderStyle}
                  dividerStyle={dividerStyle}
                  setDividerStyle={setDividerStyle}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  utilization={utilization}
                />
              </section>
            ) : (
              <section
                className="h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden"
              >
                <ResumeToolbar
                  zoomLevel={zoomLevel}
                  setZoomLevel={setZoomLevel}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                />
                <LiveResumePreview
                  resumeData={{ ...resumeData, sections: compressedSections }}
                  template={selectedTemplate}
                  pageSize={pageSize}
                  zoomLevel={zoomLevel}
                  onePageMode={onePageMode}
                  themeColor={themeColor}
                  fontFamily={fontFamily}
                  headerStyle={headerStyle}
                  dividerStyle={dividerStyle}
                />
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}



