import { fetchFile } from "@ffmpeg/util";
import { createFFmpegInstance } from "../video/ffmpeg";

export async function probeAudioMetadata(file) {
  const ext = file.name.split(".").pop();
  const inputName = `probe_input.${ext}`;
  const info = {
    duration: null,
    bitrate: null,
    channels: null,
    sampleRate: null,
    format: ext?.toUpperCase() || "UNKNOWN",
    size: file.size,
  };

  try {
    const ffmpeg = await createFFmpegInstance();
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    const cmd = ["-i", inputName];
    await ffmpeg.exec(cmd);

    let text = "";
    const msg = ffmpeg.msg;
    if (msg?.logger?.messages) {
      text = typeof msg.logger.messages === "string" ? msg.logger.messages : msg.logger.messages.join("\n");
    }

    const durMatch = text.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (durMatch) {
      const [, h, m, s] = durMatch.map(Number);
      info.duration = h * 3600 + m * 60 + s;
    }

    const audioMatch = text.match(/Audio: .*?,\s*(\d+) Hz/i);
    if (audioMatch) {
      info.sampleRate = `${audioMatch[1]} Hz`;
    }

    if (/\bstereo\b/i.test(text)) {
      info.channels = "2 (Stereo)";
    } else if (/\bmono\b/i.test(text)) {
      info.channels = "1 (Mono)";
    }

    const brMatch = text.match(/Audio: .*?(\d+)k/i);
    if (brMatch) {
      info.bitrate = `${brMatch[1]} kbps`;
    }

    try {
      await ffmpeg.deleteFile(inputName);
    } catch {
      console.log("Probe cleanup skipped");
    }
  } catch (e) {
    console.error("Probe error:", e);
  }

  if (!info.duration) {
    try {
      const url = URL.createObjectURL(file);
      await new Promise((resolve) => {
        const audio = new Audio();
        audio.onloadedmetadata = () => {
          if (!isNaN(audio.duration)) info.duration = audio.duration;
          resolve();
        };
        audio.onerror = resolve;
        audio.src = url;
      });
      URL.revokeObjectURL(url);
    } catch {
      console.log("Web Audio probe failed");
    }
  }

  return info;
}
