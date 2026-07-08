import { useQuery } from '@tanstack/react-query'
import { adminCartService } from '../services/cart.service'

export function useAdminCart(userId: string | null) {
    return useQuery({
        queryKey: ['admin-cart', userId],
        queryFn: () => adminCartService.getByUserId(userId as string),
        enabled: Boolean(userId)
    })
}
