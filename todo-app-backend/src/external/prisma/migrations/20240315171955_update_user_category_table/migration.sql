/*
  Warnings:

  - A unique constraint covering the columns `[category_id]` on the table `userCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userCategories_category_id_key" ON "userCategories"("category_id");
