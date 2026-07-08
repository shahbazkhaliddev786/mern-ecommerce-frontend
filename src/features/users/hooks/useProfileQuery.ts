import { useQuery } from '@tanstack/react-query'
import { profileService, type ProfileResponse } from '../services/profile.service'
import { useAppSelector } from '@/shared/store/hooks'

export function useProfileQuery() {
    const { isAuthenticated, accessToken } = useAppSelector((state) => state.auth)

    return useQuery<ProfileResponse, Error>({
        queryKey: ['profile'],
        queryFn: () => profileService.getUserProfile(),
        // Only run query if user is logged in
        enabled: isAuthenticated && !!accessToken,
        // Keep profile data fresh for 5 minutes
        staleTime: 5 * 60 * 1000,
        retry: 1
    })
}
