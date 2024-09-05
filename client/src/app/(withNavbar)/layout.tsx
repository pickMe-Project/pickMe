import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarSignin from "@/components/NavbarSignin";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "pickMe!",
  description: "Learn how to play guitar with pickMe!",
};


export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authCookie = cookies().get('Authorization')
  return (
    <>
      {authCookie ? <NavbarSignin /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
}
  