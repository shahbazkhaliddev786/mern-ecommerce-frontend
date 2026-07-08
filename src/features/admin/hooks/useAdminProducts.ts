import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { adminProductService, type AdminProductQuery } from '../services/product.service'

export function useAdminProducts(query: AdminProductQuery) {
    return useQuery({
        queryKey: ['admin-products', query],
        queryFn: () => adminProductService.getAll(query),
        placeholderData: keepPreviousData
    })
}
