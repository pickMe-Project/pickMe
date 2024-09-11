import { Metadata } from "next";

export const metadata: Metadata = {
    title: "pickMe! | Sign Up",
    description: "Sign up to your pickMe! account",
};

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}