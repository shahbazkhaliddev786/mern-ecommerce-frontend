import { http } from '@/shared/services/api'
import type { ApiResponse, Pagination } from '@/shared/types/api'
import type { AdminCartDetail, AdminCartSummary } from '../types/cart.types'

export interface AdminCartQuery {
    search?: string
    page?: number
    limit?: number
}

const CARTS_ENDPOINT = '/v1/admin/carts'

function buildQueryString(query: AdminCartQuery): string {
    const params = new URLSearchParams()

    if (query.search?.trim()) params.set('search', query.search.trim())
    if (query.page) params.set('page', String(query.page))
    if (query.limit) params.set('limit', String(query.limit))

    const qs = params.toString()
    return qs ? `?${qs}` : ''
}

export const adminCartService = {
    /** GET /v1/admin/carts with search & pagination */
    getAll: (query: AdminCartQuery = {}) =>
        http.get<ApiResponse<{ carts: AdminCartSummary[]; pagination: Pagination }>>(`${CARTS_ENDPOINT}${buildQueryString(query)}`),

    /** GET /v1/admin/carts/:userId */
    getByUserId: (userId: string) => http.get<ApiResponse<AdminCartDetail>>(`${CARTS_ENDPOINT}/${userId}`),

    /** PATCH /v1/admin/carts/:userId/items/:productId */
    updateItemQuantity: (userId: string, productId: string, quantity: number) =>
        http.patch<ApiResponse<AdminCartDetail>>(`${CARTS_ENDPOINT}/${userId}/items/${productId}`, {
            quantity
        }),

    /** DELETE /v1/admin/carts/:userId/items/:productId */
    removeItem: (userId: string, productId: string) => http.deleteById<ApiResponse<AdminCartDetail>>(`${CARTS_ENDPOINT}/${userId}/items`, productId),

    /** DELETE /v1/admin/carts/:userId */
    clear: (userId: string) => http.deleteById<ApiResponse<AdminCartDetail>>(CARTS_ENDPOINT, userId)
}
