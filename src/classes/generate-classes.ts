import { writeFileSync } from "fs";
import resolveConfig from "tailwindcss/resolveConfig";
// @ts-expect-error
import tailwindConfig from "../../tailwind.config";
import { logDeep } from "../utils";

const deleteKeys = (obj: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    delete obj[key];
  }

  return obj;
};

const transformObject = (inputObj: Record<string, unknown>) => {
  const result: {
    [key: string]: string[];
  } = {};

  for (const [category, value] of Object.entries(inputObj)) {
    const categoryKebabCase = category
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase();

    if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0
    ) {
      result[categoryKebabCase] = Object.entries(value)
        .filter(([subKey]) => subKey !== "px")
        .map(([subKey]) => {
          if (categoryKebabCase === "font-size") {
            return `text-${subKey}`;
          }

          if (categoryKebabCase === "font-weight") {
            return `font-${subKey}`;
          }

          if (categoryKebabCase.includes("grid-column")) {
            return `${categoryKebabCase.replace(
              "grid-column",
              "col"
            )}-${subKey}`;
          }

          if (categoryKebabCase.includes("grid-row")) {
            return `${categoryKebabCase.replace("grid-row", "row")}-${subKey}`;
          }

          if (categoryKebabCase === "grid-template-columns") {
            return `grid-cols-${subKey}`;
          }

          if (categoryKebabCase === "grid-template-rows") {
            return `grid-rows-${subKey}`;
          }

          if (categoryKebabCase === "grid-auto-columns") {
            return `auto-cols-${subKey}`;
          }

          if (categoryKebabCase === "grid-auto-rows") {
            return `auto-rows-${subKey}`;
          }

          if (subKey === "DEFAULT") {
            return `${categoryKebabCase}`;
          }

          if (categoryKebabCase === "animation") {
            return `animate-${subKey}`;
          }

          if (categoryKebabCase === "aspect-ratio") {
            return `aspect-${subKey}`;
          }

          if (
            categoryKebabCase === "background-image" ||
            categoryKebabCase === "background-size" ||
            categoryKebabCase === "background-position"
          ) {
            return `bg-${subKey}`;
          }

          if (categoryKebabCase.includes("background")) {
            return `${categoryKebabCase.replace("background", "bg")}-${subKey}`;
          }

          if (categoryKebabCase === "border-width") {
            return `border-${subKey}`;
          }

          if (categoryKebabCase === "border-radius") {
            if (subKey === "DEFAULT") {
              return `rounded`;
            }

            return `rounded-${subKey}`;
          }

          return `${categoryKebabCase}-${subKey}`;
        });
    } else {
      // console.log(key);
      // console.error(value);
    }
  }

  return result;
};

const fullConfig = resolveConfig(tailwindConfig);

logDeep(fullConfig.theme);

const colorClasses = [
  "textColor",
  "textDecorationColor",
  "divideColor",
  "outlineColor",
  "placeholderColor",
  "ringColor",
  "ringOffsetColor",
  "accentColor",
  "backgroundColor",
  "borderColor",
  "boxShadowColor",
  "caretColor",
  "gradientColorStops",
  "colors",
];

const spaceClasses = [
  "padding",
  "margin",
  "scrollMargin",
  "scrollPadding",
  "inset",
  "height",
  "minHeight",
  "maxHeight",
  "width",
  "minWidth",
  "maxWidth",
  "spacing",
  "space",
  "size",
  "translate",
  "gap",
  "borderSpacing",
  "textIndent",
  "flexBasis",
  "fill",
  "stroke",
];

deleteKeys(fullConfig.theme, [...colorClasses, ...spaceClasses]);

const transformed = transformObject(fullConfig.theme);
// logDeep(transformObject(transformed));

const allClasses = Object.keys(transformed).flatMap((key) => transformed[key]);
// logDeep(allClasses.filter((value) => distanceClassRegex.test(value)));

writeFileSync(
  `${__dirname}/classes.json`,
  JSON.stringify(transformed, null, 2)
);
