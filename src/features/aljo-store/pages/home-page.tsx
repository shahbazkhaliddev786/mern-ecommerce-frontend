import PageLayout from '@/shared/layouts/page-layout'
import HeroCarousel from '@/features/aljo-store/components/hero-carousel'
import FeaturedProducts from '../components/featured-products'
import NewArrivals from '../components/new-arrivals'
import PurposeSection from '../components/purpose-section'

export default function HomePage() {
    return (
        <PageLayout>
            <HeroCarousel />
            {/* Featured Products */}
            <FeaturedProducts />
            {/* Purpose */}
            <PurposeSection />
            {/* New Arrivals */}
            <NewArrivals />
        </PageLayout>
    )
}
