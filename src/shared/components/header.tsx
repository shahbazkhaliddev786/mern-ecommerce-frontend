import { Link } from 'react-router'
import { ShoppingBag, Search, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/shared/components/ui/sheet'
import { Button } from './ui/button'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
]

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="font-display text-2xl font-bold tracking-tight">
                    Aljo Store
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/profile" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                        <Button variant="ghost" size="sm" className="text-base px-4">
                            Sign up
                        </Button>
                    </Link>
                    <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Search className="h-5 w-5" />
                    </Link>

                    <Link to="/cart" className="relative text-muted-foreground hover:text-foreground transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            3
                        </span>
                    </Link>

                    <Sheet>
                        <SheetTrigger className="md:hidden text-muted-foreground hover:text-foreground">
                            <Menu className="h-5 w-5" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 text-center">
                            <div className="mt-8 flex flex-col gap-1">
                                <p className="font-display text-xl font-bold mb-6">Aljo Store</p>
                                {navLinks.map((link) => (
                                    <SheetClose key={link.to} asChild>
                                        <Link
                                            to={link.to}
                                            className="py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                                <div className="border-t border-gray-500 my-4" />
                                <SheetClose asChild>
                                    <Link to="/login" className="py-3 text-lg font-medium text-muted-foreground hover:text-foreground">
                                        Login
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link to="/signup" className="py-3 text-lg font-medium text-muted-foreground hover:text-foreground">
                                        Sign Up
                                    </Link>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
