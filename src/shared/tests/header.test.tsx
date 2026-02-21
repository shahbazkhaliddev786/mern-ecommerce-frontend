import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import Header from '../components/header'

describe('Header Component', () => {
    const renderHeader = () =>
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header />
            </MemoryRouter>
        )

    it('renders the brand name as a link to home', () => {
        renderHeader()
        const brandLink = screen.getByRole('link', { name: /Aljo Store/i })
        expect(brandLink).toBeInTheDocument()
        expect(brandLink).toHaveAttribute('href', '/')
    })

    it('renders desktop navigation links', () => {
        renderHeader()
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    })

    it('renders action icons (search + cart with badge)', () => {
        renderHeader()
        const cartLink = screen.getByRole('link', { name: /3/i })
        expect(cartLink).toBeInTheDocument()
        expect(cartLink).toHaveAttribute('href', '/cart')
        expect(screen.getByText('3')).toBeInTheDocument()

        // Search link (brittle without aria-label)
        expect(screen.getByRole('link', { name: '' })).toBeInTheDocument()
    })

    it('renders sign up button on desktop', () => {
        renderHeader()
        expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument()
    })

    it('renders mobile menu trigger (hamburger icon)', () => {
        renderHeader()
        expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()
    })

    it('opens mobile menu and shows navigation links + auth options', async () => {
        const user = userEvent.setup()
        renderHeader()

        const menuButton = screen.getByRole('button', { name: '' })
        await user.click(menuButton)

        // Wait for mobile menu to appear
        await waitFor(
            () => {
                // There are now TWO "Aljo Store" texts → we check there are at least 2
                const titles = screen.getAllByText('Aljo Store')
                expect(titles).toHaveLength(2) // desktop + mobile menu
            },
            { timeout: 1500 }
        )

        // Navigation links appear in mobile menu
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()

        // Auth links
        expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument()
    })

    it('matches snapshot', () => {
        const { container } = renderHeader()
        expect(container).toMatchSnapshot()
    })
})
