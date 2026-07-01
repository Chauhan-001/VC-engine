import { useMemo } from "react";

export default function MetadataControls({ state, setState }) {
  const options = useMemo(
    () => [
      {
        key: "keepExif",
        label: "Keep EXIF",
        hint: "Preserve camera metadata (best-effort).",
      },
      {
        key: "keepGps",
        label: "Keep GPS",
        hint: "Preserve GPS coordinates (best-effort).",
      },
      {
        key: "keepColorProfile",
        label: "Keep Color Profile",
        hint: "Preserve ICC profile when supported (best-effort).",
      },
      {
        key: "stripMetadata",
        label: "Strip Metadata",
        hint: "Remove metadata for maximum privacy.",
      },
    ],
    []
  );

  function toggleKeep(key) {
    if (key === "stripMetadata") {
      // In this UI, Strip metadata is a single switch. If enabled, we disable keep toggles.
      setState({
        keepExif: false,
        keepGps: false,
        keepColorProfile: false,
        stripMetadata: true,
      });
      return;
    }

    setState({
      [key]: !state[key],
      stripMetadata: false,
    });
  }

  const stripEnabled = !!state.stripMetadata;

  return (
    <div className="rounded border-[3px] border-black bg-[#0b0b0b] p-5 shadow-[4px_4px_0px_0px_black]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs font-bold uppercase text-[#0066ff]">
            Metadata
          </div>
          <div className="mt-2 text-sm font-bold text-gray-300">
            Privacy controls for EXIF / GPS
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
        {options.map((o) => {
          const checked = o.key === "stripMetadata" ? stripEnabled : !!state[o.key];
          const disabled =
            o.key !== "stripMetadata" ? stripEnabled : false;

          return (
            <label
              key={o.key}
              className={[
                "flex items-start gap-3 rounded border-[3px] border-black bg-[#0a0a0a] p-4 shadow-[4px_4px_0px_0px_black] transition-all",
                checked ? "bg-[#0066ff]/20" : "hover:-translate-y-[1px] hover:shadow-[6px_6px_0px_0px_black]",
                disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggleKeep(o.key)}
                className="mt-1"
              />
              <div>
                <div className="font-mono text-xs font-bold uppercase text-white">
                  {o.label}
                </div>
                <div className="mt-1 text-xs font-bold uppercase text-gray-400">
                  {o.hint}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="mt-4 border-t-[3px] border-black pt-4">
        <div className="font-mono text-[11px] font-bold uppercase text-gray-400">
          Note
        </div>
        <div className="mt-2 text-sm font-bold text-gray-300">
          In-browser re-encoding may not perfectly preserve or strip all metadata.
          “Strip Metadata” prioritizes privacy with best-effort encoding behavior.
        </div>
      </div>
    </div>
  );
}
