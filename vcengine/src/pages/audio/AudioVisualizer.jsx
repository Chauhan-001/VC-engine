import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AudioUploadZone from "../../components/audio/AudioUploadZone";
import AudioInfoCard from "../../components/audio/AudioInfoCard";

export default function AudioVisualizer() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [bufferLength, setBufferLength] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameRef = useRef(null);
  const canvasRef = useRef(null);
  const sourceRef = useRef(null);

  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileSelected(file) {
    if (!file) return;

    setError(null);
    setIsLoaded(false);
    setIsPlaying(false);

    // Clean up previous audio
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContext) {
      audioContext.close();
    }

    setAudioFile(file);
    setLoading(true);

    // Create audio context and load file
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);

    const fileUrl = URL.createObjectURL(file);

    fetch(fileUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        // Create analyser
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 2048;
        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        setAnalyser(analyserNode);
        setDataArray(dataArray);
        setBufferLength(bufferLength);

        // Create source (do not start yet; PLAY will start it)
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
        sourceRef.current = source;

        setIsLoaded(true);

        // Get metadata (simplified)
        setMetadata({
          duration: audioBuffer.duration.toFixed(2),
          sampleRate: `${audioBuffer.sampleRate} Hz`,
          channels: audioBuffer.numberOfChannels === 1 ? "Mono" : "Stereo",
          format: file.name.split(".").pop().toUpperCase(),
        });

        // Draw first frame right away (while still not playing)
        drawVisualizer();
      })
      .catch(err => {
        console.error("Error decoding audio:", err);
        setError("Failed to decode audio file");
      })
      .finally(() => {
        setLoading(false);
        try {
          URL.revokeObjectURL(fileUrl);
        } catch {}
      });
  }

  function togglePlay() {
    if (!isLoaded || !audioContext || !analyser || !dataArray) return;

    // first-time: create a new source + start playback
    if (!sourceRef.current) {
      const source = audioContext.createBufferSource();
      // audioBuffer is stored in decode step; we can re-use by reading from sourceRef buffer
      // NOTE: we set sourceRef.current.buffer in handleFileSelected below
      source.buffer = sourceRef.current?.buffer;
      // If buffer isn't present (because we cleared sourceRef), just bail
      if (!source.buffer) return;

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      sourceRef.current = source;
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        sourceRef.current = null;
      };

      source.start(0);
      return;
    }

    // subsequent toggles: suspend/resume context
    if (isPlaying) {
      audioContext.suspend();
    } else {
      audioContext.resume();
      // If context resumes but source has already ended, visualization will still work only on next upload.
    }
    setIsPlaying(!isPlaying);
  }

  function resizeCanvasToDisplaySize() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const nextW = Math.max(1, Math.round(rect.width));
    const nextH = Math.max(1, Math.round(rect.height));

    if (canvas.width !== nextW) canvas.width = nextW;
    if (canvas.height !== nextH) canvas.height = nextH;
  }

  function drawVisualizer() {
    if (!analyser || !dataArray || !canvasRef.current) return;

    resizeCanvasToDisplaySize();

    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ctx = canvas.getContext("2d");

    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0066ff";
    ctx.beginPath();

    const sliceWidth = canvasWidth * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvasHeight / 2;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }

    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    animationFrameRef.current = requestAnimationFrame(drawVisualizer);
  }

  useEffect(() => {
    // start loop once loaded; loop will render only when analyser updates
    if (isLoaded && analyser && dataArray) {
      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch {}
        try {
          sourceRef.current.disconnect();
        } catch {}
      }
      sourceRef.current = null;

      if (audioContext) {
        audioContext.close();
      }

      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, analyser, dataArray]);

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
            <h1 className="text-6xl font-black uppercase">Audio Visualizer</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-400">Visualize audio waveforms in real-time.</p>
          </div>

          {error && (
            <div className="mb-8 border-[3px] border-red-500 bg-[#1a0a0a] p-5 font-mono text-sm font-bold uppercase text-white shadow-[6px_6px_0px_0px_black]">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {!audioFile ? (
              <AudioUploadZone onFilesSelected={(files) => handleFileSelected(files[0])} />
            ) : (
              <>
                <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Audio Visualization</h2>
                    <button
                      onClick={togglePlay}
                      className={`border-[2px] border-black px-4 py-2 font-mono text-xs font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] ${isPlaying ? "bg-[#ff3b30]" : "bg-[#111]"}`}
                    >
                      {isPlaying ? "PAUSE" : "PLAY"}
                    </button>
                  </div>
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-96 bg-[#0a0a0a]"
                      width="800"
                      height="400"
                    />
                  </div>
                </div>

                {metadata && (
                  <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black] mt-4">
                    <div className="border-b-[3px] border-black px-6 py-4">
                      <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Audio Information</h2>
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-gray-500">Duration</span>
                        <span className="font-mono text-xs font-black text-white">{metadata?.duration}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-gray-500">Sample Rate</span>
                        <span className="font-mono text-xs font-black text-white">{metadata?.sampleRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-gray-500">Channels</span>
                        <span className="font-mono text-xs font-black text-white">{metadata?.channels}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase text-gray-500">Format</span>
                        <span className="font-mono text-xs font-black text-white">{metadata?.format}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}