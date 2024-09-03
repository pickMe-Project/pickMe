import Link from "next/link";

export default function Register() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-2xl">
                <h1 className="text-4xl font-bold text-center text-black font-libre">Sign Up</h1>
                <form className="mt-10 space-y-6 font-cousine">
                    <div className="space-y-4">
                        <div className="relative">
                            <input id="name" name="name" type="text" className="w-full px-4 py-2 text-black bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 peer" placeholder=" " />
                            <label htmlFor="name" className="absolute left-4 top-2 text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
                        </div>
                        <div className="relative">
                            <input id="email" name="email" type="email" className="w-full px-4 py-2 text-black bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 peer" placeholder=" " />
                            <label htmlFor="email" className="absolute left-4 top-2 text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                        </div>
                        <div className="relative">
                            <input id="password" name="password" type="password" className="w-full px-4 py-2 text-black bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 peer" placeholder=" " />
                            <label htmlFor="password" className="absolute left-4 top-2 text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                    </div>
                    <div className="pt-6">
                        <button type="submit" className="w-full px-6 py-3 text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 font-cousine shadow-md">
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600 mt-4 font-dmsans">
                    Already have an account?
                    <Link href="/login" className="ml-1 text-black hover:underline transition duration-300">Sign in</Link>
                </div>
            </div>
        </div>
    )
}