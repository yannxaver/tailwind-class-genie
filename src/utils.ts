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

export function removeUrlsBefore(data: string[], targetUrl: string) {
  const index = data.findIndex((url) => url === targetUrl);

  if (index === -1) {
    console.warn(`Target URL "${targetUrl}" not found in the array.`);
    return data;
  }

  return data.slice(index);
}

export function removeUrlsAfter(data: string[], targetUrl: string) {
  const index = data.findIndex((url) => url === targetUrl);

  if (index === -1) {
    console.warn(`Target URL "${targetUrl}" not found in the array.`);
    return data;
  }

  return data.slice(0, index + 1);
}

export function removeUrl(data: string[], targetUrl: string) {
  const index = data.findIndex((url) => url === targetUrl);

  if (index === -1) {
    console.warn(`Target URL "${targetUrl}" not found in the array.`);
    return data;
  }

  data.splice(index, 1);

  return data;
}
