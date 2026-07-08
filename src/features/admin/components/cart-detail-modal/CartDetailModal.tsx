import { useState } from 'react'
import { ImageOff, Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { AdminModal } from '../modal/AdminModal'
import { ClearCartDialog } from '../clear-cart-dialog/ClearCartDialog'
import { useAdminCart } from '../../hooks/useAdminCart'
import { useUpdateCartItemQuantity } from '../../hooks/useUpdateCartItemQuantity'
import { useRemoveCartItem } from '../../hooks/useRemoveCartItem'
import { Button } from '@/shared/components/ui/button'
import type { AdminCartItem } from '../../types/cart.types'

interface CartDetailModalProps {
    isOpen: boolean
    onClose: () => void
    userId: string | null
}

function CartItemRow({ item, userId }: { item: AdminCartItem; userId: string }) {
    const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItemQuantity()
    const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem()

    const isPending = isUpdating || isRemoving
    const product = item.product
    const image = product?.images?.[0]
    const lineTotal = (product?.price ?? 0) * item.quantity

    const canDecrement = item.quantity > 1
    const canIncrement = item.quantity < (product?.stock ?? 0)

    const handleQuantityChange = (nextQuantity: number) => {
        if (nextQuantity < 1 || nextQuantity > (product?.stock ?? 0)) return
        updateQuantity({ userId, productId: product._id, quantity: nextQuantity })
    }

    return (
        <tr className="border-b border-border last:border-0">
            <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {image ? (
                            <img src={image} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                                <ImageOff className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                    <span className="font-medium text-foreground">{product?.name ?? 'Unknown product'}</span>
                </div>
            </td>
            <td className="py-3 pr-4 text-muted-foreground">${product?.price ?? 0}</td>
            <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={!canDecrement || isPending}
                        className="rounded-md border border-border p-1 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Decrease quantity">
                        <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-foreground">{item.quantity}</span>
                    <button
                        type="button"
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        disabled={!canIncrement || isPending}
                        className="rounded-md border border-border p-1 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Increase quantity">
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                </div>
            </td>
            <td className="py-3 pr-4 font-medium text-foreground">${lineTotal.toFixed(2)}</td>
            <td className="py-3">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={isPending}
                    onClick={() => removeItem({ userId, productId: product._id })}
                    aria-label="Remove item">
                    {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
            </td>
        </tr>
    )
}

export function CartDetailModal({ isOpen, onClose, userId }: CartDetailModalProps) {
    const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
    const { data, isLoading } = useAdminCart(userId)
    const cart = data?.data

    return (
        <>
            <AdminModal isOpen={isOpen} onClose={onClose} title={cart ? `Cart — ${cart.user.name}` : 'Cart'} maxWidth="2xl">
                {isLoading ? (
                    <div className="flex min-h-[200px] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : !cart || cart.items.length === 0 ? (
                    <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                        <p className="font-semibold text-foreground">This cart is empty</p>
                        <p className="mt-1 text-sm text-muted-foreground">There are no items to manage here.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <p className="text-sm text-muted-foreground">{cart.user.email}</p>

                        <div className="overflow-x-auto">
                            <table className="w-full whitespace-nowrap text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border text-muted-foreground">
                                        <th className="pb-2 pr-4 font-semibold">Product</th>
                                        <th className="pb-2 pr-4 font-semibold">Price</th>
                                        <th className="pb-2 pr-4 font-semibold">Quantity</th>
                                        <th className="pb-2 pr-4 font-semibold">Total</th>
                                        <th className="pb-2 font-semibold" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item) => (
                                        <CartItemRow key={item._id} item={item} userId={cart.user._id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-4">
                            <Button type="button" variant="outline" className="rounded-xl" onClick={() => setIsClearDialogOpen(true)}>
                                <Trash2 className="h-4 w-4" />
                                Clear Cart
                            </Button>
                            <p className="text-lg font-bold text-foreground">Subtotal: ${cart.subtotal.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </AdminModal>

            <ClearCartDialog isOpen={isClearDialogOpen} onClose={() => setIsClearDialogOpen(false)} user={cart?.user ?? null} />
        </>
    )
}
