import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/shared/store/hooks'

export function ProtectedRoute() {
    const { isAuthenticated, accessToken } = useAppSelector((state) => state.auth)

    if (!isAuthenticated || !accessToken) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
