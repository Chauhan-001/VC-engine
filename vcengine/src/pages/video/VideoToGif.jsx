import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import VideoUploadCard from "../../components/video/VideoUploadCard";
import VideoPreviewCard from "../../components/video/VideoPreviewCard";

import VideoToGifSettings from "../../components/video/VideoToGifSettings";
import GifPreviewCard from "../../components/video/GifPreviewCard";
import GifStats from "../../components/video/GifStats";

function clampNumber(value, min, max) {
  if (Number.isNaN(Number(value))) return min;
  return Math.min(max, Math.max(min, Number(value)));
}

const RESOLUTION_OPTIONS = [
  { value: "original", label: "Original" },
  { value: "320p", label: "320p" },
  { value: "480p", label: "480p" },
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" },
];

const FPS_OPTIONS = [
  { value: 10, label: "10 FPS" },
  { value: 15, label: "15 FPS" },
  { value: 20, label: "20 FPS" },
  { value: 24, label: "24 FPS" },
  { value: 30, label: "30 FPS" },
];

const DURATION_OPTIONS = [
  { value: 3, label: "3 Seconds" },
  { value: 5, label: "5 Seconds" },
  { value: 10, label: "10 Seconds" },
  { value: "custom", label: "Custom" },
];

const START_MODES = [
  { value: "beginning", label: "Beginning" },
  { value: "custom", label: "Custom Start Time" },
];

function secondsFromHHMMSS(input) {
  const match = /^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/.exec(input);
  if (!match) return 0;
  const hh = Number(match[1]);
  const mm = Number(match[2]);
  const ss = Number(match[3]);
  return hh * 3600 + mm * 60 + ss;
}

