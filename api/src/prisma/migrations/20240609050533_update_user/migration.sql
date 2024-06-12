/*
  Warnings:

  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
