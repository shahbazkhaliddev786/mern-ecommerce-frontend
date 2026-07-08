import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminOrderService, type AdminUpdateOrderDetailsInput } from '../services/order.service'

interface UpdateOrderDetailsArgs {
    orderId: string
    updates: AdminUpdateOrderDetailsInput
}

export function useUpdateOrderDetails() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ orderId, updates }: UpdateOrderDetailsArgs) => adminOrderService.updateDetails(orderId, updates),
        onSuccess: (response, { orderId }) => {
            toast.success(response.message || 'Order updated successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
            queryClient.invalidateQueries({ queryKey: ['admin-order', orderId] })
        }
    })
}