function VideoToGif() {
  const ffmpegRef = useRef(null);
  const ffmpegInitPromiseRef = useRef(null);

  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [videoFile, setVideoFile] = useState(null);

  const [gifFile, setGifFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  const GIF_QUALITY_PRESETS = {
    low: { fps: 10, scale: 320 },
    medium: { fps: 15, scale: 480 },
    high: { fps: 20, scale: 640 },
    ultra: { fps: 24, scale: 720 },
  };

  const [quality, setQuality] = useState("medium");

  const [resolution, setResolution] = useState("original");
  const [fps, setFps] = useState(FPS_OPTIONS[1].value); // 15

  const [duration, setDuration] = useState(5);
  const [customDuration, setCustomDuration] = useState(5);
  const [startMode, setStartMode] = useState("beginning");
  const [startTime, setStartTime] = useState("00:00:00");

  useEffect(() => {
    if (!ffmpegInitPromiseRef.current) {
      ffmpegInitPromiseRef.current = loadFFmpeg();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  async function loadFFmpeg() {
    try {
      if (ffmpegRef.current) return;

      setLoading(true);

      const ffmpeg = await createFFmpegInstance();

      ffmpegRef.current = ffmpeg;
      setFfmpegLoaded(true);
    } catch (e) {
      console.error("FFmpeg load error:", e);
      ffmpegRef.current = null;
      setFfmpegLoaded(false);
      ffmpegInitPromiseRef.current = null;
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelected(file) {
    setVideoFile(file);
    setGifFile(null);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
  }

  function handleRemoveVideo() {
    setVideoFile(null);
    setGifFile(null);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
  }

  const gifConfig = useMemo(() => {
    const q = GIF_QUALITY_PRESETS[quality] || GIF_QUALITY_PRESETS.medium;

    const chosenFps = fps;

    let targetW = null;
    if (resolution !== "original") {
      const n = Number(String(resolution).replace("p", ""));
      // scale=-1:<height> behavior: keep width auto
      targetW = null;
      // We'll use scale filter with height directly
    }

    const durationSeconds =
      duration === "custom" ? clampNumber(customDuration, 0.5, 30) : clampNumber(duration, 0.5, 30);

    const startSeconds =
      startMode === "custom" ? secondsFromHHMMSS(startTime) : 0;

    return {
      q,
      fps: chosenFps,
      durationSeconds,
      startSeconds,
      resolution,
    };
  }, [quality, fps, resolution, duration, customDuration, startMode, startTime]);

  async function handleGenerateGif() {
    if (!videoFile || !ffmpegLoaded) return;

    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    setLoading(true);

    const inputName = `input.${videoFile.name.split(".").pop()}`;
    const paletteName = "palette.png";
    const outputName = "output.gif";

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      const height =
        resolution === "original" ? null : String(resolution).replace("p", "");

      const scaleFilter = height
        ? `scale=-1:${height}:flags=lanczos`
        : `scale=-1:${gifConfig.q.scale}:flags=lanczos`;

      const fpsFilter = `fps=${gifConfig.fps}`;

      // palettegen
      const ssArg = gifConfig.startSeconds > 0 ? ["-ss", String(gifConfig.startSeconds)] : [];
      const tArg = ["-t", String(gifConfig.durationSeconds)];

      const vfPalette = `${fpsFilter},${scaleFilter},palettegen`;
      const vfUse = `${fpsFilter},${scaleFilter}[x];[x]paletteuse`;

      // Generate palette
      await ffmpeg.exec([
        ...ssArg,
        ...tArg,
        "-i",
        inputName,
        "-vf",
        vfPalette,
        paletteName,
      ]);

      // Generate gif
      await ffmpeg.exec([
        ...ssArg,
        ...tArg,
        "-i",
        inputName,
        "-i",
        paletteName,
        "-filter_complex",
        vfUse,
        "-y",
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: "image/gif" });
      const file = new File(
        [blob],
        `gif-${videoFile.name.replace(/\.[^/.]+$/, "")}.gif`,
        { type: "image/gif" }
      );

      setGifFile(file);
      const url = URL.createObjectURL(file);
      setObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });

      // Cleanup
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(paletteName);
        await ffmpeg.deleteFile(outputName);
      } catch {
        console.log("Cleanup skipped");
      }
    } catch (e) {
      console.error("Generate GIF error:", e);
      alert("GIF generation failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadGif() {
    if (!gifFile) return;
    const url = objectUrl || URL.createObjectURL(gifFile);

    const a = document.createElement("a");
    a.href = url;
    a.download = gifFile.name;
    document.body.appendChild(a);
    a.click();
    a.remove();

    if (!objectUrl) URL.revokeObjectURL(url);
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#0a0a0a]
        text-white
      "
    >
      <Navbar />

      <main className="pt-28">
        <div
          className="
            mx-auto
            max-w-[1800px]
            px-6
            pb-24
          "
        >
          <Link
            to="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              font-mono
              text-sm
              uppercase
              text-gray-400
              transition-colors
              hover:text-[#ff3b30]
            "
          >
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          <div className="mb-8">
            <h1 className="text-6xl font-black uppercase">Video To Gif</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Convert videos into high-quality animated GIFs directly in your browser using FFmpeg WASM.
              No uploads. No servers. Complete privacy.
            </p>
          </div>

          {!ffmpegLoaded && (
            <div
              className="
                mb-8
                border-[3px]
                border-black
                bg-[#ff3b30]
                p-5
                font-mono
                text-sm
                font-bold
                uppercase
                text-white
                shadow-[6px_6px_0px_0px_black]
              "
            >
              Loading FFmpeg Engine...
              Please wait.
            </div>
          )}

          {/* TOP */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
            <div>
              <VideoUploadCard
                videoFile={videoFile}
                onFileSelected={handleFileSelected}
                onRemove={handleRemoveVideo}
              />

              {videoFile && (
                <div className="mt-4 border-[3px] border-black bg-[#161616] p-4 shadow-[6px_6px_0px_0px_black]">
                  <p className="font-mono text-sm font-bold uppercase text-white">Video details</p>
                  <p className="mt-2 font-mono text-xs uppercase text-gray-400">{videoFile.name}</p>
                </div>
              )}
            </div>

            <div>
              <VideoPreviewCard
                file={videoFile}
                title="Original Video"
                accentColor="#ff3b30"
              />
            </div>
          </div>

          {/* SECOND: Settings */}
          <div className="mt-8 border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
            <div className="border-b-[3px] border-black px-6 py-4">
              <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Settings</h2>
            </div>
            <div className="p-6">
              <VideoToGifSettings
                quality={quality}
                setQuality={setQuality}
                resolution={resolution}
                setResolution={setResolution}
                fps={fps}
                setFps={setFps}
                duration={duration}
                setDuration={setDuration}
                customDuration={customDuration}
                setCustomDuration={setCustomDuration}
                startMode={startMode}
                setStartMode={setStartMode}
                startTime={startTime}
                setStartTime={setStartTime}
                loading={loading}
                hasVideo={!!videoFile && ffmpegLoaded}
                onGenerate={handleGenerateGif}
                resolutionOptions={RESOLUTION_OPTIONS}
                fpsOptions={FPS_OPTIONS}
                durationOptions={DURATION_OPTIONS}
                startModeOptions={START_MODES}
              />
            </div>
          </div>

          {/* AFTER */}
          {gifFile && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start animate-fadeIn">
              <div>
                <GifStats
                  originalVideoSize={videoFile?.size || 0}
                  gifSize={gifFile?.size || 0}
                  durationSeconds={gifConfig.durationSeconds}
                  resolution={gifConfig.resolution}
                  fps={gifConfig.fps}
                />
              </div>

              <div>
                <GifPreviewCard
                  gifUrl={objectUrl}
                  gifFile={gifFile}
                  onDownload={handleDownloadGif}
                  onClear={() => {
                    setGifFile(null);
                    if (objectUrl) URL.revokeObjectURL(objectUrl);
                    setObjectUrl(null);
                  }}
                />
              </div>
            </div>
          )}

          <div className="sr-only">{loading ? "Processing" : "Idle"}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VideoToGif;

