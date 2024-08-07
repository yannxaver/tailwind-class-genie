import customClasses from "./classes.json";

console.log(customClasses);

export const customClassesLookUpTable: {
  [key in string]: string;
} = Object.entries(customClasses).reduce((acc, [classType, options]) => {
  return {
    ...acc,
    ...Object.fromEntries(options.map((option) => [option, classType])),
  };
}, {});

export const colorLevels = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

export const distanceLevels = [
  "0",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96",
] as const;
