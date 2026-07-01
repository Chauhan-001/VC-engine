function UnlockStatusCard({
  pdfFile,
  pageCount,
}) {
  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#1a1a1a]
        p-6
        shadow-[6px_6px_0px_0px_black]
      "
    >
      <h3
        className="
          mb-6
          font-mono
          text-sm
          font-bold
          uppercase
          text-white
        "
      >
        Security Status
      </h3>

      <div className="space-y-4">
        {/* Encrypted */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#333]
            pb-3
          "
        >
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Encryption
          </span>

          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-yellow-400
            "
          >
            Password Protected
          </span>
        </div>

        {/* Pages */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#333]
            pb-3
          "
        >
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Total Pages
          </span>

          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-green-400
            "
          >
            {pageCount || "--"}
          </span>
        </div>

        {/* File */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#333]
            pb-3
          "
        >
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            File
          </span>

          <span
            className="
              max-w-[180px]
              truncate
              font-mono
              text-xs
              font-bold
              text-white
            "
          >
            {pdfFile?.name || "--"}
          </span>
        </div>

        {/* Processing */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Processing
          </span>

          <span
            className="
              font-mono
              text-xs
              font-bold
              uppercase
              text-green-400
            "
          >
            Local Browser
          </span>
        </div>
      </div>

      <div
        className="
          mt-6
          border-[2px]
          border-black
          bg-[#111111]
          p-4
        "
      >
        <p
          className="
            font-mono
            text-[11px]
            leading-5
            text-gray-400
          "
        >
          Enter the correct password to
          remove protection from this PDF.
          All processing happens locally
          in your browser. Your files are
          never uploaded to any server.
        </p>
      </div>
    </div>
  );
}

export default UnlockStatusCard;