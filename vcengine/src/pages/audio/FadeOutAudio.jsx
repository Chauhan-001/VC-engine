import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { fetchFile } from "@ffmpeg/util";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioResultCard from "../../components/audio/AudioResultCard";
import AudioProgress from "../../components/audio/AudioProgress";
import AudioInfoCard from "../../components/audio/AudioInfoCard";
import AudioSettingsCard from "../../components/audio/AudioSettingsCard";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";
import { formatFileSize } from "../../utils/audio/formatTime";

export default function FadeOutAudio() {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [fadeSec, setFadeSec] = useState(5);
  const [result, setResult] = useState(null);

  function handleFileSelected(files) {
    const f = files?.[0];
    if (!f) return;
    setAudioFile(f);
    setResult(null);
    setError(null);
  }

  async function handleFade() {
    if (!audioFile) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const ffmpeg = await createFFmpegInstance();
      const ext = audioFile.name.split(".").pop() || "mp3";
      const inputName = `input.${ext}`;
      const outputName = `fadeout.mp3`;

      await ffmpeg.writeFile(inputName, await fetchFile(audioFile));

      ffmpeg.on("progress", ({ progress }) => {
        if (typeof progress === "number") setProgress(Math.round(progress * 100));
      });

      await ffmpeg.exec(["-i", inputName, "-af", `afade=t=out:d=${fadeSec}`, "-c:a", "libmp3lame", "-b:a", "192k", outputName]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: "audio/mpeg" });
      const fileOut = new File([blob], outputName, { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      await ffmpeg.deleteFile(inputName).catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});

      setResult({
        file: fileOut,
        url,
        stats: [
          { label: "Fade Out", value: `${fadeSec}s` },
          { label: "Output Size", value: formatFileSize(blob.size) },
        ],
      });
    } catch (e) {
      console.error(e);
      setError(e?.message || "Fade out failed");
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
          <Link to="/" className="mb-10 inline-flex items-center gap-2 font-mono text-sm uppercase text-gray-400 transition-colors hover:text-[#ff3b30]">
            <ArrowLeft size={18} />
            Back To Home
          </Link>

          <div className="mb-12">
            <h1 className="text-6xl font-black uppercase">Fade Out</h1>
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

              <AudioSettingsCard title="Fade Options">
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-3">Duration</h3>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={fadeSec}
                    onChange={(e) => setFadeSec(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-gray-500">
                    <span>1s</span>
                    <span className="text-white font-bold">{fadeSec}s</span>
                    <span>20s</span>
                  </div>
                </div>
              </AudioSettingsCard>

              {loading && <AudioProgress progress={progress} label="Applying" />}

              <button
                type="button"
                onClick={handleFade}
                disabled={loading || !audioFile}
                className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
              >
                {loading ? "Applying..." : "Apply Fade Out"}
              </button>
            </div>
            <div className="space-y-6">
              {audioFile && <AudioInfoCard file={audioFile} metadata={null} />}
            </div>
          </div>

          {result && (
            <div className="mt-10">
              <AudioResultCard
                file={result.file}
                url={result.url}
                stats={result.stats}
                downloadLabel="Download Fade Out Audio"
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

