import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";
import { mergeAudio } from "../../utils/audio/mergeAudio";
import { formatFileSize, formatTime } from "../../utils/audio/formatTime";
import { probeAudioMetadata } from "../../utils/audio/probeAudio";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioSettingsCard from "../../components/audio/AudioSettingsCard";
import AudioQueue from "../../components/audio/AudioQueue";
import AudioResultCard from "../../components/audio/AudioResultCard";
import AudioProgress from "../../components/audio/AudioProgress";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioInfoCard from "../../components/audio/AudioInfoCard";

const FORMATS = [
  { v: "mp3", label: "MP3" },
  { v: "wav", label: "WAV" },
  { v: "ogg", label: "OGG" },
];
const QUALITIES = [
  { v: "high", label: "High" },
  { v: "balanced", label: "Balanced" },
  { v: "small", label: "Small Size" },
];

export default function AudioMerger() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("mp3");
  const [quality, setQuality] = useState("high");
  const [result, setResult] = useState(null);

  const totalDuration = queue.reduce((acc, item) => acc + (item.duration || 0), 0);

  function handleAddFiles(files) {
    setError(null);
    const newItems = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      duration: null,
      metadata: null,
    }));
    setQueue((q) => [...q, ...newItems]);
    setResult(null);

    newItems.forEach(async (item) => {
      try {
        const meta = await probeAudioMetadata(item.file);
        setQueue((q) => q.map((qi) => (qi.id === item.id ? { ...qi, duration: meta.duration, metadata: meta } : qi)));
      } catch {
        console.log("Probe failed for", item.file.name);
      }
    });
  }

  function handleRemove(index) {
    setQueue((q) => q.filter((_, i) => i !== index));
  }

  function handleClearAll() {
    setQueue([]);
    setResult(null);
    setProgress(0);
    setError(null);
  }

  async function handleMerge() {
    if (queue.length < 2) {
      setError("Add at least 2 audio files");
      return;
    }
    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const { file, url, size } = await mergeAudio({
        files: queue.map((q) => q.file),
        outputFormat: format,
        quality,
        onProgress: (p) => setProgress(p),
      });

      setResult({
        file,
        url,
        stats: [
          { label: "Original Duration", value: formatTime(totalDuration) },
          { label: "Output Size", value: formatFileSize(size) },
          { label: "Files Merged", value: String(queue.length) },
        ],
      });
    } catch (e) {
      console.error("Merge error:", e);
      setError(e?.message || "Merge failed");
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

      <main id="main-content" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-[1400px] px-6 pb-24">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 font-mono text-sm uppercase text-gray-400 transition-colors hover:text-[#ff3b30]">
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          <div className="mb-12">
            <h1 className="text-6xl font-black uppercase">Audio Merger</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Merge multiple audio files into a single track.</p>
          </div>

          {error && (
            <div className="mb-8 border-[3px] border-red-500 bg-[#1a0a0a] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-6">
              {queue.length === 0 ? (
                <AudioUploadZone onFilesSelected={handleAddFiles} />
              ) : (
                <>
                  <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6 text-center">
                    <label className="cursor-pointer inline-block border-[2px] border-black bg-[#111] px-6 py-2.5 font-mono text-xs font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all">
                      Add More Files
                      <input
                        type="file"
                        accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
                        multiple
                        onChange={(e) => e.target.files?.length && handleAddFiles(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <AudioQueue items={queue} totalDuration={formatTime(totalDuration)} onRemove={handleRemove} onClearAll={handleClearAll} />

                  <AudioSettingsCard title="Output Settings">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Format</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {FORMATS.map((f) => (
                            <button
                              key={f.v}
                              type="button"
                              onClick={() => setFormat(f.v)}
                              className={`border-[2px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${format === f.v ? "bg-[#ff3b30] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Quality</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {QUALITIES.map((q) => (
                            <button
                              key={q.v}
                              type="button"
                              onClick={() => setQuality(q.v)}
                              className={`border-[2px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${quality === q.v ? "bg-[#ff3b30] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}
                            >
                              {q.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AudioSettingsCard>

                  {loading && <AudioProgress progress={progress} label="Merging" />}

                  <button
                    type="button"
                    onClick={handleMerge}
                    disabled={loading || queue.length < 2}
                    className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
                  >
                    {loading ? "Merging..." : "Merge Audio"}
                  </button>
                </>
              )}
            </div>

            <div className="space-y-6">
              {queue[0]?.file && (
                <AudioInfoCard key={queue[0].file.name} file={queue[0].file} metadata={queue[0].metadata} />
              )}
              <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Feature Strip</h2>
                </div>
                <div className="p-6 space-y-3">
                  {["Local Processing", "No Servers", "Fast Export", "Lossless Options"].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex h-2 w-2 bg-[#22c55e]" />
                      <span className="font-mono text-xs font-bold uppercase text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {result && (
            <div className="mt-10">
              <AudioResultCard
                file={result.file}
                url={result.url}
                stats={result.stats}
                downloadLabel="Download Merged Audio"
                onDownload={handleDownload}
                onClear={handleClearAll}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
