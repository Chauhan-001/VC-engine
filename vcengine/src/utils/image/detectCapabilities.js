export default function detectCapabilities() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  function testMimeType(mimeType) {
    try {
      if (!canvas || !ctx || typeof canvas.toDataURL !== "function") {
        return false;
      }
      const dataUrl = canvas.toDataURL(mimeType, 0.5);
      return dataUrl.startsWith(`data:${mimeType}`);
    } catch {
      return false;
    }
  }

  return {
    webp: { supported: testMimeType("image/webp") },
    avif: { supported: testMimeType("image/avif") },
    canvas: {
      toBlobSupported: typeof canvas?.toBlob === "function",
    },
  };
}
