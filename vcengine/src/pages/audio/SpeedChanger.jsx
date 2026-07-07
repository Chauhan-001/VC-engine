import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";
import { changeSpeed } from "../../utils/audio/changeSpeed";
import { formatFileSize, formatTime } from "../../utils/audio/formatTime";
import { probeAudioMetadata } from "../../utils/audio/probeAudio";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioSettingsCard from "../../components/audio/AudioSettingsCard";
import AudioResultCard from "../../components/audio/AudioResultCard";
import AudioProgress from "../../components/audio/AudioProgress";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioInfoCard from "../../components/audio/AudioInfoCard";

const SPEEDS = ["0.5", "0.75", "1", "1.25", "1.5", "2"];
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

export default function SpeedChanger() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [preservePitch, setPreservePitch] = useState(false);
  const [format, setFormat] = useState("mp3");
  const [quality, setQuality] = useState("high");
  const [result, setResult] = useState(null);

  function handleFileSelected(file) {
    if (!file) return;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
    probeAudioMetadata(file).then((meta) => setMetadata(meta));
  }

  async function handleChange() {
    if (!audioFile) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const originalDuration = metadata?.duration || 0;
      const { file, url, size } = await changeSpeed({
        file: audioFile,
        speed: parseFloat(speed),
        preservePitch,
        outputFormat: format,
        quality,
        onProgress: (p) => setProgress(p),
      });

      setResult({
        file,
        url,
        stats: [
          { label: "Original Duration", value: formatTime(originalDuration), sub: "Original file" },
          { label: "New Duration", value: formatTime(originalDuration / parseFloat(speed)), sub: `At ${speed}x speed` },
          { label: "Output Size", value: formatFileSize(size) },
        ],
      });
    } catch (e) {
      console.error("Speed error:", e);
      setError(e?.message || "Speed change failed");
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
            <h1 className="text-6xl font-black uppercase">Speed Changer</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Adjust audio playback speed.</p>
          </div>

          {error && (
            <div className="mb-8 border-[3px] border-red-500 bg-[#1a0a0a] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-6">
              {!audioFile ? (
                <AudioUploadZone onFilesSelected={(files) => handleFileSelected(files[0])} />
              ) : (
                <>
                  <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6 text-center">
                    <label className="cursor-pointer inline-block border-[2px] border-black bg-[#111] px-6 py-2.5 font-mono text-xs font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] hover:-translate-y-[1px] transition-all">
                      Change File
                      <input
                        type="file"
                        accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
                        onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <AudioSettingsCard title="Speed Options">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Preset</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {SPEEDS.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSpeed(parseFloat(s))}
                              className={`border-[2px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${speed === parseFloat(s) ? "bg-[#ff3b30] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}
                            >
                              {s}x
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Custom</h3>
                        <input
                          type="range"
                          min="0.5"
                          max="3"
                          step="0.05"
                          value={speed}
                          onChange={(e) => setSpeed(parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between font-mono text-[10px] text-gray-500">
                          <span>0.5x</span>
                          <span className="text-white font-bold">{speed.toFixed(2)}x</span>
                          <span>3x</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Preserve Pitch</h3>
                        <button
                          type="button"
                          onClick={() => setPreservePitch(!preservePitch)}
                          className={`border-[2px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${preservePitch ? "bg-[#22c55e] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}
                        >
                          {preservePitch ? "ON" : "OFF"}
                        </button>
                      </div>
                    </div>
                  </AudioSettingsCard>

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

                  {loading && <AudioProgress progress={progress} label="Processing" />}

                  <button
                    type="button"
                    onClick={handleChange}
                    disabled={loading}
                    className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
                  >
                    {loading ? "Processing..." : "Change Speed"}
                  </button>
                </>
              )}
            </div>

            <div className="space-y-6">
              {audioFile && (
                <AudioInfoCard file={audioFile} metadata={metadata} />
              )}
              <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
                <div className="border-b-[3px] border-black px-6 py-4">
                  <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Feature Strip</h2>
                </div>
                <div className="p-6 space-y-3">
                  {["Local Processing", "No Servers", "Fast Export", "Lossless Options"].map((feature) => (
                    <div key={feature} className="filter items-center gap-3">
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
                downloadLabel="Download Changed Speed Audio"
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