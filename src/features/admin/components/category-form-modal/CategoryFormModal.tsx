import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AdminModal } from '../modal/AdminModal'
import { useCreateCategory } from '../../hooks/useCreateCategory'
import { useUpdateCategory } from '../../hooks/useUpdateCategory'
import { categorySchema, type CategoryFormData } from '../../schemas/category.schema'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import type { Category } from '@/features/products/types'

interface CategoryFormModalProps {
    isOpen: boolean
    onClose: () => void
    /** Presence switches the modal into edit mode. */
    category?: Category | null
}

interface ApiErrorData {
    message?: string
}

const EMPTY_VALUES: CategoryFormData = { name: '' }

function getDefaultValues(category?: Category | null): CategoryFormData {
    return category ? { name: category.name } : EMPTY_VALUES
}

function getErrorData(error: unknown): ApiErrorData | undefined {
    if (typeof error !== 'object' || error === null || !('data' in error)) return undefined
    const data = (error as { data?: unknown }).data
    return typeof data === 'object' && data !== null ? (data as ApiErrorData) : undefined
}

export function CategoryFormModal({ isOpen, onClose, category }: CategoryFormModalProps) {
    const isEditMode = Boolean(category)

    const { mutate: createCategory, isPending: isCreating } = useCreateCategory()
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory()
    const isPending = isCreating || isUpdating

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: getDefaultValues(category)
    })

    // Sync the form to the selected category (or blank) whenever the modal opens.
    useEffect(() => {
        if (isOpen) {
            reset(getDefaultValues(category))
        }
    }, [isOpen, category, reset])

    const handleClose = () => {
        reset(EMPTY_VALUES)
        onClose()
    }

    const onError = (error: unknown) => {
        const errorData = getErrorData(error)
        const fallback = error instanceof Error ? error.message : 'Something went wrong'
        toast.error(errorData?.message || fallback)
    }

    const onSubmit = (values: CategoryFormData) => {
        if (isPending) return

        if (isEditMode && category) {
            updateCategory({ id: category._id, values }, { onSuccess: handleClose, onError })
        } else {
            createCategory(values, { onSuccess: handleClose, onError })
        }
    }

    return (
        <AdminModal isOpen={isOpen} onClose={handleClose} title={isEditMode ? 'Update Category' : 'Create Category'} maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="category-name" className="text-sm font-semibold text-foreground">
                        Name
                    </Label>
                    <Input
                        id="category-name"
                        placeholder="Accessories"
                        aria-invalid={!!errors.name}
                        disabled={isPending}
                        className="h-11 rounded-xl bg-background"
                        {...register('name')}
                    />
                    {errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline" className="rounded-xl" onClick={handleClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {isEditMode ? 'Saving...' : 'Creating...'}
                            </>
                        ) : isEditMode ? (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                Create Category
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </AdminModal>
    )
}
