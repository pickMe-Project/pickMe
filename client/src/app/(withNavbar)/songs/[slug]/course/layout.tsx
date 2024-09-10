import ProtectedRoute from "@/components/ProtectedRoute";
import SubscriptionProtectedRoute from "@/components/SubscriptionProtectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pickMe! | Course",
  description: "Learn how to play the song with our interactive course",
};

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SubscriptionProtectedRoute>
      {children}
    </SubscriptionProtectedRoute>
  );
}
