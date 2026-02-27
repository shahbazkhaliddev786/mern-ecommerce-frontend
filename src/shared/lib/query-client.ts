import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 minute – data is fresh for 1 minute
            gcTime: 1000 * 60 * 5, // 5 minutes garbage collection (was cacheTime)
            retry: 1, // retry once on fail
            refetchOnWindowFocus: false // usually false in modern apps
        }
    }
})
