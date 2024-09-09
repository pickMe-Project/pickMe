"use client"; 

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const error = query.get('error');
    
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: "invalid Email or Password",
      });

      router.replace(window.location.pathname);
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        window.location.href = "/login?error=" + encodeURIComponent(errorBody);
        return;
      }

      const responseBody = await response.json();

      if (responseBody && responseBody.access_token) {
        document.cookie = `Authorization=Bearer ${responseBody.access_token}; path=/`;
        window.location.href = "/";
      } else {
        console.error("Invalid response body:", responseBody);
        window.location.href = "/login?error=Invalid+response+from+server";
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      window.location.href = "/login?error=Unexpected+error+occurred";
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-black font-libre">
          Sign In
        </h1>
        <form onSubmit={handleLogin} className="mt-10 space-y-6 font-cousine">
          <div className="space-y-4">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 text-black bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 peer"
                placeholder=" "
                
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 text-black bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300 peer"
                placeholder=" "
                
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
          </div>
          <div className="pt-6 space-y-4">
            <button
              type="submit"
              className="w-full px-6 py-3 text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 font-cousine shadow-md"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 font-cousine shadow-md flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600 mt-4 font-dmsans">
          <Link href="#" className="hover:text-black transition duration-300">
            Forgot password?
          </Link>
          <span className="mx-2">•</span>
          <Link
            href="/register"
            className="hover:text-black transition duration-300"
          >
            Sign up
          </Link>
          <span className="mx-2">•</span>
          <Link href="/" className="hover:text-black transition duration-300">
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  );
}
