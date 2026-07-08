export type UserRole = 'user' | 'admin'

export interface AdminUser {
    id: string
    name: string
    email: string
    profile?: string
    role: UserRole
    isVerified: boolean
    createdAt: string
}
