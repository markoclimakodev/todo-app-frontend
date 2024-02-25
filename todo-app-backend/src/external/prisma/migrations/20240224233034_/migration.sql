/*
  Warnings:

  - You are about to drop the column `category` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "category",
ADD COLUMN     "taskType" TEXT NOT NULL DEFAULT 'todo';
