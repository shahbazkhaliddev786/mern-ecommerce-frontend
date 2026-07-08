import { useProfileQuery } from '../hooks/useProfileQuery'
import { ProfileCard } from '../components/profile-card'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export function ProfilePage() {
    const { data, isLoading, isError, error, refetch } = useProfileQuery()

    if (isLoading) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
                <div className="flex h-64 items-center justify-center rounded-3xl border border-border bg-card">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            </section>
        )
    }

    if (isError) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
                <div className="flex flex-col items-center justify-center h-64 rounded-3xl border border-destructive/20 bg-destructive/5 text-center p-6">
                    <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                    <h2 className="text-xl font-semibold text-destructive mb-2">Failed to load profile</h2>
                    <p className="text-muted-foreground mb-6">{error?.message || 'Something went wrong while fetching your profile.'}</p>
                    <Button onClick={() => refetch()} variant="outline" className="gap-2 text-foreground">
                        <RefreshCw className="h-4 w-4" /> Try Again
                    </Button>
                </div>
            </section>
        )
    }

    if (!data?.data) {
        return (
            <section className="container mx-auto px-4 py-12 md:py-24 max-w-5xl text-center">
                <p className="text-muted-foreground">No profile data available.</p>
            </section>
        )
    }

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 max-w-5xl">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10">
                    <h2 className="font-display text-4xl font-bold sm:text-5xl">My Profile</h2>
                </div>

                <div className="space-y-8">
                    <ProfileCard user={data.data} />
                    {/* Add future cards here like Recent Orders overview, etc. */}
                </div>
            </div>
        </section>
    )
}
