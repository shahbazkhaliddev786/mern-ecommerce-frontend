import { useEffect, useMemo, useState } from 'react'
import { Eye, Search } from 'lucide-react'
import { DataTable, type Column } from '../components/table/DataTable'
import { Pagination } from '../components/pagination/Pagination'
import { CartDetailModal } from '../components/cart-detail-modal/CartDetailModal'
import { useAdminCarts } from '../hooks/useAdminCarts'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import type { AdminCartSummary } from '../types/cart.types'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

function formatDate(value?: string) {
    if (!value) return '—'
    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export function CartsPage() {
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [viewingUserId, setViewingUserId] = useState<string | null>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, SEARCH_DEBOUNCE_MS)
        return () => clearTimeout(timeout)
    }, [searchInput])

    const query = useMemo(() => ({ search, page, limit: PAGE_SIZE }), [search, page])
    const { data, isLoading } = useAdminCarts(query)

    const carts = data?.data.carts ?? []
    const pagination = data?.data.pagination

    const columns: Column<AdminCartSummary>[] = [
        {
            header: 'Customer',
            cell: (cart) => (
                <div>
                    <p className="font-medium text-foreground">{cart.user?.name ?? 'Unknown user'}</p>
                    <p className="text-xs text-muted-foreground">{cart.user?.email}</p>
                </div>
            )
        },
        { header: 'Items', cell: (cart) => cart.itemsCount },
        { header: 'Subtotal', cell: (cart) => `$${cart.subtotal.toFixed(2)}` },
        { header: 'Last Updated', cell: (cart) => formatDate(cart.updatedAt) },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (cart) => (
                <div className="flex justify-end">
                    <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => setViewingUserId(cart.user._id)}>
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
                <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">Carts</h1>
                <p className="mt-2 text-lg text-muted-foreground">View and manage your customers' shopping carts.</p>
            </div>

            <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by name or email..."
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    className="h-11 rounded-xl bg-background pl-9"
                />
            </div>

            <DataTable
                columns={columns}
                data={carts}
                isLoading={isLoading}
                emptyMessage="No customers currently have items in their cart."
                keyExtractor={(cart) => cart._id}
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

            <CartDetailModal isOpen={Boolean(viewingUserId)} onClose={() => setViewingUserId(null)} userId={viewingUserId} />
        </div>
    )
}
