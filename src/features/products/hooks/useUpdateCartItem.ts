import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { cartService } from '../services/cart.service'

interface UpdateCartItemPayload {
    productId: string
    quantity: number
}

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: UpdateCartItemPayload) => cartService.updateCartItem(payload.productId, payload.quantity),
        onSuccess: (data) => {
            toast.success(data.message || 'Quantity updated')
            return queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : 'Failed to update quantity'
            toast.error(message)
        }
    })
}
