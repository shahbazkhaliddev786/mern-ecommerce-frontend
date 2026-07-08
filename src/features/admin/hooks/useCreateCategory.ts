import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { categoryService } from '../services/category.service'
import type { CategoryFormData } from '../schemas/category.schema'

export function useCreateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (values: CategoryFormData) => categoryService.create(values),
        onSuccess: (response) => {
            toast.success(response.message || 'Category created successfully')
            queryClient.invalidateQueries({ queryKey: ['categories'] })
        }
    })
}
