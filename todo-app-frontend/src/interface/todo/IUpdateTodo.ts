import { UpdateTodoSchema } from "@/validations/validateUpdateTodoForm";
import { z } from "zod";


export type IUpdateTodo = z.infer<typeof UpdateTodoSchema>
