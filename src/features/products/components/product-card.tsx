import { Link } from 'react-router'
import { Star } from 'lucide-react'
import type { Product } from '../components/data/products'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link to={`/products/${product.id}`} className="group">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                <h3 className="font-medium text-card-foreground group-hover:text-accent transition-colors">{product.name}</h3>
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`}
                        />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">${product.price}</span>
                    {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>}
                </div>
            </div>
        </Link>
    )
}
