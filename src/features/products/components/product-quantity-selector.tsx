import { Minus, Plus } from 'lucide-react'

interface ProductQuantitySelectorProps {
    value: number
    min?: number
    max: number
    onChange: (value: number) => void
}

export function ProductQuantitySelector({ value, min = 1, max, onChange }: ProductQuantitySelectorProps) {
    const decrease = () => {
        if (value > min) onChange(value - 1)
    }

    const increase = () => {
        if (value < max) onChange(value + 1)
    }

    return (
        <div className="flex items-center gap-0 w-fit rounded-full border border-border bg-muted/20 overflow-hidden">
            <button
                onClick={decrease}
                disabled={value <= min}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-[3rem] text-center text-base font-bold tabular-nums select-none">{value}</span>

            <button
                onClick={increase}
                disabled={value >= max}
                className="flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
            </button>
        </div>
    )
}
