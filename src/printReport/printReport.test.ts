import { Pages } from "../crawler/crawlPage/crawlPage";
import { sortPagesByCount } from "./printReport";

describe("sortPagesByCount", () => {
  it("should return sorted pages object", () => {
    const pages: Pages = {
      "boot.dev": 150,
      "boot.dev/path1": 12,
      "boot.dev/path2": 134,
      "boot.dev/path3": 118,
      "boot.dev/path5": 119,
    };
    const sortedPages = sortPagesByCount(pages);
    expect(sortedPages.length).toBe(5);
    expect(sortedPages).toEqual([
      ["boot.dev", 150],
      ["boot.dev/path2", 134],
      ["boot.dev/path5", 119],
      ["boot.dev/path3", 118],
      ["boot.dev/path1", 12],
    ]);
  });

  it("should work with empty object", () => {
    expect(sortPagesByCount({})).toEqual([]);
  });
});
