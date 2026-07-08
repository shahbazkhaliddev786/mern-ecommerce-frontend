import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminProductService } from '../services/product.service'
import type { ProductFormData } from '../schemas/product.schema'

interface CreateProductArgs {
    values: ProductFormData
    images: File[]
}

export function useCreateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ values, images }: CreateProductArgs) => adminProductService.create(values, images),
        onSuccess: (response) => {
            toast.success(response.message || 'Product created successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-products'] })
        }
    })
}
