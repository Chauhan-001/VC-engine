function PagePreviewGrid({ pageCount }) {
  const pages = Array.from({ length: pageCount || 0 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
      {pages.map((pageNumber) => (
        <div
          key={pageNumber}
          className="
            group
            flex
            items-center
            justify-center
            rounded-none
            border-[3px]
            border-black
            bg-[#161616]
            px-2
            py-3
            font-mono
            text-sm
            font-bold
            text-white
            shadow-[3px_3px_0px_0px_black]
            transition-all
            hover:-translate-y-[2px]
            hover:border-[#0066ff]
            hover:text-[#0066ff]
          "
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
}

export default PagePreviewGrid;

