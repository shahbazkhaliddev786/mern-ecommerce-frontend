import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminOrderService } from '../services/order.service'
import type { OrderStatus } from '../types/order.types'

interface UpdateOrderStatusArgs {
    orderId: string
    status: OrderStatus
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ orderId, status }: UpdateOrderStatusArgs) => adminOrderService.updateStatus(orderId, status),
        onSuccess: (response, { orderId }) => {
            toast.success(response.message || 'Order status updated successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
            queryClient.invalidateQueries({ queryKey: ['admin-order', orderId] })
        }
    })
}
