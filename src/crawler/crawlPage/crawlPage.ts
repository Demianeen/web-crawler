import axios, { AxiosError } from "axios";
import { normalizeURL } from "../normalizeUrl/normalizeUrl";
import { getUrlsFromHtml } from "../getUrlFromHtml/getUrlFromHtml";

export type Pages = Record<string, number>;

export async function crawlPage(
  baseUrl: string,
  currentUrl: string = baseUrl,
  pages: Pages = {},
) {
  if (!currentUrl.includes(baseUrl)) {
    return pages;
  }
  const normalizedCurrentUrl = normalizeURL(currentUrl);
  if (normalizedCurrentUrl in pages) {
    pages[normalizedCurrentUrl] += 1;
    return pages;
  }

  console.log("Visiting", normalizedCurrentUrl);

  try {
    const response = await axios.get(baseUrl);
    if (response.status >= 400) {
      console.error(
        `Got HTTP error, status code ${response.status} at ${baseUrl}`,
      );
      return;
    }
    const headers = response.headers;
    const contentType = headers["content-type"] || headers["Content-Type"];
    if (!contentType || !contentType.includes("text/html")) {
      console.error(
        `Expected content-type 'text/html' but instead got ${contentType} at ${baseUrl}`,
      );
      return;
    }
    pages[normalizedCurrentUrl] = 1;

    const links = getUrlsFromHtml(response.data, baseUrl);
    for (const link of links) {
      pages = await crawlPage(baseUrl, link, pages);
    }
    return pages;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Error at ${baseUrl}:`, error.message);
    } else {
      console.error("Unknown error happened");
    }
    return pages;
  }
}
