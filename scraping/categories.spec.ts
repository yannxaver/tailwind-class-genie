import { test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { removeUrl, removeUrlsAfter, removeUrlsBefore } from "../src/utils";

test(`Getting category classes`, async ({ page }) => {
  await page.goto(`https://tailwindcss.com/docs/`);

  let links = await page.$$eval("#nav > ul > li > ul > li > a", (cells) =>
    cells.map((cell) => cell.href.split("/").pop()).filter(Boolean)
  );

  links = removeUrlsBefore(links, "aspect-ratio");
  links = removeUrlsAfter(links, "forced-color-adjust");

  const existingCategories = JSON.parse(
    readFileSync("./scraping/categories.json", "utf8")
  );

  for (const category of existingCategories.colorScale) {
    links = removeUrl(links, category);
  }
  for (const category of existingCategories.spacingScale) {
    links = removeUrl(links, category);
  }
  for (const category of existingCategories.irrelevant) {
    links = removeUrl(links, category);
  }

  links = links.sort((a, b) => a.localeCompare(b));
  existingCategories.allowed = links;

  writeFileSync(
    "./scraping/categories.json",
    JSON.stringify(existingCategories, null, 2)
  );
});
