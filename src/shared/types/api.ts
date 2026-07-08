export interface ApiResponse<T> {
    status: string
    message: string
    data: T
}

export interface Pagination {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNext: boolean
    hasPrev: boolean
}
