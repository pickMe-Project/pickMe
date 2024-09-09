import { signIn, useSession } from "next-auth/react"


export default function GoogleButton() {
    const { data: session } = useSession();

    const handleGoogleLogin = async () => {
        if (!session) {
            try {
                await signIn('google', { callbackUrl: process.env.NEXTAUTH_URL });
            } catch (error) {
                console.error('Error signing in with Google:', error);
            }
        }
    };

    return (
        <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-md shadow-md hover:bg-gray-100 transition-colors">
            <img src="/google.png" alt="Google" width={20} height={20} />
            <span>{session ? 'Signed in' : 'Sign in with Google'}</span>
        </button>
    );
}