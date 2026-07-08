// External Imports
import { createBrowserRouter } from 'react-router-dom'

// Project Imports
import App from './App'
import PageLayout from '@/shared/layouts/page-layout'
import { AboutPage, ContactPage, NotFoundPage } from '@/features/aljo-store/index'
import { SignupPage, LoginPage, ForgotPasswordPage } from '@/features/authentication/index'
import { ProductsPage, CartPage, ProductDetailPage } from '@/features/products/index'
import { OrderSuccessPage, CheckoutPage, UserDashboardPage } from '@/features/orders/index'
import { ProfilePage, EditProfilePage } from '@/features/users/index'
import { ProtectedRoute } from '@/features/authentication/components/protected-route'
import { VerifyEmailPage } from './features/authentication/pages/verify-email-page'
import {
    AdminLayout,
    AdminProtectedRoute,
    AdminDashboardPage,
    AdminProductsPage,
    AdminCategoriesPage,
    AdminBrandsPage,
    AdminCartsPage,
    AdminOrdersPage,
    AdminUsersPage
} from '@/features/admin/index'

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
                path: 'products/:id',
                element: <ProductDetailPage />
            },
            {
                path: 'cart',
                element: <CartPage />
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
            },
            {
                path: 'verify-email',
                element: <VerifyEmailPage />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            },
            {
                path: 'order/success',
                element: <OrderSuccessPage />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'dashboard',
                        element: <UserDashboardPage />
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />
                    },
                    {
                        path: 'profile/edit',
                        element: <EditProfilePage />
                    }
                ]
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminProtectedRoute />,
        errorElement: <NotFoundPage />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <AdminDashboardPage />
                    },
                    {
                        path: 'products',
                        element: <AdminProductsPage />
                    },
                    {
                        path: 'categories',
                        element: <AdminCategoriesPage />
                    },
                    {
                        path: 'brands',
                        element: <AdminBrandsPage />
                    },
                    {
                        path: 'carts',
                        element: <AdminCartsPage />
                    },
                    {
                        path: 'orders',
                        element: <AdminOrdersPage />
                    },
                    {
                        path: 'users',
                        element: <AdminUsersPage />
                    }
                ]
            }
        ]
    }
])
