import { useQuery } from '@tanstack/react-query'
import { adminDashboardService } from '../services/dashboard.service'

export function useDashboardSummary() {
    return useQuery({
        queryKey: ['admin-dashboard-summary'],
        queryFn: () => adminDashboardService.getSummary()
    })
}
