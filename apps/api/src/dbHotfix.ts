import pg from "pg";
import { config } from "./config";

/**
 * Production safety net:
 * Some environments can end up with schema drift (e.g. migrations table says a migration ran,
 * but a column is missing). That makes Prisma throw P2022 and the API becomes unusable.
 *
 * This hotfix is intentionally minimal and idempotent.
 */
export async function applyDbHotfixes(): Promise<void> {
  const pool = new pg.Pool({ connectionString: config.databaseUrl });
  const client = await pool.connect();
  try {
    // Ensure Category.kind exists (used by /categories and the client app).
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CategoryKind') THEN
          CREATE TYPE "CategoryKind" AS ENUM ('PROFESSIONAL', 'ESTABLISHMENT');
        END IF;
      END
      $$;
    `);

    await client.query(`
      ALTER TABLE "Category"
      ADD COLUMN IF NOT EXISTS "kind" "CategoryKind" NOT NULL DEFAULT 'PROFESSIONAL';
    `);
  } finally {
    client.release();
    await pool.end();
  }
}
