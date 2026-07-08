import { apiFetch, http } from '@/shared/services/api'
import type { ShippingAddress } from '../schemas/shipping-schema'

export interface CheckoutPayload {
    shippingAddress: ShippingAddress
    items: Omit<OrderItem, '_id'>[]
    subtotal: number
    tax: number
    shipping: number
    total: number
}

export interface CheckoutResponse {
    data: {
        sessionId: string
        success_url: string
    }
    message: string
}

export interface OrderItem {
    product: string
    name: string
    price: number
    quantity: number
    image: string
    _id: string
}

export interface Order {
    _id: string
    user: string
    items: OrderItem[]
    subtotal: number
    tax: number
    shipping: number
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    stripeSessionId: string
    createdAt: string
    updatedAt: string
}

export interface MyOrdersResponse {
    status: string
    data: Order[]
}

export const ordersService = {
    /**
     * Create a checkout session
     * POST /v1/orders/checkout
     */
    createCheckoutSession: async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
        return http.post<CheckoutResponse>('/v1/orders/checkout', payload)
    },

    /**
     * Get current user's orders
     * GET /v1/orders/my-orders
     */
    getMyOrders: async (): Promise<MyOrdersResponse> => {
        const raw = await apiFetch<unknown>('/v1/orders/my-orders', {
            method: 'GET'
        })

        return raw as MyOrdersResponse
    }
}
