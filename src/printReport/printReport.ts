import { Pages } from "../crawler/crawlPage/crawlPage";

export function sortPagesByCount(pages: Pages): [string, number][] {
  return Object.entries(pages).sort(
    ([_, count1], [__, count2]) => count2 - count1,
  );
}

export function printReport(pages: Pages) {
  console.log("==========");
  console.log("REPORT");
  console.log("==========");
  const sortedPages = sortPagesByCount(pages);
  sortedPages.forEach(([url, count]) => {
    console.log(`Found ${count} internal links to ${url}`);
  });
}
