import { readFileSync, writeFileSync } from "fs";

const existingCategories = JSON.parse(
  readFileSync("./scraping/categories.json", "utf8")
).allowed;

const existingClasses = JSON.parse(
  readFileSync(__dirname + "/classes.json", "utf8")
);

for (const category of Object.keys(existingClasses)) {
  if (!existingCategories.includes(category)) {
    delete existingClasses[category];
  }
}

writeFileSync(
  __dirname + "/classes.json",
  JSON.stringify(existingClasses, null, 2)
);
