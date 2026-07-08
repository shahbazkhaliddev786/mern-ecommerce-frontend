import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ApiError } from '@/shared/services/api'
import { adminUserService } from '../services/user.service'

export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (userId: string) => adminUserService.remove(userId),
        onSuccess: (response) => {
            toast.success(response.message || 'User deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-users'] })
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to delete user')
        }
    })
}
