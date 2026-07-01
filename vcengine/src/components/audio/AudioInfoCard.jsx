import { formatFileSize } from "../../utils/audio/formatTime";

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[#1a1a1a] py-2 last:border-b-0">
      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
      <span className="font-mono text-xs font-black uppercase text-white">{value || "—"}</span>
    </div>
  );
}

function formatDuration(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function AudioInfoCard({ file, metadata }) {
  if (!file) return null;

  const ext = file.name.split(".").pop()?.toUpperCase() || "UNKNOWN";
  const duration =
    metadata?.duration != null ? formatDuration(metadata.duration) : "—";

  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Audio Information</h2>
      </div>
      <div className="p-6">
        <div className="space-y-1">
          <StatRow label="File Name" value={file.name} />
          <StatRow label="Format" value={metadata?.format || ext} />
          <StatRow label="Duration" value={duration} />
          <StatRow label="Bitrate" value={metadata?.bitrate || "—"} />
          <StatRow label="File Size" value={formatFileSize(file.size)} />
          <StatRow label="Channels" value={metadata?.channels || "—"} />
          <StatRow label="Sample Rate" value={metadata?.sampleRate || "—"} />
        </div>

        <div className="mt-6 border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
          <p className="font-mono text-[10px] font-bold uppercase text-gray-500 mb-2">Preview</p>
          <audio
            src={URL.createObjectURL(file)}
            controls
            preload="metadata"
            className="w-full h-8"
          />
        </div>
      </div>
    </div>
  );
}
