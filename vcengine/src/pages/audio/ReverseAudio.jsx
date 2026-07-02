import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { fetchFile } from "@ffmpeg/util";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioResultCard from "../../components/audio/AudioResultCard";
import AudioProgress from "../../components/audio/AudioProgress";
import { createFFmpegInstance } from "../../utils/video/ffmpeg";
import { formatFileSize, formatTime } from "../../utils/audio/formatTime";
import { probeAudioMetadata } from "../../utils/audio/probeAudio";

import AudioInfoCard from "../../components/audio/AudioInfoCard";
import AudioSettingsCard from "../../components/audio/AudioSettingsCard";

const FORMATS = [
  { v: "mp3", label: "MP3" },
  { v: "wav", label: "WAV" },
  { v: "ogg", label: "OGG" },
];

const OUTPUT_FORMATS = {
  mp3: { ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  ogg: { ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

export default function ReverseAudio() {
  const [audioFile, setAudioFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [format, setFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  function handleFileSelected(files) {
    const file = files?.[0];
    if (!file) return;
    setAudioFile(file);
    setResult(null);
    setError(null);
    setMetadata(null);
    probeAudioMetadata(file)
      .then((m) => setMetadata(m))
      .catch(() => setMetadata(null));
  }

  async function handleReverse() {
    if (!audioFile) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const ffmpeg = await createFFmpegInstance();
      const ext = audioFile.name.split(".").pop() || "mp3";
      const inputName = `input.${ext}`;
      const fmt = OUTPUT_FORMATS[format] || OUTPUT_FORMATS.mp3;
      const outputName = `reversed.${fmt.ext}`;

      await ffmpeg.writeFile(inputName, await fetchFile(audioFile));

      ffmpeg.on("progress", ({ progress }) => {
        if (typeof progress === "number") setProgress(Math.round(progress * 100));
      });

      // reverse audio by using asetpts + atrim is complex; ffmpeg has a simple reverse filter: areverse
      await ffmpeg.exec([
        "-i", inputName,
        "-filter:a", "areverse",
        "-c:a", fmt.codec,
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: fmt.mime });
      const fileOut = new File([blob], outputName, { type: fmt.mime });
      const url = URL.createObjectURL(blob);

      await ffmpeg.deleteFile(inputName).catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});

      setResult({
        file: fileOut,
        url,
        stats: [
          { label: "Original Duration", value: formatTime(metadata?.duration || 0) },
          { label: "Output Size", value: formatFileSize(blob.size) },
        ],
      });
    } catch (e) {
      console.error("Reverse error:", e);
      setError(e?.message || "Reverse audio failed");
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
            <h1 className="text-6xl font-black uppercase">Reverse Audio</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Play audio backwards locally.</p>
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

              <AudioSettingsCard title="Output Settings">
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
              </AudioSettingsCard>

              {loading && <AudioProgress progress={progress} label="Reversing" />}

              <button
                type="button"
                onClick={handleReverse}
                disabled={loading || !audioFile}
                className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
              >
                {loading ? "Reversing..." : "Reverse Audio"}
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
                downloadLabel="Download Reversed Audio"
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

