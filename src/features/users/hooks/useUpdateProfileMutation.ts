import { useMutation, useQueryClient } from '@tanstack/react-query'
import { profileService, type ProfileResponse, type UpdateProfileData } from '../services/profile.service'
import { ApiError } from '@/shared/services/api'
import { toast } from 'react-toastify'

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient()

    return useMutation<ProfileResponse, Error, UpdateProfileData>({
        mutationFn: (data) => profileService.updateProfile(data),
        onSuccess: (data) => {
            toast.success(data.message || 'Profile updated successfully')
            // Invalidate and refetch profile data
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
        onError: (error) => {
            const data = error instanceof ApiError ? error.data : undefined
            const dataMessage = data && typeof data === 'object' && 'message' in data && typeof data.message === 'string' ? data.message : undefined
            toast.error(dataMessage || error.message || 'Failed to update profile')
        }
    })
}
