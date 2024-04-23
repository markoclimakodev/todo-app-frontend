-- CreateIndex
CREATE INDEX "todoCategories_todo_id_category_id_idx" ON "todoCategories"("todo_id", "category_id");

-- CreateIndex
CREATE INDEX "todos_id_idx" ON "todos"("id");

-- CreateIndex
CREATE INDEX "userCategories_category_id_idx" ON "userCategories"("category_id");
