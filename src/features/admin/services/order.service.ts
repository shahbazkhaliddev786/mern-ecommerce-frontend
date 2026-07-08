import { http } from '@/shared/services/api'
import type { ApiResponse, Pagination } from '@/shared/types/api'
import type { AdminOrderDetail, AdminOrderShippingAddress, AdminOrderSummary, OrderStatus } from '../types/order.types'

export interface AdminOrderItemInput {
    product: string
    quantity: number
}

export interface AdminUpdateOrderDetailsInput {
    shippingAddress?: Partial<AdminOrderShippingAddress>
    tax?: number
    shipping?: number
    items?: AdminOrderItemInput[]
}

export interface AdminOrderQuery {
    search?: string
    status?: OrderStatus | ''
    page?: number
    limit?: number
}

const ORDERS_ENDPOINT = '/v1/admin/orders'

function buildQueryString(query: AdminOrderQuery): string {
    const params = new URLSearchParams()

    if (query.search?.trim()) params.set('search', query.search.trim())
    if (query.status) params.set('status', query.status)
    if (query.page) params.set('page', String(query.page))
    if (query.limit) params.set('limit', String(query.limit))

    const qs = params.toString()
    return qs ? `?${qs}` : ''
}

export const adminOrderService = {
    /** GET /v1/admin/orders with search, status filter & pagination */
    getAll: (query: AdminOrderQuery = {}) =>
        http.get<ApiResponse<{ orders: AdminOrderSummary[]; pagination: Pagination }>>(`${ORDERS_ENDPOINT}${buildQueryString(query)}`),

    /** GET /v1/admin/orders/:orderId */
    getById: (orderId: string) => http.get<ApiResponse<AdminOrderDetail>>(`${ORDERS_ENDPOINT}/${orderId}`),

    /** PATCH /v1/admin/orders/:orderId/status */
    updateStatus: (orderId: string, status: OrderStatus) =>
        http.patch<ApiResponse<AdminOrderDetail>>(`${ORDERS_ENDPOINT}/${orderId}/status`, { status }),

    /** PATCH /v1/admin/orders/:orderId — shipping address, tax/shipping, and/or items */
    updateDetails: (orderId: string, updates: AdminUpdateOrderDetailsInput) =>
        http.patch<ApiResponse<AdminOrderDetail>>(`${ORDERS_ENDPOINT}/${orderId}`, updates),

    /** DELETE /v1/admin/orders/:orderId */
    remove: (orderId: string) => http.deleteById<ApiResponse<void>>(ORDERS_ENDPOINT, orderId)
}
