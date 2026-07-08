import { useQuery } from '@tanstack/react-query'
import { adminOrderService } from '../services/order.service'

export function useAdminOrder(orderId: string | null) {
    return useQuery({
        queryKey: ['admin-order', orderId],
        queryFn: () => adminOrderService.getById(orderId as string),
        enabled: Boolean(orderId)
    })
}
