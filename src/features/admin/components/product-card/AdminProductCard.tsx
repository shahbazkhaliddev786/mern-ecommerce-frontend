import { ImageOff, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { Product } from '@/features/products/types'

interface AdminProductCardProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

export function AdminProductCard({ product, onEdit, onDelete }: AdminProductCardProps) {
    const image = product.images?.[0]
    const isOutOfStock = product.stock <= 0

    return (
        <div className="flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            <div className="relative aspect-square overflow-hidden bg-muted">
                {image ? (
                    <img
                        src={image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                        <ImageOff className="h-10 w-10" />
                    </div>
                )}
                <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                        isOutOfStock ? 'bg-destructive text-destructive-foreground' : 'bg-background/90 text-foreground'
                    }`}>
                    {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {product.category?.name}
                        {product.brand?.name ? ` · ${product.brand.name}` : ''}
                    </p>
                    <h3 className="line-clamp-1 font-semibold text-foreground" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-foreground">${product.price}</span>
                </div>

                <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" className="flex-1 rounded-xl" onClick={() => onEdit(product)}>
                        <Pencil className="h-4 w-4" />
                        Update
                    </Button>
                    <Button type="button" variant="destructive" size="sm" className="flex-1 rounded-xl" onClick={() => onDelete(product)}>
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}
