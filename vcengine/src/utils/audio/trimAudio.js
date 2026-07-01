import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

const OUTPUT_FORMATS = {
  mp3: { ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  ogg: { ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

export async function trimAudio({
  file,
  startTime,
  endTime,
  outputFormat = "mp3",
  quality = "high",
  onProgress,
}) {
  const ffmpeg = await createFFmpegInstance();

  const inputExt = file.name.split(".").pop() || "mp3";
  const inputName = `input.${inputExt}`;
  const fmt = OUTPUT_FORMATS[outputFormat] || OUTPUT_FORMATS.mp3;
  const outputName = `output.${fmt.ext}`;

  const bitrates = { high: "320k", balanced: "192k", small: "128k" };
  const bitrate = bitrates[quality] || "320k";

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  let cmd = ["-i", inputName];

  if (outputFormat === "mp3") {
    cmd = ["-i", inputName, "-ss", String(startTime), "-to", String(endTime), "-c:a", fmt.codec, "-b:a", bitrate];
  } else if (outputFormat === "wav") {
    cmd = ["-i", inputName, "-ss", String(startTime), "-to", String(endTime), "-c:a", fmt.codec];
  } else {
    cmd = ["-i", inputName, "-ss", String(startTime), "-to", String(endTime), "-c:a", fmt.codec, "-b:a", bitrate];
  }

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
      await ffmpeg.deleteFile(outputName);
    } catch {
      console.log("Cleanup skipped");
    }
  }

  const data = await ffmpeg.readFile(outputName);
  const blob = new Blob([data], { type: fmt.mime });
  const fileOut = new File([blob], `trimmed.${fmt.ext}`, { type: fmt.mime });

  return { file: fileOut, url: URL.createObjectURL(blob), size: blob.size };
}
