export const logDeep = (object: unknown) =>
  console.dir(object, { depth: null, maxArrayLength: null });

export function replaceAfterLastDash(
  input: string,
  replacement: string
): string {
  const lastDashIndex = input.lastIndexOf("-");
  if (lastDashIndex === -1) {
    return input;
  }
  return input.substring(0, lastDashIndex + 1) + replacement;
}

export function getAfterLastDash(input: string): string {
  const lastDashIndex = input.lastIndexOf("-");
  if (lastDashIndex === -1) {
    return input;
  }
  return input.substring(lastDashIndex + 1);
}

export const getNextValueFromArray = (
  array: readonly string[],
  currentIndex: number,
  direction: "up" | "down"
) => {
  const nextIndex = currentIndex + (direction === "up" ? 1 : -1);
  if (nextIndex < 0) {
    return array[array.length - 1];
  } else if (nextIndex >= array.length) {
    return array[0];
  }

  return array[nextIndex];
};

export function createRegexForUnitLevels(
  base: string,
  levels: readonly string[]
): RegExp {
  const escapedLevels = levels
    .map((level) => level.replace(".", "\\."))
    .join("|");

  return new RegExp(`^${base}(${escapedLevels})$`);
}

export function removeElementsBefore(data: string[], target: string) {
  const index = data.findIndex((el) => el === target);

  if (index === -1) {
    return data;
  }

  return data.slice(index);
}

export function removeElementsAfter(data: string[], target: string) {
  const index = data.findIndex((el) => el === target);

  if (index === -1) {
    return data;
  }

  return data.slice(0, index + 1);
}

export function removeElement(data: string[], target: string) {
  const index = data.findIndex((el) => el === target);

  if (index === -1) {
    return data;
  }

  return data.splice(index, 1);
}
