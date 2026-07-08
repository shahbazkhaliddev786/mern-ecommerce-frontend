import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/product.service'

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getAll()
    })
}
