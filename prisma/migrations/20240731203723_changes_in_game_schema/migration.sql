-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_loserId_fkey";

-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_winnerId_fkey";

-- AlterTable
ALTER TABLE "game" ALTER COLUMN "winnerId" DROP NOT NULL,
ALTER COLUMN "winnerId" DROP DEFAULT,
ALTER COLUMN "loserId" DROP NOT NULL,
ALTER COLUMN "loserId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
