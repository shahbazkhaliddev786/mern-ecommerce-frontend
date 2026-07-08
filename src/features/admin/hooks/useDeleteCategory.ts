import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { categoryService } from '../services/category.service'

export function useDeleteCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => categoryService.remove(id),
        onSuccess: (response) => {
            toast.success(response.message || 'Category deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}
