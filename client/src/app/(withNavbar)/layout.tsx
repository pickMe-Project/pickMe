import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarSignin from "@/components/NavbarSignin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pickMe!",
  description: "Learn how to play guitar with pickMe!",
};


export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Navbar /> */}
      <NavbarSignin />
      {children}
      <Footer />
    </>
  );
}
