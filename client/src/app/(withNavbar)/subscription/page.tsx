"use client";
import { useEffect } from "react";

export default function Subscription() {
  useEffect(() => {
    async function pay() {
      const response = await fetch("/api/token", {
        method: "POST",
      });
      const requestData = await response.json();
      (window as any).snap.pay(requestData.token, {
        onSuccess: () => {
          console.log("update user");
        },
      });
    }

    pay();
  }, []);

  return null;
}
