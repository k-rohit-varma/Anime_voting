/*
  Warnings:

  - You are about to drop the `_AnimeToVote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `animeId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToVote" DROP CONSTRAINT "_AnimeToVote_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToVote" DROP CONSTRAINT "_AnimeToVote_B_fkey";

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "animeId" TEXT NOT NULL,
ALTER COLUMN "voteValue" SET DEFAULT 1;

-- DropTable
DROP TABLE "_AnimeToVote";

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
