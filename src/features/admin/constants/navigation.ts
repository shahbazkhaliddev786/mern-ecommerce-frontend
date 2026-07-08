import { LayoutDashboard, Package, Tags, Copyright, ShoppingCart, ShoppingBasket, Users } from 'lucide-react'

export const ADMIN_NAVIGATION = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Brands', href: '/admin/brands', icon: Copyright },
    { name: 'Carts', href: '/admin/carts', icon: ShoppingBasket },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users }
]
