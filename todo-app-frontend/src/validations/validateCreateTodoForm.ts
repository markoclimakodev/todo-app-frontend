import { z } from 'zod'

export const initialCreateTodoFormValues = {
    title: '',
    description: ''
}

export const CreateSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(8),
})

export type CreateTodoSchema = z.infer<typeof CreateSchema>
