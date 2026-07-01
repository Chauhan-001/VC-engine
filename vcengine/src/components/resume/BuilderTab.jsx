import { useState } from "react";
import {
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Brain,
  Plus,
  ChevronDown,
  ChevronRight,
  Grip,
  Copy,
  Trash2,
  Globe,
  Wand2,
  Minimize2,
  Maximize2,
  Zap,
} from "lucide-react";
import Github from "../../assets/github.png";
import Linkedin from "../../assets/linkedin.png";

// ─── helpers ───────────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = "text", half }) {
  return (
    <div className={half ? "" : "col-span-2"}>
      <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          border-[2px]
          border-[#222]
          bg-[#111]
          px-3
          py-2.5
          font-mono
          text-sm
          text-white
          placeholder-gray-600
          outline-none
          transition-colors
          focus:border-[#0066ff]
        "
      />
    </div>
  );
}

function SectionHeader({ icon: Icon, title, count, expanded, onToggle, accentColor = "#0066ff" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        border-[2px]
        border-black
        bg-[#161616]
        px-4
        py-3
        text-left
        shadow-[3px_3px_0px_0px_black]
        transition-all
        hover:-translate-y-[1px]
        hover:shadow-[4px_4px_0px_0px_black]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-7 w-7 items-center justify-center border-[2px] border-black"
          style={{ background: accentColor }}
        >
          <Icon size={13} className="text-white" />
        </div>
        <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
          {title}
        </span>
        {count != null && (
          <span className="font-mono text-[10px] text-gray-500">({count})</span>
        )}
      </div>
      {expanded ? (
        <ChevronDown size={14} className="text-gray-500" />
      ) : (
        <ChevronRight size={14} className="text-gray-500" />
      )}
    </button>
  );
}

function ActionChip({ label, onClick, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        border-[2px]
        border-black
        px-3
        py-1.5
        font-mono
        text-[10px]
        font-bold
        uppercase
        tracking-wide
        shadow-[2px_2px_0px_0px_black]
        transition-all
        hover:-translate-y-[1px]
        hover:shadow-[3px_3px_0px_0px_black]
        ${accent
          ? "bg-[#0066ff] text-white"
          : "bg-[#111] text-gray-300 hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}

// ─── Personal Information ───────────────────────────────────────────────────

function PersonalInfoPanel({ contact, onChange }) {
  const set = (key) => (val) => onChange({ ...contact, [key]: val });

  return (
    <div className="space-y-4 px-4 pb-4">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t-[2px] border-[#1a1a1a]">
        <ActionChip label="Load Sample" onClick={() => onChange({
          name: "Alex Johnson",
          headline: "Senior Software Engineer",
          email: "alex@example.com",
          phone: "+1 (555) 000-0001",
          location: "San Francisco, CA",
          linkedin: "linkedin.com/in/alexjohnson",
          github: "github.com/alexjohnson",
          portfolio: "alexjohnson.dev",
          website: "",
        })} />
        <ActionChip label="Import JSON" onClick={() => {}} />
        <ActionChip label="Clear All" onClick={() => onChange({ name:"",headline:"",email:"",phone:"",location:"",linkedin:"",github:"",portfolio:"",website:"" })} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
          <input
            value={contact.name || ""}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Alex Johnson"
            className="w-full border-[2px] border-[#222] bg-[#111] px-3 py-2.5 font-mono text-base font-bold text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Professional Title</label>
          <input
            value={contact.headline || ""}
            onChange={(e) => set("headline")(e.target.value)}
            placeholder="Senior Software Engineer"
            className="w-full border-[2px] border-[#222] bg-[#111] px-3 py-2.5 font-mono text-sm text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
          />
        </div>

        <Field label="Location" value={contact.location} onChange={set("location")} placeholder="City, State" />
        <Field label="Phone" value={contact.phone} onChange={set("phone")} placeholder="+1 555 000 0000" type="tel" />
        <div className="col-span-2">
          <Field label="Email" value={contact.email} onChange={set("email")} placeholder="you@email.com" type="email" />
        </div>

        {/* Social Links */}
        <div className="col-span-2 mt-2 space-y-2">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-600">Social & Links</p>
          {[
            { key: "linkedin", icon: Globe, placeholder: "linkedin.com/in/you" },
            { key: "github", icon: Globe, placeholder: "github.com/you" },
            { key: "portfolio", icon: Globe, placeholder: "yourportfolio.dev" },
            { key: "website", icon: Globe, placeholder: "yourwebsite.com" },
          ].map(({ key, icon: Icon, placeholder }) => (
            <div key={key} className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border-[2px] border-[#222] bg-[#111]">
                <Icon size={13} className="text-gray-500" />
              </div>
              <input
                value={contact[key] || ""}
                onChange={(e) => set(key)(e.target.value)}
                placeholder={placeholder}
                className="flex-1 border-[2px] border-[#222] bg-[#111] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Professional Summary ───────────────────────────────────────────────────

function SummaryPanel({ section, onUpdate }) {
  const text = section?.payload?.text || "";
  const set = (val) => onUpdate(section.id, { ...section.payload, text: val });

  return (
      <div className="px-4 pb-4 space-y-3 pt-3">
        <textarea
          value={text}
          onChange={(e) => set(e.target.value)}
          placeholder="Write a compelling 2-3 sentence summary of your professional background, key expertise, and career goals..."
          rows={6}
          className="
            w-full
            resize-y
            border-[2px]
            border-[#222]
            bg-[#111]
            px-4
            py-3
            font-mono
            text-sm
            leading-relaxed
            text-white
            placeholder-gray-600
            outline-none
            focus:border-[#0066ff]
            transition-colors
          "
        />
        <p className="font-mono text-[10px] text-gray-600">{text.length} chars · ~{Math.ceil(text.split(/\s+/).filter(Boolean).length / 150)} page line(s)</p>
      </div>
  );
}

// ─── Experience ─────────────────────────────────────────────────────────────

function ExperienceItem({ item, idx, onChange, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(true);
  const set = (key) => (val) => onChange({ ...item, [key]: val });

  return (
    <div className="border-[2px] border-[#222] bg-[#111]">
      {/* Item Header */}
      <div className="flex items-center justify-between border-b-[2px] border-[#1a1a1a] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Grip size={12} className="text-gray-600 cursor-grab" />
          <button type="button" onClick={() => setOpen(!open)} className="font-mono text-xs font-bold uppercase text-white hover:text-[#0066ff] transition-colors">
            {item.role || item.company || `Experience ${idx + 1}`}
          </button>
          {item.company && <span className="font-mono text-[10px] text-gray-500">@ {item.company}</span>}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setOpen(!open)} className="p-1 text-gray-600 hover:text-white transition-colors">
            {open ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
          </button>
          <button type="button" onClick={onDuplicate} className="p-1 text-gray-600 hover:text-[#0066ff] transition-colors">
            <Copy size={11} />
          </button>
          <button type="button" onClick={onDelete} className="p-1 text-gray-600 hover:text-red-400 transition-colors">
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-3 p-3">
          <div className="col-span-2">
            <Field label="Company" value={item.company} onChange={set("company")} placeholder="Google" />
          </div>
          <div className="col-span-2">
            <Field label="Role / Title" value={item.role} onChange={set("role")} placeholder="Senior Software Engineer" />
          </div>
          <Field label="Location" value={item.location} onChange={set("location")} placeholder="Mountain View, CA" half />
          <Field label="Dates" value={item.dates} onChange={set("dates")} placeholder="Jan 2022 – Present" half />

          <div className="col-span-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Description</label>
            <textarea
              rows={3}
              value={item.description || ""}
              onChange={(e) => set("description")(e.target.value)}
              placeholder="Brief role description..."
              className="w-full resize-y border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Key Achievements (one per line)</label>
            <textarea
              rows={4}
              value={(item.bullets || []).join("\n")}
              onChange={(e) => set("bullets")(e.target.value.split("\n"))}
              placeholder="• Reduced latency by 40%&#10;• Led team of 5 engineers"
              className="w-full resize-y border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
            />
          </div>

          <div className="col-span-2">
            <Field label="Tech Stack (comma separated)" value={(item.tags || []).join(", ")} onChange={(v) => set("tags")(v.split(",").map((s) => s.trim()))} placeholder="React, Node.js, AWS, PostgreSQL" />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id={`remote-${idx}`}
              checked={!!item.remote}
              onChange={(e) => set("remote")(e.target.checked)}
              className="h-4 w-4 accent-[#0066ff]"
            />
            <label htmlFor={`remote-${idx}`} className="font-mono text-[10px] uppercase text-gray-500 cursor-pointer">Remote</label>
          </div>
        </div>
      )}
    </div>
  );
}

function ExperiencePanel({ section, onUpdate }) {
  const items = section?.payload?.items || [];
  const setItems = (next) => onUpdate(section.id, { ...section.payload, items: next });

  const addItem = () => setItems([...items, { company: "", role: "", location: "", dates: "", description: "", bullets: [], tags: [], remote: false }]);
  const updateItem = (i, val) => setItems(items.map((it, idx) => idx === i ? val : it));
  const duplicateItem = (i) => setItems([...items.slice(0, i + 1), { ...items[i] }, ...items.slice(i + 1)]);
  const deleteItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <div className="px-4 pb-4 pt-3 space-y-3">
      {items.map((item, i) => (
        <ExperienceItem
          key={i}
          item={item}
          idx={i}
          onChange={(val) => updateItem(i, val)}
          onDuplicate={() => duplicateItem(i)}
          onDelete={() => deleteItem(i)}
        />
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex w-full items-center justify-center gap-2 border-[2px] border-dashed border-[#333] bg-transparent px-4 py-3 font-mono text-xs font-bold uppercase text-gray-500 transition-all hover:border-[#0066ff] hover:text-[#0066ff]"
      >
        <Plus size={13} /> Add Experience
      </button>
    </div>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function ProjectItem({ item, idx, onChange, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(true);
  const set = (key) => (val) => onChange({ ...item, [key]: val });

  return (
    <div className="border-[2px] border-[#222] bg-[#111]">
      <div className="flex items-center justify-between border-b-[2px] border-[#1a1a1a] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Grip size={12} className="text-gray-600 cursor-grab" />
          <button type="button" onClick={() => setOpen(!open)} className="font-mono text-xs font-bold uppercase text-white hover:text-[#0066ff] transition-colors">
            {item.name || `Project ${idx + 1}`}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setOpen(!open)} className="p-1 text-gray-600 hover:text-white transition-colors">
            {open ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
          </button>
          <button type="button" onClick={onDuplicate} className="p-1 text-gray-600 hover:text-[#0066ff] transition-colors"><Copy size={11} /></button>
          <button type="button" onClick={onDelete} className="p-1 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={11} /></button>
        </div>
      </div>
      {open && (
        <div className="grid grid-cols-2 gap-3 p-3">
          <div className="col-span-2"><Field label="Project Name" value={item.name} onChange={set("name")} placeholder="Awesome Project" /></div>
          <div className="col-span-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Description</label>
            <textarea rows={3} value={item.description || ""} onChange={(e) => set("description")(e.target.value)} placeholder="What does it do?" className="w-full resize-y border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors" />
          </div>
          <Field label="GitHub URL" value={item.github} onChange={set("github")} placeholder="github.com/you/project" half />
          <Field label="Live URL" value={item.liveUrl} onChange={set("liveUrl")} placeholder="project.live.dev" half />
          <Field label="Your Role" value={item.role} onChange={set("role")} placeholder="Lead Developer" half />
          <Field label="Duration" value={item.duration} onChange={set("duration")} placeholder="3 months" half />
          <div className="col-span-2"><Field label="Tech Stack (comma separated)" value={(item.tech || []).join(", ")} onChange={(v) => set("tech")(v.split(",").map((s) => s.trim()))} placeholder="Next.js, MongoDB, Tailwind" /></div>
          <div className="col-span-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Key Achievements (one per line)</label>
            <textarea rows={3} value={(item.achievements || []).join("\n")} onChange={(e) => set("achievements")(e.target.value.split("\n"))} placeholder="• 500+ GitHub stars&#10;• Deployed to 10k users" className="w-full resize-y border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors" />
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsPanel({ section, onUpdate }) {
  const items = section?.payload?.items || [];
  const setItems = (next) => onUpdate(section.id, { ...section.payload, items: next });
  const addItem = () => setItems([...items, { name: "", description: "", github: "", liveUrl: "", role: "", duration: "", tech: [], achievements: [] }]);
  const updateItem = (i, val) => setItems(items.map((it, idx) => idx === i ? val : it));
  const duplicateItem = (i) => setItems([...items.slice(0, i + 1), { ...items[i] }, ...items.slice(i + 1)]);
  const deleteItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  return (
    <div className="px-4 pb-4 pt-3 space-y-3">
      {items.map((item, i) => (
        <ProjectItem key={i} item={item} idx={i} onChange={(val) => updateItem(i, val)} onDuplicate={() => duplicateItem(i)} onDelete={() => deleteItem(i)} />
      ))}
      <button type="button" onClick={addItem} className="flex w-full items-center justify-center gap-2 border-[2px] border-dashed border-[#333] bg-transparent px-4 py-3 font-mono text-xs font-bold uppercase text-gray-500 transition-all hover:border-[#0066ff] hover:text-[#0066ff]">
        <Plus size={13} /> Add Project
      </button>
    </div>
  );
}

// ─── Education ───────────────────────────────────────────────────────────────

function EducationPanel({ section, onUpdate }) {
  const items = section?.payload?.items || [];
  const setItems = (next) => onUpdate(section.id, { ...section.payload, items: next });
  const addItem = () => setItems([...items, { school: "", degree: "", cgpa: "", dates: "", achievements: "" }]);
  const updateItem = (i, val) => setItems(items.map((it, idx) => idx === i ? val : it));
  const deleteItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <div className="px-4 pb-4 pt-3 space-y-3">
      {items.map((item, i) => {
        const set = (key) => (val) => updateItem(i, { ...item, [key]: val });
        return (
          <div key={i} className="border-[2px] border-[#222] bg-[#111] p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase text-gray-500">Education {i + 1}</span>
              <button type="button" onClick={() => deleteItem(i)} className="p-1 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={11} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><Field label="College / University" value={item.school} onChange={set("school")} placeholder="MIT" /></div>
              <div className="col-span-2"><Field label="Degree & Major" value={item.degree} onChange={set("degree")} placeholder="B.Tech Computer Science" /></div>
              <Field label="CGPA / GPA" value={item.cgpa} onChange={set("cgpa")} placeholder="8.9 / 10.0" half />
              <Field label="Years" value={item.dates} onChange={set("dates")} placeholder="2020 – 2024" half />
              <div className="col-span-2">
                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Achievements</label>
                <textarea rows={2} value={item.achievements || ""} onChange={(e) => set("achievements")(e.target.value)} placeholder="Dean's List, Scholarship..." className="w-full resize-y border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors" />
              </div>
            </div>
          </div>
        );
      })}
      <button type="button" onClick={addItem} className="flex w-full items-center justify-center gap-2 border-[2px] border-dashed border-[#333] bg-transparent px-4 py-3 font-mono text-xs font-bold uppercase text-gray-500 transition-all hover:border-[#0066ff] hover:text-[#0066ff]">
        <Plus size={13} /> Add Education
      </button>
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

function SkillsPanel({ section, onUpdate }) {
  const payload = section?.payload || { categories: [], viewMode: "category" };
  const categories = payload.categories || [];
  const viewMode = payload.viewMode || "category";
  const setPayload = (p) => onUpdate(section.id, p);

  const MODES = ["category", "tags", "proficiency"];

  const addCategory = () => setPayload({ ...payload, categories: [...categories, { name: "", skills: "" }] });
  const updateCategory = (i, val) => setPayload({ ...payload, categories: categories.map((c, idx) => idx === i ? val : c) });
  const deleteCategory = (i) => setPayload({ ...payload, categories: categories.filter((_, idx) => idx !== i) });

  return (
    <div className="px-4 pb-4 pt-3 space-y-4">
      {/* View mode switcher */}
      <div className="flex gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setPayload({ ...payload, viewMode: m })}
            className={`
              border-[2px] border-black px-3 py-1.5 font-mono text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px]
              ${viewMode === m ? "bg-[#0066ff] text-white" : "bg-[#111] text-gray-400 hover:text-white"}
            `}
          >
            {m}
          </button>
        ))}
      </div>

      {categories.map((cat, i) => (
        <div key={i} className="border-[2px] border-[#222] bg-[#111] p-3 space-y-2">
          <div className="flex items-center gap-2">
            <input
              value={cat.name || ""}
              onChange={(e) => updateCategory(i, { ...cat, name: e.target.value })}
              placeholder={["Languages", "Frameworks", "Cloud", "Databases", "Tools"][i % 5]}
              className="flex-1 border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs font-bold uppercase text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
            />
            <button type="button" onClick={() => deleteCategory(i)} className="p-1 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={11} /></button>
          </div>
          <input
            value={cat.skills || ""}
            onChange={(e) => updateCategory(i, { ...cat, skills: e.target.value })}
            placeholder={viewMode === "proficiency" ? "React:95, Node.js:90, AWS:80" : "React, Node.js, TypeScript, AWS"}
            className="w-full border-[2px] border-[#222] bg-[#0a0a0a] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
          />
          {viewMode === "tags" && (
            <div className="flex flex-wrap gap-1 mt-1">
              {(cat.skills || "").split(",").filter(Boolean).map((s, si) => (
                <span key={si} className="border-[2px] border-[#0066ff] bg-[#0066ff22] px-2 py-0.5 font-mono text-[10px] text-[#0066ff]">{s.trim()}</span>
              ))}
            </div>
          )}
        </div>
      ))}
      <button type="button" onClick={addCategory} className="flex w-full items-center justify-center gap-2 border-[2px] border-dashed border-[#333] bg-transparent px-4 py-3 font-mono text-xs font-bold uppercase text-gray-500 transition-all hover:border-[#0066ff] hover:text-[#0066ff]">
        <Plus size={13} /> Add Category
      </button>
    </div>
  );
}

// ─── Custom Section ──────────────────────────────────────────────────────────

function CustomSectionPanel({ section, onUpdate, onDelete }) {
  const text = section?.payload?.text || "";
  return (
    <div className="px-4 pb-4 pt-3 space-y-3">
      <textarea
        rows={5}
        value={text}
        onChange={(e) => onUpdate(section.id, { ...section.payload, text: e.target.value })}
        placeholder={`Add your ${section.title} content here...`}
        className="w-full resize-y border-[2px] border-[#222] bg-[#111] px-3 py-2 font-mono text-xs text-white placeholder-gray-600 outline-none focus:border-[#0066ff] transition-colors"
      />
      <button type="button" onClick={() => onDelete(section.id)} className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-red-500 hover:text-red-400 transition-colors">
        <Trash2 size={11} /> Delete Section
      </button>
    </div>
  );
}

// ─── Builder Tab (main content editor) ─────────────────────────────────────

const SECTION_ICONS = {
  contact:    { icon: User,        color: "#0066ff", label: "Personal Information" },
  summary:    { icon: Wand2,       color: "#a855f7", label: "Professional Summary" },
  experience: { icon: Briefcase,   color: "#f59e0b", label: "Experience" },
  projects:   { icon: FolderGit2,  color: "#22c55e", label: "Projects" },
  education:  { icon: GraduationCap, color: "#ff3b30", label: "Education" },
  skills:     { icon: Brain,       color: "#06b6d4", label: "Skills" },
};

const CUSTOM_SECTION_TYPES = [
  "Hackathons", "Research", "Leadership", "Open Source",
  "Patents", "Volunteer", "Publications", "Awards", "Custom",
];

export function BuilderTab({ resumeData, onContactChange, onSectionUpdate, onSectionDelete, onAddCustomSection }) {
  const [openSections, setOpenSections] = useState(() => {
    const s = {};
    (resumeData?.sections || []).forEach((sec) => { s[sec.id] = !sec.collapsed; });
    s.contact = true;
    return s;
  });

  const toggle = (id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const sections = resumeData?.sections || [];

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* Personal Info */}
      {(() => {
        const cfg = SECTION_ICONS.contact;
        return (
          <div className="border-[3px] border-black bg-[#161616] shadow-[4px_4px_0px_0px_black]">
            <SectionHeader icon={cfg.icon} title={cfg.label} expanded={!!openSections.contact} onToggle={() => toggle("contact")} accentColor={cfg.color} />
            {openSections.contact && <PersonalInfoPanel contact={resumeData?.contact || {}} onChange={onContactChange} />}
          </div>
        );
      })()}

      {/* Dynamic Sections */}
      {sections.filter((s) => s.id !== "contact").map((section) => {
        const cfg = SECTION_ICONS[section.id] || { icon: Zap, color: "#666", label: section.title };
        const isOpen = !!openSections[section.id];

        return (
          <div key={section.id} className="border-[3px] border-black bg-[#161616] shadow-[4px_4px_0px_0px_black]">
            <SectionHeader icon={cfg.icon} title={cfg.label || section.title} count={
              section.payload?.items?.length ?? undefined
            } expanded={isOpen} onToggle={() => toggle(section.id)} accentColor={cfg.color} />
            {isOpen && (
              <>
                {section.id === "summary" && <SummaryPanel section={section} onUpdate={onSectionUpdate} />}
                {section.id === "experience" && <ExperiencePanel section={section} onUpdate={onSectionUpdate} />}
                {section.id === "projects" && <ProjectsPanel section={section} onUpdate={onSectionUpdate} />}
                {section.id === "education" && <EducationPanel section={section} onUpdate={onSectionUpdate} />}
                {section.id === "skills" && <SkillsPanel section={section} onUpdate={onSectionUpdate} />}
                {section.type === "custom" && <CustomSectionPanel section={section} onUpdate={onSectionUpdate} onDelete={onSectionDelete} />}
              </>
            )}
          </div>
        );
      })}

      {/* Add Custom Section */}
      <div className="border-[3px] border-black bg-[#161616] shadow-[4px_4px_0px_0px_black] p-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">Add Custom Section</p>
        <div className="flex flex-wrap gap-2">
          {CUSTOM_SECTION_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onAddCustomSection(t)}
              className="border-[2px] border-[#333] bg-[#111] px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-gray-400 shadow-[2px_2px_0px_0px_black] transition-all hover:border-[#0066ff] hover:text-[#0066ff] hover:-translate-y-[1px]"
            >
              + {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
