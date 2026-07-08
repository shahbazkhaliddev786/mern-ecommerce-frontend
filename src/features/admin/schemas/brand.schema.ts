import { z } from 'zod'

export const brandSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Brand name is required')
        .min(2, 'Brand name must be at least 2 characters')
        .max(100, 'Brand name must be at most 100 characters')
})

export type BrandFormData = z.infer<typeof brandSchema>
