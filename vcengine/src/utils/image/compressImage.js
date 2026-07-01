import getTargetDimensions from "./resizeImage";

function getMimeType(outputFormat) {
  switch (outputFormat) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    default:
      return "image/webp";
  }
}

function getFallbackMimeType(outputFormat) {
  if (outputFormat === "webp" || outputFormat === "avif") return "image/png";
  if (outputFormat === "png") return "image/jpeg";
  return "image/png";
}

function getEffectiveQuality(quality, compressionMode) {
  if (compressionMode === "lossless") return 1;
  if (compressionMode === "aggressive") return Math.max(0.45, Math.min(0.85, quality / 100));
  return Math.max(0.55, Math.min(0.95, quality / 100));
}

export default async function compressImage(file, state) {
  const bitmap = await createBitmapFromFile(file);
  const { width, height } = getTargetDimensions(
    bitmap.width,
    bitmap.height,
    state?.resizeMode || "original",
    state?.width,
    state?.height,
    state?.maintainAspectRatio !== false
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create canvas context");
  }

  context.drawImage(bitmap, 0, 0, width, height);

  const requestedOutputFormat = state?.outputFormat || "webp";
  const mimeType = getMimeType(requestedOutputFormat);
  const quality = getEffectiveQuality(state?.quality || 65, state?.compressionMode || "balanced");
  const blob = await new Promise((resolve) => {
    canvas.toBlob(
      (nextBlob) => {
        if (nextBlob) {
          resolve(nextBlob);
          return;
        }

        const fallbackMimeType = getFallbackMimeType(requestedOutputFormat);
        canvas.toBlob(
          (fallbackBlob) => {
            resolve(fallbackBlob || null);
          },
          fallbackMimeType,
          requestedOutputFormat === "png" ? undefined : quality
        );
      },
      mimeType,
      requestedOutputFormat === "png" ? undefined : quality
    );
  });

  if (!blob) {
    throw new Error("Compression failed");
  }

  bitmap.close?.();
  return {
    blob,
    width,
    height,
    outputFormat: requestedOutputFormat === "webp" || requestedOutputFormat === "avif" ? "png" : requestedOutputFormat,
  };
}

async function createBitmapFromFile(file) {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to read image"));
    };
    img.src = url;
  });
}
