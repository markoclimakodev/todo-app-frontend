import { z } from 'zod'

export const initialFormValues = {
  email: '',
  password: ''
}

export const LoginSchema = z.object({
  email: z.string().email({message: 'Email ou senha incorretos.'}),
  password: z.string().min(8, { message: 'Email ou senha incorretos.' }),
})

export type CreateLoginSchema = z.infer<typeof LoginSchema>