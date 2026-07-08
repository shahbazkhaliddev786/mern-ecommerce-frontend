import { http } from '@/shared/services/api'
import type { ApiResponse } from '@/shared/types/api'
import type { Product, ProductsData } from '../types'

export const productService = {
    /**
     * Get all products
     * GET /v1/products
     */
    getAll: (options?: RequestInit) => http.get<ApiResponse<ProductsData>>('/v1/products', options),

    /**
     * Get a single product by ID
     * GET /v1/products/:id
     */
    getById: (id: string) => http.getById<ApiResponse<Product>>('/v1/products', id)
}
