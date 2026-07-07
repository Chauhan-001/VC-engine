import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

import {
  fetchFile,
} from "@ffmpeg/util";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import VideoUploadCard from "../../components/video/VideoUploadCard";
import VideoPreviewCard from "../../components/video/VideoPreviewCard";
import CompressionStats from "../../components/video/CompressionStats";
import VideoCompressionSettings from "../../components/video/VideoCompressionSetting";

function VideoCompressor() {
  const ffmpegRef =
    useRef(null);

  const [ffmpegLoaded,
    setFfmpegLoaded] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [compressionProgress,
    setCompressionProgress] =
    useState(0);

  const [estimatedOutputSize,
    setEstimatedOutputSize] =
    useState(null);

  const [estimatedReduction,
    setEstimatedReduction] =
    useState(null);

  const [videoFile,
    setVideoFile] =
    useState(null);

  const [
    compressedFile,
    setCompressedFile,
  ] = useState(null);

  const [
    compressionLevel,
    setCompressionLevel,
  ] = useState("medium");

  const [resolution,
    setResolution] =
    useState("original");

  const [fps,
    setFps] =
    useState("original");

  const [bitrateMode,
    setBitrateMode] =
    useState("auto");

  const [customBitrate,
    setCustomBitrate] =
    useState("1500");

  // React StrictMode in dev can mount twice. Ensure ffmpeg.load() runs once.
  const ffmpegInitPromiseRef = useRef(null);

  const PRESETS = {

    low: {
      crf: 18,
      preset: "fast",
    },

    medium: {
      crf: 24,
      preset: "medium",
    },

    high: {
      crf: 30,
      preset: "slow",
    },

    extreme: {
      crf: 35,
      preset: "veryslow",
    },
  };

  function getEstimatedCompressionStats(originalSize = 0) {
    if (!originalSize) {
      return {
        estimatedBytes: null,
        savedPercent: null,
      };
    }

    const levelFactors = {
      low: 0.88,
      medium: 0.68,
      high: 0.5,
      extreme: 0.35,
    };

    const resolutionFactors = {
      original: 1,
      "1080p": 0.9,
      "720p": 0.72,
      "480p": 0.55,
    };

    const fpsFactors = {
      original: 1,
      "60": 0.98,
      "30": 0.88,
      "24": 0.82,
    };

    const bitrateFactor =
      bitrateMode === "custom"
        ? Math.min(
            0.95,
            Math.max(0.3, Number(customBitrate || 1500) / 2500)
          )
        : 1;

    const estimatedBytes = Math.round(
      originalSize *
        (levelFactors[compressionLevel] || 0.68) *
        (resolutionFactors[resolution] || 1) *
        (fpsFactors[fps] || 1) *
        bitrateFactor
    );

    const savedPercent =
      originalSize > 0
        ? Math.max(0, Math.min(95, ((originalSize - estimatedBytes) / originalSize) * 100))
        : 0;

    return {
      estimatedBytes,
      savedPercent,
    };
  }

  useEffect(() => {
    if (!ffmpegInitPromiseRef.current) {
      ffmpegInitPromiseRef.current = loadFFmpeg();
    }
  }, []);

  useEffect(() => {
    if (!videoFile?.size) {
      setEstimatedOutputSize(null);
      setEstimatedReduction(null);
      return;
    }

    const { estimatedBytes, savedPercent } = getEstimatedCompressionStats(videoFile.size);
    setEstimatedOutputSize(estimatedBytes);
    setEstimatedReduction(savedPercent);
  }, [videoFile, compressionLevel, resolution, fps, bitrateMode, customBitrate]);

  async function loadFFmpeg() {
    try {
      // Prevent double-init in React StrictMode dev
      if (ffmpegRef.current) return;

      setLoading(true);

      const ffmpeg = await createFFmpegInstance();

      ffmpegRef.current = ffmpeg;
      setFfmpegLoaded(true);
    } catch (error) {
      console.error("FFmpeg load error:", error);
      ffmpegRef.current = null;
      setFfmpegLoaded(false);
      // Allow retry on next mount attempt
      ffmpegInitPromiseRef.current = null;
    } finally {
      setLoading(false);
    }
  }



  function handleFileSelected(
    file
  ) {
    setVideoFile(file);

    setCompressedFile(null);
    setCompressionProgress(0);
  }

  function handleRemoveVideo() {
    setVideoFile(null);

    setCompressedFile(null);
    setCompressionProgress(0);
    setEstimatedOutputSize(null);
    setEstimatedReduction(null);
  }
    async function handleCompress() {
    if (
      !videoFile ||
      !ffmpegLoaded
    ) {
      return;
    }

    try {
      setLoading(true);
      setCompressionProgress(8);

      const ffmpeg =
        ffmpegRef.current;

      const inputName =
        `input.${videoFile.name
          .split(".")
          .pop()}`;

      const outputName =
        "compressed.mp4";

      await ffmpeg.writeFile(
        inputName,
        await fetchFile(
          videoFile
        )
      );

      const handleProgress = ({ progress }) => {
        if (typeof progress === "number") {
          setCompressionProgress(Math.max(10, Math.min(95, Math.round(progress * 100))));
        }
      };

      ffmpeg.on("progress", handleProgress);
      ffmpeg.on("log", (message) => {
        console.log("[ffmpeg]", message);
      });

      const {
        crf,
        preset,
      } =
        PRESETS[
          compressionLevel
        ];

      const attempts = [
        {
          label: "h264",
          command: [
            "-i",
            inputName,
            ...(resolution !== "original"
              ? ["-vf", `scale=-2:${resolution.replace("p", "")}`]
              : []),
            ...(fps !== "original" ? ["-r", fps] : []),
            "-c:v",
            "libx264",
            "-preset",
            preset,
            "-crf",
            String(crf),
            ...(bitrateMode === "custom" ? ["-b:v", `${customBitrate}k`] : []),
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-movflags",
            "+faststart",
            outputName,
          ],
        },
        {
          label: "mpeg4",
          command: [
            "-i",
            inputName,
            ...(resolution !== "original"
              ? ["-vf", `scale=-2:${resolution.replace("p", "")}`]
              : []),
            ...(fps !== "original" ? ["-r", fps] : []),
            "-c:v",
            "mpeg4",
            "-q:v",
            "5",
            "-an",
            outputName,
          ],
        },
        {
          label: "copy",
          command: [
            "-i",
            inputName,
            "-c",
            "copy",
            outputName,
          ],
        },
      ];

      let lastError;
      let outputFile = null;
      for (const attempt of attempts) {
        setCompressionProgress((prev) => Math.min(90, prev + 5));
        try {
          await ffmpeg.deleteFile(outputName).catch(() => undefined);
          const exitCode = await ffmpeg.exec(attempt.command);
          if (exitCode === 0) {
            const data = await ffmpeg.readFile(outputName);
            if (data?.length) {
              const blob = new Blob([data], { type: "video/mp4" });
              outputFile = new File([blob], `compressed-${videoFile.name.replace(/\.[^/.]+$/, "")}.mp4`, { type: "video/mp4" });
              break;
            }
          }
          lastError = new Error(`Attempt ${attempt.label} exited with code ${exitCode}`);
        } catch (error) {
          lastError = error;
        }
      }

      if (!outputFile) {
        throw lastError || new Error("No output file was produced");
      }

      setCompressedFile(outputFile);
      setCompressionProgress(100);

      // Cleanup temp files
      try {
        await ffmpeg.deleteFile(
          inputName
        );

        await ffmpeg.deleteFile(
          outputName
        );
      } catch {
        console.log(
          "Cleanup skipped"
        );
      }
    } catch (error) {
      console.error(
        "Compression Error:",
        error
      );

      alert(
        `Video compression failed: ${error?.message || error}`
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!compressedFile) {
      return;
    }

    const url =
      URL.createObjectURL(
        compressedFile
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      compressedFile.name;

    document.body.appendChild(
      a
    );

    a.click();

    a.remove();

    URL.revokeObjectURL(
      url
    );
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

      <main id="main-content" tabIndex={-1} className="pt-28">
        <div
          className="
            mx-auto
            max-w-[1800px]
            px-6
            pb-24
          "
        >
          {/* Back */}
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

          {/* Header */}
          <div className="mb-12">
            <h1
              className="
                text-6xl
                font-black
                uppercase
              "
            >
              Video Compressor
            </h1>

            <p
              className="
                mt-4
                max-w-3xl
                text-lg
                text-gray-400
              "
            >
              Compress videos directly in
              your browser using FFmpeg
              WASM. No uploads, no servers,
              complete privacy.
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

          {/* Layout Container */}
          <div className="flex flex-col gap-8">
            {/* Top Row: Upload and Original Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
              <div>
                <VideoUploadCard
                  videoFile={videoFile}
                  onFileSelected={handleFileSelected}
                  onRemove={handleRemoveVideo}
                />
              </div>
              <div>
                <VideoPreviewCard
                  file={videoFile}
                  title="Original Video"
                  accentColor="#ff3b30"
                />
              </div>
            </div>

            {/* Second Row: Settings Panel (Full Width) */}
            <div>
              <VideoCompressionSettings
                compressionLevel={compressionLevel}
                setCompressionLevel={setCompressionLevel}
                resolution={resolution}
                setResolution={setResolution}
                fps={fps}
                setFps={setFps}
                bitrateMode={bitrateMode}
                setBitrateMode={setBitrateMode}
                customBitrate={customBitrate}
                setCustomBitrate={setCustomBitrate}
                loading={loading}
                compressionProgress={compressionProgress}
                estimatedOutputSize={estimatedOutputSize}
                estimatedReduction={estimatedReduction}
                hasVideo={!!videoFile && ffmpegLoaded}
                onCompress={handleCompress}
              />
            </div>

            {/* Third Row: Compression Stats & Output Preview */}
            {compressedFile && (
              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start animate-fadeIn">
                <div>
                  <CompressionStats
                    originalSize={videoFile?.size || 0}
                    compressedSize={compressedFile?.size || 0}
                    estimatedOutputSize={estimatedOutputSize}
                    estimatedReduction={estimatedReduction}
                  />
                </div>
                <div className="space-y-6">
                  <VideoPreviewCard
                    file={compressedFile}
                    title="Compressed Video"
                    accentColor="#22c55e"
                  />

                  <button
                    onClick={handleDownload}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      border-[3px]
                      border-black
                      bg-[#22c55e]
                      px-6
                      py-5
                      font-mono
                      text-xl
                      font-black
                      uppercase
                      text-white
                      shadow-[6px_6px_0px_0px_black]
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-[8px_8px_0px_0px_black]
                      active:translate-y-1
                      active:shadow-none
                    "
                  >
                    <Download size={22} />
                    Download Video
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VideoCompressor;