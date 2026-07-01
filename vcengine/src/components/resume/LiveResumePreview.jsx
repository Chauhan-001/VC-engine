import { useMemo, useRef } from "react";
import { PAGE_SIZES, TEMPLATES, FONTS, DIVIDERS } from "../../utils/resume/templates";
import { downloadResumePDF } from "../../utils/resume/export";

function formatPhone(p) {
  if (!p) return "";
  return p;
}

function Section({ section, accentColor, headerStyle, dividerStyle, onePageMode }) {
  if (section.collapsed) return null;

  const title = section.title;
  const payload = section.payload || {};
  const dividerClass = DIVIDERS[dividerStyle] || DIVIDERS.Line;
  const isCompact = onePageMode;

  return (
    <div className={isCompact ? "mb-2" : "mb-4"}>
      <div
        className={`font-mono text-[10px] font-black uppercase tracking-[0.15em] ${dividerClass}`}
        style={{ color: accentColor }}
      >
        {title}
      </div>

      <div className={isCompact ? "mt-1 text-[11px] leading-4" : "mt-2 text-[13px] leading-5"}>
        {title === "Contact" && (
          <div className="space-y-0.5">
            {(payload.email || payload.phone || payload.location || payload.links) && (
              <div className="text-gray-600">
                {[payload.email, payload.phone ? `📞 ${payload.phone}` : null, payload.location, payload.links].filter(Boolean).join(" | ")}
              </div>
            )}
          </div>
        )}

        {title === "Summary" && (
          <p style={{ color: "#333" }}>{payload.text || ""}</p>
        )}

        {title === "Education" && (
          <div className="space-y-2">
            {(payload.items || []).map((it, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{it.degree || ""}</div>
                <div className="text-gray-600">{it.school || ""} {it.dates ? `• ${it.dates}` : ""}</div>
                {it.cgpa && <div className="text-gray-500">CGPA: {it.cgpa}</div>}
                {it.achievements && <div className="text-gray-600 mt-1">{it.achievements}</div>}
              </div>
            ))}
          </div>
        )}

        {title === "Experience" && (
          <div className="space-y-3">
            {(payload.items || []).map((it, idx) => (
              <div key={idx}>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-bold text-gray-900">{it.role || ""}</div>
                  <div className="text-gray-500 text-xs">{it.dates || ""}</div>
                </div>
                <div className="text-gray-600">{it.company || ""} {it.location ? `• ${it.location}` : ""}</div>
                {it.description && <div className="text-gray-600 mt-1">{it.description}</div>}
                {(it.bullets || []).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 space-y-0.5">
                    {(it.bullets || []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                {(it.tags || []).length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(it.tags || []).map((t, i) => (
                      <span key={i} className="border border-gray-300 bg-gray-50 px-2 py-0.5 text-[10px] font-mono uppercase text-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {title === "Projects" && (
          <div className="space-y-2">
            {(payload.items || []).map((it, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{it.name || ""}</div>
                {it.description && <div className="text-gray-600">{it.description}</div>}
                {(it.achievements || []).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 space-y-0.5">
                    {(it.achievements || []).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                )}
                {(it.tech || []).length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(it.tech || []).map((t, i) => (
                      <span key={i} className="border border-gray-300 bg-gray-50 px-2 py-0.5 text-[10px] font-mono text-gray-700">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {title === "Skills" && (
          <div className="space-y-2">
            {(payload.categories || []).map((c, i) => (
              <div key={i}>
                <div className="font-mono text-[11px] font-bold uppercase text-gray-700">{c.name}</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {(c.tags || c.skills || []).map((t, j) => (
                    <span key={j} className="border border-gray-300 bg-gray-50 px-2 py-0.5 text-[10px] font-mono text-gray-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {title === "Certifications" && (
          <div className="space-y-1">
            {(payload.items || []).map((item, idx) => (
              <div key={idx} className="text-gray-700">• {item.name || ""} {item.issuer ? `- ${item.issuer}` : ""} {item.date ? `(${item.date})` : ""}</div>
            ))}
          </div>
        )}

        {title === "Research" && (
          <div className="space-y-2">
            {(payload.items || []).map((item, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{item.title || ""}</div>
                <div className="text-gray-600">{item.institution || ""}</div>
                {item.description && <div className="text-gray-600 mt-1">{item.description}</div>}
              </div>
            ))}
          </div>
        )}

        {title === "Publications" && (
          <div className="space-y-2">
            {(payload.items || []).map((item, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{item.title || ""}</div>
                <div className="text-gray-600">{item.journal || ""} • {item.year || ""}</div>
              </div>
            ))}
          </div>
        )}

        {title === "Conferences" && (
          <div className="space-y-2">
            {(payload.items || []).map((item, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{item.name || ""}</div>
                <div className="text-gray-600">{item.location || ""} • {item.date || ""}</div>
              </div>
            ))}
          </div>
        )}

        {title === "Teaching" && (
          <div className="space-y-2">
            {(payload.items || []).map((item, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{item.course || ""}</div>
                <div className="text-gray-600">{item.institution || ""} • {item.role || ""}</div>
              </div>
            ))}
          </div>
        )}

        {title === "Grants" && (
          <div className="space-y-2">
            {(payload.items || []).map((item, idx) => (
              <div key={idx}>
                <div className="font-bold text-gray-900">{item.title || ""}</div>
                <div className="text-gray-600">{item.amount ? `$${item.amount}` : ""} • {item.year || ""}</div>
              </div>
            ))}
          </div>
        )}

        {title === "Achievements" && (
          <div className="space-y-1">
            {(payload.items || []).map((item, idx) => (
              <div key={idx} className="text-gray-700">• {item.achievement || item.text || ""}</div>
            ))}
          </div>
        )}

        {!["Contact", "Summary", "Education", "Experience", "Projects", "Skills", "Certifications", "Research", "Publications", "Conferences", "Teaching", "Grants", "Achievements"].includes(title) && (
          <p style={{ color: "#333" }}>{payload.text || ""}</p>
        )}
      </div>
    </div>
  );
}

export default function LiveResumePreview({
  resumeData,
  template,
  pageSize,
  zoomLevel,
  onePageMode,
  themeColor,
  fontFamily,
  headerStyle,
  dividerStyle,
}) {
  const contact = resumeData?.contact || {};
  const sections = resumeData?.sections || [];
  const accentColor = themeColor || "#0066ff";

  const size = PAGE_SIZES[pageSize] || PAGE_SIZES.A4;
  const fontStack = FONTS[fontFamily] || FONTS.Inter;

  const isCompact = onePageMode;

  const padding = isCompact ? "p-4" : "px-10 py-8";
  const nameSize = isCompact ? "text-xl" : "text-3xl";
  const headingSize = isCompact ? "text-xs" : "text-sm";
  const sectionSpacing = isCompact ? "mb-2" : "mb-4";

  const printRef = useRef(null);

  function handlePrint() {
    if (printRef.current) {
      printRef.current.print();
    }
  }

  return (
    <div className="border-[3px] border-black bg-[#0f0f0f] shadow-[6px_6px_0px_0px_black] flex flex-col">
      <div className="mb-4 flex items-center justify-between flex-none">
        <div>
          <div className="font-mono text-sm font-bold uppercase text-white">Live Preview</div>
          <div className="mt-1 font-mono text-xs uppercase text-gray-400">
            Template: {template} • {pageSize} • {isCompact ? "One Page" : "Standard"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadResumePDF(printRef, "resume")}
            className="border-[2px] border-black bg-[#0066ff] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
          >
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="border-[2px] border-black bg-[#111] px-3 py-2 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all"
          >
            Print
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex justify-center bg-[#1a1a1a]">
        <div
          className={`bg-white text-black origin-top-left transition-transform`}
          style={{
            width: size.width,
            minHeight: size.height,
            transform: `scale(${zoomLevel})`,
            fontFamily: fontStack,
          }}
          ref={printRef}
        >
          <div className={padding}>
            {/* Header */}
            <div className="flex items-start justify-between gap-6 mb-4">
              <div className="flex-1">
                <div className={`font-black uppercase text-gray-900 ${nameSize}`}>
                  {contact.name || ""}
                </div>
                <div className={`mt-1 font-bold uppercase text-gray-700 ${headingSize}`}>
                  {contact.headline || ""}
                </div>
                {(contact.location || contact.email || contact.phone || contact.links) && (
                  <div className={`mt-2 text-gray-600 ${isCompact ? "text-[10px]" : "text-xs"}`}>
                    {contact.location && <div>{contact.location}</div>}
                    <div>
                      {contact.email}
                      {contact.phone ? ` • ${contact.phone}` : ""}
                    </div>
                    {contact.links && <div>{contact.links}</div>}
                  </div>
                )}
              </div>
              {!isCompact && (
                <div className="border-2 border-black px-4 py-2 bg-gray-50">
                  <div className="font-mono text-[10px] uppercase text-gray-600">Resume</div>
                </div>
              )}
            </div>

            {/* Sections */}
            <div className={sectionSpacing}>
              {sections.map((s) => (
                <Section
                  key={s.id}
                  section={s}
                  accentColor={accentColor}
                  headerStyle={headerStyle}
                  dividerStyle={dividerStyle}
                  onePageMode={isCompact}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
