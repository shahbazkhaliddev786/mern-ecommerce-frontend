import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AdminModal } from '../modal/AdminModal'
import { useCreateBrand } from '../../hooks/useCreateBrand'
import { useUpdateBrand } from '../../hooks/useUpdateBrand'
import { brandSchema, type BrandFormData } from '../../schemas/brand.schema'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import type { Brand } from '@/features/products/types'

interface BrandFormModalProps {
    isOpen: boolean
    onClose: () => void
    /** Presence switches the modal into edit mode. */
    brand?: Brand | null
}

interface ApiErrorData {
    message?: string
}

const EMPTY_VALUES: BrandFormData = { name: '' }

function getDefaultValues(brand?: Brand | null): BrandFormData {
    return brand ? { name: brand.name } : EMPTY_VALUES
}

function getErrorData(error: unknown): ApiErrorData | undefined {
    if (typeof error !== 'object' || error === null || !('data' in error)) return undefined
    const data = (error as { data?: unknown }).data
    return typeof data === 'object' && data !== null ? (data as ApiErrorData) : undefined
}

export function BrandFormModal({ isOpen, onClose, brand }: BrandFormModalProps) {
    const isEditMode = Boolean(brand)

    const { mutate: createBrand, isPending: isCreating } = useCreateBrand()
    const { mutate: updateBrand, isPending: isUpdating } = useUpdateBrand()
    const isPending = isCreating || isUpdating

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: getDefaultValues(brand)
    })

    // Sync the form to the selected brand (or blank) whenever the modal opens.
    useEffect(() => {
        if (isOpen) {
            reset(getDefaultValues(brand))
        }
    }, [isOpen, brand, reset])

    const handleClose = () => {
        reset(EMPTY_VALUES)
        onClose()
    }

    const onError = (error: unknown) => {
        const errorData = getErrorData(error)
        const fallback = error instanceof Error ? error.message : 'Something went wrong'
        toast.error(errorData?.message || fallback)
    }

    const onSubmit = (values: BrandFormData) => {
        if (isPending) return

        if (isEditMode && brand) {
            updateBrand({ id: brand._id, values }, { onSuccess: handleClose, onError })
        } else {
            createBrand(values, { onSuccess: handleClose, onError })
        }
    }

    return (
        <AdminModal isOpen={isOpen} onClose={handleClose} title={isEditMode ? 'Update Brand' : 'Create Brand'} maxWidth="md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="brand-name" className="text-sm font-semibold text-foreground">
                        Name
                    </Label>
                    <Input
                        id="brand-name"
                        placeholder="Nike"
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
                                Create Brand
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </AdminModal>
    )
}
