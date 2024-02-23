import { z } from 'zod'

export const initialUpdateTodoFormValues = {
    title: '',
    description: ''
}

export const UpdateSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
})

export type UpdateTodoSchema = z.infer<typeof UpdateSchema>