import type { OrderStatusKey, OrdersByStatus } from '../../types/dashboard.types'

interface OrdersStatusSummaryProps {
    data: OrdersByStatus
}

const STATUS_ORDER: OrderStatusKey[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_DOT_CLASSES: Record<OrderStatusKey, string> = {
    pending: 'bg-muted-foreground/50',
    processing: 'bg-amber-500',
    shipped: 'bg-blue-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-destructive'
}

export function OrdersStatusSummary({ data }: OrdersStatusSummaryProps) {
    const total = STATUS_ORDER.reduce((sum, status) => sum + (data[status] ?? 0), 0)

    return (
        <div className="space-y-5">
            {STATUS_ORDER.map((status) => {
                const count = data[status] ?? 0
                const pct = total > 0 ? (count / total) * 100 : 0

                return (
                    <div key={status} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 capitalize text-foreground">
                                <span className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT_CLASSES[status]}`} />
                                {status}
                            </span>
                            <span className="font-semibold text-foreground">{count}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div className={`h-full rounded-full ${STATUS_DOT_CLASSES[status]}`} style={{ width: `${pct}%` }} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
