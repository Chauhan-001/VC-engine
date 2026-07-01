export default function DownloadButton({ onDownload, disabled }) {
  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={disabled}
      className="rounded-full border border-[#22c55e] bg-[#22c55e] px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-black transition-all hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      Download
    </button>
  );
}
