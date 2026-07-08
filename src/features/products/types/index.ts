import type { Pagination } from '@/shared/types/api'

export interface Category {
    _id: string
    name: string
    createdAt?: string
    updatedAt?: string
}

export interface Brand {
    _id: string
    name: string
    createdAt?: string
    updatedAt?: string
}

export interface Product {
    _id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    rating?: number
    reviews?: number
    images: string[]
    stock: number
    category: Category
    brand: Brand
    createdAt: string
    updatedAt: string
}

export interface ProductsData {
    products: Product[]
    pagination: Pagination
}

export interface CartItem {
    _id: string
    product: Product
    quantity: number
}

export interface Cart {
    _id: string
    user: string
    items: CartItem[]
    itemsCount: number
    subtotal: number
    createdAt: string
    updatedAt: string
}

export interface AddToCartPayload {
    productId: string
    quantity?: number
}
