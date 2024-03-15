/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `userCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userCategories_user_id_key" ON "userCategories"("user_id");
