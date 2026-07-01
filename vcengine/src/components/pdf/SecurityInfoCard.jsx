function SecurityInfoCard({
  userPassword,
  ownerPassword,
}) {
  const hasUserPassword =
    userPassword.trim().length > 0;

  const hasOwnerPassword =
    ownerPassword.trim().length > 0;

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
        Security Summary
      </h3>

      <div className="space-y-4">
        {/* Encryption */}
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
              text-green-400
            "
          >
            AES-256
          </span>
        </div>

        {/* User Password */}
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
            Open Protection
          </span>

          <span
            className={`
              font-mono
              text-xs
              font-bold
              uppercase
              ${
                hasUserPassword
                  ? "text-green-400"
                  : "text-red-400"
              }
            `}
          >
            {hasUserPassword
              ? "Enabled"
              : "Disabled"}
          </span>
        </div>

        {/* Owner Password */}
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
            Owner Password
          </span>

          <span
            className={`
              font-mono
              text-xs
              font-bold
              uppercase
              ${
                hasOwnerPassword
                  ? "text-green-400"
                  : "text-yellow-400"
              }
            `}
          >
            {hasOwnerPassword
              ? "Custom"
              : "Using User Password"
            }
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
          Your PDF never leaves your device.
          All encryption and password
          protection happen locally in
          your browser for maximum privacy.
        </p>
      </div>
    </div>
  );
}

export default SecurityInfoCard;