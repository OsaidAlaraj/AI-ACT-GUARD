import { afterEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { createTestDb } from "./testing.js";

describe("createTestDb", () => {
  let close: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await close?.();
    close = undefined;
  });

  it("gives tests a real PostgreSQL that runs queries", async () => {
    const testDb = await createTestDb();
    close = testDb.close;
    const result = await testDb.db.execute(sql`select 1 + 1 as two, version() as version`);
    const row = result.rows[0] as { two: number; version: string };
    expect(row.two).toBe(2);
    expect(row.version).toMatch(/^PostgreSQL/);
  });

  it("runs Drizzle queries on the same database the raw client sees", async () => {
    const testDb = await createTestDb();
    close = testDb.close;
    await testDb.db.execute(sql`create table probe (id int)`);
    await testDb.db.execute(sql`insert into probe values (7)`);
    const raw = await testDb.client.query<{ id: number }>("select id from probe");
    expect(raw.rows).toEqual([{ id: 7 }]);
  });

  it("close() shuts the database down", async () => {
    const testDb = await createTestDb();
    expect(testDb.client.closed).toBe(false);
    await testDb.close();
    expect(testDb.client.closed).toBe(true);
    await expect(testDb.close()).resolves.toBeUndefined();
  });
});
