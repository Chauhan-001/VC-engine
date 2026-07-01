import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.esm.js";

export default function WaveformEditor({ audioFile, trimStart, trimEnd, onTrimChange }) {
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const regionsRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !audioFile) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#3a3a3a",
      progressColor: "#0066ff",
      cursorColor: "#ff3b30",
      cursorWidth: 2,
      height: 128,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      normalize: true,
    });

    const regions = ws.registerPlugin(RegionsPlugin.create());
    const zoom = ws.registerPlugin(ZoomPlugin.create({ maxZoom: 100 }));
    const timeline = ws.registerPlugin(TimelinePlugin.create({ height: 20, timeInterval: 5 }));

    wsRef.current = ws;
    regionsRef.current = regions;

    const url = URL.createObjectURL(audioFile);
    ws.load(url);

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());

      const start = trimStart || 0;
      const end = trimEnd || ws.getDuration();

      regions.clearRegions();

      const region = regions.addRegion({
        id: "trim",
        start,
        end,
        color: "rgba(0, 102, 255, 0.15)",
        drag: true,
        resize: true,
      });

      region.on("update", () => {
        const s = region.start;
        const e = region.end;
        onTrimChange?.(s, e);
      });
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));

    return () => {
      ws.destroy();
      URL.revokeObjectURL(url);
    };
  }, [audioFile]);

  function togglePlay() {
    wsRef.current?.playPause();
  }

  function stop() {
    if (!wsRef.current) return;
    wsRef.current.pause();
    wsRef.current.seekTo(0);
  }

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Waveform</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            disabled={!isReady}
            className="border-[2px] border-black bg-[#0066ff] px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
          <button
            type="button"
            onClick={stop}
            disabled={!isReady}
            className="border-[2px] border-black bg-[#111] px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            STOP
          </button>
        </div>
      </div>
      <div className="p-4">
        <div ref={containerRef} className="bg-[#0a0a0a] border-[2px] border-black" />
        {isReady && (
          <p className="mt-2 font-mono text-[10px] text-gray-500">
            Drag the handles to select trim region • Scroll to zoom • Drag region to move
          </p>
        )}
      </div>
    </div>
  );
}
