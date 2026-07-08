import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminOrderService } from '../services/order.service'

export function useDeleteOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (orderId: string) => adminOrderService.remove(orderId),
        onSuccess: (response) => {
            toast.success(response.message || 'Order deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
        }
    })
}
