function MetadataPreviewCard({
  title,
  author,
  subject,
  keywords,
  creator,
  producer,
  creationDate,
  modificationDate,
}) {
  function formatDate(date) {
    if (!date) {
      return "Not Available";
    }

    try {
      return new Date(
        date
      ).toLocaleString();
    } catch {
      return "Invalid Date";
    }
  }

  const metadataItems = [
    {
      label: "Title",
      value: title,
    },

    {
      label: "Author",
      value: author,
    },

    {
      label: "Subject",
      value: subject,
    },

    {
      label: "Keywords",
      value: keywords,
    },

    {
      label: "Creator",
      value: creator,
    },

    {
      label: "Producer",
      value: producer,
    },
  ];

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
        Current Metadata
      </h3>

      {/* Metadata Fields */}
      <div className="space-y-4">
        {metadataItems.map((item) => (
          <div
            key={item.label}
            className="
              flex
              items-start
              justify-between
              gap-4
              border-b
              border-[#333]
              pb-3
            "
          >
            <span
              className="
                min-w-[90px]
                font-mono
                text-xs
                font-bold
                uppercase
                text-gray-400
              "
            >
              {item.label}
            </span>

            <span
              className="
                flex-1
                break-words
                text-right
                font-mono
                text-xs
                text-white
              "
            >
              {item.value?.trim()
                ? item.value
                : "Not Set"}
            </span>
          </div>
        ))}

        {/* Created Date */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-[#333]
            pb-3
          "
        >
          <span
            className="
              min-w-[90px]
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Created
          </span>

          <span
            className="
              text-right
              font-mono
              text-xs
              text-green-400
            "
          >
            {formatDate(
              creationDate
            )}
          </span>
        </div>

        {/* Modified Date */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <span
            className="
              min-w-[90px]
              font-mono
              text-xs
              font-bold
              uppercase
              text-gray-400
            "
          >
            Modified
          </span>

          <span
            className="
              text-right
              font-mono
              text-xs
              text-green-400
            "
          >
            {formatDate(
              modificationDate
            )}
          </span>
        </div>
      </div>

      {/* Privacy Note */}
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
          Metadata contains information
          about the PDF document such as
          title, author, creator, and
          creation dates. All edits are
          processed locally in your
          browser.
        </p>
      </div>
    </div>
  );
}

export default MetadataPreviewCard;