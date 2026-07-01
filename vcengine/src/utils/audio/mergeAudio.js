import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

const OUTPUT_FORMATS = {
  mp3: { ext: "mp3", mime: "audio/mpeg", codec: "libmp3lame" },
  wav: { ext: "wav", mime: "audio/wav", codec: "pcm_s16le" },
  ogg: { ext: "ogg", mime: "audio/ogg", codec: "libvorbis" },
};

const BITRATES = { high: "320k", balanced: "192k", small: "128k" };

export async function mergeAudio({ files, outputFormat = "mp3", quality = "high", onProgress }) {
  const ffmpeg = await createFFmpegInstance();
  const bitrate = BITRATES[quality] || "320k";
  const fmt = OUTPUT_FORMATS[outputFormat] || OUTPUT_FORMATS.mp3;
  const outputName = `merged.${fmt.ext}`;

  const inputNames = [];
  const listContent = [];

  for (let i = 0; i < files.length; i++) {
    const ext = files[i].name.split(".").pop();
    const name = `in_${i}.${ext}`;
    inputNames.push(name);
    listContent.push(`file '${name}'`);
    await ffmpeg.writeFile(name, await fetchFile(files[i]));
  }

  await ffmpeg.writeFile("filelist.txt", listContent.join("\n"));

  const cmd = [
    "-f", "concat",
    "-safe", "0",
    "-i", "filelist.txt",
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
      for (const n of inputNames) {
        await ffmpeg.deleteFile(n).catch(() => {});
      }
      await ffmpeg.deleteFile("filelist.txt").catch(() => {});
      await ffmpeg.deleteFile(outputName).catch(() => {});
    } catch {
      console.log("Cleanup skipped");
    }
  }

  const data = await ffmpeg.readFile(outputName);
  const blob = new Blob([data], { type: fmt.mime });
  const fileOut = new File([blob], `merged.${fmt.ext}`, { type: fmt.mime });

  return { file: fileOut, url: URL.createObjectURL(blob), size: blob.size };
}

export { OUTPUT_FORMATS, BITRATES };
