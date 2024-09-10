import { UserType } from "@/db/models/User";
import { cookies } from "next/headers"
import Link from "next/link"

type Props = {
    children: React.ReactNode
}

async function getUser() {
  try {
    const response = await fetch(`http://localhost:3000/api/user`, {
      headers: {
        Cookie: cookies().toString(),
      },
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data: UserType = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function SubscriptionProtectedRoute({children}: Props): Promise<any> {
    const authCookie = cookies().get("Authorization")
    const user = await getUser();
    if (!authCookie) {
        return (
        <div className="flex items-center justify-center h-[74.6vh] bg-white">
            <div className="p-10  border border-black rounded-none shadow-lg">
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
    if (!user?.subscription) {
        return (
        <div className="flex items-center justify-center h-[74.6vh] bg-white">
            <div className="p-10  border border-black rounded-none shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-black font-libre">Access Denied</h1>
                <p className="mb-8 text-gray-700 font-cousine">You need to subscribe to view this page.</p>
                <Link
                    href="/subscription" 
                    className="font-cousine inline-block px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black rounded-3xl transition duration-300 ease-in-out"
                >
                    Subscribe Now
                </Link>
            </div>
        </div>
        )
    }
    return children
}