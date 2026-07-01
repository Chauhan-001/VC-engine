import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

const OUTPUT_FORMATS = {
  mp3: { ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  ogg: { ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

const BITRATES = { high: "320k", balanced: "192k", small: "128k" };

export async function applyFade({ file, type = "in", duration = 2, outputFormat = "mp3", quality = "high", onProgress }) {
  const ffmpeg = await createFFmpegInstance();
  const bitrate = BITRATES[quality] || "320k";
  const fmt = OUTPUT_FORMATS[outputFormat] || OUTPUT_FORMATS.mp3;
  const inputName = `input.${file.name.split(".").pop()}`;
  const outputName = `output.${fmt.ext}`;

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  const filter = type === "in" ? `afade=t=in:st=0:d=${duration}` : `afade=t=out:st=0:d=${duration}`;

  const cmd = [
    "-i", inputName,
    "-filter:a", filter,
    "-c:a", fmt.codec,
  ];

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
  const fileOut = new File([blob], `fade-${type}-${file.name.replace(/\.[^/.]+$/, "")}.${fmt.ext}`, { type: fmt.mime });

  return { file: fileOut, url: URL.createObjectURL(blob), size: blob.size };
}

export { OUTPUT_FORMATS, BITRATES };
