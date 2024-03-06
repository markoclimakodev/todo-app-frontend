/*
  Warnings:

  - You are about to drop the column `completed` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `important` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `task_type` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `taskLists` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "completed",
DROP COLUMN "important",
DROP COLUMN "task_type";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "taskLists";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todoCategories" (
    "id" TEXT NOT NULL,
    "todo_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todoCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "todoCategories" ADD CONSTRAINT "todoCategories_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todoCategories" ADD CONSTRAINT "todoCategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
