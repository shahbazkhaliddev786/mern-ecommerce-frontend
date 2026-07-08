import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { adminOrderService, type AdminOrderQuery } from '../services/order.service'

export function useAdminOrders(query: AdminOrderQuery) {
    return useQuery({
        queryKey: ['admin-orders', query],
        queryFn: () => adminOrderService.getAll(query),
        placeholderData: keepPreviousData
    })
}
