import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import PageLayout from '../layouts/page-layout'

describe('PageLayout Component', () => {
    const renderPageLayout = () =>
        render(
            <MemoryRouter initialEntries={['/']}>
                <PageLayout />
            </MemoryRouter>
        )

    it('renders without crashing and includes Header, main, and Footer', () => {
        renderPageLayout()

        // Semantic HTML roles
        expect(screen.getByRole('banner')).toBeInTheDocument() // usually <header>
        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByRole('contentinfo')).toBeInTheDocument() // usually <footer>

        // Confirm Header is mounted (brand link)
        expect(screen.getByRole('link', { name: /Aljo Store/i })).toBeInTheDocument()

        // Confirm Footer is mounted (copyright text)
        expect(screen.getByText(/© 2026 Aljo Store/i)).toBeInTheDocument()
    })

    it('main is empty when rendered standalone (no matching child route)', () => {
        renderPageLayout()

        const main = screen.getByRole('main')
        expect(main).toBeEmptyDOMElement() // Outlet renders nothing by default in isolation
    })

    it('applies correct flex layout classes to root and main', () => {
        const { container } = renderPageLayout()

        const rootDiv = container.firstChild as HTMLElement
        expect(rootDiv).toHaveClass('min-h-screen', 'flex', 'flex-col')

        const mainElement = screen.getByRole('main')
        expect(mainElement).toHaveClass('flex-1')
    })

    it('matches snapshot (standalone)', () => {
        const { container } = renderPageLayout()
        expect(container).toMatchSnapshot()
    })
})
