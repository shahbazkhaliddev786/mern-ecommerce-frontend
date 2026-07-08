import { User } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface AvatarProps {
    src?: string | null
    alt?: string
    className?: string
}

export function Avatar({ src, alt = 'Avatar', className }: AvatarProps) {
    return (
        <div
            className={cn(
                'relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-muted border border-border',
                className
            )}>
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover rounded-full" />
            ) : (
                <User className="h-5 w-5 text-muted-foreground" />
            )}
        </div>
    )
}
