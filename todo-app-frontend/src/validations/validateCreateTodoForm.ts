import { z } from 'zod'

export const initialCreateTodoFormValues = {
    title: '',
    description: '',
    taskType: 'casa'
}

export const CreateTodoSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
    taskType: z.string(),
    userId: z.string()
})
