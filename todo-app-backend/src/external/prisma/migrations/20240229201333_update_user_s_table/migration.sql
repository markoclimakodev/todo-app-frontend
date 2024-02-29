/*
  Warnings:

  - You are about to drop the column `categories` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "categories",
ADD COLUMN     "taskLists" TEXT[];
