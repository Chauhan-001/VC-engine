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
import { createFFmpegInstance } from "../../utils/video/ffmpeg";
import { formatFileSize } from "../../utils/audio/formatTime";

export default function Mp3ToWav() {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  function handleFileSelected(files) {
    const f = files?.[0];
    if (!f) return;
    setAudioFile(f);
    setResult(null);
    setError(null);
  }

  async function handleConvert() {
    if (!audioFile) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      const ffmpeg = await createFFmpegInstance();
      const inputName = `input.${audioFile.name.split(".").pop() || "mp3"}`;
      const outputName = `output.wav`;
      await ffmpeg.writeFile(inputName, await fetchFile(audioFile));

      ffmpeg.on("progress", ({ progress }) => {
        if (typeof progress === "number") setProgress(Math.round(progress * 100));
      });

      await ffmpeg.exec(["-i", inputName, "-c:a", "pcm_s16le", outputName]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: "audio/wav" });
      const fileOut = new File([blob], `converted.wav`, { type: "audio/wav" });
      const url = URL.createObjectURL(blob);

      await ffmpeg.deleteFile(inputName).catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});

      setResult({
        file: fileOut,
        url,
        stats: [{ label: "Output Size", value: formatFileSize(blob.size) }],
      });
    } catch (e) {
      console.error(e);
      setError(e?.message || "Conversion failed");
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
            <h1 className="text-6xl font-black uppercase">Mp3 to Wav</h1>
          </div>

          {error && (
            <div className="mb-8 border-[3px] border-red-500 bg-[#1a0a0a] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-6">
              {!audioFile ? <AudioUploadZone onFilesSelected={handleFileSelected} accept="audio/mpeg,.mp3" /> : <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6 text-center"><p className="font-mono text-sm font-bold">{audioFile.name}</p></div>}
              {loading && <AudioProgress progress={progress} label="Converting" />}
              <button type="button" onClick={handleConvert} disabled={loading || !audioFile} className="border-[3px] border-black bg-[#ff3b30] px-8 py-4 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all">{loading ? "Converting..." : "Convert"}</button>
            </div>
            <div className="space-y-6">{audioFile && <AudioInfoCard file={audioFile} metadata={null} />}</div>
          </div>

          {result && (
            <div className="mt-10">
              <AudioResultCard file={result.file} url={result.url} stats={result.stats} downloadLabel="Download WAV" onDownload={handleDownload} onClear={() => setResult(null)} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

