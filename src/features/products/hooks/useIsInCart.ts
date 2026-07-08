import { useCart } from './useCart'

export const useIsInCart = (productId: string): boolean => {
    const { data: cart } = useCart()

    if (!cart?.items) return false
    return cart.items.some((item) => item.product._id === productId)
}
