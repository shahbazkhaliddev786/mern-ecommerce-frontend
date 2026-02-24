import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { AboutPage, NotFoundPage } from '@/features/aljo-store/index'
import { SignupPage, LoginPage, ForgotPasswordPage } from '@/features/authentication/index'
import PageLayout from '@/shared/layouts/page-layout'

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
                path: '/about',
                element: <AboutPage />
            },
            {
                path: 'products',
                element: <NotFoundPage />
            },
            {
                path: 'contact',
                element: <NotFoundPage />
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
