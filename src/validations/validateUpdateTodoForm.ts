import { z } from 'zod'

export const updateTodoValues = {
    title: '',
    description: '',
    category: ''
}

export const UpdateTodoSchema = z.object({
    title: z.string().min(6),
    description: z.string().min(30),
    category: z.string()
})
