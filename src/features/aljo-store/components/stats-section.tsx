const stats = [
    { number: '50+', label: 'Artisan Partners' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '200+', label: 'Products' },
    { number: '15', label: 'Countries Shipped' }
]

export default function StatsSection() {
    return (
        <section className="bg-primary text-primary-foreground py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <p className="font-display text-3xl md:text-4xl font-bold text-accent">{stat.number}</p>
                            <p className="text-primary-foreground/70 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
