import { useEffect, useMemo } from "react";
import {
  Play,
  Film,
} from "lucide-react";

function formatDuration(seconds) {
  if (!seconds) {
    return "--:--";
  }

  const mins = Math.floor(
    seconds / 60
  );

  const secs = Math.floor(
    seconds % 60
  );

  return `${mins}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function VideoPreviewCard({
  file,
  title = "Preview",
  accentColor = "#ff3b30",
}) {
  const videoUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(
      file
    );
  }, [file]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(
          videoUrl
        );
      }
    };
  }, [videoUrl]);

  if (!file) {
    return (
      <div
        className="
          border-[3px]
          border-black
          bg-[#161616]
          shadow-[6px_6px_0px_0px_black]
        "
      >
        {/* Header */}
        <div
          className="
            border-b-[3px]
            border-black
            px-6
            py-4
          "
        >
          <h2
            className="
              font-mono
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-white
            "
          >
            {title}
          </h2>
        </div>

        {/* Empty State */}
        <div
          className="
            flex
            min-h-[500px]
            items-center
            justify-center
            p-10
          "
        >
          <div className="text-center">
            <div
              className="
                mx-auto
                mb-6
                flex
                h-24
                w-24
                items-center
                justify-center
                border-[3px]
                border-black
                bg-black
                shadow-[4px_4px_0px_0px_black]
              "
            >
              <Film
                size={42}
                className="text-gray-500"
              />
            </div>

            <h3
              className="
                font-mono
                text-2xl
                font-black
                uppercase
                text-white
              "
            >
              No Video Loaded
            </h3>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                text-gray-400
              "
            >
              Upload a video to
              preview it before
              compression.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#161616]
        shadow-[6px_6px_0px_0px_black]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b-[3px]
          border-black
          px-6
          py-4
        "
      >
        <h2
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            tracking-[0.2em]
            text-white
          "
        >
          {title}
        </h2>

        <div
          className="
            border-[2px]
            border-black
            px-3
            py-1
            font-mono
            text-[10px]
            font-bold
            uppercase
            text-white
            shadow-[2px_2px_0px_0px_black]
          "
          style={{
            background:
              accentColor,
          }}
        >
          {file.type
            ?.split("/")
            ?.pop() || "VIDEO"}
        </div>
      </div>

      {/* Video */}
      <div className="bg-[#0f0f0f] p-4">
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            bg-black
            shadow-[4px_4px_0px_0px_black]
          "
        >
          <video
            src={videoUrl}
            controls
            preload="metadata"
            className="
              block
              max-h-[600px]
              w-full
              bg-black
            "
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          flex
          items-center
          justify-between
          border-t-[3px]
          border-black
          px-6
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            font-mono
            text-xs
            uppercase
            text-gray-400
          "
        >
          <Play size={14} />

          Browser Preview
        </div>

        <div
          className="
            font-mono
            text-xs
            uppercase
            text-gray-400
          "
        >
          {(
            file.size /
            (1024 * 1024)
          ).toFixed(2)}
          MB
        </div>
      </div>
    </div>
  );
}

export default VideoPreviewCard;