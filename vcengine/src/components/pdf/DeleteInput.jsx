import { useId } from "react";

export default function DeleteInput({
  value,
  onChange,
  pageCount,
  error,
  disabled,
  ariaLabel,
}) {
  const id = useId();

  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#161616]
        p-5
        shadow-[4px_4px_0px_0px_black]
      "
    >
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-wider text-gray-400">
        Pages to Delete
      </label>

      <div className="mt-3">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          aria-label={ariaLabel}
          placeholder={pageCount ? `e.g. 1,5,8-12 (1-${pageCount})` : "e.g. 5 or 1-4"}
          className="
            w-full
            border-[3px]
            border-black
            bg-[#0f0f0f]
            px-4
            py-3
            font-mono
            text-sm
            font-bold
            text-white
            shadow-[4px_4px_0px_0px_black]
            outline-none
            transition-all
            focus:border-[#0066ff]
            focus:shadow-[6px_6px_0px_0px_black]
          "
        />
      </div>

      <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-gray-400">
        Supports: Single (5), Range (1-4), Mixed (1,5,8-12,20)
      </div>

      {error && (
        <div className="mt-3 border-[3px] border-black bg-[#0f0f0f] p-3">
          <p className="font-mono text-xs font-bold uppercase text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}

