import { describe, expect, it } from "vitest";
import { findClass } from "./core";

describe("findClass", () => {
  describe("color classes", () => {
    it("should increment color level when direction is up", () => {
      expect(findClass("bg-red-500", "up")).toBe("bg-red-600");
      expect(findClass("text-blue-400", "up")).toBe("text-blue-500");
    });

    it("should decrement color level when direction is down", () => {
      expect(findClass("bg-red-500", "down")).toBe("bg-red-400");
      expect(findClass("text-blue-400", "down")).toBe("text-blue-300");
    });

    it("should wrap around at the ends of the color levels", () => {
      expect(findClass("bg-red-950", "up")).toBe("bg-red-50");
      expect(findClass("bg-red-50", "down")).toBe("bg-red-950");
    });
  });

  describe("distance classes", () => {
    it("should increment distance when direction is up", () => {
      expect(findClass("p-2", "up")).toBe("p-2.5");
      expect(findClass("m-4", "up")).toBe("m-5");
    });

    it("should decrement distance when direction is down", () => {
      expect(findClass("p-2", "down")).toBe("p-1.5");
      expect(findClass("m-4", "down")).toBe("m-3.5");
    });

    it("should wrap around at the ends of the distance levels", () => {
      expect(findClass("p-96", "up")).toBe("p-0");
      expect(findClass("p-0", "down")).toBe("p-96");
    });

    it("should handle negative classes correctly", () => {
      expect(findClass("-mt-4", "up")).toBe("-mt-5");
      expect(findClass("-mt-4", "down")).toBe("-mt-3.5");
      expect(findClass("-mb-96", "up")).toBe("-mb-0");
      expect(findClass("-mb-0", "down")).toBe("-mb-96");
    });
  });

  describe("error handling", () => {
    it("should throw error for unsupported classes", () => {
      expect(() => findClass("not-a-real-class", "up")).toThrow();
    });
  });
});
