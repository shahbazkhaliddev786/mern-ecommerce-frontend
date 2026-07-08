import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { adminUserService, type AdminUserQuery } from '../services/user.service'

export function useAdminUsers(query: AdminUserQuery) {
    return useQuery({
        queryKey: ['admin-users', query],
        queryFn: () => adminUserService.getAll(query),
        placeholderData: keepPreviousData
    })
}
