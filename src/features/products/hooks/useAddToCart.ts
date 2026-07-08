import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { cartService } from '../services/cart.service'
import type { AddToCartPayload } from '../types'

export const useAddToCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: AddToCartPayload) => cartService.addToCart(payload),
        onSuccess: (data) => {
            toast.success(data.message || 'Added to cart')
            return queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : 'Failed to add to cart'
            toast.error(message)
        }
    })
}
