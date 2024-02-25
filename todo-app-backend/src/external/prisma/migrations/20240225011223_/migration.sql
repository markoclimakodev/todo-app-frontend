/*
  Warnings:

  - You are about to drop the column `taskType` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "taskType",
ADD COLUMN     "task_type" TEXT NOT NULL DEFAULT 'todo';
