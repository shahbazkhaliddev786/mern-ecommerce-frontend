import type { Product } from '@/features/products/types'

export interface AdminCartUser {
    _id: string
    name: string
    email: string
}

export interface AdminCartSummary {
    _id: string
    user: AdminCartUser
    itemsCount: number
    subtotal: number
    updatedAt: string
}

export interface AdminCartItem {
    _id: string
    product: Product
    quantity: number
}

export interface AdminCartDetail {
    _id: string
    user: AdminCartUser
    items: AdminCartItem[]
    itemsCount: number
    subtotal: number
    createdAt: string
    updatedAt: string
}
