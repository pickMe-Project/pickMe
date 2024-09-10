'use client';
import ProfileCourseCard from "@/components/ProfileCourseCard";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import { useEffect, useState } from "react";

// interface UserData {
//   name: string;
//   username: string;
//   email: string;
//   courses?: object
// }

export const dynamic = "force-dynamic";

export default function Profile() {
  const [userData, setUserData] = useState<UserType | null>(null)
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

      const data: UserType = await response.json();
      
      setUserData(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
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
            src="/default_pic.png"
            alt="Profile Picture"
            className="w-28 h-28 rounded-full mb-4 bg-gray-100"
          />
          <h1 className="text-3xl font-bold text-black font-libre mb-2 flex items-center">
            {userData ? (
              <>
                {userData.name}
                {userData?.subscription && (
                  <span className="ml-2 bg-green-400 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    VIP
                  </span>
                )}
              </>
            ) : (
              <span className="inline-block h-8 w-48 bg-gray-200 animate-pulse rounded"></span>
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 h-32 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : userData?.courses && userData.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.courses.map(course => (
                <ProfileCourseCard key={course.songId.toString()} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 font-cousine">You haven't added any courses yet.</p>
              <Link href="/songs" className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                Explore Songs
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
