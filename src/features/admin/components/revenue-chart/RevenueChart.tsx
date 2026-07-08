import type { RevenuePoint } from '../../types/dashboard.types'

interface RevenueChartProps {
    data: RevenuePoint[]
}

const CHART_WIDTH = 700
const CHART_HEIGHT = 260
const CHART_PADDING_BOTTOM = 28
const BAR_GAP = 8

function formatShortDate(value: string) {
    const date = new Date(`${value}T00:00:00Z`)
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export function RevenueChart({ data }: RevenueChartProps) {
    if (data.length === 0) {
        return <div className="flex min-h-[260px] items-center justify-center text-sm text-muted-foreground">No revenue data available.</div>
    }

    const maxRevenue = Math.max(1, ...data.map((point) => point.revenue))
    const barWidth = (CHART_WIDTH - BAR_GAP * (data.length - 1)) / data.length
    const plotHeight = CHART_HEIGHT - CHART_PADDING_BOTTOM
    const hasRevenue = data.some((point) => point.revenue > 0)

    return (
        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-full w-full" role="img" aria-label="Revenue over the last 14 days">
            {!hasRevenue && (
                <text x={CHART_WIDTH / 2} y={plotHeight / 2} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
                    No revenue in the last 14 days yet
                </text>
            )}
            <line x1={0} y1={plotHeight} x2={CHART_WIDTH} y2={plotHeight} stroke="var(--border)" strokeWidth={1} />
            {data.map((point, index) => {
                const barHeight = (point.revenue / maxRevenue) * (plotHeight - 8)
                const x = index * (barWidth + BAR_GAP)
                const y = plotHeight - barHeight

                return (
                    <g key={point.date}>
                        <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={Math.max(barHeight, 2)}
                            rx={4}
                            fill="var(--primary)"
                            opacity={point.revenue === 0 ? 0.15 : 0.85}>
                            <title>
                                {formatShortDate(point.date)}: ${point.revenue.toFixed(2)}
                            </title>
                        </rect>
                        {index % 2 === 0 && (
                            <text x={x + barWidth / 2} y={CHART_HEIGHT - 8} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
                                {formatShortDate(point.date)}
                            </text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
