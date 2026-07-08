import { z } from 'zod'

export const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Category name is required')
        .min(2, 'Category name must be at least 2 characters')
        .max(100, 'Category name must be at most 100 characters')
})

export type CategoryFormData = z.infer<typeof categorySchema>
