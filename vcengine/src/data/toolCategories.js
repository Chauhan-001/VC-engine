import pdfIcon from "../assets/pdf.png";
import audioIcon from "../assets/audio.png";
import imageIcon from "../assets/image.png";
import videoIcon from "../assets/video.png";
import resumeIcon from "../assets/resume.png";

export const toolCategories = [
  {
    title: "PDF SUITE",
    badge: "13 TOOLS AVAILABLE",
    icon: pdfIcon,
    color: "#0066ff",
    featured: true,
tools: [
  {
    name: "PDF Merger",
    path: "/pdf/merge",
  },

  {
    name: "PDF Splitter",
    path: "/pdf/split",
  },

  {
    name: "PDF Compressor",
    path: "/pdf/compress",
  },

  {
    name: "Delete Pages",
    path: "/pdf/delete-pages",
  },

  {
    name: "Extract Pages",
    path: "/pdf/extract-pages",
  },

  {
    name: "Reorder Pages",
    path: "/pdf/reorder-pages",
  },

  {
    name: "Page Numbers",
    path: "/pdf/page-numbers",
  },

  {
    name: "Add Watermark",
    path: "/pdf/watermark",
  },

  {
    name: "Protect PDF",
    path: "/pdf/protect",
  },

  {
    name: "Unlock PDF",
    path: "/pdf/unlock",
  },

  {
    name: "Metadata Editor",
    path: "/pdf/metadata",
  },

  {
    name: "Images to PDF",
    path: "/pdf/images-to-pdf",
  },

  {
    name: "PDF to Images",
    path: "/pdf/pdf-to-images",
  },
]
  },

  {
    title: "AUDIO STUDIO",
    badge: "MASTERING LAB",
    icon: audioIcon,
    color: "#ff6b35",
    featured: true,

    tools: [
      "Audio Trimmer",
      "Audio Merger",
      "Audio Splitter",
      "Volume Booster",
      "Speed Changer",
      "Pitch Changer",
      "Reverse Audio",
      "Fade In Audio",
      "Fade Out Audio",
      "MP3 to WAV",
      "WAV to MP3",
      "OGG to MP3",
      "Audio Visualizer",
    ],
  },

  {
    title: "IMAGE LAB",
    icon: imageIcon,
    color: "#ff4d4d",

    tools: [
      "Image Compressor",
      "Bulk Image Compressor",
      "JPG to PNG",
      "PNG to JPG",
      "WEBP to PNG",
      "PNG to WEBP",
      "SVG to PNG",
    ],
  },

  {
    title: "VIDEO STUDIO",
    icon: videoIcon,
    color: "#0066ff",

    tools: [
      "Video Compressor",
      "Video to Audio",
      "Video to GIF",
      "Images to Video",
    ],
  },

  {
    title: "RESUME STUDIO",
    icon: resumeIcon,
    color: "#3ECF8E",

    tools: [
      "Resume Builder",
      "Resume Templates",
      "ATS Resume Checker",
      "Cover Letter Builder",
    ],
  },
];