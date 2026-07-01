import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import ImagesUploadZone from "../../components/pdf/ImagesUploadZone";
import ImagesQueue from "../../components/pdf/ImagesQueue";

import ImagesToVideoSettings from "../../components/video/ImagesToVideoSettings";
import VideoStats from "../../components/video/VideoStats";
import GeneratedVideoPreview from "../../components/video/GeneratedVideoPreview";
import ImageSettingsPanel from "../../components/video/ImageSettingsPanel";

function ImagesToVideo() {
  const ffmpegRef = useRef(null);
  const ffmpegInitPromiseRef = useRef(null);

  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [images, setImages] = useState([]);
  const [audioFile, setAudioFile] = useState(null);

  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  const [outputFormat, setOutputFormat] = useState("mp4");
  const [resolutionPreset, setResolutionPreset] = useState("720p");
  const [customWidth, setCustomWidth] = useState(1280);
  const [customHeight, setCustomHeight] = useState(720);
  const [fps, setFps] = useState(30);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [fitMode, setFitMode] = useState("cover");
  const [quality, setQuality] = useState("high");
  const [globalSpeed, setGlobalSpeed] = useState(1);
  const [reverse, setReverse] = useState(false);
  const [transitionsEnabled, setTransitionsEnabled] = useState(false);

  const [audioVolume, setAudioVolume] = useState(1);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [loopAudio, setLoopAudio] = useState(false);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [audioTrimEnabled, setAudioTrimEnabled] = useState(false);

  const [ffmpegError, setFfmpegError] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    if (!ffmpegInitPromiseRef.current) {
      ffmpegInitPromiseRef.current = loadFFmpeg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setFfmpegError(null);
    } catch (e) {
      console.error("FFmpeg load error:", e);
      ffmpegRef.current = null;
      setFfmpegLoaded(false);
      setFfmpegError(e?.message || "FFmpeg init failed");
      ffmpegInitPromiseRef.current = null;
    } finally {
      setLoading(false);
    }
  }

  function cleanupGeneratedUrls() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
    setGeneratedVideo(null);
    setGenerationProgress(0);
  }

  function handleFilesSelected(files) {
    cleanupGeneratedUrls();

    const processed = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      duration: 3,
    }));

    setImages((prev) => [...prev, ...processed]);
  }

  function handleRemoveImage(id) {
    setImages((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((x) => x.id !== id);
    });
    setSelectedImageId(null);
    cleanupGeneratedUrls();
  }

  function handleClearAll() {
    setImages((prev) => {
      prev.forEach((x) => {
        if (x.preview) URL.revokeObjectURL(x.preview);
      });
      return [];
    });
    setSelectedImageId(null);
    cleanupGeneratedUrls();
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    setImages((prev) => {
      const oldIndex = prev.findIndex((img) => img.id === active.id);
      const newIndex = prev.findIndex((img) => img.id === over.id);

      const newImages = [...prev];
      const [moved] = newImages.splice(oldIndex, 1);
      newImages.splice(newIndex, 0, moved);

      return newImages;
    });
  }

  function handleSelectImage(id) {
    setSelectedImageId(id);
  }

  function handleUpdateImage(id, key, value) {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, [key]: value } : img)));
  }

  const totalDuration = useMemo(() => {
    const sum = images.reduce((acc, img) => acc + (Number(img.duration) || 0), 0);
    return sum / Math.max(0.0001, Number(globalSpeed));
  }, [images, globalSpeed]);

  function getAtempoChain(speed) {
    if (speed <= 0) return null;
    const filters = [];
    let remaining = speed;
    while (remaining > 2) {
      filters.push("2.0");
      remaining /= 2;
    }
    if (remaining < 0.5) {
      filters.push("0.5");
    } else if (remaining !== 1) {
      filters.push(remaining.toFixed(2));
    }
    return filters;
  }

  async function handleGenerateVideo() {
    if (!ffmpegLoaded || !images.length) return;

    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    setLoading(true);
    setFfmpegError(null);

    const inputPrefix = "img";
    const outputExt = outputFormat === "mp4" ? "mp4" : outputFormat;
    const outputName = `output.${outputExt}`;

    let workingImages = [...images];

    if (reverse) {
      workingImages = workingImages.reverse();
    }

    try {
      cleanupGeneratedUrls();
      setGenerationProgress(5);

      const fpsNum = Number(fps) || 30;
      const size = getResolutionSize(resolutionPreset, customWidth, customHeight);
      const scaleFilter = `scale=${size.w}:${size.h}:force_original_aspect_ratio=decrease,pad=${size.w}:${size.h}:(ow-iw)/2:(oh-ih)/2:black`;

      // Write all images
      for (let i = 0; i < workingImages.length; i++) {
        const img = workingImages[i];
        const buf = await fetchFile(img.file);
        const fileName = `${inputPrefix}${String(i).padStart(3, "0")}.png`;
        await ffmpeg.writeFile(fileName, buf);
        setGenerationProgress(Math.min(25, 5 + Math.round((i + 1) / workingImages.length * 20)));
      }

      setGenerationProgress(25);

      // Create segments for each image with its own duration
      const segNames = [];

      for (let i = 0; i < workingImages.length; i++) {
        const img = workingImages[i];
        const dur = Math.max(0.1, Number(img.duration) || 3);
        const frames = Math.max(1, Math.round(dur * fpsNum / Number(globalSpeed)));

        const segName = `seg${String(i).padStart(3, "0")}.mp4`;
        segNames.push(segName);

        const crf = quality === "low" ? "28" : quality === "medium" ? "23" : quality === "ultra" ? "18" : "20";

        const segCmd = [
          "-loop", "1",
          "-framerate", String(fpsNum),
          "-i", `${inputPrefix}${String(i).padStart(3, "0")}.png`,
          "-frames:v", String(frames),
          "-vf", scaleFilter,
          "-c:v", "libx264",
          "-crf", crf,
          "-pix_fmt", "yuv420p",
          "-r", String(fpsNum),
          segName,
        ];

        await ffmpeg.exec(segCmd);

        setGenerationProgress(Math.min(60, 25 + Math.round((i + 1) / workingImages.length * 35)));
      }

      setGenerationProgress(60);

      const hasAudio = !!audioFile;
let cmd = [];

      // Clean up transition duration to avoid issues with very short videos
      const transitionDur = Math.min(0.5, Math.min(...workingImages.map((img) => Number(img.duration) || 3)) / 4);

      if (transitionsEnabled && workingImages.length > 1 && transitionDur > 0.1) {
        // Build filter_complex for transitions using xfade
        for (let i = 0; i < segNames.length; i++) {
          cmd.push("-i", segNames[i]);
        }

        // Audio input if present
        let audioInputIndex = segNames.length;
        if (hasAudio) {
          const audioExt = audioFile.name.split(".").pop() || "m4a";
          const audioName = `audio.${audioExt}`;
          await ffmpeg.writeFile(audioName, await fetchFile(audioFile));
          cmd.push("-i", audioName);
        }

        // Build xfade filter chain
        const filterParts = [];
        const segDurations = workingImages.map((img) => Math.max(0.1, Number(img.duration) || 3) / Number(globalSpeed));

        // First segment starts as-is
        filterParts.push(`[0:v]setpts=PTS-STARTPTS[v0]`);

        // Chain xfade transitions - track cumulative duration after each transition
        let cumulative = segDurations[0];

        for (let i = 1; i < segNames.length; i++) {
          const resultLabel = i === segNames.length - 1 ? "[vout]" : `[v${i}]`;
          // xfade offset: when second clip should start transitioning in
          // This is: cumulative duration of output so far - transition duration
          filterParts.push(`[v${i - 1}][${i}:v]xfade=transition=fade:duration=${transitionDur}:offset=${cumulative - transitionDur}${resultLabel}`);
          // After transition, output is longer by (segDuration - transitionDur)
          cumulative = cumulative + segDurations[i] - transitionDur;
        }

        cmd.push("-filter_complex", filterParts.join(";"));
        cmd.push("-map", "[vout]");

        if (hasAudio) {
          const atempoFilters = getAtempoChain(Number(audioSpeed));
          const audioFilters = [];
          if (audioVolume !== 1) {
            audioFilters.push(`volume=${audioVolume}`);
          }
          if (atempoFilters) {
            audioFilters.push(`atempo=${atempoFilters.join(",atempo=")}`);
          }
          if (audioFilters.length > 0) {
            cmd.push("-filter:a", audioFilters.join(","));
          }
          cmd.push("-map", `${audioInputIndex}:a`);
          cmd.push("-t", String(cumulative));
        }
        cmd.push("-c:v", "libx264", "-crf", "20", "-pix_fmt", "yuv420p", outputName);
      } else {
        // No transitions - simple concat using demuxer
        const listLines = segNames.map((name) => `file '${name}'`);
        await ffmpeg.writeFile("list.txt", new TextEncoder().encode(listLines.join("\n")));

        cmd = [
          "-f", "concat",
          "-safe", "0",
          "-i", "list.txt",
        ];

        // Audio input if present
        if (hasAudio) {
          const audioExt = audioFile.name.split(".").pop() || "m4a";
          const audioName = `audio.${audioExt}`;
          await ffmpeg.writeFile(audioName, await fetchFile(audioFile));
          cmd.push("-i", audioName);
        }

        if (hasAudio) {
          const atempoFilters = getAtempoChain(Number(audioSpeed));
          const audioFilters = [];
          if (audioVolume !== 1) {
            audioFilters.push(`volume=${audioVolume}`);
          }
          if (atempoFilters) {
            audioFilters.push(`atempo=${atempoFilters.join(",atempo=")}`);
          }

          if (audioFilters.length > 0) {
            cmd.push("-filter:a", audioFilters.join(","));
          }

          cmd.push("-map", "0:v");
          cmd.push("-map", "1:a");
          cmd.push("-c:v", "copy");
          cmd.push("-c:a", "aac");
          cmd.push("-shortest");
        } else {
          cmd.push("-c", "copy");
        }

        cmd.push(outputName);
      }

      setGenerationProgress(70);

      let progressActive = true;
      const handleProgress = ({ progress }) => {
        if (typeof progress === "number" && progressActive) {
          setGenerationProgress(Math.max(70, Math.min(95, Math.round(70 + progress * 25))));
        }
      };

      ffmpeg.on("progress", handleProgress);
      ffmpeg.on("log", (message) => {
        console.log("[ffmpeg]", typeof message === "object" ? message.message : message);
      });

      try {
        await ffmpeg.exec(cmd);
      } finally {
        progressActive = false;
      }

      setGenerationProgress(92);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: getMimeForVideoFormat(outputFormat) });
      const file = new File([blob], outputName, { type: blob.type });

      setGeneratedVideo(file);
      const url = URL.createObjectURL(file);
      setObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setGenerationProgress(100);

      // Cleanup
      try {
        for (let i = 0; i < workingImages.length; i++) {
          await ffmpeg.deleteFile(`${inputPrefix}${String(i).padStart(3, "0")}.png`);
          await ffmpeg.deleteFile(`seg${String(i).padStart(3, "0")}.mp4`);
        }
        if (hasAudio) {
          const audioExt = audioFile.name.split(".").pop() || "m4a";
          await ffmpeg.deleteFile(`audio.${audioExt}`);
        }
        if (transitionsEnabled && workingImages.length > 1) {
          // No list.txt created in transitions mode
        } else {
          await ffmpeg.deleteFile("list.txt");
        }
        await ffmpeg.deleteFile(outputName);
      } catch {
        console.log("Cleanup skipped");
      }
    } catch (e) {
      console.error("Generate video error:", e);
      setFfmpegError(e?.message || "Video generation failed");
      alert("Video generation failed.");
    } finally {
      setLoading(false);
      setGenerationProgress(0);
    }
  }

  const selectedImage = images.find((img) => img.id === selectedImageId);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-[1800px] px-6 pb-24">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-mono text-sm uppercase text-gray-400 transition-colors hover:text-[#ff3b30]"
          >
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          <div className="mb-12">
            <h1 className="text-6xl font-black uppercase">Images To Video</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Turn photos into beautiful videos directly in your browser using FFmpeg WASM.
              No uploads. No servers. Complete privacy.
            </p>
          </div>

          {!ffmpegLoaded && (
            <div className="mb-8 border-[3px] border-black bg-[#ff3b30] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              Loading FFmpeg Engine... Please wait.
            </div>
          )}

          {ffmpegError && (
            <div className="mb-8 border-[3px] border-red-500 bg-[#1a0a0a] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              {ffmpegError}
            </div>
          )}

          {/* TOP SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr_420px] gap-8 items-start">
            <div className="space-y-8">
              <ImagesUploadZone onFilesSelected={handleFilesSelected} />

              <ImagesQueue
                images={images}
                onRemove={handleRemoveImage}
                onClearAll={handleClearAll}
                onDragEnd={handleDragEnd}
                selectedImageId={selectedImageId}
                onSelect={handleSelectImage}
              />

              {selectedImage && (
                <ImageSettingsPanel
                  image={selectedImage}
                  onUpdate={handleUpdateImage}
                  onClose={() => setSelectedImageId(null)}
                />
              )}
            </div>

            <div>
              <ImagesToVideoSettings
                images={images}
                setImages={setImages}
                audioFile={audioFile}
                setAudioFile={setAudioFile}
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
                resolutionPreset={resolutionPreset}
                setResolutionPreset={setResolutionPreset}
                customWidth={customWidth}
                setCustomWidth={setCustomWidth}
                customHeight={customHeight}
                setCustomHeight={setCustomHeight}
                fps={fps}
                setFps={setFps}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                fitMode={fitMode}
                setFitMode={setFitMode}
                quality={quality}
                setQuality={setQuality}
                globalSpeed={globalSpeed}
                setGlobalSpeed={setGlobalSpeed}
                reverse={reverse}
                setReverse={setReverse}
                transitionsEnabled={transitionsEnabled}
                setTransitionsEnabled={setTransitionsEnabled}

                audioVolume={audioVolume}
                setAudioVolume={setAudioVolume}
                audioSpeed={audioSpeed}
                setAudioSpeed={setAudioSpeed}
                loopAudio={loopAudio}
                setLoopAudio={setLoopAudio}
                fadeIn={fadeIn}
                setFadeIn={setFadeIn}
                fadeOut={fadeOut}
                setFadeOut={setFadeOut}
                trimStart={trimStart}
                setTrimStart={setTrimStart}
                trimEnd={trimEnd}
                setTrimEnd={setTrimEnd}
                audioTrimEnabled={audioTrimEnabled}
                setAudioTrimEnabled={setAudioTrimEnabled}

                loading={loading}
                generationProgress={generationProgress}
                hasImages={images.length > 0 && ffmpegLoaded}
                onGenerate={handleGenerateVideo}
              />
            </div>
          </div>

          {/* AFTER */}
          {generatedVideo && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start animate-fadeIn">
              <div>
                <VideoStats
                  originalImagesTotalSize={images.reduce((s, i) => s + (i.file?.size || 0), 0)}
                  generatedVideoSize={generatedVideo?.size || 0}
                  imagesCount={images.length}
                  totalDuration={totalDuration}
                  format={outputFormat}
                />
              </div>

              <div>
                <GeneratedVideoPreview
                  videoUrl={objectUrl}
                  videoFile={generatedVideo}
                  onDownload={() => {
                    const url = objectUrl;
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = generatedVideo.name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  }}
                  onClear={() => {
                    cleanupGeneratedUrls();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function getResolutionSize(preset, w, h) {
  if (preset === "720p") return { w: 1280, h: 720 };
  if (preset === "1080p") return { w: 1920, h: 1080 };
  if (preset === "1440p") return { w: 2560, h: 1440 };
  if (preset === "4k") return { w: 3840, h: 2160 };
  if (preset === "custom") return { w: Number(w) || 1280, h: Number(h) || 720 };
  return { w: 1280, h: 720 };
}

function getMimeForVideoFormat(fmt) {
  if (fmt === "webm") return "video/webm";
  if (fmt === "mov") return "video/quicktime";
  if (fmt === "gif") return "image/gif";
  return "video/mp4";
}

export default ImagesToVideo;