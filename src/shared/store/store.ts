import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '@/features/products/slices/products-slice'
import authReducer from '@/features/authentication/slices/auth-slice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer
    }
    // Optional: better devTools in development
    // devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
