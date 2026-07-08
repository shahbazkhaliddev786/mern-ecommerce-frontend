import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'
import type { ApiResponse } from '@/shared/types/api'
import type { Product } from '../types'

export const useProduct = (id: string) =>
    useQuery<ApiResponse<Product>, Error>({
        queryKey: ['product', id],
        queryFn: () => productService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000
    })
