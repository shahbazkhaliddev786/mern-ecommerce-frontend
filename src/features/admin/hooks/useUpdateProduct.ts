import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminProductService } from '../services/product.service'
import type { ProductFormData } from '../schemas/product.schema'

interface UpdateProductArgs {
    id: string
    values: Partial<ProductFormData>
    images: File[]
}

export function useUpdateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, values, images }: UpdateProductArgs) => adminProductService.update(id, values, images),
        onSuccess: (response) => {
            toast.success(response.message || 'Product updated successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-products'] })
        }
    })
}
