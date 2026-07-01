import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

const OUTPUT_FORMATS = {
  mp3: { ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  ogg: { ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

const BITRATES = { high: "320k", balanced: "192k", small: "128k" };

export async function splitAudio({ file, segments, outputFormat = "mp3", quality = "high", onProgress }) {
  const ffmpeg = await createFFmpegInstance();
  const bitrate = BITRATES[quality] || "320k";
  const fmt = OUTPUT_FORMATS[outputFormat] || OUTPUT_FORMATS.mp3;
  const ext = file.name.split(".").pop();
  const inputName = `input.${ext}`;

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  const results = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const outputName = `part_${i + 1}.${fmt.ext}`;

    const cmd = [
      "-i", inputName,
      "-ss", String(seg.start),
      "-to", String(seg.end),
      "-c:a", fmt.codec,
    ];

    if (outputFormat === "mp3") cmd.push("-b:a", bitrate);
    cmd.push(outputName);

    try {
      ffmpeg.on("progress", ({ progress }) => {
        if (typeof progress === "number" && onProgress) {
          onProgress(Math.round(((i + (progress || 0)) / segments.length) * 100));
        }
      });

      await ffmpeg.exec(cmd);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: fmt.mime });
      const url = URL.createObjectURL(blob);
      results.push({
        name: `Part ${i + 1}.${fmt.ext}`,
        url,
        size: blob.size,
        blob,
        start: seg.start,
        end: seg.end,
      });
    } catch (e) {
      console.error(`Segment ${i + 1} error:`, e);
    }
  }

  try {
    await ffmpeg.deleteFile(inputName);
    for (let i = 0; i < segments.length; i++) {
      await ffmpeg.deleteFile(`part_${i + 1}.${fmt.ext}`).catch(() => {});
    }
  } catch {
    console.log("Cleanup skipped");
  }

  return results;
}

export function computeSegments(duration, mode, value) {
  const segments = [];
  if (mode === "time") {
    const interval = value;
    let start = 0;
    while (start < duration) {
      const end = Math.min(start + interval, duration);
      segments.push({ start, end });
      start = end;
    }
  } else {
    const count = value;
    const segDuration = duration / count;
    for (let i = 0; i < count; i++) {
      segments.push({ start: i * segDuration, end: (i + 1) * segDuration });
    }
  }
  return segments;
}

export { OUTPUT_FORMATS, BITRATES };
