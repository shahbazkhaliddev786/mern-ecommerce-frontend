import { useEffect, useMemo, useState } from 'react'
import { Loader2, Save, Search, Trash2 } from 'lucide-react'
import { DataTable, type Column } from '../components/table/DataTable'
import { Pagination } from '../components/pagination/Pagination'
import { DeleteUserDialog } from '../components/delete-user-dialog/DeleteUserDialog'
import { useAdminUsers } from '../hooks/useAdminUsers'
import { useUpdateUserRole } from '../hooks/useUpdateUserRole'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useAppSelector } from '@/shared/store/hooks'
import { useProfileQuery } from '@/features/users/hooks/useProfileQuery'
import type { AdminUser, UserRole } from '../types/user.types'

const PAGE_SIZE = 20
const SEARCH_DEBOUNCE_MS = 400
const ROLE_OPTIONS: UserRole[] = ['user', 'admin']

function formatDate(value?: string) {
    if (!value) return '—'
    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function RoleCell({ user, isSelf }: { user: AdminUser; isSelf: boolean }) {
    const [selectedRole, setSelectedRole] = useState<UserRole>(user.role)
    const { mutate: updateRole, isPending } = useUpdateUserRole()

    const hasChanged = selectedRole !== user.role

    return (
        <div className="flex items-center gap-2">
            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                disabled={isSelf || isPending}
                className="h-9 rounded-lg border border-input bg-background px-2 text-sm capitalize text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role} className="capitalize">
                        {role}
                    </option>
                ))}
            </select>
            {hasChanged && !isSelf && (
                <Button
                    type="button"
                    size="icon-sm"
                    disabled={isPending}
                    onClick={() => updateRole({ userId: user.id, role: selectedRole })}
                    aria-label="Save role">
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                </Button>
            )}
        </div>
    )
}

export function UsersPage() {
    // Redux state.auth.user resets to null on a hard refresh / full-page navigation
    // (only tokens persist in localStorage) — fall back to the profile query, same
    // pattern already used by AdminProtectedRoute, so the self-action safeguard
    // below doesn't silently no-op after a reload.
    const { user: reduxUser } = useAppSelector((state) => state.auth)
    const { data: profileData } = useProfileQuery()
    const currentUserId = reduxUser?.id || profileData?.data?.id

    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [role, setRole] = useState<UserRole | ''>('')
    const [page, setPage] = useState(1)
    const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, SEARCH_DEBOUNCE_MS)
        return () => clearTimeout(timeout)
    }, [searchInput])

    const handleRoleFilterChange = (value: UserRole | '') => {
        setRole(value)
        setPage(1)
    }

    const query = useMemo(() => ({ search, role, page, limit: PAGE_SIZE }), [search, role, page])
    const { data, isLoading } = useAdminUsers(query)

    const users = data?.data.users ?? []
    const pagination = data?.data.pagination

    const columns: Column<AdminUser>[] = [
        {
            header: 'Name',
            cell: (user) => (
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{user.name}</span>
                    {user.id === currentUserId && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">You</span>
                    )}
                </div>
            )
        },
        { header: 'Email', accessorKey: 'email' },
        {
            header: 'Verified',
            cell: (user) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.isVerified ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                    }`}>
                    {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
            )
        },
        {
            header: 'Role',
            cell: (user) => <RoleCell user={user} isSelf={user.id === currentUserId} />
        },
        { header: 'Joined', cell: (user) => formatDate(user.createdAt) },
        {
            header: 'Actions',
            className: 'text-right',
            cell: (user) => (
                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="rounded-xl"
                        disabled={user.id === currentUserId}
                        onClick={() => setDeletingUser(user)}>
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl">Users</h1>
                <p className="mt-2 text-lg text-muted-foreground">Manage your store's users here.</p>
            </div>

            <div className="flex flex-col gap-4 rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center">
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

                <select
                    aria-label="Filter by role"
                    value={role}
                    onChange={(event) => handleRoleFilterChange(event.target.value as UserRole | '')}
                    className="h-11 rounded-xl border border-input bg-background px-3 text-sm capitalize text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">All roles</option>
                    {ROLE_OPTIONS.map((option) => (
                        <option key={option} value={option} className="capitalize">
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <DataTable
                columns={columns}
                data={users}
                isLoading={isLoading}
                emptyMessage="Try adjusting your search or filters."
                keyExtractor={(user) => user.id}
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

            <DeleteUserDialog isOpen={Boolean(deletingUser)} onClose={() => setDeletingUser(null)} user={deletingUser} />
        </div>
    )
}
