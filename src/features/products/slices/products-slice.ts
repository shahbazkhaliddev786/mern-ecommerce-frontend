import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { productService } from '../services/product.service'
import type { Product } from '../types'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await productService.getAll()
        return response.data
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch products'
        return rejectWithValue(message)
    }
})

interface ProductsState {
    items: Product[]
    isLoading: boolean
    error: string | null
    page: number
    searchTerm: string
    selectedCategoryId: string | null
}

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    searchTerm: '',
    selectedCategoryId: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload
            state.page = 1 // reset page on search
        },
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategoryId = action.payload
            state.page = 1 // reset page on filter
        },
        resetFilters: (state) => {
            state.page = 1
            state.searchTerm = ''
            state.selectedCategoryId = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload.products
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    }
})

export const { setPage, setSearchTerm, setSelectedCategory, resetFilters } = productsSlice.actions

export default productsSlice.reducer
