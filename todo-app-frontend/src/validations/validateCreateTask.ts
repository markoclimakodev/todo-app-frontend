import { z } from 'zod'

export const initialCreateTaskValues = {
  name: '',
}

export const TaskSchema = z.object({
  name: z.string().min(3),
})