const ACTION_VERBS = [
  "built", "designed", "created", "managed", "led", "developed", "improved",
  "increased", "reduced", "launched", "implemented", "optimized", "delivered",
];

const WEAK_VERBS = [
  "worked", "helped", "assisted", "responsible for", "duties included", "tasked with",
];

export function computeATSScore(resumeData) {
  const contact = resumeData?.contact || {};
  const sections = resumeData?.sections || [];
  let score = 0;
  const issues = [];

  const summary = sections.find((s) => s.id === "summary");
  const experience = sections.find((s) => s.id === "experience");
  const education = sections.find((s) => s.id === "education");
  const skills = sections.find((s) => s.id === "skills");
  const projects = sections.find((s) => s.id === "projects");

  const expItems = experience?.payload?.items || [];
  const skillCats = skills?.payload?.categories || [];
  const projItems = projects?.payload?.items || [];
  const summaryText = summary?.payload?.text || "";

  const allBullets = expItems.flatMap((e) => e.bullets || []);
  const allText = [summaryText, ...allBullets].join(" ").toLowerCase();

  score += checkContact(contact, issues);
  score += checkSummary(summaryText, issues);
  score += checkExperience(expItems, allText, issues);
  score += checkSkills(skillCats, issues);
  score += checkProjects(projItems, allText, issues);
  score += checkEducation(education, issues);
  score += checkLength(expItems, issues);

  return {
    score: Math.min(Math.max(score, 0), 100),
    issues,
    metrics: {
      contact: Math.min(checkContact(contact, []), 15),
      summary: Math.min(checkSummary(summaryText, []), 15),
      experience: Math.min(checkExperience(expItems, allText, []), 25),
      skills: Math.min(checkSkills(skillCats, []), 15),
      projects: Math.min(checkProjects(projItems, allText, []), 10),
      education: Math.min(checkEducation(education, []), 10),
      length: Math.min(checkLength(expItems, []), 10),
    },
  };
}

function checkContact(contact, issues) {
  let s = 0;
  if (!contact.email && !contact.phone) issues.push({ label: "Missing Contact Info", desc: "Add email and phone number", severity: "high" });
  if (contact.email) s += 5;
  if (contact.phone) s += 5;
  if (contact.linkedin || contact.github) s += 5;
  return Math.min(s, 15);
}

function checkSummary(text, issues) {
  let s = 0;
  if (text.length < 50) issues.push({ label: "Weak Summary", desc: "Add a 2-3 sentence professional summary", severity: "medium" });
  if (text.length > 100) s += 8;
  if (text.length > 300) s += 7;
  return Math.min(s, 15);
}

function checkExperience(items, allText, issues) {
  let s = 0;
  if (items.length === 0) issues.push({ label: "Missing Experience", desc: "Add work experience entries", severity: "high" });
  if (items.length > 0) s += 5;

  const strongVerbs = ACTION_VERBS.filter((v) => allText.includes(v)).length;
  const weakVerbs = WEAK_VERBS.filter((v) => allText.includes(v)).length;

  if (strongVerbs > 0) s += Math.min(strongVerbs * 2, 8);
  if (weakVerbs > 0) issues.push({ label: "Weak Action Verbs", desc: "Replace passive phrases with active verbs", severity: "medium" });

  const hasMetrics = (/\d+%|\$\d+|\d+ percent|\d+ users|\d+ clients/.test(allText));
  if (hasMetrics) s += 7;
  else issues.push({ label: "Missing Metrics", desc: "Add numbers, percentages, and measurable outcomes", severity: "high" });

  return Math.min(s, 25);
}

function checkSkills(categories, issues) {
  let s = 0;
  if (categories.length === 0) issues.push({ label: "Missing Skills Section", desc: "Add technical and soft skills", severity: "medium" });
  if (categories.length > 0) s += 8;
  const totalSkills = categories.reduce((acc, c) => acc + (c.tags || c.skills || "").split(",").filter(Boolean).length, 0);
  if (totalSkills >= 8) s += 7;
  return Math.min(s, 15);
}

function checkProjects(items, allText, issues) {
  let s = 0;
  if (items.length > 0) s += 5;
  if (allText.includes("github") || allText.includes("portfolio")) s += 5;
  return Math.min(s, 10);
}

function checkEducation(education, issues) {
  let s = 0;
  const items = education?.payload?.items || [];
  if (items.length > 0) s += 10;
  else issues.push({ label: "Missing Education", desc: "Add your educational background", severity: "low" });
  return Math.min(s, 10);
}

function checkLength(items, issues) {
  let s = 10;
  if (items.length > 5) { s = 7; issues.push({ label: "Resume Length", desc: "Resume may be too long", severity: "low" }); }
  if (items.length > 8) { s = 3; }
  return Math.min(s, 10);
}

export { ACTION_VERBS, WEAK_VERBS };
