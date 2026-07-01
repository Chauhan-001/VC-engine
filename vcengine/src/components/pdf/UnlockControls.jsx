import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import UnlockButton from "./UnlockButton";
import UnlockStatusCard from "./UnlockStatusCard";

function UnlockControls({
  pdfFile,
  pageCount,

  password,
  setPassword,

  loading,
  error,

  onUnlock,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div
      className="
        grid
        gap-6
        lg:grid-cols-2
      "
    >
      {/* Status Card */}
      <UnlockStatusCard
        pdfFile={pdfFile}
        pageCount={pageCount}
      />

      {/* Controls */}
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
          Unlock Settings
        </h3>

        <div className="space-y-6">
          {/* Password */}
          <div>
            <label
              className="
                mb-2
                block
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              PDF Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter PDF password"
                className="
                  w-full
                  border-[3px]
                  border-black
                  bg-[#111111]
                  px-4
                  py-3
                  pr-14
                  font-mono
                  text-sm
                  text-white
                  outline-none
                  focus:border-[#00aa55]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  transition-colors
                  hover:text-white
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                border-[3px]
                border-black
                bg-[#441111]
                p-4
                shadow-[3px_3px_0px_0px_black]
              "
            >
              <p
                className="
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  text-red-300
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div
            className="
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
              Enter the correct password
              used to open this PDF.
              Once unlocked, a new PDF
              without password protection
              will be downloaded.
            </p>
          </div>

          {/* Button */}
          <UnlockButton
            onUnlock={onUnlock}
            loading={loading}
            disabled={!password.trim()}
          />
        </div>
      </div>
    </div>
  );
}

export default UnlockControls;