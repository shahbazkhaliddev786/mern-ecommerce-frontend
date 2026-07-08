import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminCartService } from '../services/cart.service'

interface UpdateCartItemQuantityArgs {
    userId: string
    productId: string
    quantity: number
}

export function useUpdateCartItemQuantity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ userId, productId, quantity }: UpdateCartItemQuantityArgs) => adminCartService.updateItemQuantity(userId, productId, quantity),
        onSuccess: (response, { userId }) => {
            toast.success(response.message || 'Cart item updated successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-carts'] })
            queryClient.invalidateQueries({ queryKey: ['admin-cart', userId] })
        }
    })
}
