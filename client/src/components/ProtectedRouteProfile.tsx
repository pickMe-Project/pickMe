import { UserType } from "@/db/models/User";
import { cookies } from "next/headers"
import Link from "next/link"

type Props = {
    children: React.ReactNode
}


export default function ProtectedRouteProfile({children}: Props){
    const authCookie = cookies().get("Authorization")
    if (!authCookie) {
        return (
            <div className="flex items-center justify-center h-[74.6vh] bg-white">
                <div className="p-10 border border-black rounded-none shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-black font-libre">Access Denied</h1>
                    <p className="mb-8 text-gray-700 font-cousine">You need to be logged in to view this page.</p>
                    <Link
                        href="/login" 
                        className="font-cousine inline-block px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black rounded-3xl transition duration-300 ease-in-out"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        )
    }
    return children
}