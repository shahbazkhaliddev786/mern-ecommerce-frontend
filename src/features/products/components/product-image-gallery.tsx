import { useState } from 'react'

interface ProductImageGalleryProps {
    images: string[]
    productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="aspect-square w-full overflow-hidden rounded-[2.5rem] border border-border bg-muted/20 shadow-sm">
                <img
                    key={activeIndex}
                    src={images[activeIndex]}
                    alt={`${productName} — image ${activeIndex + 1}`}
                    className="h-full w-full object-cover transition-all duration-500 ease-in-out animate-in fade-in zoom-in-95"
                />
            </div>

            {/* Thumbnail Strip — hidden when only 1 image */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`
                relative flex-shrink-0 h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all duration-300
                hover:scale-105 hover:shadow-md focus:outline-none
                ${
                    activeIndex === index
                        ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'border-border opacity-60 hover:opacity-100'
                }
              `}
                            aria-label={`View image ${index + 1}`}>
                            <img src={src} alt={`${productName} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
