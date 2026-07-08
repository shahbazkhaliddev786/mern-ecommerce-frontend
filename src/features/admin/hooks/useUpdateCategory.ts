import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { categoryService } from '../services/category.service'
import type { CategoryFormData } from '../schemas/category.schema'

interface UpdateCategoryArgs {
    id: string
    values: CategoryFormData
}

export function useUpdateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, values }: UpdateCategoryArgs) => categoryService.update(id, values),
        onSuccess: (response) => {
            toast.success(response.message || 'Category updated successfully')
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}
