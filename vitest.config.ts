import { defineConfig } from "vitest/config";

// One test run for the whole workspace. Part of the `pnpm verify` gate (adr-002).
export default defineConfig({
  test: {
    include: ["packages/*/src/**/*.test.ts", "apps/web/src/**/*.test.{ts,tsx}"],
    environment: "node",
    testTimeout: 20_000,
  },
});
