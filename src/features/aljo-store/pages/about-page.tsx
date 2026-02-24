import MissionSection from '@/features/aljo-store/components/mission-section'
import StatsSection from '@/features/aljo-store/components/stats-section'
import ValueSection from '@/features/aljo-store/components/value-section'
import AboutSection from '@/features/aljo-store/components/about-section'

export default function AboutPage() {
    return (
        <section>
            {/* Hero */}
            <AboutSection />

            {/* Values */}
            <ValueSection />

            {/* Stats */}
            <StatsSection />

            {/* Mission */}
            <MissionSection />
        </section>
    )
}
