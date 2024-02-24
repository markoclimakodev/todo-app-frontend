/*
  Warnings:

  - You are about to drop the column `categories` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'todo';
