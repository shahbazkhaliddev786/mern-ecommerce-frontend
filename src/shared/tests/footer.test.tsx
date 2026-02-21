import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Footer from '../components/footer'

describe('Footer Component', () => {
    const renderFooter = () =>
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        )

    it('renders the brand name and description correctly', () => {
        renderFooter()
        expect(screen.getByText('Aljo Store')).toBeInTheDocument()
        expect(screen.getByText(/Curating timeless pieces crafted for modern living/i)).toBeInTheDocument()
    })

    it('renders all section headings', () => {
        renderFooter()
        expect(screen.getByText('Shop')).toBeInTheDocument()
        expect(screen.getByText('Company')).toBeInTheDocument()
        expect(screen.getByText('Customer Care')).toBeInTheDocument()
    })

    it('renders correct number of navigation links in each section', () => {
        renderFooter()

        const allLinks = screen.getAllByRole('link')

        // You have 3 sections with links → 3 × 4 = 12
        expect(allLinks).toHaveLength(12)

        // More precise checks (recommended – survives if you add/remove links later)
        expect(screen.getAllByRole('link', { name: /All Products|New Arrivals|Best Sellers|Sale/i })).toHaveLength(4)

        expect(screen.getAllByRole('link', { name: /About Us|Sustainability|Careers|Press/i })).toHaveLength(4)

        expect(screen.getAllByRole('link', { name: /Contact Us|Shipping & Returns|FAQ|Size Guide/i })).toHaveLength(4)
    })

    it('renders the copyright notice with current year', () => {
        renderFooter()
        expect(screen.getByText(/© 2026 Aljo Store\. All rights reserved\./i)).toBeInTheDocument()
    })

    it('matches snapshot', () => {
        const { container } = renderFooter()
        expect(container).toMatchSnapshot()
    })
})
