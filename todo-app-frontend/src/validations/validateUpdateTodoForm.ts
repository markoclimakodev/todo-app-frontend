import { z } from 'zod'

export const updateTodoValues = {
    title: '',
    description: '',
    category: ''
}

export const UpdateTodoSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
    category: z.string()
})
