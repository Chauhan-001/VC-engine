import MetadataButton from "./MetadataButton";

function MetadataControls({
  title,
  setTitle,

  author,
  setAuthor,

  subject,
  setSubject,

  keywords,
  setKeywords,

  creator,
  setCreator,

  producer,
  setProducer,

  loading,
  onSave,
  onReset,
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
      {/* Header */}
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
        Edit Metadata
      </h3>

      <div className="space-y-5">
        {/* Title */}
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
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Document Title"
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111111]
              px-4
              py-3
              font-mono
              text-sm
              text-white
              outline-none
              focus:border-[#7c3aed]
            "
          />
        </div>

        {/* Author */}
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
            Author
          </label>

          <input
            type="text"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            placeholder="Author Name"
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111111]
              px-4
              py-3
              font-mono
              text-sm
              text-white
              outline-none
              focus:border-[#7c3aed]
            "
          />
        </div>

        {/* Subject */}
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
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            placeholder="Document Subject"
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111111]
              px-4
              py-3
              font-mono
              text-sm
              text-white
              outline-none
              focus:border-[#7c3aed]
            "
          />
        </div>

        {/* Keywords */}
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
            Keywords
          </label>

          <input
            type="text"
            value={keywords}
            onChange={(e) =>
              setKeywords(e.target.value)
            }
            placeholder="react, javascript, notes"
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111111]
              px-4
              py-3
              font-mono
              text-sm
              text-white
              outline-none
              focus:border-[#7c3aed]
            "
          />
        </div>

        {/* Creator */}
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
            Creator
          </label>

          <input
            type="text"
            value={creator}
            onChange={(e) =>
              setCreator(e.target.value)
            }
            placeholder="Microsoft Word"
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111111]
              px-4
              py-3
              font-mono
              text-sm
              text-white
              outline-none
              focus:border-[#7c3aed]
            "
          />
        </div>

        {/* Producer */}
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
            Producer
          </label>

          <input
            type="text"
            value={producer}
            onChange={(e) =>
              setProducer(e.target.value)
            }
            placeholder="Adobe PDF"
            className="
              w-full
              border-[3px]
              border-black
              bg-[#111111]
              px-4
              py-3
              font-mono
              text-sm
              text-white
              outline-none
              focus:border-[#7c3aed]
            "
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-4">
          <button
            type="button"
            onClick={onReset}
            className="
              w-full
              border-[3px]
              border-black
              bg-[#222222]
              px-6
              py-3
              font-mono
              text-sm
              font-bold
              uppercase
              text-white
              shadow-[4px_4px_0px_0px_black]
              transition-all
              hover:-translate-x-[2px]
              hover:-translate-y-[2px]
              hover:shadow-[6px_6px_0px_0px_black]
            "
          >
            Reset Fields
          </button>

          <MetadataButton
            onSave={onSave}
            loading={loading}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default MetadataControls;