import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ordersService, type CheckoutPayload } from '../services/orders.service'

export function useCheckout() {
    return useMutation({
        mutationFn: (payload: CheckoutPayload) => ordersService.createCheckoutSession(payload),
        onSuccess: (response) => {
            // Redirect to the Stripe hosted checkout page
            if (response?.data?.success_url) {
                window.location.href = response.data.success_url
            } else {
                toast.error('Failed to get checkout URL')
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to initiate checkout')
        }
    })
}
