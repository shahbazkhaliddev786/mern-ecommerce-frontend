import { useEffect, useMemo, useState } from 'react'
import { Eye, Search } from 'lucide-react'
import { DataTable, type Column } from '../components/table/DataTable'
import { Pagination } from '../components/pagination/Pagination'
import { OrderDetailModal } from '../components/order-detail-modal/OrderDetailModal'
import { useAdminOrders } from '../hooks/useAdminOrders'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import type { AdminOrderSummary, OrderStatus } from '../types/order.types'

const PAGE_SIZE = 20
const SEARCH_DEBOUNCE_MS = 400

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_BADGE_CLASSES: Record<OrderStatus, string> = {
    pending: 'bg-muted text-muted-foreground',
    processing: 'bg-amber-100 text-amber-700',
    shipped: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-destructive/10 text-destructive'
}

function formatDate(value?: string) {
    if (!value) return '—'
    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export function OrdersPage() {
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<OrderStatus | ''>('')
    const [page, setPage] = useState(1)
    const [viewingOrderId, setViewingOrderId] = useState<string | null>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, SEARCH_DEBOUNCE_MS)
        return () => clearTimeout(timeout)
    }, [searchInput])

    const handleStatusChange = (value: OrderStatus | '') => {
        setStatus(value)
        setPage(1)
    }

    const query = useMemo(() => ({ search, status, page, limit: PAGE_SIZE }), [search, status, page])
    const { data, isLoading } = useAdminOrders(query)

    const orders = data?.data.orders ?? []
    const pagination = data?.data.pagination

    const columns: Column<AdminOrderSummary>[] = [
        { header: 'Order ID', cell: (order) => `#${order._id.slice(-8)}` },
        {
            header: 'Customer',
            cell: (order) => (
                <div>
                    <p className="font-medium text-foreground">{order.user?.name ?? 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                </div>
            )
        },
        {
            header: 'Status',
            cell: (order) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_BADGE_CLASSES[order.status] ?? 'bg-muted text-muted-foreground'}`}>
                    {order.status}
                </span>
            )
        },
        { header: 'Payment', cell: (order) => <span className="capitalize">{order.paymentStatus}</span> },
        { header: 'Total', cell: (order) => `$${order.total.toFixed(2)}` },
        { header: 'Date', cell: (order) => formatDate(order.createdAt) },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (order) => (
                <div className="flex justify-end">
                    <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => setViewingOrderId(order._id)}>
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">Orders</h1>
                <p className="mt-2 text-lg text-muted-foreground">Manage your store's orders here.</p>
            </div>

            <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by customer or order ID..."
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        className="h-11 rounded-xl bg-background pl-9"
                    />
                </div>

                <select
                    aria-label="Filter by status"
                    value={status}
                    onChange={(event) => handleStatusChange(event.target.value as OrderStatus | '')}
                    className="h-11 rounded-xl border border-input bg-background px-3 text-sm capitalize text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">All statuses</option>
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option} className="capitalize">
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <DataTable
                columns={columns}
                data={orders}
                isLoading={isLoading}
                emptyMessage="Try adjusting your search or filters."
                keyExtractor={(order) => order._id}
            />

            {pagination && pagination.totalPages > 1 && (
                <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={setPage}
                        hasNext={pagination.hasNext}
                        hasPrev={pagination.hasPrev}
                    />
                </div>
            )}

            <OrderDetailModal isOpen={Boolean(viewingOrderId)} onClose={() => setViewingOrderId(null)} orderId={viewingOrderId} />
        </div>
    )
}
