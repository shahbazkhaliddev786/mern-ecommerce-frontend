import { http } from '@/shared/services/api'
import type { ApiResponse } from '@/shared/types/api'
import type { Brand } from '@/features/products/types'
import type { BrandFormData } from '../schemas/brand.schema'

const BRANDS_ENDPOINT = '/v1/brands'

export const brandService = {
    /** POST /v1/brands */
    create: (values: BrandFormData) => http.post<ApiResponse<Brand>>(BRANDS_ENDPOINT, values),

    /** PUT /v1/brands/:id */
    update: (id: string, values: BrandFormData) => http.put<ApiResponse<Brand>>(`${BRANDS_ENDPOINT}/${id}`, values),

    /** DELETE /v1/brands/:id */
    remove: (id: string) => http.deleteById<ApiResponse<void>>(BRANDS_ENDPOINT, id)
}
