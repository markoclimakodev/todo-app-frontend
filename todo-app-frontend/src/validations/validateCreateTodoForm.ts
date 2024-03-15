import { z } from 'zod'

export const createTodoValues = {
    title: '',
    description: '',
    category: 'casa'
}

export const CreateTodoSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
    category: z.string(),
})
