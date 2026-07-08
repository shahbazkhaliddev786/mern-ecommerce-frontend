import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { brandService } from '../services/brand.service'

export function useDeleteBrand() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => brandService.remove(id),
        onSuccess: (response) => {
            toast.success(response.message || 'Brand deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['brands'] })
        }
    })
}
