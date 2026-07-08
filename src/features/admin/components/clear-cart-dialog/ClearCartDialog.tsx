import { Loader2, Trash2 } from 'lucide-react'
import { AdminModal } from '../modal/AdminModal'
import { useClearAdminCart } from '../../hooks/useClearAdminCart'
import { Button } from '@/shared/components/ui/button'
import type { AdminCartUser } from '../../types/cart.types'

interface ClearCartDialogProps {
    isOpen: boolean
    onClose: () => void
    user: AdminCartUser | null
    onCleared?: () => void
}

export function ClearCartDialog({ isOpen, onClose, user, onCleared }: ClearCartDialogProps) {
    const { mutate: clearCart, isPending } = useClearAdminCart()

    const handleConfirm = () => {
        if (!user || isPending) return
        clearCart(user._id, {
            onSuccess: () => {
                onClose()
                onCleared?.()
            }
        })
    }

    return (
        <AdminModal isOpen={isOpen} onClose={onClose} title="Clear Cart" maxWidth="md">
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to remove all items from <span className="font-semibold text-foreground">{user?.name}</span>'s cart? This
                    action cannot be undone.
                </p>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline" className="rounded-xl" onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" className="rounded-xl" onClick={handleConfirm} disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Clearing...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                Clear Cart
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AdminModal>
    )
}
