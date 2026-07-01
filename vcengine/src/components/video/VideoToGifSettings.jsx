import GifQualitySelector from "./GifQualitySelector";
import GifResolutionSelector from "./GifResolutionSelector";
import GifDurationSelector from "./GifDurationSelector";
import GifStartSelector from "./GifStartSelector";
import GenerateGifButton from "./GenerateGifButton";
import PrivacyCard from "./PrivacyCard";

export default function VideoToGifSettings({
  quality,
  setQuality,
  resolution,
  setResolution,
  fps,
  setFps,
  duration,
  setDuration,
  customDuration,
  setCustomDuration,
  startMode,
  setStartMode,
  startTime,
  setStartTime,
  loading,
  hasVideo,
  onGenerate,
  resolutionOptions,
  fpsOptions,
  durationOptions,
  startModeOptions,
}) {
  const privacyItems = [
    "Local Processing",
    "Browser Only",
    "No Uploads",
    "No Data Collection",
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <section>
          <h3 className="font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">GIF Quality</h3>
          <GifQualitySelector value={quality} onChange={setQuality} />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Resolution</h3>
          <GifResolutionSelector
            value={resolution}
            onChange={setResolution}
            options={resolutionOptions}
          />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Frame Rate</h3>
          <GifResolutionSelector
            value={fps}
            onChange={setFps}
            options={fpsOptions}
            isNumeric
          />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Duration</h3>
          <GifDurationSelector
            value={duration}
            customDuration={customDuration}
            options={durationOptions}
            onChange={setDuration}
            onCustomChange={setCustomDuration}
          />
        </section>

        <section>
          <h3 className="mt-6 font-mono text-sm font-bold uppercase text-white tracking-[0.2em]">Start Time</h3>
          <GifStartSelector
            value={startMode}
            startTime={startTime}
            options={startModeOptions}
            onChange={setStartMode}
            onTimeChange={setStartTime}
          />
        </section>
      </div>

      <PrivacyCard items={privacyItems} />

      <div className="flex justify-end">
        <GenerateGifButton
          disabled={!hasVideo || loading}
          loading={loading}
          onClick={onGenerate}
        />
      </div>
    </div>
  );
}

