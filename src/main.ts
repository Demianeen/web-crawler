import { argv } from "node:process";
import { crawlPage } from "./crawler/crawlPage/crawlPage";
import { printReport } from "./printReport/printReport";

if (argv.length < 3) {
  throw new Error("You need to provide base URL");
}
if (argv.length > 3) {
  throw new Error("You can't provide more than one base URL at a time");
}

async function main() {
  const baseUrl = argv[2];
  // check if the url is valid
  new URL(baseUrl);
  console.log(`The crawler is starting at ${baseUrl}`);
  const pages = await crawlPage(baseUrl);
  printReport(pages);
}

main();
