import { useState, useMemo } from "react";
import { Copy, Download } from "lucide-react";
import { downloadResumeTXT, downloadResumePDF } from "../../utils/resume/export";

const TONES = ["Professional", "Student", "Creative", "Technical", "Executive"];

const TEMPLATES = {
  Professional: (name, headline, company, jobTitle) => `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle || "open position"} at ${company || "your organization"}. As a ${headline || "dedicated professional"} with a proven track record of delivering results, I am excited about the opportunity to contribute to your team.

With a strong foundation in cutting-edge technologies and a passion for innovation, I have consistently delivered high-quality solutions that drive business value. My experience spans end-to-end development, cross-functional collaboration, and continuous improvement initiatives.

I am particularly drawn to ${company || "your organization"} because of its commitment to excellence and forward-thinking culture. I am confident that my skills and dedication make me a great fit for this role.

I would welcome the opportunity to discuss how I can contribute to your team. Thank you for considering my application.

Sincerely,
${name || "Your Name"}`,

  Student: (name, headline, company, jobTitle) => `Dear Hiring Manager,

I am excited to apply for the ${jobTitle || "internship position"} at ${company || "your organization"}. As a ${headline || "motivated student"} pursuing a degree in Computer Science, I am eager to bring my technical skills and enthusiasm to real-world projects.

My academic background has provided me with a strong foundation in software development, algorithms, and problem-solving. I have completed projects using modern technologies and am passionate about learning and growing in a professional environment.

I am drawn to ${company || "your organization"} because of its reputation for innovation and employee development. I am confident that my technical skills, combined with my dedication to continuous learning, make me a strong candidate for this position.

I would love the opportunity to discuss how I can contribute to your team. Thank you for considering my application.

Sincerely,
${name || "Your Name"}`,

  Creative: (name, headline, company, jobTitle) => `Hi there,

I couldn't help but get excited when I saw the ${jobTitle || "creative role"} opening at ${company || "your company"}. As a ${headline || "creative thinker"} who thrives on turning ideas into memorable experiences, I knew I had to reach out.

I believe great work comes from great stories. Throughout my career, I've focused on blending aesthetics with functionality to create digital products that resonate with users. From brand identity systems to interactive prototypes, I bring both craft and strategy to every project.

What excites me most about ${company || "your team"} is the chance to collaborate with talented people who value bold thinking and meticulous execution. I would love to bring my creative vision and technical skills to help shape your next big thing.

Let's chat about how I can help bring your vision to life.

Best,
${name || "Your Name"}`,

  Technical: (name, headline, company, jobTitle) => `Dear Hiring Manager,

I am applying for the ${jobTitle || "technical position"} at ${company || "your organization"}. As a ${headline || "technical specialist"} with deep expertise in software architecture and system design, I am eager to contribute to your engineering team.

My background includes building scalable distributed systems, optimizing database performance, and implementing robust CI/CD pipelines. I am passionate about writing clean, maintainable code and mentoring team members to achieve collective excellence.

I am particularly interested in ${company || "your organization"}'s technical challenges and the opportunity to work with modern cloud technologies. I am confident that my technical depth and problem-solving skills will deliver immediate impact.

I look forward to discussing how I can help your team achieve its technical goals.

Regards,
${name || "Your Name"}`,

  Executive: (name, headline, company, jobTitle) => `Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle || "executive position"} at ${company || "your organization"}. As a seasoned ${headline || "executive leader"} with a proven track record of driving organizational growth and operational excellence, I am confident in my ability to deliver strategic impact.

Throughout my career, I have led cross-functional teams, managed P&L responsibilities, and spearheaded digital transformation initiatives. My leadership philosophy centers on fostering innovation, building high-performing teams, and aligning technology solutions with business objectives.

I am deeply impressed by ${company || "your organization"}'s vision and market position. I am excited about the possibility of contributing my strategic expertise and leadership experience to help navigate your next phase of growth.

I welcome the opportunity to discuss how my background aligns with your strategic goals. Thank you for your consideration.

Sincerely,
${name || "Your Name"}`,
};

export function CoverLetterTab({ contact }) {
  const [tone, setTone] = useState("Professional");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [letterBody, setLetterBody] = useState("");

  const name = contact?.name || "Your Name";
  const headline = contact?.headline || "";

  const generatedLetter = useMemo(() => {
    if (!jobTitle && !company) return "";
    const template = TEMPLATES[tone] || TEMPLATES.Professional;
    return template(name, headline, company, jobTitle);
  }, [tone, jobTitle, company, name, headline]);

  function handleGenerate() {
    setLetterBody(generatedLetter);
  }

  function handleCopy() {
    navigator.clipboard.writeText(letterBody || generatedLetter);
  }

  function handleDownloadTXT() {
    downloadResumeTXT({ contact, sections: [] }, "cover-letter");
  }

  function handleDownloadPDF() {
    const printRef = { current: null };
    downloadResumePDF(printRef, "cover-letter");
  }

  return (
    <div className="flex flex-col gap-0 pb-8">
      <div className="border-b-[3px] border-black p-4">
        <h3 className="font-mono text-xs font-black uppercase tracking-wider text-white">Cover Letter Builder</h3>
        <p className="mt-1 font-mono text-[10px] text-gray-500">Generate a tailored cover letter from your profile</p>
      </div>

      <div className="border-b-[3px] border-black p-4 space-y-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">Target Role</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-1">Job Title</label>
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Software Engineer" className="w-full border-[2px] border-[#222] bg-[#111] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors" />
          </div>
          <div>
            <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-1">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Google" className="w-full border-[2px] border-[#222] bg-[#111] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors" />
          </div>
        </div>
      </div>

      <div className="border-b-[3px] border-black p-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Tone</p>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button key={t} type="button" onClick={() => setTone(t)}
              className={`border-[2px] border-black px-3 py-1.5 font-mono text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${tone === t ? "bg-[#0066ff] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b-[3px] border-black p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">Letter Content</p>
          <div className="flex gap-2">
            <button type="button" onClick={handleCopy} className="flex items-center gap-1 font-mono text-[9px] uppercase text-gray-600 hover:text-white transition-colors">
              <Copy size={10} /> Copy
            </button>
          </div>
        </div>
        <textarea value={letterBody || generatedLetter} onChange={(e) => setLetterBody(e.target.value)} rows={12}
          className="w-full resize-y border-[2px] border-[#222] bg-[#111] px-4 py-3 font-mono text-xs leading-relaxed text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors" />
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[9px] text-gray-600">{(letterBody || generatedLetter).length} chars</span>
          <div className="flex gap-2">
            <button type="button" onClick={handleDownloadTXT} className="flex items-center gap-1.5 border-[2px] border-black bg-[#22c55e] px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px]">
              <Download size={10} /> Export TXT
            </button>
            <button type="button" onClick={handleDownloadPDF} className="flex items-center gap-1.5 border-[2px] border-black bg-[#0066ff] px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px]">
              <Download size={10} /> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}