import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const coopAndCoepHeaders = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
};

// Split heavy, independently-cacheable vendor libraries into their own chunks
// so they are only downloaded when a route that uses them is visited.
function manualChunks(id) {
  if (!id.includes("node_modules")) return;

  if (id.includes("@ffmpeg")) return "vendor-ffmpeg";
  if (id.includes("pdfjs-dist") || id.includes("pdf-lib") || id.includes("@cantoo"))
    return "vendor-pdf";
  if (id.includes("wavesurfer")) return "vendor-wavesurfer";
  if (id.includes("framer-motion")) return "vendor-motion";
  if (id.includes("@dnd-kit")) return "vendor-dnd";
  if (id.includes("lucide-react")) return "vendor-icons";
  if (
    id.includes("/react/") ||
    id.includes("/react-dom/") ||
    id.includes("react-router") ||
    id.includes("scheduler")
  )
    return "vendor-react";
}

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: { headers: coopAndCoepHeaders },
  preview: { headers: coopAndCoepHeaders },

  build: {
    target: "es2020",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks,
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
