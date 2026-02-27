// External Imports
import { createBrowserRouter } from 'react-router-dom'

// Project Imports
import App from './App'
import PageLayout from '@/shared/layouts/page-layout'
import { AboutPage, ContactPage, NotFoundPage } from '@/features/aljo-store/index'
import { SignupPage, LoginPage, ForgotPasswordPage } from '@/features/authentication/index'
import { ProductsPage } from '@/features/products/index'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <App />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            {
                path: 'products',
                element: <ProductsPage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'signup',
                element: <SignupPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />
            }
        ]
    }
    // Optional: routes that should NOT have the layout (login, signup, checkout etc.)
    // {
    //   path: '/login',
    //   element: <LoginPage />,
    // },
])
