function Toast({
  message,
  type = "success",
}) {
  const bgColor = {
    success: "bg-[#3ECF8E]",
    error: "bg-[#ff4d4d]",
  };

  return (
    <div
      className={`
        fixed
        right-8
        top-24
        z-[999]
        border-[3px]
        border-black
        px-6
        py-4
        font-mono
        text-sm
        font-bold
        uppercase
        text-black
        shadow-[6px_6px_0px_0px_black]
        animate-[slideIn_0.3s_ease]
        ${bgColor[type]}
      `}
    >
      {message}
    </div>
  );
}

export default Toast;