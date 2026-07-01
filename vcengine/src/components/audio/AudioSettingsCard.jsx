export default function AudioSettingsCard({ title, children }) {
  return (
    <div className="border-[3px] border-black bg-[#161616] shadow-[6px_6px_0px_0px_black]">
      <div className="border-b-[3px] border-black px-6 py-4">
        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
