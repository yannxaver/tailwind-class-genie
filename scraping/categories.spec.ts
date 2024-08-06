import { test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import {
  removeElement,
  removeElementsAfter,
  removeElementsBefore,
} from "../src/utils";

test(`Getting category classes`, async ({ page }) => {
  await page.goto(`https://tailwindcss.com/docs/`);

  let categories = await page.$$eval("#nav > ul > li > ul > li > a", (cells) =>
    cells.map((cell) => cell.href.split("/").pop()).filter(Boolean)
  );

  categories = removeElementsBefore(categories, "aspect-ratio");
  categories = removeElementsAfter(categories, "forced-color-adjust");

  const existingCategories = JSON.parse(
    readFileSync("./scraping/categories.json", "utf8")
  );
  for (const category of existingCategories.colorScale) {
    categories = removeElement(categories, category);
  }
  for (const category of existingCategories.spacingScale) {
    categories = removeElement(categories, category);
  }
  for (const category of existingCategories.irrelevant) {
    categories = removeElement(categories, category);
  }

  categories = categories.sort((a, b) => a.localeCompare(b));
  existingCategories.allowed = categories;

  writeFileSync(
    "./scraping/categories.json",
    JSON.stringify(existingCategories, null, 2)
  );
});
