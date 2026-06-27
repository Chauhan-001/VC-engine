import powerfulImg from "../../assets/powerful.png";
import privateImg from "../../assets/private.png";
import lightningImg from "../../assets/lightning-fast.png";

function BrowserPreview() {
  return (
    <div
      className="
        mt-16
        w-full
        max-w-6xl
        overflow-hidden
        border-[3px]
        border-black
        bg-[#1a1a1a]
        shadow-[12px_12px_0px_0px_black]
      "
    >
      {/* Browser Top Bar */}
      <div className="flex h-12 items-center border-b-[3px] border-black bg-white px-6">
        <div className="flex gap-3">
          <div className="h-5 w-5 border-2 border-black bg-red-500" />
          <div className="h-5 w-5 border-2 border-black bg-yellow-400" />
          <div className="h-5 w-5 border-2 border-black bg-green-500" />
        </div>

        <div
          className="
            mx-auto
            flex
            h-8
            w-[50%]
            items-center
            justify-center
            border-[3px]
            border-black
            bg-gray-300
            font-mono
            text-xs
            font-bold
            uppercase
          "
        >
          vcenginemedia.site
        </div>
      </div>

      {/* Browser Content */}
      <div className="grid gap-8 bg-[#111] p-8 md:grid-cols-3">

        {/* POWERFUL */}
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            shadow-[6px_6px_0px_0px_#0066ff]
            transition-all
            duration-300
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#0066ff]
          "
        >
          <img
            src={powerfulImg}
            alt="Powerful"
            className="h-full w-full object-cover"
          />
        </div>

        {/* PRIVATE */}
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            shadow-[6px_6px_0px_0px_#FF6B35]
            transition-all
            duration-300
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#FF6B35]
          "
        >
          <img
            src={privateImg}
            alt="Private"
            className="h-full w-full object-cover"
          />
        </div>

        {/* LIGHTNING FAST */}
        <div
          className="
            overflow-hidden
            border-[3px]
            border-black
            shadow-[6px_6px_0px_0px_#C6FF00]
            transition-all
            duration-300
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#C6FF00]
          "
        >
          <img
            src={lightningImg}
            alt="Lightning Fast"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default BrowserPreview;