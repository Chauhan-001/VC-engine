const PAGE_SIZES = {
  A4: { width: "210mm", height: "297mm", label: "A4" },
  Letter: { width: "216mm", height: "279mm", label: "Letter" },
  Legal: { width: "216mm", height: "356mm", label: "Legal" },
};

const FONTS = {
  Inter: "'Inter', sans-serif",
  Roboto: "'Roboto', sans-serif",
  Poppins: "'Poppins', sans-serif",
  "Source Sans 3": "'Source Sans 3', sans-serif",
  Merriweather: "'Merriweather', serif",
};

const TEMPLATES = {
  chronological: {
    id: "chronological",
    title: "Chronological Resume",
    description: "Best for professionals with steady career growth.",
    bestUse: "Lists work experience in reverse chronological order.",
    sections: ["summary", "experience", "education", "skills"],
    example: "Software Engineer with 5+ years.",
  },
  functional: {
    id: "functional",
    title: "Functional Resume",
    description: "Best for freshers and career changers.",
    bestUse: "Skills-first layout.",
    sections: ["summary", "skills", "projects", "education", "certifications"],
    example: "Data Analyst focusing on Python and SQL.",
  },
  combination: {
    id: "combination",
    title: "Combination Resume",
    description: "Combines skills and experience.",
    bestUse: "Highlights both competencies and work history.",
    sections: ["summary", "skills", "experience", "projects", "education"],
    example: "React Native Developer.",
  },
  targeted: {
    id: "targeted",
    title: "Targeted Resume",
    description: "Customized for a specific job.",
    bestUse: "Tailored to a specific role.",
    sections: ["summary", "skills", "experience", "projects"],
    example: "Product Manager at Google.",
  },
  creative: {
    id: "creative",
    title: "Creative Resume",
    description: "For designers and creative professionals.",
    bestUse: "Visual layouts with portfolio emphasis.",
    sections: ["summary", "skills", "experience", "projects", "education"],
    example: "UX Designer with portfolio focus.",
  },
  mini: {
    id: "mini",
    title: "Mini Resume",
    description: "One-page networking resume.",
    bestUse: "Concise format for networking events.",
    sections: ["contact", "summary", "skills", "achievements"],
    example: "Backend Engineer specializing in Go.",
  },
  academic: {
    id: "academic",
    title: "Academic CV",
    description: "For researchers and academia.",
    bestUse: "Detailed academic record with publications.",
    sections: ["education", "research", "publications", "conferences", "teaching", "grants"],
    example: "PhD candidate in Computational Linguistics.",
  },
};

const HEADER_STYLES = {
  Modern: { contactRow: "row", badge: "modern" },
  Corporate: { contactRow: "row", badge: "corporate" },
  Minimal: { contactRow: "row", badge: "minimal" },
  Bold: { contactRow: "row", badge: "bold" },
};

const DIVIDERS = {
  Line: "border-b border-gray-200 pb-2 mb-3",
  Block: "bg-gray-100 px-3 py-1 mb-3 font-bold text-xs uppercase tracking-wider",
  Classic: "border-b-2 border-black pb-2 mb-3 font-bold text-xs uppercase tracking-wider",
  Minimal: "mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500",
};

export { PAGE_SIZES, FONTS, TEMPLATES, HEADER_STYLES, DIVIDERS };
