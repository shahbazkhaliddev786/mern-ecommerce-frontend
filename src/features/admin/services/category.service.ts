import { http } from '@/shared/services/api'
import type { ApiResponse } from '@/shared/types/api'
import type { Category } from '@/features/products/types'
import type { CategoryFormData } from '../schemas/category.schema'

const CATEGORIES_ENDPOINT = '/v1/categories'

export const categoryService = {
    /** POST /v1/categories */
    create: (values: CategoryFormData) => http.post<ApiResponse<Category>>(CATEGORIES_ENDPOINT, values),

    /** PUT /v1/categories/:id */
    update: (id: string, values: CategoryFormData) => http.put<ApiResponse<Category>>(`${CATEGORIES_ENDPOINT}/${id}`, values),

    /** DELETE /v1/categories/:id */
    remove: (id: string) => http.deleteById<ApiResponse<void>>(CATEGORIES_ENDPOINT, id)
}
