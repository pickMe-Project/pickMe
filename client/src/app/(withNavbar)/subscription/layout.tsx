import ProtectedRouteProfile from "@/components/ProtectedRouteProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pickMe! | Subscription",
  description: "Manage your subscription",
};

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRouteProfile>
      {children}
    </ProtectedRouteProfile>
  );
}
