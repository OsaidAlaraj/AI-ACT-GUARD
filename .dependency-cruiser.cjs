// Executable architecture (factor 7). Encodes the boundary in docs/adr/adr-001-architecture.md.
// Runs in the `pnpm verify` gate; a violation fails the build.
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "engine-is-pure",
      severity: "error",
      comment:
        "packages/engine is the hexagonal core: no framework, UI, database, auth or model SDK. It defines ports; adapters implement them (adr-001).",
      from: { path: "^packages/engine/" },
      to: {
        // Matches both a resolved path and a bare specifier: under pnpm an undeclared package
        // does not resolve, and a node_modules-only pattern would then pass vacuously.
        path: "(^|/node_modules/)(next|react|react-dom|drizzle-orm|drizzle-kit|@electric-sql/pglite|ai|@ai-sdk/[^/]+|better-auth|@react-pdf/[^/]+)(/|$)",
      },
    },
    {
      name: "engine-imports-no-workspace-package",
      severity: "error",
      comment: "The core never depends on its adapters or the web app (dependencies point inward).",
      from: { path: "^packages/engine/" },
      to: { path: "^(packages/(gateway|db)|apps)/" },
    },
    {
      name: "model-sdk-only-in-gateway",
      severity: "error",
      comment:
        "All model calls go through the single gateway (requirements D7), so switching provider or moving to the EU route is configuration, not a rebuild.",
      from: { pathNot: "^packages/gateway/" },
      to: { path: "(^|/node_modules/)(ai|@ai-sdk/[^/]+)(/|$)" },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      comment:
        "Every import must resolve. An unresolved import is either an undeclared dependency or a typo, and it would slip past the path rules above.",
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: "no-circular",
      severity: "error",
      comment: "Circular dependencies hide the dependency direction.",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "(^|/)(\\.next|node_modules|coverage|reports)/" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.base.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["module", "main", "types", "typings"],
      extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"],
    },
  },
};
