import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import ProtectButton from "./ProtectButton";
import PasswordStrength from "./PasswordStrength";
import SecurityInfoCard from "./SecurityInfoCard";

function ProtectControls({
  userPassword,
  setUserPassword,

  confirmPassword,
  setConfirmPassword,

  ownerPassword,
  setOwnerPassword,

  loading,
  onProtect,
}) {
  const [showUserPassword, setShowUserPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [showOwnerPassword, setShowOwnerPassword] =
    useState(false);

  const passwordsMatch =
    userPassword === confirmPassword;

  const canProtect =
    userPassword.trim() &&
    confirmPassword.trim() &&
    passwordsMatch;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <SecurityInfoCard
        userPassword={userPassword}
        ownerPassword={ownerPassword}
      />

      {/* RIGHT SIDE */}
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
          Password Settings
        </h3>

        <div className="space-y-6">
          {/* USER PASSWORD */}
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
              User Password *
            </label>

            <div className="relative">
              <input
                type={
                  showUserPassword
                    ? "text"
                    : "password"
                }
                value={userPassword}
                onChange={(e) =>
                  setUserPassword(
                    e.target.value
                  )
                }
                placeholder="Enter password"
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
                  focus:border-[#0066ff]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowUserPassword(
                    !showUserPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-white
                "
              >
                {showUserPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
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
              Confirm Password *
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
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
                  focus:border-[#0066ff]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-white
                "
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {confirmPassword && (
              <p
                className={`
                  mt-2
                  font-mono
                  text-xs
                  uppercase
                  ${
                    passwordsMatch
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >
                {passwordsMatch
                  ? "✓ Passwords Match"
                  : "✗ Passwords Do Not Match"}
              </p>
            )}
          </div>

          {/* OWNER PASSWORD */}
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
              Owner Password (Optional)
            </label>

            <div className="relative">
              <input
                type={
                  showOwnerPassword
                    ? "text"
                    : "password"
                }
                value={ownerPassword}
                onChange={(e) =>
                  setOwnerPassword(
                    e.target.value
                  )
                }
                placeholder="Leave blank to use user password"
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
                  focus:border-[#0066ff]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowOwnerPassword(
                    !showOwnerPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-white
                "
              >
                {showOwnerPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* STRENGTH */}
          <PasswordStrength
            password={userPassword}
          />

          {/* BUTTON */}
          <ProtectButton
            onProtect={onProtect}
            loading={loading}
            disabled={!canProtect}
          />
        </div>
      </div>
    </div>
  );
}

export default ProtectControls;