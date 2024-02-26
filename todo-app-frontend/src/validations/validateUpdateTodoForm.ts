import { z } from 'zod'

export const initialUpdateTodoFormValues = {
    title: '',
    description: ''
}

export const UpdateTodoSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
    taskType: z.string()
})
