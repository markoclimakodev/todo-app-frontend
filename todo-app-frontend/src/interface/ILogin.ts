import { LoginSchema } from "@/validations/validateLoginForm";
import { z } from "zod";

export type ILogin = z.infer<typeof LoginSchema>

