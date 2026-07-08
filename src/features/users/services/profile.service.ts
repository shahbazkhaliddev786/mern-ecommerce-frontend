import { apiFetch } from '@/shared/services/api'

export interface UserProfileData {
    id: string
    name: string
    email: string
    profile?: string // Add profile (avatar) if backend supports it
    role?: string
}

export interface ProfileResponse {
    status: string
    message: string
    data: UserProfileData
}

export interface UpdateProfileData {
    name?: string
    email?: string
    password?: string
    profile?: FileList | File
}

export const profileService = {
    /**
     * Get the current user's profile
     * GET /v1/auth/profile
     */
    getUserProfile: async (): Promise<ProfileResponse> => {
        const raw = await apiFetch<unknown>('/v1/auth/profile', {
            method: 'GET'
        })
        return raw as ProfileResponse
    },

    /**
     * Update the current user's profile
     * PATCH /v1/auth/profile
     */
    updateProfile: async (data: UpdateProfileData): Promise<ProfileResponse> => {
        const formData = new FormData()
        if (data.name) formData.append('name', data.name)
        if (data.email) formData.append('email', data.email)
        if (data.password) formData.append('password', data.password)

        // Check if the user attached a file in the FileList or File
        if (data.profile) {
            if (data.profile instanceof FileList && data.profile.length > 0) {
                formData.append('profile', data.profile[0])
            } else if (data.profile instanceof File) {
                formData.append('profile', data.profile)
            }
        }

        const raw = await apiFetch<unknown>('/v1/auth/profile', {
            method: 'PATCH',
            body: formData
        })
        return raw as ProfileResponse
    }
}
