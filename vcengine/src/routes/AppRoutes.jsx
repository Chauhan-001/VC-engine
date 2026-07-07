import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const MergePdf = lazy(() => import("../pages/pdf/MergePdf"));
const SplitPdf = lazy(() => import("../pages/pdf/SplitPdf"));
const CompressPdf = lazy(() => import("../pages/pdf/CompressPdf"));
const DeletePages = lazy(() => import("../pages/pdf/DeletePages.jsx"));
const ExtractPages = lazy(() => import("../pages/pdf/ExtractPages.jsx"));
const ReorderPages = lazy(() => import("../pages/pdf/ReorderPages.jsx"));
const PageNumbers = lazy(() => import("../pages/pdf/PageNumber.jsx"));
const WatermarkPdf = lazy(() => import("../pages/pdf/WatermarkPdf.jsx"));
const ProtectPdf = lazy(() => import("../pages/pdf/ProtectPdf.jsx"));
const UnlockPdf = lazy(() => import("../pages/pdf/UnlockPdf.jsx"));
const MetadataEditor = lazy(() => import("../pages/pdf/MetadataEditor.jsx"));
const ImagesToPdf = lazy(() => import("../pages/pdf/ImagesToPdf.jsx"));
const PdfToImages = lazy(() => import("../pages/pdf/PdfToImages.jsx"));
const VideoCompressor = lazy(() => import("../pages/video/VideoCompressor.jsx"));
const VideoToAudio = lazy(() => import("../pages/video/VideoToAudio.jsx"));
const VideoToGif = lazy(() => import("../pages/video/VideoToGif.jsx"));
const ImagesToVideo = lazy(() => import("../pages/video/ImagesToVideo.jsx"));

const ResumeIndex = lazy(() => import("../pages/resume/index.jsx"));
const ResumeBuilder = lazy(() => import("../pages/resume/ResumeBuilder.jsx"));
const ResumeTemplates = lazy(() => import("../pages/resume/ResumeTemplates.jsx"));
const CoverLetterBuilderPage = lazy(() => import("../pages/resume/CoverLetterBuilder.jsx"));
const AudioTrimmer = lazy(() => import("../pages/audio/AudioTrimmer.jsx"));
const AudioMerger = lazy(() => import("../pages/audio/AudioMerger.jsx"));
const AudioSplitter = lazy(() => import("../pages/audio/AudioSplitter.jsx"));
const VolumeBooster = lazy(() => import("../pages/audio/VolumeBooster.jsx"));
const SpeedChanger = lazy(() => import("../pages/audio/SpeedChanger.jsx"));
const PitchChanger = lazy(() => import("../pages/audio/PitchChanger.jsx"));
const ReverseAudio = lazy(() => import("../pages/audio/ReverseAudio.jsx"));
const FadeInAudio = lazy(() => import("../pages/audio/FadeInAudio.jsx"));
const FadeOutAudio = lazy(() => import("../pages/audio/FadeOutAudio.jsx"));
const Mp3ToWav = lazy(() => import("../pages/audio/Mp3ToWav.jsx"));
const WavToMp3 = lazy(() => import("../pages/audio/WavToMp3.jsx"));
const OggToMp3 = lazy(() => import("../pages/audio/OggToMp3.jsx"));
const AudioVisualizer = lazy(() => import("../pages/audio/AudioVisualizer.jsx"));
const ImageCompressor = lazy(() => import("../pages/image/ImageCompressor.jsx"));
const ImageConverter = lazy(() => import("../pages/image/ImageConverter.jsx"));
const ATSChecker = lazy(() => import("../pages/resume/ATSChecker.jsx"));
const Documentation = lazy(() => import("../pages/Documentation.jsx"));
const Status = lazy(() => import("../pages/Status.jsx"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("../pages/TermsOfService.jsx"));

function RouteFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#0066ff]">
        Loading…
      </span>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pdf/images-to-pdf" element={<ImagesToPdf />} />
            <Route path="/pdf/pdf-to-images" element={<PdfToImages />} />
            <Route path="/pdf/merge" element={<MergePdf />} />
            <Route path="/pdf/split" element={<SplitPdf />} />
            <Route path="/pdf/compress" element={<CompressPdf />} />
            <Route path="/pdf/delete-pages" element={<DeletePages />} />
            <Route path="/pdf/extract-pages" element={<ExtractPages />} />
            <Route path="/pdf/reorder-pages" element={<ReorderPages />} />
            <Route path="/pdf/page-numbers" element={<PageNumbers />} />
            <Route path="/pdf/watermark" element={<WatermarkPdf />} />
            <Route path="/pdf/protect" element={<ProtectPdf />} />
            <Route path="/pdf/unlock" element={<UnlockPdf />} />
            <Route path="/pdf/metadata" element={<MetadataEditor />} />

            <Route path="/audio/trim" element={<AudioTrimmer />} />
            <Route path="/audio/merger" element={<AudioMerger />} />
            <Route path="/audio/splitter" element={<AudioSplitter />} />
            <Route path="/audio/volume-booster" element={<VolumeBooster />} />
            <Route path="/audio/speed-changer" element={<SpeedChanger />} />
            <Route path="/audio/pitch-changer" element={<PitchChanger />} />
            <Route path="/audio/reverse" element={<ReverseAudio />} />
            <Route path="/audio/fade-in" element={<FadeInAudio />} />
            <Route path="/audio/fade-out" element={<FadeOutAudio />} />
            <Route path="/audio/mp3-to-wav" element={<Mp3ToWav />} />
            <Route path="/audio/wav-to-mp3" element={<WavToMp3 />} />
            <Route path="/audio/ogg-to-mp3" element={<OggToMp3 />} />
            <Route path="/audio/visualizer" element={<AudioVisualizer />} />
            <Route path="/video/compress" element={<VideoCompressor />} />
            <Route path="/video/to-audio" element={<VideoToAudio />} />
            <Route path="/video/to-gif" element={<VideoToGif />} />
            <Route path="/video/images-to-video" element={<ImagesToVideo />} />

            <Route path="/resume" element={<ResumeIndex />} />
            <Route path="/resume/builder" element={<ResumeBuilder />} />
            <Route path="/resume/templates" element={<ResumeTemplates />} />
            <Route path="/resume/cover-letter" element={<CoverLetterBuilderPage />} />
            <Route path="/image/compress" element={<ImageCompressor />} />
            <Route path="/image/jpg-to-png" element={<ImageConverter converterKey="jpg-to-png" />} />
            <Route path="/image/png-to-jpg" element={<ImageConverter converterKey="png-to-jpg" />} />
            <Route path="/image/webp-to-png" element={<ImageConverter converterKey="webp-to-png" />} />
            <Route path="/image/png-to-webp" element={<ImageConverter converterKey="png-to-webp" />} />
            <Route path="/image/svg-to-png" element={<ImageConverter converterKey="svg-to-png" />} />
            <Route path="/resume/ats-checker" element={<ATSChecker />} />

            <Route path="/documentation" element={<Documentation />} />
            <Route path="/status" element={<Status />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Suspense>
    </>
  );
}
