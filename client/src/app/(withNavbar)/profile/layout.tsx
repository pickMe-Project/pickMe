import ProtectedRoute from "@/components/ProtectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pickMe! | Profile",
  description: "View your profile information here.",
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
