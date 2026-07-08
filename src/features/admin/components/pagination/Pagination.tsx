import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    hasNext?: boolean
    hasPrev?: boolean
}

export function Pagination({ currentPage, totalPages, onPageChange, hasNext, hasPrev }: PaginationProps) {
    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = []
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages)
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
            }
        }
        return pages
    }

    const isPrevDisabled = hasPrev !== undefined ? !hasPrev : currentPage === 1
    const isNextDisabled = hasNext !== undefined ? !hasNext : currentPage === totalPages

    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-between border-t border-border bg-card px-6 py-4 rounded-b-[2.5rem]">
            <div className="flex flex-1 justify-between sm:hidden">
                <Button onClick={() => onPageChange(currentPage - 1)} disabled={isPrevDisabled} variant="outline" className="rounded-full">
                    Previous
                </Button>
                <Button onClick={() => onPageChange(currentPage + 1)} disabled={isNextDisabled} variant="outline" className="rounded-full">
                    Next
                </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Showing page <span className="font-semibold text-foreground">{currentPage}</span> of{' '}
                        <span className="font-semibold text-foreground">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-full shadow-sm bg-muted/30 p-1" aria-label="Pagination">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={isPrevDisabled}
                            className="relative inline-flex items-center rounded-l-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-background focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>

                        {getPageNumbers().map((page, idx) => {
                            if (page === '...') {
                                return (
                                    <span
                                        key={`ellipsis-${idx}`}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-muted-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </span>
                                )
                            }

                            const isCurrent = page === currentPage
                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page as number)}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-all rounded-full ${
                                        isCurrent
                                            ? 'z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-sm scale-105'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-background focus:z-20 focus:outline-offset-0'
                                    }`}>
                                    {page}
                                </button>
                            )
                        })}

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={isNextDisabled}
                            className="relative inline-flex items-center rounded-r-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-background focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
