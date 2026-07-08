import { useParams, Link } from 'react-router-dom'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { useProduct } from '../hooks/useProduct'
import { ProductImageGallery } from '../components/product-image-gallery'
import { ProductInfo } from '../components/product-info'
import { RelatedProducts } from '../components/related-products'
import { Button } from '@/shared/components/ui/button'

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, isError, error } = useProduct(id ?? '')

    if (!id) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
                <div className="flex flex-col items-center justify-center gap-6 rounded-[2.5rem] border border-destructive/20 bg-destructive/5 p-16 text-center">
                    <AlertCircle className="h-16 w-16 text-destructive" />
                    <div>
                        <h2 className="text-2xl font-bold text-destructive">Invalid Product</h2>
                        <p className="mt-2 text-muted-foreground">No product ID was provided.</p>
                    </div>
                    <Button asChild variant="outline">
                        <Link to="/products" className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>
                </div>
            </section>
        )
    }

    if (isLoading) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
                <div className="flex h-[60vh] items-center justify-center rounded-[2.5rem] border border-border bg-card">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </section>
        )
    }

    if (isError) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
                <div className="flex flex-col items-center justify-center gap-6 rounded-[2.5rem] border border-destructive/20 bg-destructive/5 p-16 text-center">
                    <AlertCircle className="h-16 w-16 text-destructive" />
                    <div>
                        <h2 className="text-2xl font-bold text-destructive">Product Not Found</h2>
                        <p className="mt-2 text-muted-foreground">
                            {error?.message || 'This product could not be loaded. It may have been removed.'}
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link to="/products" className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>
                </div>
            </section>
        )
    }

    if (!data?.data) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
                <div className="flex h-[60vh] items-center justify-center rounded-[2.5rem] border border-border bg-card">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            </section>
        )
    }

    const product = data.data

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">
            {/* Back Link */}
            <div className="mb-8">
                <Button asChild variant="ghost" className="pl-0 hover:bg-transparent">
                    <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Link>
                </Button>
            </div>

            {/* Main Product Layout */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
                {/* Left: Image Gallery */}
                <ProductImageGallery images={product.images} productName={product.name} />

                {/* Right: Product Info */}
                <div className="lg:sticky lg:top-24">
                    <ProductInfo product={product} />
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts currentProduct={product} />
        </section>
    )
}
