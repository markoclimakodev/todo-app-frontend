import { z } from 'zod'

export const initialCreateTodoFormValues = {
    title: '',
    description: '',
    categoryName: 'casa'
}

export const CreateTodoSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
    categoryName: z.string(),
    userId: z.string()
})
