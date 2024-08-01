-- CreateEnum
CREATE TYPE "Side" AS ENUM ('LEFT', 'RIGHT');

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "side" "Side" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sharkAttack" INTEGER NOT NULL DEFAULT 0,
    "sharkAttackAttempts" INTEGER NOT NULL DEFAULT 0,
    "parallel" INTEGER NOT NULL DEFAULT 0,
    "parallelAttempts" INTEGER NOT NULL DEFAULT 0,
    "longMiddle" INTEGER NOT NULL DEFAULT 0,
    "longMiddleAttempts" INTEGER NOT NULL DEFAULT 0,
    "longDiagonal" INTEGER NOT NULL DEFAULT 0,
    "longDiagonalAttempts" INTEGER NOT NULL DEFAULT 0,
    "shortDiagonal" INTEGER NOT NULL DEFAULT 0,
    "shortDiagonalAttempts" INTEGER NOT NULL DEFAULT 0,
    "shortMiddle" INTEGER NOT NULL DEFAULT 0,
    "shortMiddleAttempts" INTEGER NOT NULL DEFAULT 0,
    "backDrop" INTEGER NOT NULL DEFAULT 0,
    "backDropAttempts" INTEGER NOT NULL DEFAULT 0,
    "block" INTEGER NOT NULL DEFAULT 0,
    "blockAttempts" INTEGER NOT NULL DEFAULT 0,
    "free" INTEGER NOT NULL DEFAULT 0,
    "freeAttempts" INTEGER NOT NULL DEFAULT 0,
    "ace" INTEGER NOT NULL DEFAULT 0,
    "aceAttempts" INTEGER NOT NULL DEFAULT 0,
    "attackError" INTEGER NOT NULL DEFAULT 0,
    "defenseError" INTEGER NOT NULL DEFAULT 0,
    "netTouchError" INTEGER NOT NULL DEFAULT 0,
    "serveError" INTEGER NOT NULL DEFAULT 0,
    "setError" INTEGER NOT NULL DEFAULT 0,
    "receptionError" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team1AttackPoints" INTEGER NOT NULL DEFAULT 0,
    "team1BlockPoints" INTEGER NOT NULL DEFAULT 0,
    "team1ServePoints" INTEGER NOT NULL DEFAULT 0,
    "team1Errors" INTEGER NOT NULL DEFAULT 0,
    "team1TotalPoints" INTEGER NOT NULL DEFAULT 0,
    "team2AttackPoints" INTEGER NOT NULL DEFAULT 0,
    "team2BlockPoints" INTEGER NOT NULL DEFAULT 0,
    "team2ServePoints" INTEGER NOT NULL DEFAULT 0,
    "team2Errors" INTEGER NOT NULL DEFAULT 0,
    "team2TotalPoints" INTEGER NOT NULL DEFAULT 0,
    "winnerId" TEXT NOT NULL,
    "loserId" TEXT NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "win" INTEGER NOT NULL DEFAULT 0,
    "loss" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamGames" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamPlayers_AB_unique" ON "_TeamPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamPlayers_B_index" ON "_TeamPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamGames_AB_unique" ON "_TeamGames"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamGames_B_index" ON "_TeamGames"("B");

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_loserId_fkey" FOREIGN KEY ("loserId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamPlayers" ADD CONSTRAINT "_TeamPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamPlayers" ADD CONSTRAINT "_TeamPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamGames" ADD CONSTRAINT "_TeamGames_A_fkey" FOREIGN KEY ("A") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamGames" ADD CONSTRAINT "_TeamGames_B_fkey" FOREIGN KEY ("B") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
