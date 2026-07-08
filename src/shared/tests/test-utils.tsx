import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import productsReducer from '@/features/products/slices/products-slice'
import authReducer from '@/features/authentication/slices/auth-slice'

export function renderWithProviders(ui: ReactElement, { initialEntries = ['/'] }: { initialEntries?: string[] } = {}) {
    const store = configureStore({
        reducer: {
            products: productsReducer,
            auth: authReducer
        }
    })

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false }
        }
    })

    return render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
            </QueryClientProvider>
        </Provider>
    )
}
