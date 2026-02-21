export interface Product {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    description: string
    rating: number
    reviews: number
    sizes?: string[]
    colors?: string[]
    inStock: boolean
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Classic Leather Tote',
        price: 189,
        originalPrice: 249,
        image: '/images/product-1.jpg',
        category: 'Bags',
        description:
            'Handcrafted from premium full-grain leather, this timeless tote combines elegance with everyday functionality. Features multiple interior pockets and a magnetic snap closure.',
        rating: 4.8,
        reviews: 124,
        sizes: ['S', 'M', 'L'],
        colors: ['Brown', 'Black', 'Tan'],
        inStock: true
    },
    {
        id: 2,
        name: 'Minimalist Watch',
        price: 249,
        image: '/images/product-2.jpg',
        category: 'Accessories',
        description:
            'A refined timepiece with a clean dial and genuine leather strap. Swiss quartz movement ensures precision. Water-resistant up to 50 meters.',
        rating: 4.9,
        reviews: 89,
        colors: ['Silver', 'Gold', 'Rose Gold'],
        inStock: true
    },
    {
        id: 3,
        name: 'Urban Sneakers',
        price: 129,
        originalPrice: 159,
        image: '/images/product-3.jpg',
        category: 'Footwear',
        description:
            'Versatile low-top sneakers crafted with premium materials. Cushioned insole for all-day comfort. Perfect for casual and semi-formal occasions.',
        rating: 4.7,
        reviews: 256,
        sizes: ['38', '39', '40', '41', '42', '43', '44'],
        colors: ['White', 'Black', 'Navy'],
        inStock: true
    },
    {
        id: 4,
        name: 'Wool Blend Coat',
        price: 349,
        image: '/images/product-4.jpg',
        category: 'Clothing',
        description:
            'Luxuriously warm wool blend coat with a tailored silhouette. Features a notch lapel, two-button closure, and fully lined interior.',
        rating: 4.6,
        reviews: 67,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Camel', 'Charcoal', 'Navy'],
        inStock: true
    },
    {
        id: 5,
        name: 'Silk Blend Scarf',
        price: 79,
        image: '/images/product-1.jpg',
        category: 'Accessories',
        description: 'Delicately woven silk blend scarf with subtle patterns. Lightweight yet warm, perfect for transitional seasons.',
        rating: 4.5,
        reviews: 43,
        colors: ['Cream', 'Dusty Rose', 'Sage'],
        inStock: true
    },
    {
        id: 6,
        name: 'Canvas Backpack',
        price: 119,
        originalPrice: 149,
        image: '/images/product-2.jpg',
        category: 'Bags',
        description:
            'Durable waxed canvas backpack with leather accents. Padded laptop compartment fits up to 15 inches. Ideal for daily commute or weekend trips.',
        rating: 4.7,
        reviews: 178,
        colors: ['Olive', 'Navy', 'Black'],
        inStock: true
    },
    {
        id: 7,
        name: 'Leather Chelsea Boots',
        price: 219,
        image: '/images/product-3.jpg',
        category: 'Footwear',
        description:
            'Classic Chelsea boots crafted from supple calfskin leather. Pull-on style with elastic side panels. Goodyear welted sole for durability.',
        rating: 4.8,
        reviews: 92,
        sizes: ['39', '40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'Brown'],
        inStock: true
    },
    {
        id: 8,
        name: 'Cashmere Sweater',
        price: 199,
        image: '/images/product-4.jpg',
        category: 'Clothing',
        description: 'Ultra-soft pure cashmere crew neck sweater. Relaxed fit with ribbed cuffs and hem. A wardrobe essential for cooler months.',
        rating: 4.9,
        reviews: 156,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Oatmeal', 'Charcoal', 'Navy', 'Burgundy'],
        inStock: false
    }
]

export const categories = ['All', 'Clothing', 'Accessories', 'Bags', 'Footwear']
