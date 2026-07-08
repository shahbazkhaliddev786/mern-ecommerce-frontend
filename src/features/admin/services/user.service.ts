import { http } from '@/shared/services/api'
import type { ApiResponse, Pagination } from '@/shared/types/api'
import type { AdminUser, UserRole } from '../types/user.types'

export interface AdminUserQuery {
    search?: string
    role?: UserRole | ''
    page?: number
    limit?: number
}

const USERS_ENDPOINT = '/v1/admin/users'

function buildQueryString(query: AdminUserQuery): string {
    const params = new URLSearchParams()

    if (query.search?.trim()) params.set('search', query.search.trim())
    if (query.role) params.set('role', query.role)
    if (query.page) params.set('page', String(query.page))
    if (query.limit) params.set('limit', String(query.limit))

    const qs = params.toString()
    return qs ? `?${qs}` : ''
}

export const adminUserService = {
    /** GET /v1/admin/users with search, role filter & pagination */
    getAll: (query: AdminUserQuery = {}) =>
        http.get<ApiResponse<{ users: AdminUser[]; pagination: Pagination }>>(`${USERS_ENDPOINT}${buildQueryString(query)}`),

    /** PATCH /v1/admin/users/:userId/role */
    updateRole: (userId: string, role: UserRole) => http.patch<ApiResponse<AdminUser>>(`${USERS_ENDPOINT}/${userId}/role`, { role }),

    /** DELETE /v1/admin/users/:userId */
    remove: (userId: string) => http.deleteById<ApiResponse<void>>(USERS_ENDPOINT, userId)
}
