import HeroCarousel from '@/features/aljo-store/components/hero-carousel'
import FeaturedProducts from '@/features/aljo-store/components/featured-products'
import NewArrivals from '@/features/aljo-store/components/new-arrivals'
import PurposeSection from '@/features/aljo-store/components/purpose-section'

export default function HomePage() {
    return (
        <section>
            <HeroCarousel />
            {/* Featured Products */}
            <FeaturedProducts />
            {/* Purpose */}
            <PurposeSection />
            {/* New Arrivals */}
            <NewArrivals />
        </section>
    )
}
