import * as z from 'zod'

export const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.').max(50, 'Name must be at most 50 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    message: z.string().min(10, 'Message must be at least 10 characters.').max(500, 'Message must be at most 500 characters.')
})
