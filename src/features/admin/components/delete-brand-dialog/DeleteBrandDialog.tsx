import { Loader2, Trash2 } from 'lucide-react'
import { AdminModal } from '../modal/AdminModal'
import { useDeleteBrand } from '../../hooks/useDeleteBrand'
import { Button } from '@/shared/components/ui/button'
import type { Brand } from '@/features/products/types'

interface DeleteBrandDialogProps {
    isOpen: boolean
    onClose: () => void
    brand: Brand | null
}

export function DeleteBrandDialog({ isOpen, onClose, brand }: DeleteBrandDialogProps) {
    const { mutate: deleteBrand, isPending } = useDeleteBrand()

    const handleConfirm = () => {
        if (!brand || isPending) return
        deleteBrand(brand._id, { onSuccess: onClose })
    }

    return (
        <AdminModal isOpen={isOpen} onClose={onClose} title="Delete Brand" maxWidth="md">
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to permanently delete <span className="font-semibold text-foreground">{brand?.name}</span>? This action
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
                                Delete Brand
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AdminModal>
    )
}
