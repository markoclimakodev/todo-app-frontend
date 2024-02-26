import { RegisterSchema } from "@/validations/validateRegisterForm";

export type IRegister = Zod.infer<typeof RegisterSchema>
