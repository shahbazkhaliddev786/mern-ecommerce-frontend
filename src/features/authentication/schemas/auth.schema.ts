import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'A valid email is required' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character (!@#$%^&*)' }),
    profile: z.any().optional() // FileList
})

export type SignupFormData = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    email: z.string().email({ message: 'A valid email is required' }),
    password: z.string().min(1, { message: 'Password is required' })
})

export type LoginFormData = z.infer<typeof loginSchema>

export const editProfileSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).optional().or(z.literal('')),
    email: z.string().email({ message: 'A valid email is required' }).optional().or(z.literal('')),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character (!@#$%^&*)' })
        .optional()
        .or(z.literal('')),
    profile: z.any().optional()
})

export type EditProfileFormData = z.infer<typeof editProfileSchema>
