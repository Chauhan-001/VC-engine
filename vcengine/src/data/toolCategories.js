import pdfIcon from "../assets/pdf.webp";
import audioIcon from "../assets/audio.webp";
import imageIcon from "../assets/image.webp";
import videoIcon from "../assets/video.webp";
import resumeIcon from "../assets/resume.webp";

export const toolCategories = [
  {
    title: "PDF SUITE",
    badge: "13 TOOLS AVAILABLE",
    icon: pdfIcon,
    color: "#0066ff",
    featured: true,

    tools: [
      { name: "PDF Merger", path: "/pdf/merge" },
      { name: "PDF Splitter", path: "/pdf/split" },
      { name: "PDF Compressor", path: "/pdf/compress" },
      { name: "Delete Pages", path: "/pdf/delete-pages" },
      { name: "Extract Pages", path: "/pdf/extract-pages" },
      { name: "Reorder Pages", path: "/pdf/reorder-pages" },
      { name: "Page Numbers", path: "/pdf/page-numbers" },
      { name: "Add Watermark", path: "/pdf/watermark" },
      { name: "Protect PDF", path: "/pdf/protect" },
      { name: "Unlock PDF", path: "/pdf/unlock" },
      { name: "Metadata Editor", path: "/pdf/metadata" },
      { name: "Images to PDF", path: "/pdf/images-to-pdf" },
      { name: "PDF to Images", path: "/pdf/pdf-to-images" },
    ],
  },

  {
    title: "AUDIO STUDIO",
    badge: "MASTERING LAB",
    icon: audioIcon,
    color: "#ff6b35",
    featured: true,

    tools: [
      { name: "Audio Trimmer", path: "/audio/trim" },
      { name: "Audio Merger", path: "/audio/merger" },
      { name: "Audio Splitter", path: "/audio/splitter" },
      { name: "Volume Booster", path: "/audio/volume-booster" },
      { name: "Speed Changer", path: "/audio/speed-changer" },
      { name: "Pitch Changer", path: "/audio/pitch-changer" },
      { name: "Reverse Audio", path: "/audio/reverse" },
      { name: "Fade In Audio", path: "/audio/fade-in" },
      { name: "Fade Out Audio", path: "/audio/fade-out" },
      { name: "MP3 to WAV", path: "/audio/mp3-to-wav" },
      { name: "WAV to MP3", path: "/audio/wav-to-mp3" },
      { name: "OGG to MP3", path: "/audio/ogg-to-mp3" },
      
    ],
  },

  {
    title: "IMAGE LAB",
    icon: imageIcon,
    color: "#ff4d4d",

    tools: [
      { name: "Image Compressor", path: "/image/compress" },
      { name: "JPG to PNG", path: "/image/jpg-to-png" },
      { name: "PNG to JPG", path: "/image/png-to-jpg" },
      { name: "WEBP to PNG", path: "/image/webp-to-png" },
      { name: "PNG to WEBP", path: "/image/png-to-webp" },
      { name: "SVG to PNG", path: "/image/svg-to-png" },
    ],
  },

  {
    title: "VIDEO STUDIO",
    icon: videoIcon,
    color: "#0066ff",

    tools: [
      { name: "Video Compressor", path: "/video/compress" },
      { name: "Video to Audio", path: "/video/to-audio" },
      { name: "Video to GIF", path: "/video/to-gif" },
      { name: "Images to Video", path: "/video/images-to-video" },
    ],
  },

  {
    title: "RESUME STUDIO",
    icon: resumeIcon,
    color: "#3ECF8E",

    tools: [
      { name: "Resume Builder", path: "/resume/builder" },
    ],
  },
];