import { z } from 'zod'

export const initialCreateCategory = {
  name: '',
}

export const CategorySchema = z.object({
  name: z.string().min(3),
})