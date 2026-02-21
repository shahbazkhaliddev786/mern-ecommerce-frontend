import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <h3 className="font-display text-xl font-bold mb-4">Aljo Store</h3>
                        <p className="text-primary-foreground/70 text-sm leading-relaxed">
                            Curating timeless pieces crafted for modern living. Quality, sustainability, and style in every detail.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
                        <ul className="space-y-3 text-sm text-primary-foreground/70">
                            <li>
                                <Link to="/products" className="hover:text-primary-foreground transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-primary-foreground transition-colors">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-primary-foreground transition-colors">
                                    Best Sellers
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-primary-foreground transition-colors">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3 text-sm text-primary-foreground/70">
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Customer Care</h4>
                        <ul className="space-y-3 text-sm text-primary-foreground/70">
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                                    Size Guide
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
                    © 2026 Aljo Store. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
