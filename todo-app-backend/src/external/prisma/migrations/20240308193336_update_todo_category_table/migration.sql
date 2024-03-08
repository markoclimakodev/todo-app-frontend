/*
  Warnings:

  - A unique constraint covering the columns `[todo_id]` on the table `todoCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "todoCategories_todo_id_key" ON "todoCategories"("todo_id");
