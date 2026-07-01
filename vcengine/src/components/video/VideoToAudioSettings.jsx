import FormatSelector from "./FormatSelector";
import QualitySelector from "./QualitySelector";
import ExtractAudioButton from "./ExtractAudioButton";
import PrivacyCard from "./PrivacyCard";
import MultiRowSelect from "./MultiRowSelect";
import { Download } from "lucide-react";

export default function VideoToAudioSettings({
  outputFormat,
  setOutputFormat,
  quality,
  setQuality,
  sampleRate,
  setSampleRate,
  channels,
  setChannels,
  loading,
  hasVideo,
  privacyItems,
  onExtract,
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <section>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">
            Output Format
          </h3>
          <FormatSelector
            value={outputFormat}
            onChange={setOutputFormat}
          />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">
            Audio Quality
          </h3>
          <QualitySelector value={quality} onChange={setQuality} />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">
            Sample Rate
          </h3>
          <MultiRowSelect
            value={sampleRate}
            onChange={setSampleRate}
            options={[
              { value: "original", label: "ORIGINAL" },
              { value: "44100", label: "44.1 kHz" },
              { value: "48000", label: "48 kHz" },
            ]}
          />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">
            Channels
          </h3>
          <MultiRowSelect
            value={channels}
            onChange={setChannels}
            options={[
              { value: "original", label: "ORIGINAL" },
              { value: "mono", label: "MONO (1)" },
              { value: "stereo", label: "STEREO (2)" },
            ]}
          />
        </section>
      </div>

      <PrivacyCard items={privacyItems} />

      <div className="flex justify-end">
        <ExtractAudioButton
          disabled={!hasVideo || loading}
          loading={loading}
          onClick={onExtract}
        />
      </div>
    </div>
  );
}

