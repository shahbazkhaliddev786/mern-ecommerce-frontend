import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { AboutPage, NotFoundPage } from './features/aljo-store/index'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/about',
        element: <AboutPage />
    }
])
