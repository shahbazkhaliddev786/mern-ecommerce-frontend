import PageLayout from '@/shared/layouts/page-layout'
import MissionSection from '../components/mission-section'
import StatsSection from '../components/stats-section'
import ValueSection from '../components/value-section'
import AboutSection from '../components/about-section'

export default function AboutPage() {
    return (
        <PageLayout>
            {/* Hero */}
            <AboutSection />

            {/* Values */}
            <ValueSection />

            {/* Stats */}
            <StatsSection />

            {/* Mission */}
            <MissionSection />
        </PageLayout>
    )
}
