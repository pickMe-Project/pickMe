import ProtectedRoute from "@/components/ProtectedRoute";
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
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
