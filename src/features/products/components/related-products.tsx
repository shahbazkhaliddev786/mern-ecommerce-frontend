import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { fetchProducts } from '../slices/products-slice'
import ProductCard from './product-card'
import type { Product } from '../types'

interface RelatedProductsProps {
    currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
    const dispatch = useAppDispatch()
    const { items: allProducts, isLoading } = useAppSelector((state) => state.products)

    // Fetch products if Redux store is empty (e.g. user landed directly on product detail page)
    useEffect(() => {
        if (allProducts.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, allProducts.length])

    if (isLoading || allProducts.length === 0) return null

    // Prefer same category, fallback to any other products
    const sameCategory = allProducts.filter((p) => p._id !== currentProduct._id && p.category._id === currentProduct.category._id)

    const related = sameCategory.length >= 1 ? sameCategory.slice(0, 4) : allProducts.filter((p) => p._id !== currentProduct._id).slice(0, 4)

    if (related.length === 0) return null

    return (
        <section className="mt-20">
            {/* Section Heading */}
            <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{currentProduct.category.name}</p>
                <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">You Might Also Like</h2>
            </div>

            {/* Grid — reuses existing ProductCard */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {related.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    )
}
