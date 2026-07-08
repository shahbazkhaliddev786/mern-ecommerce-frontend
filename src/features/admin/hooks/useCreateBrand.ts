import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { brandService } from '../services/brand.service'
import type { BrandFormData } from '../schemas/brand.schema'

export function useCreateBrand() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (values: BrandFormData) => brandService.create(values),
        onSuccess: (response) => {
            toast.success(response.message || 'Brand created successfully')
            queryClient.invalidateQueries({ queryKey: ['brands'] })
        }
    })
}
