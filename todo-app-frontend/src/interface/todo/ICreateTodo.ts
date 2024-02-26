import { CreateTodoSchema } from "@/validations/validateCreateTodoForm";
import { z } from "zod";

export type ICreateTodo = z.infer<typeof CreateTodoSchema>