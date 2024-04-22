import { getUrlsFromHtml } from "./getUrlFromHtml";

describe("getUrlFromHtml", () => {
  it("should return all urls", () => {
    const htmlString = `
		<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/path">Go to Boot.dev</a>
        <a href="https://blog.boot.dev/path/">G</a>
    </body>
</html>
`;
    expect(getUrlsFromHtml(htmlString, "https://blog.boot.dev")).toHaveLength(
      3,
    );
  });

  it("should transform all relative url to absolute ones", () => {
    const htmlString = `
		<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/"><span>Go to Boot.dev</span></a>
        <a href="/path">Go to Boot.dev</a>
        <a href="/path/">G</a>
				<a href="path/one"><span>Boot.dev></span></a>
    </body>
</html>
`;
    const links = getUrlsFromHtml(htmlString, "https://blog.boot.dev");
    expect(links).toHaveLength(5);
    // check that every link is absolute
    expect(
      links.every((link) => link?.startsWith("https://blog.boot.dev")),
    ).toBe(true);
  });

  it("should error on invalid baseUrl", () => {
    const htmlString = `
		<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/path">Go to Boot.dev</a>
        <a href="https://blog.boot.dev/path/">G</a>
    </body>
</html>
`;
    expect(() => getUrlsFromHtml(htmlString, "")).toThrow();
  });
});
