import { defineConfig } from "drizzle-kit";

// Migrations for the Neon database (EU Frankfurt). DATABASE_URL comes from apps/web/.env.local.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
