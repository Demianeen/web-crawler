import { JSDOM } from "jsdom";

export function getUrlsFromHtml(htmlBody: string, baseUrl: string) {
  const dom = new JSDOM(htmlBody);
  const linkNodes = Array.from(dom.window.document.querySelectorAll("a"));
  const links = linkNodes.map((elem) => elem.getAttribute("href"));
  const absoluteLinks = links.map((link) => new URL(link, baseUrl).href);
  return absoluteLinks;
}
