import { z } from 'zod'

export const initialLoginFormValues = {
  email: '',
  password: ''
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
