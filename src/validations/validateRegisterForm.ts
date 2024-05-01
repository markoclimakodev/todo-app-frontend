import { z } from 'zod'

export const initialRegisterFormValues = {
  name: '',
  email: '',
  password: ''
}

export const RegisterSchema = z.object({
  name: z.string().min(3, {message: 'O nome deve conter pelo menos 3 caracteres.'}),
  email: z.string().email({message: 'Email incorreto. ex: joao@gmail.com'}),
  password: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' }),
})
