"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Subscription() {
  const router = useRouter();

  useEffect(() => {
    async function pay() {
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
              const response = await fetch(`http://localhost:3000/api/subscription`, {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: {
                  "Content-Type": "application/json",
                },
              });

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

    pay();
  }, []);

  return null;
}
