export function uniqueCount(scrapes) {
  return scrapes.filter((scrape, index, arr) => {
    if (index === 0) return true;
    const lastScrape = arr[index - 1];
    return !(scrape.count === lastScrape.count);
  });
}
