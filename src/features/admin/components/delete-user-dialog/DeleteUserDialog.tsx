import { Loader2, Trash2 } from 'lucide-react'
import { AdminModal } from '../modal/AdminModal'
import { useDeleteUser } from '../../hooks/useDeleteUser'
import { Button } from '@/shared/components/ui/button'
import type { AdminUser } from '../../types/user.types'

interface DeleteUserDialogProps {
    isOpen: boolean
    onClose: () => void
    user: AdminUser | null
}

export function DeleteUserDialog({ isOpen, onClose, user }: DeleteUserDialogProps) {
    const { mutate: deleteUser, isPending } = useDeleteUser()

    const handleConfirm = () => {
        if (!user || isPending) return
        deleteUser(user.id, { onSuccess: onClose })
    }

    return (
        <AdminModal isOpen={isOpen} onClose={onClose} title="Delete User" maxWidth="md">
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to permanently delete <span className="font-semibold text-foreground">{user?.name}</span> (
                    <span className="font-semibold text-foreground">{user?.email}</span>)? This action cannot be undone.
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
                                Delete User
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AdminModal>
    )
}
