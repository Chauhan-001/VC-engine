export function parsePageInput(input, maxPages) {
  if (!input.trim()) {
    return [];
  }

  const pages = new Set();

  const parts = input.split(",");

  parts.forEach((part) => {
    const value = part.trim();

    // Range: 5-10
    if (value.includes("-")) {
      const [start, end] = value
        .split("-")
        .map(Number);

      if (
        Number.isNaN(start) ||
        Number.isNaN(end) ||
        start > end
      ) {
        return;
      }

      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= maxPages) {
          pages.add(i);
        }
      }

      return;
    }

    // Single page: 5
    const page = Number(value);

    if (
      !Number.isNaN(page) &&
      page >= 1 &&
      page <= maxPages
    ) {
      pages.add(page);
    }
  });

  return [...pages].sort((a, b) => a - b);
}