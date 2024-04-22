import { normalizeURL } from "./normalizeUrl";

describe("crawl", () => {
  it("should return normilized url", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toEqual(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("https://blog.boot.dev/path/")).toEqual(
      "blog.boot.dev/path",
    );
  });

  it("should work with http", () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toEqual(
      "blog.boot.dev/path",
    );
  });

  it("should transform uppercase", () => {
    expect(normalizeURL("http://blog.BOOT.dev/path/")).toEqual(
      "blog.boot.dev/path",
    );
  });
});
