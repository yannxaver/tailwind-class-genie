import {
  colorLevels,
  customClassesLookUpTable,
  distanceLevels,
} from "./classes/classes";
import customClasses from "./classes/classes.json";
import {
  createRegexForUnitLevels,
  getAfterLastDash,
  getNextValueFromArray,
  replaceAfterLastDash,
} from "./utils";

const colorClassRegex = createRegexForUnitLevels("(\\w+-)*", colorLevels);
const distanceClassRegex = createRegexForUnitLevels("(\\w+-)*", distanceLevels);

export const findClass = (
  currentClass: string,
  direction: "up" | "down"
): string => {
  const isCustomClass = customClassesLookUpTable[currentClass];
  if (isCustomClass) {
    return findNextClassForCustomClassesStrategy(
      isCustomClass,
      currentClass,
      direction
    );
  }

  const isColorClass = colorClassRegex.test(currentClass);
  if (isColorClass) {
    return findNextClassForColorClassesStrategy(currentClass, direction);
  }

  const isDistanceClass = distanceClassRegex.test(currentClass);
  if (isDistanceClass) {
    return findNextClassForDistanceClassesStrategy(currentClass, direction);
  }

  throw new Error(`"${currentClass}" is not a supported class.
    Do you think that is a mistake? Please open an issue at: https://github.com/yannxaver/tailwind-class-genie/issues`);
};

const findNextClassForColorClassesStrategy = (
  currentClass: string,
  direction: "up" | "down"
): string => {
  const currentColorLevelIndex = colorLevels.findIndex(
    (value) => value === currentClass.split("-").pop()
  );

  const nextColorLevel = getNextValueFromArray(
    colorLevels,
    currentColorLevelIndex,
    direction
  );

  return replaceAfterLastDash(currentClass, nextColorLevel);
};

const findNextClassForDistanceClassesStrategy = (
  currentClass: string,
  direction: "up" | "down"
): string => {
  const currentDistanceLevel = getAfterLastDash(currentClass);
  const currentDistanceLevelIndex = distanceLevels.findIndex(
    (value) => value === currentDistanceLevel
  );

  const nextDistanceLevel = getNextValueFromArray(
    distanceLevels,
    currentDistanceLevelIndex,
    direction
  );

  return replaceAfterLastDash(currentClass, nextDistanceLevel);
};

const findNextClassForCustomClassesStrategy = (
  classType: string,
  currentClass: string,
  direction: "up" | "down"
): string => {
  const classTypeOptions = customClasses[
    classType as keyof typeof customClasses
  ] as string[];

  const currentClassIndex = classTypeOptions.findIndex(
    (option) => option === currentClass
  );

  const nextClass = getNextValueFromArray(
    classTypeOptions,
    currentClassIndex,
    direction
  );

  return nextClass;
};
