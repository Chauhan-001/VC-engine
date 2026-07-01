import JSZip from "jszip";

function sanitizeFileName(name) {
  return String(name || "image")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getOutputExtension(outputFormat) {
  switch (outputFormat) {
    case "jpg":
    case "jpeg":
      return "jpg";
    case "png":
      return "png";
    case "webp":
      return "webp";
    case "avif":
      return "avif";
    default:
      return "webp";
  }
}

export default async function downloadZip(images, outputFormat) {
  if (!images?.length) return;

  const zip = new JSZip();
  const extension = getOutputExtension(outputFormat);

  for (const image of images) {
    if (!image?.outputUrl) continue;
    const blob = await fetch(image.outputUrl).then((res) => res.blob());
    zip.file(`${sanitizeFileName(image.name)}.${extension}`, blob);
  }

  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(content);
  link.href = url;
  link.download = "compressed-images.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
