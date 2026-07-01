export default function CoverLetterBuilder() {
  return (
    <div className="border-[3px] border-black bg-[#161616] p-5 shadow-[6px_6px_0px_0px_black]">
      <h3 className="font-mono text-sm font-bold uppercase text-white">Cover Letter</h3>
      <p className="mt-2 font-mono text-xs uppercase text-gray-400">
        Scaffold only (to be expanded in subsequent iterations)
      </p>

      <div className="mt-4 space-y-3">
        <button className="w-full border-[2px] border-black bg-[#0066ff] px-4 py-3 font-mono text-[11px] font-bold uppercase text-white shadow-[2px_2px_0px_0px_black]">
          Generate Professional Cover Letter
        </button>
      </div>
    </div>
  );
}

