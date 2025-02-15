// @ts-expect-error es modules
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // those are handled by playwright
    exclude: ["node_modules", "dist", "src/classes/**.ts"],
  },
});
