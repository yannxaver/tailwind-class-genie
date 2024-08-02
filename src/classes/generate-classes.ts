import { writeFileSync } from "fs";
import resolveConfig from "tailwindcss/resolveConfig";
// @ts-expect-error
import tailwindConfig from "../../tailwind.config";

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

  for (const [key, value] of Object.entries(inputObj)) {
    const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

    if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0
    ) {
      result[kebabKey] = Object.entries(value)
        .filter(([subKey]) => subKey !== "px")
        .map(([subKey]) => {
          if (subKey === "DEFAULT") {
            return `${kebabKey}`;
          }

          if (kebabKey === "font-size") {
            return `text-${subKey}`;
          }

          return `${kebabKey}-${subKey}`;
        });
    } else {
      // console.log(key);
      // console.error(value);
    }
  }

  return result;
};

const fullConfig = resolveConfig(tailwindConfig);

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
