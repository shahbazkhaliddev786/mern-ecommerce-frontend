import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/shared/store/hooks'
import { useProfileQuery } from '@/features/users/hooks/useProfileQuery'
import { Loader2 } from 'lucide-react'

export function AdminProtectedRoute() {
    const { isAuthenticated, accessToken, user } = useAppSelector((state) => state.auth)

    // We use the profile query to ensure we have the latest user data,
    // especially the role, in case of a hard refresh where Redux state user is null.
    const { data: profileData, isLoading: isProfileLoading } = useProfileQuery()

    if (!isAuthenticated || !accessToken) {
        return <Navigate to="/login" replace />
    }

    // Determine user role. Priority: Redux state user -> Profile Query Data -> default to user
    const role = user?.role || profileData?.data?.role

    // Show a loading state while we verify the user's role on initial load
    if (!role && isProfileLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
    }

    // If after loading we still don't have an admin role, redirect to home or user dashboard
    if (role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
