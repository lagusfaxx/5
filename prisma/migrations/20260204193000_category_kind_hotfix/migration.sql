-- Hotfix migration: ensure Category.kind exists (legacy DBs were created without it)

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CategoryKind') THEN
    CREATE TYPE "CategoryKind" AS ENUM ('PROFESSIONAL', 'ESTABLISHMENT');
  END IF;
END $$;

-- Ensure Category table exists (older installs may have it, but without some columns)
CREATE TABLE IF NOT EXISTS "Category" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "icon" TEXT,
  "kind" "CategoryKind" NOT NULL DEFAULT 'PROFESSIONAL',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- Add missing columns if the table already existed
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "icon" TEXT;
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "kind" "CategoryKind" NOT NULL DEFAULT 'PROFESSIONAL';

-- Unique slug
CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");
