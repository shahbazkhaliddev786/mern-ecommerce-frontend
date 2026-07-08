import { Loader2, Trash2 } from 'lucide-react'
import { AdminModal } from '../modal/AdminModal'
import { useDeleteProduct } from '../../hooks/useDeleteProduct'
import { Button } from '@/shared/components/ui/button'
import type { Product } from '@/features/products/types'

interface DeleteProductDialogProps {
    isOpen: boolean
    onClose: () => void
    product: Product | null
}

export function DeleteProductDialog({ isOpen, onClose, product }: DeleteProductDialogProps) {
    const { mutate: deleteProduct, isPending } = useDeleteProduct()

    const handleConfirm = () => {
        if (!product || isPending) return
        deleteProduct(product._id, { onSuccess: onClose })
    }

    return (
        <AdminModal isOpen={isOpen} onClose={onClose} title="Delete Product" maxWidth="md">
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to permanently delete <span className="font-semibold text-foreground">{product?.name}</span>? This action
                    cannot be undone.
                </p>

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
                                Delete Product
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AdminModal>
    )
}
