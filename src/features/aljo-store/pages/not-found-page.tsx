export default function NotFoundPage() {
    return (
        <section>
            <section className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8">Page Not Found</p>
                <a href="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
                    Go Back Home
                </a>
            </section>
        </section>
    )
}
