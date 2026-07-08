import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { cartService } from '../services/cart.service'

export const useClearCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => cartService.clearCart(),
        onSuccess: (data) => {
            toast.success(data.message || 'Cart cleared successfully')
            return queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : 'Failed to clear cart'
            toast.error(message)
        }
    })
}
