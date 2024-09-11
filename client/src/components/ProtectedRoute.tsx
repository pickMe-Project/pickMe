import { UserType } from "@/db/models/User";
import { cookies } from "next/headers"
import Link from "next/link"

type Props = {
    children: React.ReactNode
}

async function getUser() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
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

export default async function ProtectedRoute({children}: Props): Promise<any> {
    const authCookie = cookies().get("Authorization")
    const user = await getUser()

    if (!authCookie) {
        return (
            <div className="flex items-center justify-center h-[74.6vh] bg-white">
                <div className="p-10 border border-black rounded-none shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-black font-libre">Access Denied</h1>
                    <p className="mb-8 text-gray-700 font-cousine">You need to be signed in to view this page.</p>
                    <Link
                        href="/login" 
                        className="font-cousine inline-block px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black rounded-3xl transition duration-300 ease-in-out"
                    >
                        Go to Sign In
                    </Link>
                </div>
            </div>
        )
    }

    if (!user?.subscription) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="max-w-md w-full p-8 border border-black rounded-none shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-black font-libre">Access Denied</h1>
                    <p className="mb-8 text-gray-700 font-cousine">Unlock exclusive content and enhance your musical journey by subscribing today! Don&apos;t miss out on our premium features. Once for a lifetime, no subscription renewal required.</p>
                    <div className="text-center">
                        <Link
                            href="/subscription" 
                            className="font-cousine inline-block px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black rounded-3xl transition duration-300 ease-in-out"
                        >
                            Subscribe
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    // if (!user?.subscription) {
    //     return (
    //     <div className="flex items-center justify-center h-[74.6vh] bg-white">
    //         <div className="p-10  border border-black rounded-none shadow-lg">
    //             <h1 className="text-3xl font-bold mb-6 text-black font-libre">Access Denied</h1>
    //             <p className="mb-8 text-gray-700 font-cousine">You need to subscribe to view this page.</p>
    //             <Link
    //                 href="/subscription" 
    //                 className="font-cousine inline-block px-6 py-3 bg-black text-white hover:bg-yellow-400 hover:text-black rounded-3xl transition duration-300 ease-in-out"
    //             >
    //                 Subscribe Now
    //             </Link>
    //         </div>
    //     </div>
    //     )
    // }
    return children
}