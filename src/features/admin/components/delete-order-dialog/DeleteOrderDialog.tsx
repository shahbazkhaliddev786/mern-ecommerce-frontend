import { Loader2, Trash2 } from 'lucide-react'
import { AdminModal } from '../modal/AdminModal'
import { useDeleteOrder } from '../../hooks/useDeleteOrder'
import { Button } from '@/shared/components/ui/button'

interface DeleteOrderDialogProps {
    isOpen: boolean
    onClose: () => void
    orderId: string | null
    onDeleted?: () => void
}

export function DeleteOrderDialog({ isOpen, onClose, orderId, onDeleted }: DeleteOrderDialogProps) {
    const { mutate: deleteOrder, isPending } = useDeleteOrder()

    const handleConfirm = () => {
        if (!orderId || isPending) return
        deleteOrder(orderId, {
            onSuccess: () => {
                onClose()
                onDeleted?.()
            }
        })
    }

    return (
        <AdminModal isOpen={isOpen} onClose={onClose} title="Delete Order" maxWidth="md">
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Are you sure you want to permanently delete this order? This action cannot be undone.</p>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline" className="rounded-xl" onClick={onClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" className="rounded-xl" onClick={handleConfirm} disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                Delete Order
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AdminModal>
    )
}
