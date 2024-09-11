"use client";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Subscription() {
  const router = useRouter();
  const [user, setuser] = useState<UserType>()
  const [isLoading, setIsLoading] = useState(true);

  async function getUser() {
    try {
      const authCookie =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("Authorization="))
          ?.split("=")[1] || "";

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": authCookie,
        },
      });

      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data: UserType = await response.json();

      return data
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser().then(setuser);
  }, []);

  const handleSubscribe = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token`, {
        method: "POST",
      });

      const requestData = await response.json();
      (window as any).snap.pay(requestData.token, {
        onSuccess: async () => {
          const form = {
            subscription: true,
          };

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription`,
              {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              const errorBody = await response.json();
              console.log(errorBody, "<<<<< errorBody");
              return;
            }
            await response.json();
            router.push(`/profile`);
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="my-10 flex justify-center items-center mx-auto">
            <div className="relative inline-flex">
              <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              <div className="w-8 h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-ping"></div>
              <div className="w-8 h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
            <span className="ml-4 font-cousine text-lg text-gray-600 font-bold">Loading...</span>
          </div>
      </div>
    );
  }
  if (user?.subscription) {
    return (
      <div className="relative h-[74vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Guitar hero background"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-6 font-libre">Thank You for Your Subscription!</h1>
          <p className="text-xl font-cousine mb-8">Your journey to becoming a rockstar begins now.</p>
          <Link href="/songs" className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-500 active:scale-95">
            Start Exploring
          </Link>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="relative h-[74vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Guitar hero background"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-6 font-libre">Subscribe to PickMe!</h1>
          <p className="text-xl font-cousine mb-8">Unlock your musical potential today.</p>
          <button 
            onClick={handleSubscribe}
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-500 active:scale-95"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    )
  }
}
