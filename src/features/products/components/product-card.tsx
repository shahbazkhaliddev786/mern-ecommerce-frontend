import { Link } from 'react-router-dom'
import { Star, ShoppingCart, Trash2 } from 'lucide-react'
import { useAddToCart } from '../hooks/useAddToCart'
import { useRemoveFromCart } from '../hooks/useRemoveFromCart'
import { useIsInCart } from '../hooks/useIsInCart'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
    const addToCartMutation = useAddToCart()
    const removeFromCartMutation = useRemoveFromCart()
    const isInCart = useIsInCart(product._id)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        addToCartMutation.mutate({ productId: product._id, quantity: 1 })
    }

    const handleRemoveFromCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        removeFromCartMutation.mutate(product._id)
    }

    const isLoading = addToCartMutation.isPending || removeFromCartMutation.isPending

    return (
        <div className="group">
            <Link to={`/products/${product._id}`}>
                <div className="aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category.name}</p>
                    <h3 className="font-medium text-card-foreground group-hover:text-accent transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(product.rating ?? 0) ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`}
                            />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviews ?? 0})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">${product.price}</span>
                        {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>}
                    </div>
                </div>
            </Link>
            <button
                onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
                disabled={isLoading}
                className={`mt-2 w-full py-2 px-4 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                    isInCart
                        ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        : 'bg-accent text-accent-foreground hover:bg-accent/90'
                }`}>
                {isInCart ? (
                    <>
                        <Trash2 className="h-4 w-4" />
                        {removeFromCartMutation.isPending ? 'Removing...' : 'Remove from Cart'}
                    </>
                ) : (
                    <>
                        <ShoppingCart className="h-4 w-4" />
                        {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
                    </>
                )}
            </button>
        </div>
    )
}
