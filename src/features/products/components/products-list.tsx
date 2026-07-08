import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { fetchProducts } from '../slices/products-slice'
import ProductCard from './product-card'

export default function ProductsList() {
    const dispatch = useAppDispatch()
    const { items: products, isLoading, error: isError } = useAppSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (isLoading) {
        return (
            <div className="bg-white flex justify-center py-24">
                <p className="text-gray-500">Loading products...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-white flex justify-center py-24">
                <p className="text-red-500">Error loading products.</p>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.length === 0 ? (
                        <div className="col-span-full py-10 text-center text-gray-500">No products available.</div>
                    ) : (
                        products.map((product) => <ProductCard key={product._id} product={product} />)
                    )}
                </div>
            </div>
        </div>
    )
}
