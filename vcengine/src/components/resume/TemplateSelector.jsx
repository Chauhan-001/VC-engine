import { useMemo } from "react";

const TEMPLATES = {
  "Software Engineering": [
    "Modern Software Engineer",
    "FAANG Resume",
    "ATS Optimized Developer",
    "Startup Engineer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "DevOps Engineer",
    "Data Engineer",
  ],
  "UI/UX Design": [
    "UI UX Designer",
    "Graphic Designer",
    "Product Designer",
    "Motion Designer",
  ],
  "Business": ["MBA", "Product Manager", "Consultant", "Sales", "Marketing"],
  "Academic": [
    "Researcher",
    "Professor",
    "PhD Candidate",
    "Graduate Student",
  ],
  "Healthcare": ["Doctor", "Nurse", "Pharmacist", "Medical Researcher"],
  "General": [
    "Modern",
    "Minimal",
    "Corporate",
    "Creative",
    "ATS Optimized",
    "International CV",
  ],
};

export default function TemplateSelector({ selectedTemplate, onChange }) {
  const categories = useMemo(() => Object.keys(TEMPLATES), []);

  const category = useMemo(() => {
    for (const c of categories) {
      if (TEMPLATES[c].includes(selectedTemplate)) return c;
    }
    return categories[0];
  }, [categories, selectedTemplate]);

  const templates = TEMPLATES[category] || [];

  return (
    <div>
      <h3 className="font-mono text-sm font-bold uppercase text-white">Templates</h3>
      <p className="mt-1 font-mono text-xs uppercase text-gray-400">Profession-based resumes</p>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <select
          value={category}
          onChange={(e) => {
            const newCat = e.target.value;
            const first = TEMPLATES[newCat]?.[0];
            if (first) onChange(first);
          }}
          className="border-[2px] border-black bg-[#0f0f0f] px-3 py-2 font-mono text-xs uppercase text-white outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={selectedTemplate}
          onChange={(e) => onChange(e.target.value)}
          className="border-[2px] border-black bg-[#0f0f0f] px-3 py-2 font-mono text-xs uppercase text-white outline-none"
        >
          {templates.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

