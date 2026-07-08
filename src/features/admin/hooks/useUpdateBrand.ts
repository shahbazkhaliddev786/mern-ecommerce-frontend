import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { brandService } from '../services/brand.service'
import type { BrandFormData } from '../schemas/brand.schema'

interface UpdateBrandArgs {
    id: string
    values: BrandFormData
}

export function useUpdateBrand() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, values }: UpdateBrandArgs) => brandService.update(id, values),
        onSuccess: (response) => {
            toast.success(response.message || 'Brand updated successfully')
            queryClient.invalidateQueries({ queryKey: ['brands'] })
        }
    })
}
