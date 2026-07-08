import { z } from 'zod'

export const productSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Product name is required')
        .min(2, 'Product name must be at least 2 characters')
        .max(200, 'Product name must be at most 200 characters'),
    description: z.string().trim().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
    price: z.number({ error: 'Price is required' }).refine((value) => value > 0, { message: 'Price must be greater than 0' }),
    stock: z
        .number({ error: 'Stock is required' })
        .refine((value) => Number.isInteger(value), { message: 'Stock must be a whole number' })
        .refine((value) => value >= 0, { message: 'Stock cannot be negative' }),
    category: z.string().trim().min(1, 'Category is required'),
    brand: z.string().trim().min(1, 'Brand is required')
})

export type ProductFormData = z.infer<typeof productSchema>
