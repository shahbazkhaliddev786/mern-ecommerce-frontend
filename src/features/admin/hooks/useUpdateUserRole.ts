import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ApiError } from '@/shared/services/api'
import { adminUserService } from '../services/user.service'
import type { UserRole } from '../types/user.types'

interface UpdateUserRoleArgs {
    userId: string
    role: UserRole
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ userId, role }: UpdateUserRoleArgs) => adminUserService.updateRole(userId, role),
        onSuccess: (response) => {
            toast.success(response.message || 'User role updated successfully')
            queryClient.invalidateQueries({ queryKey: ['admin-users'] })
        },
        onError: (error: ApiError) => {
            toast.error(error.message || 'Failed to update user role')
        }
    })
}
