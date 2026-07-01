import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

const OUTPUT_FORMATS = {
  mp3: { ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  ogg: { ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

const BITRATES = { high: "320k", balanced: "192k", small: "128k" };

function buildAtempoFilter(speed) {
  if (speed === 1) return null;
  if (speed >= 0.5 && speed <= 2) return `atempo=${speed}`;
  const parts = [];
  let remaining = speed;
  while (remaining > 2) {
    parts.push("atempo=2");
    remaining /= 2;
  }
  while (remaining < 0.5) {
    parts.push("atempo=0.5");
    remaining /= 0.5;
  }
  if (remaining !== 1) parts.push(`atempo=${remaining}`);
  return parts.join(",");
}

export async function changeSpeed({ file, speed, preservePitch = false, outputFormat = "mp3", quality = "high", onProgress }) {
  const ffmpeg = await createFFmpegInstance();
  const bitrate = BITRATES[quality] || "320k";
  const fmt = OUTPUT_FORMATS[outputFormat] || OUTPUT_FORMATS.mp3;
  const inputName = `input.${file.name.split(".").pop()}`;
  const outputName = `output.${fmt.ext}`;

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  const atempoFilter = buildAtempoFilter(speed);
  const cmd = ["-i", inputName];

  if (atempoFilter) {
    if (preservePitch) {
      cmd.push("-filter:a", atempoFilter);
    } else {
      cmd.push("-filter:a", `${atempoFilter},asetnsamples=48000`);
    }
  }

  cmd.push("-c:a", fmt.codec);

  if (outputFormat === "mp3") cmd.push("-b:a", bitrate);
  cmd.push(outputName);

  try {
    ffmpeg.on("progress", ({ progress }) => {
      if (typeof progress === "number" && onProgress) {
        onProgress(Math.round(progress * 100));
      }
    });

    await ffmpeg.exec(cmd);
  } finally {
    try {
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName).catch(() => {});
    } catch {
      console.log("Cleanup skipped");
    }
  }

  const data = await ffmpeg.readFile(outputName);
  const blob = new Blob([data], { type: fmt.mime });
  const fileOut = new File([blob], `speed-${speed}x-${file.name.replace(/\.[^/.]+$/, "")}.${fmt.ext}`, { type: fmt.mime });

  return { file: fileOut, url: URL.createObjectURL(blob), size: blob.size };
}

export { OUTPUT_FORMATS, BITRATES };
