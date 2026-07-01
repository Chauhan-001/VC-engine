function getMimeType(outputFormat) {
  switch (outputFormat) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

function buildFileName(file, outputFormat) {
  const baseName = file.name.replace(/\.[^.]+$/, "") || "converted";
  return `${baseName}.${outputFormat}`;
}

async function loadImageAsBitmap(file) {
  if (file.type === "image/svg+xml") {
    const text = await file.text();
    const blob = new Blob([text], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Unable to load SVG image."));
      image.src = url;
    });
    URL.revokeObjectURL(url);
    return img;
  }

  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }

  const objectUrl = URL.createObjectURL(file);
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load image."));
    image.src = objectUrl;
  });
  URL.revokeObjectURL(objectUrl);
  return img;
}

export default async function convertImage(file, config) {
  if (!file) throw new Error("No file selected.");

  const bitmap = await loadImageAsBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported in this browser.");

  context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

  const mimeType = getMimeType(config.outputFormat);
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((nextBlob) => {
      if (nextBlob) resolve(nextBlob);
      else reject(new Error("Conversion failed."));
    }, mimeType);
  });

  bitmap.close?.();
  return {
    blob,
    fileName: buildFileName(file, config.outputExtension),
  };
}
