export default function AudioPlayer({ src, label }) {
  return (
    <div className="border-[2px] border-black bg-[#111111] p-4 shadow-[3px_3px_0px_0px_black]">
      {label && <p className="font-mono text-[10px] font-bold uppercase text-gray-500 mb-2">{label}</p>}
      <audio src={src} controls preload="metadata" className="w-full h-8" />
    </div>
  );
}
