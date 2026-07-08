export interface DashboardTrend {
    current: number
    previous: number
    changePct: number | null
}

export interface DashboardTotals {
    revenue: number
    orders: number
    users: number
    products: number
}

export interface DashboardTrends {
    revenue: DashboardTrend
    orders: DashboardTrend
    users: DashboardTrend
}

export type OrderStatusKey = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type OrdersByStatus = Record<OrderStatusKey, number>

export interface RevenuePoint {
    date: string
    revenue: number
}

export interface DashboardSummary {
    totals: DashboardTotals
    trends: DashboardTrends
    ordersByStatus: OrdersByStatus
    revenueSeries: RevenuePoint[]
}
