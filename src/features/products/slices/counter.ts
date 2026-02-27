import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../shared/store/store'

interface CounterState {
    value: number
    status: 'idle' | 'loading' | 'failed'
}

const initialState = {
    value: 0,
    status: 'idle'
} satisfies CounterState // or as const + type assertion

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

// Action creators are generated automatically
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Selector (optional but recommended)
export const selectCount = (state: RootState) => state.counter?.value ?? 0

export default counterSlice.reducer
