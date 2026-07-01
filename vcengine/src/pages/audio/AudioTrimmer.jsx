import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { fetchFile } from "@ffmpeg/util";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioResultCard from "../../components/audio/AudioResultCard";
import AudioProgress from "../../components/audio/AudioProgress";
import AudioSettingsCard from "../../components/audio/AudioSettingsCard";
import AudioInfoCard from "../../components/audio/AudioInfoCard";
import AudioPlayer from "../../components/audio/AudioPlayer";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";
import { formatFileSize, formatTime } from "../../utils/audio/formatTime";
import { probeAudioMetadata } from "../../utils/audio/probeAudio";

export default function AudioTrimmer() {
  const [audioFile, setAudioFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(null);
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [result, setResult] = useState(null);

  const duration = metadata?.duration || 0;

  async function handlePreviewTruncation(ffmpeg, inputName, start, end, codec, outputName) {
    await ffmpeg.exec([
      "-i", inputName,
      "-ss", String(start),
      "-to", String(end),
      "-c:a", codec,
      outputName,
    ]);
  }

  function handleFileSelected(files) {
    const file = files?.[0];
    if (!file) return;
    setAudioFile(file);
    setMetadata(null);
    setResult(null);
    setError(null);
    probeAudioMetadata(file)
      .then((m) => {
        setMetadata(m);
        setTrimStart(0);
        setTrimEnd(m?.duration || 0);
      })
      .catch(() => setMetadata(null));
  }

  async function handleTrim() {
    if (!audioFile) return;
    if (!duration) {
      setError("Could not read audio duration");
      return;
    }
    const start = Math.max(0, trimStart);
    const end = Math.min(duration, trimEnd || duration);
    if (end <= start) {
      setError("Invalid trim range");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const ffmpeg = await createFFmpegInstance();
      const inputExt = audioFile.name.split(".").pop() || "mp3";
      const inputName = `input.${inputExt}`;
      const outputName = `trim.${outputFormat === "wav" ? "wav" : "mp3"}`;

      await ffmpeg.writeFile(inputName, await fetchFile(audioFile));

      const codec = outputFormat === "wav" ? "pcm_s16le" : "libmp3lame";

      ffmpeg.on("progress", ({ progress }) => {
        if (typeof progress === "number") setProgress(Math.round(progress * 100));
      });

      await handlePreviewTruncation(ffmpeg, inputName, start, end, codec, outputName);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: outputFormat === "wav" ? "audio/wav" : "audio/mpeg" });
      const fileOut = new File([blob], outputName, { type: blob.type });
      const url = URL.createObjectURL(blob);

      await ffmpeg.deleteFile(inputName).catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});

      setResult({
        file: fileOut,
        url,
        stats: [
          { label: "Original Duration", value: formatTime(duration) },
          { label: "Trimmed Duration", value: formatTime(end - start) },
          { label: "Output Size", value: formatFileSize(blob.size) },
        ],
      });
    } catch (e) {
      console.error("Trim error:", e);
      setError(e?.message || "Audio trimming failed");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  function handleDownload() {
    if (!result?.file) return;
    const url = URL.createObjectURL(result.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-[1400px] px-6 pb-24">
          <Link to="/audio" className="mb-10 inline-flex items-center gap-2 font-mono text-sm uppercase text-gray-400 transition-colors hover:text-[#ff3b30]">
            <ArrowLeft size={18} />
            Back To Audio Studio
          </Link>

          <div className="mb-12">
            <h1 className="text-6xl font-black uppercase">Audio Trimmer</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Trim audio segments locally.</p>
          </div>

          {error && (
            <div className="mb-8 border-[3px] border-red-500 bg-[#1a0a0a] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-6">
              {!audioFile ? (
                <AudioUploadZone onFilesSelected={handleFileSelected} />
              ) : (
                <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6 text-center">
                  <p className="font-mono text-sm font-bold">{audioFile.name}</p>
                </div>
              )}

              {metadata?.duration != null && (
                <AudioSettingsCard title="Trim Range">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Start (sec)</h3>
                      <input
                        type="range"
                        min={0}
                        max={duration}
                        step={0.1}
                        value={trimStart}
                        onChange={(e) => setTrimStart(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between font-mono text-[10px] text-gray-500">
                        <span>0</span>
                        <span className="text-white font-bold">{trimStart.toFixed(1)}s</span>
                        <span>{duration.toFixed(1)}s</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">End (sec)</h3>
                      <input
                        type="range"
                        min={0}
                        max={duration}
                        step={0.1}
                        value={trimEnd ?? duration}
                        onChange={(e) => setTrimEnd(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between font-mono text-[10px] text-gray-500">
                        <span>0</span>
                        <span className="text-white font-bold">{(trimEnd ?? duration).toFixed(1)}s</span>
                        <span>{duration.toFixed(1)}s</span>
                      </div>
                    </div>
                  </div>
                </AudioSettingsCard>
              )}

              <AudioSettingsCard title="Output">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Format</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {["mp3", "wav"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setOutputFormat(f)}
                          className={`border-[2px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${outputFormat === f ? "bg-[#ff3b30] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}
                        >
                          {f.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </AudioSettingsCard>

              {loading && <AudioProgress progress={progress} label="Trimming" />}

              <button
                type="button"
                onClick={handleTrim}
                disabled={loading || !audioFile}
                className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
              >
                {loading ? "Trimming..." : "Trim Audio"}
              </button>
            </div>

            <div className="space-y-6">
              {audioFile && <AudioInfoCard file={audioFile} metadata={metadata} />}
            </div>
          </div>

          {result && (
            <div className="mt-10">
              <AudioResultCard
                file={result.file}
                url={result.url}
                stats={result.stats}
                downloadLabel="Download Trimmed Audio"
                onDownload={handleDownload}
                onClear={() => setResult(null)}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

