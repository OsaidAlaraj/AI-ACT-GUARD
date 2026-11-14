// Lint config for the whole workspace. Part of the `pnpm verify` gate (adr-002).
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/coverage/**",
      "reports/**",
      ".stryker-tmp/**",
      ".impeccable/**",
      "design-system/**",
      "**/next-env.d.ts",
      // Agent worktrees are full copies of the repo; each lints itself.
      ".claude/worktrees/**",
    ],
  },
  ...tseslint.configs.recommended,
  {
    // Pin the root: a nested checkout (agent worktree) otherwise makes the parser ambiguous.
    languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    settings: { next: { rootDir: "apps/web/" } },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
);
