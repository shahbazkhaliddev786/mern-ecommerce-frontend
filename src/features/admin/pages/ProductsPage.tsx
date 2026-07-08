import { useEffect, useMemo, useState } from 'react'
import { Inbox, Loader2 } from 'lucide-react'
import { ProductToolbar } from '../components/product-toolbar/ProductToolbar'
import { AdminProductCard } from '../components/product-card/AdminProductCard'
import { ProductFormModal } from '../components/product-form-modal/ProductFormModal'
import { DeleteProductDialog } from '../components/delete-product-dialog/DeleteProductDialog'
import { Pagination } from '../components/pagination/Pagination'
import { useAdminProducts } from '../hooks/useAdminProducts'
import type { ProductSort } from '../services/product.service'
import type { Product } from '@/features/products/types'

const PAGE_SIZE = 12
const SEARCH_DEBOUNCE_MS = 400

export function ProductsPage() {
    // Filter / sort / pagination state
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState<ProductSort>('newest')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [page, setPage] = useState(1)

    // Modal state
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

    // Debounce the search box so we don't fire a request on every keystroke.
    // Resetting the page here (inside the async timeout) keeps results starting
    // from page 1 whenever the search term actually changes.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, SEARCH_DEBOUNCE_MS)
        return () => clearTimeout(timeout)
    }, [searchInput])

    // Filter/sort changes reset pagination to the first page (handled in-event,
    // not in an effect, to avoid cascading re-renders).
    const handleSortChange = (value: ProductSort) => {
        setSort(value)
        setPage(1)
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value)
        setPage(1)
    }

    const handleBrandChange = (value: string) => {
        setBrand(value)
        setPage(1)
    }

    const query = useMemo(() => ({ search, sort, category, brand, page, limit: PAGE_SIZE }), [search, sort, category, brand, page])

    const { data, isLoading, isError, isFetching } = useAdminProducts(query)

    const products = data?.data.products ?? []
    const pagination = data?.data.pagination

    const openCreateModal = () => {
        setEditingProduct(null)
        setIsFormOpen(true)
    }

    const openEditModal = (product: Product) => {
        setEditingProduct(product)
        setIsFormOpen(true)
    }

    const closeFormModal = () => {
        setIsFormOpen(false)
        setEditingProduct(null)
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">Products</h1>
                <p className="mt-2 text-lg text-muted-foreground">Manage your store's products here.</p>
            </div>

            <ProductToolbar
                search={searchInput}
                onSearchChange={setSearchInput}
                sort={sort}
                onSortChange={handleSortChange}
                category={category}
                onCategoryChange={handleCategoryChange}
                brand={brand}
                onBrandChange={handleBrandChange}
                onCreate={openCreateModal}
            />

            {isLoading ? (
                <div className="flex min-h-[400px] w-full items-center justify-center rounded-[2rem] border border-border bg-card">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : isError ? (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[2rem] border border-border bg-card p-8 text-center shadow-sm">
                    <h3 className="text-xl font-bold text-foreground">Something went wrong</h3>
                    <p className="mt-2 text-muted-foreground">We couldn't load your products. Please try again.</p>
                </div>
            ) : products.length === 0 ? (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[2rem] border border-border bg-card p-8 text-center shadow-sm">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                        <Inbox className="h-10 w-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">No products found</h3>
                    <p className="mt-2 text-muted-foreground">Try adjusting your filters, or create your first product.</p>
                </div>
            ) : (
                <div className={`transition-opacity ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <AdminProductCard key={product._id} product={product} onEdit={openEditModal} onDelete={setDeletingProduct} />
                        ))}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-sm">
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={setPage}
                                hasNext={pagination.hasNext}
                                hasPrev={pagination.hasPrev}
                            />
                        </div>
                    )}
                </div>
            )}

            <ProductFormModal isOpen={isFormOpen} onClose={closeFormModal} product={editingProduct} />
            <DeleteProductDialog isOpen={Boolean(deletingProduct)} onClose={() => setDeletingProduct(null)} product={deletingProduct} />
        </div>
    )
}
