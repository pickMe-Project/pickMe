'use client';
import ProfileCourseCard from "@/components/ProfileCourseCard";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  username: string;
  email: string;
}

export const dynamic = "force-dynamic";

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const authCookie = document.cookie.split('; ').find(row => row.startsWith('Authorization='))?.split('=')[1] || "";

      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": authCookie,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: UserData = await response.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <img
            src="/PickMe_transparent.svg"
            alt="Profile Picture"
            className="w-28 h-28 rounded-full mb-4 bg-gray-100"
          />
          <h1 className="text-3xl font-bold text-black font-libre mb-6">
            {userData ? userData.name : (
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
            )}
          </h1>
          <div className="text-center mb-8">
            <p className="text-gray-600 font-libre">
              <span className="font-medium text-black font-cousine">
                {userData ? userData.username : (
                  <span className="inline-block h-5 w-32 bg-gray-200 animate-pulse rounded"></span>
                )}
              </span>
            </p>
            <p className="text-gray-600 font-libre">
              <span className="font-medium text-black font-cousine">
                {userData ? userData.email : (
                  <span className="inline-block h-5 w-48 bg-gray-200 animate-pulse rounded"></span>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 px-10">
          <h2 className="text-2xl font-semibold text-black mb-4 font-libre px-5">
            Course Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileCourseCard />
            <ProfileCourseCard />
            <ProfileCourseCard />
            <ProfileCourseCard />
            <ProfileCourseCard />
            <ProfileCourseCard />
          </div>
        </div>
      </div>
    </>
  );
}
