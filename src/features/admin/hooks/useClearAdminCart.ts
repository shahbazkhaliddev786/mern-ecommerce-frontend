import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminCartService } from '../services/cart.service'

export function useClearAdminCart() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (userId: string) => adminCartService.clear(userId),
        onSuccess: (response, userId) => {
            toast.success(response.message || 'Cart cleared successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-carts'] })
            queryClient.invalidateQueries({ queryKey: ['admin-cart', userId] })
        }
    })
}
