import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function Login() {
  const handeLogin = async (formData: FormData) => {
    "use server";
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "ini response <<<<<<<");
    

    if (!response.ok) {
      const errorBody = await response.text();
      console.log(errorBody, "ini error <<<<<<<");
      return redirect("/login?error=" + encodeURIComponent(errorBody));
    }
    const responseBody = await response.json();
    console.log(responseBody, "ini response body <<<<<<<");
    
    if (responseBody && responseBody.access_token) {
      cookies().set("Authorization", "Bearer " + responseBody.access_token);
      return redirect("/");
    } else {
      console.error("Invalid response body:", responseBody);
      return redirect("/login?error=Invalid+response+from+server");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-black font-libre">
          Sign In
        </h1>
        <form action={handeLogin} className="mt-10 space-y-6 font-cousine">
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
          <div className="pt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 font-cousine shadow-md"
            >
              Sign In
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
