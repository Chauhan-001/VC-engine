import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import MergePdf from "../pages/pdf/MergePdf";
import SplitPdf from "../pages/pdf/SplitPdf";
import CompressPdf from "../pages/pdf/CompressPdf";
import DeletePages from "../pages/pdf/DeletePages";
import ExtractPages from "../pages/pdf/ExtractPages.jsx";
import ReorderPages from "../pages/pdf/ReorderPages.jsx";
import PageNumbers from "../pages/pdf/PageNumber.jsx";
import WatermarkPdf from "../pages/pdf/WatermarkPdf.jsx";
import ProtectPdf from "../pages/pdf/ProtectPdf.jsx";
import UnlockPdf from "../pages/pdf/UnlockPdf.jsx";
import ImagesToPdf from "../pages/pdf/ImagesToPdf.jsx";
import PdfToImages from "../pages/pdf/PdfToImages.jsx";
import VideoCompressor from "../pages/video/VideoCompressor.jsx";
import VideoToAudio from "../pages/video/VideoToAudio.jsx";
import VideoToGif from "../pages/video/VideoToGif.jsx";
import ImagesToVideo from "../pages/video/ImagesToVideo.jsx";

import ResumeIndex from "../pages/resume/index.jsx";
import ResumeBuilder from "../pages/resume/ResumeBuilder.jsx";
import ResumeTemplates from "../pages/resume/ResumeTemplates.jsx";
import CoverLetterBuilderPage from "../pages/resume/CoverLetterBuilder.jsx";
import AudioTrimmer from "../pages/audio/AudioTrimmer.jsx";
import AudioMerger from "../pages/audio/AudioMerger.jsx";
import AudioSplitter from "../pages/audio/AudioSplitter.jsx";
import VolumeBooster from "../pages/audio/VolumeBooster.jsx";
import SpeedChanger from "../pages/audio/SpeedChanger.jsx";
import PitchChanger from "../pages/audio/PitchChanger.jsx";
import ReverseAudio from "../pages/audio/ReverseAudio.jsx";
import FadeInAudio from "../pages/audio/FadeInAudio.jsx";
import FadeOutAudio from "../pages/audio/FadeOutAudio.jsx";
import Mp3ToWav from "../pages/audio/Mp3ToWav.jsx";
import WavToMp3 from "../pages/audio/WavToMp3.jsx";
import OggToMp3 from "../pages/audio/OggToMp3.jsx";
import AudioVisualizer from "../pages/audio/AudioVisualizer.jsx";
import ImageCompressor from "../pages/image/ImageCompressor.jsx";
import ImageConverter from "../pages/image/ImageConverter.jsx";
import ATSChecker from "../pages/resume/ATSChecker.jsx";
import Documentation from "../pages/Documentation.jsx";
import Status from "../pages/Status.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import TermsOfService from "../pages/TermsOfService.jsx";


export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
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
    </>
  );
}