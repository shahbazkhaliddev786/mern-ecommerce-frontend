import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminCartService } from '../services/cart.service'

interface RemoveCartItemArgs {
    userId: string
    productId: string
}

export function useRemoveCartItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ userId, productId }: RemoveCartItemArgs) => adminCartService.removeItem(userId, productId),
        onSuccess: (response, { userId }) => {
            toast.success(response.message || 'Item removed from cart successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-carts'] })
            queryClient.invalidateQueries({ queryKey: ['admin-cart', userId] })
        }
    })
}
