function getStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: "No Password",
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      score: 1,
      label: "Weak",
    };
  }

  if (score <= 4) {
    return {
      score: 2,
      label: "Medium",
    };
  }

  return {
    score: 3,
    label: "Strong",
  };
}

function PasswordStrength({
  password,
}) {
  const strength =
    getStrength(password);

  return (
    <div
      className="
        border-[3px]
        border-black
        bg-[#111111]
        p-4
      "
    >
      <div
        className="
          mb-3
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
          Password Strength
        </span>

        <span
          className={`
            font-mono
            text-xs
            font-bold
            uppercase

            ${
              strength.score === 1
                ? "text-red-400"
                : strength.score === 2
                ? "text-yellow-400"
                : strength.score === 3
                ? "text-green-400"
                : "text-gray-500"
            }
          `}
        >
          {strength.label}
        </span>
      </div>

      <div
        className="
          flex
          gap-2
        "
      >
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className={`
              h-3
              flex-1
              border-2
              border-black
              transition-all

              ${
                bar <= strength.score
                  ? strength.score === 1
                    ? "bg-red-500"
                    : strength.score === 2
                    ? "bg-yellow-500"
                    : "bg-green-500"
                  : "bg-[#222222]"
              }
            `}
          />
        ))}
      </div>

      <div
        className="
          mt-4
          space-y-1
          font-mono
          text-[11px]
          text-gray-500
        "
      >
        <p>
          ✓ 8+ characters
        </p>

        <p>
          ✓ Uppercase letters
        </p>

        <p>
          ✓ Numbers
        </p>

        <p>
          ✓ Special symbols
        </p>
      </div>
    </div>
  );
}

export default PasswordStrength;