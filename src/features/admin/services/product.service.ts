import { http } from '@/shared/services/api'
import type { ApiResponse } from '@/shared/types/api'
import type { Product, ProductsData } from '@/features/products/types'
import type { ProductFormData } from '../schemas/product.schema'

export type ProductSort = 'newest' | 'price_low' | 'price_high'

export interface AdminProductQuery {
    search?: string
    category?: string
    brand?: string
    sort?: ProductSort
    page?: number
    limit?: number
}

const PRODUCTS_ENDPOINT = '/v1/products'

/** Serialize admin list filters into a query string the backend understands. */
function buildQueryString(query: AdminProductQuery): string {
    const params = new URLSearchParams()

    if (query.search?.trim()) params.set('search', query.search.trim())
    if (query.category) params.append('category', query.category)
    if (query.brand) params.append('brand', query.brand)
    if (query.sort) params.set('sort', query.sort)
    if (query.page) params.set('page', String(query.page))
    if (query.limit) params.set('limit', String(query.limit))

    const qs = params.toString()
    return qs ? `?${qs}` : ''
}

/**
 * Shape a product form payload into multipart/form-data.
 * Only defined scalar fields are appended (safe for partial PATCH updates);
 * images are appended under the `files` key expected by the backend multer middleware.
 */
function toProductFormData(values: Partial<ProductFormData>, images: File[]): FormData {
    const formData = new FormData()

    if (values.name !== undefined) formData.append('name', values.name)
    if (values.description !== undefined) formData.append('description', values.description)
    if (values.price !== undefined) formData.append('price', String(values.price))
    if (values.stock !== undefined) formData.append('stock', String(values.stock))
    if (values.category !== undefined) formData.append('category', values.category)
    if (values.brand !== undefined) formData.append('brand', values.brand)

    images.forEach((file) => formData.append('files', file))

    return formData
}

export const adminProductService = {
    /** GET /v1/products with server-side search, filter, sort & pagination */
    getAll: (query: AdminProductQuery = {}) => http.get<ApiResponse<ProductsData>>(`${PRODUCTS_ENDPOINT}${buildQueryString(query)}`),

    /** POST /v1/products (multipart) */
    create: (values: ProductFormData, images: File[]) => http.post<ApiResponse<Product>>(PRODUCTS_ENDPOINT, toProductFormData(values, images)),

    /** PATCH /v1/products/:id (multipart) */
    update: (id: string, values: Partial<ProductFormData>, images: File[]) =>
        http.patch<ApiResponse<Product>>(`${PRODUCTS_ENDPOINT}/${id}`, toProductFormData(values, images)),

    /** DELETE /v1/products/:id */
    remove: (id: string) => http.deleteById<ApiResponse<Product>>(PRODUCTS_ENDPOINT, id)
}
