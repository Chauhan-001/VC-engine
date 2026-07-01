import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

export async function convertAudio({ file, outputFormat = "mp3", quality = "high", onProgress }) {
  const ffmpeg = await createFFmpegInstance();
  const bitrate = quality === "high" ? "320k" : quality === "balanced" ? "192k" : "128k";
  const inputName = `input.${file.name.split(".").pop()}`;
  const outputExt = outputFormat;
  const outputName = `output.${outputExt}`;
  const mimeMap = { mp3: "audio/mpeg", wav: "audio/wav", ogg: "audio/ogg" };
  const codecMap = { mp3: "libmp3lame", wav: "pcm_s16le", ogg: "libvorbis" };

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  const cmd = [
    "-i", inputName,
    "-c:a", codecMap[outputFormat] || codecMap.mp3,
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
  const blob = new Blob([data], { type: mimeMap[outputFormat] || "audio/mpeg" });
  const fileOut = new File([blob], `converted.${outputExt}`, { type: mimeMap[outputFormat] || "audio/mpeg" });

  return { file: fileOut, url: URL.createObjectURL(blob), size: blob.size };
}
