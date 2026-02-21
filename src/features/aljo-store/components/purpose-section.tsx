import { Button } from '@/shared/components/ui/button'
import { Link } from 'react-router-dom'

export default function PurposeSection() {
    return (
        <section className="bg-primary text-primary-foreground py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Crafted with Purpose</h2>
                <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-lg">
                    Every piece in our collection is thoughtfully designed with quality materials and sustainable practices.
                </p>
                <Button asChild variant="secondary" size="lg" className="px-8">
                    <Link to="/about">Our Story</Link>
                </Button>
            </div>
        </section>
    )
}
