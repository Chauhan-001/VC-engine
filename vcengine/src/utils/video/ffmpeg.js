import { FFmpeg } from "@ffmpeg/ffmpeg";

const baseURL = "/ffmpeg";

export async function createFFmpegInstance() {
  const ffmpeg = new FFmpeg();
  const coreURL = new URL(`${baseURL}/ffmpeg-core.js`, window.location.origin).toString();
  const wasmURL = new URL(`${baseURL}/ffmpeg-core.wasm`, window.location.origin).toString();

  await ffmpeg.load({
    coreURL,
    wasmURL,
  });

  return ffmpeg;
}
