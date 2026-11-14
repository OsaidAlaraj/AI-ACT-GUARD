import { afterEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { createTestDb } from "./testing.js";

describe("createTestDb", () => {
  let close: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await close?.();
  });

  it("gives tests a real PostgreSQL that runs queries", async () => {
    const testDb = await createTestDb();
    close = testDb.close;
    const result = await testDb.db.execute(sql`select 1 + 1 as two, version() as version`);
    const row = result.rows[0] as { two: number; version: string };
    expect(row.two).toBe(2);
    expect(row.version).toMatch(/^PostgreSQL/);
  });
});
