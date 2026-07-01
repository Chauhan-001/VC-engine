export function downloadResumePDF(printRef, fileName = "resume") {
  if (!printRef?.current) return;

  const content = printRef.current;

  const printWindow = window.open("", "_blank", "width=1200,height=800");
  if (!printWindow) {
    alert("Please allow popups to download PDF.");
    return;
  }

  const html = content.innerHTML;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${fileName}</title>
        <style>
          @page { margin: 0; size: auto; }
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 400);
}

export function downloadResumeTXT(resumeData, fileName = "resume") {
  const contact = resumeData?.contact || {};
  const sections = resumeData?.sections || [];

  const lines = [];

  lines.push((contact.name || "Your Name").toUpperCase());
  lines.push((contact.headline || "").toUpperCase());
  lines.push(
    [contact.location, contact.email, contact.phone, contact.links]
      .filter(Boolean)
      .join(" | ")
  );
  lines.push("");

  sections.forEach((section) => {
    if (section.collapsed) return;

    const title = section.title;
    const payload = section.payload || {};

    lines.push("─".repeat(40));
    lines.push(title.toUpperCase());
    lines.push("─".repeat(40));

    if (title === "Summary" && payload.text) {
      lines.push(payload.text);
    }

    if (title === "Experience" && payload.items) {
      payload.items.forEach((item) => {
        lines.push(`• ${item.role || "Role"} at ${item.company || "Company"} | ${item.dates || ""}`);
        if (item.bullets) {
          item.bullets.forEach((b) => lines.push(`  - ${b}`));
        }
      });
    }

    if (title === "Education" && payload.items) {
      payload.items.forEach((item) => {
        lines.push(`• ${item.degree || ""} - ${item.school || ""} | ${item.dates || ""}`);
      });
    }

    if (title === "Projects" && payload.items) {
      payload.items.forEach((item) => {
        lines.push(`• ${item.name || "Project"} | ${item.duration || ""}`);
        if (item.description) lines.push(`  ${item.description}`);
        if (item.achievements) {
          item.achievements.forEach((a) => lines.push(`  - ${a}`));
        }
      });
    }

    if (title === "Skills" && payload.categories) {
      payload.categories.forEach((cat) => {
        lines.push(`• ${cat.name || "Skills"}: ${(cat.tags || cat.skills || []).join(", ")}`);
      });
    }

    lines.push("");
  });

  const text = lines.join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
