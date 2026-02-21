import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Button } from '@/shared/components/ui/button'
import hero1 from '@/shared/assets/images/hero-1.jpg'
import hero2 from '@/shared/assets/images/hero-1.jpg'
import hero3 from '@/shared/assets/images/hero-1.jpg'

const slides = [
    {
        image: hero1,
        title: 'New Season Collection',
        subtitle: 'Discover timeless pieces crafted for modern living',
        cta: 'Shop Now',
        link: '/products'
    },
    {
        image: hero2,
        title: 'Luxury Accessories',
        subtitle: 'Elevate your everyday with curated essentials',
        cta: 'Explore',
        link: '/products'
    },
    {
        image: hero3,
        title: 'Summer Arrivals',
        subtitle: 'Fresh styles for the warmer days ahead',
        cta: 'Discover',
        link: '/products'
    }
]

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/40" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                            <div className="max-w-lg">
                                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 animate-fade-in">
                                    {slide.title}
                                </h1>
                                <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 animate-slide-up">{slide.subtitle}</p>
                                <Button asChild variant="secondary" size="lg" className="text-base px-8 animate-slide-up">
                                    <Link to={slide.link}>{slide.cta}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === current ? 'bg-primary-foreground w-8' : 'bg-primary-foreground/50 w-2'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}
