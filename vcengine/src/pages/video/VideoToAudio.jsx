import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import VideoUploadCard from "../../components/video/VideoUploadCard";
import VideoPreviewCard from "../../components/video/VideoPreviewCard";

import VideoToAudioSettings from "../../components/video/VideoToAudioSettings";
import AudioPreviewCard from "../../components/video/AudioPreviewCard";
import AudioStats from "../../components/video/AudioStats";

const QUALITY_PRESETS = {
  low: { bitrate: "96k" },
  medium: { bitrate: "192k" },
  high: { bitrate: "320k" },
  lossless: { bitrate: null },
};

const SAMPLE_RATES = {
  original: null,
  "44100": 44100,
  "48000": 48000,
};

const CHANNELS = {
  original: null,
  mono: 1,
  stereo: 2,
};

const OUTPUT_FORMATS = {
  mp3: { label: "MP3", ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { label: "WAV", ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  aac: { label: "AAC", ext: "aac", mime: "audio/aac", codec: "aac" },
  ogg: { label: "OGG", ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

function VideoToAudio() {
  const ffmpegRef = useRef(null);
  const ffmpegInitPromiseRef = useRef(null);

  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [videoFile, setVideoFile] = useState(null);

  const [audioFile, setAudioFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  const [outputFormat, setOutputFormat] = useState("mp3");
  const [quality, setQuality] = useState("medium");
  const [sampleRate, setSampleRate] = useState("original");
  const [channels, setChannels] = useState("original");

  const originalVideoSize = videoFile?.size || 0;
  const extractedAudioSize = audioFile?.size || 0;

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
    setAudioFile(null);
    setFfmpegLoaded(ffmpegLoaded);
  }

  function handleRemoveVideo() {
    setVideoFile(null);
    setAudioFile(null);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(null);
  }

  const privacyItems = [
    "Local Processing",
    "No Uploads",
    "Browser Only",
    "No Data Collection",
  ];

  const commandConfig = useMemo(() => {
    const fmt = OUTPUT_FORMATS[outputFormat];
    const q = QUALITY_PRESETS[quality];
    const ar = SAMPLE_RATES[sampleRate];
    const ac = CHANNELS[channels];

    return {
      fmt,
      bitrate: q?.bitrate,
      ar,
      ac,
    };
  }, [outputFormat, quality, sampleRate, channels]);

  async function handleExtractAudio() {
    if (!videoFile || !ffmpegLoaded) return;

    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return;

    setLoading(true);
    setAudioFile(null);

    const inputName = `input.${videoFile.name.split(".").pop()}`;
    const outputName = `output.${OUTPUT_FORMATS[outputFormat].ext}`;

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      const {
        fmt,
        bitrate,
        ar,
        ac,
      } = commandConfig;

      const cmd = ["-i", inputName, "-vn", "-c:a", fmt.codec];

      if (bitrate) {
        cmd.push("-b:a", bitrate);
      }

      // Sample rate
      if (ar) {
        cmd.push("-ar", String(ar));
      }

      // Channels
      if (ac) {
        cmd.push("-ac", String(ac));
      }

      cmd.push(outputName);

      await ffmpeg.exec(cmd);

      const data = await ffmpeg.readFile(outputName);

      const blob = new Blob([data], { type: fmt.mime });
      const file = new File(
        [blob],
        `audio-${videoFile.name.replace(/\.[^/.]+$/, "")}.${fmt.ext}`,
        { type: fmt.mime }
      );

      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });

      // Cleanup
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      } catch (e) {
        console.log("Cleanup skipped", e);
      }
    } catch (e) {
      console.error("Extract audio error:", e);
      alert("Audio extraction failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!audioFile) return;

    const url = objectUrl || URL.createObjectURL(audioFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = audioFile.name;
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
          {/* Back */}
          <Link
            to="/video/compress"
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
          <div className="mb-8">
            <h1 className="text-6xl font-black uppercase">Video To Audio</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">
              Extract high-quality audio from videos directly in your browser using FFmpeg WASM.
              No uploads.
              No servers.
              Complete privacy.
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

          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
            <div>
              <VideoUploadCard
                videoFile={videoFile}
                onFileSelected={handleFileSelected}
                onRemove={handleRemoveVideo}
              />

              <div className="mt-4 border-[3px] border-black bg-[#161616] p-4 shadow-[6px_6px_0px_0px_black]">
                <p className="font-mono text-sm font-bold uppercase text-white">
                  Supported formats
                </p>
                <p className="mt-2 font-mono text-xs uppercase text-gray-400">
                  MP4 • MOV • AVI • MKV • WEBM • M4V • FLV • 3GP
                </p>
              </div>
            </div>

            <div>
              <VideoPreviewCard
                file={videoFile}
                title="Original Video"
                accentColor="#ff3b30"
              />
            </div>
          </div>

          {/* SECOND SECTION: FULL-WIDTH SETTINGS PANEL */}
          <div className="mt-8">
            <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
              <div className="border-b-[3px] border-black px-6 py-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">
                  Settings
                </h2>
              </div>

              <div className="p-6">
                <VideoToAudioSettings
                  outputFormat={outputFormat}
                  setOutputFormat={setOutputFormat}
                  quality={quality}
                  setQuality={setQuality}
                  sampleRate={sampleRate}
                  setSampleRate={setSampleRate}
                  channels={channels}
                  setChannels={setChannels}
                  loading={loading}
                  hasVideo={!!videoFile && ffmpegLoaded}
                  privacyItems={privacyItems}
                  onExtract={handleExtractAudio}
                />
              </div>
            </div>
          </div>

          {/* AFTER CONVERSION */}
          {audioFile && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start animate-fadeIn">
              <div>
                <AudioStats
                  originalVideoSize={originalVideoSize}
                  extractedAudioSize={extractedAudioSize}
                  format={OUTPUT_FORMATS[outputFormat].label}
                  quality={quality}
                />
              </div>

              <div className="space-y-6">
                <AudioPreviewCard
                  audioUrl={objectUrl}
                  file={audioFile}
                  onDownload={handleDownload}
                  onClear={() => {
                    setAudioFile(null);
                    if (objectUrl) URL.revokeObjectURL(objectUrl);
                    setObjectUrl(null);
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

export default VideoToAudio;

