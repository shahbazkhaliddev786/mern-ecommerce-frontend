import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { adminProductService } from '../services/product.service'

export function useDeleteProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => adminProductService.remove(id),
        onSuccess: (response) => {
            toast.success(response.message || 'Product deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-products'] })
        }
    })
}
