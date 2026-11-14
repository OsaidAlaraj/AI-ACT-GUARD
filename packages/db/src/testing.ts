// Test helper: a real PostgreSQL running in-process (PGlite), so tests need no server or Docker.
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema.js";

export async function createTestDb() {
  const client = new PGlite();
  await client.waitReady;
  const db = drizzle({ client, schema });
  return {
    db,
    client,
    /** Safe to call more than once. */
    close: async () => {
      if (!client.closed) await client.close();
    },
  };
}
