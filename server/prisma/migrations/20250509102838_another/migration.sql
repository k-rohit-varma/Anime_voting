/*
  Warnings:

  - A unique constraint covering the columns `[contestId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_contestId_key" ON "Vote"("contestId");
