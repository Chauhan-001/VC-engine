export default function PrivacyCard({ items }) {
  return (
    <div className="border-[3px] border-black bg-[#111111] p-6 shadow-[6px_6px_0px_0px_black]">
      <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white">Privacy</h3>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li
            key={it}
            className="font-mono text-xs uppercase text-gray-400"
          >
            • {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

