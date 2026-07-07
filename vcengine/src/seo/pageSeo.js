// Centralized per-route SEO metadata. Keyed by route pathname.
// Used by <Seo /> to inject title, description, canonical, OG/Twitter and JSON-LD.
// Content is written to be useful and descriptive (not keyword-stuffed).

export const PAGE_SEO = {
  "/": {
    title: "VCEngine Media Suite — Free Client-Side PDF, Image, Audio & Video Tools",
    description:
      "All your digital tools directly in the browser. Compress, convert, merge and edit PDFs, images, audio and video with VCEngine — 100% private, no uploads, no accounts.",
    ogType: "website",
    keywords: [
      "online tools",
      "PDF compressor",
      "image converter",
      "audio editor",
      "video converter",
      "client-side tools",
    ],
    faq: [
      {
        q: "Are my files uploaded to a server?",
        a: "No. VCEngine processes every file entirely in your browser using WebAssembly. Your files never leave your device.",
      },
      {
        q: "Do I need to create an account?",
        a: "No account or sign-up is required. Every tool is free and runs instantly in your browser.",
      },
      {
        q: "Which file types are supported?",
        a: "PDFs, common image formats (JPG, PNG, WebP, AVIF, SVG), audio (MP3, WAV, OGG) and video for compression and conversion.",
      },
    ],
  },

  "/pdf/merge": {
    title: "Merge PDF Files Online — Free PDF Merger | VCEngine",
    description:
      "Combine multiple PDF files into a single document in your browser. Free, private and instant — no uploads required.",
    keywords: ["merge pdf", "combine pdf", "pdf joiner", "free pdf merger"],
  },
  "/pdf/split": {
    title: "Split PDF Online — Extract Pages for Free | VCEngine",
    description:
      "Split a PDF into separate files or extract specific pages. Works entirely client-side for maximum privacy.",
    keywords: ["split pdf", "extract pdf pages", "pdf splitter"],
  },
  "/pdf/compress": {
    title: "Compress PDF Online — Reduce PDF Size Free | VCEngine",
    description:
      "Shrink PDF file size without losing quality. Our in-browser PDF compressor is free, fast and fully private.",
    keywords: ["compress pdf", "reduce pdf size", "pdf optimizer"],
  },
  "/pdf/delete-pages": {
    title: "Delete PDF Pages Online — Free Page Remover | VCEngine",
    description:
      "Remove unwanted pages from any PDF quickly and privately, right in your browser.",
    keywords: ["delete pdf pages", "remove pdf pages", "pdf page deleter"],
  },
  "/pdf/extract-pages": {
    title: "Extract PDF Pages Online — Free Page Extractor | VCEngine",
    description:
      "Pull selected pages out of a PDF into a new file. No uploads, no waiting.",
    keywords: ["extract pdf pages", "pdf page extractor"],
  },
  "/pdf/reorder-pages": {
    title: "Reorder PDF Pages Online — Free Page Organizer | VCEngine",
    description:
      "Drag and drop to rearrange PDF pages into any order. Fully client-side and private.",
    keywords: ["reorder pdf pages", "organize pdf", "rotate pdf pages"],
  },
  "/pdf/page-numbers": {
    title: "Add Page Numbers to PDF — Free Online Tool | VCEngine",
    description:
      "Add customizable page numbers to your PDF documents in seconds, entirely in your browser.",
    keywords: ["add page numbers to pdf", "pdf page numbers", "number pdf pages"],
  },
  "/pdf/watermark": {
    title: "Add Watermark to PDF Online — Free Tool | VCEngine",
    description:
      "Stamp text or image watermarks onto your PDF pages. Private, fast and free.",
    keywords: ["pdf watermark", "add watermark to pdf", "watermark pdf"],
  },
  "/pdf/protect": {
    title: "Protect PDF with Password — Free Encryption Tool | VCEngine",
    description:
      "Encrypt your PDF with a password to keep it secure. Everything is processed locally in your browser.",
    keywords: ["protect pdf", "password protect pdf", "encrypt pdf"],
  },
  "/pdf/unlock": {
    title: "Unlock PDF Online — Remove Password Free | VCEngine",
    description:
      "Remove a known password from a PDF you own, directly in your browser.",
    keywords: ["unlock pdf", "remove pdf password", "decrypt pdf"],
  },
  "/pdf/metadata": {
    title: "Edit PDF Metadata Online — Free Metadata Editor | VCEngine",
    description:
      "View and edit PDF metadata — title, author, subject, keywords and more — entirely in your browser. No uploads required.",
    keywords: ["edit pdf metadata", "pdf metadata editor", "pdf properties"],
  },
  "/pdf/images-to-pdf": {
    title: "Convert Images to PDF — JPG/PNG to PDF Free | VCEngine",
    description:
      "Turn JPG, PNG and other images into a single PDF file. No uploads, fully private.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf"],
  },
  "/pdf/pdf-to-images": {
    title: "Convert PDF to Images — PDF to JPG/PNG Free | VCEngine",
    description:
      "Export every PDF page as a high-quality JPG or PNG image. Runs locally in your browser.",
    keywords: ["pdf to image", "pdf to jpg", "pdf to png"],
  },

  "/image/compress": {
    title: "Compress Images Online — Free Image Optimizer | VCEngine",
    description:
      "Reduce image file size with smart compression while keeping visual quality. Supports JPG, PNG, WebP and AVIF.",
    keywords: ["compress image", "image optimizer", "reduce image size"],
  },
  "/image/jpg-to-png": {
    title: "JPG to PNG Converter — Free Online Tool | VCEngine",
    description:
      "Convert JPG images to PNG with transparency support. Fast, free and private.",
    keywords: ["jpg to png", "convert jpg to png", "image converter"],
  },
  "/image/png-to-jpg": {
    title: "PNG to JPG Converter — Free Online Tool | VCEngine",
    description:
      "Convert PNG images to JPG to shrink file size. No uploads required.",
    keywords: ["png to jpg", "convert png to jpg", "image converter"],
  },
  "/image/webp-to-png": {
    title: "WebP to PNG Converter — Free Online Tool | VCEngine",
    description:
      "Convert WebP images to PNG easily in your browser, preserving quality.",
    keywords: ["webp to png", "convert webp to png"],
  },
  "/image/png-to-webp": {
    title: "PNG to WebP Converter — Free Online Tool | VCEngine",
    description:
      "Convert PNG to WebP for smaller, faster-loading images. Free and private.",
    keywords: ["png to webp", "convert png to webp", "webp converter"],
  },
  "/image/svg-to-png": {
    title: "SVG to PNG Converter — Free Online Tool | VCEngine",
    description:
      "Convert vector SVG files to PNG raster images at any resolution, in your browser.",
    keywords: ["svg to png", "convert svg to png"],
  },

  "/audio/trim": {
    title: "Trim Audio Online — Free Audio Cutter | VCEngine",
    description:
      "Cut and trim audio clips to the perfect length. Supports MP3, WAV and more, all in-browser.",
    keywords: ["trim audio", "audio cutter", "cut audio online"],
  },
  "/audio/merger": {
    title: "Merge Audio Files Online — Free Audio Joiner | VCEngine",
    description:
      "Combine multiple audio tracks into one file. Free, private and instant.",
    keywords: ["merge audio", "audio joiner", "combine audio"],
  },
  "/audio/splitter": {
    title: "Split Audio Online — Free Audio Splitter | VCEngine",
    description:
      "Split a long audio file into separate clips by time or segments.",
    keywords: ["split audio", "audio splitter", "cut audio into parts"],
  },
  "/audio/volume-booster": {
    title: "Boost Audio Volume Online — Free Tool | VCEngine",
    description:
      "Increase the volume of quiet recordings without leaving your browser.",
    keywords: ["volume booster", "increase audio volume", "loudness"],
  },
  "/audio/speed-changer": {
    title: "Change Audio Speed Online — Free Tool | VCEngine",
    description:
      "Speed up or slow down audio without changing pitch. Perfect for practice and review.",
    keywords: ["audio speed changer", "change playback speed", "slow down audio"],
  },
  "/audio/pitch-changer": {
    title: "Change Audio Pitch Online — Free Tool | VCEngine",
    description:
      "Shift the pitch of any audio clip up or down while keeping the original speed.",
    keywords: ["pitch changer", "change pitch", "audio pitch shifter"],
  },
  "/audio/reverse": {
    title: "Reverse Audio Online — Free Tool | VCEngine",
    description:
      "Play any audio clip backwards instantly, entirely in your browser.",
    keywords: ["reverse audio", "play audio backwards"],
  },
  "/audio/fade-in": {
    title: "Add Fade In to Audio — Free Online Tool | VCEngine",
    description:
      "Apply a smooth fade-in to the start of your audio file.",
    keywords: ["fade in audio", "audio fade", "fade in effect"],
  },
  "/audio/fade-out": {
    title: "Add Fade Out to Audio — Free Online Tool | VCEngine",
    description:
      "Apply a smooth fade-out to the end of your audio file.",
    keywords: ["fade out audio", "audio fade", "fade out effect"],
  },
  "/audio/mp3-to-wav": {
    title: "MP3 to WAV Converter — Free Online Tool | VCEngine",
    description:
      "Convert MP3 audio to uncompressed WAV format in your browser.",
    keywords: ["mp3 to wav", "convert mp3 to wav"],
  },
  "/audio/wav-to-mp3": {
    title: "WAV to MP3 Converter — Free Online Tool | VCEngine",
    description:
      "Convert WAV audio to compact MP3 files to save space.",
    keywords: ["wav to mp3", "convert wav to mp3"],
  },
  "/audio/ogg-to-mp3": {
    title: "OGG to MP3 Converter — Free Online Tool | VCEngine",
    description:
      "Convert OGG audio files to MP3 for maximum compatibility.",
    keywords: ["ogg to mp3", "convert ogg to mp3"],
  },
  "/audio/visualizer": {
    title: "Audio Visualizer Online — Free Waveform Tool | VCEngine",
    description:
      "Visualize any audio file as an interactive waveform, right in your browser.",
    keywords: ["audio visualizer", "waveform", "audio analyzer"],
  },

  "/video/compress": {
    title: "Compress Video Online — Free Video Compressor | VCEngine",
    description:
      "Reduce video file size without noticeable quality loss. Free, private and client-side.",
    keywords: ["compress video", "video compressor", "reduce video size"],
  },
  "/video/to-audio": {
    title: "Extract Audio from Video — Free Video to MP3 | VCEngine",
    description:
      "Pull the audio track out of any video and save it as MP3 or WAV.",
    keywords: ["video to audio", "extract audio from video", "video to mp3"],
  },
  "/video/to-gif": {
    title: "Convert Video to GIF — Free Online Tool | VCEngine",
    description:
      "Turn a short video clip into an animated GIF, entirely in your browser.",
    keywords: ["video to gif", "convert video to gif", "make gif"],
  },
  "/video/images-to-video": {
    title: "Create Video from Images — Free Slideshow Tool | VCEngine",
    description:
      "Combine images into a video slideshow with music. No uploads required.",
    keywords: ["images to video", "photo slideshow", "make video from photos"],
  },

  "/resume": {
    title: "Resume Tools — Free Resume Builder & ATS Checker | VCEngine",
    description:
      "Build ATS-friendly resumes, explore templates, write cover letters and check ATS compatibility — all free in your browser.",
    keywords: ["resume builder", "ats checker", "resume templates", "cover letter"],
  },
  "/resume/builder": {
    title: "Free Resume Builder — ATS-Friendly Online | VCEngine",
    description:
      "Create a professional, ATS-optimized resume with a live preview. No sign-up needed.",
    keywords: ["resume builder", "free resume maker", "ats resume"],
  },
  "/resume/templates": {
    title: "Resume Templates — Free Downloadable Designs | VCEngine",
    description:
      "Browse clean, modern resume templates you can customize and export instantly.",
    keywords: ["resume templates", "cv templates", "resume designs"],
  },
  "/resume/cover-letter": {
    title: "Free Cover Letter Builder — Online Tool | VCEngine",
    description:
      "Write a tailored cover letter that pairs with your resume, right in your browser.",
    keywords: ["cover letter builder", "cover letter maker", "cover letter"],
  },
  "/resume/ats-checker": {
    title: "ATS Resume Checker — Free Score & Tips | VCEngine",
    description:
      "Check how well your resume passes Applicant Tracking Systems and get actionable improvement tips.",
    keywords: ["ats checker", "ats resume check", "resume score"],
  },

  "/documentation": {
    title: "Documentation — How VCEngine Works | VCEngine",
    description:
      "Learn how VCEngine's client-side tools process your files privately and securely in the browser.",
    keywords: ["documentation", "how it works", "privacy"],
    faq: [
      {
        q: "How does VCEngine keep my files private?",
        a: "All processing happens locally using WebAssembly. Files are never uploaded to any server.",
      },
      {
        q: "Which browsers are supported?",
        a: "Any modern Chromium-based, Firefox or Safari browser with WebAssembly support.",
      },
    ],
  },
  "/status": {
    title: "System Status — VCEngine Media Suite",
    description:
      "Check the current operational status of VCEngine tools and services.",
    keywords: ["status", "uptime", "system status"],
    noindex: true,
  },
  "/privacy-policy": {
    title: "Privacy Policy — VCEngine Media Suite",
    description:
      "How VCEngine protects your privacy. All file processing is performed locally in your browser.",
    keywords: ["privacy policy", "data protection"],
    noindex: true,
  },
  "/terms-of-service": {
    title: "Terms of Service — VCEngine Media Suite",
    description:
      "The terms and conditions for using VCEngine Media Suite's free client-side tools.",
    keywords: ["terms of service", "terms of use"],
    noindex: true,
  },
};

export const DEFAULT_SEO = {
  title: "VCEngine Media Suite",
  description:
    "Powerful, secure, client-side tools to compress and convert PDFs, images, audio, and video.",
};
