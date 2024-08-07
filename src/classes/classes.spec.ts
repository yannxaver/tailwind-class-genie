import { test } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";

const classCategories = JSON.parse(
  readFileSync(__dirname + "/categories.json", "utf8")
).allowed;

for (const category of classCategories) {
  test(`Checking ${category} classes`, async ({ page }) => {
    const existingClassesCheck = JSON.parse(
      readFileSync(__dirname + "/classes.json", "utf8")
    );
    if (existingClassesCheck[category]) {
      return;
    }

    await page.goto(`https://tailwindcss.com/docs/${category}`);

    const rowTitles = await page.$$eval(
      "#class-table tbody tr td:first-child",
      (cells) => cells.map((cell) => cell.textContent?.trim()).filter(Boolean)
    );

    const existingClasses = JSON.parse(
      readFileSync(__dirname + "/classes.json", "utf8")
    );
    existingClasses[category] = rowTitles;

    writeFileSync(
      __dirname + "/classes.json",
      JSON.stringify(
        Object.fromEntries(
          Object.entries(existingClasses).sort(([a], [b]) => a.localeCompare(b))
        ),
        null,
        2
      )
    );
  });
}
