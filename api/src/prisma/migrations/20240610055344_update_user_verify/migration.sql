/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "user_emailToken_key" ON "user"("emailToken");
