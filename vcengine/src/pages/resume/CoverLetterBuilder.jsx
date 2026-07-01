import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import ResumeSidebar from "../../components/resume/ResumeSidebar.jsx";
import ResumeToolbar from "../../components/resume/ResumeToolbar.jsx";
import LiveResumePreview from "../../components/resume/LiveResumePreview.jsx";

const EMPTY_CONTACT = { name: "", headline: "", email: "", phone: "", location: "", links: "" };

export default function CoverLetterBuilderPage() {
  const [activeTab, setActiveTab] = useState("cover");
  const [resumeData] = useState({ contact: EMPTY_CONTACT, sections: [] });
  const [pageSize] = useState("A4");
  const [onePageMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [themeColor] = useState("#0066ff");
  const [fontFamily] = useState("Inter");
  const [headerStyle] = useState("Modern");
  const [dividerStyle] = useState("Line");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-[1800px] px-6 pb-24">
          <div className="mb-8">
            <h1 className="text-6xl font-black uppercase">Cover Letter Builder</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Generate tailored cover letters using your resume data.
            </p>
          </div>

          <div className="hidden xl:grid xl:grid-cols-[760px_1fr] xl:gap-8 xl:items-start">
            <section className="overflow-y-auto overflow-x-hidden" style={{ height: "calc(100vh - 4rem)" }}>
              <ResumeSidebar
                resumeData={resumeData}
                setResumeData={() => {}}
                selectedTemplate="chronological"
                setSelectedTemplate={() => {}}
                onePageMode={onePageMode}
                setOnePageMode={() => {}}
                pageSize={pageSize}
                setPageSize={() => {}}
                themeColor={themeColor}
                setThemeColor={() => {}}
                fontFamily={fontFamily}
                setFontFamily={() => {}}
                headerStyle={headerStyle}
                setHeaderStyle={() => {}}
                dividerStyle={dividerStyle}
                setDividerStyle={() => {}}
                initialTab={activeTab}
              />
            </section>
            <section className="sticky top-0 overflow-y-auto overflow-x-hidden" style={{ height: "calc(100vh - 4rem)" }}>
              <ResumeToolbar zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} onUndo={() => {}} onRedo={() => {}} />
              <LiveResumePreview
                resumeData={resumeData}
                template="chronological"
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
        </div>
      </main>
      <Footer />
    </div>
  );
}