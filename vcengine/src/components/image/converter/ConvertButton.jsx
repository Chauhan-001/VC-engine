export default function ConvertButton({ onConvert, disabled, isBusy }) {
  return (
    <button
      type="button"
      onClick={onConvert}
      disabled={disabled || isBusy}
      className="rounded-full border border-[#0066ff] bg-[#0066ff] px-5 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isBusy ? "Converting..." : "Convert"}
    </button>
  );
}
