/*
  Warnings:

  - You are about to drop the column `name` on the `game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "name",
ALTER COLUMN "winnerId" SET DEFAULT '',
ALTER COLUMN "loserId" SET DEFAULT '';
