import { Upload } from "lucide-react";

function UploadZone({
  title = "Drag & Drop files here",
  subtitle = "or click to browse local files",
  accept = "*",
  multiple = false,
  onFilesSelected,
}) {
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (onFilesSelected) {
      onFilesSelected(selectedFiles);
    }
  };

  return (
    <label
      className="
        group
        block
        cursor-pointer
        border-[3px]
        border-dashed
        border-[#2a2a2a]
        bg-[#161616]
        p-16
        text-center
        shadow-[6px_6px_0px_0px_black]
        transition-all
        duration-200
        hover:-translate-x-[2px]
        hover:-translate-y-[2px]
        hover:border-[#0066ff]
        hover:shadow-[10px_10px_0px_0px_black]
      "
    >
      {/* Hidden Input */}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Icon */}
      <div
        className="
          mx-auto
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          border-[3px]
          border-black
          bg-white
          transition-all
          duration-200
          group-hover:bg-[#0066ff]
        "
      >
        <Upload
          size={40}
          className="
            text-black
            group-hover:text-white
          "
        />
      </div>

      {/* Title */}
      <h3
        className="
          text-2xl
          font-black
          uppercase
          text-white
        "
      >
        {title}
      </h3>

      {/* Subtitle */}
      <p
        className="
          mt-4
          font-mono
          text-sm
          text-gray-400
        "
      >
        {subtitle}
      </p>

      {/* Button */}
      <div
        className="
          mt-8
          inline-block
          border-[3px]
          border-black
          bg-[#0066ff]
          px-6
          py-3
          font-mono
          text-sm
          font-bold
          uppercase
          text-white
          shadow-[4px_4px_0px_0px_black]
          transition-all
          duration-150
          group-hover:-translate-x-[2px]
          group-hover:-translate-y-[2px]
          group-hover:shadow-[6px_6px_0px_0px_black]
        "
      >
        Select Files
      </div>
    </label>
  );
  
}


export default UploadZone;