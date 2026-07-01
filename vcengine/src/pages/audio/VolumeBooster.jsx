import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { changeVolume } from "../../utils/audio/changeVolume";
import { probeAudioMetadata } from "../../utils/audio/probeAudio";
import { formatFileSize, formatTime } from "../../utils/audio/formatTime";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioSettingsCard from "../../components/audio/AudioSettingsCard";
import AudioResultCard from "../../components/audio/AudioResultCard";
import AudioProgress from "../../components/audio/AudioProgress";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioInfoCard from "../../components/audio/AudioInfoCard";

const SPEEDS = ["25", "50", "100", "150", "200", "300"];
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

export default function VolumeBooster() {
  const [audioFile, setAudioFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const [volumePct, setVolumePct] = useState(100); // 0..500
  const [format, setFormat] = useState("mp3");
  const [quality, setQuality] = useState("high");

  const [result, setResult] = useState(null);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  function handleFileSelected(files) {
    const file = files?.[0];
    if (!file) return;
    setAudioFile(file);
    setMetadata(null);
    setResult(null);
    setError(null);
    probeAudioMetadata(file)
      .then((m) => setMetadata(m))
      .catch(() => setMetadata(null));
  }

  async function handleBoost() {
    if (!audioFile) return;
    const volume = Math.max(0, Math.min(5, volumePct / 100));

    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const originalDuration = metadata?.duration || 0;
      const { file, url, size } = await changeVolume({
        file: audioFile,
        volume,
        outputFormat: format,
        quality,
        onProgress: (p) => setProgress(p),
      });

      setResult({
        file,
        url,
        stats: [
          { label: "Original Duration", value: formatTime(originalDuration), sub: "Original file" },
          { label: "Volume", value: `${volumePct}%`, sub: `volume=${volume.toFixed(2)}` },
          { label: "Output Size", value: formatFileSize(size) },
        ],
      });
    } catch (e) {
      console.error("Volume error:", e);
      setError(e?.message || "Volume boost failed");
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
            <h1 className="text-6xl font-black uppercase">Volume Booster</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Adjust audio loudness locally.</p>
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

              <AudioSettingsCard title="Volume Control">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Presets</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {SPEEDS.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setVolumePct(Number(v))}
                          className={`border-[2px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-[1px] ${volumePct === Number(v) ? "bg-[#ff3b30] text-white" : "bg-[#111] text-gray-400 hover:text-white"}`}
                        >
                          {v}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Custom</h3>
                    <input
                      type="range"
                      min={0}
                      max={500}
                      step={1}
                      value={volumePct}
                      onChange={(e) => setVolumePct(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-gray-500">
                      <span>0%</span>
                      <span className="text-white font-bold">{volumePct}%</span>
                      <span>500%</span>
                    </div>
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

              {loading && <AudioProgress progress={progress} label="Boosting" />}

              <button
                type="button"
                onClick={handleBoost}
                disabled={loading || !audioFile}
                className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
              >
                {loading ? "Boosting..." : "Boost Volume"}
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
                downloadLabel="Download Boosted Audio"
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

