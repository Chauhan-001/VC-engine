import { useState } from "react";
import WorkspaceNav from "./WorkspaceNav";
import { BuilderTab } from "./BuilderTab";
import { TemplatesTab } from "./TemplatesTab";
import { ATSTab } from "./ATSTab";
import { CoverLetterTab } from "./CoverLetterTab";
import { SettingsTab } from "./SettingsTab";

// ─── ResumeSidebar ─────────────────────────────────────────────────────────
// A full workspace system: navigation rail (240px) + scrollable content editor
// replacing the old card-based prototype sidebar entirely.

export default function ResumeSidebar({
  resumeData,
  setResumeData,
  selectedTemplate,
  setSelectedTemplate,
  onePageMode,
  setOnePageMode,
  pageSize,
  setPageSize,
  themeColor,
  setThemeColor,
  fontFamily,
  setFontFamily,
  headerStyle,
  setHeaderStyle,
  dividerStyle,
  setDividerStyle,
  initialTab = "builder",
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  // ── Contact helpers ────────────────────────────────────────────────────────
  const handleContactChange = (newContact) => {
    setResumeData((prev) => ({ ...prev, contact: newContact }));
  };

  // ── Section helpers ────────────────────────────────────────────────────────
  const handleSectionUpdate = (sectionId, newPayload) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, payload: newPayload } : s
      ),
    }));
  };

  const handleSectionDelete = (sectionId) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }));
  };

  const handleAddCustomSection = (type) => {
    const id = `custom-${type.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id,
          title: type,
          type: "custom",
          collapsed: false,
          payload: { text: "" },
        },
      ],
    }));
  };

  return (
    <div
      className="
        flex
        h-full
        border-[3px]
        border-black
        bg-[#0f0f0f]
        shadow-[6px_6px_0px_0px_black]
        overflow-hidden
      "
    >
      {/* Left navigation rail */}
      <WorkspaceNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Right content editor – scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0f0f0f]">

        {/* Tab header strip */}
        <div className="sticky top-0 z-10 border-b-[3px] border-black bg-[#0a0a0a] px-4 py-3">
          <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white">
            {activeTab === "builder"   && "Resume Builder"}
            {activeTab === "templates" && "Template Gallery"}
            {activeTab === "ats"       && "ATS Checker"}
            {activeTab === "cover"     && "Cover Letter"}
            {activeTab === "settings"  && "Theme Studio"}
          </h2>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-600">
            {activeTab === "builder"   && "Edit your resume content"}
            {activeTab === "templates" && "Choose a design template"}
            {activeTab === "ats"       && "Optimize for applicant tracking systems"}
            {activeTab === "cover"     && "Write a tailored cover letter"}
            {activeTab === "settings"  && "Customize fonts, colors & layout"}
          </p>
        </div>

        {/* Tab content */}
        <div className="pt-4">
          {activeTab === "builder" && (
            <div className="px-4">
              <BuilderTab
                resumeData={resumeData}
                onContactChange={handleContactChange}
                onSectionUpdate={handleSectionUpdate}
                onSectionDelete={handleSectionDelete}
                onAddCustomSection={handleAddCustomSection}
              />
            </div>
          )}

          {activeTab === "templates" && (
            <TemplatesTab
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
            />
          )}

          {activeTab === "ats" && (
            <ATSTab resumeData={resumeData} />
          )}

          {activeTab === "cover" && (
            <CoverLetterTab contact={resumeData?.contact} />
          )}

          {activeTab === "settings" && (
            <SettingsTab
              pageSize={pageSize}
              setPageSize={setPageSize}
              onePageMode={onePageMode}
              setOnePageMode={setOnePageMode}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              headerStyle={headerStyle}
              setHeaderStyle={setHeaderStyle}
              dividerStyle={dividerStyle}
              setDividerStyle={setDividerStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
