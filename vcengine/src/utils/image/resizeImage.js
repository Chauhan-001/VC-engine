export default function getTargetDimensions(sourceWidth, sourceHeight, resizeMode, width, height, maintainAspectRatio) {
  const parsedWidth = Number(width);
  const parsedHeight = Number(height);

  if (resizeMode === "75") {
    return {
      width: Math.max(1, Math.round(sourceWidth * 0.75)),
      height: Math.max(1, Math.round(sourceHeight * 0.75)),
    };
  }

  if (resizeMode === "50") {
    return {
      width: Math.max(1, Math.round(sourceWidth * 0.5)),
      height: Math.max(1, Math.round(sourceHeight * 0.5)),
    };
  }

  if (resizeMode === "custom") {
    if (maintainAspectRatio) {
      const aspectRatio = sourceWidth / sourceHeight;
      if (Number.isFinite(parsedWidth) && parsedWidth > 0 && !Number.isFinite(parsedHeight)) {
        return {
          width: parsedWidth,
          height: Math.max(1, Math.round(parsedWidth / aspectRatio)),
        };
      }
      if (Number.isFinite(parsedHeight) && parsedHeight > 0 && !Number.isFinite(parsedWidth)) {
        return {
          width: Math.max(1, Math.round(parsedHeight * aspectRatio)),
          height: parsedHeight,
        };
      }
    }

    return {
      width: Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : sourceWidth,
      height: Number.isFinite(parsedHeight) && parsedHeight > 0 ? parsedHeight : sourceHeight,
    };
  }

  return {
    width: sourceWidth,
    height: sourceHeight,
  };
}
