import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { cartService } from '../services/cart.service'

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (productId: string) => cartService.removeFromCart(productId),
        onSuccess: (data) => {
            toast.success(data.message || 'Removed from cart')
            return queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : 'Failed to remove from cart'
            toast.error(message)
        }
    })
}
