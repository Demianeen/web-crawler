export function normalizeURL(baseUrl: string) {
  const url = new URL(baseUrl);
  let res = url.hostname + url.pathname;
  if (res.length > 0 && res.slice(-1) === "/") {
    res = res.slice(0, -1);
  }
  return res;
}
