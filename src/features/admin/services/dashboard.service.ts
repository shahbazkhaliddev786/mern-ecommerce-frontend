import { http } from '@/shared/services/api'
import type { ApiResponse } from '@/shared/types/api'
import type { DashboardSummary } from '../types/dashboard.types'

export const adminDashboardService = {
    /** GET /v1/admin/dashboard/summary */
    getSummary: () => http.get<ApiResponse<DashboardSummary>>('/v1/admin/dashboard/summary')
}
