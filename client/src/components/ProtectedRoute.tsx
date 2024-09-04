import { cookies } from "next/headers"
import Link from "next/link"

type Props = {
    children: React.ReactNode
}

export default function ProtectedRoute({children}: Props) {
    const authCookie = cookies().get("Authorization")
    if (!authCookie) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p className="mb-4">You need to be logged in to view this page.</p>
                <Link
                    href="/login" 
                    className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
                >
                    Go to Login
                </Link>
            </div>
        </div>
        )
    }
    return children
}