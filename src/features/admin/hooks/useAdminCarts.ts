import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { adminCartService, type AdminCartQuery } from '../services/cart.service'

export function useAdminCarts(query: AdminCartQuery) {
    return useQuery({
        queryKey: ['admin-carts', query],
        queryFn: () => adminCartService.getAll(query),
        placeholderData: keepPreviousData
    })
}
