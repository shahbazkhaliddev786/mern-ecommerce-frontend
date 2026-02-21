import { Heart, Leaf, Users } from 'lucide-react'

const values = [
    {
        icon: Heart,
        title: 'Quality First',
        description: 'Every product is crafted with the finest materials and meticulous attention to detail.'
    },
    {
        icon: Leaf,
        title: 'Sustainability',
        description: "We're committed to ethical sourcing and reducing our environmental footprint."
    },
    {
        icon: Users,
        title: 'Community',
        description: 'Building meaningful connections with our customers, artisans, and partners worldwide.'
    }
]

export default function ValueSection() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-3 gap-10">
                {values.map((value) => (
                    <div key={value.title} className="text-center">
                        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                            <value.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
