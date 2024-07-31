const fontSizeOptions = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
  "text-8xl",
  "text-9xl",
] as const;

const classTypes = ["font-size"] as const;
type ClassType = (typeof classTypes)[number];
type ClassTypeOptionsSorted = readonly string[];

export const classTypeToClassTypeOptionsMap: {
  [key in ClassType]: ClassTypeOptionsSorted;
} = {
  "font-size": fontSizeOptions,
};

const addOptionsArrayToLookupTable = (
  options: ClassTypeOptionsSorted,
  classType: ClassType
) => Object.fromEntries(options.map((option) => [option, classType]));

export const classTypeLookUpTable: {
  [key in string]: ClassType;
} = {
  ...addOptionsArrayToLookupTable(fontSizeOptions, "font-size"),
};
