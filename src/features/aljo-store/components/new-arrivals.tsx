import { products } from '@/features/products/components/data/products'
import ProductCard from '@/features/products/components/product-card'

export default function NewArrivals() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-10">
                <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">Just Landed</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.slice(4, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
