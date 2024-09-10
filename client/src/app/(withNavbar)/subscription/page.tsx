"use client";
import { UserType } from "@/db/models/User";
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

      const response = await fetch(`http://localhost:3000/api/user`, {
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
    async function pay() {
      const user = await getUser()
      setuser(user)
      if (user?.subscription === false) {
        const response = await fetch("/api/token", {
          method: "POST",
        });
        // console.log(response, "<<<<<< responseSubscription");

        const requestData = await response.json();
        (window as any).snap.pay(requestData.token, {
          onSuccess: async () => {
            const form = {
              subscription: true,
            };

            try {
              const response = await fetch(
                `http://localhost:3000/api/subscription`,
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
              const responseBody = await response.json();

              router.push(`/profile`);
            } catch (error) {
              console.log(error);
            }
            // console.log("subscription success");
          },
        });
      }
    }

    pay();

  }, []);

  if (isLoading) {
    return (
      <div className="items-center justify-center text-center">
        <div>Loading...</div>
      </div>
    );
  }
  if (user?.subscription) {
    return (
      <div className="items-center justify-center text-center">
        <div>Thank You for your subscription!</div>
      </div>
    );
  }
  else {
    return (
      <div className="items-center justify-center text-center">
        <div>
          Subscribe to PickMe!
        </div>
      </div>
    )
  }
}
