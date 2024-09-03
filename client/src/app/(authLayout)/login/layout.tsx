import { Metadata } from "next";

export const metadata: Metadata = {
    title: "pickMe! - Sign In",
    description: "Sign in to your pickMe! account",
};

export default function SignInLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}