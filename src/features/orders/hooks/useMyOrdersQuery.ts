import { useQuery } from '@tanstack/react-query'
import { ordersService, type MyOrdersResponse } from '../services/orders.service'

export function useMyOrdersQuery() {
    return useQuery<MyOrdersResponse, Error>({
        queryKey: ['my-orders'],
        queryFn: () => ordersService.getMyOrders()
    })
}
