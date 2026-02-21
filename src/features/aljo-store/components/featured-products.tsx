import ProductCard from '@/features/products/components/product-card'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '@/features/products/components/data/products'

const featuredProducts = products.slice(0, 4)

export default function FeaturedProducts() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <p className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">Curated for you</p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Products</h2>
                </div>
                <Button asChild variant="ghost" className="hidden sm:flex items-center gap-2">
                    <Link to="/products">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
                <Button asChild variant="outline">
                    <Link to="/products">View All Products</Link>
                </Button>
            </div>
        </section>
    )
}
